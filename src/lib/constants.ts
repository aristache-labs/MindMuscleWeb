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

// App Screenshots for Showcase - Using placeholder gradients for now
export const APP_SCREENSHOTS: AppScreenshot[] = [
  {
    id: 'dashboard',
    title: 'AI Dashboard',
    description: 'Your personalized fitness command center powered by AI insights.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDMwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzIyRDNFRSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MSkiLz4KPHJlY3QgeD0iNTAiIHk9IjEwMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMSIgcng9IjIwIi8+CjxyZWN0IHg9IjUwIiB5PSIzNTAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjEiIHJ4PSIyMCIvPgo8L3N2Zz4=',
    alt: 'MindMuscle AI Dashboard Screenshot',
  },
  {
    id: 'workout-plan',
    title: 'Custom Workouts',
    description: 'AI-generated workout plans that adapt to your progress and preferences.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDMwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MiIgeDE9IjAuNSIgeTE9IjAiIHgyPSIwLjUiIHkyPSIxIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzIyRDNFRSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNFMTFENDgiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkaWVudDIpIi8+CjxyZWN0IHg9IjMwIiB5PSI4MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSI4MCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4xIiByeD0iMTUiLz4KPHJlY3QgeD0iMzAiIHk9IjIwMCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMSIgcng9IjE1Ii8+Cjwvc3ZnPg==',
    alt: 'MindMuscle Workout Plan Screenshot',
  },
  {
    id: 'progress-tracking',
    title: 'Progress Tracking',
    description: 'Visual progress insights and detailed metrics to keep you motivated.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDMwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWRpZW50MyIgY3g9IjAuNSIgY3k9IjAuNSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4QjVDRjYiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNFMTFENDgiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMjJEM0VFIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InVybCgjZ3JhZGllbnQzKSIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIyMDAiIHI9IjgwIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjEiLz4KPHJlY3QgeD0iNTAiIHk9IjM1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMSIgcng9IjIwIi8+Cjwvc3ZnPg==',
    alt: 'MindMuscle Progress Tracking Screenshot',
  },
  {
    id: 'community',
    title: 'Community Hub',
    description: 'Connect with fellow fitness enthusiasts and join exciting challenges.',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDMwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50NCIgeDE9IjAiIHkxPSIwLjUiIHgyPSIxIiB5Mj0iMC41Ij4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI0UxMUQ0OCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4QjVDRjYiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0idXJsKCNncmFkaWVudDQpIi8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iMTQwIiByPSI0MCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4xIi8+CjxjaXJjbGUgY3g9IjI0MCIgY3k9IjE0MCIgcj0iNDAiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMSIvPgo8cmVjdCB4PSI1MCIgeT0iMzAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4xIiByeD0iMjAiLz4KPC9zdmc+',
    alt: 'MindMuscle Community Screenshot',
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