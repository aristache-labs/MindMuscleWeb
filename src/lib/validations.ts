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
  { id: 'progress-analytics', label: 'Progress Analytics', icon: '📊' },
  { id: 'community-features', label: 'Community Features', icon: '👥' },
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