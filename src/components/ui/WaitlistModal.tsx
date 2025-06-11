'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { WaitlistForm } from '@/components/ui/WaitlistForm';
import { useWaitlistModal } from '@/components/providers/WaitlistModalProvider';
import { trackEvent } from '@/lib/utils';

interface SuccessData {
  position?: number;
  email?: string;
  referralCode?: string;
  pointsEarned?: number;
  tier?: {
    name: string;
    color: string;
  };
  isReturning?: boolean;
}

export function WaitlistModal() {
  const { isOpen, closeModal } = useWaitlistModal();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleWaitlistSuccess = (data: SuccessData) => {
    trackEvent('waitlist_modal_success', {
      position: data.position,
      email: data.email,
      referral_code: data.referralCode,
      source: 'modal'
    });
    
    // Don't automatically close the modal on success to show the celebration
    // User can close it manually after seeing their results
  };

  const handleCloseClick = () => {
    trackEvent('waitlist_modal_closed', { source: 'close_button' });
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-dark-800 border border-gray-700/50 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div>
                <h3 className="text-xl font-bold text-white">Join the Revolution</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Be among the first to experience AI-powered fitness
                </p>
              </div>
              <button
                onClick={handleCloseClick}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700/50"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <WaitlistForm 
                onSuccess={handleWaitlistSuccess}
                className="bg-transparent border-0 p-0 shadow-none"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 