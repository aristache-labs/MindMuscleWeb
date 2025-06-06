'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { APP_SCREENSHOTS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface PhoneMockupProps {
  currentScreenshot: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  className?: string;
}

const phoneVariants = {
  idle: {
    rotateY: 0,
    rotateX: 0,
  },
  hover: {
    rotateY: 5,
    rotateX: 5,
  },
};

const screenVariants = {
  enter: {
    opacity: 0,
    scale: 1.1,
    filter: 'blur(10px)',
  },
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: 'blur(10px)',
  },
};

export function PhoneMockup({
  currentScreenshot,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  className,
}: PhoneMockupProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({});

  // Preload images
  useEffect(() => {
    APP_SCREENSHOTS.forEach((screenshot, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImageLoadStates(prev => ({ ...prev, [index]: true }));
      };
      img.src = screenshot.image;
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
  };

  const currentScreenshotData = APP_SCREENSHOTS[currentScreenshot];

  return (
    <motion.div
      className={cn(
        'relative perspective-1000',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      variants={phoneVariants}
      animate={isHovered ? 'hover' : 'idle'}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Phone Frame */}
      <div className="relative h-[680px] w-[320px] transform-gpu">
        {/* Phone Shadow */}
        <motion.div
          className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 blur-xl"
          animate={{
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Phone Body */}
        <div className="relative h-full w-full rounded-[2.5rem] bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl">
          {/* Screen Bezel */}
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
            
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-1 z-20 h-5 w-16 -translate-x-1/2 rounded-full bg-black" />
            
            {/* Screen Content */}
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreenshot}
                  className="absolute inset-0"
                  variants={screenVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                >
                  {imageLoadStates[currentScreenshot] ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={currentScreenshotData.image}
                        alt={currentScreenshotData.alt}
                        fill
                        className="object-cover"
                        sizes="320px"
                        priority={currentScreenshot === 0}
                      />
                    </div>
                  ) : (
                    // Loading placeholder
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-900/50 to-dark-900">
                      <motion.div
                        className="h-8 w-8 rounded-full border-2 border-primary-500 border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Screen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white/20" />
        </div>

        {/* Floating UI Elements */}
        <motion.div
          className="absolute -right-8 top-20"
          animate={{
            y: [0, -10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="rounded-xl bg-primary-500/90 p-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
            AI Learning...
          </div>
        </motion.div>

        <motion.div
          className="absolute -left-8 bottom-32"
          animate={{
            y: [0, 10, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="rounded-xl bg-accent-cyan/90 p-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
            +12% Progress
          </div>
        </motion.div>
      </div>

      {/* Screenshot Indicators */}
      <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {APP_SCREENSHOTS.map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              'h-2 w-2 rounded-full transition-all duration-300',
              index === currentScreenshot
                ? 'bg-primary-500 w-6'
                : 'bg-gray-600 hover:bg-gray-500'
            )}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
} 