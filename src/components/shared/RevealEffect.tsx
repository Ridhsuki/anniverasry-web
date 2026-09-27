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

export function RevealEffect({ isActive, className }: { isActive: boolean; className?: string }) {
  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "reveal-bloom-container pointer-events-none absolute inset-0 z-40 flex items-center justify-center select-none overflow-hidden",
        className
      )}
    >
      {/* Central Radiating Golden Light Bloom */}
      <div className="w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(254,240,138,0.85)_0%,_rgba(246,201,78,0.5)_30%,_rgba(201,144,74,0.2)_60%,_transparent_75%)] blur-2xl animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />

      {/* Rotating Celestial Sunburst Rays */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute w-[450px] h-[450px] animate-[spin_12s_linear_infinite] opacity-60 mix-blend-screen"
      >
        <path d="M200 0 L210 200 L200 400 L190 200 Z" fill="url(#rayGold)" />
        <path d="M0 200 L200 210 L400 200 L200 190 Z" fill="url(#rayGold)" />
        <path d="M58 58 L207 193 L342 342 L193 207 Z" fill="url(#rayGold)" opacity="0.7" />
        <path d="M58 342 L193 207 L342 58 L207 193 Z" fill="url(#rayGold)" opacity="0.7" />
        <defs>
          <radialGradient id="rayGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Scattered Golden Sparkle Stars */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="absolute -top-12 left-1/3 text-gold text-2xl animate-[pulse_1s_ease-in-out_infinite]">✦</span>
        <span className="absolute -bottom-10 right-1/3 text-[#fef08a] text-xl animate-[pulse_1.2s_ease-in-out_infinite]">✦</span>
        <span className="absolute top-1/4 -right-8 text-gold text-lg animate-[pulse_0.9s_ease-in-out_infinite]">✧</span>
        <span className="absolute bottom-1/4 -left-8 text-[#fde68a] text-xl animate-[pulse_1.1s_ease-in-out_infinite]">✧</span>
      </div>
    </div>
  );
}
