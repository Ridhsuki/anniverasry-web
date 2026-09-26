// ─────────────────────────────────────────────────────────────
// Site Constants
// Central source of truth for site-wide configuration values.
// Import from here — never hard-code strings across components.
// ─────────────────────────────────────────────────────────────

import type { NavItem, SiteMetadata } from "@/types";

// ── Site Metadata ─────────────────────────────────────────────
export const SITE_METADATA: SiteMetadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? "Anniversary",
  description: "A love letter, told through memories.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000",
};

// ── Navigation ────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "story", label: "Our Story", href: "#story" },
  { id: "gallery", label: "Gallery", href: "#gallery" },
  { id: "letter", label: "Love Letter", href: "#letter" },
];

// ── Feature Flags ─────────────────────────────────────────────
export const FEATURES = {
  audio: process.env.NEXT_PUBLIC_ENABLE_AUDIO === "true",
  animations: process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS !== "false",
} as const;

// ── Breakpoints (in px — mirrors Tailwind defaults) ───────────
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// ── Z-Index Scale ─────────────────────────────────────────────
export const Z_INDEX = {
  background: -1,
  decorations: 0,
  content: 10,
  overlay: 20,
  modal: 30,
  navbar: 40,
  tooltip: 50,
} as const;

// ── Animation Durations (ms) ──────────────────────────────────
export const ANIMATION_DURATION = {
  fast: 300,
  normal: 600,
  slow: 1000,
  cinematic: 1800,
} as const;
