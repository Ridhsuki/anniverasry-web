# Component Architecture & Guidelines

> **Document Purpose:** Prescribes the engineering standards, composition patterns, naming conventions, and props interface designs for all React components in `src/components/`.

---

## 1. Component Hierarchy & Layering

The component layer is organized into four distinct tiers:

```
src/components/
├── ui/              # Tier 1: Low-level UI primitives (Stateless, highly reusable)
│   ├── VintageButton.tsx
│   ├── PaperCard.tsx
│   ├── PhotoFrame.tsx
│   └── FloatingDecoration.tsx
│
├── shared/          # Tier 2: Domain composites (Global navigation, audio bar, modals)
│   ├── NavigationBar.tsx
│   ├── AudioController.tsx
│   └── LightboxModal.tsx
│
├── scenes/          # Tier 3: Narrative scene shells (One per story chapter)
│   ├── IntroScene.tsx
│   ├── SelectionScene.tsx
│   ├── JourneyScene.tsx
│   ├── GalleryScene.tsx
│   ├── PlaylistScene.tsx
│   ├── GiftScene.tsx
│   └── FinalLetterScene.tsx
│
└── sections/        # Tier 4: Page-level composition blocks (App Router orchestrators)
```

---

## 2. Naming Conventions

- **Component Files:** PascalCase naming matching the exported component (`VintageButton.tsx`, `IntroScene.tsx`).
- **Directories:** Kebab-case plurals (`src/components/ui/`, `src/components/scenes/`).
- **Interfaces & Types:** `[ComponentName]Props` (`VintageButtonProps`, `PaperCardProps`) co-located or exported from `src/types/components.ts`.
- **CSS Utility Classes:** Kebab-case following Tailwind v4 or design token definitions (`.paper-texture`, `.gpu-accelerated`, `.font-handwriting`).

---

## 3. Component Design & Props Philosophy

### 3.1 Strict TypeScript Typing
Every component must export or reference a dedicated interface extending standard HTML attributes:

```typescript
// Good: Extends native button attributes, allowing standard props (type, disabled, aria-*)
export interface VintageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "ghost" | "wax-seal";
  size?: "sm" | "md" | "lg";
  ornate?: boolean;
  isLoading?: boolean;
}
```

### 3.2 Polymorphic & Forward Ref Support
Interactive primitives and elements that participate in animations must forward their DOM `ref` using `forwardRef` to allow GSAP context scoping:

```typescript
export const PaperCard = forwardRef<HTMLDivElement, PaperCardProps>(
  ({ className, children, rotation = 0, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
PaperCard.displayName = "PaperCard";
```

### 3.3 Composition over Duplication
Components must favor children slots over deep prop drilling:
- ❌ **Anti-pattern:** `<PhotoFrame title="..." date="..." subtitle="..." photoUrl="..." badge="..." button="..." />`
- ✅ **Recommended Pattern:**
  ```tsx
  <PhotoFrame variant="gold" rotation={-2} caption="Our first sunset">
    <Image src="/images/photos/sunset.webp" alt="Sunset" fill className="object-cover" />
  </PhotoFrame>
  ```

---

## 4. UI Primitives Deep Dive

### 4.1 `VintageButton` (`src/components/ui/VintageButton.tsx`)
- **Responsibility:** All user actions, chapter selections, and navigation triggers.
- **Variants:**
  - `primary`: Deep bronze/charcoal with gold border and amber glow.
  - `secondary`: Aged parchment button with dark ink.
  - `gold`: Radiant gilded metallic foil background with high-contrast text.
  - `ghost`: Transparent backdrop with delicate thin gold border.
  - `wax-seal`: Circular dimensional stamped wax button with heart monogram.
- **Sizes:** `sm` (compact back button), `md` (standard actions), `lg` (prominent CTAs like "TAP FOR SURPRISE").

### 4.2 `PaperCard` (`src/components/ui/PaperCard.tsx`)
- **Responsibility:** Tactile parchment surfaces for love letters, invitations, and chapter descriptions.
- **Props:**
  - `variant`: `'plain' | 'aged' | 'torn' | 'deckle'`
  - `shadow`: `'none' | 'sm' | 'md' | 'lg' | 'xl'`
  - `rotation`: Numeric tilt in degrees (`-5` to `+5`) applied via CSS transform.
  - `hasTexture`: Injects subtle background noise grain and inset paper depth.

### 4.3 `PhotoFrame` (`src/components/ui/PhotoFrame.tsx`)
- **Responsibility:** Scrapbook-style photo displays with authentic physical mountings.
- **Variants:**
  - `gold`: Ornate baroque filigree metallic frame with specular highlights.
  - `polaroid`: White card stock with broad bottom margin for handwriting.
  - `classic`: Clean dark wood frame.
  - `filigree`: Elaborate double-ring gilded frame.
- **Tape & Accents:** `tapeStyle="top-center"` or `tapeStyle="corners"` renders semi-translucent washi tape strips over the frame.

### 4.4 `FloatingDecoration` (`src/components/ui/FloatingDecoration.tsx`)
- **Responsibility:** Reusable wrapper that imbues any asset (SVG petal, butterfly, heart note) with ambient physics.
- **Depth Presets:**
  - `depth={1}`: Foreground (scale `1.0`, z-index `20`, sharp focus).
  - `depth={2}`: Midground (scale `0.9`, z-index `10`, standard focus).
  - `depth={3}`: Background (scale `0.75`, z-index `0`, soft blur `0.5px`).
- **Motion Presets:** `'float' | 'drift' | 'drift-reverse' | 'sway' | 'sparkle' | 'none'`.

---

## 5. Scene Architecture Pattern

All narrative scenes (`IntroScene`, `SelectionScene`, `JourneyScene`, `GalleryScene`, `PlaylistScene`, `GiftScene`, `FinalLetterScene`) follow this structural template:

```tsx
"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function ExampleScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-example"
      data-scene="example"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 select-none",
        className
      )}
    >
      {/* 1. Atmospheric backdrop layer */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      {/* 2. Structured content container */}
      <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col items-center gap-8">
        <header className="scene-header text-center" />
        <div className="scene-stage relative w-full" />
        <footer className="scene-actions flex items-center justify-between w-full" />
      </div>

      {/* 3. Injected children / floating overlays */}
      {children}
    </section>
  );
}
```

---

## 6. Prohibited Practices & Anti-Patterns

1. ❌ **No Inline GSAP Timelines in Component Bodies:** Always encapsulate inside `useGSAP` or external animation functions in `src/animations/`.
2. ❌ **No Hardcoded Hex Codes in Component Styles:** Always use Tailwind theme classes (`bg-bg-primary`, `text-gold`, `border-border-default`) or CSS variables (`var(--color-gold)`).
3. ❌ **No Hardcoded Personal Strings inside Component Definitions:** All couple names, dates, letter body text, and photo captions must live in `src/data/index.ts` or `src/constants/`.
4. ❌ **No Direct DOM Manipulation:** Never use `document.querySelector` or `window.scroll` inside components; use React refs, GSAP context selectors, or Lenis `scrollTo`.
