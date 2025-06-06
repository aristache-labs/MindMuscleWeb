'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { 
  WaitlistDashboard, 
  PositionIndicator, 
  SocialSharingPanel 
} from '@/components/ui';
import { EARLY_ACCESS_TIERS } from '@/lib/validations';
import type { 
  WaitlistUser, 
  WaitlistPosition 
} from '@/types';

// Mock data for demonstration
const mockUser: WaitlistUser = {
  id: 'demo-user-123',
  email: 'demo@example.com',
  firstName: 'Alex',
  position: 47,
  referralCode: 'ALEX42',
  referralCount: 3,
  earlyAccessTier: EARLY_ACCESS_TIERS[2], // VIP tier
  joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  lastActivity: new Date().toISOString(),
  socialShares: [],
  pointsEarned: 325,
  interests: ['ai-workouts', 'strength-training', 'nutrition-tracking'],
};

const mockPosition: WaitlistPosition = {
  current: 47,
  total: 2847,
  percentile: 98.3,
  movement: 12, // Moved up 12 positions
  tier: EARLY_ACCESS_TIERS[2], // VIP tier
};

export default function WaitlistDemoPage() {
  const [activeDemo, setActiveDemo] = useState<'dashboard' | 'position' | 'sharing'>('dashboard');

  const handleShare = (platform: string, shareData: any) => {
    console.log('Share initiated:', { platform, shareData });
    // In a real app, this would handle the actual sharing
  };

  const demoSections = [
    {
      id: 'dashboard' as const,
      title: 'Complete Dashboard',
      description: 'Full-featured waitlist dashboard with tabs, progress tracking, and tier management',
      icon: '📊',
    },
    {
      id: 'position' as const,
      title: 'Position Indicator',
      description: 'Animated position display with movement tracking and progress visualization',
      icon: '🎯',
    },
    {
      id: 'sharing' as const,
      title: 'Social Sharing',
      description: 'Platform-specific sharing with points system and cooldown management',
      icon: '🚀',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary-400" />
                  Advanced Waitlist Demo
                </h1>
                <p className="text-gray-400 mt-1">
                  Interactive showcase of waitlist features
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Choose a Demo</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {demoSections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveDemo(section.id)}
                className={`p-6 rounded-xl border transition-all text-left ${
                  activeDemo === section.id
                    ? 'bg-primary-500/10 border-primary-500/50'
                    : 'bg-dark-800/50 border-gray-700/50 hover:border-gray-600/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-3xl mb-3">{section.icon}</div>
                <h3 className="font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-sm text-gray-400">{section.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Feature Overview */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {demoSections.find(s => s.id === activeDemo)?.title}
            </h3>
            <p className="text-gray-300 mb-4">
              {demoSections.find(s => s.id === activeDemo)?.description}
            </p>
            
            {/* Feature highlights based on active demo */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeDemo === 'dashboard' && (
                <>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-sm font-medium text-white">Position Tracking</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-sm font-medium text-white">Progress Indicators</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-sm font-medium text-white">Tier System</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🔗</div>
                    <div className="text-sm font-medium text-white">Social Sharing</div>
                  </div>
                </>
              )}
              
              {activeDemo === 'position' && (
                <>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">📊</div>
                    <div className="text-sm font-medium text-white">Real-time Position</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-sm font-medium text-white">Movement Tracking</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-sm font-medium text-white">Percentile Display</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">⏱️</div>
                    <div className="text-sm font-medium text-white">ETA Calculation</div>
                  </div>
                </>
              )}
              
              {activeDemo === 'sharing' && (
                <>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">🌍</div>
                    <div className="text-sm font-medium text-white">Multi-Platform</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-sm font-medium text-white">Points System</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">⏰</div>
                    <div className="text-sm font-medium text-white">Cooldown System</div>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl mb-1">📈</div>
                    <div className="text-sm font-medium text-white">Activity Tracking</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Live Demo */}
          <div className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-6">Live Demo</h4>
            
            {activeDemo === 'dashboard' && (
              <WaitlistDashboard 
                user={mockUser} 
                onShare={handleShare}
              />
            )}
            
            {activeDemo === 'position' && (
              <div className="max-w-2xl mx-auto">
                <PositionIndicator 
                  position={mockPosition}
                  showMovement={true}
                  showPercentile={true}
                  animated={true}
                />
              </div>
            )}
            
            {activeDemo === 'sharing' && (
              <div className="max-w-2xl mx-auto">
                <SocialSharingPanel 
                  userId={mockUser.id}
                  referralCode={mockUser.referralCode}
                  onShare={handleShare}
                />
              </div>
            )}
          </div>

          {/* Technical Implementation */}
          <div className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Technical Features</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-white mb-3">Frontend Features</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Real-time animations with Framer Motion</li>
                  <li>• Responsive design with Tailwind CSS</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Component-based architecture</li>
                  <li>• Optimistic UI updates</li>
                  <li>• Error boundaries and loading states</li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-white mb-3">Backend Features</h5>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Advanced position calculation</li>
                  <li>• Points and tier management system</li>
                  <li>• Social sharing tracking</li>
                  <li>• Rate limiting and spam protection</li>
                  <li>• Referral system with validation</li>
                  <li>• Analytics and event tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mock Data Info */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">Demo Data</h4>
            <p className="text-yellow-200 text-sm mb-3">
              This demo uses mock data to showcase the features. Here's what you're seeing:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-yellow-400">User: Alex</div>
                <div className="text-yellow-200">Position #47 of 2,847</div>
                <div className="text-yellow-200">VIP Tier (325 points)</div>
              </div>
              <div>
                <div className="font-medium text-yellow-400">Progress</div>
                <div className="text-yellow-200">3 referrals made</div>
                <div className="text-yellow-200">Moved up 12 spots</div>
              </div>
              <div>
                <div className="font-medium text-yellow-400">Activity</div>
                <div className="text-yellow-200">Joined 7 days ago</div>
                <div className="text-yellow-200">Code: ALEX42</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 