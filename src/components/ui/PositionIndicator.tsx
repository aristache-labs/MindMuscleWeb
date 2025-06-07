'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Users, 
  Target,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WaitlistPosition, EarlyAccessTier } from '@/types';

interface PositionIndicatorProps {
  position: WaitlistPosition;
  className?: string;
  showMovement?: boolean;
  showPercentile?: boolean;
  animated?: boolean;
}

export function PositionIndicator({ 
  position, 
  className, 
  showMovement = true,
  showPercentile = true,
  animated = true 
}: PositionIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const getMovementIcon = () => {
    if (position.movement > 0) return TrendingUp;
    if (position.movement < 0) return TrendingDown;
    return Minus;
  };

  const getMovementColor = () => {
    if (position.movement > 0) return 'text-green-400';
    if (position.movement < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getMovementText = () => {
    if (position.movement > 0) return `+${position.movement} spots`;
    if (position.movement < 0) return `${position.movement} spots`;
    return 'No change';
  };

  const getTierColor = (tier: EarlyAccessTier) => {
    const colors = {
      gray: 'from-gray-500 to-gray-600',
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      emerald: 'from-emerald-500 to-emerald-600',
      gold: 'from-yellow-500 to-yellow-600',
    };
    return colors[tier.color as keyof typeof colors] || colors.gray;
  };

  const MovementIcon = getMovementIcon();

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Position Card */}
      <motion.div
        initial={animated ? { opacity: 0, scale: 0.9 } : false}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getTierColor(position.tier)} p-1`}
      >
        <div className="bg-dark-900/90 backdrop-blur-sm rounded-xl p-6">
          {/* Position Number */}
          <div className="text-center mb-6">
            <motion.div
              initial={animated ? { scale: 0 } : false}
              animate={isVisible ? { scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-white mb-2">
                #{position.current.toLocaleString()}
              </div>
              <div className="absolute -top-2 -right-2">
                <motion.div
                  initial={animated ? { scale: 0, rotate: -180 } : false}
                  animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="p-2 bg-white/10 rounded-full"
                >
                  <span className="text-2xl">{position.tier.icon}</span>
                </motion.div>
              </div>
            </motion.div>
            
            <p className="text-gray-300 text-lg">
              Your position on the waitlist
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              initial={animated ? { opacity: 0, y: 20 } : false}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-center p-4 bg-white/5 rounded-lg"
            >
              <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {position.total.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Users</div>
            </motion.div>

            {showPercentile && (
              <motion.div
                initial={animated ? { opacity: 0, y: 20 } : false}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-center p-4 bg-white/5 rounded-lg"
              >
                <Target className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {position.percentile}%
                </div>
                <div className="text-sm text-gray-400">Top Percentile</div>
              </motion.div>
            )}
          </div>

          {/* Movement Indicator */}
          {showMovement && position.movement !== 0 && (
            <motion.div
              initial={animated ? { opacity: 0, scale: 0.8 } : false}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className={cn(
                'flex items-center justify-center gap-2 p-3 rounded-lg',
                'bg-white/5 border',
                position.movement > 0 
                  ? 'border-green-500/30 bg-green-500/10' 
                  : 'border-red-500/30 bg-red-500/10'
              )}
            >
              <MovementIcon className={cn('h-5 w-5', getMovementColor())} />
              <span className={cn('font-semibold', getMovementColor())}>
                {getMovementText()}
              </span>
              <span className="text-gray-400 text-sm">since last week</span>
            </motion.div>
          )}

          {/* Current Tier Badge */}
          <motion.div
            initial={animated ? { opacity: 0, y: 10 } : false}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="mt-4 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
              <span className="text-lg">{position.tier.icon}</span>
              <span className="font-semibold text-white">{position.tier.name} Tier</span>
            </div>
          </motion.div>
        </div>

        {/* Animated Background Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getTierColor(position.tier)} blur-3xl`} />
          </motion.div>
        )}
      </motion.div>

      {/* Progress Toward Next Milestone */}
      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : false}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Zap className="h-5 w-5 text-primary-400" />
          <h3 className="font-semibold text-white">Position Progress</h3>
        </div>
        
        {/* Progress visualization */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Current Position</span>
            <span className="text-white font-semibold">#{position.current}</span>
          </div>
          
          {/* Visual progress bar */}
          <div className="relative">
            <div className="h-2 bg-dark-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
                initial={animated ? { width: 0 } : false}
                animate={isVisible ? { width: `${100 - position.percentile}%` } : {}}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </div>
            
            {/* Position marker */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-lg"
              initial={animated ? { left: '0%' } : false}
              animate={isVisible ? { left: `${100 - position.percentile}%` } : {}}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              style={{ marginLeft: '-8px' }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>Back of line</span>
            <span>Front of line</span>
          </div>
        </div>
      </motion.div>

      {/* Estimated Wait Time */}
      <motion.div
        initial={animated ? { opacity: 0, y: 20 } : false}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="bg-dark-800/50 border border-gray-700/50 rounded-xl p-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <Clock className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-white">Estimated Access</h3>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {position.current <= 100 ? '2-3 weeks' : 
             position.current <= 500 ? '4-6 weeks' : 
             position.current <= 1000 ? '2-3 months' : '3-4 months'}
          </div>
          <p className="text-sm text-gray-400">
            Based on your current position and tier
          </p>
        </div>
      </motion.div>
    </div>
  );
} 