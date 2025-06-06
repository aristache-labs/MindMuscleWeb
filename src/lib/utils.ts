import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format email for validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Debounce function for performance
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Format numbers with commas
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Scroll to element with smooth behavior - enhanced for lazy-loaded content
export function scrollToElement(elementId: string, offset = 0): void {
  console.log(`Attempting to scroll to: ${elementId}`);
  
  const attemptScroll = (attempt = 1, maxAttempts = 5) => {
    const element = document.getElementById(elementId);
    
    if (element) {
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
      
      console.log(`Successfully scrolled to element: ${elementId}`);
      return;
    }
    
    // If element not found and we haven't reached max attempts, try again
    if (attempt < maxAttempts) {
      console.log(`Element "${elementId}" not found, attempt ${attempt}/${maxAttempts}. Retrying...`);
      setTimeout(() => attemptScroll(attempt + 1, maxAttempts), 200 * attempt);
      return;
    }
    
    // Final fallback after all attempts
    console.warn(`Element with id "${elementId}" not found after ${maxAttempts} attempts`);
    
    // Try scrollIntoView as last resort
    const fallbackElement = document.querySelector(`#${elementId}`);
    if (fallbackElement) {
      fallbackElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      console.log(`Fallback scroll successful for: ${elementId}`);
    } else {
      // Don't log error to console to avoid UI errors - just log as warning
      console.warn(`Unable to scroll to "${elementId}" - element may not exist or be loaded yet`);
      
      if (process.env.NODE_ENV === 'development') {
        const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
        console.log('Available element IDs:', allIds);
      }
    }
  };
  
  attemptScroll();
}

// Check if element is in viewport
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

// Get device info
export function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)/.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  const hasTouch = 'ontouchstart' in window;

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasTouch,
    userAgent,
  };
}

// Local storage helpers
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: unknown) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silent fail
    }
  },
  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  },
};

// Event tracking helper (placeholder for future analytics integration)
export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  // Future: Integrate with analytics service (PostHog, Plausible, etc.)
  // if (typeof window.plausible === 'function') {
  //   window.plausible(eventName, { props: properties });
  // }
  
  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Event:', eventName, properties);
  }
}

// Haptic feedback for supported devices
export function triggerHapticFeedback(intensity: 'light' | 'medium' | 'heavy' = 'light') {
  if ('vibrate' in navigator) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 50,
    };
    navigator.vibrate(patterns[intensity]);
  }
}

// Wait function for animations
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Preload images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Format date for display
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
} 