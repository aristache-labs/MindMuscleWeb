'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Check } from 'lucide-react';
import Link from 'next/link';

export function CookieConsentBar() {
  const [visible, setVisible] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    const consentGiven = document.cookie.includes('cookie_consent=true');
    if (!consentGiven) {
      // Small delay to ensure smooth entrance animation
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = async () => {
    setIsAccepting(true);
    
    // Add a small delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 400));
    
    document.cookie = 'cookie_consent=true; max-age=31536000; path=/';
    setVisible(false);
    setIsAccepting(false);
  };

  const declineCookies = () => {
    document.cookie = 'cookie_consent=false; max-age=31536000; path=/';
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-3 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-6 sm:translate-x-0 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-sm md:w-80 lg:w-96"
          initial={{ 
            opacity: 0, 
            scale: 0.9,
            filter: 'blur(10px)',
            y: 100,
            x: 0
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: 'blur(0px)',
            y: 0,
            x: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
            filter: 'blur(10px)',
            y: 100,
            x: 0
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1],
            type: 'spring',
            stiffness: 200,
            damping: 25
          }}
        >
          {/* Main Container */}
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 sm:border-2 sm:border-white/20 bg-gradient-to-br from-dark-800/98 via-dark-850/98 to-dark-900/98 backdrop-blur-3xl shadow-xl sm:shadow-2xl shadow-black/50">
            {/* Enhanced gradient overlay for better contrast */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.08] via-transparent to-accent-cyan/[0.08] pointer-events-none"
              animate={{
                background: [
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, transparent 50%, rgba(34, 211, 238, 0.08) 100%)',
                  'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, transparent 50%, rgba(139, 92, 246, 0.08) 100%)',
                  'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, transparent 50%, rgba(34, 211, 238, 0.08) 100%)'
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Enhanced border glow for better visibility */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-primary-500/20 via-transparent to-accent-cyan/20 opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Inner border for depth */}
            <div className="absolute inset-[1px] sm:inset-[2px] rounded-2xl sm:rounded-3xl border border-white/10 pointer-events-none" />
            
            {/* Content */}
            <div className="relative p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-5">
                <motion.div 
                  className="flex-shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500/25 to-primary-600/25 p-2 sm:p-3 border border-primary-500/20 shadow-lg shadow-primary-500/10"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Cookie className="h-4 w-4 sm:h-5 sm:w-5 text-primary-300" />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <motion.h3 
                    className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2 tracking-tight drop-shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    We value your privacy
                  </motion.h3>
                  <motion.p 
                    className="text-gray-200 text-xs leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    We use cookies to enhance your experience.{' '}
                    <Link 
                      href="/privacy" 
                      className="text-primary-300 hover:text-primary-200 underline underline-offset-2 decoration-primary-300/60 hover:decoration-primary-200 transition-all duration-200 font-medium"
                    >
                      Learn more
                    </Link>
                  </motion.p>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex gap-2 sm:gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.button
                  onClick={declineCookies}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-xs font-medium text-gray-200 hover:text-white bg-dark-700/70 hover:bg-dark-700/90 border border-gray-500/30 hover:border-gray-400/50 rounded-xl sm:rounded-2xl transition-all duration-300 backdrop-blur-sm shadow-lg"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Decline
                </motion.button>
                
                <motion.button
                  onClick={acceptCookies}
                  disabled={isAccepting}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 text-xs font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl hover:shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 sm:gap-2 relative overflow-hidden border border-primary-400/20"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut'
                    }}
                  />
                  
                  {isAccepting ? (
                    <>
                      <motion.div
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-white/40 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="hidden sm:inline">Accepting...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span>Accept All</span>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Trust indicator - Hidden on very small screens, compact on small screens */}
              <motion.div 
                className="hidden xs:flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-300" />
                </motion.div>
                <span className="text-xs text-gray-200 font-medium">
                  <span className="hidden sm:inline">Your data is secure and never sold</span>
                  <span className="sm:hidden">Secure & private</span>
                </span>
              </motion.div>
            </div>

            {/* Enhanced floating particles effect - Reduced on mobile */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl sm:rounded-3xl">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-primary-300/30 rounded-full"
                  style={{
                    left: `${25 + i * 40}%`,
                    top: `${30 + i * 25}%`,
                  }}
                  animate={{
                    y: [-8, -20, -8],
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: 'easeInOut',
                  }}
                />
              ))}
              {/* Additional particles only on larger screens */}
              <div className="hidden sm:block">
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={`extra-${i}`}
                    className="absolute w-1 h-1 bg-primary-300/30 rounded-full"
                    style={{
                      left: `${15 + i * 25}%`,
                      top: `${40 + i * 15}%`,
                    }}
                    animate={{
                      y: [-10, -25, -10],
                      opacity: [0, 0.8, 0],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      delay: (i + 2) * 0.7,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Subtle spotlight effect - Smaller on mobile */}
            <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-12 h-12 sm:w-20 sm:h-20 bg-primary-500/5 rounded-full blur-xl sm:blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-10 h-10 sm:w-16 sm:h-16 bg-accent-cyan/5 rounded-full blur-xl sm:blur-2xl pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
