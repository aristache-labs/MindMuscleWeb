import { useEffect, useState } from 'react';

interface ImagePreloadOptions {
  priority?: boolean;
  sizes?: string;
}

export function useImagePreload(
  src: string | string[],
  options: ImagePreloadOptions = {}
) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Skip empty or invalid sources
    if (!src || (Array.isArray(src) && src.length === 0)) {
      setIsLoading(false);
      return;
    }

    const sources = Array.isArray(src) ? src.filter(s => s && !s.startsWith('data:')) : [src].filter(s => s && !s.startsWith('data:'));
    
    if (sources.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    let isCancelled = false;
    setIsLoading(true);
    setHasError(false);

    const loadImage = (imageSrc: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Add priority preload link for critical images
        if (options.priority && typeof document !== 'undefined') {
          const existingLink = document.querySelector(`link[href="${imageSrc}"]`);
          if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = imageSrc;
            if (options.sizes) {
              link.setAttribute('imagesizes', options.sizes);
            }
            document.head.appendChild(link);
          }
        }

        const img = new Image();
        
        img.onload = () => {
          if (!isCancelled) {
            setLoadedImages(prev => new Set(prev).add(imageSrc));
            loadedCount++;
            
            if (loadedCount === sources.length) {
              setIsLoading(false);
            }
          }
          resolve();
        };
        
        img.onerror = () => {
          if (!isCancelled) {
            setHasError(true);
          }
          reject(new Error(`Failed to load image: ${imageSrc}`));
        };

        // Set priority loading attributes
        if (options.priority) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
        } else {
          img.loading = 'lazy';
        }

        img.src = imageSrc;
      });
    };

    Promise.allSettled(sources.map(loadImage))
      .then(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setIsLoading(false);
          setHasError(true);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [src, options.priority, options.sizes]);

  return {
    isLoading,
    hasError,
    loadedImages,
    isImageLoaded: (imageSrc: string) => loadedImages.has(imageSrc),
  };
} 