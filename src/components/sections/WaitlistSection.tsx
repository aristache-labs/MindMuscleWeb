'use client';

import { motion } from 'framer-motion';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { trackEvent } from '@/lib/utils';
import { Sparkles, Users, Trophy } from 'lucide-react';

interface SuccessData {
  position?: number;
  email?: string;
  referralCode?: string;
}

export function WaitlistSection() {
  const handleWaitlistSuccess = (data: SuccessData) => {
    trackEvent('waitlist_section_success', {
      position: data.position,
      email: data.email,
      referral_code: data.referralCode,
    });
  };

  return (
    <section id="waitlist" className="relative py-24 bg-dark-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Join the Revolution</span>
          </motion.div>

          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
            Ready to Transform{' '}
            <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Your Fitness?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Be among the first to experience AI-powered personalized workouts that adapt and evolve with you. 
            <strong className="text-white"> Summer 2025 launch. </strong>
          </p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary-400" />
                <span className="text-2xl font-bold text-white">10K+</span>
              </div>
              <p className="text-sm text-gray-400">Early Adopters</p>
            </div>
            
            <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span className="text-2xl font-bold text-white">VIP</span>
              </div>
              <p className="text-sm text-gray-400">Early Access</p>
            </div>
            
            <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="text-2xl font-bold text-white">FREE</span>
              </div>
              <p className="text-sm text-gray-400">Beta Access</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Waitlist Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <WaitlistForm onSuccess={handleWaitlistSuccess} />
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Early Access</h3>
              <p className="text-sm text-gray-400">
                Be first to experience revolutionary AI fitness technology
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Exclusive Features</h3>
              <p className="text-sm text-gray-400">
                Special perks and features reserved for early supporters
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Shape the Future</h3>
              <p className="text-sm text-gray-400">
                Your feedback will directly influence the final product
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-500 max-w-md mx-auto">
            🔒 We take privacy seriously. Your email will only be used for launch notifications and early access. 
            No spam, unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 