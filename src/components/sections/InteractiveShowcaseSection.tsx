'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Play, ChevronRight, Check } from 'lucide-react';
import { AIPowerIcon, AITargetIcon, AIAnalyticsIcon, AICommunityIcon } from '@/components/ui/CustomIcons';
import { InteractiveAppPreview } from '@/components/ui/InteractiveAppPreview';

import { useScrollAnimation, SCROLL_VARIANTS } from '@/hooks/useScrollAnimation';
import { useWaitlistModal } from '@/components/providers/WaitlistModalProvider';

const features = [
  {
    id: 'ai-insights',
    icon: AIPowerIcon,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your performance and goals.',
    color: 'from-primary-500 to-primary-600',
    details: ['Real-time analysis', 'Personalized coaching', 'Adaptive recommendations'],
  },
  {
    id: 'workout-tracking',
    icon: AITargetIcon,
    title: 'Smart Workout Tracking',
    description: 'Track every rep, set, and exercise with intuitive controls.',
    color: 'from-green-500 to-green-600',
    details: ['Automatic rep counting', 'Form analysis', 'Progress tracking'],
  },
  {
    id: 'progress-tracking',
    icon: AIAnalyticsIcon,
    title: 'Progress Analytics',
    description: 'Visualize your fitness journey with detailed progress charts.',
    color: 'from-blue-500 to-blue-600',
    details: ['Performance metrics', 'Trend analysis', 'Goal predictions'],
  },
  {
    id: 'community',
    icon: AICommunityIcon,
    title: 'Social Features',
    description: 'Connect with friends and join challenges to stay motivated.',
    color: 'from-purple-500 to-purple-600',
    details: ['Friend challenges', 'Leaderboards', 'Community support'],
  },
];

export function InteractiveShowcaseSection() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { openModal } = useWaitlistModal();

  // Auto-advance through features
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % features.length);
    }, 4000); // Change feature every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const { ref: headerRef, controls: headerControls } = useScrollAnimation({
    threshold: 0.3,
    delay: 0.1,
  });

  const { ref: previewRef, controls: previewControls } = useScrollAnimation({
    threshold: 0.2,
    delay: 0.3,
  });

  const { ref: featuresRef, controls: featuresControls } = useScrollAnimation({
    threshold: 0.2,
    delay: 0.5,
  });

  return (
    <section 
      id="showcase"
      className="py-16 sm:py-20 lg:py-24 bg-dark-900 relative overflow-hidden"
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
          className="text-center mb-12 sm:mb-16"
          variants={SCROLL_VARIANTS.slideUp}
          initial="initial"
          animate={headerControls}
        >
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-sm font-medium text-primary-300 mb-6">
            <Smartphone className="w-4 h-4" />
            Interactive Demo
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
            Try the <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">AI Fitness</span> 
            <br />Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Interact with our live app demo to see how AI-powered fitness feels. 
            Tap through real screens and experience the future of personal training.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 items-start">
          
          {/* Interactive App Preview */}
          <motion.div
            ref={previewRef}
            className="relative order-2 lg:order-1 lg:col-span-2 flex justify-center lg:justify-start"
            variants={SCROLL_VARIANTS.slideRight}
            initial="initial"
            animate={previewControls}
          >
            <div className="relative">
              {/* Static Bubbles around the phone */}
              <div className="absolute -top-8 -left-4 sm:-left-8 bg-primary-500/20 border border-primary-500/30 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-primary-300 backdrop-blur-sm shadow-lg z-10">
                👆 Tap to interact!
              </div>

              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-green-500/20 border border-green-500/30 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-green-300 backdrop-blur-sm shadow-lg z-10">
                ⚡ Real-time AI
              </div>

              {/* App Preview */}
              <InteractiveAppPreview className="perspective-1000" />
            </div>
          </motion.div>

          {/* Feature Highlights - Redesigned */}
          <motion.div
            ref={featuresRef}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2 lg:col-span-3 lg:pl-4"
            variants={SCROLL_VARIANTS.slideLeft}
            initial="initial"
            animate={featuresControls}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="mb-8 sm:mb-10 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                What Makes It <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Special</span>
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed px-4 sm:px-0">
                Every element is designed to provide the most intuitive and effective 
                fitness experience powered by cutting-edge AI technology.
              </p>
            </div>

                        {/* Breadcrumb-style Feature Navigation */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 lg:gap-2 overflow-x-auto lg:overflow-visible">
                {features.map((feature, index) => (
                  <div key={feature.id} className="flex items-center gap-1.5 lg:gap-2 flex-shrink-0">
                    <motion.button
                      className={`px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                        selectedFeature === index
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                          : 'bg-gray-800/30 text-gray-400 border border-gray-700/30 hover:bg-gray-700/30'
                      }`}
                      onClick={() => {
                        setSelectedFeature(index);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 8000); // Resume auto-play after 8 seconds
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {feature.title}
                    </motion.button>
                    {index < features.length - 1 && (
                      <ChevronRight className="w-3 h-3 text-gray-600 hidden sm:block flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Feature Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature}
                className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/50 rounded-3xl p-6 sm:p-8 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <motion.div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${features[selectedFeature].color} bg-opacity-20 flex-shrink-0`}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: 'backOut' }}
                  >
                    {(() => {
                      const IconComponent = features[selectedFeature].icon;
                      return <IconComponent size={32} className="text-white" strokeWidth={1.5} />;
                    })()}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.h4
                      className="text-xl sm:text-2xl font-bold text-white mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      {features[selectedFeature].title}
                    </motion.h4>
                    
                    <motion.p
                      className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {features[selectedFeature].description}
                    </motion.p>

                    {/* Feature Details */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      {features[selectedFeature].details.map((detail, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 flex items-center gap-2">
                  {features.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        index === selectedFeature ? 'bg-primary-500 w-8' : 'bg-gray-700 w-2'
                      }`}
                      layoutId={`indicator-${index}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Auto-advance Feature Showcase */}
            <motion.div
              className="flex items-center justify-between pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex gap-2">
                {features.map((_, index) => (
                                     <motion.button
                     key={index}
                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
                       index === selectedFeature ? 'bg-primary-500' : 'bg-gray-600 hover:bg-gray-500'
                     }`}
                     onClick={() => {
                       setSelectedFeature(index);
                       setIsAutoPlaying(false);
                       setTimeout(() => setIsAutoPlaying(true), 8000);
                     }}
                     whileHover={{ scale: 1.2 }}
                     whileTap={{ scale: 0.9 }}
                   />
                ))}
              </div>
              
                                            <motion.button
                 className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors"
                 onClick={() => {
                   setSelectedFeature((prev) => (prev + 1) % features.length);
                   setIsAutoPlaying(false);
                   setTimeout(() => setIsAutoPlaying(true), 8000);
                 }}
                 whileHover={{ x: 5 }}
               >
                 Next Feature →
               </motion.button>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="pt-12 sm:pt-16 lg:pt-12 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.button
                className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl px-8 py-4 text-white font-semibold transition-all duration-300 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-primary-500/25 mt-8 sm:mt-6 lg:mt-0"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openModal()}
              >
                <div className="flex items-center justify-center gap-3">
                  <Play className="w-5 h-5" />
                  <span>Join the Revolution</span>
                </div>
              </motion.button>
              
              <p className="text-center text-gray-400 text-sm mt-4 px-4">
                Be among the first to experience the future of fitness
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {[
            { value: '10,000+', label: 'Beta Testers', color: 'text-primary-400' },
            { value: '95%', label: 'Satisfaction Rate', color: 'text-green-400' },
            { value: '2x', label: 'Faster Results', color: 'text-accent-cyan' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 sm:p-6 hover:bg-gray-800/40 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
