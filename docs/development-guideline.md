# Development Standards & Engineering Guidelines

> **Document Purpose:** Prescribes technical quality standards, TypeScript conventions, performance benchmarks, and strict rules of engagement for developers and future AI coding agents working on this codebase.

---

## 1. Engineering Principles

1. **Clean Code & SOLID Foundations:**
   - Single Responsibility: A component renders UI; a hook manages state or browser events; an animation module orchestrates tweens. Never combine all three in a single file.
   - Favor pure functions for data transformation and math calculations (`src/utils/index.ts`).
2. **TypeScript Strict Mode by Default:**
   - `"strict": true`, `"noUnusedLocals": true`, and `"noUnusedParameters": true` are active in `tsconfig.json`.
   - Never use `any`. Use `unknown`, generic parameters, or explicit interfaces.
   - Avoid type casting (`as SomeType`) unless bridging external third-party untyped APIs.
3. **Next.js 15 & React 19 Best Practices:**
   - Establish clear Server/Client Component boundaries.
   - Use `"use client"` only at entry points that require browser APIs (DOM events, hooks, GSAP, Audio).
   - Use `useSyncExternalStore` for subscribing to external browser state (e.g. `window.matchMedia`) to prevent cascading renders and hydration mismatches.

---

## 2. Directory & Architecture Map

```
src/
├── animations/     # Pure GSAP functions and Framer Motion transitions (No React dependencies)
├── app/            # Next.js App Router (layout.tsx, page.tsx, globals.css)
├── assets/         # Bundled static assets
├── components/
│   ├── ui/         # Reusable design primitives (VintageButton, PaperCard, PhotoFrame...)
│   ├── scenes/     # Narrative scene containers (IntroScene, SelectionScene...)
│   ├── sections/   # Major page composition sections
│   └── shared/     # Cross-scene composites (AudioBar, Navigation)
├── constants/      # Immutable design tokens, site configuration, track lists
├── data/           # Structured mock & CMS data (timeline, photo metadata, letter copy)
├── hooks/          # Custom hooks (useGSAP, useAudio, useLenis, useMediaQuery)
├── lib/            # Singleton engines (AudioManager, Lenis smooth scroll, Google Fonts)
├── styles/         # CSS tokens (tokens.css) and Tailwind theme extension (theme.css)
├── types/          # Domain TypeScript interfaces (scenes, components, animations)
└── utils/          # Pure helper utilities (cn, clamp, lerp, mapRange, debounce)
```

---

## 3. Path Aliases

All imports must use the explicit absolute aliases defined in `tsconfig.json`:

```typescript
import { VintageButton, PaperCard } from "@/components/ui";
import { photoEntrance, fadeIn } from "@/animations";
import { useAudio, useGSAP } from "@/hooks";
import { audioManager } from "@/lib/audio";
import { colors, animation } from "@/constants/tokens";
import type { SceneProps, Photo } from "@/types";
import { cn } from "@/utils";
```

---

## 4. Performance & Hardware Acceleration Rules

1. **GPU Compositing Requirement:**
   - Any component that translates, scales, or rotates must include the `.gpu-accelerated` utility class (`transform: translateZ(0); backface-visibility: hidden;`).
2. **Animation Budget:**
   - Animation properties are strictly limited to `transform` and `opacity`.
   - Never animate layout geometry (`top`, `left`, `width`, `height`, `margin`, `padding`).
3. **Scroll & RAF Discipline:**
   - All scrolling is managed by the single Lenis instance in `src/lib/lenis.ts`.
   - Never attach naked `window.addEventListener("scroll")` handlers. Use `useLenisScroll` or GSAP ScrollTrigger.
4. **Memory Leak Prevention:**
   - Every GSAP animation in React components must use `useGSAP` or clean up tweens on unmount via `tween.kill()` or `ctx.revert()`.

---

## 5. Rules of Engagement for AI Coding Agents

When tasked with implementing features, pages, or bug fixes on this repository, every AI agent must strictly follow these rules:

### Rule 1: Always Inspect Existing Implementations First
- Never recreate existing files or blindly overwrite configurations.
- Verify existing exports in barrel files (`src/components/ui/index.ts`, `src/animations/index.ts`, `src/types/index.ts`).

### Rule 2: Ground Visual Decisions in `docs/references/`
- All scene layouts, object placement, colors, and typography MUST align with the screenshots documented in `docs/references/image-map.md`.
- Do not invent arbitrary modern UI patterns (e.g. flat SaaS buttons, generic tabs) that contradict the vintage romantic scrapbook aesthetic.

### Rule 3: Zero Compilation & Lint Errors Policy
- Before completing any task, the agent must run:
  1. `npm run type-check` (Must output 0 errors).
  2. `npm run lint` (Must output 0 warnings and 0 errors).
  3. `npm run build` (Must succeed in creating the production bundle).
- Any TypeScript error, unused variable, or lint issue introduced must be resolved immediately.

### Rule 4: Data Decoupling
- Never embed raw text copy (e.g. love letters, dates, couple names) directly inside TSX component JSX.
- Place all content in `src/data/index.ts` or `src/constants/site.ts`.

### Rule 5: Keep Documentation Synchronized
- When adding new scenes, props, or animation utilities, update the corresponding documentation file in `docs/`.
