// Advanced Analytics & Tracking System
import { AnalyticsEvent } from '@/types';

// Types for analytics
export interface UserEngagementEvent {
  event: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  properties?: Record<string, unknown>;
  page: string;
  duration?: number;
}

export interface ABTestConfig {
  name: string;
  variants: Array<{
    name: string;
    weight: number;
    config: Record<string, unknown>;
  }>;
  targetingRules?: Array<{
    condition: string;
    value: string;
  }>;
}

export interface ConversionFunnelStep {
  step: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  properties?: Record<string, unknown>;
}

export interface AnalyticsConfig {
  enableUserEngagement: boolean;
  enableABTesting: boolean;
  enableConversionTracking: boolean;
  enableHeatmaps: boolean;
  sessionTimeout: number; // in minutes
  batchSize: number;
  flushInterval: number; // in milliseconds
}

// Default configuration
const DEFAULT_CONFIG: AnalyticsConfig = {
  enableUserEngagement: true,
  enableABTesting: true,
  enableConversionTracking: true,
  enableHeatmaps: false,
  sessionTimeout: 30,
  batchSize: 10,
  flushInterval: 5000,
};

class AdvancedAnalytics {
  private config: AnalyticsConfig;
  private sessionId: string;
  private userId?: string;
  private eventQueue: UserEngagementEvent[] = [];
  private abTests: Map<string, string> = new Map();
  private funnelSteps: ConversionFunnelStep[] = [];
  private startTime: number = Date.now();
  private lastActivityTime: number = Date.now();
  private isInitialized: boolean = false;
  private flushTimer?: NodeJS.Timeout;

  constructor(config: Partial<AnalyticsConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.sessionId = this.generateSessionId();
    this.initialize();
  }

  private initialize() {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Set up page visibility tracking
    this.setupPageVisibilityTracking();
    
    // Set up scroll tracking
    this.setupScrollTracking();
    
    // Set up click tracking
    this.setupClickTracking();
    
    // Set up form interaction tracking
    this.setupFormTracking();
    
    // Set up performance tracking
    this.setupPerformanceTracking();
    
    // Start flush timer
    this.startFlushTimer();
    
    this.isInitialized = true;
    
    // Track session start
    this.trackEvent('session_start', {
      userAgent: navigator.userAgent,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupPageVisibilityTracking() {
    if (typeof document === 'undefined') return;

    let startTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page became hidden
        const timeSpent = Date.now() - startTime;
        this.trackEvent('page_hidden', {
          timeSpent,
          page: window.location.pathname,
        });
      } else {
        // Page became visible
        startTime = Date.now();
        this.trackEvent('page_visible', {
          page: window.location.pathname,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track page unload
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - startTime;
      this.trackEvent('page_unload', {
        timeSpent,
        page: window.location.pathname,
      });
      this.flush();
    });
  }

  private setupScrollTracking() {
    if (typeof window === 'undefined') return;

    let maxScroll = 0;
    let scrollMilestones = [25, 50, 75, 90, 100];
    let triggeredMilestones = new Set<number>();

    const handleScroll = () => {
      this.lastActivityTime = Date.now();
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercentage);
      
      // Track scroll milestones
      scrollMilestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !triggeredMilestones.has(milestone)) {
          triggeredMilestones.add(milestone);
          this.trackEvent('scroll_milestone', {
            milestone,
            page: window.location.pathname,
          });
        }
      });
    };

    // Throttle scroll events
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    });
  }

  private setupClickTracking() {
    if (typeof document === 'undefined') return;

    document.addEventListener('click', (event) => {
      this.lastActivityTime = Date.now();
      
      const target = event.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      // Track button clicks
      if (tagName === 'button' || target.closest('button')) {
        const button = target.closest('button') || target;
        this.trackEvent('button_click', {
          buttonText: button.textContent?.trim(),
          buttonId: button.id,
          buttonClass: button.className,
          page: window.location.pathname,
        });
      }
      
      // Track link clicks
      if (tagName === 'a' || target.closest('a')) {
        const link = target.closest('a') || target;
        this.trackEvent('link_click', {
          linkText: link.textContent?.trim(),
          linkHref: (link as HTMLAnchorElement).href,
          linkId: link.id,
          isExternal: (link as HTMLAnchorElement).hostname !== window.location.hostname,
          page: window.location.pathname,
        });
      }
    });
  }

  private setupFormTracking() {
    if (typeof document === 'undefined') return;

    // Track form interactions
    document.addEventListener('focus', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        this.trackEvent('form_field_focus', {
          fieldName: (target as HTMLInputElement).name,
          fieldType: (target as HTMLInputElement).type,
          fieldId: target.id,
          page: window.location.pathname,
        });
      }
    }, true);

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackEvent('form_submit', {
        formId: form.id,
        formAction: form.action,
        page: window.location.pathname,
      });
    });
  }

  private setupPerformanceTracking() {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.trackEvent('page_load_performance', {
            loadTime: navigation.loadEventEnd - navigation.navigationStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
            firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
            page: window.location.pathname,
          });
        }
      }, 0);
    });
  }

  private startFlushTimer() {
    this.flushTimer = setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.flush();
      }
    }, this.config.flushInterval);
  }

  // Public methods

  public setUserId(userId: string) {
    this.userId = userId;
    this.trackEvent('user_identified', { userId });
  }

  public trackEvent(event: string, properties: Record<string, unknown> = {}) {
    if (!this.config.enableUserEngagement) return;

    const engagementEvent: UserEngagementEvent = {
      event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      properties,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      duration: Date.now() - this.startTime,
    };

    this.eventQueue.push(engagementEvent);

    // Also track with existing analytics
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(event, { props: properties });
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analytics Event:', event, properties);
    }

    // Auto-flush if queue is full
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  public trackConversionStep(step: string, properties: Record<string, unknown> = {}) {
    if (!this.config.enableConversionTracking) return;

    const funnelStep: ConversionFunnelStep = {
      step,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      properties,
    };

    this.funnelSteps.push(funnelStep);
    this.trackEvent(`funnel_${step}`, properties);
  }

  public getABTestVariant(testName: string, config: ABTestConfig): string {
    if (!this.config.enableABTesting) {
      return config.variants[0]?.name || 'control';
    }

    // Check if user already has a variant assigned
    const existingVariant = this.abTests.get(testName);
    if (existingVariant) {
      return existingVariant;
    }

    // Assign variant based on weights
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (const variant of config.variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        this.abTests.set(testName, variant.name);
        this.trackEvent('ab_test_assignment', {
          testName,
          variant: variant.name,
          userId: this.userId,
        });
        return variant.name;
      }
    }

    // Fallback to first variant
    const fallbackVariant = config.variants[0]?.name || 'control';
    this.abTests.set(testName, fallbackVariant);
    return fallbackVariant;
  }

  public trackABTestConversion(testName: string, goalName: string, value?: number) {
    const variant = this.abTests.get(testName);
    if (!variant) return;

    this.trackEvent('ab_test_conversion', {
      testName,
      variant,
      goalName,
      value,
      userId: this.userId,
    });
  }

  public getSessionMetrics() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      startTime: this.startTime,
      duration: Date.now() - this.startTime,
      eventCount: this.eventQueue.length,
      funnelSteps: this.funnelSteps.length,
      abTests: Object.fromEntries(this.abTests),
    };
  }

  public flush() {
    if (this.eventQueue.length === 0) return;

    // Send events to analytics service
    this.sendEvents([...this.eventQueue]);
    this.eventQueue = [];
  }

  private async sendEvents(events: UserEngagementEvent[]) {
    try {
      // Send to your analytics endpoint
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events,
          sessionMetrics: this.getSessionMetrics(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Analytics request failed: ${response.status}`);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 Sent ${events.length} analytics events`);
      }
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      // Re-add events to queue for retry
      this.eventQueue.unshift(...events);
    }
  }

  public destroy() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.flush();
  }
}

// Create singleton instance
export const analytics = new AdvancedAnalytics();

// Convenience functions
export function trackUserEngagement(event: string, properties?: Record<string, unknown>) {
  analytics.trackEvent(event, properties);
}

export function trackConversion(step: string, properties?: Record<string, unknown>) {
  analytics.trackConversionStep(step, properties);
}

export function getABVariant(testName: string, config: ABTestConfig): string {
  return analytics.getABTestVariant(testName, config);
}

export function trackABConversion(testName: string, goalName: string, value?: number) {
  analytics.trackABTestConversion(testName, goalName, value);
}

export function setAnalyticsUserId(userId: string) {
  analytics.setUserId(userId);
}

export function getAnalyticsSession() {
  return analytics.getSessionMetrics();
}

// A/B Test configurations
export const AB_TESTS = {
  HERO_CTA_BUTTON: {
    name: 'hero_cta_button',
    variants: [
      { name: 'control', weight: 0.5, config: { text: 'Join Waitlist', color: 'primary' } },
      { name: 'variant_a', weight: 0.25, config: { text: 'Get Early Access', color: 'secondary' } },
      { name: 'variant_b', weight: 0.25, config: { text: 'Reserve Your Spot', color: 'accent' } },
    ],
  },
  WAITLIST_FORM_LAYOUT: {
    name: 'waitlist_form_layout',
    variants: [
      { name: 'control', weight: 0.5, config: { layout: 'vertical', showBenefits: true } },
      { name: 'variant_a', weight: 0.5, config: { layout: 'horizontal', showBenefits: false } },
    ],
  },
} as const;

// Conversion funnel steps
export const CONVERSION_FUNNEL = {
  LANDING: 'landing_page_view',
  HERO_INTERACTION: 'hero_section_interaction',
  FEATURES_VIEW: 'features_section_view',
  WAITLIST_VIEW: 'waitlist_section_view',
  WAITLIST_FORM_START: 'waitlist_form_start',
  WAITLIST_FORM_SUBMIT: 'waitlist_form_submit',
  WAITLIST_SUCCESS: 'waitlist_success',
} as const; 