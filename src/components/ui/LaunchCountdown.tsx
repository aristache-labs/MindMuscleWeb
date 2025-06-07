'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Rocket, 
  Star, 
  Zap,
  Target,
  Users,
  Trophy,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { cn, trackEvent } from '@/lib/utils';
import { AISparklesIcon } from '@/components/ui/CustomIcons';

interface LaunchCountdownProps {
  variant?: 'compact' | 'full' | 'hero';
  showMilestones?: boolean;
  showProgress?: boolean;
  onJoinWaitlist?: () => void;
  className?: string;
}

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const LAUNCH_MILESTONES: Milestone[] = [
  {
    id: 'beta-testing',
    title: 'Beta Testing Begins',
    description: 'Early access for top waitlist members',
    date: new Date('2025-03-01'),
    completed: false,
    icon: Users,
    color: 'blue'
  },
  {
    id: 'ai-training',
    title: 'AI Model Training Complete',
    description: 'Personalization algorithms finalized',
    date: new Date('2025-04-15'),
    completed: false,
    icon: Zap,
    color: 'purple'
  },
  {
    id: 'app-store',
    title: 'App Store Submission',
    description: 'iOS and Android apps submitted for review',
    date: new Date('2025-05-01'),
    completed: false,
    icon: Target,
    color: 'green'
  },
  {
    id: 'public-launch',
    title: 'Public Launch',
    description: 'MindMuscle available to everyone',
    date: new Date('2025-06-21'),
    completed: false,
    icon: Rocket,
    color: 'orange'
  }
];

export function LaunchCountdown({
  variant = 'full',
  showMilestones = true,
  showProgress = true,
  onJoinWaitlist,
  className
}: LaunchCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentMilestone, setCurrentMilestone] = useState<Milestone | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Launch date - Summer 2025 (June 21, 2025)
  const launchDate = new Date('2025-06-21T00:00:00Z');
  const startDate = new Date('2024-12-01T00:00:00Z'); // Project start

  useEffect(() => {
    
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

        // Calculate progress percentage
        const totalTime = launchDate.getTime() - startDate.getTime();
        const elapsed = now - startDate.getTime();
        const progress = Math.min(Math.max((elapsed / totalTime) * 100, 0), 100);
        setProgressPercentage(progress);

        // Find current milestone
        const nextMilestone = LAUNCH_MILESTONES.find(milestone => 
          milestone.date.getTime() > now && !milestone.completed
        );
        setCurrentMilestone(nextMilestone || null);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []); // Empty dependency array since dates are constant

  const handleJoinClick = () => {
    trackEvent('countdown_join_click', {
      variant,
      days_remaining: countdown.days
    });
    onJoinWaitlist?.();
  };

  const renderCountdownUnits = () => {
    const units = [
      { label: 'Days', value: countdown.days, color: 'primary' },
      { label: 'Hours', value: countdown.hours, color: 'blue' },
      { label: 'Minutes', value: countdown.minutes, color: 'green' },
      { label: 'Seconds', value: countdown.seconds, color: 'orange' }
    ];

    return (
      <div className={cn(
        'grid gap-4',
        variant === 'compact' ? 'grid-cols-4' : 'grid-cols-2 md:grid-cols-4'
      )}>
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={cn(
                'rounded-xl p-4 border',
                variant === 'compact' ? 'p-2' : 'p-4',
                'bg-dark-800/50 border-gray-700/50'
              )}
              animate={{ 
                scale: unit.label === 'Seconds' ? [1, 1.05, 1] : 1,
                borderColor: unit.label === 'Seconds' ? 
                  ['rgba(107, 114, 128, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(107, 114, 128, 0.5)'] : 
                  'rgba(107, 114, 128, 0.5)'
              }}
              transition={{ 
                duration: 1, 
                repeat: unit.label === 'Seconds' ? Infinity : 0 
              }}
            >
              <div className={cn(
                'font-bold text-white',
                variant === 'compact' ? 'text-lg' : 'text-2xl md:text-3xl'
              )}>
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className={cn(
                'text-gray-400',
                variant === 'compact' ? 'text-xs' : 'text-sm'
              )}>
                {unit.label}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderProgress = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-medium text-white">Launch Progress</span>
        </div>
        <span className="text-sm text-primary-400 font-semibold">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      
      <div className="relative">
        <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>
        
        {/* Progress markers */}
        <div className="absolute top-0 left-0 w-full h-3 flex justify-between">
          {LAUNCH_MILESTONES.map((milestone, index) => {
            const position = ((milestone.date.getTime() - startDate.getTime()) / 
                            (launchDate.getTime() - startDate.getTime())) * 100;
            
            return (
              <div
                key={milestone.id}
                className="absolute top-0 transform -translate-x-1/2"
                style={{ left: `${position}%` }}
              >
                <div className={cn(
                  'w-3 h-3 rounded-full border-2 border-dark-900',
                  milestone.completed || progressPercentage > position
                    ? 'bg-green-400'
                    : 'bg-gray-600'
                )} />
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  const renderMilestones = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <Target className="h-5 w-5 text-primary-400" />
        Roadmap to Launch
      </h3>
      
      <div className="space-y-3">
        {LAUNCH_MILESTONES.map((milestone, index) => {
          const IconComponent = milestone.icon;
          const isPast = milestone.date.getTime() < Date.now();
          const isCurrent = currentMilestone?.id === milestone.id;
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-center gap-4 p-4 rounded-lg border transition-all',
                isCurrent 
                  ? 'bg-primary-500/20 border-primary-500/50'
                  : isPast
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-dark-800/50 border-gray-700/50'
              )}
            >
              <div className={cn(
                'p-2 rounded-lg',
                isCurrent 
                  ? 'bg-primary-500/20'
                  : isPast
                  ? 'bg-green-500/20'
                  : 'bg-gray-500/20'
              )}>
                {isPast ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <IconComponent className={cn(
                    'h-5 w-5',
                    isCurrent ? 'text-primary-400' : 'text-gray-400'
                  )} />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white">{milestone.title}</h4>
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-primary-400 rounded-full"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-400">{milestone.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {milestone.date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  if (variant === 'compact') {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-400">Launch in:</span>
          </div>
          {renderCountdownUnits()}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <AISparklesIcon size={24} className="text-primary-400" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white">
            {variant === 'hero' ? 'The Future Arrives' : 'Launch Countdown'}
          </h2>
        </div>
        
        <p className="text-gray-300 mb-6">
          MindMuscle launches Summer 2025. Join the waitlist for early access!
        </p>
        
        {renderCountdownUnits()}
      </motion.div>

      {/* Progress */}
      {showProgress && renderProgress()}

      {/* Current Milestone */}
      {currentMilestone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <currentMilestone.icon className="h-5 w-5 text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Next Milestone</h3>
              <p className="text-sm text-gray-400">Coming up next</p>
            </div>
          </div>
          
          <h4 className="text-lg font-bold text-white mb-2">
            {currentMilestone.title}
          </h4>
          <p className="text-gray-300 mb-4">
            {currentMilestone.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-400 font-medium">
              {currentMilestone.date.toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            
            {onJoinWaitlist && (
              <motion.button
                onClick={handleJoinClick}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 border border-primary-500/50 rounded-lg transition-colors text-primary-300 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Join Waitlist</span>
                <ArrowRight className="h-3 w-3" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* Milestones */}
      {showMilestones && renderMilestones()}

      {/* CTA */}
      {onJoinWaitlist && (variant === 'full' || variant === 'hero') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.button
            onClick={handleJoinClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="h-5 w-5" />
            <span>Secure Your Early Access</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
          
          <p className="text-xs text-gray-400 mt-3">
            Join {(12000 + Math.floor(Math.random() * 5000)).toLocaleString()}+ others waiting for launch
          </p>
        </motion.div>
      )}
    </div>
  );
} 