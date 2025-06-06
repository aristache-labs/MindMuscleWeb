'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CursorState {
  isHidden: boolean;
  isPointer: boolean;
  isText: boolean;
  isMagnetic: boolean;
  size: 'small' | 'medium' | 'large';
  label?: string;
  color?: string;
}

interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function MagneticCursor({ children, className, disabled = false }: MagneticCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>({
    isHidden: false,
    isPointer: false,
    isText: false,
    isMagnetic: false,
    size: 'medium',
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for magnetic elements
      const magneticElement = target.closest('[data-magnetic]');
      const magneticButton = target.closest('button[data-magnetic]');
      const magneticLink = target.closest('a[data-magnetic]');
      
      if (magneticElement || magneticButton || magneticLink) {
        const element = (magneticElement || magneticButton || magneticLink) as HTMLElement;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Apply magnetic attraction
        const strength = parseFloat(element.dataset.magneticStrength || '0.3');
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        const maxDistance = Math.max(rect.width, rect.height) * 1.5;
        
        if (distance < maxDistance) {
          const force = 1 - (distance / maxDistance);
          const pullX = (centerX - e.clientX) * force * strength;
          const pullY = (centerY - e.clientY) * force * strength;
          
          mouseX.set(e.clientX + pullX);
          mouseY.set(e.clientY + pullY);
          
          setCursorState(prev => ({
            ...prev,
            isMagnetic: true,
            size: 'large',
            label: element.dataset.magneticLabel,
            color: element.dataset.magneticColor,
          }));
        } else {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          setCursorState(prev => ({ ...prev, isMagnetic: false, size: 'medium', label: undefined }));
        }
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        setCursorState(prev => ({ ...prev, isMagnetic: false, size: 'medium', label: undefined }));
      }

      // Check cursor type based on element
      const isClickable = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');
      const isText = target.closest('p, span, h1, h2, h3, h4, h5, h6, input, textarea');
      
      setCursorState(prev => ({
        ...prev,
        isPointer: !!isClickable,
        isText: !!isText && !isClickable,
      }));
    };

    const handleMouseEnter = () => {
      setCursorState(prev => ({ ...prev, isHidden: false }));
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, isHidden: true }));
    };

    const handleMouseDown = () => {
      setCursorState(prev => ({ ...prev, size: 'small' }));
    };

    const handleMouseUp = () => {
      setCursorState(prev => ({ ...prev, size: cursorState.isMagnetic ? 'large' : 'medium' }));
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [disabled, mouseX, mouseY, cursorState.isMagnetic]);

  const getCursorSize = () => {
    switch (cursorState.size) {
      case 'small': return 8;
      case 'medium': return 12;
      case 'large': return 20;
      default: return 12;
    }
  };

  const getCursorColor = () => {
    if (cursorState.color) return cursorState.color;
    if (cursorState.isMagnetic) return '#3b82f6'; // primary-500
    if (cursorState.isPointer) return '#06b6d4'; // cyan-500
    if (cursorState.isText) return '#8b5cf6'; // violet-500
    return '#ffffff';
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <div className={cn('cursor-none', className)}>
        {children}
      </div>
      
      {/* Custom Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y }}
        animate={{
          opacity: cursorState.isHidden ? 0 : 1,
          scale: cursorState.isPointer ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {/* Main cursor dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: getCursorSize(),
            height: getCursorSize(),
            backgroundColor: getCursorColor(),
            x: -getCursorSize() / 2,
            y: -getCursorSize() / 2,
          }}
          animate={{
            scale: cursorState.size === 'small' ? 0.5 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
        
        {/* Outer ring for magnetic state */}
        <AnimatePresence>
          {cursorState.isMagnetic && (
            <motion.div
              className="absolute border-2 rounded-full"
              style={{
                width: 40,
                height: 40,
                borderColor: getCursorColor(),
                x: -20,
                y: -20,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
        </AnimatePresence>

        {/* Label for magnetic elements */}
        <AnimatePresence>
          {cursorState.label && (
            <motion.div
              className="absolute whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded-md"
              style={{
                x: 25,
                y: -10,
              }}
              initial={{ opacity: 0, scale: 0.8, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: -10 }}
              exit={{ opacity: 0, scale: 0.8, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {cursorState.label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
} 