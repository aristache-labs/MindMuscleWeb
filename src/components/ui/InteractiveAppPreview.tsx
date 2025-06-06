'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Star, 
  Target, 
  TrendingUp, 
  Calendar,
  Trophy,
  Users,
  Settings,
  Home,
  User,
  ChevronRight,
  Timer,
  BarChart3,
  Zap
} from 'lucide-react';
import { MagneticElement } from './MagneticElement';

type AppScreen = 
  | 'dashboard' 
  | 'workout-plan' 
  | 'active-workout' 
  | 'progress' 
  | 'community'
  | 'profile';

interface InteractiveAppPreviewProps {
  className?: string;
}

export function InteractiveAppPreview({ className }: InteractiveAppPreviewProps) {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [reps, setReps] = useState(0);

  // Workout timer
  useEffect(() => {
    if (!isWorkoutActive) return;

    const interval = setInterval(() => {
      setWorkoutTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const screenVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  const navigationItems = [
    { screen: 'dashboard' as AppScreen, icon: Home, label: 'Home' },
    { screen: 'workout-plan' as AppScreen, icon: Target, label: 'Workouts' },
    { screen: 'progress' as AppScreen, icon: BarChart3, label: 'Progress' },
    { screen: 'community' as AppScreen, icon: Users, label: 'Community' },
    { screen: 'profile' as AppScreen, icon: User, label: 'Profile' },
  ];

  const renderDashboard = () => (
    <div className="p-6 h-full bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Good morning, Alex!</h1>
          <p className="text-gray-400 text-sm">Ready for today&apos;s challenge?</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" />
      </div>

      {/* AI Insight Card */}
      <MagneticElement strength={0.3} distance={40}>
        <motion.div
          className="bg-gradient-to-r from-primary-500/20 to-accent-cyan/20 border border-primary-500/30 rounded-2xl p-4 mb-6"
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-primary-400" />
            <span className="text-primary-300 font-medium">AI Insight</span>
          </div>
          <p className="text-white text-sm leading-relaxed">
            Based on your progress, I recommend focusing on chest and triceps today. 
            Your strength has increased 12% this week!
          </p>
        </motion.div>
      </MagneticElement>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-800/50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Timer className="w-4 h-4 text-accent-cyan" />
            <span className="text-gray-400 text-xs">This Week</span>
          </div>
          <p className="text-white font-bold">4h 32m</p>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400 text-xs">Streak</span>
          </div>
          <p className="text-white font-bold">12 days</p>
        </div>
      </div>

      {/* Today's Workout */}
      <MagneticElement 
        strength={0.4} 
        distance={50}
        data-magnetic-label="Start workout"
        data-magnetic-color="primary"
      >
        <motion.button
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 mb-4"
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentScreen('workout-plan')}
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-white font-bold">Today&apos;s Workout</h3>
              <p className="text-primary-100 text-sm">Chest & Triceps • 45 min</p>
            </div>
            <Play className="w-6 h-6 text-white" />
          </div>
        </motion.button>
      </MagneticElement>

      {/* Recent Activity */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-sm">Recent Activity</h3>
        {[
          { exercise: 'Bench Press', weight: '185 lbs', reps: '8 reps' },
          { exercise: 'Squats', weight: '225 lbs', reps: '10 reps' },
        ].map((activity, index) => (
          <div key={index} className="bg-gray-800/50 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">{activity.exercise}</p>
                <p className="text-gray-400 text-xs">{activity.weight} × {activity.reps}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkoutPlan = () => (
    <div className="p-6 h-full bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Chest & Triceps</h1>
          <p className="text-gray-400 text-sm">6 exercises • 45 minutes</p>
        </div>
        <MagneticElement strength={0.3}>
          <motion.button
            className="bg-primary-500/20 border border-primary-500/30 rounded-xl p-2"
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5 text-primary-400" />
          </motion.button>
        </MagneticElement>
      </div>

      {/* Start Workout Button */}
      <MagneticElement 
        strength={0.5} 
        distance={60}
        data-magnetic-label="Start workout"
        data-magnetic-color="success"
      >
        <motion.button
          className="w-full bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 mb-6"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setCurrentScreen('active-workout');
            setIsWorkoutActive(true);
            setWorkoutTime(0);
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <Play className="w-6 h-6 text-white" />
            <span className="text-white font-bold">START WORKOUT</span>
          </div>
        </motion.button>
      </MagneticElement>

      {/* Exercise List */}
      <div className="space-y-3">
        {[
          { name: 'Bench Press', sets: '4 sets', reps: '8-10 reps', weight: '185 lbs' },
          { name: 'Incline Dumbbell Press', sets: '3 sets', reps: '10-12 reps', weight: '65 lbs' },
          { name: 'Tricep Dips', sets: '3 sets', reps: '12-15 reps', weight: 'Bodyweight' },
          { name: 'Close-Grip Bench Press', sets: '3 sets', reps: '8-10 reps', weight: '155 lbs' },
        ].map((exercise, index) => (
          <MagneticElement key={index} strength={0.2} distance={30}>
            <motion.div
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{exercise.name}</h3>
                  <p className="text-gray-400 text-sm">{exercise.sets} • {exercise.reps}</p>
                  <p className="text-primary-400 text-sm font-medium">{exercise.weight}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </motion.div>
          </MagneticElement>
        ))}
      </div>
    </div>
  );

  const renderActiveWorkout = () => (
    <div className="p-6 h-full bg-gradient-to-br from-red-900/30 to-gray-900">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Bench Press</h1>
        <p className="text-gray-400">Set {currentSet} of 4</p>
      </div>

      {/* Timer */}
      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-white mb-2">{formatTime(workoutTime)}</div>
        <div className="flex items-center justify-center gap-4">
          <MagneticElement strength={0.4}>
            <motion.button
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsWorkoutActive(!isWorkoutActive)}
            >
              {isWorkoutActive ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </MagneticElement>
        </div>
      </div>

      {/* Weight & Reps */}
      <div className="bg-gray-800/50 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Weight</p>
            <p className="text-2xl font-bold text-white">185 lbs</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Target Reps</p>
            <p className="text-2xl font-bold text-white">8-10</p>
          </div>
        </div>
      </div>

      {/* Rep Counter */}
      <div className="text-center mb-8">
        <p className="text-gray-400 text-sm mb-2">Reps Completed</p>
        <p className="text-6xl font-bold text-primary-400 mb-4">{reps}</p>
        <div className="flex items-center justify-center gap-4">
          <MagneticElement strength={0.4}>
            <motion.button
              className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              onClick={() => setReps(prev => Math.max(0, prev - 1))}
            >
              <span className="text-white text-2xl font-bold">-</span>
            </motion.button>
          </MagneticElement>
          
          <MagneticElement strength={0.5} data-magnetic-label="Add rep" data-magnetic-color="success">
            <motion.button
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              onClick={() => setReps(prev => prev + 1)}
            >
              <span className="text-white text-3xl font-bold">+</span>
            </motion.button>
          </MagneticElement>
        </div>
      </div>

      {/* Next Set Button */}
      <MagneticElement strength={0.4} data-magnetic-label="Complete set">
        <motion.button
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setCurrentSet(prev => prev + 1);
            setReps(0);
            if (currentSet >= 4) {
              setCurrentScreen('dashboard');
              setIsWorkoutActive(false);
              setCurrentSet(1);
            }
          }}
        >
          <span className="text-white font-bold">
            {currentSet >= 4 ? 'FINISH WORKOUT' : 'NEXT SET'}
          </span>
        </motion.button>
      </MagneticElement>
    </div>
  );

  const renderProgress = () => (
    <div className="p-6 h-full bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-white">Your Progress</h1>
        <p className="text-gray-400 text-sm">Last 30 days</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <MagneticElement strength={0.2}>
          <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-xl p-4">
            <TrendingUp className="w-6 h-6 text-primary-400 mb-2" />
            <p className="text-white font-bold text-lg">+12%</p>
            <p className="text-gray-400 text-sm">Strength Gain</p>
          </div>
        </MagneticElement>
        
        <MagneticElement strength={0.2}>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
            <Calendar className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-white font-bold text-lg">24</p>
            <p className="text-gray-400 text-sm">Workouts</p>
          </div>
        </MagneticElement>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-gray-800/50 rounded-2xl p-4 mb-6">
        <h3 className="text-white font-medium mb-4">Strength Progression</h3>
        <div className="h-32 bg-gradient-to-r from-primary-500/20 to-accent-cyan/20 rounded-xl flex items-end justify-between p-4">
          {[0.3, 0.5, 0.4, 0.7, 0.6, 0.8, 0.9].map((height, index) => (
            <motion.div
              key={index}
              className="bg-primary-400 rounded-t"
              style={{ height: `${height * 100}%`, width: '8px' }}
              initial={{ height: 0 }}
              animate={{ height: `${height * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-white font-semibold mb-3">Recent Achievements</h3>
        <div className="space-y-2">
          {[
            { icon: Trophy, title: '30-Day Streak', color: 'text-yellow-400' },
            { icon: Star, title: 'Personal Best', color: 'text-blue-400' },
          ].map((achievement, index) => (
            <MagneticElement key={index} strength={0.2}>
              <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-3">
                <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                <span className="text-white font-medium">{achievement.title}</span>
              </div>
            </MagneticElement>
          ))}
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return renderDashboard();
      case 'workout-plan':
        return renderWorkoutPlan();
      case 'active-workout':
        return renderActiveWorkout();
      case 'progress':
        return renderProgress();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`relative mx-auto max-w-sm ${className}`}>
      {/* Phone Frame */}
      <div className="relative h-[600px] w-[300px] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl">
        {/* Inner Frame */}
        <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20" />
          
          {/* Status Bar */}
          <div className="absolute top-2 left-4 right-4 flex justify-between items-center text-white text-xs z-10">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
              <span className="text-green-400">100%</span>
            </div>
          </div>

          {/* Screen Content */}
          <div className="pt-12 pb-20 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                variants={screenVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50">
            <div className="flex justify-around items-center py-2">
              {navigationItems.map((item) => (
                <MagneticElement key={item.screen} strength={0.3} distance={25}>
                  <motion.button
                    className={`p-3 rounded-xl transition-colors ${
                      currentScreen === item.screen
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'text-gray-500'
                    }`}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentScreen(item.screen)}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.button>
                </MagneticElement>
              ))}
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
} 