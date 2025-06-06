'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Zap, 
  Heart, 
  Star, 
  ArrowRight, 
  Download, 
  Play,
  Settings,
  Info
} from 'lucide-react';
import { MagneticElement, MagneticButton, MagneticArea } from './MagneticElement';

export function MagneticShowcase() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <MagneticElement 
            as="div" 
            strength={0.2} 
            label="Magnetic Title"
            className="inline-block"
          >
            <h1 className="text-6xl font-bold text-white mb-4">
              Magnetic
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {' '}Cursor
              </span>
            </h1>
          </MagneticElement>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience interactive magnetic cursor effects that respond to your mouse movement
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Basic Magnetic Buttons */}
          <MagneticArea 
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            strength={0.15}
            label="Button Demo Area"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Magnetic Buttons</h3>
            <div className="space-y-4">
              <MagneticButton
                variant="primary"
                size="medium"
                strength={0.4}
                label="Primary Action"
                color="#3b82f6"
                onClick={() => setSelectedDemo('primary')}
              >
                <Sparkles className="w-4 h-4" />
                Primary
              </MagneticButton>
              
              <MagneticButton
                variant="outline"
                size="medium"
                strength={0.3}
                label="Secondary Action"
                color="#06b6d4"
                onClick={() => setSelectedDemo('outline')}
              >
                <Zap className="w-4 h-4" />
                Outline
              </MagneticButton>
              
              <MagneticButton
                variant="ghost"
                size="medium"
                strength={0.2}
                label="Ghost Action"
                color="#8b5cf6"
                onClick={() => setSelectedDemo('ghost')}
              >
                <Heart className="w-4 h-4" />
                Ghost
              </MagneticButton>
            </div>
          </MagneticArea>

          {/* Icon Elements */}
          <MagneticArea 
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            strength={0.15}
            label="Icon Demo Area"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Magnetic Icons</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Star, color: '#fbbf24', label: 'Star' },
                { icon: Heart, color: '#ef4444', label: 'Heart' },
                { icon: Download, color: '#10b981', label: 'Download' },
                { icon: Play, color: '#3b82f6', label: 'Play' },
                { icon: Settings, color: '#6b7280', label: 'Settings' },
                { icon: Info, color: '#8b5cf6', label: 'Info' },
              ].map((item, index) => (
                <MagneticElement
                  key={index}
                  as="button"
                  strength={0.5}
                  distance={100}
                  label={item.label}
                  color={item.color}
                  className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-300"
                  onClick={() => setSelectedDemo(item.label.toLowerCase())}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </MagneticElement>
              ))}
            </div>
          </MagneticArea>

          {/* Card Elements */}
          <MagneticArea 
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            strength={0.1}
            label="Card Demo Area"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Magnetic Cards</h3>
            <div className="space-y-4">
              {[
                { title: 'Feature A', desc: 'Magnetic interaction', color: '#3b82f6' },
                { title: 'Feature B', desc: 'Smooth animations', color: '#06b6d4' },
                { title: 'Feature C', desc: 'Responsive design', color: '#8b5cf6' },
              ].map((card, index) => (
                <MagneticElement
                  key={index}
                  as="div"
                  strength={0.3}
                  distance={120}
                  label={card.title}
                  color={card.color}
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-4 cursor-pointer transition-colors duration-300"
                  onClick={() => setSelectedDemo(card.title.toLowerCase())}
                >
                  <h4 className="text-white font-semibold">{card.title}</h4>
                  <p className="text-gray-300 text-sm">{card.desc}</p>
                </MagneticElement>
              ))}
            </div>
          </MagneticArea>
        </div>

        {/* Large Interactive Area */}
        <MagneticArea 
          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20 text-center"
          strength={0.1}
          distance={300}
          label="Large Interactive Area"
          color="#3b82f6"
        >
          <h3 className="text-4xl font-bold text-white mb-4">
            Large Magnetic Area
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            This entire area has magnetic properties. Move your cursor around to feel the subtle attraction effect.
          </p>
          
          <div className="flex justify-center gap-6">
            <MagneticButton
              variant="primary"
              size="large"
              strength={0.4}
              label="Get Started"
              color="#ffffff"
              onClick={() => setSelectedDemo('get-started')}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </MagneticButton>
            
            <MagneticButton
              variant="outline"
              size="large"
              strength={0.3}
              label="Learn More"
              color="#06b6d4"
              onClick={() => setSelectedDemo('learn-more')}
            >
              Learn More
            </MagneticButton>
          </div>
        </MagneticArea>

        {/* Selected Demo Display */}
        {selectedDemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
          >
            <h4 className="text-xl font-bold text-white mb-2">Selected: {selectedDemo}</h4>
            <p className="text-gray-300">
              You clicked on the magnetic element with ID: <code className="bg-white/20 px-2 py-1 rounded">{selectedDemo}</code>
            </p>
            <MagneticButton
              variant="ghost"
              size="small"
              strength={0.2}
              label="Clear Selection"
              onClick={() => setSelectedDemo(null)}
              className="mt-4"
            >
              Clear
            </MagneticButton>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="mt-16 text-center">
          <MagneticElement 
            as="div" 
            strength={0.1} 
            label="Instructions"
            className="inline-block bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-4">How to Use</h3>
            <div className="text-gray-300 space-y-2">
              <p>• Move your mouse near the magnetic elements to feel the attraction</p>
              <p>• Different elements have different magnetic strengths</p>
              <p>• Watch the cursor change as it interacts with magnetic areas</p>
              <p>• Click elements to see interaction feedback</p>
            </div>
          </MagneticElement>
        </div>
      </div>
    </div>
  );
} 