// ─────────────────────────────────────────────────────────────
// UI Primitive Component Prop Types
// Type definitions for VintageButton, PaperCard, PhotoFrame, and FloatingDecoration.
// ─────────────────────────────────────────────────────────────

import type React from "react";

// ── VintageButton Props ───────────────────────────────────────
export type VintageButtonVariant =
  | "primary"
  | "secondary"
  | "gold"
  | "ghost"
  | "wax-seal";

export type VintageButtonSize = "sm" | "md" | "lg";

export interface VintageButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual theme variant */
  variant?: VintageButtonVariant;
  /** Sizing tier */
  size?: VintageButtonSize;
  /** Whether to show an ornate vintage flourish icon/ornament */
  ornate?: boolean;
  /** Loading or busy state */
  isLoading?: boolean;
}

// ── PaperCard Props ───────────────────────────────────────────
export type PaperCardVariant = "plain" | "aged" | "torn" | "deckle";
export type PaperCardShadow = "none" | "sm" | "md" | "lg" | "xl";

export interface PaperCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Paper appearance style */
  variant?: PaperCardVariant;
  /** Depth shadow level */
  shadow?: PaperCardShadow;
  /** Rotation angle in degrees (e.g. -2, 1.5) for scrapbook tilt */
  rotation?: number;
  /** Whether to display the textured grain / overlay */
  hasTexture?: boolean;
  /** Optional border styling preset */
  hasBorder?: boolean;
}

// ── PhotoFrame Props ──────────────────────────────────────────
export type PhotoFrameVariant = "gold" | "polaroid" | "classic" | "filigree";

export interface PhotoFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Photo frame aesthetic */
  variant?: PhotoFrameVariant;
  /** Rotation angle in degrees for scrapbook tilt */
  rotation?: number;
  /** Handwritten or editorial caption below the photo */
  caption?: string;
  /** Date label displayed alongside or under caption */
  date?: string;
  /** Aspect ratio preset */
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  /** Optional tape / pin decor ('top-center' | 'corners' | 'none') */
  tapeStyle?: "top-center" | "corners" | "none";
}

// ── FloatingDecoration Props ──────────────────────────────────
export type FloatingMovementPreset =
  | "float"
  | "drift"
  | "drift-reverse"
  | "sway"
  | "sparkle"
  | "none";

export interface FloatingDecorationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Movement style preset */
  preset?: FloatingMovementPreset;
  /** Animation duration in seconds (defaults based on preset) */
  duration?: number;
  /** Initial delay in seconds */
  delay?: number;
  /** Amplitude / vertical translation distance in pixels */
  distance?: number;
  /** Degree of tilt/rotation oscillation */
  rotationRange?: number;
  /** Depth layer for z-index and blur perspective (1 = closest, 3 = farthest) */
  depth?: 1 | 2 | 3;
}
