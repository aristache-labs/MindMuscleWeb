'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  Copy,
  ExternalLink,
  Zap,
  Gift,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { cn, trackEvent } from '@/lib/utils';

// Type definitions for sharing
export interface ShareData {
  url: string;
  message: string;
  hashtags?: string[];
  pointsAwarded?: number;
  tierUpgraded?: boolean;
}

interface SocialSharingPanelProps {
  userId: string;
  referralCode: string;
  onShare?: (platform: string, shareData: ShareData) => void;
  className?: string;
}

interface SharePlatform {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  available: boolean;
  cooldownUntil?: string;
  pointsReward: number;
  shareUrl: string;
  shareText: string;
}

interface ShareHistory {
  id: string;
  platform: string;
  created_at: string;
  points_awarded: number;
}

interface SharingIncentive {
  platform: string;
  url: string;
  message: string;
  pointsReward: number;
  available: boolean;
  lastShared?: string;
}

const PLATFORM_CONFIG = {
  twitter: {
    name: 'Twitter',
    icon: Twitter,
    color: 'text-blue-400',
    baseUrl: 'https://twitter.com/intent/tweet',
  },
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600',
    baseUrl: 'https://www.facebook.com/sharer/sharer.php',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-500',
    baseUrl: 'https://www.linkedin.com/sharing/share-offsite/',
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'text-green-400',
    baseUrl: 'https://wa.me/',
  },
  email: {
    name: 'Email',
    icon: Mail,
    color: 'text-red-400',
    baseUrl: 'mailto:',
  },
  copy: {
    name: 'Copy Link',
    icon: Copy,
    color: 'text-gray-400',
    baseUrl: '',
  },
};

export function SocialSharingPanel({ 
  userId, 
  referralCode, 
  onShare, 
  className 
}: SocialSharingPanelProps) {
  const [platforms, setPlatforms] = useState<SharePlatform[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [recentShares, setRecentShares] = useState<ShareHistory[]>([]);

  const fetchSharingData = useCallback(async () => {
    try {
      const response = await fetch(`/api/waitlist/social?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        const { incentives, sharingHistory } = data.data;
        
        const platformData = incentives.map((incentive: SharingIncentive) => {
          const config = PLATFORM_CONFIG[incentive.platform as keyof typeof PLATFORM_CONFIG];
          const referralUrl = `${incentive.url}?ref=${referralCode}`;
          
          return {
            id: incentive.platform,
            name: config.name,
            icon: config.icon,
            color: config.color,
            available: incentive.available,
            cooldownUntil: incentive.lastShared,
            pointsReward: incentive.pointsReward,
            shareUrl: referralUrl,
            shareText: incentive.message,
          };
        });
        
        setPlatforms(platformData);
        setRecentShares(sharingHistory);
      }
    } catch (error) {
      console.error('Failed to fetch sharing data:', error);
    }
  }, [userId, referralCode]);

  useState(() => {
    fetchSharingData();
  });

  const handlePlatformShare = async (platform: SharePlatform) => {
    if (!platform.available || isLoading) return;

    setIsLoading(true);
    trackEvent('social_share_initiated', { 
      platform: platform.id, 
      user_id: userId 
    });

    try {
      // Record the share in our database
      const response = await fetch('/api/waitlist/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          platform: platform.id,
          action: 'share'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        const { shareData, pointsAwarded, tierUpgraded } = result.data;
        
        // Open the sharing interface
        if (platform.id === 'copy') {
          await copyToClipboard(shareData.url);
        } else {
          openShareWindow(platform, shareData);
        }
        
        // Refresh the sharing data
        await fetchSharingData();
        
        // Call external handler
        onShare?.(platform.id, {
          ...shareData,
          pointsAwarded,
          tierUpgraded
        });

        trackEvent('social_share_success', {
          platform: platform.id,
          points_awarded: pointsAwarded,
          tier_upgraded: tierUpgraded
        });
      } else {
        throw new Error(result.error || 'Share failed');
      }
    } catch (error) {
      console.error('Share error:', error);
      trackEvent('social_share_error', { 
        platform: platform.id, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openShareWindow = (platform: SharePlatform, shareData: ShareData) => {
    const { url, message, hashtags } = shareData;
    let shareUrl = '';

    switch (platform.id) {
      case 'twitter':
        const twitterText = `${message} ${hashtags?.map((tag: string) => `#${tag}`).join(' ')}`;
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(url)}`;
        break;
      
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
        break;
      
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(message)}`;
        break;
      
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`;
        break;
      
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Join me on MindMuscle!')}&body=${encodeURIComponent(`${message}\n\n${url}`)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getTimeUntilAvailable = (cooldownUntil: string) => {
    const now = new Date();
    const cooldown = new Date(cooldownUntil);
    const hoursLeft = Math.ceil((cooldown.getTime() + 24 * 60 * 60 * 1000 - now.getTime()) / (1000 * 60 * 60));
    
    if (hoursLeft <= 0) return null;
    return hoursLeft > 1 ? `${hoursLeft}h` : '<1h';
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Share2 className="h-6 w-6 text-primary-400" />
          <h3 className="text-xl font-bold text-white">Share & Earn</h3>
        </div>
        <p className="text-gray-400">
          Share your referral link to earn points and climb the waitlist faster!
        </p>
      </div>

      {/* Sharing Platforms */}
      <div className="grid gap-3">
        {platforms.map((platform, index) => {
          const IconComponent = platform.icon;
          const timeLeft = platform.cooldownUntil ? getTimeUntilAvailable(platform.cooldownUntil) : null;
          
          return (
            <motion.button
              key={platform.id}
              onClick={() => handlePlatformShare(platform)}
              disabled={!platform.available || isLoading}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border transition-all text-left',
                'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
                platform.available
                  ? 'bg-dark-800/50 border-gray-700/50 hover:border-primary-500/50 hover:bg-dark-700/50'
                  : 'bg-gray-800/30 border-gray-700/20 opacity-50 cursor-not-allowed'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={platform.available ? { scale: 1.02 } : {}}
              whileTap={platform.available ? { scale: 0.98 } : {}}
            >
              <div className={cn(
                'p-3 rounded-lg transition-colors',
                platform.available ? 'bg-primary-500/20' : 'bg-gray-500/20'
              )}>
                <IconComponent className={cn(
                  'h-6 w-6',
                  platform.available ? platform.color : 'text-gray-500'
                )} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white">{platform.name}</h4>
                  <div className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    platform.available 
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'bg-gray-500/20 text-gray-500'
                  )}>
                    +{platform.pointsReward} pts
                  </div>
                </div>
                
                <p className="text-sm text-gray-400">
                  {platform.available 
                    ? 'Ready to share' 
                    : timeLeft 
                    ? `Available in ${timeLeft}`
                    : 'Recently shared'
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                {platform.available ? (
                  <>
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ExternalLink className="h-5 w-5 text-gray-400" />
                    )}
                  </>
                ) : (
                  timeLeft ? (
                    <Clock className="h-5 w-5 text-gray-500" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Recent Activity */}
      {recentShares.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h4 className="font-semibold text-white">Recent Shares</h4>
          </div>
          
          <div className="space-y-2">
            {recentShares.slice(0, 3).map((share) => {
              const platformConfig = PLATFORM_CONFIG[share.platform as keyof typeof PLATFORM_CONFIG];
              const IconComponent = platformConfig?.icon;
              
              return (
                <div key={share.id} className="flex items-center gap-3 p-2 bg-dark-900/50 rounded-lg">
                  {IconComponent && (
                    <IconComponent className={cn('h-4 w-4', platformConfig.color)} />
                  )}
                  <div className="flex-1">
                    <div className="text-sm text-white capitalize">{share.platform}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(share.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-400">
                    +{share.points_awarded} pts
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Sharing Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <Gift className="h-5 w-5 text-purple-400" />
          <h4 className="font-semibold text-white">Sharing Tips</h4>
        </div>
        
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-start gap-2">
            <Zap className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <span>Share on multiple platforms for maximum points</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <span>You can share once per platform every 24 hours</span>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
            <span>More points = better tier = earlier access</span>
          </div>
        </div>
      </motion.div>

      {/* Copy Link Success */}
      <AnimatePresence>
        {copiedLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Link copied!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 