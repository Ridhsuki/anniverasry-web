// ─────────────────────────────────────────────────────────────
// CinematicLayer
// Global cinematic visual polish overlay applied once at app level.
// Adds: radial vignette, warm amber color grading, subtle film grain.
// GPU-friendly: only opacity/transform animated, pointer-events-none,
// does not affect layout geometry in any way.
// ─────────────────────────────────────────────────────────────

"use client";

import { cn } from "@/utils";
import { AmbientParticles } from "./AmbientParticles";

export interface CinematicLayerProps {
  /** Intensity of vignette + color grade (0–1). Default: 1 */
  intensity?: number;
  className?: string;
}

export function CinematicLayer({
  intensity = 1,
  className,
}: CinematicLayerProps) {
  return (
    <div
      aria-hidden="true"
      style={{ opacity: intensity }}
      className={cn(
        "cinematic-layer pointer-events-none fixed inset-0 z-40 select-none gpu-accelerated",
        className
      )}
    >
      {/* ── Layer 1: Warm amber color grade ───────────────────────
          Gentle sepia-tone tint that unifies all scene color palettes.
          mix-blend-multiply preserves dark regions without washing out lights. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(55,18,3,0.07)] mix-blend-multiply pointer-events-none"
      />

      {/* ── Layer 2: Radial vignette border ───────────────────────
          Darkened elliptical edge-burn matching vintage photograph aesthetics.
          Radial gradient from transparent center to deep burgundy perimeter. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_48%,_rgba(4,0,2,0.62)_100%)] pointer-events-none"
      />

      {/* ── Layer 3: Film grain noise texture ─────────────────────
          Very low-opacity SVG fractalNoise pattern tiled across the viewport.
          Lightweight: a single 200×200 SVG data URI repeated at bg-size 200px.
          opacity-[0.032] keeps it subliminal on both light and dark scenes. */}
      <div
        aria-hidden="true"
        className={[
          "absolute inset-0 pointer-events-none opacity-[0.032]",
          "bg-repeat bg-[length:180px_180px]",
        ].join(" ")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Layer 4: Ambient Floating Golden Motes ──────────────── */}
      <AmbientParticles count={20} />
    </div>
  );
}
