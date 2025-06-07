'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useAnimation } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
  ease?: string;
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
    } else if (!triggerOnce) {
      controls.start('initial');
    }
  }, [isInView, controls, delay, triggerOnce]);

  return { ref, controls, isInView };
}

// Enhanced animation variants with more sophisticated effects
export const SCROLL_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  },
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  },
  slideDown: {
    initial: { opacity: 0, y: -40 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: 'backOut' }
    },
  },
  scaleInBounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: 'backOut',
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
  },
  rotateIn: {
    initial: { opacity: 0, rotate: 10, scale: 0.9 },
    animate: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  },
  flipIn: {
    initial: { opacity: 0, rotateY: 90, scale: 0.8 },
    animate: { 
      opacity: 1, 
      rotateY: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  },
  elasticIn: {
    initial: { opacity: 0, scale: 0.3, rotate: -10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 1.2, 
        ease: 'elasticOut',
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    },
  },
  blurIn: {
    initial: { opacity: 0, filter: 'blur(10px)', scale: 1.1 },
    animate: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  },
  morphIn: {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
      borderRadius: '50%',
      rotate: 180
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      borderRadius: '0%',
      rotate: 0,
      transition: { duration: 1, ease: 'easeOut' }
    },
  },
};

// Enhanced stagger animation hook with more control
export function useStaggerAnimation(
  itemsCount: number,
  options: UseScrollAnimationOptions & { 
    staggerDelay?: number;
    variant?: keyof typeof SCROLL_VARIANTS;
  } = {}
) {
  const { 
    delay = 0, 
    staggerDelay = 0.1,
    variant = 'slideUp',
    duration = 0.6,
    ease = 'easeOut',
    ...restOptions 
  } = options;
  
  const { ref, controls, isInView } = useScrollAnimation(restOptions);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start((i: number) => ({
          ...SCROLL_VARIANTS[variant].animate,
          transition: {
            delay: i * staggerDelay,
            duration,
            ease,
          },
        }));
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, controls, delay, staggerDelay, variant, duration, ease]);

  return { ref, controls, isInView };
}

// Parallax scroll hook for advanced effects
export function useParallaxScroll(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate if element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = -(scrolled - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}

// Advanced scroll-triggered animation with intersection observer
export function useAdvancedScrollAnimation(
  animationType: 'fadeIn' | 'slideUp' | 'scaleIn' | 'rotateIn' = 'fadeIn',
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    delay?: number;
  } = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            controls.start('animate');
          }, delay * 1000);
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          controls.start('initial');
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [controls, threshold, rootMargin, triggerOnce, delay]);

  return { 
    ref, 
    controls, 
    variants: SCROLL_VARIANTS[animationType] 
  };
}

// Text reveal animation hook
export function useTextReveal(
  text: string,
  options: {
    threshold?: number;
    delay?: number;
    staggerDelay?: number;
  } = {}
) {
  const {
    threshold = 0.3,
    delay = 0,
    staggerDelay = 0.05,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, {
    amount: threshold,
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start('animate');
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, controls, delay]);

  const words = text.split(' ');

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariants = {
    initial: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return {
    ref,
    controls,
    words,
    containerVariants,
    wordVariants,
  };
}

// Scroll-triggered counter animation
export function useCounterAnimation(
  target: number,
  options: {
    threshold?: number;
    duration?: number;
    delay?: number;
  } = {}
) {
  const {
    threshold = 0.3,
    duration = 2,
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const isInView = useInView(ref, {
    amount: threshold,
    once: true,
  });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const startTime = Date.now();
        const startValue = 0;
        const endValue = target;

        const animate = () => {
          const now = Date.now();
          const elapsed = (now - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
          
          setCount(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, target, duration, delay]);

  return { ref, count };
} 