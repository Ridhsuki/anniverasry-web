# Interactive Cinematic Anniversary Website

A cinematic, interactive anniversary web experience built with Next.js. The project presents a personal love story through a sequence of handcrafted scenes — each with its own visual identity, animated transitions, and audio design — modeled after a vintage scrapbook aesthetic.

---

## Features

| Feature | Description |
|---------|-------------|
| **Cinematic scene navigation** | Seven distinct, fullscreen scenes with cross-fade and ink-wash transitions. |
| **GSAP animation system** | All entrance, exit, and ambient animations powered by GSAP 3 with ScrollTrigger and custom timelines. |
| **Smooth scrolling** | Lenis-driven smooth scrolling with native scroll position synced to scene state. |
| **Custom cursor** | Adaptive cursor that changes appearance over paper elements and interactive controls. |
| **Immersive audio** | Per-scene background tracks, a user-driven playlist, UI sound effects, and global mute control via Howler.js. |
| **Gallery lightbox** | Full-screen photo viewer with keyboard and touch navigation. |
| **Interactive gift reveal** | Animated wax-seal envelope that unseals and reveals a keepsake on interaction. |
| **Responsive layout** | Mobile-first design tested across 320 px – 1920 px viewports. |
| **Accessibility** | ARIA labels, keyboard navigation, focus management, and `prefers-reduced-motion` support. |

---

## Tech Stack

### Framework
- **Next.js 16.3.6** – App Router, static export via Netlify adapter.
- **React 19** – Component model and hooks.
- **TypeScript 5** – Strict-mode type checking throughout.

### Styling
- **Tailwind CSS v4** – Utility-first, configured via PostCSS.

### Animation
- **GSAP 3 + `@gsap/react`** – Core animation engine.
- **Lenis 1.x** – Smooth-scroll integration synced with GSAP ticker.
- **Framer Motion 12** – Supplementary declarative transitions.

### Audio
- **Howler.js 2.2.4** – Cross-browser audio management, volume fading, and track switching.

### Testing
- **Vitest 5** – Unit and component test runner.
- **React Testing Library 16** – DOM interaction testing.
- **Testing Library User Event 14** – Realistic user-event simulation.

### Deployment
- **Netlify** – CI/CD pipeline connected to the GitHub repository.

---

## Architecture Overview

### SceneManager (`src/components/scenes/SceneManager.tsx`)
The top-level orchestrator. Renders the active scene, manages scene transitions (cross-fade + ink-wash), and exposes scene navigation imperatively via `ExperienceContext`.

### ExperienceContext (`src/context/`)
A React Context that provides:
- Current scene identifier and transition state.
- Navigation helpers: `goToScene(id)`, `goBack()`.
- Shared flags (e.g., `isTransitioning`).

All scenes consume this context to trigger navigation without prop-drilling.

### Scene System

| Scene | Route Key | Description |
|-------|-----------|-------------|
| `IntroScene` | `intro` | Opening credits with cinematic text reveal. |
| `SelectionScene` | `selection` | Hub scene — user picks an experience artifact. |
| `JourneyScene` | `journey` | Scrollable timeline of the relationship. |
| `GalleryScene` | `gallery` | Polaroid-style photo gallery with lightbox. |
| `PlaylistScene` | `playlist` | Vinyl-record UI for playing a curated song list. |
| `GiftScene` | `gift` | Animated envelope with wax-seal reveal. |
| `FinalLetterScene` | `final-letter` | Handwritten-style farewell letter. |

Scenes are co-located with their GSAP timelines and are mounted/unmounted by `SceneManager`. Each scene receives an `isActive: boolean` prop to coordinate enter/exit animations and audio state.

---

## Project Structure

```
anniverasry-web/
├── src/
│   ├── app/                    # Next.js App Router entry point, layout, globals
│   ├── animations/             # Shared GSAP timeline factories
│   ├── assets/                 # Static asset references (SVGs, etc.)
│   ├── components/
│   │   ├── scenes/             # Scene components (SceneManager + 7 scenes)
│   │   ├── sections/           # Sub-sections composed inside scenes
│   │   ├── shared/             # Cross-scene UI (AudioControls, CustomCursor…)
│   │   └── ui/                 # Generic design-system primitives (Button, Modal…)
│   ├── constants/              # Tokens (colors, breakpoints), audio IDs, site meta
│   ├── context/                # ExperienceContext provider and hook
│   ├── data/                   # Static content (gallery photos, playlist tracks…)
│   ├── hooks/                  # Custom React hooks (useAudio, useLenis, useGSAP…)
│   ├── lib/                    # Singleton utilities (AudioManager, Lenis init…)
│   ├── styles/                 # Additional global CSS
│   ├── test/                   # Vitest test suites
│   ├── types/                  # Shared TypeScript interfaces and enums
│   └── utils/                  # Pure helper functions
├── public/
│   ├── audio/                  # All audio assets (bgm/, sfx/, playlist tracks)
│   ├── images/                 # Scene images organised by scene name
│   ├── fonts/                  # Self-hosted web fonts
│   └── decorations/            # SVG decorative elements
├── docs/                       # Project documentation (see docs/README.md)
├── reports/                    # Lighthouse audit reports
├── netlify.toml                # Netlify build configuration
├── next.config.ts              # Next.js configuration
└── vitest.config.mts           # Vitest configuration
```

---

## Development Setup

### Requirements
- **Node.js** ≥ 22 (tested on v22.22.0)
- **npm** ≥ 11 (tested on v11.15.0)

### Installation

```bash
git clone <repository-url>
cd anniverasry-web
npm install
```

### Development

```bash
npm run dev
```

Opens the dev server at `http://localhost:3000` with Turbopack hot-reload.

### Validation (type-check + lint + tests + build)

```bash
npm run validate
```

All four steps must pass before merging or deploying.

### Production Build

```bash
npm run build       # Creates optimised .next/ output
npm run start       # Serves the production build locally
```

### Individual Commands

| Command | Purpose |
|---------|---------|
| `npm run lint` | ESLint (Next.js + import rules) |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Prettier formatting |
| `npm run type-check` | TypeScript type checking only |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Vitest in watch mode |

---

## Deployment

This project deploys automatically to **Netlify** via GitHub integration.

### Build Configuration (`netlify.toml`)

```toml
[build]
  command   = "npm run build"
  publish   = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Automatic Deploy Flow

1. Push commits to the `main` branch.
2. Netlify detects the push and runs `npm run build`.
3. On success, the new deployment is promoted to the production URL.
4. On failure, the previous deployment remains live.

### Environment Variables

No secret environment variables are required for the base application. If you add third-party integrations, set them in **Netlify → Site Settings → Environment Variables**.

### Rollback

To roll back to a previous deployment: **Netlify Dashboard → Deploys → select a prior deploy → Publish deploy**.

---

## Documentation Guide

All technical documentation lives in [`docs/`](./docs/):

| Document | Purpose |
|----------|---------|
| [`docs/README.md`](./docs/README.md) | Documentation index and reading order |
| [`docs/design-spec.md`](./docs/design-spec.md) | Visual identity, color palette, typography |
| [`docs/scene-architecture.md`](./docs/scene-architecture.md) | Scene component specs and state contracts |
| [`docs/animation-system.md`](./docs/animation-system.md) | GSAP motion philosophy and timing standards |
| [`docs/development-guideline.md`](./docs/development-guideline.md) | Engineering standards and AI agent rules |
| [`docs/ASSET-MANAGEMENT.md`](./docs/ASSET-MANAGEMENT.md) | Asset naming, optimization, and replacement |
| [`docs/DEPLOYMENT-GUIDE.md`](./docs/DEPLOYMENT-GUIDE.md) | Full Netlify deployment reference |
| [`docs/MAINTENANCE-GUIDE.md`](./docs/MAINTENANCE-GUIDE.md) | Dependency updates, debugging, adding scenes |
| [`docs/phase-9-release-report.md`](./docs/phase-9-release-report.md) | Final production validation report |

---

## Asset Replacement Quick Guide

### Photos
Place images in `public/images/<scene-name>/` as `.webp` files.  
Update the corresponding data file in `src/data/` to reference the new filename.  
Target dimensions and quality levels are documented in [`docs/ASSET-MANAGEMENT.md`](./docs/ASSET-MANAGEMENT.md).

### Background Music
Replace `public/audio/bgm/` files.  
The active BGM track ID is defined in `src/constants/audio.ts` (`MAIN_BGM_TRACK_ID`).  
Do **not** rename the file without updating the constant.

### Playlist Songs
Add or replace files in `public/audio/` (the root playlist files, e.g. `soundtrack-*.mp3`).  
Update `src/data/` playlist track registry to match.

### Sound Effects
Replace files in `public/audio/sfx/`.  
SFX identifiers are registered in `src/constants/audio.ts` — keep IDs in sync.

---

## License

Private project. All content and media are personal and not for redistribution.
