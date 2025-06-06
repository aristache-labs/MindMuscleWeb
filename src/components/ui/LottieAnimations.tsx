'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, useInView } from 'framer-motion';

// DotLottie instance type definition based on the library's API
interface DotLottieInstance {
  play(): void;
  pause(): void;
  stop(): void;
  setFrame(frame: number): void;
  addEventListener(event: string, callback: (...args: unknown[]) => void): void;
  removeEventListener(event: string, callback: (...args: unknown[]) => void): void;
}

// Lottie Animation Props Interface
interface LottieAnimationProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  playOnScroll?: boolean;
  trigger?: 'hover' | 'click' | 'scroll' | 'auto';
  width?: number | string;
  height?: number | string;
  responsive?: boolean;
}

// Enhanced Lottie Component with Scroll Trigger
export const EnhancedLottieAnimation: React.FC<LottieAnimationProps> = ({
  src,
  className = '',
  autoplay = true,
  loop = true,
  speed = 1,
  playOnScroll = false,
  trigger = 'auto',
  width = '100%',
  height = '100%',
  responsive = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [dotLottie, setDotLottie] = useState<DotLottieInstance | null>(null);

  const dotLottieRefCallback = (dotLottie: DotLottieInstance | null) => {
    setDotLottie(dotLottie);
  };

  useEffect(() => {
    if (playOnScroll && dotLottie) {
      if (isInView) {
        dotLottie.play();
        setIsPlaying(true);
      } else {
        dotLottie.pause();
        setIsPlaying(false);
      }
    }
  }, [isInView, playOnScroll, dotLottie]);

  const handleHover = () => {
    if (trigger === 'hover' && dotLottie) {
      dotLottie.play();
      setIsPlaying(true);
    }
  };

  const handleClick = () => {
    if (trigger === 'click' && dotLottie) {
      if (isPlaying) {
        dotLottie.pause();
        setIsPlaying(false);
      } else {
        dotLottie.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`${className} ${responsive ? 'w-full h-full' : ''}`}
      style={{ width, height }}
      onMouseEnter={handleHover}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={trigger === 'auto' ? autoplay : false}
        speed={speed}
        dotLottieRefCallback={dotLottieRefCallback}
        className="w-full h-full"
      />
    </motion.div>
  );
};

// AI Brain Animation for Hero Section
export const AIBrainAnimation: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40',
    lg: 'w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64'
  };



  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Fallback SVG while we create proper Lottie files */}
      <motion.div
        className="w-full h-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#E11D48" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          
          {/* Brain outline */}
          <path
            d="M75 20C55 20 40 35 40 55C25 55 10 70 10 85C10 100 25 115 40 115V130C40 155 60 175 85 175C95 175 105 170 110 165C115 170 125 175 135 175C160 175 180 155 180 130V115C195 115 210 100 210 85C210 70 195 55 180 55C180 35 165 20 145 20C135 20 125 25 120 30C115 25 105 20 95 20H75Z"
            stroke="url(#brainGradient)"
            strokeWidth="3"
            fill="none"
            transform="scale(0.8) translate(20, 20)"
          />
          
          {/* Neural network nodes */}
          <motion.circle
            cx="70"
            cy="70"
            r="4"
            fill="#8B5CF6"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="130"
            cy="70"
            r="4"
            fill="#8B5CF6"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="4"
            fill="#8B5CF6"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <motion.circle
            cx="80"
            cy="130"
            r="4"
            fill="#E11D48"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
          <motion.circle
            cx="120"
            cy="130"
            r="4"
            fill="#22D3EE"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          />
          
          {/* Connection lines */}
          <motion.path
            d="M70 70L100 100M130 70L100 100M100 100L80 130M100 100L120 130"
            stroke="#8B5CF6"
            strokeWidth="2"
            opacity="0.6"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

// Loading Animation for Interactive Elements
export const LoadingAnimation: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <motion.div
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="60"
            strokeDashoffset="40"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};

// Success Checkmark Animation
export const SuccessAnimation: React.FC<{ className?: string; onComplete?: () => void }> = ({ 
  className = '', 
  onComplete 
}) => {
  return (
    <motion.div
      className={`w-8 h-8 ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, ease: 'backOut' }}
      onAnimationComplete={onComplete}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          fill="#10B981"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M9 12L11 14L15 10"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
};

// Floating Elements Animation for Hero Section
export const FloatingElementsAnimation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [elements, setElements] = useState<Array<{
    left: number;
    top: number;
    xMovement: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate deterministic positions only on client side
    const newElements = [...Array(6)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      xMovement: Math.random() * 20 - 10,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setElements(newElements);
  }, []);

  // Don't render anything during SSR to avoid hydration mismatch
  if (elements.length === 0) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full opacity-30"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, element.xMovement, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Pulse Animation for Call-to-Action Buttons
export const PulseAnimation: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}> = ({ 
  children, 
  className = '',
  intensity = 'medium'
}) => {
  const pulseVariants = {
    subtle: {
      scale: [1, 1.02, 1],
      opacity: [1, 0.9, 1],
    },
    medium: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
    },
    strong: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.7, 1],
    }
  };

  return (
    <motion.div
      className={className}
      animate={pulseVariants[intensity]}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

// Scroll Progress Animation
export const ScrollProgressAnimation: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-accent-cyan z-50 ${className}`}
      style={{ width: `${scrollProgress * 100}%` }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.1 }}
    />
  );
};

// Stagger Animation for Lists/Grids
export const StaggerContainer: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  staggerDelay?: number;
}> = ({ 
  children, 
  className = '',
  staggerDelay = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: 0.6,
                ease: 'easeOut',
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export {
  EnhancedLottieAnimation as LottieAnimation,
}; 