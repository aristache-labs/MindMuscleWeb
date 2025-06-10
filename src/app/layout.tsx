import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';
import { ScrollProgressAnimation } from '@/components/ui/LottieAnimations';
import { CookieConsentBar } from '@/components/ui/CookieConsentBar';
import PlausibleProvider from 'next-plausible';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { AnalyticsProvider } from '@/components/providers/AnalyticsProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mindmuscle.app'),
  title: {
    default: 'MindMuscle | AI-Powered Fitness Revolution',
    template: '%s | MindMuscle',
  },
  description:
    'Experience the future of fitness with AI-powered personalized workouts that adapt and evolve with every rep. Coming Summer 2025.',
  keywords: [
    'AI fitness',
    'personal trainer',
    'workout app',
    'artificial intelligence',
    'fitness technology',
    'personalized training',
  ],
  authors: [{ name: 'MindMuscle Team' }],
  creator: 'MindMuscle',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindmuscle.app',
    siteName: 'MindMuscle',
    title: 'MindMuscle | AI-Powered Fitness Revolution',
    description:
      'Experience the future of fitness with AI-powered personalized workouts that adapt and evolve with every rep.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MindMuscle - AI-Powered Fitness App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindMuscle | AI-Powered Fitness Revolution',
    description:
      'Experience the future of fitness with AI-powered personalized workouts.',
    images: ['/og-image.png'],
    creator: '@mindmuscleapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8B5CF6' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A10' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MindMuscle',
  operatingSystem: ['iOS', 'Android'],
  applicationCategory: 'HealthApplication',
  description:
    'AI-Powered fitness app that crafts personalized workouts and tracks progress.',
  url: 'https://mindmuscle.app',
  downloadUrl: 'https://apps.apple.com/app/mindmuscle',
  image: 'https://mindmuscle.app/og-image.png',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1247',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-body antialiased bg-dark-950 text-dark-50`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Plausible Analytics Script */}
        <script 
          defer 
          data-domain="mindmuscle.app" 
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <PerformanceMonitor
          enableCWV={true}
          enableResourceTiming={process.env.NODE_ENV === 'development'}
          enableNavigationTiming={process.env.NODE_ENV === 'development'}
        />
        <ScrollProgressAnimation />
        <CookieConsentBar />
        <PlausibleProvider 
          domain="mindmuscle.app" 
          customDomain="https://plausible.io"
          selfHosted={false}
          enabled={process.env.NODE_ENV === 'production'}
          trackOutboundLinks={true}
          trackFileDownloads={true}
        >
          <AnalyticsProvider>
            {children}
            
            {/* Vercel Analytics */}
            <Analytics />
          </AnalyticsProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
