// ─────────────────────────────────────────────────────────────
// GSAP Core Setup & Utilities
// Centralises all GSAP imports, plugin registration, and
// reusable animation helpers for use throughout the app.
// All functions guard against SSR via typeof window checks.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

// ── Utility: Fade In ───────────────────────────────────────────
/**
 * Fade an element in from opacity 0 with optional Y offset.
 * Returns the tween so callers can add it to a timeline.
 */
export function fadeIn(
  target: gsap.TweenTarget,
  options: {
    duration?: number;
    ease?: string;
    delay?: number;
    y?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = DURATION.normal,
    ease = EASE.smooth,
    delay = 0,
    y = 20,
  } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease, delay }
  );
}

// ── Utility: Fade Out ──────────────────────────────────────────
export function fadeOut(
  target: gsap.TweenTarget,
  options: {
    duration?: number;
    ease?: string;
    delay?: number;
    y?: number;
  } = {}
): gsap.core.Tween {
  const {
    duration = DURATION.fast,
    ease = EASE.snap,
    delay = 0,
    y = -20,
  } = options;

  return gsap.to(target, { opacity: 0, y, duration, ease, delay });
}

// ── Utility: Stagger Reveal ────────────────────────────────────
/**
 * Reveal a list of elements with a stagger delay.
 * Ideal for photo grids, card lists, and text lines.
 */
export function staggerReveal(
  targets: gsap.TweenTarget,
  options: {
    stagger?: number;
    duration?: number;
    ease?: string;
    y?: number;
    delay?: number;
  } = {}
): gsap.core.Tween {
  const {
    stagger = 0.1,
    duration = DURATION.normal,
    ease = EASE.smooth,
    y = 30,
    delay = 0,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease, stagger, delay }
  );
}

// ── Utility: Create ScrollTrigger ─────────────────────────────
/**
 * Attach a GSAP tween to a ScrollTrigger.
 * Wraps the common pattern to keep components clean.
 */
export function createScrollAnimation(
  target: gsap.TweenTarget,
  animationVars: gsap.TweenVars,
  scrollOptions: Partial<ScrollTrigger.Vars> = {}
): gsap.core.Tween {
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
  gsap.killTweensOf(target);
}

// ── Re-export gsap and ScrollTrigger for convenience ──────────
export { gsap, ScrollTrigger };
