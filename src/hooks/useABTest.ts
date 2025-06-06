'use client';

import { useState, useEffect } from 'react';
import { getABVariant, trackABConversion, ABTestConfig } from '@/lib/analytics';

export function useABTest(testName: string, config: ABTestConfig) {
  const [variant, setVariant] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get variant assignment
    const assignedVariant = getABVariant(testName, config);
    setVariant(assignedVariant);
    setIsLoading(false);
  }, [testName, config]);

  const trackConversion = (goalName: string, value?: number) => {
    if (variant) {
      trackABConversion(testName, goalName, value);
    }
  };

  const getVariantConfig = () => {
    const variantData = config.variants.find(v => v.name === variant);
    return variantData?.config || {};
  };

  return {
    variant,
    isLoading,
    trackConversion,
    getVariantConfig,
    isVariant: (variantName: string) => variant === variantName,
  };
} 