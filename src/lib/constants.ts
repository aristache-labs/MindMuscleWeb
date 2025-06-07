import type { Feature, Step, Testimonial, AppScreenshot, NavigationItem } from '@/types';

// App Information
export const APP_INFO = {
  name: 'MindMuscle',
  tagline: 'AI-Powered Fitness Revolution',
  description: 'Experience the future of fitness with AI-powered personalized workouts that adapt and evolve with every rep.',
  version: '1.0.0',
  launchDate: 'Summer 2025',
  email: 'hello@mindmuscle.app',
  support: 'support@mindmuscle.app',
} as const;

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/mindmuscleapp',
  instagram: 'https://instagram.com/mindmuscleapp',
  linkedin: 'https://linkedin.com/company/mindmuscle',
  youtube: 'https://youtube.com/@mindmuscleapp',
  tiktok: 'https://tiktok.com/@mindmuscleapp',
} as const;

// App Store Links
export const STORE_LINKS = {
  appStore: 'https://apps.apple.com/app/mindmuscle',
  playStore: 'https://play.google.com/store/apps/details?id=com.mindmuscle.app',
} as const;

// Navigation Items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#showcase', label: 'App Preview' },
  { href: '#testimonials', label: 'Reviews' },
];

// How It Works Steps
export const HOW_IT_WORKS_STEPS: Step[] = [
  {
    id: 'choose-muscle',
    number: 1,
    title: 'Choose Your Focus',
    description: 'Select muscle groups or fitness goals. Our AI analyzes your preferences and current fitness level.',
    icon: 'target',
    animation: {
      src: '/animations/muscle-selection.json',
      alt: 'Muscle selection animation',
      autoplay: true,
      loop: true,
    },
  },
  {
    id: 'ai-curates',
    number: 2,
    title: 'AI Crafts Your Plan',
    description: 'Advanced algorithms create a personalized workout routine that adapts to your progress.',
    icon: 'brain',
    animation: {
      src: '/animations/ai-processing.json',
      alt: 'AI processing animation',
      autoplay: true,
      loop: true,
    },
  },
  {
    id: 'track-adapt',
    number: 3,
    title: 'Track & Evolve',
    description: 'Monitor your progress in real-time. The AI learns from every workout to optimize future sessions.',
    icon: 'trending-up',
    animation: {
      src: '/animations/progress-tracking.json',
      alt: 'Progress tracking animation',
      autoplay: true,
      loop: true,
    },
  },
  {
    id: 'stay-motivated',
    number: 4,
    title: 'Stay Motivated',
    description: 'Achievements, challenges, and community features keep you engaged and motivated.',
    icon: 'trophy',
    animation: {
      src: '/animations/motivation.json',
      alt: 'Motivation animation',
      autoplay: true,
      loop: true,
    },
  },
];

// Features List
export const FEATURES: Feature[] = [
  {
    id: 'ai-personalization',
    icon: 'brain-circuit',
    title: 'AI Personalization',
    description: 'Every workout is tailored to your unique fitness profile, goals, and progress patterns.',
    animation: {
      src: '/animations/personalization.json',
      alt: 'AI personalization animation',
    },
  },
  {
    id: 'adaptive-learning',
    icon: 'refresh-cw',
    title: 'Adaptive Learning',
    description: 'Our AI continuously learns from your performance to optimize future workout recommendations.',
  },
  {
    id: 'real-time-feedback',
    icon: 'activity',
    title: 'Real-Time Feedback',
    description: 'Get instant form corrections and performance insights during your workouts.',
  },
  {
    id: 'progress-tracking',
    icon: 'bar-chart-3',
    title: 'Progress Tracking',
    description: 'Visual progress insights and detailed metrics to keep you motivated.',
  },
  {
    id: 'smart-scheduling',
    icon: 'calendar-check',
    title: 'Smart Scheduling',
    description: 'AI-powered scheduling that adapts to your lifestyle and optimal workout timing.',
  },
  {
    id: 'community-challenges',
    icon: 'users',
    title: 'Community Challenges',
    description: 'Join global fitness challenges and compete with friends in a supportive environment.',
  },
];

// App Screenshots for Showcase - Real app screenshots from development
export const APP_SCREENSHOTS: AppScreenshot[] = [
  {
    id: 'workout-plans',
    title: 'Workout Plans',
    description: 'AI-curated workout plans designed to optimize your fitness journey.',
    image: '/screenshots/plans.jpeg',
    alt: 'MindMuscle Workout Plans Screenshot',
  },
  {
    id: 'workout-session',
    title: 'Active Workout',
    description: 'Real-time workout tracking with form guidance and performance metrics.',
    image: '/screenshots/workoutsession.jpeg',
    alt: 'MindMuscle Workout Session Screenshot',
  },
  {
    id: 'exercise-library',
    title: 'Exercise Library',
    description: 'Comprehensive exercise database with detailed instructions and variations.',
    image: '/screenshots/ExerciseList.jpeg',
    alt: 'MindMuscle Exercise Library Screenshot',
  },
  {
    id: 'exercise-details',
    title: 'Exercise Details',
    description: 'In-depth exercise breakdown with form tips and muscle targeting.',
    image: '/screenshots/ExerciseDetailsModal.jpeg',
    alt: 'MindMuscle Exercise Details Screenshot',
  },
  {
    id: 'body-model',
    title: '3D Body Model',
    description: 'Interactive muscle group visualization for targeted training.',
    image: '/screenshots/BodyModelWithMouscleGroup.jpeg',
    alt: 'MindMuscle Body Model Screenshot',
  },
  {
    id: 'muscle-targeting',
    title: 'Muscle Targeting',
    description: 'Detailed muscle group breakdown for precise training focus.',
    image: '/screenshots/bodymodalforbackmouscles.jpeg',
    alt: 'MindMuscle Muscle Targeting Screenshot',
  },
  {
    id: 'progress-tracking',
    title: 'Progress Tracking',
    description: 'Advanced metrics and measurements to monitor your transformation.',
    image: '/screenshots/measurements.jpeg',
    alt: 'MindMuscle Progress Tracking Screenshot',
  },
  {
    id: 'rest-timer',
    title: 'Smart Rest Timer',
    description: 'AI-optimized rest periods for maximum performance recovery.',
    image: '/screenshots/pausetimer.jpeg',
    alt: 'MindMuscle Rest Timer Screenshot',
  },
];

// Testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Fitness Enthusiast',
    company: 'Tech Startup Founder',
    content: "MindMuscle's AI completely transformed my workout routine. It's like having a personal trainer who knows exactly what I need, when I need it.",
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM4QjVDRjYiLz4KPC9zdmc+',
    rating: 5,
  },
  {
    id: 'mike-chen',
    name: 'Mike Chen',
    role: 'Professional Athlete',
    company: 'Olympic Training Center',
    content: "The adaptive learning capabilities are incredible. The app actually gets smarter with every workout and pushes me in ways I never expected.",
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyMkQzRUUiLz4KPC9zdmc+',
    rating: 5,
  },
  {
    id: 'jessica-rodriguez',
    name: 'Jessica Rodriguez',
    role: 'Busy Mom',
    company: 'Healthcare Professional',
    content: "Finally, a fitness app that understands my crazy schedule. The AI scheduling feature has been a game-changer for my work-life balance.",
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFMTFENDgiLz4KPC9zdmc+',
    rating: 5,
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'Software Engineer',
    company: 'Fortune 500 Company',
    content: "As someone who loves data, the progress tracking is phenomenal. I can see exactly how I'm improving across all metrics.",
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2RDI4RDkiLz4KPC9zdmc+',
    rating: 5,
  },
];

// Animation Timing Constants
export const ANIMATION_TIMING = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  stagger: 0.1,
  carousel: 4000, // 4 seconds
  hover: 0.15,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  email: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
  },
  firstName: {
    required: 'First name is required',
    minLength: 'First name must be at least 2 characters',
  },
  generic: {
    required: 'This field is required',
    serverError: 'Something went wrong. Please try again.',
    success: 'Thank you! We\'ll notify you when MindMuscle launches.',
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  waitlist: '/api/waitlist',
  contact: '/api/contact',
  newsletter: '/api/newsletter',
} as const;

// Meta Information
export const META_DEFAULTS = {
  title: 'MindMuscle | AI-Powered Fitness Revolution',
  description: 'Experience the future of fitness with AI-powered personalized workouts that adapt and evolve with every rep. Coming Summer 2025.',
  keywords: [
    'AI fitness',
    'personal trainer app',
    'workout app',
    'artificial intelligence',
    'fitness technology',
    'personalized training',
    'adaptive workouts',
    'progress tracking',
  ],
  ogImage: '/og-image.png',
  twitterHandle: '@mindmuscleapp',
} as const;

// Color Palette (for JavaScript usage)
export const COLORS = {
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#8b5cf6', // Main brand color
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  accent: {
    cyan: '#22d3ee',
    magenta: '#e11d48',
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#0a0a10', // Main dark background
  },
} as const; 