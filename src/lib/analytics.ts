// Plausible Analytics utility functions
type PlausibleEventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: PlausibleEventProps }) => void;
  }
}

/**
 * Track a custom event in Plausible Analytics
 * @param event - Event name (e.g., "CTA Click", "Form Submit")
 * @param props - Additional properties to track
 */
export const trackEvent = (event: string, props?: PlausibleEventProps) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(event, { props });
  } else {
    // Fallback for development or when Plausible isn't loaded
    console.log('Analytics Event:', event, props);
  }
};

/**
 * Track CTA button clicks
 * @param buttonName - Name of the CTA button
 * @param location - Where on the page the button was clicked
 */
export const trackCTAClick = (buttonName: string, location: string) => {
  trackEvent('CTA Click', {
    button: buttonName,
    location: location,
  });
};

/**
 * Track form submissions
 * @param formName - Name of the form
 * @param success - Whether the submission was successful
 */
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent('Form Submit', {
    form: formName,
    success: success,
  });
};

/**
 * Track user interactions with app features
 * @param feature - Feature name (e.g., "Carousel Navigation", "Video Play")
 * @param action - Action taken (e.g., "next", "previous", "play")
 */
export const trackFeatureInteraction = (feature: string, action: string) => {
  trackEvent('Feature Interaction', {
    feature: feature,
    action: action,
  });
};

/**
 * Track page section views (for scroll tracking)
 * @param section - Section name (e.g., "Hero", "Features", "Testimonials")
 */
export const trackSectionView = (section: string) => {
  trackEvent('Section View', {
    section: section,
  });
};

/**
 * Track conversion goals
 * @param goal - Goal name (e.g., "Beta Signup", "Newsletter Subscribe")
 * @param value - Optional value associated with the conversion
 */
export const trackConversion = (goal: string, value?: number) => {
  const props: PlausibleEventProps = { goal };
  if (value !== undefined) {
    props.value = value;
  }
  trackEvent('Conversion', props);
}; 