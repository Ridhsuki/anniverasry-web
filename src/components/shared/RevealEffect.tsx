// ─────────────────────────────────────────────────────────────
// RevealEffect
// Luminous opening bloom effect triggered upon gift/envelope unsealing.
// GSAP-driven multi-stage radial bloom: initial flash, organic expansion,
// rotating celestial rays, and scattered starlight flares.
// Rendered as fixed inset-0 overlay so it is never clipped by parent bounds.
// ─────────────────────────────────────────────────────────────

"use client";

import { useRef } from "react";

import { useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/utils";

export function RevealEffect({
  isActive,
  className,
}: {
  isActive: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP-driven organic bloom — lightweight on mobile, cinematic on desktop
  useGSAP(
    (gsapInstance) => {
      if (!isActive || !containerRef.current) return;

      const isMobile =
        typeof window !== "undefined" &&
        (window.matchMedia("(max-width: 768px)").matches ||
          window.matchMedia("(pointer: coarse)").matches);

      const tl = gsapInstance.timeline();

      if (isMobile) {
        // Fast, hardware-accelerated mobile bloom without GPU raster stall
        tl.fromTo(
          ".bloom-halo-outer",
          { scale: 0.2, opacity: 0 },
          {
            scale: 1.05,
            opacity: 0.85,
            duration: 0.28,
            ease: "power2.out",
          }
        );
        tl.fromTo(
          ".bloom-halo-core",
          { scale: 0.15, opacity: 0 },
          {
            scale: 0.85,
            opacity: 0.95,
            duration: 0.24,
            ease: "power2.out",
          },
          "<"
        );

        tl.to(
          ".bloom-halo-outer",
          {
            scale: 1.55,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          "+=0.05"
        );
        tl.to(
          ".bloom-halo-core",
          {
            scale: 1.25,
            opacity: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          "<"
        );

        // Twinkle sparkles
        tl.fromTo(
          ".bloom-sparkle",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 0.95,
            duration: 0.22,
            stagger: 0.03,
          },
          0.1
        );
        tl.to(
          ".bloom-sparkle",
          {
            opacity: 0,
            scale: 1.2,
            duration: 0.45,
          },
          0.45
        );
      } else {
        // 1. Warm organic ignition: halos blossom outward smoothly without harsh flash
        tl.fromTo(
          ".bloom-halo-outer",
          { scale: 0.12, opacity: 0 },
          {
            scale: 1.1,
            opacity: 0.82,
            duration: 0.38,
            ease: "power2.out",
          }
        );
        tl.fromTo(
          ".bloom-halo-core",
          { scale: 0.08, opacity: 0 },
          {
            scale: 0.85,
            opacity: 0.95,
            duration: 0.32,
            ease: "power2.out",
          },
          "<"
        );

        // 2. Majestic outward expansion with soft lingering dissipation
        tl.to(
          ".bloom-halo-outer",
          {
            scale: 3.4,
            opacity: 0,
            duration: 1.75,
            ease: "power2.out",
          },
          "+=0.08"
        );
        tl.to(
          ".bloom-halo-core",
          {
            scale: 2.6,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          "<"
        );

        // 3. Celestial rays sweep in, rotate, and fade gracefully
        tl.fromTo(
          ".bloom-rays",
          { scale: 0.2, opacity: 0, rotation: -10 },
          {
            scale: 1.7,
            opacity: 0.7,
            rotation: 35,
            duration: 1.25,
            ease: "power2.out",
          },
          0.08
        );
        tl.to(
          ".bloom-rays",
          {
            scale: 2.4,
            opacity: 0,
            rotation: 80,
            duration: 0.8,
            ease: "power1.inOut",
          },
          1.05
        );

        // 4. Sparkle flares twinkle in with staggered charm then disperse
        tl.fromTo(
          ".bloom-sparkle",
          { scale: 0, opacity: 0 },
          {
            scale: 1.1,
            opacity: 0.95,
            duration: 0.35,
            ease: "back.out(2.2)",
            stagger: 0.05,
          },
          0.2
        );
        tl.to(
          ".bloom-sparkle",
          {
            opacity: 0,
            scale: 1.35,
            duration: 0.6,
            ease: "power1.in",
            stagger: 0.04,
          },
          1.1
        );
      }
    },
    [isActive],
    containerRef
  );

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "reveal-bloom-container pointer-events-none fixed inset-0 z-50 flex items-center justify-center select-none overflow-visible",
        className
      )}
    >
      {/* Layer 1: Wide Atmospheric Ambient Halo */}
      <div
        className="bloom-halo-outer absolute w-[360px] sm:w-[500px] md:w-[1120px] h-[360px] sm:h-[500px] md:h-[1120px] rounded-full gpu-accelerated"
        style={{
          background:
            "radial-gradient(circle, rgba(254,240,138,0.40) 0%, rgba(246,201,78,0.18) 32%, rgba(201,144,74,0.06) 62%, transparent 75%)",
          filter: "blur(45px)",
        }}
      />

      {/* Layer 2: Radiant Warm Golden Core — luminous without harsh blinding flash */}
      <div
        className="bloom-halo-core absolute w-[220px] sm:w-[320px] md:w-[480px] h-[220px] sm:h-[320px] md:h-[480px] rounded-full gpu-accelerated"
        style={{
          background:
            "radial-gradient(circle, rgba(255,253,242,0.96) 0%, rgba(254,240,138,0.85) 25%, rgba(246,201,78,0.5) 55%, transparent 75%)",
          filter: "blur(24px)",
        }}
      />

      {/* Layer 3: Rotating Celestial Sunburst Rays */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
        className="bloom-rays absolute w-[560px] md:w-[760px] h-[560px] md:h-[760px] mix-blend-screen gpu-accelerated"
      >
        <defs>
          <radialGradient id="rayGoldGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#fef08a" stopOpacity="0.82" />
            <stop offset="58%" stopColor="#f59e0b" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M250 0 L263 250 L250 500 L237 250 Z" fill="url(#rayGoldGrad)" />
        <path d="M0 250 L250 263 L500 250 L250 237 Z" fill="url(#rayGoldGrad)" />
        <path d="M73 73 L258 242 L427 427 L242 258 Z" fill="url(#rayGoldGrad)" opacity="0.78" />
        <path d="M73 427 L242 258 L427 73 L258 242 Z" fill="url(#rayGoldGrad)" opacity="0.78" />
        <path d="M128 0 L255 248 L128 500 L245 250 Z" fill="url(#rayGoldGrad)" opacity="0.45" />
        <path d="M372 0 L255 248 L372 500 L265 250 Z" fill="url(#rayGoldGrad)" opacity="0.45" />
      </svg>

      {/* Layer 4: Scattered Starlight Flares */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="bloom-sparkle absolute -top-24 left-1/3 text-gold text-3xl drop-shadow-[0_0_14px_rgba(246,201,78,0.9)] gpu-accelerated">
          ✦
        </span>
        <span className="bloom-sparkle absolute -bottom-20 right-1/3 text-[#fef08a] text-2xl drop-shadow-[0_0_10px_rgba(254,240,138,0.85)] gpu-accelerated">
          ✦
        </span>
        <span className="bloom-sparkle absolute top-1/4 -right-16 text-gold text-2xl drop-shadow-[0_0_9px_rgba(246,201,78,0.85)] gpu-accelerated">
          ✧
        </span>
        <span className="bloom-sparkle absolute bottom-1/4 -left-16 text-[#fde68a] text-2xl drop-shadow-[0_0_9px_rgba(254,240,138,0.85)] gpu-accelerated">
          ✧
        </span>
        <span className="bloom-sparkle absolute top-1/2 -translate-y-1/2 -left-24 text-gold text-xl drop-shadow-[0_0_8px_rgba(246,201,78,0.8)] gpu-accelerated">
          ✦
        </span>
        <span className="bloom-sparkle absolute top-1/2 -translate-y-1/2 -right-24 text-[#fef08a] text-xl drop-shadow-[0_0_8px_rgba(254,240,138,0.8)] gpu-accelerated">
          ✦
        </span>
      </div>
    </div>
  );
}
