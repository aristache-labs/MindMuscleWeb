'use client';

import { motion } from 'framer-motion';
import { 
  Bot, 
  Eye, 
  Zap, 
  BarChart3, 
  Moon, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const features = [
  {
    id: 1,
    icon: Bot,
    title: 'AI Personal Trainer',
    description: 'Your dedicated AI coach that understands your goals, adapts to your progress, and motivates you every step of the way.',
    benefits: ['24/7 availability', 'Personalized coaching', 'Motivational support'],
    gradient: 'from-primary-500 to-primary-600'
  },
  {
    id: 2,
    icon: Eye,
    title: 'Real-time Form Correction',
    description: 'Advanced computer vision analyzes your movements and provides instant feedback to perfect your form and prevent injuries.',
    benefits: ['Movement analysis', 'Injury prevention', 'Technique optimization'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    icon: Zap,
    title: 'Adaptive Workout Plans',
    description: 'Dynamic workout programs that evolve based on your performance, energy levels, and recovery state for optimal results.',
    benefits: ['Dynamic difficulty', 'Performance tracking', 'Auto-adjustments'],
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 4,
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Comprehensive insights into your fitness journey with detailed analytics, trends, and predictive modeling.',
    benefits: ['Performance metrics', 'Trend analysis', 'Goal predictions'],
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 5,
    icon: Moon,
    title: 'Smart Recovery',
    description: 'AI-powered recovery optimization that monitors your rest, sleep, and stress levels to maximize your training effectiveness.',
    benefits: ['Recovery tracking', 'Sleep optimization', 'Stress monitoring'],
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 6,
    icon: Users,
    title: 'Community Challenges',
    description: 'Connect with like-minded fitness enthusiasts through AI-curated challenges and competitions tailored to your level.',
    benefits: ['Social motivation', 'Skill-matched challenges', 'Achievement rewards'],
    gradient: 'from-red-500 to-rose-500'
  }
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const featureVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
        <motion.div
          className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-accent-cyan/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-sm font-medium text-primary-300 mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Features
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Premium <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">AI Features</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Revolutionary AI technology that transforms your fitness experience with personalized coaching, real-time feedback, and intelligent adaptations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mt-20"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              
              return (
                <motion.div
                  key={feature.id}
                  className="group relative"
                  variants={featureVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Feature Card */}
                  <div className="relative h-full bg-dark-800/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 transition-all duration-300 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/10 group-hover:bg-dark-800/70">
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {feature.description}
                      </p>

                      {/* Benefits List */}
                      <ul className="space-y-2 mb-6">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-xs text-gray-400">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 opacity-60" />
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      {/* Learn More Link */}
                      <motion.div
                        className="flex items-center gap-2 text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience AI-Powered Fitness?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of early adopters who are already transforming their fitness journey with our revolutionary AI technology.
            </p>
            <motion.button
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Bot className="w-5 h-5" />
              Get Early Access
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 