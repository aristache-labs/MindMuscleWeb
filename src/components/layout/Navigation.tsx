'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, ChevronRight } from 'lucide-react';

import { APP_INFO, NAVIGATION_ITEMS } from '@/lib/constants';
import { cn, scrollToElement, trackEvent } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    console.log('Navigation clicked:', { href, label });
    
    trackEvent('navigation_click', {
      section: 'header',
      link: label.toLowerCase().replace(' ', '_'),
    });
    
    if (href.startsWith('#')) {
      const elementId = href.substring(1);
      console.log('Scrolling to element:', elementId);
      scrollToElement(elementId, 80);
    } else {
      console.log('Opening external link:', href);
      window.open(href, '_blank');
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleWaitlistClick = () => {
    console.log('Waitlist button clicked');
    
    trackEvent('navigation_waitlist_click', {
      section: 'header',
      button_type: 'waitlist',
    });
    
    scrollToElement('waitlist', 80);
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-dark-950/80 backdrop-blur-xl border-b border-gray-800/50'
            : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="relative h-8 w-8">
                <Image
                  src="/MindMuscleWeb.png"
                  alt={`${APP_INFO.name} Logo`}
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-white">
                {APP_INFO.name}
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {NAVIGATION_ITEMS.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.label)}
                  className="group relative text-sm font-medium text-gray-300 transition-colors hover:text-white cursor-pointer"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -2 }}
                  style={{ pointerEvents: 'auto' }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-500"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* CTA Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                onClick={() => window.open('/interactive-demo', '_self')}
                className="inline-flex items-center gap-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 px-4 py-2 text-sm font-semibold text-accent-cyan transition-all duration-300 hover:bg-accent-cyan/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Demo
              </motion.button>
              <motion.button
                onClick={handleWaitlistClick}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-colors hover:text-white md:hidden"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-dark-950/90 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-dark-900/95 backdrop-blur-xl border-l border-gray-800/50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col p-6">
                {/* Navigation Items */}
                <div className="space-y-4">
                  {NAVIGATION_ITEMS.map((item, index) => (
                    <motion.button
                      key={item.href}
                      onClick={() => handleNavClick(item.href, item.label)}
                      className="group flex w-full items-center justify-between rounded-lg p-4 text-left font-medium text-gray-300 transition-all hover:bg-gray-800/50 hover:text-white cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ pointerEvents: 'auto' }}
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                  className="mt-8 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAVIGATION_ITEMS.length * 0.1 + 0.2 }}
                >
                  <motion.button
                    onClick={() => {
                      window.open('/interactive-demo', '_self');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 px-6 py-3 text-center font-semibold text-accent-cyan transition-all duration-300 hover:bg-accent-cyan/20"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Try Demo
                  </motion.button>
                  <motion.button
                    onClick={handleWaitlistClick}
                    className="w-full rounded-lg bg-primary-500 px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:bg-primary-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Waitlist
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 