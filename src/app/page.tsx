import { lazy } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { Footer } from '@/components/layout/Footer';
import { Navigation } from '@/components/layout/Navigation';
import { LazySection } from '@/components/ui/LazySection';

// Lazy load non-critical sections
const HowItWorksSection = lazy(() => import('@/components/sections/HowItWorksSection').then(m => ({ default: m.HowItWorksSection })));
const FeaturesSection = lazy(() => import('@/components/sections/FeaturesSection').then(m => ({ default: m.FeaturesSection })));
const AppShowcaseSection = lazy(() => import('@/components/sections/AppShowcaseSection').then(m => ({ default: m.AppShowcaseSection })));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const WaitlistSection = lazy(() => import('@/components/sections/WaitlistSection').then(m => ({ default: m.WaitlistSection })));

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-950">
      <Navigation />
      
      {/* Hero section loads immediately - critical above-the-fold content */}
      <HeroSection />

      {/* Lazy load sections with staggered animations */}
      <LazySection 
        animation="slideUp" 
        delay={0.1}
        threshold={0.2}
        rootMargin="150px"
      >
        <HowItWorksSection />
      </LazySection>

      <LazySection 
        animation="slideUp" 
        delay={0.2}
        threshold={0.2}
        rootMargin="150px"
      >
        <FeaturesSection />
      </LazySection>

      {/* Navigation anchor for App Preview */}
      <div id="showcase" className="h-0" />
      <LazySection 
        animation="fadeIn" 
        delay={0.1}
        threshold={0.1}
        rootMargin="100px"
      >
        <AppShowcaseSection />
      </LazySection>

      {/* Navigation anchor for Reviews */}
      <div id="testimonials" className="h-0" />
      <LazySection 
        animation="slideUp" 
        delay={0.2}
        threshold={0.2}
        rootMargin="150px"
      >
        <TestimonialsSection />
      </LazySection>

      {/* Navigation anchor for Waitlist */}
      <div id="waitlist" className="h-0" />
      <LazySection 
        animation="scale" 
        delay={0.1}
        threshold={0.1}
        rootMargin="300px"
      >
        <WaitlistSection />
      </LazySection>

      <Footer />
    </main>
  );
} 