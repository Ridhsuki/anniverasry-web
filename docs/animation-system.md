# Animation System Specification

> **Document Purpose:** Defines the animation philosophy, timing tokens, easing curves, GSAP implementation guidelines, GPU optimization rules, and accessibility standards for the anniversary website.

---

## 1. Animation Philosophy

The animation language of this website serves narrative immersion and emotional intimacy. It deliberately rejects fast, snappy, aggressive commercial SaaS animations in favor of:

1. **Physical Tangibility:** Digital elements behave like genuine paper, wood, glass, and velvet. Photo cards drop with a soft spring bounce; letters unfold with realistic 3D perspective; vinyl records spin with inertia.
2. **Cinematic Slowness:** Story reveals and chapter transitions are spacious and measured (1.2s to 2.4s), allowing photography, music, and typography to resonate.
3. **Organic Micro-motion:** Resting elements never sit completely dead. Butterflies have resting wing breathing loops; candles flicker; rose petals and bokeh motes float continuously on gentle sine waves.
4. **Zero Layout Thrashing:** 100% of animations are GPU-composited (`transform` and `opacity`).

---

## 2. Timing Standards & Duration Tokens

Timing is standardized in both CSS custom properties (`src/styles/tokens.css`) and TypeScript constants (`src/constants/tokens.ts`):

| Token Name | Duration | GSAP Value | Intended Usage |
|---|---|---|---|
| `instant` | `0ms` | `0s` | State resets, immediate layout adjustments |
| `fast` | `200ms` | `0.2s` | Button active/hover state feedback, tooltip toggles |
| `normal` | `400ms` | `0.4s` | Standard micro-interactions, modal backdrop fades |
| `moderate` | `600ms` | `0.6s` | Card tilt interactions, photo hover zoom |
| `slow` | `800ms` | `0.8s` | Photo drop entrances (`photoEntrance`), paper reveals |
| `slower` | `1200ms` | `1.2s` | Cross-scene component staging, letter unfolding |
| `cinematic` | `1800ms` | `1.8s` | Full-scene crossfades, chapter title reveals |
| `epic` | `2400ms` | `2.4s` | Grand finale transitions, introductory curtain rise |

### Stagger Intervals
- **Tight (`60ms`):** Fast text word reveals or icon cascades.
- **Normal (`100ms`):** Multi-card selection decks (`SelectionScene`).
- **Relaxed (`150ms`):** Polaroid gallery grid placements (`GalleryScene`).

---

## 3. Easing Curvature Rules

| Easing Name | GSAP String | CSS / Cubic-Bezier | Character & When to Use |
|---|---|---|---|
| **Cinematic** | `"power4.out"` | `cubic-bezier(0.16, 1, 0.3, 1)` | **Default for major reveals.** Starts with swift velocity, then decelerates into an extremely long, graceful glide. |
| **Smooth** | `"power2.out"` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Micro-interactions, button hover states, gentle fades. |
| **Snap / Exit** | `"power3.inOut"` | `cubic-bezier(0.4, 0, 0.2, 1)` | Elements exiting the screen or collapsing. |
| **Tactile Bounce** | `"back.out(1.4)"` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Photographs landing into a scrapbook; dropped envelopes settling. |
| **Organic Wave** | `"sine.inOut"` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Infinite floating loops (`repeat: -1, yoyo: true`), butterflies, breathing candle glows. |
| **Linear** | `"none"` | `linear` | Continuous spinning vinyl record discs (`rotation: 360`). |

---

## 4. Animation Utility Library Architecture (`src/animations/`)

The application isolates animation logic into pure, reusable TypeScript modules with zero React component coupling:

```
src/animations/
├── fade.ts        → fadeIn, fadeOut, reveal (directional staggered reveal)
├── floating.ts    → floatingMovement (continuous drift), breathingAnimation (glow pulse)
├── scrapbook.ts   → photoEntrance (tactile drop & bounce), paperReveal, rotationEffect
├── cinematic.ts   → sceneTransition (timeline crossfade), dramaticReveal (tracking expand)
├── gsap.ts        → Plugin registration, ScrollTrigger integration, killTweens
└── transitions.ts → Framer Motion variant presets for layout transitions
```

### Module Signatures & Implementation Rules

#### `fadeIn(target, options)` (`src/animations/fade.ts`)
- Fades target from `fromOpacity` (default 0) to `1`.
- Accepts optional `y`, `x`, `scale` offsets.
- Always sets `force3D: true` and clears transform props on complete.

#### `photoEntrance(target, options)` (`src/animations/scrapbook.ts`)
- Simulates an authentic Polaroid falling from mid-air into a scrapbook.
- Starts at `y: -40px`, `scale: 1.08`, and `rotation: initialRotation` (e.g. `-6°`).
- Lands at `y: 0`, `scale: 1.0`, and `rotation: finalRotation` (e.g. `-1.5°`) using `ease: "back.out(1.4)"`.

#### `floatingMovement(target, options)` (`src/animations/floating.ts`)
- Implements organic ambient oscillation.
- Tweens `y: "+=14px"`, `x: "+=6px"`, `rotation: "+=2.5°"` with `ease: "sine.inOut"`, `repeat: -1`, `yoyo: true`.
- Automatically returns the active tween instance for cleanup on unmount.

#### `sceneTransition(leaving, entering, options)` (`src/animations/cinematic.ts`)
- Builds an overlapping `gsap.timeline()` crossfade.
- Leaving scene softly scales down (`scale: 0.96`) and fades out (`opacity: 0`).
- Entering scene starts slightly enlarged (`scale: 1.04`) and glides into `scale: 1.0` with overlapping timing at 25% of duration.

---

## 5. React Integration via Hooks

### `useGSAP` Hook (`src/hooks/useGSAP.ts`)
All component animations must be instantiated through the `useGSAP` hook:
1. Guards against SSR (`typeof window === "undefined"`).
2. Automatically calls `registerGSAPPlugins()` on client mount.
3. Wraps animation callbacks in `gsap.context()` scoped to a specific element `ref`.
4. Executes `ctx.revert()` on component unmount, **guaranteeing zero memory leaks or orphaned timers**.

```typescript
// Example: Safe usage in any client component
const containerRef = useRef<HTMLDivElement>(null);

useGSAP((gsap, context) => {
  photoEntrance(".polaroid-card", { stagger: 0.1 });
}, [], containerRef);
```

---

## 6. GPU Performance & Technical Constraints

### Absolute Constraints
1. **Never Animate Layout Properties:**
   - ❌ **Prohibited:** `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`.
   - ✅ **Permitted:** `transform` (`x`, `y`, `z`, `scale`, `rotation`, `rotationX`, `rotationY`), `opacity`, `filter: blur()`.
2. **Promote to Compositor Layer:**
   - All animated elements must carry the CSS class `.gpu-accelerated` (`transform: translateZ(0); backface-visibility: hidden;`).
3. **Limit Simultaneous Blur Filters:**
   - Realtime `filter: blur()` is restricted to a maximum of 2 elements simultaneously to protect mobile GPUs.

---

## 7. Reduced Motion & Accessibility

The website strictly honors the `prefers-reduced-motion: reduce` system preference:

1. **Global CSS Reset (`src/app/globals.css`):**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```
2. **Hook Level (`src/hooks/useMediaQuery.ts`):**
   - The `usePrefersReducedMotion()` hook uses `useSyncExternalStore` to detect reduced motion reactively.
   - When active, continuous floating loops (`FloatingDecoration`) bypass GSAP tween creation entirely.
