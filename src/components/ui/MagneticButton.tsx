'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  disabled?: boolean;
  label?: string;
  color?: string;
}

export function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.4,
  disabled = false,
  label,
  color,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic effect with strength multiplier
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      style={{
        x: springX,
        y: springY,
      }}
      data-magnetic={!disabled}
      data-magnetic-strength={strength.toString()}
      data-magnetic-label={label}
      data-magnetic-color={color}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={(e) => {
        console.log('MagneticButton clicked', e);
        onClick?.();
      }}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-400/20 to-primary-600/20"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
} 