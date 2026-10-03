// ─────────────────────────────────────────────────────────────
// FloatingDecoration
// Reusable animated container for ambient decorative elements
// (e.g. falling rose petals, fluttering butterflies, gold sparkles, dust motes).
// Provides built-in physics presets, depth layers, and reduced-motion handling.
// ─────────────────────────────────────────────────────────────

"use client";

import { forwardRef, useEffect, useRef } from "react";

import { floatingMovement } from "@/animations/floating";
import type { FloatingDecorationProps } from "@/types/components";
import { cn } from "@/utils";

const depthClasses = {
  1: "z-20 scale-100 opacity-100", // Foreground
  2: "z-10 scale-90 opacity-80",   // Midground
  3: "z-0 scale-75 opacity-50 blur-[0.5px]", // Background
};

export const FloatingDecoration = forwardRef<
  HTMLDivElement,
  FloatingDecorationProps
>(
  (
    {
      preset = "float",
      duration,
      delay = 0,
      distance = 14,
      rotationRange = 3,
      depth = 2,
      className,
      style,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      // Respect user's accessibility reduced motion setting
      if (typeof window === "undefined") return;
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches || preset === "none") return;

      const element = internalRef.current;
      if (!element) return;

      // Skip expensive GSAP tweens on mobile/touch devices — they cause scroll glitch
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      if (isCoarsePointer) return;

      let yDist = distance;
      let xDist = distance * 0.4;
      let dur = duration ?? 4;

      switch (preset) {
        case "drift":
          yDist = distance * 1.5;
          xDist = distance * 0.8;
          dur = duration ?? 6;
          break;
        case "drift-reverse":
          yDist = -distance * 1.5;
          xDist = -distance * 0.8;
          dur = duration ?? 6;
          break;
        case "sway":
          yDist = distance * 0.5;
          xDist = distance * 1.2;
          dur = duration ?? 3.5;
          break;
        case "sparkle":
          yDist = distance * 0.3;
          xDist = distance * 0.3;
          dur = duration ?? 2;
          break;
        case "float":
        default:
          yDist = distance;
          xDist = distance * 0.4;
          dur = duration ?? 4;
          break;
      }

      const tween = floatingMovement(element, {
        duration: dur,
        delay,
        yDistance: yDist,
        xDistance: xDist,
        rotationAngle: rotationRange,
      });

      return () => {
        tween?.kill();
      };
    }, [preset, duration, delay, distance, rotationRange]);

    return (
      <div
        ref={(node) => {
          internalRef.current = node;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        aria-hidden="true"
        style={style}
        className={cn(
          "pointer-events-none absolute select-none gpu-accelerated",
          depthClasses[depth],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FloatingDecoration.displayName = "FloatingDecoration";
