'use client';

import { useEffect, useRef } from 'react';
import { useInView, useAnimation } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start('animate');
      }, delay * 1000);

      return () => clearTimeout(timer);
    } else {
      controls.start('initial');
    }
  }, [isInView, controls, delay]);

  return { ref, controls, isInView };
}

// Predefined animation variants
export const SCROLL_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: 5 },
    animate: { opacity: 1, rotate: 0 },
  },
};

// Stagger animation hook
export function useStaggerAnimation(
  itemsCount: number,
  options: UseScrollAnimationOptions = {}
) {
  const { delay = 0, ...restOptions } = options;
  const { ref, controls, isInView } = useScrollAnimation(restOptions);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start((i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: 'easeOut',
          },
        }));
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, controls, delay]);

  return { ref, controls, isInView };
} 