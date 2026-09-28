// ─────────────────────────────────────────────────────────────
// Lenis Smooth Scroll — Singleton Instance
// Initialises Lenis with sensible defaults and exposes
// start/stop/destroy helpers.
//
// Usage: import in a Client Component provider and call
// initLenis() inside a useEffect.
// ─────────────────────────────────────────────────────────────

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { registerGSAPPlugins } from "@/animations/gsap";

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let scrollListener: (() => void) | null = null;

// ── Configuration ──────────────────────────────────────────────
const LENIS_OPTIONS: ConstructorParameters<typeof Lenis>[0] = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

// ── Lifecycle Helpers ─────────────────────────────────────────
/**
 * Initialise Lenis, synchronize with GSAP ticker, and connect ScrollTrigger.
 * Safe to call multiple times — returns existing instance if already running.
 */
export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  registerGSAPPlugins();

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  lenisInstance = new Lenis({
    ...LENIS_OPTIONS,
    duration: prefersReducedMotion ? 0.001 : 1.2,
    smoothWheel: !prefersReducedMotion,
  });

  // Synchronize ScrollTrigger with Lenis scroll positions
  scrollListener = () => {
    ScrollTrigger.update();
  };
  lenisInstance.on("scroll", scrollListener);

  // Bind Lenis animation frame to GSAP ticker for zero-latency frame lock
  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

/**
 * Stop the Lenis scroll (pause ticker and movement without destroying instance).
 */
export function stopLenis(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  lenisInstance?.stop();
}

/**
 * Destroy the Lenis instance completely (call on unmount).
 */
export function destroyLenis(): void {
  stopLenis();
  if (lenisInstance && scrollListener) {
    lenisInstance.off("scroll", scrollListener);
    scrollListener = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
}

/**
 * Get the current Lenis instance (may be null if not initialised).
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Scroll to a target element or position programmatically.
 */
export function scrollTo(
  target: HTMLElement | number | string,
  options?: Parameters<Lenis["scrollTo"]>[1]
): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else if (typeof window !== "undefined") {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: options?.immediate ? "instant" : "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }
}

export { Lenis };
