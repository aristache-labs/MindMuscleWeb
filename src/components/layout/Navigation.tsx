'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn, scrollToElement } from '@/lib/utils';
import { trackEvent, MindMuscleEvents } from '@/lib/analytics';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    console.log('Navigation clicked:', { href, label, currentPath: pathname });
    
    trackEvent(MindMuscleEvents.NAV_SECTION_CLICK, {
      section: 'header',
      link: label.toLowerCase().replace(' ', '_'),
      target_section: href,
      current_path: pathname,
    });
    
    if (href.startsWith('#')) {
      const elementId = href.substring(1);
      
      // If we're not on the homepage, navigate to homepage first
      if (pathname !== '/') {
        console.log('Navigating to homepage and then scrolling to:', elementId);
        router.push(`/${href}`);
      } else {
        console.log('Scrolling to element on current page:', elementId);
        scrollToElement(elementId, 80);
      }
    } else {
      console.log('Opening external link:', href);
      window.open(href, '_blank');
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleWaitlistClick = () => {
    console.log('Waitlist button clicked', { currentPath: pathname });
    
    trackEvent(MindMuscleEvents.NAV_LOGO_CLICK, {
      section: 'header',
      button_type: 'waitlist',
      current_path: pathname,
    });
    
    // If we're not on the homepage, navigate to homepage first
    if (pathname !== '/') {
      console.log('Navigating to homepage and then scrolling to waitlist');
      router.push('/#waitlist');
    } else {
      console.log('Scrolling to waitlist on current page');
      scrollToElement('waitlist', 80);
    }
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
            <motion.button
              onClick={() => {
                trackEvent(MindMuscleEvents.NAV_LOGO_CLICK, {
                  section: 'header',
                  action: 'logo_click',
                  current_path: pathname,
                });
                router.push('/');
              }}
              className="flex items-center gap-2 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="flex items-center">
                <span className="text-2xl font-black bg-gradient-to-r from-primary-400 via-primary-500 to-accent-cyan bg-clip-text text-transparent">
                  Mind
                </span>
                <span className="text-2xl font-black text-white group-hover:text-gray-200 transition-colors">
                  Muscle
                </span>
              </div>
              <motion.div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.button>

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