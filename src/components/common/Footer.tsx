import Link from 'next/link';

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

          {/* Social Icons Placeholders */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"></div>
            <div className="w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"></div>
            <div className="w-8 h-8 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"></div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-white/50 text-center">
            © 2025 YourAppName. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 