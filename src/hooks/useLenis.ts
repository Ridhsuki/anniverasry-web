// ─────────────────────────────────────────────────────────────
// useLenis Hook
// Initialises Lenis smooth scroll in a React context and
// exposes the instance for scroll-linked animation callbacks.
// ─────────────────────────────────────────────────────────────

"use client";

import type Lenis from "lenis";
import { useEffect, useRef } from "react";


import { destroyLenis, initLenis, scrollTo } from "@/lib/lenis";

interface UseLenisReturn {
  scrollTo: (
    target: HTMLElement | number | string,
    options?: Parameters<InstanceType<typeof Lenis>["scrollTo"]>[1]
  ) => void;
}

/**
 * useLenis
 *
 * Initialises Lenis on mount and destroys it on unmount.
 * Also exposes the Lenis instance via ref for external consumers
 * (e.g., attaching GSAP ScrollTrigger to the Lenis scroll event).
 *
 * @example
 * // In your root layout or a SmoothScrollProvider component:
 * useLenis();
 */
export function useLenis(): UseLenisReturn {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    lenisRef.current = initLenis();

    return () => {
      destroyLenis();
      lenisRef.current = null;
    };
  }, []);

  return { scrollTo };
}

/**
 * useLenisScroll
 *
 * Subscribe to Lenis scroll events for scroll-linked animations.
 * The callback receives the Lenis scroll data on every scroll frame.
 *
 * @param callback - Called on every Lenis scroll tick
 */
export function useLenisScroll(
  callback: (data: { scroll: number; progress: number }) => void
): void {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = initLenis();

    // Lenis scroll handler
    const handler = (e: { scroll: number; progress: number }) => {
      callback(e);
    };

    lenis.on("scroll", handler);

    return () => {
      lenis.off("scroll", handler);
    };
  }, [callback]);
}
