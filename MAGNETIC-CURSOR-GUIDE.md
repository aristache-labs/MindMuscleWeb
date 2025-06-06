# Magnetic Cursor Effects

A comprehensive magnetic cursor system built with Framer Motion that creates interactive, attractive cursor effects throughout your application.

## 🎯 Features

- **Magnetic Cursor**: Custom cursor that follows mouse movements and reacts to magnetic elements
- **Magnetic Elements**: Versatile components that attract the cursor
- **Magnetic Buttons**: Pre-styled button components with magnetic properties
- **Magnetic Areas**: Large interactive zones with subtle magnetic effects
- **TypeScript Support**: Full type safety and IntelliSense support
- **Performance Optimized**: Smooth 60fps animations with spring physics

## 🚀 Quick Start

### 1. Setup Magnetic Cursor

Wrap your application with the `MagneticCursor` component:

```tsx
// app/layout.tsx
import { MagneticCursor } from '@/components/ui/MagneticCursor';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MagneticCursor>
          {children}
        </MagneticCursor>
      </body>
    </html>
  );
}
```

### 2. Add Magnetic Elements

```tsx
import { MagneticElement, MagneticButton, MagneticArea } from '@/components/ui/MagneticElement';

// Basic magnetic element
<MagneticElement
  as="div"
  strength={0.3}
  label="Hover me!"
  color="#3b82f6"
>
  <h2>Magnetic Title</h2>
</MagneticElement>

// Magnetic button
<MagneticButton
  variant="primary"
  size="large"
  strength={0.4}
  label="Click me"
  onClick={() => console.log('Clicked!')}
>
  Get Started
</MagneticButton>

// Large magnetic area
<MagneticArea
  strength={0.1}
  distance={300}
  label="Interactive Zone"
>
  <div className="p-12">
    <h3>Large Interactive Area</h3>
    <p>This entire area has magnetic properties</p>
  </div>
</MagneticArea>
```

## 📚 Component API

### MagneticCursor

The main cursor component that handles magnetic interactions.

```tsx
interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
```

### MagneticElement

Versatile component that can wrap any content and make it magnetic.

```tsx
interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;        // 0.1 - 1.0, default: 0.4
  distance?: number;        // Detection distance in px, default: 150
  disabled?: boolean;
  label?: string;          // Tooltip text
  color?: string;          // Cursor color when hovering
  as?: 'div' | 'button' | 'a' | 'span';
  href?: string;           // For links
  onClick?: () => void;
  onMagnetEnter?: () => void;
  onMagnetLeave?: () => void;
  spring?: {
    stiffness?: number;    // Default: 150
    damping?: number;      // Default: 15
    mass?: number;         // Default: 0.1
  };
}
```

### MagneticButton

Pre-styled button component with magnetic effects.

```tsx
interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'small' | 'medium' | 'large';
  strength?: number;
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
  color?: string;
}
```

### MagneticArea

Large interactive zones with subtle magnetic effects.

```tsx
interface MagneticAreaProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;       // Default: 0.2
  distance?: number;       // Default: 200
}
```

## 🎨 Customization

### Magnetic Strength

Control how strongly elements attract the cursor:

```tsx
// Subtle attraction
<MagneticElement strength={0.1}>Gentle</MagneticElement>

// Moderate attraction
<MagneticElement strength={0.3}>Moderate</MagneticElement>

// Strong attraction
<MagneticElement strength={0.6}>Strong</MagneticElement>
```

### Detection Distance

Control how close the cursor needs to be to trigger the effect:

```tsx
// Small detection radius
<MagneticElement distance={80}>Close Range</MagneticElement>

// Large detection radius
<MagneticElement distance={250}>Wide Range</MagneticElement>
```

### Spring Physics

Customize the animation feel:

```tsx
<MagneticElement
  spring={{
    stiffness: 200,  // Snappier response
    damping: 25,     // Less bounce
    mass: 0.5        // Heavier feel
  }}
>
  Custom Physics
</MagneticElement>
```

### Cursor Customization

Add labels and colors to the cursor:

```tsx
<MagneticElement
  label="Download App"
  color="#10b981"  // Green cursor
>
  App Store Button
</MagneticElement>
```

## 🎯 Best Practices

### 1. Use Appropriate Strengths

- **Text elements**: 0.1 - 0.2
- **Buttons**: 0.3 - 0.5
- **Large interactive areas**: 0.1 - 0.3
- **Special call-to-action**: 0.4 - 0.6

### 2. Consider Performance

- Use magnetic effects sparingly on pages with many elements
- Disable on mobile devices if needed:

```tsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

<MagneticCursor disabled={isMobile}>
  {children}
</MagneticCursor>
```

### 3. Accessibility

- Ensure magnetic effects don't interfere with keyboard navigation
- Provide alternative interactions for users who disable motion:

```tsx
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

<MagneticElement disabled={prefersReducedMotion}>
  Content
</MagneticElement>
```

### 4. Visual Hierarchy

Use stronger magnetic effects for more important elements:

```tsx
// Primary CTA - Strong magnetism
<MagneticButton strength={0.5} variant="primary">
  Get Started
</MagneticButton>

// Secondary action - Moderate magnetism
<MagneticButton strength={0.3} variant="outline">
  Learn More
</MagneticButton>

// Text link - Subtle magnetism
<MagneticElement strength={0.1} as="a">
  Terms of Service
</MagneticElement>
```

## 🛠 Hooks

### useMagneticCursor

Hook for custom magnetic cursor implementation:

```tsx
import { useMagneticCursor } from '@/hooks/useMagneticCursor';

const { cursorState, isEnabled } = useMagneticCursor({
  enabled: true,
  strength: 0.3,
  stiffness: 150,
  damping: 15
});
```

### useMagneticElement

Hook for manually registering magnetic elements:

```tsx
import { useMagneticElement } from '@/hooks/useMagneticCursor';

const ref = useRef<HTMLDivElement>(null);
const { isRegistered } = useMagneticElement(ref, {
  strength: 0.4,
  label: 'Custom Element',
  color: '#3b82f6'
});
```

## 🎮 Demo

Visit `/magnetic-demo` to see all magnetic cursor effects in action.

## 🔧 Troubleshooting

### Cursor not appearing

- Ensure `MagneticCursor` wraps your app
- Check that `cursor: none` isn't overridden by other CSS

### Elements not magnetic

- Verify elements have `data-magnetic` attribute
- Check if `disabled` prop is set to `true`
- Ensure elements are within the detection distance

### Performance issues

- Reduce the number of magnetic elements on a single page
- Lower spring stiffness values
- Use larger `distance` values to reduce calculation frequency

## 📱 Mobile Considerations

The magnetic cursor is automatically disabled on touch devices. For mobile-specific interactions, consider using:

- Haptic feedback
- Scale animations on touch
- Alternative visual feedback

```tsx
// Example mobile-aware component
const isTouchDevice = 'ontouchstart' in window;

<MagneticElement disabled={isTouchDevice}>
  {content}
</MagneticElement>
```

## 🎨 Examples

Check out these integration examples:

- **Hero Section**: Enhanced CTA buttons with magnetic effects
- **Navigation**: Subtle magnetic menu items
- **Cards**: Interactive content cards with attraction
- **Forms**: Magnetic submit buttons and input focus
- **Gallery**: Magnetic image hover effects

## 📄 License

This magnetic cursor system is part of the MindMuscle project and follows the same licensing terms. 