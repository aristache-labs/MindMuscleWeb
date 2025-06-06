'use client';

import { useEffect, useState } from 'react';

interface MagneticCursorConfig {
  enabled?: boolean;
  strength?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

interface CursorState {
  isActive: boolean;
  position: { x: number; y: number };
  magneticElement: HTMLElement | null;
}

export function useMagneticCursor(config: MagneticCursorConfig = {}) {
  const {
    enabled = true,
    strength = 0.3,
    stiffness = 150,
    damping = 15,
    mass = 0.1,
  } = config;

  const [cursorState, setCursorState] = useState<CursorState>({
    isActive: false,
    position: { x: 0, y: 0 },
    magneticElement: null,
  });

  useEffect(() => {
    if (!enabled) return;

    const updateCursorState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-magnetic]') as HTMLElement;

      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        const maxDistance = Math.max(rect.width, rect.height) * 1.5;
        const elementStrength = parseFloat(magneticElement.dataset.magneticStrength || strength.toString());
        
        if (distance < maxDistance) {
          const force = 1 - (distance / maxDistance);
          const pullX = (centerX - e.clientX) * force * elementStrength;
          const pullY = (centerY - e.clientY) * force * elementStrength;
          
          setCursorState({
            isActive: true,
            position: {
              x: e.clientX + pullX,
              y: e.clientY + pullY,
            },
            magneticElement,
          });
        } else {
          setCursorState({
            isActive: false,
            position: { x: e.clientX, y: e.clientY },
            magneticElement: null,
          });
        }
      } else {
        setCursorState({
          isActive: false,
          position: { x: e.clientX, y: e.clientY },
          magneticElement: null,
        });
      }
    };

    document.addEventListener('mousemove', updateCursorState);
    
    return () => {
      document.removeEventListener('mousemove', updateCursorState);
    };
  }, [enabled, strength]);

  return {
    cursorState,
    isEnabled: enabled,
    config: { strength, stiffness, damping, mass },
  };
}

// Hook for detecting magnetic elements
export function useMagneticDetection() {
  const [magneticElements, setMagneticElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const updateMagneticElements = () => {
      const elements = Array.from(document.querySelectorAll('[data-magnetic]')) as HTMLElement[];
      setMagneticElements(elements);
    };

    // Initial scan
    updateMagneticElements();

    // Watch for DOM changes
    const observer = new MutationObserver(updateMagneticElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-magnetic'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return magneticElements;
}

// Hook for magnetic element registration
export function useMagneticElement(
  ref: React.RefObject<HTMLElement>,
  options: {
    strength?: number;
    label?: string;
    color?: string;
    enabled?: boolean;
  } = {}
) {
  const { strength = 0.3, label, color, enabled = true } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    element.setAttribute('data-magnetic', 'true');
    element.setAttribute('data-magnetic-strength', strength.toString());
    
    if (label) {
      element.setAttribute('data-magnetic-label', label);
    }
    
    if (color) {
      element.setAttribute('data-magnetic-color', color);
    }

    return () => {
      if (element) {
        element.removeAttribute('data-magnetic');
        element.removeAttribute('data-magnetic-strength');
        element.removeAttribute('data-magnetic-label');
        element.removeAttribute('data-magnetic-color');
      }
    };
  }, [ref, strength, label, color, enabled]);

  return { isRegistered: enabled };
} 