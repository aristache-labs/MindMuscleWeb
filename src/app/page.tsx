import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 max-w-7xl">
        <Hero />
        <HowItWorks />
        <Features />
        <Showcase />
        <Testimonials />
        <FinalCTA />
      </div>
    </main>
  );
}
