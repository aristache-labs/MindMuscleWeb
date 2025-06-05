'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { trackFeatureInteraction } from '@/lib/analytics';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = useMemo(() => [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "The AI-powered workout generation is incredible! It perfectly adapts to my schedule and fitness level. Can't wait for the full release!",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Mike Chen", 
      role: "Personal Trainer",
      content: "As a trainer, I'm amazed by the form analysis technology. This will revolutionize how people learn proper exercise technique.",
      avatar: "MC",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Busy Professional", 
      content: "Finally, a fitness app that understands my hectic lifestyle. The adaptive scheduling and quick workouts are game-changers.",
      avatar: "ED",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Competitive Athlete",
      content: "The form analysis is like having a personal trainer 24/7. It's helped me break through plateaus and train more efficiently.",
      avatar: "AR",
      rating: 5
    },
    {
      name: "Lisa Park",
      role: "New to Fitness",
      content: "I was intimidated by the gym, but this app made fitness approachable. The AI guidance gives me confidence in every workout.",
      avatar: "LP",
      rating: 5
    }
  ], []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    trackFeatureInteraction('Testimonials Carousel', 'next');
  }, [testimonials.length]);

  const previousTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    trackFeatureInteraction('Testimonials Carousel', 'previous');
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    trackFeatureInteraction('Testimonials Carousel', `dot-${index + 1}`);
  }, []);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
    <div className="bg-dark-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary-purple/30 transition-all duration-300 group h-full max-w-2xl mx-auto">
      {/* Quote Icon */}
      <div className="mb-6">
        <motion.div 
          className="text-4xl text-neon-cyan/30 mb-4 group-hover:text-neon-cyan/50 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
        >
          &ldquo;
        </motion.div>
        <p className="text-white/80 leading-relaxed text-lg lg:text-xl group-hover:text-white/90 transition-colors duration-300 text-center">
          {testimonial.content}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <motion.div 
          className="w-12 h-12 bg-gradient-to-r from-primary-purple to-neon-cyan rounded-full flex items-center justify-center text-dark-bg font-bold"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {testimonial.avatar}
        </motion.div>
        <div className="text-center">
          <div className="font-semibold text-white group-hover:text-primary-purple transition-colors duration-300">
            {testimonial.name}
          </div>
          <div className="text-sm text-white/60 group-hover:text-white/70 transition-colors duration-300">
            {testimonial.role}
          </div>
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex justify-center gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div 
            key={i} 
            className="w-4 h-4 bg-neon-cyan rounded-sm"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.1 + 0.5 }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
    </div>
  );

  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl lg:text-5xl font-heading font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          What Users <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Say</span>
        </motion.h2>
        <motion.p 
          className="text-lg text-white/70 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Early beta testers are already experiencing transformative results
        </motion.p>
      </div>

      <div className="relative overflow-hidden">
        {/* Testimonials Carousel */}
        <div 
          className="relative h-80 flex items-center overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="w-full"
            >
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={previousTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dark-surface/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-primary-purple/50 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dark-surface/80 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-primary-purple/50 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-neon-cyan shadow-lg shadow-neon-cyan/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="flex justify-center mt-4">
          <div className="text-xs text-white/40 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-neon-cyan animate-pulse' : 'bg-white/30'}`} />
            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
          </div>
        </div>
      </div>

      {/* Performance Stats Banner */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="inline-flex items-center gap-8 px-8 py-4 bg-dark-surface/30 backdrop-blur-sm border border-white/10 rounded-2xl">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
              4.9★
            </div>
            <div className="text-xs text-white/60">
              Average Rating
            </div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
              1,200+
            </div>
            <div className="text-xs text-white/60">
              Happy Users
            </div>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-xs text-white/60">
              Would Recommend
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 