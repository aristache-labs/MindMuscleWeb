'use client';

import { useState, forwardRef } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';
import { useImagePreload } from '@/hooks/useImagePreload';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  loadingAnimation?: 'fade' | 'blur' | 'skeleton' | 'none';
  preload?: boolean;
  lowQualityPlaceholder?: string;
  onLoadComplete?: () => void;
  onLoadError?: (error: Error) => void;
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(({
  src,
  alt,
  fallbackSrc,
  loadingAnimation = 'fade',
  preload = false,
  lowQualityPlaceholder,
  className = '',
  priority = false,
  onLoadComplete,
  onLoadError,
  ...props
}, ref) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion && loadingAnimation !== 'none';
  
  // Preload critical images
  const { isLoading: isPreloading } = useImagePreload(
    typeof src === 'string' ? src : '',
    { priority: preload }
  );

  const imageSrc = imageError && fallbackSrc ? fallbackSrc : src;
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  const handleError = () => {
    setImageError(true);
    onLoadError?.(new Error(`Failed to load image: ${src}`));
  };

  const getLoadingAnimationClass = () => {
    if (!shouldAnimate || isLoaded) return '';
    
    switch (loadingAnimation) {
      case 'blur':
        return 'blur-sm scale-105';
      case 'skeleton':
        return 'bg-gray-200 animate-pulse';
      case 'fade':
      default:
        return 'opacity-0';
    }
  };

  const getLoadedAnimationClass = () => {
    if (!shouldAnimate) return '';
    
    switch (loadingAnimation) {
      case 'blur':
        return 'blur-0 scale-100';
      case 'fade':
      default:
        return 'opacity-100';
    }
  };

  if (shouldAnimate && loadingAnimation === 'fade') {
    return (
      <motion.div className={`relative overflow-hidden ${className}`}>
        {lowQualityPlaceholder && !isLoaded && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-105"
            style={{ backgroundImage: `url(${lowQualityPlaceholder})` }}
          />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Image
            ref={ref}
            src={imageSrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            priority={priority || preload}
            quality={90}
            placeholder={lowQualityPlaceholder ? 'blur' : 'empty'}
            blurDataURL={lowQualityPlaceholder}
            {...props}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {lowQualityPlaceholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-105"
          style={{ backgroundImage: `url(${lowQualityPlaceholder})` }}
        />
      )}
      <Image
        ref={ref}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-all duration-300 ${getLoadingAnimationClass()} ${
          isLoaded ? getLoadedAnimationClass() : ''
        }`}
        priority={priority || preload}
        quality={90}
        placeholder={lowQualityPlaceholder ? 'blur' : 'empty'}
        blurDataURL={lowQualityPlaceholder}
        {...props}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage }; 