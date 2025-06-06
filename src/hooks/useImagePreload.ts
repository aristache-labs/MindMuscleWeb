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
    const sources = Array.isArray(src) ? src : [src];
    let loadedCount = 0;
    setIsLoading(true);
    setHasError(false);

    const loadImage = (imageSrc: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(imageSrc));
          loadedCount++;
          
          if (loadedCount === sources.length) {
            setIsLoading(false);
          }
          resolve();
        };
        
        img.onerror = () => {
          setHasError(true);
          reject(new Error(`Failed to load image: ${imageSrc}`));
        };

        // Set priority loading attributes
        if (options.priority) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
        }

        img.src = imageSrc;
      });
    };

    Promise.allSettled(sources.map(loadImage))
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [src, options.priority]);

  return {
    isLoading,
    hasError,
    loadedImages,
    isImageLoaded: (imageSrc: string) => loadedImages.has(imageSrc),
  };
} 