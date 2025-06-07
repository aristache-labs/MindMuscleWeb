'use client';

import { motion } from 'framer-motion';
import { LazySection } from '@/components/ui/LazySection';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { 
  AIBrainIcon, 
  AISparklesIcon, 
  AIAnalyticsIcon,
  AITargetIcon
} from '@/components/ui/CustomIcons';
import { 
  AIBrainAnimation, 
  FloatingElementsAnimation, 
  PulseAnimation 
} from '@/components/ui/LottieAnimations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { 
  ChevronLeft, 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Globe, 
  UserCheck,
  Settings,
  Mail,
  Clock,
  Baby
} from 'lucide-react';



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

const informationTypes = [
  {
    category: "Personal Information",
    icon: <Users className="w-6 h-6" />,
    items: [
      "Name and email address",
      "Age, gender, and physical characteristics",
      "Fitness goals and preferences",
      "Health and medical information you provide"
    ]
  },
  {
    category: "Fitness Data",
    icon: <AITargetIcon size={24} className="text-primary-400" />,
    items: [
      "Workout performance and progress",
      "Exercise preferences and history",
      "Body measurements and composition",
      "Activity levels and patterns"
    ]
  },
  {
    category: "Technical Information",
    icon: <AIAnalyticsIcon size={24} className="text-primary-400" />,
    items: [
      "Device information and identifiers",
      "Usage analytics and app performance data",
      "Location data (if you enable location services)",
      "Camera and sensor data (for movement analysis)"
    ]
  }
];

const usagePoints = [
  "Provide personalized AI-powered workout recommendations",
  "Track your fitness progress and achievements",
  "Improve our AI algorithms and app functionality",
  "Send you app updates and fitness tips (with your consent)",
  "Provide customer support and respond to inquiries",
  "Ensure app security and prevent fraud"
];

const securityMeasures = [
  "End-to-end encryption for sensitive data",
  "Secure data centers with restricted access",
  "Regular security audits and updates",
  "Multi-factor authentication for accounts"
];

const privacyRights = [
  "Access and review your personal information",
  "Correct or update your data",
  "Delete your account and associated data",
  "Export your fitness data",
  "Opt-out of certain data processing activities",
  "Withdraw consent at any time"
];

const mainSections = [
  {
    id: 4,
    icon: <AIBrainIcon size={32} className="text-primary-400" />,
    title: "AI and Data Processing",
    content: "Our AI system processes your fitness data to provide personalized recommendations. This processing occurs both locally on your device and on our secure servers. We use advanced encryption and privacy-preserving techniques to protect your data during AI training and inference."
  },
  {
    id: 5,
    icon: <Globe className="w-8 h-8" />,
    title: "Data Sharing and Disclosure",
    content: "We do not sell your personal information. We may share your information with your explicit consent, with trusted service providers who assist in app operations, for legal compliance or to protect rights and safety, or in aggregated, anonymized form for research purposes."
  },
  {
    id: 8,
    icon: <Shield className="w-8 h-8" />,
    title: "Health Information",
    content: "Health and fitness data is treated with special care. We comply with applicable health privacy laws and use this information solely for providing fitness services. We do not share health information with insurance companies or employers without your explicit consent."
  },
  {
    id: 9,
    icon: <Clock className="w-8 h-8" />,
    title: "Data Retention",
    content: "We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time, and we will delete it within 30 days unless required to retain it by law."
  },
  {
    id: 10,
    icon: <Globe className="w-8 h-8" />,
    title: "International Data Transfers",
    content: "Your information may be processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers."
  },
  {
    id: 11,
    icon: <Baby className="w-8 h-8" />,
    title: "Children's Privacy",
    content: "Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us."
  }
];

export default function PrivacyPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-dark-950">
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
                className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl"
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
                className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl"
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
              <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent-cyan/10 blur-3xl opacity-30" />
              <div className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-primary-500/10 blur-3xl opacity-20" />
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
                className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-2 text-sm font-medium text-accent-cyan backdrop-blur-sm"
                variants={textVariants}
              >
                <Shield className="w-4 h-4" />
                <span>Data Protection</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
                variants={textVariants}
              >
                Privacy Policy
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-300 max-w-2xl mx-auto"
                variants={textVariants}
              >
                Your privacy and data security are fundamental to our AI-powered fitness experience
              </motion.p>
              
              <motion.p 
                className="text-sm text-accent-cyan font-medium"
                variants={textVariants}
              >
                Last updated: January 2024
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="relative bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-12">

            {/* Introduction */}
            <LazySection animation="slideUp" delay={0.1}>
              <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/30 p-3">
                    <Eye className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      1. Introduction
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      MindMuscle (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered fitness application and related services.
                    </p>
                  </div>
                </div>
              </div>
            </LazySection>

            {/* Information We Collect */}
            <LazySection animation="fadeIn" delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-8">
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-3">
                    <Database className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      2. Information We Collect
                    </h2>
                  </div>
                </div>
                
                <div className="grid gap-6 lg:grid-cols-1">
                  {informationTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      className="border border-white/5 rounded-xl p-6 bg-white/[0.02]"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-2">
                          {type.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-primary-300">
                          {type.category}
                        </h3>
                      </div>
                      <div className="grid gap-2">
                        {type.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2 flex-shrink-0"></div>
                            <p className="text-gray-300 text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </LazySection>

            {/* How We Use Your Information */}
            <LazySection animation="slideUp" delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/30 p-3">
                    <Settings className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      3. How We Use Your Information
                    </h2>
                    <p className="text-gray-300 mb-6">We use your information to:</p>
                  </div>
                </div>
                
                <div className="grid gap-3">
                  {usagePoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AISparklesIcon size={16} className="text-accent-cyan mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </LazySection>

            {/* Main Sections */}
            {mainSections.map((section, index) => (
              <LazySection
                key={section.id}
                animation="slideUp"
                delay={index * 0.1}
                threshold={0.2}
              >
                <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-white/10">
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
                </div>
              </LazySection>
            ))}

            {/* Data Security */}
            <LazySection animation="fadeIn" delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-3">
                    <Lock className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      6. Data Security
                    </h2>
                    <p className="text-gray-300 mb-6">
                      We implement industry-standard security measures to protect your information, including:
                    </p>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {securityMeasures.map((measure, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary-500/5 to-primary-600/5 border border-primary-500/20"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Shield className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">{measure}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </LazySection>

            {/* Privacy Rights */}
            <LazySection animation="slideUp" delay={0.1}>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/30 p-3">
                    <UserCheck className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                      7. Your Privacy Rights
                    </h2>
                    <p className="text-gray-300 mb-6">You have the right to:</p>
                  </div>
                </div>
                
                <div className="grid gap-3">
                  {privacyRights.map((right, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-sm leading-relaxed">{right}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </LazySection>

            {/* Changes to Policy */}
            <LazySection animation="slideUp" delay={0.1}>
              <div className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:bg-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 p-2 group-hover:from-primary-500/30 group-hover:to-primary-600/30 transition-all duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300">
                      12. Changes to This Policy
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. For significant changes, we will provide additional notice.
                    </p>
                  </div>
                </div>
              </div>
            </LazySection>

            {/* Contact Section */}
            <LazySection animation="scale" delay={0.2}>
              <PulseAnimation intensity="subtle">
                <div className="rounded-2xl border border-accent-cyan/30 bg-gradient-to-br from-accent-cyan/10 to-accent-cyan/5 p-8 backdrop-blur-sm text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/30 p-3">
                      <Mail className="w-8 h-8 text-accent-cyan" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    13. Contact Us
                  </h3>
                  <p className="text-gray-300 mb-6">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-3">
                    <a 
                      href="mailto:privacy@mindmuscle.app"
                      className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-cyan/80 font-medium transition-colors duration-300"
                    >
                      <AISparklesIcon size={16} />
                      privacy@mindmuscle.app
                    </a>
                    <div className="text-sm text-gray-400">
                      <span className="font-medium">Data Protection Officer:</span>
                      <a 
                        href="mailto:dpo@mindmuscle.app"
                        className="ml-2 text-accent-cyan hover:text-accent-cyan/80 transition-colors duration-300"
                      >
                        dpo@mindmuscle.app
                      </a>
                    </div>
                  </div>
                </div>
              </PulseAnimation>
            </LazySection>

            {/* Back to Home Button */}
            <LazySection animation="fadeIn" delay={0.1}>
              <div className="text-center pt-8">
                <motion.a
                  href="/"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-cyan to-primary-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-accent-cyan/80 hover:to-primary-600 transition-all duration-300 shadow-lg hover:shadow-accent-cyan/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back to Home</span>
                  <Shield className="w-5 h-5" />
                </motion.a>
              </div>
            </LazySection>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 