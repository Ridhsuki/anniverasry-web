// ─────────────────────────────────────────────────────────────
// General Utility Functions
// Pure helper functions with no side effects.
// Keep each function small and well-documented.
// ─────────────────────────────────────────────────────────────

// ── String Utilities ──────────────────────────────────────────

/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to `clsx` for simple cases.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Number Utilities ──────────────────────────────────────────

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values.
 * t should be in [0, 1].
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Map a value from one range to another.
 * Useful for scroll-linked animation mappings.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

// ── Date / Time Utilities ─────────────────────────────────────

/**
 * Format a date for display (e.g. "January 1, 2024").
 */
export function formatDate(
  date: string | Date,
  locale: string = "en-US"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculate the number of days between two dates.
 */
export function daysBetween(dateA: Date, dateB: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor(Math.abs(dateB.getTime() - dateA.getTime()) / msPerDay);
}

// ── DOM Utilities ─────────────────────────────────────────────

/**
 * Returns true when code is running in a browser context.
 * Use this before accessing window, document, etc.
 */
export const isBrowser = (): boolean => typeof window !== "undefined";

/**
 * Safely get a CSS custom property value.
 */
export function getCSSVar(name: string, element?: Element): string {
  if (!isBrowser()) return "";
  const el = element ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(name).trim();
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle a function call (leading edge).
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastRan = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRan >= limit) {
      lastRan = now;
      fn(...args);
    }
  };
}
