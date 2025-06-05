'use client';

import { useState } from 'react';

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Formspree and add input validation
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/20 via-secondary-purple/10 to-neon-cyan/20 rounded-3xl blur-3xl"></div>
        
        <div className="relative bg-dark-surface/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12 lg:p-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Heading */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">
                Ready to Transform Your
                <br />
                <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
                  Fitness Journey?
                </span>
              </h2>
              
              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                Join thousands of fitness enthusiasts on the waitlist for the most advanced 
                AI-powered fitness app. Be the first to experience the future of personal training.
              </p>
            </div>

            {/* Email Form */}
            <div className="max-w-md mx-auto">
              {/* TODO: Add form integration via Formspree and input validation */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-6 py-4 bg-dark-bg/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-purple transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="px-8 py-4 bg-gradient-to-r from-primary-purple to-secondary-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-purple/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                  >
                    {isSubmitted ? 'Joined!' : 'Join Beta'}
                  </button>
                </div>
                
                <p className="text-sm text-white/60">
                  No spam, unsubscribe at any time. Early access begins Summer 2025.
                </p>
              </form>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-white/60 text-sm lg:text-base">
                  Beta Signups
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
                  95%
                </div>
                <div className="text-white/60 text-sm lg:text-base">
                  Accuracy Rate
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-white/60 text-sm lg:text-base">
                  AI Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 