'use client';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Setup Your Profile",
      description: "Tell us about your fitness goals, experience level, and preferences to get personalized recommendations."
    },
    {
      step: "02", 
      title: "AI Generates Workouts",
      description: "Our advanced AI creates custom workout plans tailored specifically to your needs and available equipment."
    },
    {
      step: "03",
      title: "Track & Improve",
      description: "Monitor your progress with real-time form analysis and adaptive training adjustments."
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
          How It <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Get started with AI-powered fitness in three simple steps
        </p>
      </div>

      {/* TODO: Add scroll-triggered entrance animations */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step, index) => (
          <div key={index} className="text-center space-y-6">
            {/* Step Number & Icon */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-purple to-secondary-purple rounded-full flex items-center justify-center mx-auto mb-4">
                {/* TODO: Replace with actual icons */}
                <div className="w-8 h-8 bg-white/20 rounded"></div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-xs font-bold text-dark-bg">
                {step.step}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Connector Line (except last item) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-purple/30 to-transparent transform translate-x-10"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 