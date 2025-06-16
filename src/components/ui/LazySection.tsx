'use client';

import { ReactNode, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { LoadingFallback } from './LoadingFallback';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scale' | 'none';
  delay?: number;
  fallback?: ReactNode;
  suspense?: boolean;
}

const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  none: {
    initial: {},
    animate: {},
  },
};

export function LazySection({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  animation = 'fadeIn',
  delay = 0,
  fallback,
  suspense = true,
}: LazySectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });
  
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion && animation !== 'none';
  const variants = shouldAnimate ? animationVariants[animation] : animationVariants.none;

  // Don't render children until in viewport for performance
  // Use a simple loading placeholder without any focusable elements
  if (!isIntersecting) {
    return (
      <div 
        ref={ref as React.RefObject<HTMLDivElement>} 
        className={`min-h-[200px] ${className}`}
        aria-hidden="true"
      >
        {/* Only render non-interactive fallback content when aria-hidden */}
        {fallback && typeof fallback === 'string' ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            {fallback}
          </div>
        ) : null}
      </div>
    );
  }

  const content = (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={variants.initial}
      animate={variants.animate}
      transition={{
        duration: shouldAnimate ? 0.6 : 0,
        ease: 'easeOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );

  if (suspense) {
    return (
      <Suspense fallback={fallback || <LoadingFallback />}>
        {content}
      </Suspense>
    );
  }

  return content;
} 