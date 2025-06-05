'use client';

import { motion } from 'framer-motion';
import { BoltIcon, EyeIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useScrollTracking } from '@/hooks/useScrollTracking';

export default function Features() {
  const sectionRef = useScrollTracking({ sectionName: 'Features' });

  const features = [
    {
      title: "AI Workout Generation",
      description: "Personalized workout plans created by advanced AI algorithms based on your goals, fitness level, and available equipment.",
      highlight: "Smart Planning"
    },
    {
      title: "Real-Time Form Analysis", 
      description: "Computer vision technology analyzes your form and provides instant feedback to prevent injuries and optimize results.",
      highlight: "Perfect Form"
    },
    {
      title: "Adaptive Progress Tracking",
      description: "Intelligent tracking that adjusts your program based on performance, recovery, and progress towards your goals.",
      highlight: "Smart Progress"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
          Powerful <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Features</span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Experience the future of fitness with AI-driven technology designed to maximize your potential
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-dark-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary-purple/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-purple/10"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-purple to-neon-cyan rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {index === 0 && <BoltIcon className="w-8 h-8 text-white" />}
              {index === 1 && <EyeIcon className="w-8 h-8 text-white" />}
              {index === 2 && <ChartBarIcon className="w-8 h-8 text-white" />}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-heading font-semibold text-white group-hover:text-primary-purple transition-colors duration-300">
                  {feature.title}
                </h3>
                <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan text-xs font-medium rounded-full">
                  {feature.highlight}
                </span>
              </div>
              
              <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {feature.description}
              </p>
            </div>

            {/* Decorative Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 