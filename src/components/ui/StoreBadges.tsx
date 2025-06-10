'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { STORE_LINKS } from '@/lib/constants';

interface StoreBadgeProps {
  className?: string;
  onClick?: () => void;
}

// Official Apple App Store Badge Component
export const AppStoreBadge: React.FC<StoreBadgeProps> = ({ className = '', onClick }) => {
  return (
    <motion.a
      href={STORE_LINKS.appStore}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download MindMuscle app on the App Store"
      className={`inline-block transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] group hover:brightness-110 ${className}`}
      onClick={(e) => {
        if (onClick) {
          onClick();
        }
      }}
      whileHover={{ 
        scale: 1.05,
        filter: "brightness(1.15) saturate(1.1)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width="180"
        height="54"
        viewBox="0 0 180 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-auto md:h-14 lg:h-16 drop-shadow-lg group-hover:drop-shadow-2xl group-hover:filter group-hover:brightness-110 transition-all duration-300"
      >
        {/* Background with attractive gradient and effects */}
        <defs>
          <linearGradient id="appStoreBg-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D3748"/>
            <stop offset="50%" stopColor="#1A202C"/>
            <stop offset="100%" stopColor="#171923"/>
          </linearGradient>
          <filter id="appStoreShadow-unique" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#667EEA" floodOpacity="0.3"/>
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.4"/>
          </filter>
          <filter id="appStoreGlow-unique" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="180" height="54" rx="8" fill="url(#appStoreBg-unique)" stroke="url(#appStoreBorder-unique)" strokeWidth="1" filter="url(#appStoreShadow-unique)"/>
        
        {/* Subtle inner glow */}
        <rect x="1" y="1" width="178" height="52" rx="7" fill="none" stroke="rgba(102, 126, 234, 0.3)" strokeWidth="0.5"/>
        
        {/* Border gradient */}
        <defs>
          <linearGradient id="appStoreBorder-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667EEA"/>
            <stop offset="50%" stopColor="#764BA2"/>
            <stop offset="100%" stopColor="#667EEA"/>
          </linearGradient>
        </defs>
        
        {/* Apple Logo - Enhanced and positioned better */}
        <g transform="translate(15, 8)">
          <path
            d="M20.769 25.3a6.95 6.95 0 013.356-5.851 7.066 7.066 0 00-5.59-3.058c-2.38-.246-4.708 1.405-5.914 1.405-1.232 0-3.11-1.383-5.123-1.341a7.515 7.515 0 00-6.343 3.848c-2.744 4.687-.697 11.677 1.929 15.496 1.317 1.855 2.87 3.927 4.912 3.854 1.967-.082 2.707-1.239 5.082-1.239 2.354 0 3.046 1.239 5.099 1.193 2.117-.035 3.446-1.864 4.72-3.738a15.347 15.347 0 002.156-4.329 6.695 6.695 0 01-4.148-6.148zm-3.785-11.016c1.08-1.291 1.806-3.045 1.608-4.816-1.561.066-3.462 1.025-4.604 2.289-.996 1.131-1.871 2.934-1.635 4.656 1.73.133 3.519-.868 4.615-2.128z"
            fill="white"
          />
        </g>
        
        {/* Download on the text - Enhanced */}
        <text x="58" y="20" fill="white" fontSize="11" fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" opacity="0.9">
          Download on the
        </text>
        
        {/* App Store text - Enhanced */}
        <text x="58" y="38" fill="white" fontSize="18" fontFamily="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" fontWeight="600">
          App Store
        </text>
      </svg>
    </motion.a>
  );
};

// Official Google Play Store Badge Component
export const GooglePlayBadge: React.FC<StoreBadgeProps> = ({ className = '', onClick }) => {
  return (
    <motion.a
      href={STORE_LINKS.playStore}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download MindMuscle app on Google Play"
      className={`inline-block transition-all duration-300 hover:scale-[1.05] active:scale-[0.95] group hover:brightness-110 ${className}`}
      onClick={(e) => {
        if (onClick) {
          onClick();
        }
      }}
      whileHover={{ 
        scale: 1.05,
        filter: "brightness(1.15) saturate(1.1)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width="180"
        height="54"
        viewBox="0 0 180 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-auto md:h-14 lg:h-16 drop-shadow-lg group-hover:drop-shadow-2xl group-hover:filter group-hover:brightness-110 transition-all duration-300"
      >
        <defs>
          {/* Background gradient - Enhanced */}
          <linearGradient id="playStoreBg-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D3748"/>
            <stop offset="50%" stopColor="#1A202C"/>
            <stop offset="100%" stopColor="#171923"/>
          </linearGradient>
          {/* Border gradient */}
          <linearGradient id="playStoreBorder-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399"/>
            <stop offset="25%" stopColor="#F59E0B"/>
            <stop offset="50%" stopColor="#EF4444"/>
            <stop offset="75%" stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#34D399"/>
          </linearGradient>
          {/* Play store gradients - Enhanced and more vibrant */}
          <linearGradient id="playGradient1-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981"/>
            <stop offset="100%" stopColor="#06B6D4"/>
          </linearGradient>
          <linearGradient id="playGradient2-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B"/>
            <stop offset="100%" stopColor="#EF4444"/>
          </linearGradient>
          <linearGradient id="playGradient3-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B"/>
            <stop offset="100%" stopColor="#F97316"/>
          </linearGradient>
          <linearGradient id="playGradient4-unique" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
          <filter id="playStoreShadow-unique" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#34D399" floodOpacity="0.3"/>
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.4"/>
          </filter>
        </defs>
        
        {/* Background */}
        <rect width="180" height="54" rx="8" fill="url(#playStoreBg-unique)" stroke="url(#playStoreBorder-unique)" strokeWidth="1" filter="url(#playStoreShadow-unique)"/>
        
        {/* Subtle inner glow */}
        <rect x="1" y="1" width="178" height="52" rx="7" fill="none" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="0.5"/>
        
        {/* Google Play Logo - Enhanced and positioned better */}
        <g transform="translate(15, 12)">
          {/* Play icon triangle parts - Larger and more vibrant */}
          <path d="M6 4l12 7-12 7V4z" fill="url(#playGradient1-unique)"/>
          <path d="M6 4l12 7-3.5 2L6 8V4z" fill="url(#playGradient2-unique)"/>
          <path d="M6 18l8.5-5L18 15l-12 7v-4z" fill="url(#playGradient3-unique)"/>
          <path d="M6 18V14l8.5-5L18 11L6 18z" fill="url(#playGradient4-unique)"/>
        </g>
        
        {/* GET IT ON text - Enhanced */}
        <text x="46" y="19" fill="white" fontSize="10" fontFamily="Google Sans, Roboto, Arial, sans-serif" opacity="0.9">
          GET IT ON
        </text>
        
        {/* Google Play text - Enhanced */}
        <text x="46" y="37" fill="white" fontSize="17" fontFamily="Google Sans, Roboto, Arial, sans-serif" fontWeight="500">
          Google Play
        </text>
      </svg>
    </motion.a>
  );
};

// Store Badges Container Component
interface StoreBadgesProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  appStoreFirst?: boolean;
  size?: 'default' | 'large';
  onAppStoreClick?: () => void;
  onGooglePlayClick?: () => void;
}

export const StoreBadges: React.FC<StoreBadgesProps> = ({ 
  className = '', 
  direction = 'horizontal',
  appStoreFirst = true,
  size = 'default',
  onAppStoreClick,
  onGooglePlayClick
}) => {
  // Improved responsive layout logic
  const containerClass = direction === 'vertical' 
    ? 'flex flex-col gap-3 items-center sm:items-start' 
    : 'flex flex-col gap-4 items-center sm:flex-row sm:gap-6 lg:gap-8';
  
  // Size variants for different contexts
  const sizeClass = size === 'large' ? 'scale-110' : '';
  
  const badges = appStoreFirst ? [
    <AppStoreBadge key="app-store" className={sizeClass} onClick={onAppStoreClick} />,
    <GooglePlayBadge key="google-play" className={sizeClass} onClick={onGooglePlayClick} />
  ] : [
    <GooglePlayBadge key="google-play" className={sizeClass} onClick={onGooglePlayClick} />,
    <AppStoreBadge key="app-store" className={sizeClass} onClick={onAppStoreClick} />
  ];

  return (
    <motion.div 
      className={`${containerClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.2,
        staggerChildren: 0.1 
      }}
    >
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.4, 
            delay: 0.3 + (index * 0.1),
            ease: "easeOut"
          }}
        >
          {badge}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StoreBadges; 