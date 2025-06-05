'use client';

export default function Hero() {
  return (
    <section className="pt-20 pb-16 lg:pt-28 lg:pb-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Content */}
        <div className="space-y-8">
          {/* TODO: Add Framer Motion animations for staggered entrance */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">
                AI-Powered
              </span>
              <br />
              Fitness Revolution
            </h1>
            
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl">
              Transform your fitness journey with personalized AI workouts, real-time form analysis, 
              and intelligent progress tracking. Coming Summer 2025.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-primary-purple to-secondary-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-purple/25 transition-all duration-300 transform hover:-translate-y-1">
              Join Beta Waitlist
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* TODO: Add carousel for user testimonials or app features */}
        </div>

        {/* Right Column - Phone Mockup */}
        <div className="flex justify-center lg:justify-end">
          {/* TODO: Replace with actual phone mockup and integrate animations */}
          <div className="relative">
            <div className="w-80 h-96 bg-gradient-to-br from-dark-surface to-dark-bg rounded-3xl border border-white/10 shadow-2xl">
              <div className="p-6 h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-purple to-neon-cyan rounded-full mx-auto"></div>
                  <p className="text-white/60">Phone Mockup Placeholder</p>
                  <p className="text-sm text-white/40">App Interface Preview</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-cyan/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-purple/20 rounded-full blur-sm"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 