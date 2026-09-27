# Visual Design Specification

> **Document Purpose:** Single source of truth for the visual identity, aesthetic language, token mappings, and styling constraints for the interactive anniversary website.

---

## 1. Project Vision & Emotional Direction

### 1.1 Project Vision
The project is a cinematic, highly interactive digital anniversary showcase designed as a digital love letter and interactive keepsake. Unlike traditional commercial landing pages, this experience is structured as an intimate narrative journey through six physical-feeling scrapbook chapters:

1. An illuminating royal envelope invitation.
2. An interactive chapter selection hub.
3. A multimedia chronological relationship journey.
4. A tangible photo gallery arranged as an authentic scrapbook.
5. A candlelit music room featuring a spinning vinyl record and love letter.
6. A ceremonial gift unboxing of a sealed keepsake.
7. A full-screen emotional handwritten love letter finale.

### 1.2 Emotional Pillars
- **Intimacy:** Deep, warm, candlelit ambiance with personal touches (couple names *"Nayyy & Keillaa"*, monogram *"N&K"*, date `26-09-26`).
- **Nostalgia & Materiality:** Tangible physical textures—aged parchment deckle edges, heavy gilded baroque picture frames, washi tape, wax seals, real rose petals, and mechanical cameras.
- **Cinematic Romance:** Dramatic lighting contrast, vignetted burgundy velvet backdrops, warm bokeh flares, and slow, deliberate pacing.
- **Reverence & Delicacy:** Careful typography hierarchy, gentle floating physics, and organic particle motion that never feels aggressive or gamified.

---

## 2. Core Design Principles

1. **Physicality First (Skeuomorphic Touchpoints):** Digital elements must evoke genuine tactile artifacts. Cards have paper grain; photos have physical tilt angles and drop shadows; buttons emulate wax seals or parchment labels.
2. **Atmospheric Lighting:** Surfaces are not flat blocks of solid hex color. They feature deep radial gradients, vignette borders, candlelight glows, and starlight lens flares.
3. **Organic Imperfection:** Avoid robotic, perfectly aligned grids. Photographs must have slight deliberate rotation offsets (-6° to +8°), deckle paper tears, and hand-placed pins or tape.
4. **Deliberate Pacing:** Micro-interactions respond smoothly in 200–400ms, while major scene transitions unfold over 1.2–2.0s with cinematic ease curves to invite contemplation.

---

## 3. Color System

The color palette directly mirrors the visual assets in `docs/references/screenshots/` and is codified in `src/styles/tokens.css` and `src/constants/tokens.ts`.

### 3.1 Primary & Background Palette
| Token Name | Hex Value | CSS Variable | Semantic Usage |
|---|---|---|---|
| Deep Night Black | `#080808` | `--primitive-night-950` | Outermost vignette margins, image container backs |
| Royal Velvet Crimson | `#1a0509` / `#2b040a` | `--color-bg-base` | Primary scene backdrop atmosphere |
| Stage Crimson Highlight | `#4a0e18` / `#5e1320` | `--color-bg-warm` | Radial spotlight behind focal objects |
| Velvet Curtain Shadow | `#141414` | `--color-bg-elevated` | Dark container backgrounds |

### 3.2 Accent & Decorative Palette
| Token Name | Hex Value | CSS Variable | Semantic Usage |
|---|---|---|---|
| Antique Bright Gold | `#f6c94e` | `--color-gold` / `--color-accent-gold` | Headings, glows, foil text, starburst flares |
| Gilded Bronze / Foil | `#d9a85f` / `#c9904a` | `--color-gold-dark` | Picture frame borders, ornate scrollwork |
| Deep Velvet Rose | `#8f2f2f` / `#b84848` | `--color-rose-dark` | Rose petals, wax seal body |
| Soft Blush Rose | `#e89898` / `#f5c6c6` | `--color-rose` / `--color-accent-rose` | Rose highlights, heart particles |
| Antique Sage Olive | `#87b07c` / `#a8bc97` | `--color-sage` / `--color-accent-sage` | "BACK ◂" pill navigation button |

### 3.3 Parchment & Paper Palette
| Token Name | Hex Value | CSS Variable | Semantic Usage |
|---|---|---|---|
| Fresh Ivory Paper | `#fdf8f0` | `--primitive-cream-50` | Primary letter paper, polaroid photo borders |
| Aged Parchment | `#f9edd8` | `--color-paper` | Envelope body, deckle-edge cards |
| Deep Aged Ochre | `#f2dbb4` | `--color-paper-aged` | Paper folds, aged letter card shadows |
| Vintage Dark Ink | `#1a1209` / `#2d1f10` | `--color-text-on-paper` | Text written on parchment cards |
| Muted Sepia Ink | `#7a5930` | `--primitive-ink-500` | Subtitles, dates, and caption metadata |

---

## 4. Typography System

The application loads four complementary Google Fonts via `next/font/google` in `src/lib/fonts.ts`. Layout shifts are strictly zero (`display: 'swap'`).

### 4.1 Typography Roles & Font Mapping
| Hierarchy Level | Font Family | Variable / Utility | Intended Voice & Usage |
|---|---|---|---|
| **Display / Hero** | **Cormorant Garamond** | `--font-cormorant`<br>`.font-display` | Classical, dramatic high-contrast serifs. Used for scene headings (*"Choose the Surprise"*, *"Press the Envelope"*). |
| **Editorial Body** | **Playfair Display** | `--font-playfair`<br>`.font-serif` | Warm, sophisticated editorial serif. Used for section intros, card titles, quotes, and buttons. |
| **Handwriting / Script** | **Dancing Script** | `--font-dancing`<br>`.font-handwriting` | Flowing personal calligraphy. Used for *"Happy Anniversary"*, couple names (*"Nayyy & Keillaa"*), letter messages, and photo captions. |
| **UI & Metadata** | **Inter** | `--font-inter`<br>`.font-sans` | Highly legible, clean neutral sans-serif. Used for "BACK ◂" buttons, tooltips, technical controls, and dates. |

### 4.2 Fluid Typography Scale
Sizes use CSS `clamp()` to scale fluidly between mobile (320px) and desktop (1920px):
- **Display Hero:** `clamp(3.5rem, 2.5rem + 5vw, 6.5rem)`
- **Heading 1:** `clamp(2.25rem, 1.75rem + 3vw, 3.5rem)`
- **Heading 2:** `clamp(1.5rem, 1.25rem + 1.5vw, 2.25rem)`
- **Handwritten Letter:** `clamp(1.15rem, 1rem + 0.75vw, 1.6rem)`
- **Body Text:** `clamp(0.9rem, 0.85rem + 0.25vw, 1.05rem)`
- **Button / Label:** `clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)` (tracked `0.1em` to `0.2em`)

---

## 5. UI Language & Material Components

### 5.1 Wax Seals
- **Visual Style:** Dimensional, thick circular or oval oxblood/crimson stamp (`#8f2f2f` to `#601515`) with an embossed glossy bevel, realistic cast drop shadow, and a stamped heart or monogram (`N&K`).
- **Interactive Role:** Acts as the primary click/tap trigger on envelopes.

### 5.2 Gilded Picture Frames
- **Visual Style:** Ornate baroque gilded gold borders featuring corner filigree details, embossed bevels, and an inner dark shadow giving depth to the photograph inside.
- **Rotation:** Always offset slightly from the vertical axis (e.g. `-3°` or `+4°`) to preserve the physical scrapbook aesthetic.

### 5.3 Washi Tape & Ribbon Bows
- **Washi Tape:** Semi-translucent aged parchment strips (`rgba(232, 196, 138, 0.7)`) with jagged torn edges, angled across photo corners or top centers.
- **Ribbon Bows:** Dimensional red velvet bows anchoring scrapbook corners.

### 5.4 Candlelight & Fairy Lights
- Warm amber point lights (`#ffcc66`) with soft radial drop-offs.
- Subtle opacity flicker animations mimicking living flames.

---

## 6. Component Visual Rules

### 6.1 Buttons (`VintageButton`)
- **Primary / Gold:** Antique bronze border with a gold-leaf gradient background, dark ink typography, and an amber hover glow.
- **Sage Pill ("BACK ◂"):** Rounded full pill in muted olive sage (`#87b07c`), dark charcoal text, white inset highlight ring, placed in the top-right corner.
- **Wax Seal Variant:** Circular embossed button with wax-stamp texture and scale-down active state (`active:scale-95`).

### 6.2 Paper Cards (`PaperCard`)
- Always include the dual-layer background: warm gradient plus fine grain noise overlay (`.paper-texture`).
- Border must use semi-translucent gold ink (`rgba(201, 144, 74, 0.3)`).
- Layered shadow system: deep ambient drop shadow combined with soft amber bounce glow.

### 6.3 Photo Frames (`PhotoFrame`)
- Supports four variants: `gold` (baroque gilded), `polaroid` (white paper with wide bottom margin), `classic` (simple dark wood), and `filigree` (double ornate ring).
- Caption text must strictly use `.font-handwriting` to look hand-inscribed with a fountain pen.

---

## 7. Responsive Principles

### 7.1 Breakpoints
- **Mobile (< 640px):** Single-column layout. Reduce rotation angles to maximum `±2°` to prevent horizontal viewport clipping. Floating particles reduced by 50% for mobile GPU efficiency.
- **Tablet (640px – 1024px):** 2-column layouts for selection and gallery grids. Full touch hitboxes (minimum `48×48px` for all clickable artifacts).
- **Desktop (> 1024px):** Full cinematic widescreen presentation. Multi-layer parallax depth planes (foreground, midground, background). Ambient floating decorations enabled.

### 7.2 Safe Areas
- Top margin of `80px` reserved for navigation/back controls.
- Bottom margin of `60px` reserved for scene progress and audio indicators.

---

## 8. Performance Expectations

- **Rendering Budget:** 60fps locked on mobile devices.
- **Hardware Acceleration:** All animated elements must use `.gpu-accelerated` (`transform: translateZ(0)`).
- **Zero Reflow Policy:** Under no circumstances should width, height, margin, or layout properties be animated. Only `transform` (`x`, `y`, `scale`, `rotation`) and `opacity` are permitted.
- **Asset Weight:** Image assets compressed via AVIF/WebP under 150KB per photo; decorative SVGs inlined or precached.