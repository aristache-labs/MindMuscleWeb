'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Showcase() {
  const screenshots = [
    {
      title: "Dashboard Overview",
      description:
        "Clean, intuitive interface showing your daily progress, upcoming workouts, and AI recommendations.",
      image: "/images/screenshot1.webp",
    },
    {
      title: "Workout Generator",
      description:
        "AI-powered workout creation based on your goals, available time, and equipment preferences.",
      image: "/images/screenshot2.webp",
    },
    {
      title: "Form Analysis",
      description:
        "Real-time computer vision feedback helping you maintain perfect form and prevent injuries.",
      image: "/images/screenshot3.webp",
    },
    {
      title: "Progress Tracking",
      description:
        "Comprehensive analytics and insights to monitor your fitness journey and celebrate milestones.",
      image: "/images/screenshot4.webp",
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
          App <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Showcase</span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Explore the intuitive interface designed to make AI-powered fitness accessible to everyone
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Sticky Phone Mockup */}
        <div className="lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-sm"
          >
            <div className="w-80 h-96 bg-gradient-to-br from-dark-surface to-dark-bg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Phone Screen */}
              <div className="p-6 h-full">
                <div className="bg-dark-bg/50 rounded-2xl h-full p-4 border border-white/10">
                  <div className="space-y-4">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-xs text-white/60">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white/20 rounded-sm"></div>
                        <div className="w-4 h-2 bg-white/20 rounded-sm"></div>
                        <div className="w-4 h-2 bg-neon-cyan rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="space-y-4 flex-1">
                      <div className="h-4 bg-gradient-to-r from-primary-purple to-neon-cyan rounded"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-white/10 rounded w-3/4"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2"></div>
                      </div>
                      <div className="h-20 bg-white/5 rounded-lg border border-white/10"></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-12 bg-white/5 rounded border border-white/10"></div>
                        <div className="h-12 bg-white/5 rounded border border-white/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-primary-purple/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-neon-cyan/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>

        {/* Scroll Area with Screenshots */}
        <div className="space-y-16">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-purple to-neon-cyan rounded-full flex items-center justify-center text-sm font-bold text-dark-bg">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-white">
                    {screenshot.title}
                  </h3>
                </div>

                <p className="text-white/70 leading-relaxed text-lg">
                  {screenshot.description}
                </p>
              </div>

              <div className="relative aspect-video bg-dark-surface/50 rounded-2xl border border-white/10 p-4 backdrop-blur-sm">
                <Image
                  src={screenshot.image}
                  alt={screenshot.title}
                  fill
                  className="object-cover rounded-xl"
              <div className="aspect-video bg-dark-surface/50 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
                <Image
                  src={`/images/screenshot${index + 1}.webp`}
                  alt={screenshot.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 