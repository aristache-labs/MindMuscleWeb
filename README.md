<div align="center">

<img src="public/favicon.svg" width="76" alt="MindMuscle">

# MindMuscle · Web

<em>AI-powered fitness · Personalized training · Built for your next rep.</em>

<br />

<a href="https://mindmuscle.app">mindmuscle.app</a>

<br />

<img src="showcase/MindMuscle%20Web%20%C2%B7%20Prezentare%401x.png" width="100%" alt="MindMuscle Web presentation">

<br />

![Stars](https://shields.io/github/stars/pateutz1/MindMuscleWeb?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Contributors](https://shields.io/github/contributors/pateutz1/MindMuscleWeb?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Last commit](https://shields.io/github/last-commit/pateutz1/MindMuscleWeb?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Issues](https://shields.io/github/issues/pateutz1/MindMuscleWeb?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Watchers](https://shields.io/github/watchers/pateutz1/MindMuscleWeb?style=flat-square&labelColor=0f6e68&color=76f5e1)

<strong>Next.js 15 &middot; React 19 &middot; TypeScript &middot; Tailwind CSS v4 &middot; Supabase waitlist</strong><br>
<sub>Animated product showcase, responsive layouts, referral tracking, and a waitlist backed by Supabase. Available checks and build commands are documented below.</sub>

<br />

[Stack](#stack) &middot; [The site](#the-site) &middot; [Local setup](#local-setup) &middot; [Admin panel](#admin-panel) &middot; [Deployment](#deployment)

<sub><b>Project documentation:</b> database setup and waitlist configuration live in <a href="README-SUPABASE-SETUP.md"><code>README-SUPABASE-SETUP.md</code></a>.</sub>

</div>

---

## Overview

MindMuscleWeb is the promotional website for MindMuscle, an AI-powered fitness app focused on personalized workouts, form analysis, and progress tracking. Built with Next.js, React, and TypeScript, the site introduces the product through animated sections, interactive app previews, and testimonials. Visitors can join a Supabase-backed waitlist, receive a referral code, and track their position and referral rewards. This repository contains the marketing website and waitlist API; the fitness features are presented as part of the app showcase.

## Table of Contents

- [MindMuscle · Web](#mindmuscle--web)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Stack](#stack)
  - [The site](#the-site)
  - [Architecture overview](#architecture-overview)
  - [Prerequisites](#prerequisites)
  - [Local setup](#local-setup)
    - [1. Clone and install](#1-clone-and-install)
    - [2. Environment variables](#2-environment-variables)
    - [3. Database setup](#3-database-setup)
    - [4. Git hooks](#4-git-hooks)
    - [5. Run the dev server](#5-run-the-dev-server)
  - [Commands](#commands)
  - [Admin panel](#admin-panel)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [License](#license)
  - [Support the project](#support-the-project)
  - [Connect](#connect)

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI library | [React 19](https://react.dev/) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer-motion.com/), [GSAP](https://gsap.com/), Lottie |
| Smooth scrolling | Lenis |
| Carousels | Embla Carousel |
| Icons | [Lucide React](https://lucide.dev/) |
| Database | PostgreSQL via [Supabase](https://supabase.com/) |
| Forms and validation | React Hook Form, Zod |
| Image processing | Sharp, Next.js Image |
| Analytics | Vercel Analytics, Speed Insights, next-plausible |
| Package manager | npm |
| Deployment configuration | [Netlify](https://www.netlify.com/) |

---

## The site

[mindmuscle.app](https://mindmuscle.app) is the project's configured site origin. The homepage is one scroll:

1. **Hero** - product introduction, calls to action, and an animated app preview.
2. **How it works** - the journey from setting up a profile to personalized training and progress tracking.
3. **Features** - the app's AI fitness capabilities and benefits.
4. **App preview** - an interactive showcase of the mobile experience.
5. **Testimonials** - feedback presented alongside the product story.
6. **Waitlist** - signup, referral sharing, and rewards.

Navigation links lead to the page sections. The footer provides contact and legal links, with dedicated `/privacy` and `/terms` pages.

---

## Architecture overview

- **App Router** - routes and metadata live in `src/app`; the homepage composes the navigation, product sections, and footer.
- **Section loading** - the hero loads immediately. Other homepage sections use React lazy imports and the shared `LazySection` component.
- **UI and motion** - reusable components live in `src/components/ui`; Framer Motion, GSAP, Lottie, and Lenis support animation and scrolling.
- **Waitlist API** - `/api/waitlist` handles signup and waitlist queries. `/api/waitlist/social` handles social-sharing activity.
- **Supabase** - `src/lib/supabase.ts` defines the client and database types. Signup records include referral, attribution, and reward fields.
- **Validation** - shared validation logic lives in `src/lib/validations.ts`.
- **Assets** - public images, screenshots, icons, and marketing assets live in `public/`. The README presentation lives in `showcase/`.
- **Build** - `npm run build` optimizes images, builds Next.js, and runs the public-asset copy script. `next.config.ts` configures image formats, caching, and bundle analysis.

---

## Prerequisites

- **Node.js 20** - matches the Netlify configuration; `package.json` declares Node.js ≥ 18.
- **npm** - install dependencies using the committed `package-lock.json`.
- A **Supabase project** with the waitlist tables, policies, and database functions required by the API.

---

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/pateutz1/MindMuscleWeb.git
cd MindMuscleWeb
npm ci
```

### 2. Environment variables

Create `.env.local` in the project root:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase public anonymous key; access is governed by database policies. |
| `ANALYZE` | Optional | Set to `true` to enable the bundle analyzer during a build. |

### 3. Database setup

Follow [README-SUPABASE-SETUP.md](README-SUPABASE-SETUP.md) for the initial waitlist schema, Row Level Security policies, and connection checks.

The current API also uses points, referral counts, social-sharing records, and the `award_referral_points` and `award_points` database functions. Check `src/lib/supabase.ts` and the routes in `src/app/api/waitlist/` against your Supabase schema: the initial setup guide does not cover every reward-related field and function used by those routes.

### 4. Git hooks

No project Git hooks are included. Run the relevant checks from [Commands](#commands) before opening a pull request.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Optimize images, create the production build, and copy public assets. |
| `npm run start` | Start the production server after building. |
| `npm run type-check` | Run TypeScript checks without emitting files. |
| `npm run lint` | Invoke the configured `next lint` script. |
| `npm run optimize-images` | Run the Sharp image-optimization script. |
| `npm run copy-public` | Run the public-asset copy script. |
| `npm run analyze` | Build with bundle analysis enabled in shells supporting inline environment variables. |
| `npm run build:profile` | Build Next.js with profiling enabled. |
| `npm run build:debug` | Build Next.js with debug output. |

For bundle analysis in PowerShell:

```powershell
$env:ANALYZE = 'true'
npm run build
Remove-Item Env:ANALYZE
```

No automated test script is currently defined in `package.json`.

---

## Admin panel

This repository does not include a website admin panel. Manage waitlist records and inspect database activity through the Supabase dashboard. Edit website content in the components under `src/components/sections/`.

See [README-SUPABASE-SETUP.md](README-SUPABASE-SETUP.md) for database monitoring queries and setup details.

---

## Deployment

The repository includes a [Netlify configuration](netlify.toml) using the Next.js plugin and Node.js 20.

1. Import [pateutz1/MindMuscleWeb](https://github.com/pateutz1/MindMuscleWeb) into Netlify.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the deployment environment.
3. Prepare the Supabase schema, policies, and reward functions required by the waitlist API.
4. Use `npm run build` as the build command, as configured in `netlify.toml`.
5. Verify the homepage, legal pages, waitlist signup, and referral flow after deployment.

The configured metadata origin is `https://mindmuscle.app`; update the site metadata and related URLs if deploying under a different domain.

---

## Contributing

Contributions are welcome. Fork the repository, create a branch, and open a [pull request][pulls] describing the change and how it was verified. Report bugs and suggest features through [Issues][issues].

## Contributors

Thanks to everyone who has contributed to MindMuscleWeb.

<a href="https://github.com/pateutz1/MindMuscleWeb/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pateutz1/MindMuscleWeb" alt="Contributors" />
</a>

## License

No license file is currently included in this repository. Contact the maintainer for reuse permissions.

## Support the project

Star the [repository][repo], report issues, or contribute improvements to the website and waitlist experience.

## Connect

<div align="center">

**Adrian Cristache** · [aristache.dev](https://www.aristache.dev)

<a href="https://github.com/pateutz1"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="https://mindmuscle.app"><img src="https://img.shields.io/badge/Site-0f6e68?style=for-the-badge&logo=googlechrome&logoColor=white" alt="MindMuscle" /></a>

</div>

[repo]: https://github.com/pateutz1/MindMuscleWeb
[issues]: https://github.com/pateutz1/MindMuscleWeb/issues
[pulls]: https://github.com/pateutz1/MindMuscleWeb/pulls
[contributors]: https://github.com/pateutz1/MindMuscleWeb/graphs/contributors
