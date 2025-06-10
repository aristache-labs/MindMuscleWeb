// Analytics configuration for MindMuscle AI Fitness Landing Page
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

// Types for analytics events
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

export interface UserProperties {
  device_type?: 'mobile' | 'tablet' | 'desktop';
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_path?: string;
}

// Device detection
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPad|Android(?=.*\bMobile\b)/.test(userAgent)) {
      return 'tablet';
    }
    return 'mobile';
  }
  return 'desktop';
}

// Get UTM parameters from URL
export function getUTMParameters(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
  };
}

// Enhanced analytics tracking with Plausible
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  // Get device and context information
  const context = {
    device_type: getDeviceType(),
    page_path: window.location.pathname,
    ...getUTMParameters(),
    ...properties,
  };

  // Track with Plausible Analytics
  if (typeof window.plausible === 'function') {
    try {
      window.plausible(eventName, { 
        props: context as Record<string, string | number | boolean>
      });
    } catch (error) {
      console.warn('Plausible tracking failed:', error);
    }
  }

  // Note: Vercel Analytics automatically tracks page views and basic events
  // Custom event tracking can be added later if needed with proper typing
  
  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, context);
  }
}

// Track page views with additional context
export function trackPageView(path?: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  const context = {
    device_type: getDeviceType(),
    page_path: path || window.location.pathname,
    referrer: document.referrer,
    ...getUTMParameters(),
    ...properties,
  };

  // Plausible automatically tracks page views, but we can send custom props
  if (typeof window.plausible === 'function') {
    try {
      window.plausible('pageview', { props: context });
    } catch (error) {
      console.warn('Plausible page view tracking failed:', error);
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('📄 Page View:', context);
  }
}

// Core Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  const sendToAnalytics = ({ name, value, id }: { name: string; value: number; id: string }) => {
    trackEvent('Web Vitals', {
      metric_name: name,
      metric_value: Math.round(value),
      metric_id: id,
    });
  };

  onCLS(sendToAnalytics);
  onFCP(sendToAnalytics);
  onINP(sendToAnalytics); // INP replaces FID in v4+
  onLCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

// Predefined events for MindMuscle
export const MindMuscleEvents = {
  // Hero Section Events
  HERO_APP_STORE_CLICK: 'Hero App Store Click',
  HERO_GOOGLE_PLAY_CLICK: 'Hero Google Play Click',
  HERO_WAITLIST_CLICK: 'Hero Waitlist Click',
  HERO_PHONE_INTERACTION: 'Hero Phone Interaction',

  // Navigation Events
  NAV_SECTION_CLICK: 'Navigation Section Click',
  NAV_LOGO_CLICK: 'Navigation Logo Click',
  NAV_MOBILE_MENU: 'Mobile Menu Toggle',

  // Section Interactions
  FEATURES_CARD_HOVER: 'Features Card Hover',
  HOW_IT_WORKS_STEP_HOVER: 'How It Works Step Hover',
  SHOWCASE_FEATURE_SELECT: 'Showcase Feature Select',
  TESTIMONIAL_NAVIGATION: 'Testimonial Navigation',

  // Waitlist Events
  WAITLIST_FORM_SUBMIT: 'Waitlist Form Submit',
  WAITLIST_FORM_SUCCESS: 'Waitlist Form Success',
  WAITLIST_FORM_ERROR: 'Waitlist Form Error',
  WAITLIST_SHARE_LINK: 'Waitlist Share Link',
  WAITLIST_REFERRAL_COPY: 'Waitlist Referral Copy',

  // Social Sharing
  SOCIAL_SHARE_CLICK: 'Social Share Click',
  SOCIAL_SHARE_SUCCESS: 'Social Share Success',
  SOCIAL_LINK_COPY: 'Social Link Copy',

  // Performance Events
  SECTION_LOAD_TIME: 'Section Load Time',
  ANIMATION_PERFORMANCE: 'Animation Performance',
  IMAGE_LOAD_ERROR: 'Image Load Error',

  // Engagement Events
  SCROLL_DEPTH_25: 'Scroll Depth 25%',
  SCROLL_DEPTH_50: 'Scroll Depth 50%',
  SCROLL_DEPTH_75: 'Scroll Depth 75%',
  SCROLL_DEPTH_100: 'Scroll Depth 100%',
  SESSION_DURATION: 'Session Duration',
  BOUNCE_RATE: 'Bounce Rate',
} as const;

// Scroll depth tracking
export function initScrollDepthTracking() {
  if (typeof window === 'undefined') return;

  const thresholds = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const trackScrollDepth = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackEvent(`Scroll Depth ${threshold}%`, {
          scroll_percentage: threshold,
          page_height: document.documentElement.scrollHeight,
          viewport_height: window.innerHeight,
        });
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const throttledTrackScrollDepth = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledTrackScrollDepth, { passive: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', throttledTrackScrollDepth);
  };
}

// Session tracking
export function initSessionTracking() {
  if (typeof window === 'undefined') return;

  const sessionStart = Date.now();
  let lastActivity = sessionStart;

  const trackSession = () => {
    const sessionDuration = Math.round((Date.now() - sessionStart) / 1000);
    trackEvent(MindMuscleEvents.SESSION_DURATION, {
      duration_seconds: sessionDuration,
      duration_minutes: Math.round(sessionDuration / 60),
    });
  };

  // Track activity
  const updateActivity = () => {
    lastActivity = Date.now();
  };

  // Event listeners for user activity
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, updateActivity, { passive: true });
  });

  // Track session on page unload
  window.addEventListener('beforeunload', trackSession);

  // Track session every 30 seconds if user is active
  const sessionInterval = setInterval(() => {
    if (Date.now() - lastActivity < 30000) { // Active within last 30 seconds
      trackSession();
    }
  }, 30000);

  // Cleanup function
  return () => {
    clearInterval(sessionInterval);
    window.removeEventListener('beforeunload', trackSession);
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.removeEventListener(event, updateActivity);
    });
  };
}

// Error tracking
export function trackError(error: Error, context?: Record<string, unknown>) {
  trackEvent('JavaScript Error', {
    error_message: error.message,
    error_stack: error.stack?.substring(0, 1000), // Limit stack trace length
    error_name: error.name,
    page_path: window.location.pathname,
    user_agent: navigator.userAgent,
    ...context,
  });
}

// Initialize error tracking
export function initErrorTracking() {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    trackError(event.error, {
      error_source: event.filename,
      error_line: event.lineno,
      error_column: event.colno,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    trackError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
      promise_rejection: true,
    });
  });
}

// Export everything  
export {
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
}; 