'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Mail, 
  User, 
  Gift, 
  Check, 
  X, 
  Loader2, 
  Share2, 
  Copy,
  Users,
  Trophy,
  Sparkles
} from 'lucide-react';
import { cn, trackEvent } from '@/lib/utils';
import { 
  waitlistFormSchema, 
  WaitlistFormData, 
  INTEREST_OPTIONS,
  extractUTMParams
} from '@/lib/validations';

interface WaitlistFormProps {
  className?: string;
  onSuccess?: (data: any) => void;
  referralCode?: string;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  successData: any;
}

interface ReferralValidation {
  isValidating: boolean;
  isValid: boolean;
  referrerName: string;
  error: string;
}

export function WaitlistForm({ className, onSuccess, referralCode }: WaitlistFormProps) {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    successData: null,
  });

  const [referralValidation, setReferralValidation] = useState<ReferralValidation>({
    isValidating: false,
    isValid: false,
    referrerName: '',
    error: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copiedReferral, setCopiedReferral] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      interests: [],
      referralCode: referralCode || '',
    },
  });

  const watchedReferralCode = watch('referralCode');

  // Validate referral code when it changes
  useEffect(() => {
    if (watchedReferralCode && watchedReferralCode.length === 6) {
      validateReferralCode(watchedReferralCode);
    } else {
      setReferralValidation(prev => ({ ...prev, isValid: false, error: '' }));
    }
  }, [watchedReferralCode]);

  // Set referral code from URL parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');
      if (refCode && !referralCode) {
        setValue('referralCode', refCode.toUpperCase());
      }
    }
  }, [referralCode, setValue]);

  const validateReferralCode = async (code: string) => {
    setReferralValidation(prev => ({ ...prev, isValidating: true, error: '' }));
    
    try {
      const response = await fetch(`/api/waitlist?referral=${code.toUpperCase()}`);
      const data = await response.json();
      
      setReferralValidation({
        isValidating: false,
        isValid: data.valid,
        referrerName: data.referrer || '',
        error: data.valid ? '' : 'Invalid referral code',
      });
    } catch (error) {
      setReferralValidation({
        isValidating: false,
        isValid: false,
        referrerName: '',
        error: 'Unable to validate code',
      });
    }
  };

  const onSubmit = async (data: WaitlistFormData) => {
    setFormState(prev => ({ ...prev, isSubmitting: true, isError: false }));
    
    trackEvent('waitlist_form_submit', {
      has_first_name: !!data.firstName,
      interests_count: data.interests?.length || 0,
      has_referral: !!data.referralCode,
      utm_source: data.utmSource,
    });

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setFormState({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          errorMessage: '',
          successData: result.data,
        });
        
        trackEvent('waitlist_form_success', {
          position: result.data.position,
          referral_code: result.data.referralCode,
        });
        
        onSuccess?.(result.data);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage,
        successData: null,
      });
      
      trackEvent('waitlist_form_error', {
        error: errorMessage,
      });
    }
  };

  const copyReferralLink = async () => {
    if (!formState.successData?.referralCode) return;
    
    const referralUrl = `${window.location.origin}?ref=${formState.successData.referralCode}`;
    
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopiedReferral(true);
      setTimeout(() => setCopiedReferral(false), 2000);
      
      trackEvent('referral_link_copied', {
        referral_code: formState.successData.referralCode,
      });
    } catch (error) {
      console.error('Failed to copy referral link:', error);
    }
  };

  const shareReferral = () => {
    if (!formState.successData?.referralCode) return;
    
    const referralUrl = `${window.location.origin}?ref=${formState.successData.referralCode}`;
    const text = `Check out MindMuscle - the AI-powered fitness app that's revolutionizing workouts! Join the waitlist with my referral link:`;
    
    if (navigator.share) {
      navigator.share({
        title: 'MindMuscle - AI Fitness Revolution',
        text,
        url: referralUrl,
      });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralUrl)}`);
    }
    
    trackEvent('referral_link_shared', {
      referral_code: formState.successData.referralCode,
    });
  };

  const resetForm = () => {
    setFormState({
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      errorMessage: '',
      successData: null,
    });
    reset();
  };

  if (formState.isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'max-w-md mx-auto bg-dark-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center',
          className
        )}
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400"
        >
          <Check className="h-8 w-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            Welcome to the Future! 🚀
          </h3>
          <p className="text-gray-300 mb-6">
            You're {formState.successData?.position ? `#${formState.successData.position}` : 'now'} on the MindMuscle waitlist!
          </p>
        </motion.div>

        {/* Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 border border-primary-500/20 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Gift className="h-5 w-5 text-primary-400" />
            <span className="font-semibold text-white">Earn Early Access</span>
          </div>
          
          <p className="text-sm text-gray-300 mb-4">
            Share your referral code and move up the waitlist faster!
          </p>
          
          <div className="bg-dark-900/50 rounded-lg p-3 mb-4">
            <div className="text-xs text-gray-400 mb-1">Your Referral Code</div>
            <div className="text-xl font-mono font-bold text-primary-400">
              {formState.successData?.referralCode}
            </div>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              onClick={copyReferralLink}
              className="flex-1 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {copiedReferral ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </motion.button>
            
            <motion.button
              onClick={shareReferral}
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="h-4 w-4" />
              Share
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="text-center">
            <div className="text-xl font-bold text-white">3</div>
            <div className="text-xs text-gray-400">Referrals = VIP</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">5</div>
            <div className="text-xs text-gray-400">Referrals = Beta</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-white">10</div>
            <div className="text-xs text-gray-400">Referrals = Founder</div>
          </div>
        </motion.div>

        <motion.button
          onClick={resetForm}
          className="text-sm text-gray-400 hover:text-white transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Join another email →
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('max-w-md mx-auto', className)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Referral Code Display */}
        <AnimatePresence>
          {referralValidation.isValid && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-green-400">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Referred by {referralValidation.referrerName}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Email Field */}
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  {...field}
                  type="email"
                  placeholder="Enter your email address"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
                    errors.email 
                      ? 'border-red-500/50 focus:border-red-500' 
                      : 'border-gray-700/50 hover:border-gray-600/50 focus:border-primary-500'
                  )}
                />
              </div>
            )}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-400 flex items-center gap-1"
              >
                <X className="h-3 w-3" />
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Show Advanced Fields Toggle */}
        <motion.button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
          whileHover={{ x: 2 }}
        >
          <Sparkles className="h-3 w-3" />
          {showAdvanced ? 'Hide' : 'Show'} optional fields
        </motion.button>

        {/* Advanced Fields */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* First Name */}
              <div className="space-y-2">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        {...field}
                        type="text"
                        placeholder="First name (optional)"
                        className={cn(
                          'w-full pl-10 pr-4 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
                          errors.firstName 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : 'border-gray-700/50 hover:border-gray-600/50 focus:border-primary-500'
                        )}
                      />
                    </div>
                  )}
                />
                <AnimatePresence>
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-400 flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      {errors.firstName.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Interests */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">
                  What interests you most? (Select up to 5)
                </label>
                <Controller
                  name="interests"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                      {INTEREST_OPTIONS.map((interest) => {
                        const isSelected = field.value?.includes(interest.id) || false;
                        return (
                          <motion.button
                            key={interest.id}
                            type="button"
                            onClick={() => {
                              const current = field.value || [];
                              if (isSelected) {
                                field.onChange(current.filter(id => id !== interest.id));
                              } else if (current.length < 5) {
                                field.onChange([...current, interest.id]);
                              }
                            }}
                            className={cn(
                              'p-3 rounded-lg border text-left transition-all duration-200',
                              isSelected
                                ? 'bg-primary-500/20 border-primary-500/50 text-primary-300'
                                : 'bg-dark-800/30 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{interest.icon}</span>
                              <span className="text-xs font-medium">{interest.label}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                />
              </div>

              {/* Referral Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Referral Code (optional)
                </label>
                <Controller
                  name="referralCode"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Gift className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter 6-character code"
                        maxLength={6}
                        className={cn(
                          'w-full pl-10 pr-12 py-3 bg-dark-800/50 border rounded-lg text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 uppercase font-mono',
                          errors.referralCode 
                            ? 'border-red-500/50 focus:border-red-500' 
                            : referralValidation.isValid
                            ? 'border-green-500/50 focus:border-green-500'
                            : 'border-gray-700/50 hover:border-gray-600/50 focus:border-primary-500'
                        )}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                      {/* Validation Status */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {referralValidation.isValidating && (
                          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        )}
                        {!referralValidation.isValidating && referralValidation.isValid && (
                          <Check className="h-4 w-4 text-green-400" />
                        )}
                        {!referralValidation.isValidating && field.value && !referralValidation.isValid && referralValidation.error && (
                          <X className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                    </div>
                  )}
                />
                <AnimatePresence>
                  {errors.referralCode && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-400 flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      {errors.referralCode.message}
                    </motion.p>
                  )}
                  {!errors.referralCode && referralValidation.error && watchedReferralCode && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-red-400 flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      {referralValidation.error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {formState.isError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-red-400">
                <X className="h-4 w-4" />
                <span className="text-sm font-medium">{formState.errorMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={formState.isSubmitting}
          className={cn(
            'w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2',
            formState.isSubmitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:shadow-lg hover:shadow-primary-500/25'
          )}
          whileHover={!formState.isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!formState.isSubmitting ? { scale: 0.98 } : {}}
        >
          {formState.isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Joining Waitlist...
            </>
          ) : (
            <>
              <Trophy className="h-5 w-5" />
              Join the Revolution
            </>
          )}
        </motion.button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-400 text-center">
          By joining, you agree to receive launch updates. We respect your privacy and you can unsubscribe anytime.
        </p>
      </form>
    </motion.div>
  );
}
