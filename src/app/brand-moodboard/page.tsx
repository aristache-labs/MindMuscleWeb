'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Download, Palette, Type, Zap, Brain, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { 
  AIBrainIcon, 
  SmartDumbbellIcon, 
  AIAnalyticsIcon, 
  AITargetIcon, 
  AISparklesIcon, 
  AICommunityIcon, 
  AIPowerIcon, 
  AIDownloadIcon 
} from '@/components/ui/CustomIcons';
import { 
  AIBrainAnimation, 
  FloatingElementsAnimation,
  PulseAnimation,
  StaggerContainer
} from '@/components/ui/LottieAnimations';

// Extended Color Palette with AI + Fitness combinations
const colorPalette = {
  primary: [
    { name: 'Neural Purple', hex: '#8B5CF6', usage: 'Primary brand, AI intelligence', rgb: 'rgb(139, 92, 246)' },
    { name: 'Deep Mind', hex: '#6D28D9', usage: 'Dark purple, depth', rgb: 'rgb(109, 40, 217)' },
    { name: 'Violet Glow', hex: '#A855F7', usage: 'Light purple, highlights', rgb: 'rgb(168, 85, 247)' },
    { name: 'Mystic Purple', hex: '#C084FC', usage: 'Soft purple, backgrounds', rgb: 'rgb(192, 132, 252)' },
  ],
  accent: [
    { name: 'Cyber Cyan', hex: '#22D3EE', usage: 'Tech accents, data viz', rgb: 'rgb(34, 211, 238)' },
    { name: 'Electric Blue', hex: '#0EA5E9', usage: 'Interactive elements', rgb: 'rgb(14, 165, 233)' },
    { name: 'Neon Teal', hex: '#14B8A6', usage: 'Success states', rgb: 'rgb(20, 184, 166)' },
    { name: 'Energy Magenta', hex: '#E11D48', usage: 'Alerts, intensity', rgb: 'rgb(225, 29, 72)' },
  ],
  fitness: [
    { name: 'Power Orange', hex: '#F97316', usage: 'Energy, motivation', rgb: 'rgb(249, 115, 22)' },
    { name: 'Strength Gold', hex: '#F59E0B', usage: 'Achievement, premium', rgb: 'rgb(245, 158, 11)' },
    { name: 'Vitality Green', hex: '#10B981', usage: 'Health, progress', rgb: 'rgb(16, 185, 129)' },
    { name: 'Endurance Red', hex: '#EF4444', usage: 'Intensity, heart rate', rgb: 'rgb(239, 68, 68)' },
  ],
  neutrals: [
    { name: 'Void Black', hex: '#0A0A10', usage: 'Main background', rgb: 'rgb(10, 10, 16)' },
    { name: 'Carbon Gray', hex: '#1A1A23', usage: 'Surface, cards', rgb: 'rgb(26, 26, 35)' },
    { name: 'Steel Gray', hex: '#374151', usage: 'Borders, dividers', rgb: 'rgb(55, 65, 81)' },
    { name: 'Silver Text', hex: '#9CA3AF', usage: 'Secondary text', rgb: 'rgb(156, 163, 175)' },
    { name: 'Pure White', hex: '#FFFFFF', usage: 'Primary text', rgb: 'rgb(255, 255, 255)' },
  ]
};

// Typography variations
const typographyStyles = [
  {
    name: 'Display Bold',
    font: 'Satoshi',
    weight: '700',
    size: '4rem',
    usage: 'Hero headlines, major CTAs',
    example: 'MindMuscle',
    className: 'font-bold text-6xl'
  },
  {
    name: 'Heading Strong',
    font: 'Satoshi',
    weight: '600',
    size: '2.5rem',
    usage: 'Section headers, features',
    example: 'AI-Powered Fitness',
    className: 'font-semibold text-4xl'
  },
  {
    name: 'Body Regular',
    font: 'Inter',
    weight: '400',
    size: '1rem',
    usage: 'Body text, descriptions',
    example: 'Experience the future of fitness with AI-powered personalized workouts.',
    className: 'font-normal text-base'
  },
  {
    name: 'Caption Medium',
    font: 'Inter',
    weight: '500',
    size: '0.875rem',
    usage: 'Labels, metadata',
    example: 'Coming Summer 2025',
    className: 'font-medium text-sm'
  },
  {
    name: 'Code Mono',
    font: 'JetBrains Mono',
    weight: '400',
    size: '0.875rem',
    usage: 'Technical specs, data',
    example: 'AI_CONFIDENCE: 0.97',
    className: 'font-mono text-sm'
  }
];

// Logo variations and concepts
const logoVariations = [
  {
    name: 'Primary Logo',
    type: 'Full Logo',
    description: 'Main brand mark with text',
    usage: 'Headers, marketing materials'
  },
  {
    name: 'Icon Mark',
    type: 'Symbol Only',
    description: 'Standalone brain + muscle icon',
    usage: 'App icons, favicons, social'
  },
  {
    name: 'Monogram',
    type: 'MM Mark',
    description: 'Stylized MM letterform',
    usage: 'Compact spaces, watermarks'
  },
  {
    name: 'Wordmark',
    type: 'Text Only',
    description: 'Typography-based logo',
    usage: 'Minimal applications'
  }
];

// AI + Fitness visual concepts
const visualConcepts = [
  {
    title: 'Neural Networks',
    description: 'Interconnected nodes representing AI learning',
    elements: ['Glowing connections', 'Pulsing nodes', 'Data flow'],
    colors: ['Neural Purple', 'Cyber Cyan']
  },
  {
    title: 'Biometric Data',
    description: 'Heart rate, performance metrics visualization',
    elements: ['Waveforms', 'Progress bars', 'Real-time graphs'],
    colors: ['Vitality Green', 'Energy Magenta']
  },
  {
    title: 'Muscle Fibers',
    description: 'Organic patterns meeting digital precision',
    elements: ['Fiber textures', 'Growth patterns', 'Strength indicators'],
    colors: ['Power Orange', 'Strength Gold']
  },
  {
    title: 'Circuit Patterns',
    description: 'Technology-inspired geometric designs',
    elements: ['Circuit boards', 'Digital pathways', 'Tech grids'],
    colors: ['Electric Blue', 'Cyber Cyan']
  }
];

export default function BrandMoodboardPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('colors');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(type);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const downloadMoodboard = () => {
    // This would trigger a download of the moodboard as PDF/PNG
    console.log('Downloading moodboard...');
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
              <h1 className="text-xl font-bold text-white">Brand Identity Moodboard</h1>
              <p className="text-sm text-gray-400">AI + Fitness Visual Identity</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/branding-demo"
                className="flex items-center gap-2 px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/20 rounded-lg text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Demo</span>
              </Link>
              <button
                onClick={downloadMoodboard}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-300 hover:bg-primary-500/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <section className="border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'colors', label: 'Color Palette', icon: Palette },
              { id: 'typography', label: 'Typography', icon: Type },
              { id: 'logos', label: 'Logo Concepts', icon: Zap },
              { id: 'visuals', label: 'Visual Concepts', icon: Brain },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedSection(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  selectedSection === id
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <FloatingElementsAnimation />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 text-sm font-medium text-primary-300 mb-6">
              <AISparklesIcon size={16} className="text-primary-400" />
              Brand Identity Evolution
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              AI + Fitness
              <span className="bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">
                {' '}Visual Identity
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              A comprehensive brand moodboard expanding on our purple/dark theme with AI-powered 
              fitness visual combinations, typography variations, and logo concepts for consistent 
              brand presence before app launch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Color Palette Section */}
        {selectedSection === 'colors' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {Object.entries(colorPalette).map(([category, colors]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-6 capitalize">
                  {category} Colors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {colors.map((color) => (
                    <motion.div
                      key={color.name}
                      className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-4 hover:border-gray-700/50 transition-colors cursor-pointer group"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => copyToClipboard(color.hex, color.name)}
                    >
                      <div 
                        className="w-full h-20 rounded-lg mb-3 relative overflow-hidden"
                        style={{ backgroundColor: color.hex }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-medium text-white text-sm mb-1">{color.name}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400 font-mono">{color.hex}</span>
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
                      <div className="mt-2 text-xs text-gray-600 font-mono">{color.rgb}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* Color Combinations */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">AI + Fitness Color Combinations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Neural Intelligence',
                    colors: ['#8B5CF6', '#22D3EE', '#0A0A10'],
                    description: 'Primary AI theme with tech accents'
                  },
                  {
                    name: 'Energy & Power',
                    colors: ['#F97316', '#F59E0B', '#1A1A23'],
                    description: 'High-energy fitness motivation'
                  },
                  {
                    name: 'Health & Vitality',
                    colors: ['#10B981', '#14B8A6', '#374151'],
                    description: 'Wellness and progress tracking'
                  },
                  {
                    name: 'Intensity Mode',
                    colors: ['#E11D48', '#EF4444', '#0A0A10'],
                    description: 'High-intensity training alerts'
                  },
                  {
                    name: 'Premium Gold',
                    colors: ['#F59E0B', '#8B5CF6', '#1A1A23'],
                    description: 'Achievement and premium features'
                  },
                  {
                    name: 'Tech Fusion',
                    colors: ['#0EA5E9', '#6D28D9', '#374151'],
                    description: 'Advanced technology interface'
                  }
                ].map((combo) => (
                  <div key={combo.name} className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-6">
                    <div className="flex gap-2 mb-4">
                      {combo.colors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1 h-12 rounded-lg"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <h3 className="font-semibold text-white mb-2">{combo.name}</h3>
                    <p className="text-sm text-gray-400">{combo.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Typography Section */}
        {selectedSection === 'typography' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Typography System</h2>
              <div className="space-y-8">
                {typographyStyles.map((style) => (
                  <div key={style.name} className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                      <div>
                        <h3 className="font-semibold text-white mb-2">{style.name}</h3>
                        <div className="space-y-1 text-sm text-gray-400">
                          <p><span className="text-gray-300">Font:</span> {style.font}</p>
                          <p><span className="text-gray-300">Weight:</span> {style.weight}</p>
                          <p><span className="text-gray-300">Size:</span> {style.size}</p>
                          <p><span className="text-gray-300">Usage:</span> {style.usage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`${style.className} text-white leading-tight`}>
                          {style.example}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography in Action */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Typography in Action</h2>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-8">
                <div className="space-y-6">
                  <div className="font-bold text-5xl bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">
                    MindMuscle
                  </div>
                  <div className="font-semibold text-2xl text-white">
                    AI-Powered Fitness Revolution
                  </div>
                  <div className="font-normal text-base text-gray-300 max-w-2xl">
                    Experience the future of fitness with AI-powered personalized workouts that adapt and evolve with every rep. Your AI fitness coach learns from your progress to deliver results like never before.
                  </div>
                  <div className="font-medium text-sm text-primary-300">
                    Coming Summer 2025 • Join the Waitlist
                  </div>
                  <div className="font-mono text-sm text-accent-cyan">
                    AI_CONFIDENCE: 0.97 | MUSCLE_GROWTH: +23% | PERFORMANCE: OPTIMAL
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Logo Concepts Section */}
        {selectedSection === 'logos' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">Logo Variations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {logoVariations.map((logo) => (
                  <div key={logo.name} className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-8">
                    <div className="text-center mb-6">
                      {/* Logo placeholder - would contain actual logo designs */}
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-accent-cyan rounded-2xl flex items-center justify-center mb-4">
                        {logo.type === 'Full Logo' && (
                          <div className="text-white font-bold text-lg">MM</div>
                        )}
                        {logo.type === 'Symbol Only' && (
                          <AIBrainIcon size={48} className="text-white" />
                        )}
                        {logo.type === 'MM Mark' && (
                          <div className="text-white font-bold text-3xl">MM</div>
                        )}
                        {logo.type === 'Text Only' && (
                          <div className="text-white font-bold text-sm">MindMuscle</div>
                        )}
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-center mb-2">{logo.name}</h3>
                    <p className="text-sm text-gray-400 text-center mb-3">{logo.type}</p>
                    <p className="text-xs text-gray-500 text-center mb-4">{logo.description}</p>
                    <div className="text-xs text-primary-300 text-center">
                      <strong>Usage:</strong> {logo.usage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo Applications */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Logo Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { context: 'App Icon', bg: 'bg-dark-900', size: 'w-16 h-16' },
                  { context: 'Website Header', bg: 'bg-dark-800', size: 'w-24 h-8' },
                  { context: 'Social Media', bg: 'bg-primary-500', size: 'w-12 h-12' },
                  { context: 'Business Card', bg: 'bg-white', size: 'w-20 h-6', textColor: 'text-dark-900' },
                  { context: 'Merchandise', bg: 'bg-dark-700', size: 'w-16 h-16' },
                  { context: 'Email Signature', bg: 'bg-gray-100', size: 'w-18 h-5', textColor: 'text-dark-900' }
                ].map((app) => (
                  <div key={app.context} className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-6 text-center">
                    <div className={`${app.bg} rounded-lg mx-auto mb-4 flex items-center justify-center ${app.size}`}>
                      <div className={`font-bold text-xs ${app.textColor || 'text-white'}`}>MM</div>
                    </div>
                    <h3 className="font-medium text-white text-sm">{app.context}</h3>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Visual Concepts Section */}
        {selectedSection === 'visuals' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">AI + Fitness Visual Concepts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visualConcepts.map((concept) => (
                  <div key={concept.title} className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-6">
                    <div className="mb-6">
                      {/* Visual concept illustration placeholder */}
                      <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
                        {concept.title === 'Neural Networks' && <AIBrainIcon size={64} className="text-primary-400" />}
                        {concept.title === 'Biometric Data' && <AIAnalyticsIcon size={64} className="text-green-400" />}
                        {concept.title === 'Muscle Fibers' && <SmartDumbbellIcon size={64} className="text-orange-400" />}
                        {concept.title === 'Circuit Patterns' && <AIPowerIcon size={64} className="text-blue-400" />}
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{concept.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{concept.description}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-gray-300 font-medium">Elements:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {concept.elements.map((element) => (
                            <span key={element} className="text-xs bg-dark-700 text-gray-300 px-2 py-1 rounded">
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-300 font-medium">Colors:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {concept.colors.map((color) => (
                            <span key={color} className="text-xs bg-primary-500/20 text-primary-300 px-2 py-1 rounded">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Patterns */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Pattern Library</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Circuit Grid',
                    pattern: 'bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]'
                  },
                  {
                    name: 'Neural Mesh',
                    pattern: 'bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:15px_15px]'
                  },
                  {
                    name: 'Data Flow',
                    pattern: 'bg-[linear-gradient(45deg,transparent_25%,rgba(249,115,22,0.1)_50%,transparent_75%)] bg-[size:30px_30px]'
                  },
                  {
                    name: 'Pulse Wave',
                    pattern: 'bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(16,185,129,0.1)_10px,rgba(16,185,129,0.1)_20px)]'
                  },
                  {
                    name: 'Fiber Texture',
                    pattern: 'bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(245,158,11,0.1)_2px,rgba(245,158,11,0.1)_4px)]'
                  },
                  {
                    name: 'Tech Hexagon',
                    pattern: 'bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.1)_2px,transparent_2px)] bg-[size:25px_25px]'
                  }
                ].map((pattern) => (
                  <div key={pattern.name} className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-4">
                    <div className={`w-full h-24 rounded-lg mb-3 ${pattern.pattern}`} />
                    <h3 className="font-medium text-white text-sm text-center">{pattern.name}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Icon Integration */}
            <div>
              <h2 className="text-2xl font-bold mb-6">AI Icon Integration</h2>
              <div className="bg-dark-800/50 border border-gray-800/50 rounded-xl p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                  {[
                    { icon: AIBrainIcon, color: 'text-primary-400' },
                    { icon: SmartDumbbellIcon, color: 'text-orange-400' },
                    { icon: AIAnalyticsIcon, color: 'text-green-400' },
                    { icon: AITargetIcon, color: 'text-blue-400' },
                    { icon: AISparklesIcon, color: 'text-purple-400' },
                    { icon: AICommunityIcon, color: 'text-cyan-400' },
                    { icon: AIPowerIcon, color: 'text-yellow-400' },
                    { icon: AIDownloadIcon, color: 'text-pink-400' },
                  ].map(({ icon: Icon, color }, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-16 h-16 bg-dark-700/50 rounded-xl flex items-center justify-center mb-2 mx-auto">
                        <Icon size={32} className={color} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </div>

      {/* Brand Guidelines Summary */}
      <section className="bg-dark-800/30 border-t border-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Brand Impact & Guidelines</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Consistent brand presence across all touchpoints before app launch
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Visual Consistency</h3>
              <p className="text-sm text-gray-400">
                Unified color palette and visual language across all brand touchpoints
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-cyan to-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">AI Identity</h3>
              <p className="text-sm text-gray-400">
                Clear representation of AI technology merged with fitness innovation
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Fitness Energy</h3>
              <p className="text-sm text-gray-400">
                Dynamic visual elements that convey strength, progress, and motivation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            MindMuscle Brand Identity Moodboard • AI + Fitness Visual Evolution
          </p>
        </div>
      </footer>
    </div>
  );
} 