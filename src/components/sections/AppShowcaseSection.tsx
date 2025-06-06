'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Smartphone, Play } from 'lucide-react';
import { AIDownloadIcon } from '@/components/ui/CustomIcons';
import { APP_SCREENSHOTS, ANIMATION_TIMING } from '@/lib/constants';
import { useScrollAnimation, SCROLL_VARIANTS } from '@/hooks/useScrollAnimation';

const mockupVariants = {
  initial: { opacity: 0, scale: 0.8, y: 80, rotateY: 15 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 1.2,
      ease: 'backOut',
    },
  },
  hover: {
    scale: 1.05,
    rotateY: -5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const screenshotVariants = {
  enter: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
};

export function AppShowcaseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { ref: headerRef, controls: headerControls } = useScrollAnimation({
    threshold: 0.3,
    delay: 0.1,
  });

  const { ref: mockupRef, controls: mockupControls } = useScrollAnimation({
    threshold: 0.2,
    delay: 0.3,
  });

  // Removed unused featuresRef and featuresControls

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === APP_SCREENSHOTS.length - 1 ? 0 : prev + 1
      );
    }, ANIMATION_TIMING.carousel);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev === APP_SCREENSHOTS.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? APP_SCREENSHOTS.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentScreenshot = APP_SCREENSHOTS[currentIndex];

  return (
    <section 
      className="py-24 bg-dark-900 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-800/30 to-dark-950/30" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          variants={SCROLL_VARIANTS.slideUp}
          initial="initial"
          animate={headerControls}
        >
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-sm font-medium text-primary-300 mb-6">
            <Smartphone className="w-4 h-4" />
            App Preview
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Experience <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">AI Fitness</span> 
            <br />in Action
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Get a sneak peek at the revolutionary AI fitness experience that&apos;s transforming how people approach their workouts.
          </p>
        </motion.div>

        {/* Showcase Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Phone Mockup */}
          <motion.div
            ref={mockupRef}
            className="relative mx-auto max-w-sm lg:max-w-none lg:mx-0 perspective-1000"
            variants={mockupVariants}
            initial="initial"
            animate={mockupControls}
            whileHover="hover"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Phone Frame */}
            <div className="relative">
              {/* Outer Frame */}
              <div className="relative w-72 sm:w-80 h-[576px] sm:h-[640px] mx-auto bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[3rem] p-2 shadow-2xl">
                {/* Inner Frame */}
                <div className="w-full h-full bg-black rounded-[2.5rem] p-1">
                  {/* Screen */}
                  <div className="relative w-full h-full bg-dark-950 rounded-[2rem] overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                    
                    {/* Screenshot Container */}
                    <div className="relative w-full h-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentIndex}
                          className="absolute inset-0 w-full h-full"
                          variants={screenshotVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                        >
                          <Image
                            src={currentScreenshot.image}
                            alt={currentScreenshot.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover rounded-[2rem]"
                            priority={currentIndex === 0}
                            unoptimized={currentScreenshot.image.startsWith('data:')}
                          />
                          
                          {/* Overlay with app-like elements */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 rounded-[2rem]" />
                          
                          {/* Status bar */}
                          <div className="absolute top-2 left-4 right-4 flex justify-between items-center text-white text-xs z-10">
                            <span>9:41</span>
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-white rounded-full" />
                              <div className="w-1 h-1 bg-white rounded-full" />
                              <div className="w-1 h-1 bg-white/50 rounded-full" />
                              <div className="w-4 h-2 border border-white rounded-sm">
                                <div className="w-3/4 h-full bg-green-500 rounded-sm" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
              </div>

              {/* Floating Action Button */}
              <motion.button
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/25"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(139, 92, 246, 0.4)',
                    '0 0 0 10px rgba(139, 92, 246, 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Play className="w-6 h-6 text-white ml-0.5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Current Screenshot Info */}
            <div className="space-y-4">
              <motion.h3
                key={`title-${currentIndex}`}
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentScreenshot.title}
              </motion.h3>
              <motion.p
                key={`desc-${currentIndex}`}
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {currentScreenshot.description}
              </motion.p>
            </div>

            {/* Screenshot Navigation */}
            <div className="space-y-6">
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {APP_SCREENSHOTS.map((screenshot, index) => (
                  <motion.button
                    key={screenshot.id}
                    className={`relative aspect-[9/16] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? 'border-primary-500 shadow-lg shadow-primary-500/25'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={screenshot.image}
                      alt={screenshot.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, 80px"
                      className="object-cover"
                      priority={index === 0}
                      unoptimized={screenshot.image.startsWith('data:')}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </motion.button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <motion.button
                    className="w-10 h-10 bg-dark-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all duration-300"
                    onClick={goToPrev}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="w-10 h-10 bg-dark-800 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all duration-300"
                    onClick={goToNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2">
                  {APP_SCREENSHOTS.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? 'bg-primary-500' : 'bg-gray-700'
                      }`}
                      animate={{
                        scale: index === currentIndex ? 1.2 : 1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <AIDownloadIcon className="w-5 h-5" />
                Get Early Access
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 