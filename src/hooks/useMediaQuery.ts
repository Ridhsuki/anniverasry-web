// ─────────────────────────────────────────────────────────────
// useMediaQuery Hook
// Returns true/false based on a CSS media query string.
// Used for responsive animation decisions (e.g. disable heavy
// animations on mobile to preserve performance).
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";

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
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// ── Pre-defined breakpoint hooks ──────────────────────────────
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
