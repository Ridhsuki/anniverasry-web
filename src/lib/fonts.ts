// ─────────────────────────────────────────────────────────────
// Font Definitions — next/font/google
//
// Strategy:
// - All fonts are defined here as a single module (fonts.ts)
// - Each font exposes a CSS variable so Tailwind + CSS tokens
//   can reference them without coupling to className strings
// - Fonts are preloaded at the layout level for optimal LCP
// - Variable fonts are used wherever possible (one file, all weights)
//
// CSS variable mapping (set in layout.tsx <html> className):
//   --font-cormorant  → Display / headings (Cormorant Garamond)
//   --font-playfair   → Serif body / cards (Playfair Display)
//   --font-inter      → UI / labels (Inter)
//   --font-dancing    → Handwriting / captions (Dancing Script)
// ─────────────────────────────────────────────────────────────

import {
  Cormorant_Garamond,
  Dancing_Script,
  Inter,
  Playfair_Display,
} from "next/font/google";

// ── Display Font — Cormorant Garamond ─────────────────────────
// Used for: hero headlines, scene titles, dramatic type
// Rationale: Classical, cinematic, high contrast serifs
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// ── Serif Body Font — Playfair Display ───────────────────────
// Used for: section headings, card titles, pull quotes
// Rationale: Editorial, warm, pairs beautifully with Cormorant
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

// ── Sans-Serif UI Font — Inter ────────────────────────────────
// Used for: navigation, buttons, labels, body copy, captions
// Rationale: Highly legible, neutral, modern — doesn't compete
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

// ── Handwriting Font — Dancing Script ────────────────────────
// Used for: love letter text, photo captions, personal notes
// Rationale: Elegant cursive, romantic and personal feeling
export const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
  fallback: ["cursive"],
});

// ── Combined className for <html> element ─────────────────────
// Apply all font CSS variables at the root so all descendants
// can reference them via var(--font-*)
export const fontVariables = [
  cormorant.variable,
  playfair.variable,
  inter.variable,
  dancing.variable,
].join(" ");

// ── Font metadata (for documentation / Storybook) ─────────────
export const FONT_ROLES = {
  display: {
    variable: "--font-cormorant",
    family: "Cormorant Garamond",
    usage: "Hero titles, scene names, dramatic headings",
    weights: [300, 400, 500, 600, 700],
  },
  serif: {
    variable: "--font-playfair",
    family: "Playfair Display",
    usage: "Section headings, card titles, editorial text",
    weights: [400, 500, 600, 700, 800, 900],
  },
  sans: {
    variable: "--font-inter",
    family: "Inter",
    usage: "Navigation, UI labels, body copy, captions",
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  handwriting: {
    variable: "--font-dancing",
    family: "Dancing Script",
    usage: "Love letter, photo captions, personal notes",
    weights: [400, 500, 600, 700],
  },
} as const;
