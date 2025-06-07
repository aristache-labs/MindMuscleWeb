'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Users, 
  Clock, 
  Gift,
  ChevronRight,
  Star,
  Zap
} from 'lucide-react';
import { cn, trackEvent } from '@/lib/utils';
import { AISparklesIcon, AICommunityIcon } from '@/components/ui/CustomIcons';

interface WaitlistPromotionBannerProps {
  variant?: 'floating' | 'inline' | 'hero' | 'sticky';
  style?: 'minimal' | 'gradient' | 'neon' | 'premium';
  showCountdown?: boolean;
  showStats?: boolean;
  dismissible?: boolean;
  onJoinClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function WaitlistPromotionBanner({
  variant = 'inline',
  style = 'gradient',
  showCountdown = true,
  showStats = true,
  dismissible = false,
  onJoinClick,
  onDismiss,
  className
}: WaitlistPromotionBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentStats, setCurrentStats] = useState({
    waitlistCount: 12847,
    recentJoins: 23,
    timeframe: '24h'
  });

  useEffect(() => {
    // Launch date - Summer 2025 (June 21, 2025)
    const launchDate = new Date('2025-06-21T00:00:00Z');
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []); // Empty dependency array since launchDate is constant

  // Simulate real-time stats updates
  useEffect(() => {
    const updateStats = () => {
      setCurrentStats(prev => ({
        ...prev,
        waitlistCount: prev.waitlistCount + Math.floor(Math.random() * 3),
        recentJoins: Math.floor(Math.random() * 50) + 10
      }));
    };

    const interval = setInterval(updateStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleJoinClick = () => {
    trackEvent('promotion_banner_join_click', {
      variant,
      style,
      location: 'banner'
    });
    onJoinClick?.();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    trackEvent('promotion_banner_dismissed', { variant, style });
    onDismiss?.();
  };

  if (!isVisible) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'floating':
        return 'fixed bottom-6 right-6 max-w-sm z-50 shadow-2xl';
      case 'sticky':
        return 'sticky top-0 z-40 shadow-lg';
      case 'hero':
        return 'w-full max-w-4xl mx-auto';
      default:
        return 'w-full max-w-2xl mx-auto';
    }
  };

  const getStyleClasses = () => {
    switch (style) {
      case 'minimal':
        return 'bg-dark-800/90 border border-gray-700/50';
      case 'neon':
        return 'bg-dark-900/95 border border-primary-500/50 shadow-lg shadow-primary-500/20';
      case 'premium':
        return 'bg-gradient-to-br from-dark-800/95 to-dark-900/95 border border-gradient-to-r from-primary-500/50 to-purple-500/50';
      default:
        return 'bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/20';
    }
  };

  const renderCountdown = () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 text-primary-400">
        <Clock className="h-4 w-4" />
        <span className="text-sm font-medium">Launch in:</span>
      </div>
      <div className="flex gap-2">
        {[
          { label: 'Days', value: countdown.days },
          { label: 'Hours', value: countdown.hours },
          { label: 'Min', value: countdown.minutes },
          { label: 'Sec', value: countdown.seconds }
        ].map((unit, index) => (
          <motion.div
            key={unit.label}
            className="text-center"
            animate={{ scale: unit.label === 'Sec' ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: unit.label === 'Sec' ? Infinity : 0 }}
          >
            <div className="bg-dark-900/50 rounded-lg px-2 py-1 min-w-[40px]">
              <div className="text-lg font-bold text-white">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400">{unit.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="flex items-center gap-6">
      <motion.div 
        className="flex items-center gap-2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        <AICommunityIcon size={16} className="text-primary-400" />
        <div>
          <div className="text-lg font-bold text-white">
            {currentStats.waitlistCount.toLocaleString()}+
          </div>
          <div className="text-xs text-gray-400">Early Adopters</div>
        </div>
      </motion.div>
      
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <div>
          <div className="text-sm font-semibold text-green-400">
            +{currentStats.recentJoins} joined
          </div>
          <div className="text-xs text-gray-400">in last {currentStats.timeframe}</div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: variant === 'floating' ? 100 : 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: variant === 'floating' ? 100 : -20, scale: 0.95 }}
        className={cn(
          'backdrop-blur-sm rounded-xl overflow-hidden',
          getVariantStyles(),
          getStyleClasses(),
          className
        )}
      >
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/5 to-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="p-2 bg-primary-500/20 rounded-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                <AISparklesIcon size={20} className="text-primary-400" />
              </motion.div>
              <div>
                <motion.div
                  className="inline-flex items-center gap-1 bg-primary-500/10 border border-primary-500/20 rounded-full px-3 py-1 mb-2"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Star className="h-3 w-3 text-primary-400" />
                  <span className="text-xs font-medium text-primary-300">Limited Early Access</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white">
                  Join the AI Fitness Revolution
                </h3>
                <p className="text-sm text-gray-300">
                  Be first to experience personalized AI workouts
                </p>
              </div>
            </div>
            
            {dismissible && (
              <motion.button
                onClick={handleDismiss}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </div>

          {/* Content */}
          <div className="space-y-4">
            {showCountdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {renderCountdown()}
              </motion.div>
            )}

            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {renderStats()}
              </motion.div>
            )}

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 py-4"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="h-4 w-4 text-green-400" />
                </div>
                <div className="text-xs text-gray-300">Early Access</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-xs text-gray-300">VIP Features</div>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
                <div className="text-xs text-gray-300">Community</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={handleJoinClick}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Join Early Access</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4 text-xs text-gray-400"
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>Unsubscribe anytime</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 