import { z } from 'zod';

// Email validation schema
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(100, 'Email is too long')
  .refine(
    (email) => {
      // Basic email pattern validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    {
      message: 'Please enter a valid email address',
    }
  )
  .refine(
    (email) => {
      // Block disposable email domains
      const disposableDomains = [
        '10minutemail.com',
        'temp-mail.org',
        'guerrillamail.com',
        'mailinator.com',
        'yopmail.com',
      ];
      const domain = email.split('@')[1]?.toLowerCase();
      return !disposableDomains.includes(domain);
    },
    {
      message: 'Please use a permanent email address',
    }
  );

// First name validation schema
export const firstNameSchema = z
  .string()
  .optional()
  .refine(
    (name) => {
      if (!name) return true; // Optional field
      return name.trim().length >= 2;
    },
    {
      message: 'First name must be at least 2 characters',
    }
  )
  .refine(
    (name) => {
      if (!name) return true; // Optional field
      return name.trim().length <= 50;
    },
    {
      message: 'First name is too long',
    }
  )
  .refine(
    (name) => {
      if (!name) return true; // Optional field
      // Only allow letters, spaces, hyphens, and apostrophes
      const namePattern = /^[a-zA-Z\s\-']+$/;
      return namePattern.test(name.trim());
    },
    {
      message: 'Please enter a valid first name',
    }
  );

// Interests validation schema
export const interestsSchema = z
  .array(z.string())
  .optional()
  .refine(
    (interests) => {
      if (!interests) return true;
      return interests.length <= 5;
    },
    {
      message: 'Please select up to 5 interests',
    }
  );

// Referral code validation schema
export const referralCodeSchema = z
  .string()
  .optional()
  .refine(
    (code) => {
      if (!code) return true; // Optional field
      // Referral codes should be 6 characters, alphanumeric
      const codePattern = /^[A-Z0-9]{6}$/;
      return codePattern.test(code.toUpperCase());
    },
    {
      message: 'Invalid referral code format',
    }
  );

// Main waitlist form schema
export const waitlistFormSchema = z.object({
  email: emailSchema,
  firstName: firstNameSchema,
  interests: interestsSchema,
  referralCode: referralCodeSchema,
  // Hidden fields for tracking
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

// Types derived from schemas
export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

// Validation error types
export interface FormErrors {
  email?: string;
  firstName?: string;
  interests?: string;
  referralCode?: string;
  general?: string;
}

// Interest options for the form
export const INTEREST_OPTIONS = [
  { id: 'ai-workouts', label: 'AI-Powered Workouts', icon: '🤖' },
  { id: 'strength-training', label: 'Strength Training', icon: '💪' },
  { id: 'cardio-fitness', label: 'Cardio & Fitness', icon: '❤️' },
  { id: 'nutrition-tracking', label: 'Nutrition Tracking', icon: '🥗' },
  { id: 'mindful-workouts', label: 'Mindful Workouts', icon: '🧘' },
  { id: 'community', label: 'Community Features', icon: '👥' },
  { id: 'wearable-integration', label: 'Wearable Integration', icon: '⌚' },
  { id: 'personal-coaching', label: 'Personal Coaching', icon: '🎯' },
  { id: 'habit-building', label: 'Habit Building', icon: '⚡' },
] as const;

// Utility function to sanitize form data
export const sanitizeFormData = (data: WaitlistFormData): WaitlistFormData => {
  return {
    ...data,
    email: data.email.trim().toLowerCase(),
    firstName: data.firstName?.trim(),
    referralCode: data.referralCode?.trim().toUpperCase(),
  };
};

// Utility function to validate referral code format
export const isValidReferralCode = (code: string): boolean => {
  const codePattern = /^[A-Z0-9]{6}$/;
  return codePattern.test(code.toUpperCase());
};

// Utility function to extract UTM parameters from URL
export const extractUTMParams = (url: string) => {
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
  };
};

// Early Access Tiers Configuration
export const EARLY_ACCESS_TIERS = [
  {
    id: 'standard',
    name: 'Standard',
    minReferrals: 0,
    minPoints: 0,
    benefits: ['Email updates', 'Launch announcement'],
    priority: 1,
    color: 'gray',
    icon: '👤',
  },
  {
    id: 'enthusiast',
    name: 'Enthusiast',
    minReferrals: 1,
    minPoints: 100,
    benefits: ['Standard benefits', '48h early access', 'Beta features preview'],
    priority: 2,
    color: 'blue',
    icon: '⭐',
  },
  {
    id: 'vip',
    name: 'VIP',
    minReferrals: 3,
    minPoints: 300,
    benefits: ['Enthusiast benefits', '1 week early access', 'Exclusive content', 'Priority support'],
    priority: 3,
    color: 'purple',
    icon: '💎',
  },
  {
    id: 'beta',
    name: 'Beta Tester',
    minReferrals: 5,
    minPoints: 500,
    benefits: ['VIP benefits', '2 weeks early access', 'Direct feedback channel', 'Beta testing rewards'],
    priority: 4,
    color: 'emerald',
    icon: '🧪',
  },
  {
    id: 'founder',
    name: 'Founder',
    minReferrals: 10,
    minPoints: 1000,
    benefits: ['Beta benefits', '1 month early access', 'Founder badge', 'Lifetime premium features', 'Advisory board invitation'],
    priority: 5,
    color: 'gold',
    icon: '👑',
  },
] as const;

// Social Sharing Incentives
export const SOCIAL_INCENTIVES = [
  {
    platform: 'twitter',
    message: '🚀 Just joined the @MindMuscleApp waitlist! Can\'t wait to experience AI-powered personalized fitness. Join me and let\'s revolutionize our fitness journey together!',
    url: 'https://mindmuscle.app',
    hashtags: ['#MindMuscle', '#AIFitness', '#PersonalizedWorkouts', '#FitnessRevolution'],
    pointsReward: 50,
    positionBoost: 5,
  },
  {
    platform: 'facebook',
    message: 'Excited to join the MindMuscle waitlist! 🎯 This AI-powered fitness app is going to change how we work out. Join me for early access!',
    url: 'https://mindmuscle.app',
    hashtags: ['MindMuscle', 'AIFitness', 'FitnessApp'],
    pointsReward: 30,
    positionBoost: 3,
  },
  {
    platform: 'linkedin',
    message: 'Thrilled to be on the MindMuscle waitlist! As someone passionate about fitness and technology, I\'m excited to see how AI can personalize our workout experiences. Check it out!',
    url: 'https://mindmuscle.app',
    hashtags: ['AIFitness', 'HealthTech', 'PersonalizedFitness'],
    pointsReward: 40,
    positionBoost: 4,
  },
  {
    platform: 'whatsapp',
    message: 'Hey! I just joined the MindMuscle waitlist for their new AI fitness app. Want to join me? Here\'s the link:',
    url: 'https://mindmuscle.app',
    hashtags: [],
    pointsReward: 25,
    positionBoost: 2,
  },
  {
    platform: 'email',
    message: 'I wanted to share something exciting with you - I just joined the MindMuscle waitlist for their revolutionary AI-powered fitness app. I thought you might be interested too!',
    url: 'https://mindmuscle.app',
    hashtags: [],
    pointsReward: 35,
    positionBoost: 3,
  },
] as const;

// Points System Configuration
export const POINTS_CONFIG = {
  REFERRAL_SIGNUP: 100, // Points for each successful referral
  SOCIAL_SHARE_BASE: 25, // Base points for sharing
  FORM_COMPLETION: 50, // Bonus for completing full profile
  DAILY_CHECK_IN: 5, // Points for checking waitlist status
  MILESTONE_BONUS: 200, // Bonus points for reaching milestones
  TIER_UPGRADE_BONUS: 500, // Bonus for tier upgrades
} as const;

// Utility functions for points and tiers
export const calculateUserTier = (referrals: number, points: number) => {
  return EARLY_ACCESS_TIERS
    .slice()
    .reverse()
    .find(tier => referrals >= tier.minReferrals && points >= tier.minPoints) 
    || EARLY_ACCESS_TIERS[0];
};

export const getNextTier = (currentTier: typeof EARLY_ACCESS_TIERS[number]) => {
  const currentIndex = EARLY_ACCESS_TIERS.findIndex(tier => tier.id === currentTier.id);
  return currentIndex < EARLY_ACCESS_TIERS.length - 1 ? EARLY_ACCESS_TIERS[currentIndex + 1] : null;
};

export const calculateProgressToNextTier = (referrals: number, points: number, currentTier: typeof EARLY_ACCESS_TIERS[number]) => {
  const nextTier = getNextTier(currentTier);
  if (!nextTier) return 100; // Already at max tier
  
  const referralProgress = Math.min((referrals / nextTier.minReferrals) * 100, 100);
  const pointsProgress = Math.min((points / nextTier.minPoints) * 100, 100);
  
  return Math.min(referralProgress, pointsProgress);
};

export const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  if (local.length <= 2) return email;
  
  const maskedLocal = local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}; 