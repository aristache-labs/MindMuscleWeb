'use client';

import { useEffect } from 'react';
import { performanceMonitor } from '@/lib/performance';

interface PerformanceMonitorProps {
  enableCWV?: boolean;
  enableResourceTiming?: boolean;
  enableNavigationTiming?: boolean;
}

export function PerformanceMonitor({
  enableCWV = true,
  enableResourceTiming = false,
  enableNavigationTiming = false,
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enableCWV) return;

    // Dynamic import of web-vitals to avoid blocking
    const loadWebVitals = async () => {
      try {
        const webVitals = await import('web-vitals');
        
        // Track Core Web Vitals
        if (webVitals.onCLS) webVitals.onCLS(performanceMonitor.logCWV);
        if (webVitals.onFID) webVitals.onFID(performanceMonitor.logCWV);
        if (webVitals.onFCP) webVitals.onFCP(performanceMonitor.logCWV);
        if (webVitals.onLCP) webVitals.onLCP(performanceMonitor.logCWV);
        if (webVitals.onTTFB) webVitals.onTTFB(performanceMonitor.logCWV);
      } catch (error) {
        console.warn('Failed to load web-vitals:', error);
      }
    };

    loadWebVitals();
  }, [enableCWV]);

  useEffect(() => {
    if (!enableResourceTiming) return;

    const logResourceTiming = () => {
      if (typeof window === 'undefined' || !('performance' in window)) return;

      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 1000);
      
      if (slowResources.length > 0 && process.env.NODE_ENV === 'development') {
        console.warn('Slow resources detected:', slowResources);
      }
    };

    // Log resource timing after page load
    if (document.readyState === 'complete') {
      logResourceTiming();
    } else {
      window.addEventListener('load', logResourceTiming);
      return () => window.removeEventListener('load', logResourceTiming);
    }
  }, [enableResourceTiming]);

  useEffect(() => {
    if (!enableNavigationTiming) return;

    const logNavigationTiming = () => {
      if (typeof window === 'undefined' || !('performance' in window)) return;

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!navigation) return;

      const metrics = {
        'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
        'TCP Connection': navigation.connectEnd - navigation.connectStart,
        'Request': navigation.responseStart - navigation.requestStart,
        'Response': navigation.responseEnd - navigation.responseStart,
        'DOM Processing': navigation.domComplete - navigation.domInteractive,
        'Load Event': navigation.loadEventEnd - navigation.loadEventStart,
      };

      if (process.env.NODE_ENV === 'development') {
        console.table(metrics);
      }
    };

    if (document.readyState === 'complete') {
      logNavigationTiming();
    } else {
      window.addEventListener('load', logNavigationTiming);
      return () => window.removeEventListener('load', logNavigationTiming);
    }
  }, [enableNavigationTiming]);

  // This component doesn't render anything
  return null;
} 