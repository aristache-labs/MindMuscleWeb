-- Analytics Tables Migration
-- Run this in your Supabase SQL editor to create the analytics tables

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  session_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255),
  properties JSONB DEFAULT '{}',
  page VARCHAR(500),
  duration BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create analytics_sessions table
CREATE TABLE IF NOT EXISTS analytics_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(255),
  start_time TIMESTAMPTZ NOT NULL,
  duration BIGINT,
  event_count INTEGER DEFAULT 0,
  funnel_steps INTEGER DEFAULT 0,
  ab_tests JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page ON analytics_events(page);

CREATE INDEX IF NOT EXISTS idx_analytics_sessions_session_id ON analytics_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_user_id ON analytics_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_start_time ON analytics_sessions(start_time);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_analytics_sessions_updated_at 
    BEFORE UPDATE ON analytics_sessions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics tables
-- Allow all operations for authenticated users (you can restrict this further based on your needs)
CREATE POLICY "Allow all operations for authenticated users" ON analytics_events
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON analytics_sessions
    FOR ALL USING (auth.role() = 'authenticated');

-- Allow anonymous users to insert analytics data (for tracking)
CREATE POLICY "Allow anonymous insert" ON analytics_events
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert" ON analytics_sessions
    FOR INSERT WITH CHECK (true);

-- Allow anonymous users to update sessions (for session metrics)
CREATE POLICY "Allow anonymous update" ON analytics_sessions
    FOR UPDATE USING (true);

-- Create a view for conversion funnel analysis
CREATE OR REPLACE VIEW conversion_funnel_analysis AS
WITH funnel_events AS (
  SELECT 
    event_name,
    session_id,
    timestamp,
    ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY timestamp) as step_order
  FROM analytics_events 
  WHERE event_name LIKE 'funnel_%'
),
funnel_steps AS (
  SELECT 
    REPLACE(event_name, 'funnel_', '') as step_name,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(*) as total_events,
    DATE_TRUNC('day', timestamp) as date
  FROM funnel_events
  GROUP BY step_name, DATE_TRUNC('day', timestamp)
)
SELECT 
  step_name,
  date,
  unique_sessions,
  total_events,
  LAG(unique_sessions) OVER (PARTITION BY date ORDER BY step_name) as previous_step_sessions,
  CASE 
    WHEN LAG(unique_sessions) OVER (PARTITION BY date ORDER BY step_name) > 0 
    THEN ROUND(((unique_sessions::DECIMAL / LAG(unique_sessions) OVER (PARTITION BY date ORDER BY step_name)) * 100)::NUMERIC, 2)
    ELSE 100.0
  END as conversion_rate
FROM funnel_steps
ORDER BY date DESC, step_name;

-- Create a view for A/B test analysis
CREATE OR REPLACE VIEW ab_test_analysis AS
WITH ab_assignments AS (
  SELECT 
    properties->>'testName' as test_name,
    properties->>'variant' as variant,
    session_id,
    user_id,
    timestamp
  FROM analytics_events 
  WHERE event_name = 'ab_test_assignment'
),
ab_conversions AS (
  SELECT 
    properties->>'testName' as test_name,
    properties->>'variant' as variant,
    properties->>'goalName' as goal_name,
    COUNT(*) as conversions
  FROM analytics_events 
  WHERE event_name = 'ab_test_conversion'
  GROUP BY properties->>'testName', properties->>'variant', properties->>'goalName'
)
SELECT 
  a.test_name,
  a.variant,
  COUNT(DISTINCT a.session_id) as participants,
  COALESCE(c.conversions, 0) as conversions,
  CASE 
    WHEN COUNT(DISTINCT a.session_id) > 0 
    THEN ROUND(((COALESCE(c.conversions, 0)::DECIMAL / COUNT(DISTINCT a.session_id)) * 100)::NUMERIC, 2)
    ELSE 0
  END as conversion_rate,
  c.goal_name
FROM ab_assignments a
LEFT JOIN ab_conversions c ON a.test_name = c.test_name AND a.variant = c.variant
GROUP BY a.test_name, a.variant, c.conversions, c.goal_name
ORDER BY a.test_name, a.variant;

-- Create a view for user engagement metrics
CREATE OR REPLACE VIEW user_engagement_metrics AS
WITH session_metrics AS (
  SELECT 
    session_id,
    user_id,
    start_time,
    duration,
    event_count,
    DATE_TRUNC('day', start_time) as date
  FROM analytics_sessions
),
daily_metrics AS (
  SELECT 
    date,
    COUNT(DISTINCT session_id) as total_sessions,
    COUNT(DISTINCT user_id) as unique_users,
    AVG(duration) as avg_session_duration,
    AVG(event_count) as avg_events_per_session,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration) as median_session_duration
  FROM session_metrics
  GROUP BY date
)
SELECT 
  date,
  total_sessions,
  unique_users,
  ROUND((avg_session_duration / 1000.0)::NUMERIC, 2) as avg_session_duration_seconds,
  ROUND(avg_events_per_session::NUMERIC, 2) as avg_events_per_session,
  ROUND((median_session_duration / 1000.0)::NUMERIC, 2) as median_session_duration_seconds,
  CASE 
    WHEN unique_users > 0 
    THEN ROUND((total_sessions::DECIMAL / unique_users)::NUMERIC, 2)
    ELSE 0
  END as sessions_per_user
FROM daily_metrics
ORDER BY date DESC;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON analytics_events TO anon, authenticated;
GRANT ALL ON analytics_sessions TO anon, authenticated;
GRANT SELECT ON conversion_funnel_analysis TO anon, authenticated;
GRANT SELECT ON ab_test_analysis TO anon, authenticated;
GRANT SELECT ON user_engagement_metrics TO anon, authenticated; 