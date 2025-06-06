'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { PhoneMockup } from '@/components/ui/PhoneMockup';
import { STORE_LINKS, APP_SCREENSHOTS, ANIMATION_TIMING } from '@/lib/constants';
import { trackEvent } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Download, PlayCircle, ChevronRight, Sparkles } from 'lucide-react';

const heroVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'backOut',
      delay: 0.4,
    },
  },
};

const phoneVariants = {
  initial: { opacity: 0, scale: 0.85, rotate: 2 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
      delay: 0.6,
    },
  },
};

export function HeroSection() {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Auto-advance carousel logic
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => 
        prev === APP_SCREENSHOTS.length - 1 ? 0 : prev + 1
      );
    }, ANIMATION_TIMING.carousel);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  const handleAppStoreClick = () => {
    trackEvent('hero_appstore_click', {
      section: 'hero',
      button_type: 'primary',
    });
    window.open(STORE_LINKS.appStore, '_blank');
  };

  const handlePlayStoreClick = () => {
    trackEvent('hero_playstore_click', {
      section: 'hero',
      button_type: 'secondary',
    });
    window.open(STORE_LINKS.playStore, '_blank');
  };

  const handleWaitlistClick = () => {
    trackEvent('hero_waitlist_click', {
      section: 'hero',
      button_type: 'waitlist',
    });
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950"
      variants={heroVariants}
      initial="initial"
      animate="animate"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-cyan/10" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        {/* Floating Elements - Only animate if motion is not reduced */}
        {!prefersReducedMotion ? (
          <>
            <motion.div
              className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl opacity-30" />
            <div className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl opacity-20" />
          </>
        )}
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen items-center">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            
            {/* Left Content */}
            <motion.div
              className="space-y-8 text-center lg:text-left"
              variants={textVariants}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300 backdrop-blur-sm"
                variants={textVariants}
              >
                <Sparkles className="h-4 w-4" />
                Coming Summer 2025
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                variants={textVariants}
              >
                The Future of{' '}
                <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                Fitness is Here
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="mx-auto max-w-lg text-lg text-gray-300 lg:mx-0 lg:text-xl"
                variants={textVariants}
              >
                Experience personalized workouts that adapt and evolve with every rep. 
                Your AI fitness coach learns from your progress to deliver results like never before.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
                variants={buttonVariants}
              >
                <MagneticButton
                  onClick={handleAppStoreClick}
                  className="group inline-flex items-center gap-3 rounded-xl bg-primary-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-600 hover:shadow-2xl hover:shadow-primary-500/25"
                  strength={0.3}
                >
                  <Download className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Download on App Store
                </MagneticButton>

                <MagneticButton
                  onClick={handlePlayStoreClick}
                  className="group inline-flex items-center gap-3 rounded-xl border-2 border-primary-500 bg-transparent px-8 py-4 text-lg font-semibold text-primary-400 transition-all duration-300 hover:bg-primary-500/10 hover:text-primary-300"
                  strength={0.2}
                >
                  <PlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Get on Google Play
                </MagneticButton>
              </motion.div>

              {/* Waitlist Link */}
              <motion.button
                onClick={handleWaitlistClick}
                className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-primary-400"
                variants={textVariants}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                Join the waitlist for early access
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              className="flex justify-center lg:justify-end"
              variants={phoneVariants}
            >
              <PhoneMockup
                currentScreenshot={currentScreenshot}
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
                onTouchStart={() => setIsCarouselPaused(true)}
                onTouchEnd={() => setIsCarouselPaused(false)}
              />
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-gray-400"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll to explore</span>
          <div className="h-8 w-0.5 bg-gradient-to-b from-primary-500 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
} 