'use client';

import { motion } from 'framer-motion';
import { LazySection } from '@/components/ui/LazySection';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { 
  AIBrainIcon, 
  AISparklesIcon, 
  AIAnalyticsIcon,
  AICommunityIcon,
  AIPowerIcon 
} from '@/components/ui/CustomIcons';
import { 
  AIBrainAnimation, 
  FloatingElementsAnimation, 
  PulseAnimation 
} from '@/components/ui/LottieAnimations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ChevronLeft, Scale, Shield, Users, Zap, Target } from 'lucide-react';



const heroVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const sectionData = [
  {
    id: 1,
    icon: <Scale className="w-8 h-8" />,
    title: "Acceptance of Terms",
    content: "By accessing and using the MindMuscle application (\"Service\"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
  },
  {
    id: 2,
    icon: <AIBrainIcon size={32} className="text-primary-400" />,
    title: "Description of Service",
    content: "MindMuscle is an AI-powered fitness application that provides personalized workout plans, exercise tracking, and fitness coaching through artificial intelligence. The Service is currently in development and will be available Summer 2025."
  },
  {
    id: 3,
    icon: <Users className="w-8 h-8" />,
    title: "User Accounts",
    content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account."
  },
  {
    id: 4,
    icon: <Shield className="w-8 h-8" />,
    title: "Health and Safety Disclaimer",
    content: "The fitness programs and advice provided by MindMuscle are for educational and informational purposes only. Always consult with a healthcare provider before beginning any exercise program. MindMuscle is not responsible for any injuries that may occur from following our recommendations."
  },
  {
    id: 5,
    icon: <AIPowerIcon size={32} className="text-primary-400" />,
    title: "Intellectual Property Rights",
    content: "The Service and its original content, features, and functionality are and will remain the exclusive property of MindMuscle and its licensors. The Service is protected by copyright, trademark, and other laws."
  }
];

const prohibitedItems = [
  "For any unlawful purpose or to solicit others to unlawful acts",
  "To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances",
  "To infringe upon or violate our intellectual property rights or the intellectual property rights of others",
  "To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate",
  "To submit false or misleading information"
];

const additionalSections = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Limitation of Liability",
    content: "In no event shall MindMuscle, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, punitive, consequential, or special damages arising out of or related to your use of the Service."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Termination",
    content: "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms."
  },
  {
    icon: <AIAnalyticsIcon size={24} className="text-primary-400" />,
    title: "Changes to Terms",
    content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect."
  }
];

export default function TermsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] overflow-hidden bg-gradient-to-b from-dark-800 via-dark-900 to-dark-950"
        variants={heroVariants}
        initial="initial"
        animate="animate"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-cyan/10" />
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          </div>

          {/* Floating Elements */}
          {!prefersReducedMotion ? (
            <>
              <motion.div
                className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
              />
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2">
                <AIBrainAnimation size="md" className="opacity-20" />
              </div>
              <FloatingElementsAnimation />
            </>
          ) : (
            <>
              <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl opacity-30" />
              <div className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl opacity-20" />
              <div className="absolute right-1/4 top-1/2 -translate-y-1/2">
                <AIBrainAnimation size="md" className="opacity-20" />
              </div>
            </>
          )}
        </div>

        {/* Header Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[60vh] items-center justify-center pt-24">
            <motion.div
              className="text-center space-y-6"
              variants={textVariants}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300 backdrop-blur-sm"
                variants={textVariants}
              >
                <AISparklesIcon size={16} className="text-primary-400" />
                <span>Legal Framework</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                variants={textVariants}
              >
                Terms of Service
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-300 max-w-2xl mx-auto"
                variants={textVariants}
              >
                                    Understanding our legal framework and your rights when using MindMuscle&apos;s AI-powered fitness platform
              </motion.p>
              
              <motion.p 
                className="text-sm text-primary-400 font-medium"
                variants={textVariants}
              >
                Last updated: January 2024
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content Sections */}
      <div className="relative bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-12">

            {/* Main Sections */}
            {sectionData.map((section, index) => (
              <LazySection
                key={section.id}
                animation="slideUp"
                delay={index * 0.1}
                threshold={0.2}
              >
                <motion.div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-white/10">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-3 group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-white mb-4 group-hover:text-primary-300 transition-colors duration-300">
                        {section.id}. {section.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </LazySection>
            ))}

            {/* Prohibited Uses Section */}
            <LazySection animation="fadeIn" delay={0.3}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-accent-magenta/20 to-accent-magenta/30 p-3">
                    <Shield className="w-8 h-8 text-accent-magenta" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      6. Prohibited Uses
                    </h2>
                    <p className="text-gray-300 mb-6">
                      You may not use our Service:
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {prohibitedItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent-magenta mt-2"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </LazySection>

            {/* Additional Sections */}
            {additionalSections.map((section, index) => (
              <LazySection
                key={index}
                animation="slideUp"
                delay={index * 0.1}
              >
                <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-white/10">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-2 group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                        {7 + index}. {section.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </LazySection>
            ))}

            {/* Contact Section */}
            <LazySection animation="scale" delay={0.2}>
                             <PulseAnimation intensity="subtle">
                <div className="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/10 to-primary-600/10 p-8 backdrop-blur-sm text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-3">
                      <AICommunityIcon size={32} className="text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    10. Contact Information
                  </h3>
                  <p className="text-gray-300 mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <a 
                    href="mailto:legal@mindmuscle.app"
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors duration-300"
                  >
                    <AISparklesIcon size={16} />
                    legal@mindmuscle.app
                  </a>
                </div>
              </PulseAnimation>
            </LazySection>

            {/* Back to Home Button */}
            <LazySection animation="fadeIn" delay={0.1}>
              <div className="text-center pt-8">
                <motion.a
                  href="/"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-primary-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                  <AISparklesIcon size={16} />
                </motion.a>
              </div>
            </LazySection>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
} 