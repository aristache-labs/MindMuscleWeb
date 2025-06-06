'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { APP_SCREENSHOTS } from '@/lib/constants';
import { 
  AIBrainIcon, 
  SmartDumbbellIcon, 
  AIAnalyticsIcon, 
  AITargetIcon, 
  AISparklesIcon, 
  AICommunityIcon, 
  AIPowerIcon, 
  AIDownloadIcon,
  AISleepIcon 
} from '@/components/ui/CustomIcons';
import { 
  AIBrainAnimation, 
  LoadingAnimation, 
  SuccessAnimation,
  FloatingElementsAnimation,
  PulseAnimation,
  StaggerContainer
} from '@/components/ui/LottieAnimations';


const customIcons = [
  { name: 'AI Brain', component: AIBrainIcon, description: 'Advanced neural network design for AI features' },
  { name: 'Smart Dumbbell', component: SmartDumbbellIcon, description: 'AI-enhanced fitness equipment representation' },
  { name: 'AI Analytics', component: AIAnalyticsIcon, description: 'Data visualization with AI intelligence' },
  { name: 'AI Target', component: AITargetIcon, description: 'Smart goal tracking and targeting' },
  { name: 'AI Sparkles', component: AISparklesIcon, description: 'Enhanced magic/AI effects' },
  { name: 'AI Community', component: AICommunityIcon, description: 'Connected users with AI networking' },
  { name: 'AI Power', component: AIPowerIcon, description: 'Enhanced energy and power representation' },
  { name: 'AI Download', component: AIDownloadIcon, description: 'Smart download with AI processing' },
  { name: 'AI Sleep', component: AISleepIcon, description: 'Smart recovery and sleep monitoring with AI' },
];



const colorPalette = [
  { name: 'Primary Purple', color: '#8B5CF6', usage: 'Main brand color, primary actions' },
  { name: 'Accent Cyan', color: '#22D3EE', usage: 'Secondary accents, highlights' },
  { name: 'Accent Magenta', color: '#E11D48', usage: 'Error states, warnings' },
  { name: 'Dark Background', color: '#0A0A10', usage: 'Main background, surfaces' },
  { name: 'Dark Surface', color: '#1A1A23', usage: 'Cards, elevated surfaces' },
  { name: 'Text Primary', color: '#FFFFFF', usage: 'Primary text, headings' },
  { name: 'Text Secondary', color: '#9CA3AF', usage: 'Secondary text, descriptions' },
];

export default function BrandingDemoPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(type);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold text-white">MindMuscle Branding Kit</h1>
              <p className="text-sm text-gray-400">Custom Icons & Animations</p>
            </div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <FloatingElementsAnimation />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-sm font-medium text-primary-300 mb-6">
              <AISparklesIcon size={16} className="text-primary-400" />
              Branding & Visual Identity
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              AI-Powered
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                {' '}Design System
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              A comprehensive collection of custom SVG icons and premium animations designed specifically 
              for AI-powered fitness applications. Built for modern, responsive experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Custom Icons Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Custom AI Icons
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Purpose-built SVG icons that capture the essence of AI-powered fitness technology
            </p>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customIcons.map((icon) => {
              const IconComponent = icon.component;
              return (
                <div key={icon.name}>
                  <motion.div
                    className={`bg-dark-800/50 border rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${
                      selectedIcon === icon.name 
                        ? 'border-primary-500/50 bg-dark-800/70' 
                        : 'border-gray-800/50 hover:border-gray-700/50'
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => setSelectedIcon(selectedIcon === icon.name ? null : icon.name)}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl">
                        <IconComponent 
                          size={32} 
                          className="text-primary-400" 
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{icon.name}</h3>
                    <p className="text-sm text-gray-400">{icon.description}</p>
                    
                    {selectedIcon === icon.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-gray-700/50"
                      >
                        <div className="flex justify-center gap-2">
                          <IconComponent size={20} className="text-white" />
                          <IconComponent size={24} className="text-primary-400" />
                          <IconComponent size={28} className="text-accent-cyan" />
                          <IconComponent size={32} className="text-accent-magenta" />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Animations Section */}
      <section className="py-16 sm:py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Premium Animations
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Smooth, performant animations that enhance user experience without overwhelming
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AI Brain Animation */}
            <div>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-2xl p-6 text-center hover:border-gray-700/50 transition-colors">
                <div className="flex justify-center mb-4">
                  <AIBrainAnimation size="md" />
                </div>
                <h3 className="font-semibold text-white mb-2">AI Brain</h3>
                <p className="text-sm text-gray-400">Neural network animation</p>
              </div>
            </div>

            {/* Loading Animation */}
            <div>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-2xl p-6 text-center hover:border-gray-700/50 transition-colors">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <LoadingAnimation size="lg" className="text-primary-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Loading</h3>
                <p className="text-sm text-gray-400">Smooth loading states</p>
              </div>
            </div>

            {/* Success Animation */}
            <div>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-2xl p-6 text-center hover:border-gray-700/50 transition-colors">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <SuccessAnimation />
                </div>
                <h3 className="font-semibold text-white mb-2">Success</h3>
                <p className="text-sm text-gray-400">Confirmation feedback</p>
              </div>
            </div>

            {/* Pulse Animation */}
            <div>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-2xl p-6 text-center hover:border-gray-700/50 transition-colors">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <PulseAnimation>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <AISparklesIcon size={24} className="text-white" />
                    </div>
                  </PulseAnimation>
                </div>
                <h3 className="font-semibold text-white mb-2">Pulse</h3>
                <p className="text-sm text-gray-400">Attention-grabbing pulse</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Color Palette
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Carefully selected colors that convey premium quality and AI innovation
            </p>
          </motion.div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {colorPalette.map((color) => (
              <div key={color.name}>
                <motion.div
                  className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-4 hover:border-gray-700/50 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => copyToClipboard(color.color, color.name)}
                >
                  <div 
                    className="w-full h-16 rounded-lg mb-3"
                    style={{ backgroundColor: color.color }}
                  />
                  <h3 className="font-medium text-white text-sm mb-1">{color.name}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 font-mono">{color.color}</span>
                    <motion.div
                      className="flex items-center text-gray-400"
                      whileHover={{ scale: 1.1 }}
                    >
                      {copiedColor === color.name ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500">{color.usage}</p>
                </motion.div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* App Screenshots Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Real App Screenshots
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Actual screenshots from the MindMuscle mobile application showcasing the AI-powered features and premium user interface
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APP_SCREENSHOTS.slice(0, 8).map((screenshot, index: number) => (
              <motion.div
                key={screenshot.id}
                className="bg-dark-800/50 border border-gray-800/50 rounded-2xl p-4 hover:border-gray-700/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="aspect-[9/16] bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={screenshot.image}
                    alt={screenshot.alt}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{screenshot.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{screenshot.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-16 sm:py-20 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Usage Guidelines
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Best practices for implementing the MindMuscle design system
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-6">
                <AIBrainIcon size={32} className="text-primary-400 mb-4" />
                <h3 className="font-semibold text-white mb-3">Icon Usage</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Use consistent sizing (16px, 24px, 32px)</li>
                  <li>• Maintain proper contrast ratios</li>
                  <li>• Apply brand colors appropriately</li>
                  <li>• Ensure accessibility standards</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-6">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg mb-4" />
                <h3 className="font-semibold text-white mb-3">Color Usage</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Primary purple for main actions</li>
                  <li>• Cyan for highlights and accents</li>
                  <li>• Maintain hierarchy with grays</li>
                  <li>• Use magenta sparingly for errors</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-6">
                <div className="w-8 h-8 bg-gradient-to-r from-accent-cyan to-primary-500 rounded-lg mb-4 opacity-75" />
                <h3 className="font-semibold text-white mb-3">Animation Usage</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Keep animations purposeful</li>
                  <li>• Respect user motion preferences</li>
                  <li>• Use for feedback and transitions</li>
                  <li>• Maintain 60fps performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            MindMuscle Design System • Custom Icons & Animations for AI-Powered Fitness
          </p>
        </div>
      </footer>
    </div>
  );
} 
