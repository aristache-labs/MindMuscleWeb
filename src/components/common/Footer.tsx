import Link from 'next/link';
import { GlobeAltIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-dark-surface border-t border-white/10">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-white/70">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 bg-white/30 rounded-full"></span>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <GlobeAltIcon className="w-8 h-8 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" />
            <EnvelopeIcon className="w-8 h-8 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" />
            <PhoneIcon className="w-8 h-8 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" />
          </div>

          {/* Copyright */}
          <div className="text-xs text-white/50 text-center">
            © 2025 MindMuscle.AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 