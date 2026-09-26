// ─────────────────────────────────────────────────────────────
// Global Type Definitions
// Shared TypeScript interfaces and types used across the app.
// ─────────────────────────────────────────────────────────────

export * from "./scenes";
export * from "./components";
export * from "./animations";

// ── Site Metadata ─────────────────────────────────────────────
export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  ogImage?: string;
}

// ── Animation ─────────────────────────────────────────────────
export type AnimationDirection = "up" | "down" | "left" | "right";
export type AnimationEase = "smooth" | "elastic" | "snap" | "cinematic";

export interface AnimationConfig {
  duration?: number;
  ease?: AnimationEase | string;
  delay?: number;
  direction?: AnimationDirection;
  stagger?: number;
}

// ── Audio ──────────────────────────────────────────────────────
export interface AudioConfig {
  src: string[];
  loop: boolean;
  volume: number;
  label: string;
}

// ── Photo / Gallery ───────────────────────────────────────────
export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  /** Date the photo was taken (ISO string) */
  dateTaken?: string;
}

export interface GallerySection {
  id: string;
  title: string;
  description?: string;
  photos: Photo[];
}

// ── Story Section ─────────────────────────────────────────────
export interface StoryEntry {
  id: string;
  date: string;
  title: string;
  body: string;
  media?: {
    type: "image" | "video";
    src: string;
    alt?: string;
  };
}

// ── Decorative Element ────────────────────────────────────────
export interface DecorativeElement {
  id: string;
  src: string;
  alt: string;
  /** Initial position as CSS percentage strings */
  initialX: string;
  initialY: string;
  size: number;
  /** Float animation speed multiplier */
  floatSpeed?: number;
}

// ── Navigation ────────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  /** anchor target (e.g. "#gallery") */
  href: string;
}

// ── Generic utility types ──────────────────────────────────────
export type WithChildren<T = object> = T & { children: React.ReactNode };
export type WithClassName<T = object> = T & { className?: string };
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
