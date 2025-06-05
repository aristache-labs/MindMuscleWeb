'use client';

import Script from 'next/script';

interface PlausibleAnalyticsProps {
  domain: string;
  enabled?: boolean;
}

export default function PlausibleAnalytics({ 
  domain, 
  enabled = true 
}: PlausibleAnalyticsProps) {
  // Don't load analytics in development unless explicitly enabled
  const shouldLoad = enabled && (
    process.env.NODE_ENV === 'production' || 
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true'
  );

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Plausible Analytics loaded successfully');
        }}
        onError={() => {
          console.warn('Failed to load Plausible Analytics');
        }}
      />
      
      {/* Custom events extension - enables custom event tracking */}
      <Script
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.tagged-events.js"
        strategy="afterInteractive"
      />
    </>
  );
} 