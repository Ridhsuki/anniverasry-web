// ─────────────────────────────────────────────────────────────
// GSAP Core Setup & Utilities
// Centralises GSAP plugin registration, ScrollTrigger integration,
// and core tween lifecycle management.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export { fadeIn, fadeOut, reveal, reveal as staggerReveal } from "./fade";

// ── Plugin Registration ────────────────────────────────────────
/**
 * Register GSAP plugins once, safely on the client side.
 * Call this once inside a useEffect or a client-side initialiser.
 */
export function registerGSAPPlugins(): void {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
}

// ── Default Easing Presets ─────────────────────────────────────
export const EASE = {
  /** Smooth cinematic entry */
  smooth: "power2.out",
  /** Elastic bounce — use sparingly */
  elastic: "elastic.out(1, 0.5)",
  /** Snappy exit */
  snap: "power3.inOut",
  /** Very slow, dramatic reveal */
  cinematic: "power4.out",
  /** Custom cubic — similar to CSS ease */
  custom: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
} as const;

// ── Default Duration Presets ───────────────────────────────────
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  cinematic: 1.8,
} as const;

// ── Utility: Create ScrollTrigger ─────────────────────────────
/**
 * Attach a GSAP tween to a ScrollTrigger.
 * Wraps the common pattern to keep components clean.
 */
export function createScrollAnimation(
  target: gsap.TweenTarget,
  animationVars: gsap.TweenVars,
  scrollOptions: Partial<ScrollTrigger.Vars> = {}
): gsap.core.Tween | null {
  if (typeof window === "undefined" || !target) return null;

  return gsap.to(target, {
    ...animationVars,
    scrollTrigger: {
      trigger: target as Element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...scrollOptions,
    },
  });
}

// ── Utility: Kill all tweens on a target ──────────────────────
/**
 * Clean up GSAP tweens on unmount. Always call in useEffect cleanup.
 */
export function killTweens(target: gsap.TweenTarget): void {
  if (typeof window === "undefined" || !target) return;
  gsap.killTweensOf(target);
}

// ── Re-export gsap and ScrollTrigger for convenience ──────────
export { gsap, ScrollTrigger };
