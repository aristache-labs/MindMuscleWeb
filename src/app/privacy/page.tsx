export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-dark-bg pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold">
              Privacy <span className="bg-gradient-to-r from-primary-purple to-neon-cyan bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-lg text-white/70">
              Last updated: January 2025
            </p>
          </div>

          <div className="bg-dark-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Information We Collect
              </h2>
              <p className="text-white/70 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support. This may include your name, email address, 
                fitness goals, and workout preferences.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                How We Use Your Information
              </h2>
              <p className="text-white/70 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, 
                create personalized workout plans, analyze your form and progress, and communicate 
                with you about updates and new features.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Data Security
              </h2>
              <p className="text-white/70 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-semibold text-white">
                Contact Us
              </h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at 
                privacy@yourappname.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 