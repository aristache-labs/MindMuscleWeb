'use client';

import React from 'react';

// Custom SVG Icon Props Interface
interface IconProps {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

// AI Brain Icon - Advanced neural network design
export const AIBrainIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Brain outline */}
    <path
      d="M9.5 2C7.5 2 6 3.5 6 5.5C4.5 5.5 3 7 3 8.5C3 10 4.5 11.5 6 11.5V13C6 15.5 8 17.5 10.5 17.5C11.5 17.5 12.5 17 13 16.5C13.5 17 14.5 17.5 15.5 17.5C18 17.5 20 15.5 20 13V11.5C21.5 11.5 23 10 23 8.5C23 7 21.5 5.5 20 5.5C20 3.5 18.5 2 16.5 2C15.5 2 14.5 2.5 14 3C13.5 2.5 12.5 2 11.5 2H9.5Z"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
    {/* Neural network connections */}
    <circle cx="9" cy="7" r="1.5" fill={color} opacity="0.8" />
    <circle cx="15" cy="7" r="1.5" fill={color} opacity="0.8" />
    <circle cx="12" cy="10" r="1.5" fill={color} opacity="0.8" />
    <circle cx="8" cy="13" r="1.5" fill={color} opacity="0.6" />
    <circle cx="16" cy="13" r="1.5" fill={color} opacity="0.6" />
    
    {/* Connection lines */}
    <path
      d="M9 7L12 10M15 7L12 10M12 10L8 13M12 10L16 13"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      opacity="0.6"
    />
    
    {/* AI circuit patterns */}
    <path
      d="M10 5H11M13 5H14M7 9H8M16 9H17M10 15H14"
      stroke={color}
      strokeWidth={strokeWidth}
      opacity="0.4"
    />
  </svg>
);

// Smart Dumbbell Icon - AI-enhanced fitness equipment
export const SmartDumbbellIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Dumbbell structure */}
    <rect x="2" y="8" width="4" height="8" rx="2" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <rect x="18" y="8" width="4" height="8" rx="2" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <rect x="6" y="11" width="12" height="2" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" />
    
    {/* AI sensors/indicators */}
    <circle cx="4" cy="10" r="0.5" fill={color} />
    <circle cx="4" cy="14" r="0.5" fill={color} />
    <circle cx="20" cy="10" r="0.5" fill={color} />
    <circle cx="20" cy="14" r="0.5" fill={color} />
    
    {/* Smart display */}
    <rect x="10" y="9.5" width="4" height="5" rx="0.5" stroke={color} strokeWidth={strokeWidth * 0.8} fill="none" />
    <path d="M11 11H13M11 12.5H13" stroke={color} strokeWidth={strokeWidth * 0.6} />
    
    {/* Signal waves */}
    <path
      d="M7 6C8.5 6.5 9.5 7.5 10 9M7 18C8.5 17.5 9.5 16.5 10 15M17 6C15.5 6.5 14.5 7.5 14 9M17 18C15.5 17.5 14.5 16.5 14 15"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      opacity="0.6"
    />
  </svg>
);

// AI Analytics Icon - Data visualization with AI
export const AIAnalyticsIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Chart bars */}
    <rect x="3" y="12" width="3" height="8" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <rect x="8" y="8" width="3" height="12" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <rect x="13" y="4" width="3" height="16" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <rect x="18" y="10" width="3" height="10" rx="1" stroke={color} strokeWidth={strokeWidth} fill="none" />
    
    {/* AI trend line */}
    <path
      d="M4.5 15L9.5 11L14.5 7L19.5 13"
      stroke={color}
      strokeWidth={strokeWidth}
      opacity="0.8"
      strokeDasharray="2 2"
    />
    
    {/* AI neural nodes */}
    <circle cx="4.5" cy="15" r="1" fill={color} />
    <circle cx="9.5" cy="11" r="1" fill={color} />
    <circle cx="14.5" cy="7" r="1" fill={color} />
    <circle cx="19.5" cy="13" r="1" fill={color} />
    
    {/* AI brain symbol in corner */}
    <g transform="translate(2,2) scale(0.3)">
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth={strokeWidth * 2} fill="none" opacity="0.6" />
      <path d="M6 6L10 10M10 6L6 10" stroke={color} strokeWidth={strokeWidth * 2} opacity="0.6" />
    </g>
  </svg>
);

// AI Target Icon - Smart goal tracking
export const AITargetIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Target circles */}
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth={strokeWidth} fill={color} />
    
    {/* AI crosshairs with smart indicators */}
    <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke={color} strokeWidth={strokeWidth} />
    
    {/* Smart sensors */}
    <circle cx="12" cy="4" r="1" fill={color} opacity="0.8" />
    <circle cx="12" cy="20" r="1" fill={color} opacity="0.8" />
    <circle cx="4" cy="12" r="1" fill={color} opacity="0.8" />
    <circle cx="20" cy="12" r="1" fill={color} opacity="0.8" />
    
    {/* AI processing indicator */}
    <path
      d="M8 8L10 10M16 8L14 10M8 16L10 14M16 16L14 14"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      opacity="0.6"
    />
  </svg>
);

// AI Sparkles Icon - Enhanced magic/AI effect
export const AISparklesIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Main AI star */}
    <path
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      fill={color}
      opacity="0.8"
    />
    
    {/* Circuit pattern sparkles */}
    <path
      d="M6 4L6.5 6L8 6.5L6.5 7L6 9L5.5 7L4 6.5L5.5 6L6 4Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      fill={color}
      opacity="0.6"
    />
    
    <path
      d="M18 15L18.5 17L20 17.5L18.5 18L18 20L17.5 18L16 17.5L17.5 17L18 15Z"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      fill={color}
      opacity="0.6"
    />
    
    {/* Small neural dots */}
    <circle cx="20" cy="4" r="1" fill={color} opacity="0.7" />
    <circle cx="4" cy="20" r="1" fill={color} opacity="0.7" />
    <circle cx="21" cy="8" r="0.5" fill={color} opacity="0.5" />
    <circle cx="3" cy="16" r="0.5" fill={color} opacity="0.5" />
    
    {/* AI connection lines */}
    <path
      d="M8 3L9 4M15 20L16 21M3 8L4 9M20 15L21 16"
      stroke={color}
      strokeWidth={strokeWidth * 0.6}
      opacity="0.4"
    />
  </svg>
);

// AI Users/Community Icon - Connected users with AI
export const AICommunityIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* User avatars */}
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} fill="none" />
    <circle cx="15" cy="9" r="3" stroke={color} strokeWidth={strokeWidth} fill="none" />
    
    {/* User bodies */}
    <path
      d="M3 20C3 16 6 14 9 14C12 14 15 16 15 20"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
    <path
      d="M12 22C12 19 14 17 15 17C16 17 18 19 18 22"
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
    
    {/* AI connection network */}
    <circle cx="9" cy="5" r="0.5" fill={color} opacity="0.8" />
    <circle cx="15" cy="7" r="0.5" fill={color} opacity="0.8" />
    <circle cx="20" cy="4" r="0.5" fill={color} opacity="0.6" />
    <circle cx="4" cy="4" r="0.5" fill={color} opacity="0.6" />
    
    {/* Network connections */}
    <path
      d="M9 5L15 7M15 7L20 4M9 5L4 4M20 4L15 7"
      stroke={color}
      strokeWidth={strokeWidth * 0.6}
      opacity="0.4"
      strokeDasharray="1 1"
    />
    
    {/* AI indicator */}
    <rect x="19" y="2" width="3" height="3" rx="0.5" stroke={color} strokeWidth={strokeWidth * 0.8} fill="none" />
    <path d="M20 3H21" stroke={color} strokeWidth={strokeWidth * 0.6} />
  </svg>
);

// AI Lightning/Power Icon - Enhanced energy representation
export const AIPowerIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Lightning bolt */}
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      fill={color}
      opacity="0.8"
    />
    
    {/* Energy field */}
    <path
      d="M6 6C8 7 10 8 12 10M18 18C16 17 14 16 12 14"
      stroke={color}
      strokeWidth={strokeWidth * 0.8}
      opacity="0.6"
      strokeDasharray="2 2"
    />
    
    {/* Power indicators */}
    <circle cx="7" cy="8" r="0.5" fill={color} opacity="0.7" />
    <circle cx="17" cy="16" r="0.5" fill={color} opacity="0.7" />
    <circle cx="5" cy="12" r="0.5" fill={color} opacity="0.5" />
    <circle cx="19" cy="12" r="0.5" fill={color} opacity="0.5" />
  </svg>
);

// AI Download Icon - Smart download with AI processing
export const AIDownloadIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Download arrow */}
    <path d="M12 3V16M12 16L16 12M12 16L8 12" stroke={color} strokeWidth={strokeWidth} fill="none" />
    
    {/* Base platform */}
    <path d="M4 19H20" stroke={color} strokeWidth={strokeWidth} />
    
    {/* AI processing indicators */}
    <circle cx="9" cy="6" r="0.5" fill={color} opacity="0.8" />
    <circle cx="15" cy="6" r="0.5" fill={color} opacity="0.8" />
    <circle cx="9" cy="9" r="0.5" fill={color} opacity="0.6" />
    <circle cx="15" cy="9" r="0.5" fill={color} opacity="0.6" />
    
    {/* Smart connection lines */}
    <path
      d="M9 6L15 6M9 9L15 9"
      stroke={color}
      strokeWidth={strokeWidth * 0.6}
      opacity="0.4"
    />
    
    {/* Progress indicator */}
    <rect x="6" y="21" width="12" height="1" rx="0.5" fill={color} opacity="0.6" />
  </svg>
);

// Export all icons for easy import
export const CustomIcons = {
  AIBrain: AIBrainIcon,
  SmartDumbbell: SmartDumbbellIcon,
  AIAnalytics: AIAnalyticsIcon,
  AITarget: AITargetIcon,
  AISparkles: AISparklesIcon,
  AICommunity: AICommunityIcon,
  AIPower: AIPowerIcon,
  AIDownload: AIDownloadIcon,
};

export default CustomIcons; 