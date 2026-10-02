# Phase 6A Production Audit Report

> **Document Status:** Complete Baseline Production Audit  
> **Evaluation Date:** October 2026  
> **Target Release:** Production Keepsake Showcase  
> **Governing Specifications:** `docs/development-guideline.md`, `docs/design-spec.md`, `docs/asset-strategy.md`

---

## 1. Current Production Status

### 1.1 Application Status
The application is **feature-complete**. All narrative chapters (Scenes 1 through 7) are fully integrated into a unified state and animation pipeline:
- **Scene 1: Intro** (`IntroScene.tsx`) — Luminous opening envelope with 3D skeuomorphic folding, floating couple portraits, and wax seal interaction.
- **Scene 2: Selection** (`SelectionScene.tsx`) — Four interactive physical artifacts (Camera / Journey, Pocket Watch / Moment, Vinyl Record / Playlist, Gift Box / Gift).
- **Scene 3: Journey** (`JourneyScene.tsx`) — Chronological relationship timeline with media playback integration and smooth scrolling.
- **Scene 4: Gallery** (`GalleryScene.tsx`) — Scrapbook polaroid photo wall with interactive spring lightbox and metadata reveals.
- **Scene 5: Playlist** (`PlaylistScene.tsx`) — Candlelit music room with rotating vinyl player, Indonesian love letter, and audio scrubbing.
- **Scene 6: Gift** (`GiftScene.tsx`) — Sealed royal envelope over floral keepsake bed with 4-stage GSAP starlight bloom reveal.
- **Scene 7: Final Letter** (`FinalLetterScene.tsx`) — Full-screen handwritten keepsake narrative with keepsake polaroid and replay actions.

### 1.2 Completed Phases
| Phase | Scope | Status |
|---|---|---|
| **Phase 1–3** | Architecture, Foundation, Core Design Tokens, ExperienceProvider, SceneManager, Audio Architecture | ✅ Completed |
| **Phase 4A–4G** | Visual Implementations for all 7 narrative scenes | ✅ Completed |
| **Phase 5B** | Global Cinematic Refinement (scene transitions, flicker prevention, Lenis setup) | ✅ Completed (`3be3618`) |
| **Phase 5C** | Media Asset Pipeline & Directory Standardization | ✅ Completed (`03151b8`) |
| **Phase 5D** | Performance Optimization & Production Readiness | ✅ Completed (`5a11af8`) |
| **Phase 5E** | UX Bug Fixes, Global Scrollbar, Cinematic Color Overlay, Bloom Rework | ✅ Completed (`5675f18`) |
| **Phase 5F** | Visual Calibration (Intro Envelope 3D Geometry, Selection Routing Fix, Mobile Responsive Polish) | ✅ Completed (`dcde96c`) |

### 1.3 Compilation & Build Status
- **TypeScript (`npm run type-check`):** PASS (0 errors, strict mode enabled with `noUnusedLocals` and `noUnusedParameters`).
- **ESLint (`npm run lint`):** PASS (0 errors, 0 warnings, Next.js 16 core web vitals and strict react rules).
- **Next.js Production Build (`npm run build`):** PASS
  - Compiler: Next.js 16.3.6 (Turbopack engine)
  - Compilation Time: ~1.5s
  - Static Pre-rendering: 6/6 static routes (`/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`)
  - CSS Optimization: Enabled (`optimizeCss: true`)

### 1.4 Deployment Readiness
- **Hosting Target:** Vercel / Netlify / Node.js standalone container.
- **Static Assets:** Completely self-contained under `public/`.
- **Environment:** Clean fallback defaults defined in `src/constants/site.ts` for headless or offline execution.

---

## 2. Lighthouse Baseline

> **Notice:** *Pending actual Lighthouse browser measurement (headless Chrome / CI measurement pending deployment or staging server execution).*  
> Below is a rigorous code-level architecture estimation based on current bundle contents, DOM composition, asset weights, and accessibility attributes.

| Category | Estimated Baseline Score | Target Score | Primary Influencing Factors |
|---|---|---|---|
| **Performance** | **86 – 92** | **95+** | + Next.js static prerendering, WebP/AVIF images, GPU-accelerated transforms.<br>- Client-heavy hydration (all interactive scenes are `"use client"`), 116MB uncompressed audio assets on disk, GSAP/Lenis runtime overhead. |
| **Accessibility (a11y)** | **80 – 86** | **98+** | + Keyboard focus rings (`focus-visible:ring-gold`), high contrast text on parchment, Lightbox ESC trap.<br>- Missing `aria-label` on navigation buttons, missing skip-to-content landmark. |
| **Best Practices** | **92 – 96** | **100** | + Clean console output in production, modern DOCTYPE, no deprecated APIs, modern image formats.<br>- Redundant duplicate audio assets in `/public/audio/`. |
| **SEO** | **90 – 95** | **100** | + Canonical sitemap, dynamic robots.ts, OpenGraph / Twitter metadata.<br>~ Intentional `robots: { index: false }` for personal keepsake privacy. |

---

## 3. Performance Audit

### 3.1 Image Optimization
- **Next.js `<Image />` Implementation:**
  - Standardized across all scenes (`IntroScene`, `JourneyScene`, `GalleryScene`, `PlaylistScene`, `FinalLetterScene`, `TimelineItem`, `PhotoGalleryItem`, `GalleryLightbox`, `LetterPaper`, `GiftContentPanel`).
  - Next.js Image optimization pipeline configured in `next.config.ts` for modern formats: `formats: ["image/avif", "image/webp"]`.
  - Responsive `sizes` attributes explicitly specified on responsive containers (e.g. `sizes="(max-width: 640px) 100vw, 512px"`).
  - High-priority above-the-fold image (`photo-intro-couple-standing.webp`) configured with `priority={true}` in `IntroScene.tsx`.
- **Opportunities for Optimization:**
  - Images currently load without low-res blur placeholders (`placeholder="blur"`). Adding small base64 inline blur hashes will eliminate visual layout pop-in during slower network conditions.

### 3.2 Bundle Size & Dependencies
- **Core Runtime Packages:**
  - `next`: `16.3.6` (App Router)
  - `react` / `react-dom`: `19.2.8`
  - `gsap`: `^3.15.0` (Tweening & ScrollTrigger)
  - `@gsap/react`: `^2.1.2` (Official React integration)
  - `lenis`: `^1.3.26` (Smooth scrolling singleton)
  - `howler`: `^2.2.4` (Audio streaming & sound effects)
  - `tailwindcss`: `^4` (Zero-runtime utility CSS engine)
- **Dependency Audit Findings:**
  - `framer-motion` (`^12.43.0`) is listed in `package.json` and referenced in `src/animations/transitions.ts`. However, actual scene transitions and component animations throughout the entire project are powered strictly by **GSAP** (`useGSAP`). Keeping `framer-motion` in dependencies creates dead bundle weight risk if any transition is accidentally imported.

### 3.3 Client / Server Component Boundaries
- **Server Components:**
  - `src/app/layout.tsx` (Metadata, Google Fonts injection, HTML root).
  - `src/app/page.tsx` (Root page shell wrapping `ExperienceProvider` and `SceneManager`).
  - `src/app/robots.ts` & `src/app/sitemap.ts` (Static route handlers).
- **Client Components:**
  - 26 client component files out of 68 total TypeScript source files.
  - Required because the experience relies on real-time user gestures, DOM layout queries, Howler Web Audio, GSAP canvas/DOM manipulators, and Lenis scroll listeners.
  - All interactive scenes appropriately specify `"use client"` at their boundaries.

### 3.4 Animation Performance & GSAP Lifecycle
- **Zero Reflow Standard:**
  - Strictly enforced across all tweens: animations mutate exclusively `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. Geometry properties (`width`, `height`, `margin`, `padding`) are never animated.
  - Any animated element is tagged with `.gpu-accelerated` (`transform: translateZ(0); backface-visibility: hidden;`).
- **Context Cleanup & Memory Integrity:**
  - Wrapped inside the custom `useGSAP` hook (`src/hooks/useGSAP.ts`), which registers plugins and encapsulates tweens inside `gsap.context()`.
  - When a scene unmounts or its dependency triggers re-render, `ctx.revert()` is called automatically, killing tweens and ScrollTriggers to eliminate memory leaks.

### 3.5 Lenis Smooth Scroll Lifecycle
- Lenis smooth scrolling is instantiated as a singleton via `initLenis()` in `src/context/ExperienceContext.tsx` and synchronized directly with the GSAP RAF ticker (`gsap.ticker.add`).
- Scene transitions trigger immediate scroll reset (`scrollTo(0, { immediate: true })`), preventing lingering scroll offsets between narrative acts.
- Cleanly destroyed upon unmount with `destroyLenis()`.
- Responsive & accessibility guard: `prefers-reduced-motion` check disables smooth scrolling for users requesting reduced motion.

### 3.6 Audio Loading Strategy & Storage Optimization
- **Playback Architecture:**
  - Managed by `AudioManager` singleton (`src/lib/audio.ts`) with dual loading modes:
    - **Soundtracks (BGM):** Loaded with `html5: true` for on-demand streaming over HTTP without blocking JavaScript execution.
    - **Sound Effects (SFX):** Short audio clips loaded into Web Audio buffers for instant zero-latency playback.
  - Mobile audio context unlock strategy properly registered on first `pointerdown` / `keydown` event.
- **Audio Asset Redundancy Finding:**
  - Total `public/audio/` directory size is **116MB** across 36 `.mp3` files.
  - Inspection revealed **18 duplicate audio files** in the root `public/audio/` folder that duplicate the canonical files located in `public/audio/bgm/` (11 files) and `public/audio/sfx/` (7 files).
  - Removing root duplicates will cut static asset weight by **~58MB** without affecting playback.

---

## 4. Accessibility Audit

### 4.1 Semantic HTML
- Major layout landmarks present: `<main>` in `src/app/page.tsx` and scene structures utilizing `<header>`, `<main>`, and `<section>`.
- The gallery modal in `GalleryLightbox.tsx` uses `<div role="dialog" aria-modal="true" aria-label="...">`.
- **Finding:** Lack of a "Skip to main content" link for keyboard-only assistive technology users.

### 4.2 Keyboard Navigation
- Interactive scrapbook elements (`PhotoGalleryItem`, `TimelineItem`, `VinylPlayer`, `TrackItem`, `GiftBox`) have `tabIndex={0}`.
- Modal dialog (`GalleryLightbox.tsx`) listens for the `Escape` key to dismiss.
- Scrub bar in `AudioControls.tsx` has `role="slider"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.

### 4.3 ARIA Labels & Form Elements
- **Finding (High Priority):** Several buttons lack explicit `aria-label` attributes, causing screen readers to announce uninformative button roles:
  1. `FinalLetterScene.tsx:189`: "BACK ◂" button.
  2. `GalleryScene.tsx:336`: "BACK ◂" button.
  3. `GalleryScene.tsx:392`: "EXPLORE THE PLAYLIST ➔" advance button.
  4. `GiftScene.tsx:213`: "BACK ◂" button.
  5. `GiftScene.tsx:249`: Initial gift advance trigger button.
  6. `JourneyScene.tsx:396`: "BACK ◂" button.
  7. `JourneyScene.tsx:577`: "EXPLORE THE MOMENTS ➔" advance button.
  8. `PlaylistScene.tsx:361`: "BACK ◂" button.
  9. `PlaylistScene.tsx:512`: "UNWRAP YOUR GIFT ➔" advance button.
  10. `SelectionScene.tsx:437`: Artifact card trigger buttons.
  11. `SelectionScene.tsx:484`: "TAP FOR SURPRISE" global CTA button.
- Decorative SVGs (butterflies, floral bouquets, sparkles, wax seals) properly utilize `aria-hidden="true"`.

### 4.4 Focus States
- Global `:focus-visible` rule in `globals.css` specifies `outline: 2px solid var(--color-gold)`.
- Key interactive items feature explicit Tailwind classes: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`.

### 4.5 Reduced Motion Support
- Tailwind / CSS media query `@media (prefers-reduced-motion: reduce)` added in `globals.css`.
- `FloatingDecoration.tsx` detects `prefers-reduced-motion` and suppresses physics-driven floating animations.
- `lenis.ts` checks `window.matchMedia("(prefers-reduced-motion: reduce)")` to bypass smooth scroll interpolation.

---

## 5. SEO Audit

### 5.1 Metadata & Headers
- Canonical metadata configured in `src/app/layout.tsx`:
  - `title` with template: `%s — Anniversary`
  - `description`: Set from `SITE_METADATA.description`
  - `metadataBase`: Configured with fallback URL
  - `icons`: Configured for `/favicon.ico`

### 5.2 Robots & Sitemap
- `src/app/robots.ts`: Generates dynamic robots configuration disallowing crawling (`disallow: "/"`) as intended for a private commemorative anniversary website, with sitemap linkage.
- `src/app/sitemap.ts`: Generates valid XML sitemap pointing to root URL with `monthly` change frequency and `priority: 1`.

### 5.3 Social Graph (OpenGraph & Twitter)
- OpenGraph configured in `layout.tsx` (`og:type`, `og:locale`, `og:url`, `og:title`, `og:description`, `og:site_name`).
- Twitter card configured (`twitter:card: "summary_large_image"`).

### 5.4 Structured Data Readiness
- The project currently does not embed a JSON-LD structured data block. While robots indexing is disallowed, adding an optional `CreativeWork` or `Event` schema will ensure maximum standards compliance for modern web evaluators.

---

## 6. Testing Strategy

### 6.1 Critical User Interactions Requiring Automated Verification
To ensure rock-solid stability across browser updates and future customizations, the following core interactions require automated tests:

1. **GalleryLightbox Lifecycle:**
   - Open photo A → verify modal is visible and DOM elements render.
   - Close photo A via ESC or close button → verify exit transition completes and modal unmounts.
   - Open photo B → verify stale `isClosing` and `imageError` states are reset and entrance animation fires cleanly.
2. **Scene Navigation & Routing (`ExperienceContext` & `SceneManager`):**
   - Verify `initialScene="intro"` renders `IntroScene`.
   - Verify selecting artifacts in `SelectionScene` navigates to target scenes:
     - `artifact-journey` → `"journey"`
     - `artifact-moment` → `"gallery"`
     - `artifact-playlist` → `"playlist"`
     - `artifact-gift` → `"gift"`
   - Verify URL hash synchronization (`#journey`, `#gallery`, etc.) correctly updates and reflects the active scene.
3. **Audio Subsystem Interaction:**
   - Verify BGM auto-sync switches tracks when scene changes.
   - Verify Mute toggle sets volume to 0 without throwing Howler errors.
   - Verify gesture unlock registers and detaches window listeners upon first interaction.
4. **Gift Reveal Sequence:**
   - Verify click on wax seal triggers `isOpening=true` and unseals envelope after timeout.
   - Verify `RevealEffect` bloom renders within `fixed inset-0` overlay without throwing DOM errors.
5. **Reduced Motion Adaptation:**
   - Verify that when `prefers-reduced-motion: reduce` matches, decorative particle loops remain static and Lenis disables smooth interpolation.

### 6.2 Recommended Testing Framework
- **Test Runner:** **Vitest** (Fast execution, native TypeScript and ESM support, minimal configuration overhead).
- **DOM Environment:** `jsdom` or `happy-dom`.
- **Component Testing:** `@testing-library/react` and `@testing-library/jest-dom`.
- **User Event Simulation:** `@testing-library/user-event`.

---

## 7. GitHub Actions Recommendation

A continuous integration (CI) workflow is recommended to guard code quality and catch regressions on every commit and pull request.

### Recommended Workflow File: `.github/workflows/ci.yml`
```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  validate:
    name: Type-Check, Lint & Build
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run TypeScript Type Check
        run: npm run type-check

      - name: Run ESLint
        run: npm run lint

      - name: Run Next.js Production Build
        run: npm run build
```

---

## 8. Priority Roadmap

### 8.1 Critical Priority (Blocker)
*No critical blockers identified. The application compiles cleanly with 0 TypeScript and 0 ESLint errors.*

### 8.2 High Priority
| ID | Issue | Impact | Recommended Action |
|---|---|---|---|
| **H1** | Missing `aria-label` attributes on Back and Advance buttons | Screen reader users encounter unlabeled button controls, directly penalizing Lighthouse Accessibility score. | Add descriptive `aria-label` attributes to all Back and Next/Advance buttons in `FinalLetterScene`, `GalleryScene`, `GiftScene`, `JourneyScene`, `PlaylistScene`, and `SelectionScene`. |
| **H2** | 18 duplicate audio files in `public/audio/` (~58MB redundant data) | Unnecessary repository and deployment payload weight. | Safely purge redundant root `.mp3` files in `/public/audio/`, ensuring references in `src/constants/audio.ts` point cleanly to canonical `/public/audio/bgm/` and `/public/audio/sfx/`. |

### 8.3 Medium Priority
| ID | Issue | Impact | Recommended Action |
|---|---|---|---|
| **M1** | Unused `framer-motion` dependency | Increases dependency maintenance footprint; risk of accidental import bloat. | Remove `framer-motion` from `package.json` and refactor `src/animations/transitions.ts` to pure GSAP transition definitions. |
| **M2** | Missing "Skip to Main Content" link | Keyboard accessibility deficiency for navigating past introductory elements. | Add visually-hidden, focusable skip link (`<a href="#main-content" className="sr-only focus:not-sr-only ...">`) in `layout.tsx`. |
| **M3** | Scene change screen reader announcement | Screen reader users are not audibly informed when a scene changes via client-side transition. | Add an invisible `aria-live="polite"` status announcer in `SceneManager.tsx` that announces the new scene title on change. |
| **M4** | Setup automated test suite | No automated testing currently verifies critical user flows against regression. | Install Vitest + React Testing Library and add baseline tests for `GalleryLightbox` and `ExperienceContext` navigation. |

### 8.4 Low Priority
| ID | Issue | Impact | Recommended Action |
|---|---|---|---|
| **L1** | Missing JSON-LD Schema markup | Minor SEO best practice gap. | Add lightweight structured data (`WebSite` or `CreativeWork`) script tag in `src/app/layout.tsx`. |
| **L2** | Next.js Image blur placeholders | Minor visual pop during image loading on high-latency connections. | Generate base64 blur hashes for canonical photo items to enable `placeholder="blur"`. |

---

## 9. Conclusion & Readiness

The codebase exhibits exceptional technical hygiene: strict TypeScript compliance, modern React 19 / Next.js 16 conventions, GPU-accelerated motion safety, and robust memory cleanup. 

**Readiness for Phase 6B:** **READY.**  
Phase 6B can directly address the identified High-Priority items (accessibility `aria-label` remediation and asset deduplication) without architectural friction.
