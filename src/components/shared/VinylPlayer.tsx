// ─────────────────────────────────────────────────────────────
// VinylPlayer
// Interactive skeuomorphic vinyl record player component.
// Features grooved vinyl disc with specular reflections, 3D heart label,
// tonearm needle engagement, and continuous rotation during playback.
// Visual benchmark: docs/references/screenshots/playlist-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import type { PlaylistTrack } from "@/data/playlist";
import { cn } from "@/utils";

export interface VinylPlayerProps {
  track: PlaylistTrack;
  isPlaying: boolean;
  onTogglePlay: () => void;
  className?: string;
}

export function VinylPlayer({
  track,
  isPlaying,
  onTogglePlay,
  className,
}: VinylPlayerProps) {
  return (
    <div
      className={cn(
        "vinyl-turntable relative flex flex-col items-center justify-center select-none",
        className
      )}
    >
      {/* Turntable Platter Base Housing */}
      <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-full p-2 bg-gradient-to-br from-[#1a120c] via-[#0d0704] to-[#050201] border-2 border-[#c9904a]/40 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_0_24px_rgba(0,0,0,0.9)]">
        {/* Subtle Brass Platter Edge Ring */}
        <div className="absolute inset-1.5 rounded-full border border-[#d9a85f]/30 pointer-events-none" />

        {/* ── Rotating Grooved Vinyl Disc ─────────────────────── */}
        <div
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? "Pause vinyl record" : "Play vinyl record"}
          onClick={onTogglePlay}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onTogglePlay();
            }
          }}
          className={cn(
            "group relative w-full h-full rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold overflow-hidden",
            "bg-[#0a0a0a] shadow-[0_8px_32px_rgba(0,0,0,0.9)]",
            "transition-transform duration-700 ease-out",
            isPlaying && "animate-[spin_4s_linear_infinite]"
          )}
        >
          {/* Vinyl Grooves Texture */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:4px_4px] opacity-40" />

          {/* Concentric Vinyl Grooves SVG */}
          <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
            <circle cx="100" cy="100" r="92" stroke="#222222" strokeWidth="0.75" />
            <circle cx="100" cy="100" r="84" stroke="#1c1c1c" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="76" stroke="#262626" strokeWidth="0.75" />
            <circle cx="100" cy="100" r="68" stroke="#1f1f1f" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" stroke="#262626" strokeWidth="0.75" />
            <circle cx="100" cy="100" r="52" stroke="#1a1a1a" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="44" stroke="#262626" strokeWidth="0.5" />
          </svg>

          {/* Light Sheen Reflection Angles (Two Opposing Light Cones) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-35 mix-blend-screen bg-[conic-gradient(from_45deg,_transparent_0deg,_rgba(255,255,255,0.18)_45deg,_transparent_90deg,_transparent_180deg,_rgba(255,255,255,0.18)_225deg,_transparent_270deg)]"
          />

          {/* Center Paper Label Border */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-[#2a1708] via-[#1a0c04] to-[#0a0502] border-2 border-[#c9904a]/70 flex flex-col items-center justify-center p-2 shadow-inner">
            {/* Center Label Typography */}
            <div className="text-center pointer-events-none z-10 scale-90">
              <span className="font-handwriting text-gold/90 text-xs block leading-none truncate max-w-[80px]">
                {track.title}
              </span>
              <span className="font-serif text-[0.55rem] text-[#e8c48a]/70 tracking-widest uppercase block mt-0.5">
                {track.artist}
              </span>
            </div>

            {/* ── 3D Red Heart Play Button ───────────────────── */}
            <div
              className={cn(
                "relative mt-1 w-9 h-9 flex items-center justify-center rounded-full transition-transform duration-300",
                "group-hover:scale-110 active:scale-95"
              )}
            >
              <svg viewBox="0 0 36 36" fill="none" className="w-full h-full drop-shadow-[0_2px_8px_rgba(220,38,38,0.7)]">
                <defs>
                  <radialGradient id="heartRed3D" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#f87171" />
                    <stop offset="35%" stopColor="#dc2626" />
                    <stop offset="80%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </radialGradient>
                </defs>
                <path
                  d="M18 31 C10 23, 2 16, 2 9.5 C2 4.5, 6.5 2, 11.5 2 C15 2, 16.5 3.5, 18 5 C19.5 3.5, 21 2, 24.5 2 C29.5 2, 34 4.5, 34 9.5 C34 16, 26 23, 18 31 Z"
                  fill="url(#heartRed3D)"
                  stroke="#450a0a"
                  strokeWidth="0.75"
                />
              </svg>

              {/* Play / Pause Symbol */}
              <span className="absolute text-white text-xs font-bold leading-none -mt-0.5 pl-0.5 select-none drop-shadow-md">
                {isPlaying ? "❚❚" : "▶"}
              </span>
            </div>

            {/* Center Spindle Hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#050201] border border-[#c9904a] shadow-inner" />
          </div>
        </div>

        {/* ── Turntable Tonearm & Needle Stylus ───────────────── */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-4 -right-2 w-28 h-36 origin-top-right transition-transform duration-700 ease-out z-20",
            isPlaying ? "rotate-[18deg]" : "rotate-0"
          )}
        >
          {/* Base Pivot Mount */}
          <div className="absolute top-2 right-4 w-7 h-7 rounded-full bg-gradient-to-br from-[#d9a85f] to-[#78350f] border border-[#fef08a]/60 shadow-md flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#1c1917] border border-[#c9904a]" />
          </div>
          {/* Silver Tonearm Rod */}
          <div className="absolute top-5 right-7 w-20 h-1 bg-gradient-to-r from-[#d1d5db] via-[#f3f4f6] to-[#9ca3af] origin-right transform -rotate-[45deg] rounded-full shadow-sm" />
          {/* Cartridge & Stylus Head */}
          <div className="absolute bottom-6 left-2 w-4 h-6 bg-[#18181b] border border-[#c9904a]/70 rounded-xs shadow-md transform -rotate-[45deg] flex items-center justify-center">
            <div className="w-1 h-2 bg-rose rounded-xs" />
          </div>
        </div>
      </div>

      {/* Turntable Subtle Shadow Grounding */}
      <div className="w-48 h-4 rounded-full bg-black/50 blur-md -mt-2 pointer-events-none" />
    </div>
  );
}
