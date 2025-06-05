'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';

export default function Showcase() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  
  // Container ref for manual scroll tracking - using native scroll events for better performance

  const screenshots = useMemo(() => [
    {
      title: "Dashboard Overview",
      description:
        "Clean, intuitive interface showing your daily progress, upcoming workouts, and AI recommendations.",
      image: "/images/screenshot1.webp",
    },
    {
      title: "Workout Generator",
      description:
        "AI-powered workout creation based on your goals, available time, and equipment preferences.",
      image: "/images/screenshot2.webp",
    },
    {
      title: "Form Analysis",
      description:
        "Real-time computer vision feedback helping you maintain perfect form and prevent injuries.",
      image: "/images/screenshot3.webp",
    },
    {
      title: "Progress Tracking",
      description:
        "Comprehensive analytics and insights to monitor your fitness journey and celebrate milestones.",
      image: "/images/screenshot4.webp",
    },
  ], []);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const promises = screenshots.map((screenshot) => {
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = screenshot.image;
          link.onload = () => resolve(link);
          link.onerror = () => reject(new Error(`Failed to preload ${screenshot.image}`));
          document.head.appendChild(link);
        });
      });
      
      try {
        await Promise.all(promises);
        setIsLoaded(true);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        setIsLoaded(true); // Still show content even if preload fails
      }
    };

    preloadImages();
  }, [screenshots]);

  // Scroll-triggered image switching with improved performance
  useEffect(() => {
    if (!isLoaded || !rightColumnRef.current) return;

    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const rightColumn = rightColumnRef.current;
        if (!rightColumn) return;

        const sections = rightColumn.querySelectorAll('[data-section]');
        const windowHeight = window.innerHeight;
        
        let newIndex = 0;
        let minDistance = Infinity;

        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const screenCenter = windowHeight / 2;
          const distance = Math.abs(sectionCenter - screenCenter);

          if (distance < minDistance) {
            minDistance = distance;
            newIndex = index;
          }
        });

        if (newIndex !== currentImageIndex) {
          setCurrentImageIndex(newIndex);
        }
      });
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [currentImageIndex, isLoaded]);

  return (
    <section className="relative py-16 lg:py-24" ref={containerRef}>
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
          App <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Showcase</span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Explore the intuitive interface designed to make AI-powered fitness accessible to everyone
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Sticky Phone Mockup with Dynamic Screenshots */}
        <div className="lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-sm"
          >
            {/* Phone Frame */}
            <div className="relative w-80 h-[640px] bg-gradient-to-br from-dark-surface via-dark-bg to-dark-surface rounded-[2.5rem] border-4 border-white/10 shadow-2xl overflow-hidden">
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-dark-bg rounded-b-2xl border-x-2 border-b-2 border-white/10"></div>
              
              {/* Phone Screen */}
              <div className="p-6 h-full pt-10">
                <div className="bg-dark-bg/80 backdrop-blur-sm rounded-3xl h-full border border-white/10 overflow-hidden relative">
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center text-xs text-white/60 p-4 bg-dark-surface/30">
                    <span className="font-semibold">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-white/20 rounded-sm"></div>
                      <div className="w-4 h-2 bg-white/30 rounded-sm"></div>
                      <div className="w-4 h-2 bg-neon-cyan rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Dynamic Screenshot Area */}
                  <div className="relative flex-1 h-full">
                    {screenshots.map((screenshot, index) => (
                      <motion.div
                        key={index}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: currentImageIndex === index ? 1 : 0,
                          scale: currentImageIndex === index ? 1 : 1.05
                        }}
                        transition={{ 
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1] // Custom easing for smooth transitions
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={screenshot.image}
                            alt={screenshot.title}
                            fill
                            sizes="320px"
                            priority={index === 0}
                            className="object-cover"
                            style={{
                              filter: 'brightness(0.95) contrast(1.05)',
                            }}
                          />
                          
                          {/* Subtle overlay for better text readability if needed */}
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/20 via-transparent to-transparent"></div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Loading state */}
                    {!isLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-dark-bg/50">
                        <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom navigation indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {screenshots.map((_, index) => (
                      <motion.div
                        key={index}
                        className="w-2 h-2 rounded-full"
                        animate={{
                          backgroundColor: currentImageIndex === index 
                            ? 'rgb(34, 211, 238)' // neon-cyan
                            : 'rgba(255, 255, 255, 0.3)'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements with subtle animations */}
            <motion.div 
              className="absolute -top-8 -left-8 w-16 h-16 bg-primary-purple/10 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-8 -right-8 w-20 h-20 bg-neon-cyan/10 rounded-full blur-xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Scroll Area with Screenshots */}
        <div className="space-y-32" ref={rightColumnRef}>
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              data-section={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ delay: index * 0.1 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-r from-primary-purple to-neon-cyan rounded-full flex items-center justify-center text-sm font-bold text-dark-bg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {index + 1}
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-white">
                    {screenshot.title}
                  </h3>
                </div>

                <p className="text-white/70 leading-relaxed text-lg lg:text-xl">
                  {screenshot.description}
                </p>
              </div>

              {/* Desktop Screenshot Preview */}
              <motion.div 
                className="relative aspect-video bg-dark-surface/30 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(124, 58, 237, 0.5)'
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={screenshot.image}
                  alt={screenshot.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority={index === 0}
                  className="object-cover"
                />
                
                {/* Overlay gradient for better visual hierarchy */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/20 via-transparent to-transparent"></div>
                
                {/* Feature highlights */}
                <div className="absolute top-4 right-4">
                  <motion.div 
                    className="px-3 py-1 bg-neon-cyan/20 backdrop-blur-sm text-neon-cyan text-xs font-medium rounded-full border border-neon-cyan/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {index === 0 && "AI Dashboard"}
                    {index === 1 && "Smart Generation"}
                    {index === 2 && "Real-time Analysis"}
                    {index === 3 && "Progress Insights"}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 