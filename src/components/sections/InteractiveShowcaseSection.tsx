'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Play, Zap, Target, BarChart3, Users } from 'lucide-react';
import { InteractiveAppPreview } from '@/components/ui/InteractiveAppPreview';
import { MagneticElement } from '@/components/ui/MagneticElement';
import { useScrollAnimation, SCROLL_VARIANTS } from '@/hooks/useScrollAnimation';

const features = [
  {
    id: 'ai-insights',
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your performance and goals.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    id: 'workout-tracking',
    icon: Target,
    title: 'Smart Workout Tracking',
    description: 'Track every rep, set, and exercise with intuitive controls.',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'progress-tracking',
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Visualize your fitness journey with detailed progress charts.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'community',
    icon: Users,
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
      className="py-24 bg-dark-900 relative overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Interactive App Preview */}
          <motion.div
            ref={previewRef}
            className="relative"
            variants={SCROLL_VARIANTS.slideRight}
            initial="initial"
            animate={previewControls}
          >
            <div className="relative">
              {/* Floating Labels */}
              <motion.div
                className="absolute -top-8 -left-8 bg-primary-500/20 border border-primary-500/30 rounded-xl px-3 py-2 text-sm text-primary-300 backdrop-blur-sm"
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
                className="absolute -bottom-8 -right-8 bg-green-500/20 border border-green-500/30 rounded-xl px-3 py-2 text-sm text-green-300 backdrop-blur-sm"
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
            className="space-y-6"
            variants={SCROLL_VARIANTS.slideLeft}
            initial="initial"
            animate={featuresControls}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                What Makes It Special
              </h3>
              <p className="text-gray-300">
                Every element is designed to provide the most intuitive and effective 
                fitness experience powered by cutting-edge AI technology.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <MagneticElement 
                  key={feature.id} 
                  strength={0.2} 
                  distance={30}
                >
                  <motion.div
                    className={`relative bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
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

                    <div className="relative flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
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
                </MagneticElement>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <MagneticElement 
                strength={0.4} 
                distance={50}
                data-magnetic-label="Join waitlist"
                data-magnetic-color="primary"
              >
                <motion.button
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl px-8 py-4 text-white font-semibold transition-all duration-300 hover:from-primary-600 hover:to-primary-700"
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
                  <div className="flex items-center justify-center gap-3">
                    <Play className="w-5 h-5" />
                    <span>Join the Revolution</span>
                  </div>
                </motion.button>
              </MagneticElement>
              
              <p className="text-center text-gray-400 text-sm mt-4">
                Be among the first to experience the future of fitness
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {[
            { value: '10,000+', label: 'Beta Testers', color: 'text-primary-400' },
            { value: '95%', label: 'Satisfaction Rate', color: 'text-green-400' },
            { value: '2x', label: 'Faster Results', color: 'text-accent-cyan' },
          ].map((stat, index) => (
            <MagneticElement key={index} strength={0.2}>
              <div className="text-center bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            </MagneticElement>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 