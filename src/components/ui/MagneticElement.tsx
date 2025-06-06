'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  distance?: number;
  spring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  disabled?: boolean;
  label?: string;
  color?: string;
  as?: 'div' | 'button' | 'a' | 'span';
  href?: string;
  onClick?: () => void;
  onMagnetEnter?: () => void;
  onMagnetLeave?: () => void;
}

export function MagneticElement({
  children,
  className,
  strength = 0.4,
  distance = 150,
  spring = {},
  disabled = false,
  label,
  color,
  as = 'div',
  href,
  onClick,
  onMagnetEnter,
  onMagnetLeave,
}: MagneticElementProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
    ...spring,
  };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Create rotation based on movement
  const rotateX = useTransform(springY, [-distance, distance], [10, -10]);
  const rotateY = useTransform(springX, [-distance, distance], [-10, 10]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceFromCenter = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distanceFromCenter < distance) {
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Apply magnetic effect with strength multiplier
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    }
  }, [disabled, distance, strength, x, y]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
    onMagnetEnter?.();
  }, [disabled, onMagnetEnter]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    onMagnetLeave?.();
  }, [x, y, onMagnetLeave]);

  const commonProps = {
    ref,
    className: cn('relative inline-block', className),
    'data-magnetic': !disabled,
    'data-magnetic-strength': strength.toString(),
    'data-magnetic-label': label,
    'data-magnetic-color': color,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      x: springX,
      y: springY,
      rotateX,
      rotateY,
    },
  };

  const MotionComponent = motion[as as keyof typeof motion] as any;

  if (as === 'a' && href) {
    return (
      <MotionComponent
        {...commonProps}
        href={href}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
      </MotionComponent>
    );
  }

  if (as === 'button') {
    return (
      <MotionComponent
        {...commonProps}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      {...commonProps}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </MotionComponent>
  );
}

// Specialized magnetic button component
export function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.3,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'small' | 'medium' | 'large';
} & Omit<MagneticElementProps, 'as' | 'children' | 'className' | 'onClick' | 'strength' | 'disabled'>) {
  
  const baseClasses = cn(
    'relative overflow-hidden font-medium transition-all duration-300 rounded-lg',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    disabled && 'cursor-not-allowed opacity-50',
    
    // Size variations
    {
      'px-3 py-1.5 text-sm': size === 'small',
      'px-4 py-2 text-base': size === 'medium',
      'px-6 py-3 text-lg': size === 'large',
    },
    
    // Variant styles
    {
      'bg-primary-500 text-white border border-primary-500 hover:bg-primary-600': variant === 'primary',
      'bg-gray-200 text-gray-900 border border-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-600': variant === 'secondary',
      'bg-transparent text-primary-500 border border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950': variant === 'outline',
      'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800': variant === 'ghost',
    },
    
    className
  );

  return (
    <MagneticElement
      as="button"
      className={baseClasses}
      onClick={onClick}
      strength={strength}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </MagneticElement>
  );
}

// Magnetic area for larger interactive zones
export function MagneticArea({
  children,
  className,
  strength = 0.2,
  distance = 200,
  ...props
}: Omit<MagneticElementProps, 'as'>) {
  return (
    <MagneticElement
      className={cn('block w-full', className)}
      strength={strength}
      distance={distance}
      {...props}
    >
      {children}
    </MagneticElement>
  );
} 