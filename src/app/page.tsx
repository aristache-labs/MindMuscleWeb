import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { AppShowcaseSection } from '@/components/sections/AppShowcaseSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WaitlistSection } from '@/components/sections/WaitlistSection';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import { LoadingFallback } from '@/components/ui/LoadingFallback';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navigation />
      
      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <HowItWorksSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <AppShowcaseSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <WaitlistSection />
      </Suspense>

      <Footer />
    </main>
  );
} 