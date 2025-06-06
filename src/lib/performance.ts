// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'set' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Performance monitoring utilities
export const performanceMonitor = {
  // Log Core Web Vitals
  logCWV: (metric: {
    name: string;
    value: number;
    delta: number;
    id: string;
    rating: 'good' | 'needs-improvement' | 'poor';
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }
  },

  // Measure loading performance
  measureLoadTime: (name: string, startTime: number) => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  },

  // Mark performance milestones
  mark: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
    }
  },

  // Measure between marks
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        if (process.env.NODE_ENV === 'development') {
          console.log(`Performance: ${name} took ${measure.duration.toFixed(2)}ms`);
        }
        return measure.duration;
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
    return 0;
  },
};

// Lazy loading utilities
export const lazyLoadHelpers = {
  // Check if element is in viewport
  isInViewport: (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Preload critical resources
  preloadResource: (href: string, as: string, type?: string) => {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    
    document.head.appendChild(link);
  },

  // Prefetch next page resources
  prefetchPage: (href: string) => {
    if (typeof window === 'undefined') return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    
    document.head.appendChild(link);
  },
};

// Animation optimization
export const animationHelpers = {
  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get optimized animation duration based on user preference
  getAnimationDuration: (normalDuration: number): number => {
    return animationHelpers.prefersReducedMotion() ? 0 : normalDuration;
  },

  // Create performance-optimized animation config
  createAnimationConfig: (config: {
    duration?: number;
    ease?: string;
    delay?: number;
  }) => ({
    duration: animationHelpers.getAnimationDuration(config.duration || 0.3),
    ease: config.ease || 'easeOut',
    delay: animationHelpers.getAnimationDuration(config.delay || 0),
  }),
};

// Bundle optimization helpers
export const bundleHelpers = {
  // Dynamic import with error handling
  dynamicImport: async <T>(importFn: () => Promise<T>): Promise<T | null> => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Dynamic import failed:', error);
      return null;
    }
  },

  // Preload module for faster subsequent imports
  preloadModule: async (importFn: () => Promise<unknown>): Promise<void> => {
    try {
      await importFn();
    } catch (error) {
      console.warn('Module preload failed:', error);
    }
  },
};

// Memory management
export const memoryHelpers = {
  // Cleanup function for removing event listeners
  cleanup: (cleanupFns: (() => void)[]) => {
    return () => {
      cleanupFns.forEach(fn => {
        try {
          fn();
        } catch (error) {
          console.warn('Cleanup function failed:', error);
        }
      });
    };
  },

  // Debounce function calls
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  // Throttle function calls
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
}; 