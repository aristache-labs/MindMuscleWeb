export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-dark-bg pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold">
              Terms of <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Service</span>
            </h1>
            <p className="text-lg text-white/70">
              Last updated: January 2025
            </p>
          </div>

          <div className="bg-dark-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Acceptance of Terms
              </h2>
              <p className="text-white/70 leading-relaxed">
                By accessing and using our AI-powered fitness application, you accept and agree to be 
                bound by the terms and provision of this agreement. If you do not agree to abide by 
                the above, please do not use this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Use License
              </h2>
              <p className="text-white/70 leading-relaxed">
                Permission is granted to temporarily download one copy of our application for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                of title, and under this license you may not modify or copy the materials.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Disclaimer
              </h2>
              <p className="text-white/70 leading-relaxed">
                The materials on our application are provided on an 'as is' basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties including without 
                limitation, implied warranties or conditions of merchantability, fitness for a particular 
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Health and Safety
              </h2>
              <p className="text-white/70 leading-relaxed">
                Our AI-powered fitness recommendations are for informational purposes only and should not 
                replace professional medical advice. Please consult with a healthcare provider before 
                starting any new fitness program, especially if you have pre-existing health conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Contact Information
              </h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at 
                legal@yourappname.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 