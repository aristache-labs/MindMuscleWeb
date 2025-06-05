'use client';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      content: "The AI-powered workout generation is incredible! It perfectly adapts to my schedule and fitness level. Can't wait for the full release!",
      avatar: "SJ"
    },
    {
      name: "Mike Chen", 
      role: "Personal Trainer",
      content: "As a trainer, I'm amazed by the form analysis technology. This will revolutionize how people learn proper exercise technique.",
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Busy Professional", 
      content: "Finally, a fitness app that understands my hectic lifestyle. The adaptive scheduling and quick workouts are game-changers.",
      avatar: "ED"
    }
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
          What Users <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Say</span>
        </h2>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Early beta testers are already experiencing transformative results
        </p>
      </div>

      {/* TODO: Integrate keen-slider or Embla Carousel for smooth scrolling */}
      <div className="relative">
        {/* Testimonials Container */}
        <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-80 bg-dark-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-primary-purple/30 transition-all duration-300"
            >
              {/* Quote */}
              <div className="mb-6">
                <div className="text-4xl text-neon-cyan/30 mb-4">"</div>
                <p className="text-white/80 leading-relaxed text-lg">
                  {testimonial.content}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-purple to-neon-cyan rounded-full flex items-center justify-center text-dark-bg font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-white/60">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-neon-cyan rounded-sm"></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className="w-2 h-2 bg-white/20 rounded-full hover:bg-primary-purple transition-colors duration-200"
            ></button>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-bg to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-bg to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
} 