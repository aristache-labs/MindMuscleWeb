'use client';

import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/lib/constants';
import { useScrollAnimation, useStaggerAnimation, SCROLL_VARIANTS } from '@/hooks/useScrollAnimation';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const testimonialVariants = {
  initial: { opacity: 0, y: 50, scale: 0.9, rotateX: 10 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: 'backOut',
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: -2,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const featuredTestimonialVariants = {
  initial: { opacity: 0, scale: 0.9, y: 40 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'backOut',
    },
  },
};

const quoteIconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: 'backOut',
      delay: 0.5,
    },
  },
};

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { ref: headerRef, controls: headerControls } = useScrollAnimation({
    threshold: 0.3,
    delay: 0.1,
  });

  const { ref: featuredRef, controls: featuredControls } = useScrollAnimation({
    threshold: 0.2,
    delay: 0.3,
  });

  const { ref: gridRef, controls: gridControls } = useStaggerAnimation(
    3,
    {
      threshold: 0.1,
      staggerDelay: 0.2,
      variant: 'scaleIn',
      delay: 0.5,
    }
  );
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  
  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 to-transparent" />
        <motion.div
          className="absolute right-1/3 top-1/4 h-64 w-64 rounded-full bg-accent-cyan/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
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
            <Star className="w-4 h-4 fill-primary-400" />
            User Reviews
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            What Our <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Beta Users</span> Say
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Early feedback from fitness enthusiasts who are already experiencing the future of AI-powered workouts.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          ref={featuredRef}
          className="mb-16"
          variants={featuredTestimonialVariants}
          initial="initial"
          animate={featuredControls}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Quote Icon */}
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center"
              variants={quoteIconVariants}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Quote className="w-8 h-8 text-primary-400" />
            </motion.div>

            <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-8 md:p-12">
              <motion.blockquote
                key={currentTestimonial.id}
                className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                &ldquo;{currentTestimonial.content}&rdquo;
              </motion.blockquote>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                <motion.div
                  className="flex items-center gap-4"
                  key={`author-${currentTestimonial.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="relative">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                      unoptimized={currentTestimonial.avatar.startsWith('data:')}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{currentTestimonial.name}</p>
                    <p className="text-sm text-gray-400">{currentTestimonial.role}</p>
                    <p className="text-xs text-gray-500">{currentTestimonial.company}</p>
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <motion.button
                    className="w-10 h-10 bg-dark-700/50 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all duration-300"
                    onClick={prevTestimonial}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="w-10 h-10 bg-dark-700/50 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all duration-300"
                    onClick={nextTestimonial}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Star Rating */}
              <motion.div
                className="flex items-center gap-1 mt-6"
                key={`rating-${currentTestimonial.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          animate={gridControls}
        >
          {TESTIMONIALS.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="group relative perspective-1000"
              variants={testimonialVariants}
              custom={index}
              whileHover="hover"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-full bg-dark-800/30 backdrop-blur-sm border border-gray-800/30 rounded-2xl p-6 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/10 group-hover:bg-dark-800/50">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-300 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.content.length > 150 
                    ? `${testimonial.content.substring(0, 150)}...` 
                    : testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                      unoptimized={testimonial.avatar.startsWith('data:')}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Quote className="w-3 h-3 text-primary-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { number: '4.9', label: 'Average Rating', suffix: '/5' },
            { number: '1,247', label: 'Beta Users', suffix: '+' },
            { number: '89%', label: 'Success Rate', suffix: '' },
            { number: '24/7', label: 'AI Support', suffix: '' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  {stat.number}
                </span>
                <span className="text-gray-400">{stat.suffix}</span>
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 