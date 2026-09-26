// ─────────────────────────────────────────────────────────────
// useMediaQuery Hook
// Returns true/false based on a CSS media query string.
// Implemented via React 19 useSyncExternalStore for tear-free,
// cascade-free subscription to window.matchMedia.
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * useMediaQuery
 *
 * @param query - A valid CSS media query string
 * @returns boolean — true when the query matches
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ── Pre-defined breakpoint hooks ──────────────────────────────
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
