// ─────────────────────────────────────────────────────────────
// useGSAP Hook
// Safe wrapper for GSAP animations in React components.
// Handles plugin registration, cleanup, and SSR guard.
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { registerGSAPPlugins } from "@/animations/gsap";

type GSAPCallback = (
  gsapInstance: typeof gsap,
  context: gsap.Context
) => void | (() => void);

/**
 * useGSAP
 *
 * A thin React hook that:
 * 1. Registers GSAP plugins once (client-side only)
 * 2. Creates a GSAP context scoped to the provided ref
 * 3. Runs your animation callback inside that context
 * 4. Cleans up all animations on unmount
 *
 * @param callback - Receives gsap + context; may return a cleanup fn
 * @param deps     - React dependency array (like useEffect)
 * @param scope    - Optional ref to scope GSAP selectors to
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useGSAP((gsap) => {
 *   gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 1 });
 * }, [], ref);
 */
export function useGSAP(
  callback: GSAPCallback,
  deps: React.DependencyList = [],
  scope?: React.RefObject<Element | null>
): void {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Guard: GSAP requires the DOM
    if (typeof window === "undefined") return;

    registerGSAPPlugins();

    // Create scoped GSAP context
    const ctx = gsap.context(() => {
      const cleanup = callback(gsap, ctx);
      return cleanup;
    }, scope?.current ?? undefined);

    contextRef.current = ctx;

    return () => {
      ctx.revert(); // Kills all tweens and ScrollTriggers inside this context
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * useScrollTrigger
 *
 * Convenience hook for attaching ScrollTrigger to a ref element.
 * Automatically refreshes ScrollTrigger after fonts / images load.
 *
 * @param callback - Receives the trigger element and ScrollTrigger class
 * @param ref      - The element to use as the ScrollTrigger trigger
 * @param deps     - React dependency array
 */
export function useScrollTrigger(
  callback: (el: Element, ST: typeof ScrollTrigger) => void,
  ref: React.RefObject<Element | null>,
  deps: React.DependencyList = []
): void {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      callback(el, ScrollTrigger);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
    ref
  );
}
