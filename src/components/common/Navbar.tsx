'use client';

import { useState, useEffect } from 'react';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { trackCTAClick } from '@/lib/analytics';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
      scrolled 
        ? 'bg-dark-surface/90 backdrop-blur-md border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 min-w-0">
          {/* Logo */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            <div className="text-lg sm:text-2xl font-heading font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent truncate">
              YourAppName
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button 
              onClick={() => trackCTAClick('App Store', 'Navbar')}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
            >
              <CloudArrowDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">App Store</span>
              <span className="sm:hidden">iOS</span>
            </button>
            <button 
              onClick={() => trackCTAClick('Play Store', 'Navbar')}
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-xs sm:text-sm"
            >
              <CloudArrowDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Play Store</span>
              <span className="sm:hidden">Android</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 