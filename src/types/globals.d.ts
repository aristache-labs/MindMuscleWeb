// Global type declarations

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: {
        props?: Record<string, unknown>;
        callback?: () => void;
      }
    ) => void;
  }
}

// Plausible Analytics types
declare module 'plausible' {
  interface PlausibleOptions {
    props?: Record<string, unknown>;
    callback?: () => void;
  }

  function plausible(event: string, options?: PlausibleOptions): void;
  export = plausible;
}

// Re-export to make this a module
export {}; 