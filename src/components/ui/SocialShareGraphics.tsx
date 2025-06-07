'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Copy, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Instagram,
  MessageCircle,
  Mail,
  Check
} from 'lucide-react';
import { cn, trackEvent } from '@/lib/utils';
import { AISparklesIcon } from '@/components/ui/CustomIcons';

interface SocialShareGraphicsProps {
  referralCode?: string;
  userStats?: {
    position: number;
    referrals: number;
    tier: string;
  };
  onShare?: (platform: string, content: string) => void;
  className?: string;
}

interface GraphicTemplate {
  id: string;
  name: string;
  platform: string;
  dimensions: { width: number; height: number };
  icon: React.ComponentType<{ className?: string }>;
}

const GRAPHIC_TEMPLATES: GraphicTemplate[] = [
  {
    id: 'twitter-post',
    name: 'Twitter Post',
    platform: 'twitter',
    dimensions: { width: 1200, height: 675 },
    icon: Twitter
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    platform: 'instagram',
    dimensions: { width: 1080, height: 1920 },
    icon: Instagram
  },
  {
    id: 'facebook-post',
    name: 'Facebook Post',
    platform: 'facebook',
    dimensions: { width: 1200, height: 630 },
    icon: Facebook
  }
];

const SHARE_MESSAGES = {
  twitter: "🚀 Just joined the MindMuscle waitlist! AI-powered personalized workouts are coming Summer 2025. Join me and get early access! #MindMuscle #AIFitness",
  facebook: "Excited to be part of the MindMuscle revolution! 🏋️‍♂️ AI-powered workouts that adapt to YOU. Summer 2025 can't come soon enough!",
  linkedin: "The future of fitness is here! Just joined MindMuscle's waitlist for AI-powered personalized workouts. Summer 2025 launch! 🚀",
  instagram: "Mind + Muscle = Magic ✨ Just secured my spot for the AI fitness revolution! Personalized workouts powered by AI, launching Summer 2025.",
  whatsapp: "Hey! Just joined the MindMuscle waitlist 🚀 It's an AI-powered fitness app launching Summer 2025. Thought you might be interested!",
  email: "I wanted to share something exciting with you! I just joined the waitlist for MindMuscle, an AI-powered fitness app launching Summer 2025."
};

export function SocialShareGraphics({
  referralCode,
  userStats,
  onShare,
  className
}: SocialShareGraphicsProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<GraphicTemplate>(GRAPHIC_TEMPLATES[0]);
  const [copiedLink, setCopiedLink] = useState(false);

  const generateShareLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return referralCode ? `${baseUrl}?ref=${referralCode}` : baseUrl;
  };

  const handleShare = async (platform: string) => {
    const shareLink = generateShareLink();
    const message = SHARE_MESSAGES[platform as keyof typeof SHARE_MESSAGES];
    const fullContent = `${message}\n\n${shareLink}`;

    trackEvent('social_share_initiated', {
      platform,
      has_referral: !!referralCode,
      template: selectedTemplate.id
    });

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullContent)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}&quote=${encodeURIComponent(message)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}&summary=${encodeURIComponent(message)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(fullContent)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent('Check out MindMuscle - AI Fitness Revolution')}&body=${encodeURIComponent(fullContent)}`);
        break;
    }

    onShare?.(platform, fullContent);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      trackEvent('share_link_copied');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Platform</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GRAPHIC_TEMPLATES.map((template) => {
            const IconComponent = template.icon;
            return (
              <motion.button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={cn(
                  'p-4 rounded-lg border transition-all text-left',
                  selectedTemplate.id === template.id
                    ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                    : 'bg-dark-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{template.name}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {template.dimensions.width} × {template.dimensions.height}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
        <div className="bg-dark-800/50 border border-gray-700/50 rounded-lg p-6">
          <div 
            className="relative bg-gradient-to-br from-dark-800 to-dark-900 rounded-lg overflow-hidden flex flex-col justify-center items-center text-center p-8"
            style={{
              aspectRatio: `${selectedTemplate.dimensions.width} / ${selectedTemplate.dimensions.height}`,
              minHeight: '300px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 justify-center">
                <AISparklesIcon size={24} className="text-primary-400" />
                <h2 className="text-2xl font-bold text-white">MindMuscle</h2>
              </div>
              
              <p className="text-primary-400 font-medium">AI-Powered Fitness Revolution</p>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Join Early Access</h3>
                <p className="text-gray-300">Summer 2025 Launch</p>
              </div>

              {userStats && (
                <div className="bg-green-500/20 rounded-lg px-4 py-2">
                  <p className="text-green-400 font-semibold">
                    I'm #{userStats.position} on the waitlist!
                  </p>
                </div>
              )}

              {referralCode && (
                <div className="bg-primary-500/20 rounded-lg px-4 py-2">
                  <p className="text-primary-400 font-mono font-bold">
                    Use code: {referralCode}
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-400">{generateShareLink()}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Share Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Share & Download</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { platform: 'twitter', icon: Twitter, label: 'Twitter' },
            { platform: 'facebook', icon: Facebook, label: 'Facebook' },
            { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
            { platform: 'instagram', icon: Instagram, label: 'Instagram' },
            { platform: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
            { platform: 'email', icon: Mail, label: 'Email' }
          ].map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.button
                key={social.platform}
                onClick={() => handleShare(social.platform)}
                className="flex items-center gap-2 p-3 bg-dark-800/50 hover:bg-dark-700/50 border border-gray-700/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-sm font-medium text-white">{social.label}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          onClick={() => copyToClipboard(`${SHARE_MESSAGES[selectedTemplate.platform as keyof typeof SHARE_MESSAGES]}\n\n${generateShareLink()}`)}
          className="w-full flex items-center justify-center gap-2 p-3 bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/50 rounded-lg transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {copiedLink ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              <span className="font-medium text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="font-medium text-white">Copy Message & Link</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
} 