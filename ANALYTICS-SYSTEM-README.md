# Advanced Analytics & Tracking System

This document outlines the comprehensive analytics and tracking system implemented for the MindMuscle web application, featuring user engagement tracking, A/B testing, and conversion funnel analysis.

## 🚀 Features

### 📊 User Engagement Tracking
- **Automatic Event Tracking**: Tracks user interactions including clicks, scrolls, form interactions, and page views
- **Session Management**: Monitors session duration, events per session, and user behavior patterns
- **Performance Monitoring**: Tracks page load times, Core Web Vitals, and resource performance
- **Real-time Analytics**: Events are batched and sent to the server for real-time analysis

### 🧪 A/B Testing Framework
- **Variant Assignment**: Automatically assigns users to test variants based on configurable weights
- **Persistent Assignment**: Users maintain the same variant across sessions
- **Conversion Tracking**: Track specific goals and conversions for each test variant
- **Statistical Analysis**: Built-in conversion rate calculations and performance comparisons

### 🎯 Conversion Funnel Analysis
- **Multi-step Funnels**: Track users through predefined conversion steps
- **Drop-off Analysis**: Identify where users leave the conversion process
- **Conversion Rates**: Calculate conversion rates between each funnel step
- **Session-based Tracking**: Track funnel progression within user sessions

## 📁 File Structure

```
src/
├── lib/
│   └── analytics.ts          # Core analytics library
├── hooks/
│   └── useABTest.ts          # A/B testing React hook
├── components/
│   └── ui/
│       └── AnalyticsDashboard.tsx  # Analytics visualization dashboard
├── app/
│   ├── api/
│   │   └── analytics/
│   │       └── route.ts      # Analytics API endpoints
│   └── analytics/
│       └── page.tsx          # Analytics dashboard page
└── analytics_migration.sql   # Database schema migration
```

## 🛠️ Implementation Details

### Core Analytics Library (`src/lib/analytics.ts`)

The main analytics library provides:

- **AdvancedAnalytics Class**: Singleton class managing all analytics functionality
- **Event Tracking**: Automatic and manual event tracking with properties
- **Session Management**: Session creation, tracking, and metrics collection
- **A/B Testing**: Variant assignment and conversion tracking
- **Batch Processing**: Efficient event batching and API communication

Key methods:
```typescript
// Track custom events
trackUserEngagement('button_click', { buttonId: 'cta-hero' });

// Track conversion funnel steps
trackConversion('waitlist_form_submit');

// A/B testing
const variant = getABVariant('hero_cta_test', testConfig);
trackABConversion('hero_cta_test', 'signup', 1);
```

### A/B Testing Hook (`src/hooks/useABTest.ts`)

React hook for easy A/B testing integration:

```typescript
const { variant, isLoading, trackConversion, getVariantConfig } = useABTest(
  'hero_cta_button',
  AB_TESTS.HERO_CTA_BUTTON
);

// Use variant in component
if (variant === 'variant_a') {
  return <ButtonVariantA onClick={() => trackConversion('click')} />;
}
```

### Analytics Dashboard (`src/components/ui/AnalyticsDashboard.tsx`)

Comprehensive dashboard featuring:
- **Overview Metrics**: Total events, sessions, duration, events per session
- **Conversion Funnel**: Visual funnel analysis with conversion rates
- **A/B Test Results**: Test performance and variant comparisons
- **User Engagement**: Detailed engagement metrics and breakdowns

### API Endpoints (`src/app/api/analytics/route.ts`)

RESTful API for analytics data:
- `POST /api/analytics`: Store analytics events and session data
- `GET /api/analytics?metric=events`: Retrieve events data
- `GET /api/analytics?metric=funnel`: Get conversion funnel analysis
- `GET /api/analytics?metric=ab_tests`: Fetch A/B test results
- `GET /api/analytics?metric=engagement`: Get engagement metrics

## 🗄️ Database Schema

### Tables

#### `analytics_events`
Stores individual user events:
```sql
- id: UUID (Primary Key)
- event_name: VARCHAR(255) - Event identifier
- timestamp: TIMESTAMPTZ - When the event occurred
- session_id: VARCHAR(255) - Session identifier
- user_id: VARCHAR(255) - User identifier (optional)
- properties: JSONB - Event properties and metadata
- page: VARCHAR(500) - Page where event occurred
- duration: BIGINT - Time since session start (ms)
```

#### `analytics_sessions`
Stores session-level metrics:
```sql
- id: UUID (Primary Key)
- session_id: VARCHAR(255) - Unique session identifier
- user_id: VARCHAR(255) - User identifier (optional)
- start_time: TIMESTAMPTZ - Session start time
- duration: BIGINT - Total session duration (ms)
- event_count: INTEGER - Number of events in session
- funnel_steps: INTEGER - Number of funnel steps completed
- ab_tests: JSONB - A/B test assignments for session
```

### Views

#### `conversion_funnel_analysis`
Pre-calculated funnel metrics with conversion rates between steps.

#### `ab_test_analysis`
A/B test performance metrics including participants and conversion rates.

#### `user_engagement_metrics`
Daily engagement metrics including session duration and user activity.

## 🚀 Setup Instructions

### 1. Database Setup

Run the SQL migration in your Supabase dashboard:
```bash
# Copy the contents of analytics_migration.sql
# Paste and execute in Supabase SQL Editor
```

### 2. Environment Configuration

Ensure your Supabase configuration is set up in `src/lib/supabase.ts`.

### 3. Analytics Initialization

The analytics system initializes automatically when the app loads. No additional setup required.

### 4. View Analytics Dashboard

Navigate to `/analytics` to view the analytics dashboard (you may want to add authentication).

## 📈 Usage Examples

### Basic Event Tracking

```typescript
import { trackUserEngagement } from '@/lib/analytics';

// Track button clicks
trackUserEngagement('button_click', {
  buttonId: 'hero-cta',
  section: 'hero',
  text: 'Join Waitlist'
});

// Track page views
trackUserEngagement('page_view', {
  page: '/features',
  referrer: document.referrer
});
```

### Conversion Funnel Tracking

```typescript
import { trackConversion, CONVERSION_FUNNEL } from '@/lib/analytics';

// Track funnel steps
trackConversion(CONVERSION_FUNNEL.LANDING);
trackConversion(CONVERSION_FUNNEL.HERO_INTERACTION);
trackConversion(CONVERSION_FUNNEL.WAITLIST_FORM_START);
trackConversion(CONVERSION_FUNNEL.WAITLIST_SUCCESS);
```

### A/B Testing

```typescript
import { useABTest } from '@/hooks/useABTest';
import { AB_TESTS } from '@/lib/analytics';

function HeroCTA() {
  const { variant, trackConversion } = useABTest(
    'hero_cta_button',
    AB_TESTS.HERO_CTA_BUTTON
  );

  const handleClick = () => {
    trackConversion('cta_click');
    // Handle click logic
  };

  return (
    <button onClick={handleClick}>
      {variant === 'control' && 'Join Waitlist'}
      {variant === 'variant_a' && 'Get Early Access'}
      {variant === 'variant_b' && 'Reserve Your Spot'}
    </button>
  );
}
```

## 🔧 Configuration

### A/B Test Configuration

Define A/B tests in `src/lib/analytics.ts`:

```typescript
export const AB_TESTS = {
  HERO_CTA_BUTTON: {
    name: 'hero_cta_button',
    variants: [
      { name: 'control', weight: 0.5, config: { text: 'Join Waitlist' } },
      { name: 'variant_a', weight: 0.25, config: { text: 'Get Early Access' } },
      { name: 'variant_b', weight: 0.25, config: { text: 'Reserve Your Spot' } },
    ],
  },
};
```

### Analytics Configuration

Customize analytics behavior:

```typescript
const analytics = new AdvancedAnalytics({
  enableUserEngagement: true,
  enableABTesting: true,
  enableConversionTracking: true,
  sessionTimeout: 30, // minutes
  batchSize: 10, // events per batch
  flushInterval: 5000, // ms
});
```

## 📊 Analytics Dashboard Features

### Overview Tab
- Total events count
- Total sessions
- Average session duration
- Events per session

### Conversion Funnel Tab
- Step-by-step funnel visualization
- Conversion rates between steps
- Unique sessions per step
- Drop-off analysis

### A/B Tests Tab
- Test performance comparison
- Variant distribution
- Conversion rates by variant
- Statistical significance indicators

### User Engagement Tab
- Session metrics breakdown
- Event type distribution
- Engagement patterns
- User behavior insights

## 🔒 Privacy & Security

- **Row Level Security**: Database tables use RLS for data protection
- **Anonymous Tracking**: Supports anonymous user tracking
- **Data Retention**: Configure data retention policies as needed
- **GDPR Compliance**: Designed with privacy regulations in mind

## 🚀 Performance Considerations

- **Batched Requests**: Events are batched to reduce API calls
- **Throttled Tracking**: Scroll and resize events are throttled
- **Efficient Queries**: Database indexes optimize query performance
- **Client-side Caching**: A/B test assignments are cached locally

## 🔮 Future Enhancements

- **Heatmap Integration**: Visual user interaction heatmaps
- **Cohort Analysis**: User cohort tracking and analysis
- **Real-time Dashboard**: Live analytics updates
- **Advanced Segmentation**: User segment-based analytics
- **Export Functionality**: Data export capabilities
- **Alert System**: Automated alerts for metric thresholds

## 🐛 Troubleshooting

### Common Issues

1. **Events not appearing**: Check browser console for API errors
2. **A/B tests not working**: Verify test configuration and variant weights
3. **Dashboard not loading**: Ensure database tables are created
4. **Performance issues**: Check batch size and flush interval settings

### Debug Mode

Enable debug logging in development:
```typescript
// Analytics events are automatically logged in development mode
console.log('🔍 Analytics Event:', eventName, properties);
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [A/B Testing Best Practices](https://vwo.com/ab-testing/)
- [Web Analytics Guide](https://developers.google.com/analytics)
- [Privacy-First Analytics](https://plausible.io/privacy-focused-web-analytics)

---

This analytics system provides a solid foundation for understanding user behavior, optimizing conversions, and making data-driven decisions for your application. 