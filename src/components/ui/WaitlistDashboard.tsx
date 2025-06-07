'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  Gift, 
  Share2, 
  Copy, 
  ExternalLink,
  Target,
  ChevronRight,
  CheckCircle,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  BarChart3
} from 'lucide-react';
import { cn, trackEvent } from '@/lib/utils';
import { 
  EARLY_ACCESS_TIERS, 
  calculateProgressToNextTier,
  getNextTier
} from '@/lib/validations';
import type { 
  WaitlistUser, 
  LeaderboardEntry
} from '@/types';

// Type definitions
interface ShareData {
  url: string;
  message: string;
  hashtags?: string[];
  pointsAwarded?: number;
  tierUpgraded?: boolean;
}

interface SocialIncentive {
  platform: string;
  available: boolean;
  lastShared?: string;
  pointsReward: number;
  message: string;
  url: string;
}

interface WaitlistDashboardProps {
  user: WaitlistUser;
  onShare?: (platform: string, shareData: ShareData) => void;
  className?: string;
}

interface TabType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabType[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'progress', label: 'Progress', icon: Target },
  { id: 'sharing', label: 'Sharing', icon: Share2 },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
];

const PLATFORM_ICONS = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
  email: Mail,
  copy: Copy,
};

export function WaitlistDashboard({ user, onShare, className }: WaitlistDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [socialIncentives, setSocialIncentives] = useState<SocialIncentive[]>([]);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentTier = EARLY_ACCESS_TIERS.find(tier => 
    user.referralCount >= tier.minReferrals && user.pointsEarned >= tier.minPoints
  ) || EARLY_ACCESS_TIERS[0];

  const nextTier = getNextTier(currentTier);
  const progressToNext = nextTier ? calculateProgressToNextTier(
    user.referralCount, 
    user.pointsEarned, 
    currentTier
  ) : 100;

  useEffect(() => {
    fetchLeaderboard();
    fetchSocialIncentives();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/waitlist?action=leaderboard');
      const data = await response.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  const fetchSocialIncentives = async () => {
    try {
      const response = await fetch(`/api/waitlist/social?userId=${user.id}`);
      const data = await response.json();
      if (data.success) {
        setSocialIncentives(data.data.incentives);
      }
    } catch (error) {
      console.error('Failed to fetch social incentives:', error);
    }
  };

  const handleShare = async (platform: string) => {
    setIsLoading(true);
    trackEvent('waitlist_share_initiated', { platform, user_id: user.id });

    try {
      const response = await fetch('/api/waitlist/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          platform,
          action: 'share'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        const { shareData, tierUpgraded, pointsAwarded } = result.data;
        
        // Call external share handler
        onShare?.(platform, shareData);
        
        // Update local state
        await fetchSocialIncentives();
        
        trackEvent('waitlist_share_success', { 
          platform, 
          points_awarded: pointsAwarded,
          tier_upgraded: tierUpgraded
        });
      }
    } catch (error) {
      console.error('Share failed:', error);
      trackEvent('waitlist_share_error', { platform, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(user.referralCode);
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 2000);
      trackEvent('referral_code_copied', { user_id: user.id });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Position Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Users className="h-6 w-6 text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Your Position</h3>
              <p className="text-sm text-gray-400">On the waitlist</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary-400">#{user.position}</div>
            <div className="text-sm text-gray-400">
              of {user.position + Math.floor(Math.random() * 1000)} total
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-white">{user.referralCount}</div>
            <div className="text-xs text-gray-400">Referrals</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{user.pointsEarned}</div>
            <div className="text-xs text-gray-400">Points</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary-400">{currentTier.name}</div>
            <div className="text-xs text-gray-400">Tier</div>
          </div>
        </div>
      </motion.div>

      {/* Current Tier */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 bg-${currentTier.color}-500/20 rounded-lg`}>
            <span className="text-2xl">{currentTier.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{currentTier.name} Tier</h3>
            <p className="text-sm text-gray-400">Your current access level</p>
          </div>
        </div>
        
        <div className="space-y-2">
          {currentTier.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Referral Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Gift className="h-5 w-5 text-primary-400" />
          <h3 className="font-semibold text-white">Your Referral Code</h3>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-dark-900/50 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Code</div>
            <div className="text-xl font-mono font-bold text-primary-400">
              {user.referralCode}
            </div>
          </div>
          <motion.button
            onClick={copyReferralCode}
            className="p-3 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copiedReferral ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <Copy className="h-5 w-5 text-primary-400" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );

  const renderProgressTab = () => (
    <div className="space-y-6">
      {/* Next Tier Progress */}
      {nextTier && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white">Next Tier: {nextTier.name}</h3>
              <p className="text-sm text-gray-400">
                {Math.round(progressToNext)}% complete
              </p>
            </div>
            <div className={`p-2 bg-${nextTier.color}-500/20 rounded-lg`}>
              <span className="text-2xl">{nextTier.icon}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-dark-900/50 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Referrals needed</div>
                <div className="text-white font-semibold">
                  {user.referralCount} / {nextTier.minReferrals}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Points needed</div>
                <div className="text-white font-semibold">
                  {user.pointsEarned} / {nextTier.minPoints}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* All Tiers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-6"
      >
        <h3 className="font-semibold text-white mb-4">All Access Tiers</h3>
        
        <div className="space-y-3">
          {EARLY_ACCESS_TIERS.map((tier, index) => {
            const isUnlocked = user.referralCount >= tier.minReferrals && 
                              user.pointsEarned >= tier.minPoints;
            const isCurrent = tier.id === currentTier.id;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border transition-all',
                  isUnlocked 
                    ? isCurrent
                      ? 'bg-primary-500/20 border-primary-500/50'
                      : 'bg-green-500/10 border-green-500/30'
                    : 'bg-dark-900/30 border-gray-700/30'
                )}
              >
                <div className={`p-2 rounded-lg ${
                  isUnlocked ? `bg-${tier.color}-500/20` : 'bg-gray-500/20'
                }`}>
                  <span className="text-xl">{tier.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white">{tier.name}</h4>
                    {isUnlocked && (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                    {isCurrent && (
                      <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {tier.minReferrals} referrals • {tier.minPoints} points
                  </div>
                </div>
                
                <ChevronRight className={cn(
                  'h-5 w-5 transition-colors',
                  isUnlocked ? 'text-green-400' : 'text-gray-500'
                )} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );

  const renderSharingTab = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6"
      >
        <h3 className="font-semibold text-white mb-2">Earn Points by Sharing</h3>
        <p className="text-sm text-gray-400 mb-4">
          Share your referral link on social media to earn points and climb the waitlist!
        </p>
        
        <div className="grid gap-3">
          {socialIncentives.map((incentive, index) => {
            const IconComponent = PLATFORM_ICONS[incentive.platform as keyof typeof PLATFORM_ICONS];
            const isAvailable = incentive.available;
            
            return (
              <motion.button
                key={incentive.platform}
                onClick={() => isAvailable && handleShare(incentive.platform)}
                disabled={!isAvailable || isLoading}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border transition-all text-left',
                  isAvailable
                    ? 'bg-dark-800/50 border-gray-700/50 hover:border-primary-500/50'
                    : 'bg-gray-800/30 border-gray-700/20 opacity-50'
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={isAvailable ? { scale: 1.02 } : {}}
                whileTap={isAvailable ? { scale: 0.98 } : {}}
              >
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary-400" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white capitalize">
                      {incentive.platform}
                    </h4>
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                      +{incentive.pointsReward} pts
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {isAvailable ? 'Available to share' : 'Shared recently'}
                  </p>
                </div>
                
                {isAvailable ? (
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-yellow-400" />
          <h3 className="font-semibold text-white">Top Referrers</h3>
        </div>
        
        <div className="space-y-3">
          {leaderboard.slice(0, 10).map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-center gap-4 p-3 rounded-lg',
                entry.isCurrentUser 
                  ? 'bg-primary-500/20 border border-primary-500/50'
                  : 'bg-dark-800/50'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                index < 3 
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-500/20 text-gray-400'
              )}>
                {index < 3 ? ['🥇', '🥈', '🥉'][index] : entry.rank}
              </div>
              
              <div className="flex-1">
                <div className="font-semibold text-white">
                  {entry.user.firstName}
                </div>
                <div className="text-xs text-gray-400">
                  {entry.user.email}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-semibold text-white">
                  {entry.referrals} referrals
                </div>
                <div className="text-xs text-gray-400">
                  {entry.points} points
                </div>
              </div>
              
              <div className={`p-1 rounded ${
                entry.user.tier.color === 'gold' ? 'bg-yellow-500/20' :
                entry.user.tier.color === 'purple' ? 'bg-purple-500/20' :
                entry.user.tier.color === 'blue' ? 'bg-blue-500/20' :
                'bg-gray-500/20'
              }`}>
                <span className="text-sm">{entry.user.tier.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'progress': return renderProgressTab();
      case 'sharing': return renderSharingTab();
      case 'leaderboard': return renderLeaderboardTab();
      default: return renderOverviewTab();
    }
  };

  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user.firstName}!
        </h1>
        <p className="text-gray-400">
          Track your progress and boost your position on the waitlist
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 mb-8 bg-dark-800/50 p-2 rounded-xl"
      >
        {TABS.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all',
                activeTab === tab.id
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                  : 'text-gray-400 hover:text-white hover:bg-dark-700/50'
              )}
            >
              <IconComponent className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 