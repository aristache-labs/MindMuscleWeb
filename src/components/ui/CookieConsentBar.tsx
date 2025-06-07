'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export function CookieConsentBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consentGiven = document.cookie.includes('cookie_consent=true');
    if (!consentGiven) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    document.cookie = 'cookie_consent=true; max-age=31536000; path=/';
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-dark-800/90 fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border border-gray-700/50 p-4 backdrop-blur-lg"
        >
          <div className="flex items-start gap-3 text-sm text-gray-200">
            <Cookie className="text-primary-500 h-5 w-5" />
            <p className="flex-1">
              We use cookies to improve your experience. Read our{' '}
              <Link href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
            <button
              onClick={() => setVisible(false)}
              className="text-gray-400 transition-colors hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={acceptCookies}
            className="bg-primary-500 hover:bg-primary-600 mt-3 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
