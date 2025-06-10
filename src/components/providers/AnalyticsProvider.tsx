'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { 
  trackWebVitals, 
  initScrollDepthTracking, 
  initSessionTracking, 
  initErrorTracking,
  trackPageView 
} from '@/lib/analytics';

interface AnalyticsContextType {
  isInitialized: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType>({ isInitialized: false });

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics only on client side
    if (typeof window === 'undefined') return;

    console.log('🚀 Initializing MindMuscle Analytics...');

    // Initialize Core Web Vitals tracking
    trackWebVitals();

    // Initialize scroll depth tracking
    const cleanupScrollDepth = initScrollDepthTracking();

    // Initialize session tracking
    const cleanupSession = initSessionTracking();

    // Initialize error tracking
    initErrorTracking();

    // Track initial page view with enhanced context
    trackPageView(window.location.pathname, {
      app_name: 'MindMuscle Landing',
      app_version: '1.0.0',
      timestamp: new Date().toISOString(),
    });

    // Log initialization complete
    console.log('✅ Analytics initialized successfully');

    // Cleanup function
    return () => {
      if (cleanupScrollDepth) cleanupScrollDepth();
      if (cleanupSession) cleanupSession();
    };
  }, []);

  return (
    <AnalyticsContext.Provider value={{ isInitialized: true }}>
      {children}
    </AnalyticsContext.Provider>
  );
} 