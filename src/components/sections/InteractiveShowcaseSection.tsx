'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Play } from 'lucide-react';
import { AIPowerIcon, AITargetIcon, AIAnalyticsIcon, AICommunityIcon } from '@/components/ui/CustomIcons';
import { InteractiveAppPreview } from '@/components/ui/InteractiveAppPreview';

import { useScrollAnimation, SCROLL_VARIANTS } from '@/hooks/useScrollAnimation';

const features = [
  {
    id: 'ai-insights',
    icon: AIPowerIcon,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your performance and goals.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    id: 'workout-tracking',
    icon: AITargetIcon,
    title: 'Smart Workout Tracking',
    description: 'Track every rep, set, and exercise with intuitive controls.',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'progress-tracking',
    icon: AIAnalyticsIcon,
    title: 'Progress Tracking',
    description: 'Visualize your fitness journey with detailed progress charts.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'community',
    icon: AICommunityIcon,
    title: 'Social Features',
    description: 'Connect with friends and join challenges to stay motivated.',
    color: 'from-purple-500 to-purple-600',
  },
];

export function InteractiveShowcaseSection() {
  const [selectedFeature, setSelectedFeature] = useState(0);

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
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Try the <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">AI Fitness</span> 
            <br />Experience
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Interact with our live app demo to see how AI-powered fitness feels. 
            Tap through real screens and experience the future of personal training.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Interactive App Preview */}
          <motion.div
            ref={previewRef}
            className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
            variants={SCROLL_VARIANTS.slideRight}
            initial="initial"
            animate={previewControls}
          >
            <div className="relative">
              {/* Floating Labels */}
              <motion.div
                className="absolute -top-6 sm:-top-8 -left-4 sm:-left-8 bg-primary-500/20 border border-primary-500/30 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-primary-300 backdrop-blur-sm"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Tap to interact!
              </motion.div>

              <motion.div
                className="absolute -bottom-6 sm:-bottom-8 -right-4 sm:-right-8 bg-green-500/20 border border-green-500/30 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-green-300 backdrop-blur-sm"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                Real-time AI
              </motion.div>

              {/* App Preview */}
              <InteractiveAppPreview className="perspective-1000" />
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            ref={featuresRef}
            className="space-y-4 sm:space-y-6 order-1 lg:order-2"
            variants={SCROLL_VARIANTS.slideLeft}
            initial="initial"
            animate={featuresControls}
          >
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                What Makes It Special
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Every element is designed to provide the most intuitive and effective 
                fitness experience powered by cutting-edge AI technology.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                    className={`relative bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
                      selectedFeature === index 
                        ? 'bg-gray-800/50 border-primary-500/30' 
                        : 'hover:bg-gray-800/40 hover:border-gray-600/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedFeature(index)}
                  >
                    {/* Gradient Background */}
                    {selectedFeature === index && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5 rounded-2xl`}
                        layoutId="feature-bg"
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <div className="relative flex items-start gap-3 sm:gap-4">
                      <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20 flex-shrink-0`}>
                        <feature.icon size={24} className="text-white" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedFeature === index && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600 rounded-r"
                        layoutId="feature-indicator"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              className="pt-6 sm:pt-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button
                className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold transition-all duration-300 hover:from-primary-600 hover:to-primary-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const waitlistElement = document.getElementById('waitlist');
                  if (waitlistElement) {
                    waitlistElement.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm items-center justify-center sm:text-base">Join the Revolution</span>
                </div>
              </motion.button>
              
              <p className="text-center text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4">
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
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { value: '10,000+', label: 'Beta Testers', color: 'text-primary-400' },
            { value: '95%', label: 'Satisfaction Rate', color: 'text-green-400' },
            { value: '2x', label: 'Faster Results', color: 'text-accent-cyan' },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-center bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 sm:p-6">
                <div className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 
