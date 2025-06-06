'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Smartphone, Play, Zap } from 'lucide-react';
import Link from 'next/link';
import { InteractiveAppPreview } from '@/components/ui/InteractiveAppPreview';


export default function InteractiveDemoPage() {
  return (
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="relative z-50 border-b border-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <Link
                href="/"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-primary-400" />
              <h1 className="text-xl font-bold text-white">Interactive Demo</h1>
            </div>

            <div className="w-24" /> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative overflow-hidden">
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
          <motion.div
            className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-accent-cyan/5 blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-sm font-medium text-primary-300 mb-6">
              <Play className="w-4 h-4" />
              Live Interactive Demo
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Experience the 
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                {' '}Future
              </span>
              <br />
              of Fitness
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              This is a fully interactive demo of our AI-powered fitness app. 
              Tap, swipe, and explore to see how revolutionary fitness technology feels.
            </p>
          </motion.div>

          {/* Demo Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Interactive App Preview */}
            <motion.div
              className="relative mx-auto lg:mx-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                {/* Floating Instructions */}
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary-500/20 border border-primary-500/30 rounded-xl px-4 py-2 text-sm text-primary-300 backdrop-blur-sm"
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
                  👆 Try tapping the buttons!
                </motion.div>

                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-500/20 border border-green-500/30 rounded-xl px-4 py-2 text-sm text-green-300 backdrop-blur-sm"
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                  }}
                >
                  ⚡ Real-time AI responses
                </motion.div>

                {/* App Preview */}
                <InteractiveAppPreview />
              </div>
            </motion.div>

            {/* Instructions & Features */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  How to Use This Demo
                </h2>
                <p className="text-gray-300 text-lg">
                  This is a live, interactive prototype of our AI fitness app. 
                  Everything you see is functional and responds to your interactions.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 bg-opacity-20">
                        <Smartphone className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Navigate the App
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Use the bottom navigation to switch between different app screens. 
                          Each screen is fully interactive and functional.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 bg-opacity-20">
                        <Play className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          Start a Workout
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Tap the workout buttons to experience the full workout flow, 
                          including real-time rep counting and progress tracking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-accent-cyan to-blue-600 bg-opacity-20">
                        <Zap className="w-6 h-6 text-accent-cyan" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          AI Features
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Notice the AI insights, personalized recommendations, 
                          and adaptive features throughout the app experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <motion.div
                className="pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <motion.button
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl px-8 py-4 text-white font-semibold transition-all duration-300 hover:from-primary-600 hover:to-primary-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Navigate back to home page and scroll to waitlist
                    window.location.href = '/#waitlist';
                  }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Play className="w-5 h-5" />
                    <span>Ready to Transform Your Fitness?</span>
                  </div>
                </motion.button>
                
                <p className="text-center text-gray-400 text-sm mt-4">
                  Join 10,000+ early adopters waiting for the full app launch
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Notice */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gray-800/30 border border-gray-700/50 rounded-full px-6 py-3 text-sm text-gray-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              This demo runs entirely in your browser - no data is collected
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 
