'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { APP_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <span className="text-xl font-bold text-white">
              {APP_INFO.name}
            </span>
            <p className="text-sm text-gray-400">
              © 2025 {APP_INFO.name}. All rights reserved.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            <Link 
              href="/privacy" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <motion.a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow MindMuscle on Twitter"
              className="text-gray-400 hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Follow us on Twitter</span>
            </motion.a>
            <motion.a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow MindMuscle on Instagram"
              className="text-gray-400 hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Follow us on Instagram</span>
            </motion.a>
            <motion.a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow MindMuscle on LinkedIn"
              className="text-gray-400 hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">Follow us on LinkedIn</span>
            </motion.a>
            <motion.a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to MindMuscle on YouTube"
              className="text-gray-400 hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">Subscribe to our YouTube channel</span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
} 