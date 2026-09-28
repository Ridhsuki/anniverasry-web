// ─────────────────────────────────────────────────────────────
// RevealEffect
// Luminous opening bloom effect triggered upon gift/envelope unsealing.
// Radiates golden light rays, celestial sparkles, and warm ambient particle flash.
// ─────────────────────────────────────────────────────────────

"use client";

import { cn } from "@/utils";

export interface RevealEffectProps {
  isActive: boolean;
  className?: string;
}

export function RevealEffect({
  isActive,
  className,
}: {
  isActive: boolean;
  className?: string;
}) {
  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "reveal-bloom-container pointer-events-none fixed inset-0 z-50 flex items-center justify-center select-none overflow-visible",
        className
      )}
    >
      {/* Layer 1: Ambient Wide Atmospheric Halo */}
      <div className="absolute w-[800px] md:w-[1100px] h-[800px] md:h-[1100px] rounded-full bg-[radial-gradient(circle,_rgba(254,240,138,0.45)_0%,_rgba(246,201,78,0.22)_35%,_rgba(201,144,74,0.08)_65%,_transparent_75%)] blur-3xl animate-bloom-expand" />

      {/* Layer 2: Radiant Golden Supernova Core */}
      <div className="absolute w-[360px] md:w-[500px] h-[360px] md:h-[500px] rounded-full bg-[radial-gradient(circle,_#ffffff_0%,_rgba(254,240,138,0.95)_25%,_rgba(246,201,78,0.6)_55%,_transparent_75%)] blur-2xl animate-bloom-expand" />

      {/* Layer 3: Rotating Celestial Sunburst Rays */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        className="absolute w-[550px] md:w-[750px] h-[550px] md:h-[750px] animate-[spin_16s_linear_infinite] opacity-75 mix-blend-screen animate-bloom-expand"
      >
        <path d="M250 0 L262 250 L250 500 L238 250 Z" fill="url(#rayGoldGrad)" />
        <path d="M0 250 L250 262 L500 250 L250 238 Z" fill="url(#rayGoldGrad)" />
        <path d="M73 73 L258 242 L427 427 L242 258 Z" fill="url(#rayGoldGrad)" opacity="0.8" />
        <path d="M73 427 L242 258 L427 73 L258 242 Z" fill="url(#rayGoldGrad)" opacity="0.8" />
        <defs>
          <radialGradient id="rayGoldGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Layer 4: Scattered Starlight Flares */}
      <div className="absolute inset-0 flex items-center justify-center animate-bloom-expand pointer-events-none">
        <span className="absolute -top-24 left-1/3 text-gold text-3xl animate-[pulse_1s_ease-in-out_infinite] drop-shadow-[0_0_12px_rgba(246,201,78,0.8)]">✦</span>
        <span className="absolute -bottom-20 right-1/3 text-[#fef08a] text-2xl animate-[pulse_1.2s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(254,240,138,0.8)]">✦</span>
        <span className="absolute top-1/4 -right-16 text-gold text-2xl animate-[pulse_0.9s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(246,201,78,0.8)]">✧</span>
        <span className="absolute bottom-1/4 -left-16 text-[#fde68a] text-2xl animate-[pulse_1.1s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(254,240,138,0.8)]">✧</span>
      </div>
    </div>
  );
}
