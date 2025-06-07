'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Clock, 
  Users, 
  Trophy,
  Sparkles,
  Target,
  Gift,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { WaitlistPromotionBanner } from '@/components/ui/WaitlistPromotionBanner';
import { SocialShareGraphics } from '@/components/ui/SocialShareGraphics';
import { LaunchCountdown } from '@/components/ui/LaunchCountdown';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { trackEvent } from '@/lib/utils';

export default function WaitlistPromotionPage() {
  const [activeTab, setActiveTab] = useState('banners');
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  // Mock user stats for demonstration
  const mockUserStats = {
    position: 1247,
    referrals: 3,
    tier: 'Enthusiast'
  };

  const mockReferralCode = 'MIND42';

  const handleJoinWaitlist = () => {
    setShowWaitlistForm(true);
    trackEvent('promotion_page_join_click', { source: 'promotion_materials' });
  };

  const handleShare = (platform: string, content: string) => {
    trackEvent('promotion_material_shared', { platform, content_type: 'social_graphic' });
    console.log(`Shared on ${platform}:`, content);
  };

  const tabs = [
    { id: 'banners', label: 'Promotion Banners', icon: Sparkles },
    { id: 'graphics', label: 'Social Graphics', icon: Share2 },
    { id: 'countdown', label: 'Launch Countdown', icon: Clock },
    { id: 'tools', label: 'Promotion Tools', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-dark-800 to-dark-900 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
              <Gift className="h-4 w-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-300">Promotion Materials</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-6">
              Waitlist Promotion{' '}
              <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                Materials
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Boost your waitlist signups with professional banners, social graphics, 
              countdown timers, and promotional tools designed to convert.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary-400" />
                  <span className="text-lg font-bold text-white">5+</span>
                </div>
                <p className="text-sm text-gray-400">Banner Variants</p>
              </div>
              
              <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Share2 className="h-5 w-5 text-blue-400" />
                  <span className="text-lg font-bold text-white">6+</span>
                </div>
                <p className="text-sm text-gray-400">Social Platforms</p>
              </div>
              
              <div className="bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-green-400" />
                  <span className="text-lg font-bold text-white">Live</span>
                </div>
                <p className="text-sm text-gray-400">Countdown Timer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 bg-dark-800/50 p-2 rounded-xl overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-6 rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                    : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {/* Promotion Banners */}
          {activeTab === 'banners' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Promotion Banners</h2>
                <p className="text-gray-400 mb-8">
                  Ready-to-use banners for different placements and styles. Perfect for websites, 
                  emails, and digital marketing campaigns.
                </p>

                <div className="grid gap-8">
                  {/* Hero Banner */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Hero Banner</h3>
                    <p className="text-sm text-gray-400">
                      Large banner perfect for hero sections and landing pages
                    </p>
                    <WaitlistPromotionBanner
                      variant="hero"
                      style="premium"
                      onJoinClick={handleJoinWaitlist}
                    />
                  </div>

                  {/* Inline Banner */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Inline Banner</h3>
                    <p className="text-sm text-gray-400">
                      Compact banner for embedding within content
                    </p>
                    <WaitlistPromotionBanner
                      variant="inline"
                      style="minimal"
                      showCountdown={false}
                      onJoinClick={handleJoinWaitlist}
                    />
                  </div>

                  {/* Neon Style Banner */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Neon Style Banner</h3>
                    <p className="text-sm text-gray-400">
                      Eye-catching neon style for high-impact placements
                    </p>
                    <WaitlistPromotionBanner
                      variant="inline"
                      style="neon"
                      onJoinClick={handleJoinWaitlist}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Graphics */}
          {activeTab === 'graphics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Social Media Graphics</h2>
                <p className="text-gray-400 mb-8">
                  Platform-optimized graphics for sharing your waitlist link across social media. 
                  Includes templates for Twitter, Instagram, Facebook, LinkedIn, and more.
                </p>

                <SocialShareGraphics
                  referralCode={mockReferralCode}
                  userStats={mockUserStats}
                  onShare={handleShare}
                />
              </div>
            </motion.div>
          )}

          {/* Launch Countdown */}
          {activeTab === 'countdown' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Launch Countdown</h2>
                <p className="text-gray-400 mb-8">
                  Create urgency and excitement with live countdown timers. Multiple variants 
                  available for different use cases.
                </p>

                <div className="grid gap-8">
                  {/* Full Countdown */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Full Countdown with Roadmap</h3>
                    <p className="text-sm text-gray-400">
                      Complete countdown experience with milestones and progress tracking
                    </p>
                    <div className="bg-dark-800/30 rounded-lg p-6">
                      <LaunchCountdown
                        variant="full"
                        showMilestones={true}
                        showProgress={true}
                        onJoinWaitlist={handleJoinWaitlist}
                      />
                    </div>
                  </div>

                  {/* Compact Countdown */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Compact Countdown</h3>
                    <p className="text-sm text-gray-400">
                      Minimal countdown for sidebars and tight spaces
                    </p>
                    <div className="bg-dark-800/30 rounded-lg p-6 max-w-md">
                      <LaunchCountdown
                        variant="compact"
                        showMilestones={false}
                        showProgress={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Promotion Tools */}
          {activeTab === 'tools' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Promotion Tools & Resources</h2>
                <p className="text-gray-400 mb-8">
                  Additional tools and resources to maximize your waitlist promotion effectiveness.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Quick Links */}
                  <div className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-primary-400" />
                      Quick Actions
                    </h3>
                    
                    <div className="space-y-3">
                      <button
                        onClick={handleJoinWaitlist}
                        className="w-full flex items-center justify-between p-3 bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/50 rounded-lg transition-colors"
                      >
                        <span className="text-primary-300 font-medium">Join Waitlist</span>
                        <ArrowRight className="h-4 w-4 text-primary-400" />
                      </button>
                      
                      <button
                        onClick={() => window.open('https://twitter.com/intent/tweet?text=Check%20out%20MindMuscle%20-%20AI%20Fitness%20Revolution!', '_blank')}
                        className="w-full flex items-center justify-between p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-colors"
                      >
                        <span className="text-blue-300 font-medium">Share on Twitter</span>
                        <ArrowRight className="h-4 w-4 text-blue-400" />
                      </button>
                    </div>
                  </div>

                  {/* Stats & Metrics */}
                  <div className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      Promotion Impact
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Potential Reach</span>
                        <span className="text-white font-semibold">50K+ users</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Conversion Rate</span>
                        <span className="text-green-400 font-semibold">12-18%</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Avg. Referrals</span>
                        <span className="text-blue-400 font-semibold">2.3 per user</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Waitlist Form Modal */}
      {showWaitlistForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 border border-gray-700/50 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Join the Waitlist</h3>
              <button
                onClick={() => setShowWaitlistForm(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <WaitlistForm onSuccess={() => setShowWaitlistForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
} 