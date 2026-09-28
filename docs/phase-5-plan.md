# Phase 5 Plan: Global Cinematic Polish & Technical Refinement

> **Document Status:** Authoritative Refinement Plan  
> **Source Documents:** `docs/README.md`, `docs/design-spec.md`, `docs/experience-flow.md`, `docs/scene-architecture.md`, `docs/animation-system.md`, `docs/asset-strategy.md`, `docs/final-audit.md`  
> **Scope:** Comprehensive audit findings and prioritized implementation roadmap for Phase 5. No application code modifications are executed in this audit phase.

---

## Executive Summary

A comprehensive technical and visual audit of all seven scenes (`IntroScene`, `SelectionScene`, `JourneyScene`, `GalleryScene`, `PlaylistScene`, `GiftScene`, `FinalLetterScene`) and the supporting architectural layers was conducted against the documentation and `docs/final-audit.md`.

While all functional scene components, data layers, and basic transitions compile cleanly with 0 TypeScript and ESLint errors, key polish and integration issues were identified:
1. **Scene Transition Synchrony:** Post-transition flickering/FOUC occurs because `isActive` state is toggled late after the container crossfade finishes, causing sudden element opacity resets.
2. **Smooth Scrolling (Lenis):** The Lenis smooth scroll engine is present in the codebase but was never initialized in the layout/application tree.
3. **Envelope Skeuomorphic Structure:** In `IntroScene`, the envelope lacks the open top triangular flap and backplate depicted in `intro-scene.png`.
4. **Gift Light Bloom:** In `GiftScene`, the opening light effect is bounded by an inner container with `overflow-hidden`, creating visible rectangular clipping.
5. **System Emojis:** Several components render raw OS emojis (`🌹`, `🥀`, `🌸`, `📍`, `🔇`, `🔊`) that look inconsistent across platforms.
6. **PaperCard Spacing:** Nested padding between `PaperCard`'s internal content slot and external caller utility classes causes double padding.
7. **Asset Deployment:** Sample assets (`sample.webp` and `sample.mp3`) residing in the root directory need to be mapped, duplicated, and registered across the asset paths.

---

## Issue Priority Matrix

| ID | Priority | Category | Problem | Affected Files | Implementation Order |
|:---|:---|:---|:---|:---|:---:|
| **C1** | **Critical** | Runtime / Animation | Post-transition element flicker & GSAP FOUC | `SceneManager.tsx`, all scene components | 1 |
| **C2** | **Critical** | Interaction / Engine | Lenis smooth scroll not initialized in app tree | `page.tsx`, `layout.tsx`, `useLenis.ts`, `ExperienceProvider.tsx` | 2 |
| **H1** | **High** | Visual / Skeuomorphic | Intro envelope top/bottom clipped & disconnected | `IntroScene.tsx` | 3 |
| **H2** | **High** | Visual / FX | Gift envelope light bloom clipped by rectangular box | `RevealEffect.tsx`, `GiftScene.tsx` | 4 |
| **H3** | **High** | Interaction / UX | Gallery photo lightbox lacks dramatic cinematic expansion | `GalleryScene.tsx`, `PhotoGalleryItem.tsx` | 5 |
| **H4** | **High** | Visual Consistency | Raw system emojis used instead of bespoke SVG icons | `PlaylistScene.tsx`, `GalleryScene.tsx`, `AudioControls.tsx`, `TimelineItem.tsx` | 6 |
| **M1** | **Medium** | Design System | PaperCard double-padding & inconsistent spacing | `PaperCard.tsx`, shared card components | 7 |
| **M2** | **Medium** | UI / Scrollbar | Clashing default browser scrollbars & double scrollbars | `globals.css`, `layout.tsx` | 8 |
| **M3** | **Medium** | Asset Management | Sample assets in root directory need deployment & registry | `sample.webp`, `sample.mp3`, `audio.ts`, `public/` | 9 |
| **L1** | **Low** | Responsive / Layout | Final Letter floating photo layout squeeze on mobile | `LetterPaper.tsx`, `FinalLetterScene.tsx` | 10 |
| **L2** | **Low** | Responsive / Layout | Selection Scene artifact scaling on small mobile (<380px) | `SelectionScene.tsx` | 11 |

---

## Detailed Issue Breakdown

---

### Critical Issues

#### Issue C1: Post-Transition Element Flicker & GSAP FOUC
- **Category:** Runtime Animation Lifecycle
- **Problem:**
  When navigating between scenes, `SceneManager.tsx` renders the incoming scene with `isActive={!exitingSlot}`. During the 1.4s crossfade, `exitingSlot` is truthy, so `isActive` is `false`. Because all scenes guard their entrance animations with `if (!isActive) return;`, the incoming scene renders with default static styles (100% opacity) inside the entering wrapper. When the crossfade completes and `exitingSlot` is cleared, `isActive` suddenly flips to `true`, causing `useGSAP` (`fromTo` / `reveal`) to abruptly reset elements to `opacity: 0` before tweening them in. This produces a noticeable, jarring flash/blink.
- **Affected Files:**
  - `src/components/scenes/SceneManager.tsx`
  - `src/components/scenes/IntroScene.tsx`
  - `src/components/scenes/SelectionScene.tsx`
  - `src/components/scenes/JourneyScene.tsx`
  - `src/components/scenes/GalleryScene.tsx`
  - `src/components/scenes/PlaylistScene.tsx`
  - `src/components/scenes/GiftScene.tsx`
  - `src/components/scenes/FinalLetterScene.tsx`
- **Recommended Solution:**
  1. In `SceneManager.tsx`, pass `isActive={true}` or a granular transition lifecycle status (`isEntering`, `isExiting`, `isActive`) to the incoming scene immediately upon mount so elements are primed in their initial hidden state (`opacity: 0` / transform offsets) before they become visible.
  2. Coordinate the incoming scene's internal entrance timeline with `onEnterStart` of `createSceneTransitionTimeline`, ensuring child animations run in direct choreography with the scene container reveal rather than triggering after an arbitrary delay.
- **Implementation Order:** 1

---

#### Issue C2: Lenis Smooth Scroll Not Initialized
- **Category:** Interaction Engine
- **Problem:**
  `lenis` is installed and configured in `src/lib/lenis.ts` and `src/hooks/useLenis.ts`, and Lenis CSS classes exist in `src/app/globals.css`. However, `useLenis()` is never called in `layout.tsx`, `page.tsx`, or `ExperienceProvider.tsx`. The site runs default browser wheel scrolling without velocity damping or GSAP ticker synchronization.
- **Affected Files:**
  - `src/app/page.tsx`
  - `src/app/layout.tsx`
  - `src/hooks/useLenis.ts`
  - `src/lib/lenis.ts`
  - `src/context/ExperienceContext.tsx`
- **Recommended Solution:**
  1. Create a `SmoothScrollProvider` client wrapper (or initialize within `ExperienceProvider`) that calls `useLenis()` on mount.
  2. Bind Lenis RAF updates to `gsap.ticker` to ensure ScrollTrigger calculations and smooth scroll physics operate on identical timestamps without jank.
  3. Ensure `lenis.scrollTo(0, { immediate: true })` is invoked during scene transitions so each new scene starts at the top without carryover scroll offsets.
- **Implementation Order:** 2

---

### High Priority Issues

#### Issue H1: Intro Envelope Top & Bottom Disjointed / Clipped
- **Category:** Visual / Skeuomorphic Fidelity
- **Problem:**
  In `IntroScene.tsx`, the envelope consists only of a deckle card with `-mb-8` and a bottom container with `[clip-path:polygon(0%_0%,50%_45%,100%_0%,100%_100%,0%_100%)]`. There is no open top flap, side fold geometry, or envelope backplate. The letter appears disconnected from the base, looking like a severed polygon rather than an authentic three-dimensional open envelope as depicted in `docs/references/screenshots/intro-scene.png`.
- **Affected Files:**
  - `src/components/scenes/IntroScene.tsx`
- **Recommended Solution:**
  1. Build a unified physical envelope container with three distinct structural layers:
     - **Back Layer:** Ivory backplate and angled triangular top flap pointing upward behind the protruding letter.
     - **Middle Layer:** Protruding deckle letter with gentle z-depth shadow.
     - **Front Layer:** Left and right triangular side folds and bottom triangular flap meeting at the center apex where the oxblood wax seal is anchored.
  2. Ensure natural depth shadowing between the flaps and the emerging letter.
- **Implementation Order:** 3

---

#### Issue H2: Gift Scene Opening Light Bloom Rectangular Clipping
- **Category:** Visual FX & Immersion
- **Problem:**
  In `GiftScene.tsx`, `RevealEffect.tsx` is placed inside `<main className="gift-stage-center relative z-20 w-full max-w-3xl min-h-[380px]">` with `overflow-hidden`. When the envelope is unsealed, the expanding radial glow hits the bounded box edges, exposing a visible rectangular border ("kelihatan kotak nya"). In addition, the CSS `animate-ping` is too small and abrupt.
- **Affected Files:**
  - `src/components/shared/RevealEffect.tsx`
  - `src/components/scenes/GiftScene.tsx`
- **Recommended Solution:**
  1. Render `RevealEffect` as a full-screen unclipped fixed overlay (`fixed inset-0 pointer-events-none z-50`) centered on the envelope coordinate.
  2. Replace `animate-ping` with a multi-stage radial bloom animation using GSAP:
     - Rapid initial flash/expansion (`scale: 0.2 -> 2.5`, `opacity: 0 -> 1 -> 0.8`).
     - Soft radial blur falloff without hard boundaries.
     - Rotating celestial rays and starburst particles expanding outward.
     - Smooth fade-out into the revealed keepsake panel.
- **Implementation Order:** 4

---

#### Issue H3: Gallery Photo Lightbox Lacks Cinematic Expansion
- **Category:** Interaction / UX
- **Problem:**
  In `GalleryScene.tsx`, clicking a Polaroid memory mounts a static modal abruptly (`animate-fade-in`), with no spatial continuity from the clicked photo to the enlarged modal view.
- **Affected Files:**
  - `src/components/scenes/GalleryScene.tsx`
  - `src/components/shared/PhotoGalleryItem.tsx`
- **Recommended Solution:**
  1. Introduce a cinematic lightbox transition:
     - When a photo is clicked, capture its origin and animate the modal with a smooth scale-up (`scale: 0.85 -> 1.0`) and spring settle (`ease: "back.out(1.2)"`).
     - Darken background with a rich radial vignette blur (`backdrop-blur-md`).
     - Stagger reveal the photo caption, date, location pin, and story text.
     - Smooth reverse animation on close.
- **Implementation Order:** 5

---

#### Issue H4: System Emojis Compromising Visual Hierarchy
- **Category:** Visual Consistency
- **Problem:**
  Several components use raw OS system emojis:
  - `PlaylistScene.tsx`: `🌹`, `🥀`, `🌸` around the love letter and camera altar.
  - `GalleryScene.tsx` & `TimelineItem.tsx`: `📍` for location badges.
  - `AudioControls.tsx`: `🔇`, `🔊` for mute/volume toggles.
  These render as flat platform-specific glyphs or colored Android blobs that clash with the vintage editorial aesthetic.
- **Affected Files:**
  - `src/components/scenes/PlaylistScene.tsx`
  - `src/components/scenes/GalleryScene.tsx`
  - `src/components/shared/AudioControls.tsx`
  - `src/components/shared/TimelineItem.tsx`
  - `src/data/playlist.ts`
- **Recommended Solution:**
  1. Create a dedicated set of micro SVG vector icons / components:
     - `RosePetalIcon` / `BotanicalSprayIcon` for the love letter frame and photographic altar.
     - `VintageMapPinIcon` for location markers.
     - `SpeakerMuteIcon` and `SpeakerVolumeIcon` for the audio controls.
  2. Cleanse data files of raw emoji characters.
- **Implementation Order:** 6

---

### Medium Priority Issues

#### Issue M1: PaperCard Double Padding & Inconsistent Spacing
- **Category:** Design Tokens / Spacing System
- **Problem:**
  `PaperCard.tsx` hardcodes `p-6 md:p-8` on an inner content wrapper (`line 82`) while callers also pass padding classes (`p-4`, `p-6 sm:p-7 md:p-8`, `py-8 px-6`) via `className` to the outer wrapper. This creates duplicate nested padding or prevents callers from customizing spacing on compact layouts.
- **Affected Files:**
  - `src/components/ui/PaperCard.tsx`
  - `src/components/shared/TimelineItem.tsx`
  - `src/components/shared/GiftContentPanel.tsx`
  - `src/components/scenes/IntroScene.tsx`
  - `src/components/scenes/PlaylistScene.tsx`
- **Recommended Solution:**
  1. Refactor `PaperCard.tsx` to accept a `padding` prop (`"none" | "sm" | "md" | "lg"`, defaulting to `"md"`: `p-6 md:p-8`) applied directly to the content container.
  2. Allow `contentClassName` for custom inner spacing, ensuring no double-padding occurs.
- **Implementation Order:** 7

---

#### Issue M2: Clashing Default Browser Scrollbars
- **Category:** UI Polish
- **Problem:**
  The browser uses default white/grey scrollbars that clash with the deep burgundy velvet aesthetic. On certain aspect ratios, both the `body` and inner container exhibit scrollbars.
- **Affected Files:**
  - `src/app/globals.css`
  - `src/app/layout.tsx`
- **Recommended Solution:**
  1. Add bespoke vintage scrollbar styles to `globals.css`:
     - Width: 6px.
     - Track: transparent or deep burgundy tint.
     - Thumb: rounded gold/bronze bar (`#c9904a`) with hover glow (`#f6c94e`).
     - Firefox: `scrollbar-width: thin; scrollbar-color: #c9904a transparent;`.
  2. Prevent accidental horizontal scrollbars via strict root `overflow-x: clip / hidden`.
- **Implementation Order:** 8

---

#### Issue M3: Asset Structure & Automated Sample Asset Deployment
- **Category:** Asset Strategy & Media Integration
- **Problem:**
  The user provided `sample.webp` (64.8 KB) and `sample.mp3` (3.35 MB) in the project root. Currently, `public/images/photos/` and `public/audio/` contain empty `.gitkeep` files, causing components to fall back to vector placeholders and timer simulations.
- **Affected Files:**
  - `sample.webp` (root)
  - `sample.mp3` (root)
  - `public/images/photos/`
  - `public/audio/`
  - `src/constants/audio.ts`
- **Recommended Solution:**
  1. Copy and duplicate `sample.webp` into `public/images/photos/` using all canonical photo names referenced across data files:
     - `photo-intro-couple-standing.webp`, `photo-intro-selfie-red.webp`, `photo-intro-portrait-top-right.webp`, `photo-intro-portrait-cap.webp`, `photo-intro-portrait-bottom-right.webp`
     - `photo-journey-hero-left.webp`, `photo-journey-right-back.webp`, `photo-journey-right-front.webp`, `photo-journey-first-meet.webp`, `photo-journey-walk.webp`, `photo-journey-anniversary.webp`, `photo-journey-future.webp`
     - `photo-gallery-smile.webp`, `photo-gallery-coffee.webp`, `photo-gallery-sunset.webp`, `photo-gallery-selfie.webp`, `photo-gallery-beach.webp`, `photo-gallery-city.webp`, `photo-gallery-trip.webp`, `photo-gallery-anniversary.webp`
  2. Copy and duplicate `sample.mp3` into `public/audio/` using canonical audio names:
     - `soundtrack-risk-it-all.mp3`, `soundtrack-until-i-found-you.mp3`, `soundtrack-golden-hour.mp3`, `soundtrack-die-with-a-smile.mp3`
     - `soundtrack-prologue.mp3`, `soundtrack-selection.mp3`, `soundtrack-journey.mp3`, `soundtrack-gallery.mp3`, `soundtrack-vinyl.mp3`, `soundtrack-gift-anticipation.mp3`, `soundtrack-final-letter.mp3`
  3. Register these soundtrack tracks in `src/constants/audio.ts` so `AudioManager` / Howler can directly play real audio.
  4. Provide a clear replacement guide so the user can easily swap individual photos or songs later.
- **Implementation Order:** 9

---

### Low Priority Issues

#### Issue L1: Final Letter Mobile Floating Photo Layout Collision
- **Category:** Responsive Spacing
- **Problem:**
  In `LetterPaper.tsx`, the embedded Polaroid uses `float-right ml-4 sm:ml-6 mb-4 w-32 sm:w-40`. On mobile screens under 400px width, floating a 130px Polaroid rightward squeezes the handwritten paragraphs into an uncomfortably narrow ~160px text strip.
- **Affected Files:**
  - `src/components/shared/LetterPaper.tsx`
- **Recommended Solution:**
  - On mobile (`< sm`), center the Polaroid above the letter text or let it stack inline, and apply `float-right` only on `sm` (640px) and above.
- **Implementation Order:** 10

---

#### Issue L2: Selection Scene Artifact Scaling on Compact Mobile Displays
- **Category:** Responsive UX
- **Problem:**
  On 360px mobile screens, the 4 artifact cards in a 2x2 grid (`SelectionScene.tsx`) have tight gaps that can cause text labels to crowd the edges.
- **Affected Files:**
  - `src/components/scenes/SelectionScene.tsx`
- **Recommended Solution:**
  - Reduce artifact container dimensions slightly on extra-small mobile (`w-36` instead of `w-44` below 400px) and optimize touch target spacing.
- **Implementation Order:** 11

---

## Phase 5 Execution Roadmap

```
Step 1: Fix Transition Synchronization & Post-Transition Flicker (C1)
Step 2: Initialize Lenis Smooth Scroll Engine (C2)
Step 3: Reconstruct Intro Envelope Geometry & Physical Flaps (H1)
Step 4: Unclip & Refine Gift Scene Light Bloom (H2)
Step 5: Implement Cinematic Lightbox Expansion for Gallery (H3)
Step 6: Replace System Emojis with Handcrafted SVGs (H4)
Step 7: Unify PaperCard Spacing & Padding System (M1)
Step 8: Implement Custom Vintage Scrollbar & Clean Overflow (M2)
Step 9: Deploy Root Sample Assets & Register Audio Tracks (M3)
Step 10: Optimize Mobile Layouts (Letter Float & Selection Sizing) (L1, L2)
Step 11: Execute Full Verification Suite (type-check, lint, build)
```

---

*Refinement plan completed. Ready for Phase 5 implementation upon user approval.*
