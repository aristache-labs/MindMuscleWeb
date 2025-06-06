'use client';

export function WaitlistSection() {
  return (
    <section id="waitlist" className="py-24 bg-dark-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Join the Waitlist
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Be the first to experience AI-powered fitness when we launch in Summer 2025
          </p>
        </div>
        
        <div className="mt-16">
          <div className="mx-auto max-w-md">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-dark-800 border border-gray-700 px-4 py-3 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none"
              />
              <button className="rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-600 transition-colors">
                Join Waitlist
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-400 text-center">
              No spam, just launch updates and early access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 