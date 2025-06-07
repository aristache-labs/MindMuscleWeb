// This hook has been removed as part of analytics system cleanup
// Consider using a third-party A/B testing service like PostHog, Optimizely, or Google Optimize instead

export function useABTest() {
  console.warn('useABTest hook has been removed. Consider using a third-party A/B testing service.');
  return {
    variant: 'control',
    isLoading: false,
    trackConversion: () => {},
    getVariantConfig: () => ({}),
    isVariant: () => false,
  };
} 