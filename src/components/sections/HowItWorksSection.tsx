'use client';

import { motion } from 'framer-motion';
import { Download, Brain, Dumbbell, TrendingUp, ArrowRight } from 'lucide-react';
import { useScrollAnimation, useStaggerAnimation, SCROLL_VARIANTS } from '@/hooks/useScrollAnimation';

const steps = [
  {
    id: 1,
    icon: Download,
    title: 'Download & Set Goals',
    description: 'Install MindMuscle and tell us your fitness goals, experience level, and preferences.',
    details: ['Quick 2-minute setup', 'Personalized goal setting', 'Equipment preferences']
  },
  {
    id: 2,
    icon: Brain,
    title: 'AI Assessment',
    description: 'Our AI analyzes your fitness level through a smart assessment and movement screening.',
    details: ['Movement analysis', 'Strength evaluation', 'Flexibility assessment']
  },
  {
    id: 3,
    icon: Dumbbell,
    title: 'Personalized Workouts',
    description: 'Get AI-crafted workouts that adapt in real-time based on your performance and feedback.',
    details: ['Dynamic difficulty adjustment', 'Exercise substitutions', 'Real-time form coaching']
  },
  {
    id: 4,
    icon: TrendingUp,
    title: 'Track & Evolve',
    description: 'Monitor your progress as the AI continuously learns and evolves your fitness program.',
            details: ['Progress tracking', 'Performance insights', 'Adaptive programming']
  }
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const stepVariants = {
  initial: { opacity: 0, y: 60, scale: 0.8, rotateY: 15 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: 'backOut',
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    rotateY: -2,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const iconVariants = {
  initial: { scale: 0, opacity: 0, rotate: -90 },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: 'backOut',
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const connectionLineVariants = {
  initial: { scaleX: 0, opacity: 0 },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.5,
    },
  },
};

const numberBadgeVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: 'backOut',
      delay: 0.4,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
};

export function HowItWorksSection() {
  const { ref: headerRef, controls: headerControls } = useScrollAnimation({
    threshold: 0.3,
    delay: 0.1,
  });

  const { ref: stepsRef, controls: stepsControls } = useStaggerAnimation(
    steps.length,
    {
      threshold: 0.1,
      staggerDelay: 0.2,
      variant: 'slideUp',
      delay: 0.3,
    }
  );
  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-800/50 to-dark-950/50" />
        <motion.div
          className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl"
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
          className="text-center"
          variants={SCROLL_VARIANTS.slideUp}
          initial="initial"
          animate={headerControls}
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            How <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">AI Fitness</span> Works
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Four simple steps to transform your fitness journey with personalized AI coaching that adapts and evolves with every workout.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          ref={stepsRef}
          className="mt-20"
          variants={containerVariants}
          initial="initial"
          animate={stepsControls}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  className="relative group perspective-1000"
                  variants={stepVariants}
                  custom={index}
                  whileHover="hover"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Connection Line (Desktop) */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent z-0 origin-left"
                      variants={connectionLineVariants}
                      initial="initial"
                      animate="animate"
                    />
                  )}
                  
                  {/* Step Card */}
                  <div className="relative bg-dark-800/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10 group-hover:bg-dark-800/70">
                    {/* Step Number Badge */}
                    <motion.div 
                      className="absolute -top-3 -right-3 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      variants={numberBadgeVariants}
                      whileHover="hover"
                    >
                      {step.id}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <IconComponent className="w-8 h-8 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
                    </motion.div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center justify-center text-xs text-gray-400">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 opacity-60" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Arrow Indicator */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="absolute bottom-4 right-4 w-6 h-6 text-primary-500/50 lg:hidden"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-full h-full" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-6">
            Ready to experience the future of fitness?
          </p>
          <motion.button
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Download className="w-5 h-5" />
            Join the Waitlist
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 