// Animation types
export interface LottieAnimation {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  loop?: boolean;
}

// Navigation types
export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

// Feature types
export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  animation?: LottieAnimation;
}

// Step types for How It Works section
export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  animation?: LottieAnimation;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

// App screenshot types
export interface AppScreenshot {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

// Form types
export interface WaitlistFormData {
  email: string;
  firstName?: string;
  interests?: string[];
}

export interface FormError {
  field: string;
  message: string;
}

// Animation variants for Framer Motion
export interface MotionVariants {
  initial: object;
  animate: object;
  exit?: object;
  transition?: object;
}

// Carousel types
export interface CarouselOptions {
  loop?: boolean;
  autoplay?: boolean;
  delay?: number;
  align?: 'start' | 'center' | 'end';
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  success?: boolean;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Device detection
export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasTouch: boolean;
  userAgent: string;
}

// Theme types
export interface ThemeColors {
  primary: Record<string, string>;
  accent: Record<string, string>;
  dark: Record<string, string>;
}

export interface Theme {
  colors: ThemeColors;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

// Demographics
export interface Demographics {
  age?: number;
  gender?: string;
  location?: string;
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export type { DemoItem } from './demo'; 