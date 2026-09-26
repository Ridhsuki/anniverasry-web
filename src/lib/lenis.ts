// ─────────────────────────────────────────────────────────────
// Lenis Smooth Scroll — Singleton Instance
// Initialises Lenis with sensible defaults and exposes
// start/stop/destroy helpers.
//
// Usage: import in a Client Component provider and call
// initLenis() inside a useEffect.
// ─────────────────────────────────────────────────────────────

import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

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
 * Initialise Lenis and start the RAF loop.
 * Safe to call multiple times — returns existing instance if already running.
 */
export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis(LENIS_OPTIONS);

  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);
  return lenisInstance;
}

/**
 * Stop the Lenis scroll (pause RAF without destroying instance).
 */
export function stopLenis(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lenisInstance?.stop();
}

/**
 * Destroy the Lenis instance completely (call on route change or unmount).
 */
export function destroyLenis(): void {
  stopLenis();
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
  lenisInstance?.scrollTo(target, options);
}

export { Lenis };
