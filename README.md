# AI Fitness Landing Page

A premium, dark-themed landing page for an AI-powered fitness application built with Next.js 14, TypeScript, and Tailwind CSS. Features modern animations, responsive design, and a complete conversion funnel.

## 🚀 Features

- **Next.js 14** with App Router and TypeScript
- **Dark Theme Design** with gradient accents and glass-morphism effects
- **Responsive Layout** optimized for all device sizes
- **SEO Optimized** with Open Graph and Twitter Card metadata
- **Performance Optimized** with WebP/AVIF image formats
- **Animation Ready** with Framer Motion integration points
- **Form Integration** ready for Formspree email collection
- **Modern UI Components** with hover effects and transitions

## 🎨 Design System

### Colors
- **Primary Purple**: `#8B5CF6`
- **Secondary Purple**: `#7F56D9`
- **Neon Cyan**: `#22D3EE`
- **Dark Background**: `#0A0A10`
- **Dark Surface**: `#1A1A23`

### Typography
- **Body Font**: Inter (Google Fonts)
- **Heading Font**: Satoshi (Fontshare)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with dark theme & navigation
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles & Tailwind imports
│   ├── seo.config.ts       # SEO configuration
│   ├── privacy/page.tsx    # Privacy policy page
│   └── terms/page.tsx      # Terms of service page
├── components/
│   ├── common/
│   │   ├── Navbar.tsx      # Scroll-aware navigation bar
│   │   └── Footer.tsx      # Footer with legal links
│   └── sections/
│       ├── Hero.tsx        # Hero section with CTAs
│       ├── HowItWorks.tsx  # 3-step process explanation
│       ├── Features.tsx    # Feature grid with hover effects
│       ├── Showcase.tsx    # App preview with sticky phone mockup
│       ├── Testimonials.tsx # User testimonials carousel
│       └── FinalCTA.tsx    # Email signup with stats
public/
├── images/                 # Placeholder images & assets
└── robots.txt             # SEO robots configuration
```

## 🛠 Tech Stack

### Core Framework
- **Next.js 15.3.3** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework

### Dependencies
- **Framer Motion** - Animation library (ready for integration)
- **Lottie React** - Lottie animation support
- **@headlessui/react** - Unstyled, accessible UI components
- **@heroicons/react** - Beautiful hand-crafted SVG icons
- **next-seo** - SEO optimization utilities
- **keen-slider** - Touch slider with native scroll feel
- **@formspree/react** - Form handling service integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-fitness-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📱 Landing Page Sections

### 1. Hero Section
- **Two-column layout** with compelling headline
- **Gradient text effects** for key messaging
- **Dual CTAs** for beta signup and demo viewing
- **Phone mockup placeholder** for app preview

### 2. How It Works
- **Three-step process** explanation
- **Animated step indicators** with connecting lines
- **Icon placeholders** ready for custom graphics

### 3. Features
- **Responsive grid layout** (1-2-3 columns)
- **Hover effects** with transform animations
- **Feature highlights** with gradient badges
- **AI-focused messaging** (workout generation, form analysis, progress tracking)

### 4. App Showcase
- **Sticky phone mockup** on desktop
- **Coordinated scrolling** (ready for scroll-triggered animations)
- **Screenshot placeholders** for app interface previews
- **Progressive feature reveals**

### 5. Testimonials
- **Horizontal slider** with overflow scrolling
- **User avatars** with gradient backgrounds
- **5-star ratings** display
- **Gradient fade edges** for polish

### 6. Final CTA
- **Email capture form** with validation
- **Success/error states** built-in
- **Social proof stats** display
- **Gradient background** with glass-morphism card

## 🎯 Ready for Enhancement

Each component includes TODO comments for easy feature additions:

### Animation Integration Points
- **Framer Motion** entrance animations
- **Scroll-triggered** effects
- **Hover micro-interactions**
- **Page transition** animations

### Content Integration
- **Real app screenshots** replacement
- **Custom icon library** integration
- **Actual user testimonials**
- **Updated copy and messaging**

### Form Enhancement
- **Formspree integration** for email collection
- **Input validation** and error handling
- **Success confirmation** flows
- **Newsletter integration**

## 🎨 Customization

### Colors
Update the color palette in `tailwind.config.js`:
```javascript
colors: {
  'primary-purple': '#8B5CF6',
  'secondary-purple': '#7F56D9',
  'neon-cyan': '#22D3EE',
  'dark-bg': '#0A0A10',
  'dark-surface': '#1A1A23',
}
```

### Fonts
Modify font imports in `src/app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap');
```

### Content
Update messaging in individual component files:
- Brand name: Search and replace "YourAppName"
- Domain: Update "yourdomain.com" references
- Copy: Modify headlines and descriptions per component

## 📄 Legal Pages

Pre-built legal pages included:
- **Privacy Policy** (`/privacy`) - GDPR consideration framework
- **Terms of Service** (`/terms`) - Standard SaaS terms template

*Note: Legal content is template-only. Consult legal counsel for production use.*

## 🚀 Deployment

### Build Optimization
```bash
npm run build
```

Production build includes:
- **Static generation** for all pages
- **Image optimization** (WebP/AVIF)
- **CSS optimization** and minification
- **JavaScript bundling** and tree-shaking

### Deployment Platforms
- **Vercel** - Zero-config deployment
- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack deployment
- **Custom server** - Node.js compatible

## 📊 Performance

Current build stats:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    3.94 kB  105 kB
├ ○ /privacy                             138 B    101 kB  
└ ○ /terms                               138 B    101 kB
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework  
- **Vercel** - Deployment and hosting platform
- **Fontshare** - Beautiful typography (Satoshi font)
- **Google Fonts** - Web font service (Inter font)

---

Built with ❤️ for the future of AI-powered fitness
