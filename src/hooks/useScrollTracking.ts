'use client';

import { useEffect, useRef } from 'react';
import { trackSectionView } from '@/lib/analytics';

interface UseScrollTrackingOptions {
  sectionName: string;
  threshold?: number;
  triggerOnce?: boolean;
}

/**
 * Custom hook for tracking when a section comes into view
 * @param options - Configuration options for scroll tracking
 * @returns ref - Ref to attach to the element you want to track
 */
export const useScrollTracking = ({ 
  sectionName, 
  threshold = 0.5, 
  triggerOnce = true 
}: UseScrollTrackingOptions) => {
  const ref = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only trigger once if triggerOnce is true
            if (triggerOnce && hasTriggered.current) {
              return;
            }

            trackSectionView(sectionName);
            hasTriggered.current = true;

            // If triggerOnce is true, disconnect observer after first trigger
            if (triggerOnce) {
              observer.disconnect();
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px', // Trigger when section is 10% into viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, threshold, triggerOnce]);

  return ref;
}; 