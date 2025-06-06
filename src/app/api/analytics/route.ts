import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events, sessionMetrics } = body;

    if (!events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Invalid events data' },
        { status: 400 }
      );
    }

    // Store analytics events
    const { error: eventsError } = await supabase
      .from('analytics_events')
      .insert(
        events.map((event: any) => ({
          event_name: event.event,
          timestamp: new Date(event.timestamp),
          session_id: event.sessionId,
          user_id: event.userId,
          properties: event.properties,
          page: event.page,
          duration: event.duration,
        }))
      );

    if (eventsError) {
      console.error('Error storing analytics events:', eventsError);
      // Don't fail the request if analytics storage fails
    }

    // Store session metrics
    if (sessionMetrics) {
      const { error: sessionError } = await supabase
        .from('analytics_sessions')
        .upsert({
          session_id: sessionMetrics.sessionId,
          user_id: sessionMetrics.userId,
          start_time: new Date(sessionMetrics.startTime),
          duration: sessionMetrics.duration,
          event_count: sessionMetrics.eventCount,
          funnel_steps: sessionMetrics.funnelSteps,
          ab_tests: sessionMetrics.abTests,
          updated_at: new Date(),
        }, {
          onConflict: 'session_id'
        });

      if (sessionError) {
        console.error('Error storing session metrics:', sessionError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get analytics data for dashboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';
    const metric = searchParams.get('metric') || 'events';

    // Calculate date range
    const now = new Date();
    const daysBack = timeframe === '1d' ? 1 : timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 7;
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    switch (metric) {
      case 'events':
        const { data: events, error: eventsError } = await supabase
          .from('analytics_events')
          .select('*')
          .gte('timestamp', startDate.toISOString())
          .order('timestamp', { ascending: false });

        if (eventsError) throw eventsError;
        return NextResponse.json({ data: events });

      case 'funnel':
        const { data: funnelData, error: funnelError } = await supabase
          .from('analytics_events')
          .select('event_name, timestamp, session_id')
          .gte('timestamp', startDate.toISOString())
          .like('event_name', 'funnel_%')
          .order('timestamp');

        if (funnelError) throw funnelError;

        // Process funnel data
        const funnelSteps = ['landing_page_view', 'hero_section_interaction', 'features_section_view', 'waitlist_section_view', 'waitlist_form_start', 'waitlist_form_submit', 'waitlist_success'];
        const funnelAnalysis = funnelSteps.map(step => {
          const stepEvents = funnelData.filter(event => event.event_name === `funnel_${step}`);
          return {
            step,
            count: stepEvents.length,
            uniqueSessions: new Set(stepEvents.map(e => e.session_id)).size,
          };
        });

        return NextResponse.json({ data: funnelAnalysis });

      case 'ab_tests':
        const { data: abTestData, error: abTestError } = await supabase
          .from('analytics_events')
          .select('properties')
          .gte('timestamp', startDate.toISOString())
          .eq('event_name', 'ab_test_assignment');

        if (abTestError) throw abTestError;

        // Process A/B test data
        const testResults = abTestData.reduce((acc: any, event: any) => {
          const { testName, variant } = event.properties || {};
          if (testName && variant) {
            if (!acc[testName]) acc[testName] = {};
            acc[testName][variant] = (acc[testName][variant] || 0) + 1;
          }
          return acc;
        }, {});

        return NextResponse.json({ data: testResults });

      case 'engagement':
        const { data: engagementData, error: engagementError } = await supabase
          .from('analytics_sessions')
          .select('duration, event_count, start_time')
          .gte('start_time', startDate.toISOString());

        if (engagementError) throw engagementError;

        const totalSessions = engagementData.length;
        const avgDuration = totalSessions > 0 
          ? engagementData.reduce((sum, session) => sum + (session.duration || 0), 0) / totalSessions
          : 0;
        const avgEvents = totalSessions > 0 
          ? engagementData.reduce((sum, session) => sum + (session.event_count || 0), 0) / totalSessions
          : 0;

        return NextResponse.json({ 
          data: {
            avgSessionDuration: avgDuration,
            avgEventsPerSession: avgEvents,
            totalSessions: totalSessions,
          }
        });

      default:
        return NextResponse.json({ error: 'Invalid metric' }, { status: 400 });
    }
  } catch (error) {
    console.error('Analytics GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 