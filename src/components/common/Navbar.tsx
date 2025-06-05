'use client';

import { useState, useEffect } from 'react';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark-surface/90 backdrop-blur-md border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-heading font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
              YourAppName
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex items-center space-x-3">
            {/* TODO: Add scroll detection to toggle background opacity */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-sm">
              <CloudArrowDownIcon className="w-5 h-5" />
              <span>App Store</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-sm">
              <CloudArrowDownIcon className="w-5 h-5" />
              <span>Play Store</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 