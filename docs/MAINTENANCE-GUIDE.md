# Maintenance Guide

This document covers routine maintenance tasks, dependency management, debugging common issues, and the process for adding new scenes or features.

---

## Routine Maintenance

### Dependency Updates

Run monthly or after any upstream security advisory:

```bash
# Review outdated packages
npm outdated

# Update all patch/minor versions
npm update

# For major version upgrades, update individually and test
npm install <package>@latest
npm run validate
```

> **Important after Next.js upgrades:** Re-read `node_modules/next/dist/docs/` (as required by `AGENTS.md`) — APIs and conventions may have breaking changes.

Key packages to watch:
| Package | Why it matters |
|---------|---------------|
| `next` | App Router API changes, performance improvements |
| `gsap` | Animation API changes (rare but breaking) |
| `howler` | Audio playback compatibility fixes |
| `lenis` | Smooth-scroll integration with GSAP ticker |
| `tailwindcss` | v4 has non-standard config — verify PostCSS plugin compat |

---

### Asset Optimisation

Periodically verify image sizes haven't grown:

```bash
# Check total public/ size
du -sh public/

# Find images larger than 500 KB
find public/images -size +500k -name "*.webp"
```

Re-optimise oversized images using `sharp` or [Squoosh](https://squoosh.app/).  
See [`ASSET-MANAGEMENT.md`](./ASSET-MANAGEMENT.md) for dimension and quality targets.

---

### Lighthouse Audit

Run after any major dependency update or visual change:

```bash
npm run build && npm run start &    # serve production build
npx lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./reports/lighthouse-latest.json
```

Compare scores against the baseline in [`phase-9-release-report.md`](./phase-9-release-report.md).  
Target: Performance ≥ 0.90, Accessibility = 1.00, Best Practices = 1.00, SEO = 1.00.

---

### Running Tests

```bash
npm test                # single run
npm run test:watch      # watch mode during development
npm run validate        # full pipeline (type-check + lint + tests + build)
```

All 20 tests must pass before merging any change to `main`.

---

## Adding a New Scene

Follow this procedure exactly to keep the architecture consistent.

### Step 1 — Create the Scene Component

Create `src/components/scenes/<SceneName>Scene.tsx`.

Required interface:

```tsx
interface SceneNameSceneProps {
  isActive: boolean;
}

export default function SceneNameScene({ isActive }: SceneNameSceneProps) {
  // 1. Consume ExperienceContext for navigation
  // 2. Consume useAudio for scene-specific audio
  // 3. Build a GSAP timeline for enter/exit (clean up on unmount)
  // 4. Return JSX
}
```

Pattern to follow: copy the structure of an existing simple scene (e.g., `GiftScene.tsx`) and adapt it.

### Step 2 — Register the Scene

Open `src/components/scenes/SceneManager.tsx`:

1. Import the new scene component.
2. Add a new case to the scene-rendering switch / map.
3. Add the scene ID to the `SceneId` union type in `src/types/`.

### Step 3 — Add Scene Navigation

Open `src/context/` (ExperienceContext provider):

1. Add the new scene ID to the `SceneId` type (if not already done above).
2. Add any entry conditions (e.g., which scene can navigate to the new one).

Expose navigation from an existing scene using `goToScene('new-scene-id')`.

### Step 4 — Add Scene Audio (if required)

Open `src/constants/audio.ts` and register a new track ID.  
Register the audio file path in `src/lib/audio.ts` `AudioManager`.  
Place the MP3 in `public/audio/`.

### Step 5 — Write Tests

Add a test file `src/test/<sceneName>.test.tsx` covering:
- Scene renders without crash.
- Primary CTA interaction triggers expected navigation or state change.

### Step 6 — Document

Update:
- [`docs/scene-architecture.md`](./scene-architecture.md) — add scene spec table entry.
- [`docs/experience-flow.md`](./experience-flow.md) — add new navigation paths.
- This file — add any new debugging notes if relevant.

### Step 7 — Validate

```bash
npm run validate
```

All checks must pass before opening a pull request or deploying.

---

## Debugging Common Issues

### Audio Not Playing

**Symptom:** No audio on scene entry or playlist interaction.

**Checklist:**
1. Browser autoplay policy — audio can only start after a user gesture. The app handles this via the intro click; verify `audioManager.play()` is called inside an event handler, not on mount.
2. Check the browser console for `Howler: [SoundID] play - File not found` errors — the asset path may be wrong.
3. Verify the track is registered in `src/constants/audio.ts` and the file exists in `public/audio/`.
4. Check that `MAIN_BGM_TRACK_ID` matches the actual filename.
5. Mute state: verify `audioManager.isMuted` is `false`.

---

### Hydration Mismatch

**Symptom:** `Warning: Text content did not match. Server: "…" Client: "…"` in the console.

**Causes & fixes:**
- Client-only logic (e.g., `window`, `localStorage`, `Date`) running during SSR. Wrap in `useEffect` or use the `"use client"` directive.
- Random values used in initial render — seed them deterministically or move to a `useEffect`.
- `suppressHydrationWarning` on the root `<html>` tag already handles some minor mismatches (e.g., theme class injection).

---

### GSAP Animation Not Cleaning Up

**Symptom:** Animations continue running after a scene is unmounted; stale transforms on re-entry.

**Fix:**
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // timelines and animations
  }, containerRef);

  return () => ctx.revert(); // ← always return this
}, []);
```

Never store GSAP instances in component state. Always use `gsap.context()` and call `revert()` in the cleanup.

---

### Mobile Horizontal Overflow

**Symptom:** Horizontal scroll bar appears on mobile; content overflows the viewport.

**Checklist:**
1. Use browser DevTools device emulator at 375 px width with "No throttling".
2. Inspect elements for `min-width` values that exceed the viewport.
3. Check absolutely positioned elements — use `overflow-hidden` on the wrapping container.
4. Verify that GSAP `x` transforms don't push elements outside the viewport without being reset.
5. Confirm `<body>` has `overflow-x: hidden` (set in `src/app/globals.css`).

---

### Scene Transition Freeze

**Symptom:** UI becomes unresponsive during a scene transition.

**Checklist:**
1. Confirm `isTransitioning` state in `ExperienceContext` is reset to `false` after every transition — check that the GSAP `onComplete` callback fires.
2. Look for unresolved Promises or async operations that block the transition flow.
3. Confirm `Lenis.stop()` / `Lenis.start()` are called symmetrically around transitions.

---

### `npm run validate` Failures

| Failure type | First action |
|-------------|--------------|
| TypeScript error | Read the error message — usually a missing type or incorrect prop. |
| ESLint violation | Run `npm run lint:fix` for auto-fixable rules; manually fix the rest. |
| Test failure | Run `npm run test:watch` and inspect the failing test output. |
| Build error | Run `npm run build` alone for the full error trace in Turbopack output. |
