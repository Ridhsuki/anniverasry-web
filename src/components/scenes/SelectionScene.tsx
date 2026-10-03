// ─────────────────────────────────────────────────────────────
// SelectionScene
// Scene 2: Interactive chapter or memory selector.
// Visual benchmark: docs/references/screenshots/selection-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef, useState } from "react";

import {
  breathingAnimation,
  dramaticReveal,
  floatingMovement,
  reveal,
} from "@/animations";
import { FloatingDecoration } from "@/components/ui";
import { useExperience } from "@/context/ExperienceContext";
import { SELECTION_CONTENT } from "@/data/selection";
import { useAudio } from "@/hooks/useAudio";
import { useGSAP } from "@/hooks/useGSAP";
import type { CanonicalSceneName, SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

/** Artifact 1: 35mm Vintage Rangefinder Camera resting on aged letters */
function CameraArtifact() {
  return (
    <div className="relative w-36 sm:w-44 md:w-48 lg:w-52 aspect-[5/4] flex items-center justify-center select-none">
      {/* Tilted aged correspondence envelopes in background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-2 -bottom-2 top-3 -rotate-3 rounded-xs bg-[#eed9b6] border border-[#c9904a]/40 shadow-md opacity-90 [clip-path:polygon(0%_0%,100%_2%,98%_100%,1%_98%)]"
      >
        <span className="absolute top-1.5 right-2 w-4 h-5 border border-[#8a421d]/40 bg-[#f7ebd4] text-[0.4rem] flex items-center justify-center text-[#8a421d] font-serif">
          AIR
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-1 bottom-0 top-1 rotate-2 rounded-xs bg-[#f4e4c9] border border-[#c9904a]/30 shadow-md"
      />

      {/* Main Vintage Camera Body SVG */}
      <svg
        viewBox="0 0 160 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
      >
        {/* Camera Top Plate (Brushed Silver with Top Bevel Highlight) */}
        <path
          d="M12 28 C12 24, 16 22, 20 22 L140 22 C144 22, 148 24, 148 28 L148 40 L12 40 Z"
          fill="url(#silverGrad)"
          stroke="#444"
          strokeWidth="0.8"
        />
        <line x1="20" y1="23" x2="140" y2="23" stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.8" />

        {/* Shutter Button & Milled Dials */}
        <rect x="28" y="16" width="14" height="6" rx="1.5" fill="#bbb" stroke="#333" strokeWidth="0.8" />
        <line x1="32" y1="17" x2="32" y2="21" stroke="#555" strokeWidth="0.6" />
        <line x1="35" y1="17" x2="35" y2="21" stroke="#555" strokeWidth="0.6" />
        <line x1="38" y1="17" x2="38" y2="21" stroke="#555" strokeWidth="0.6" />
        <circle cx="35" cy="16" r="1.5" fill="#e11d48" />

        <rect x="48" y="18" width="10" height="4" rx="1" fill="#999" stroke="#444" strokeWidth="0.8" />
        <rect x="118" y="17" width="18" height="5" rx="1" fill="#aaa" stroke="#444" strokeWidth="0.8" />
        <line x1="123" y1="18" x2="123" y2="21" stroke="#555" strokeWidth="0.6" />
        <line x1="127" y1="18" x2="127" y2="21" stroke="#555" strokeWidth="0.6" />
        <line x1="131" y1="18" x2="131" y2="21" stroke="#555" strokeWidth="0.6" />
        <rect x="74" y="19" width="16" height="3" rx="0.5" fill="#333" />

        {/* Viewfinder Windows with Optic Reflection */}
        <rect x="120" y="27" width="16" height="9" rx="1" fill="url(#viewfinderGlass)" stroke="#555" strokeWidth="0.8" />
        <path d="M122 28 L134 28 L126 35 Z" fill="#60a5fa" opacity="0.3" />
        <rect x="36" y="28" width="10" height="7" rx="1" fill="#2c1d10" stroke="#555" strokeWidth="0.8" />

        {/* Camera Main Body (Textured Leatherette) */}
        <rect x="10" y="40" width="140" height="62" rx="3" fill="#181818" stroke="#222" strokeWidth="1" />
        <rect x="14" y="44" width="132" height="54" rx="2" fill="#222" opacity="0.6" />

        {/* Horizontal Chrome Grip Band */}
        <rect x="10" y="70" width="140" height="2" fill="#999" opacity="0.45" />

        {/* Leica-style Red Lens Alignment Dot */}
        <circle cx="49" cy="52" r="1.6" fill="#dc2626" />

        {/* Camera Bottom Plate */}
        <rect x="10" y="100" width="140" height="5" rx="1" fill="url(#silverGrad)" stroke="#444" strokeWidth="0.6" />

        {/* Central Rangefinder Lens Barrel with Ribbed Knurling */}
        <circle cx="80" cy="70" r="32" fill="#151515" stroke="#777" strokeWidth="2.5" />
        <circle cx="80" cy="70" r="30" fill="none" stroke="#555" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <circle cx="80" cy="70" r="27" fill="#242424" stroke="#3e3e3e" strokeWidth="1" />
        <circle cx="80" cy="70" r="22" fill="#0d1822" stroke="#555" strokeWidth="1" />
        
        {/* Internal Aperture Blades Hexagon */}
        <polygon points="80,55 89,61 89,79 80,85 71,79 71,61" stroke="#334155" strokeWidth="0.8" fill="none" opacity="0.7" />
        <circle cx="80" cy="70" r="15" fill="#050a0f" />

        {/* Multi-Coated Lens Specular Reflections (Cyan & Amber Glints) */}
        <ellipse cx="73" cy="63" rx="8" ry="4.5" transform="rotate(-30 73 63)" fill="url(#lensGlassCyan)" opacity="0.65" />
        <ellipse cx="87" cy="77" rx="5" ry="3" transform="rotate(-30 87 77)" fill="url(#lensGlassAmber)" opacity="0.55" />
        <circle cx="71" cy="61" r="1.4" fill="#ffffff" opacity="0.85" />

        {/* Screws & Mechanical Accents */}
        <circle cx="20" cy="34" r="1.5" fill="#777" />
        <circle cx="140" cy="34" r="1.5" fill="#777" />

        <defs>
          <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8f9fa" />
            <stop offset="35%" stopColor="#d5d5d5" />
            <stop offset="70%" stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#8e8e8e" />
          </linearGradient>
          <linearGradient id="viewfinderGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0b1320" />
          </linearGradient>
          <linearGradient id="lensGlassCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="lensGlassAmber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Artifact 2: Antique Pocket Watch with Roman numerals & luggage date tag */
function PocketWatchArtifact() {
  return (
    <div className="relative w-36 sm:w-44 md:w-48 lg:w-52 aspect-[5/4] flex items-center justify-center select-none">
      {/* Surrounding pink blossoms & floral leaves */}
      <div
        aria-hidden="true"
        className="absolute -top-3 -left-3 w-16 h-16 pointer-events-none drop-shadow-md"
      >
        <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
          <circle cx="20" cy="22" r="8" fill="#f5c6c6" opacity="0.9" />
          <circle cx="32" cy="18" r="7" fill="#f7d0d0" opacity="0.85" />
          <circle cx="22" cy="32" r="6" fill="#e89898" opacity="0.8" />
          <circle cx="25" cy="24" r="2.5" fill="#fde68a" />
        </svg>
      </div>

      {/* Hanging Luggage Tag stamped "26-09-26" */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 right-1 z-20 rotate-12 bg-[#eedab6] border border-[#c9904a]/60 px-2 py-1 rounded-[2px] shadow-lg flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full border border-[#8a421d]/60 bg-[#c9904a] shadow-inner flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-[#2d1f10]" />
        </span>
        <span className="font-serif text-[0.6rem] font-bold text-[#5c3016] tracking-wider uppercase">
          26-09-26
        </span>
      </div>

      {/* Pocket Watch Body SVG */}
      <svg
        viewBox="0 0 130 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-36 sm:w-40 h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
      >
        {/* Top Winding Crown & Bow Loop Ring */}
        <circle cx="65" cy="14" r="11" fill="none" stroke="#486581" strokeWidth="3" />
        <rect x="60" y="20" width="10" height="7" rx="1.5" fill="url(#blueSteel)" stroke="#243b53" strokeWidth="0.8" />
        <line x1="62" y1="21" x2="62" y2="26" stroke="#243b53" strokeWidth="0.6" />
        <line x1="65" y1="21" x2="65" y2="26" stroke="#243b53" strokeWidth="0.6" />
        <line x1="68" y1="21" x2="68" y2="26" stroke="#243b53" strokeWidth="0.6" />

        {/* Outer Watch Case (Blue Steel & Milled Brass Bezel) */}
        <circle cx="65" cy="80" r="48" fill="url(#blueSteel)" stroke="#243b53" strokeWidth="2.5" />
        <circle cx="65" cy="80" r="45" fill="none" stroke="#e5a95d" strokeWidth="1.2" strokeDasharray="1.2 1.6" opacity="0.85" />
        <circle cx="65" cy="80" r="43" fill="url(#brassBezel)" stroke="#b08038" strokeWidth="1" />
        <circle cx="65" cy="80" r="40" fill="#fffcf4" stroke="#c9904a" strokeWidth="1.2" />

        {/* Guilloche Radial Dial Texture */}
        <circle cx="65" cy="80" r="34" fill="none" stroke="#e9dec9" strokeWidth="0.6" strokeDasharray="1 2" />
        <circle cx="65" cy="80" r="26" fill="none" stroke="#f0e6d6" strokeWidth="0.6" />

        {/* Watch Face Roman Numerals (XII, III, VI, IX, etc.) */}
        <text x="65" y="52" textAnchor="middle" fontSize="7.5" fontFamily="serif" fontWeight="bold" fill="#2d1f10">XII</text>
        <text x="96" y="83" textAnchor="middle" fontSize="7.5" fontFamily="serif" fontWeight="bold" fill="#2d1f10">III</text>
        <text x="65" y="113" textAnchor="middle" fontSize="7.5" fontFamily="serif" fontWeight="bold" fill="#2d1f10">VI</text>
        <text x="34" y="83" textAnchor="middle" fontSize="7.5" fontFamily="serif" fontWeight="bold" fill="#2d1f10">IX</text>

        <text x="81" y="59" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">I</text>
        <text x="92" y="70" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">II</text>
        <text x="92" y="96" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">IV</text>
        <text x="81" y="107" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">V</text>
        <text x="49" y="107" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">VII</text>
        <text x="38" y="96" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">VIII</text>
        <text x="38" y="70" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">X</text>
        <text x="49" y="59" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">XI</text>

        {/* Sub-Seconds Register at 6 o'clock */}
        <circle cx="65" cy="98" r="7.5" fill="none" stroke="#d5be9b" strokeWidth="0.6" strokeDasharray="1 1.5" />
        <line x1="65" y1="98" x2="68" y2="93" stroke="#be123c" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="65" cy="98" r="1.2" fill="#be123c" />

        {/* Minute Track Ring */}
        <circle cx="65" cy="80" r="38" fill="none" stroke="#d5be9b" strokeWidth="0.8" strokeDasharray="1 3" />

        {/* Vintage Breguet Clock Hands set at ~10:08 */}
        {/* Hour Hand (pointing toward ~10) */}
        <line x1="65" y1="80" x2="48" y2="60" stroke="#1a1209" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="51" cy="63" r="2.2" fill="none" stroke="#1a1209" strokeWidth="1.2" />

        {/* Minute Hand (pointing toward ~2) */}
        <line x1="65" y1="80" x2="84" y2="54" stroke="#1a1209" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="81" cy="57" r="1.8" fill="none" stroke="#1a1209" strokeWidth="1" />

        {/* Center Pivot Pin (Polished Brass) */}
        <circle cx="65" cy="80" r="3" fill="#fde68a" stroke="#b08038" strokeWidth="1" />
        <circle cx="65" cy="80" r="1" fill="#1a1209" />

        {/* Curved Sapphire Crystal Specular Highlights */}
        <path
          d="M36 62 C46 47, 84 47, 94 62 C84 53, 46 53, 36 62 Z"
          fill="url(#crystalGlint)"
          opacity="0.65"
        />
        <path
          d="M48 103 C58 107, 72 107, 82 103 C74 105, 56 105, 48 103 Z"
          fill="#ffffff"
          opacity="0.25"
        />

        <defs>
          <linearGradient id="blueSteel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#627d98" />
            <stop offset="50%" stopColor="#486581" />
            <stop offset="100%" stopColor="#243b53" />
          </linearGradient>
          <linearGradient id="brassBezel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5d089" />
            <stop offset="45%" stopColor="#d9a85f" />
            <stop offset="100%" stopColor="#9b6e2d" />
          </linearGradient>
          <linearGradient id="crystalGlint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Artifact 3: Vintage Vinyl Sleeve with disc sliding out & rose petal confetti */
function VinylArtifact() {
  return (
    <div className="relative w-36 sm:w-44 md:w-48 lg:w-52 aspect-[5/4] flex items-center justify-center select-none">
      {/* Vinyl Record Disc sliding outward to the top-right */}
      <div
        aria-hidden="true"
        className="absolute top-1 right-2 w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#0d0d0d] border border-[#262626] shadow-2xl flex items-center justify-center rotate-12 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 overflow-hidden"
      >
        {/* Realistic Anisotropic Dual Light Cones across Grooves */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-50 mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 32deg, transparent 0deg, rgba(255,255,255,0.22) 35deg, transparent 70deg, transparent 180deg, rgba(255,255,255,0.22) 215deg, transparent 250deg)",
          }}
        />

        {/* Concentric Vinyl Sound Grooves */}
        <div className="absolute inset-1 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-2.5 rounded-full border border-white/[0.07]" />
        <div className="absolute inset-4 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-5.5 rounded-full border border-white/[0.09]" />
        <div className="absolute inset-7 rounded-full border border-white/[0.05]" />
        <div className="absolute inset-8.5 rounded-full border border-white/[0.08]" />

        {/* Vinyl Run-Out Groove Ring */}
        <div className="absolute inset-10 rounded-full border border-white/[0.12]" />

        {/* Vinyl Center Burgundy Record Label */}
        <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#b81d2c] via-[#8f1828] to-[#590f19] border border-[#fde68a]/50 flex flex-col items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          {/* Gold Foil Label Ring */}
          <div className="absolute inset-1 rounded-full border border-[#fde68a]/30 pointer-events-none" />
          <span className="font-serif text-[0.45rem] font-bold text-[#fde68a] tracking-widest leading-none">
            33⅓
          </span>
          {/* Brass Spindle Bushing Hole */}
          <div className="w-2.5 h-2.5 mt-0.5 rounded-full bg-[#d4af37] border border-white/50 shadow-inner flex items-center justify-center">
            <div className="w-1.2 h-1.2 rounded-full bg-[#0d0d0d]" />
          </div>
        </div>
      </div>

      {/* Aged Paper Record Sleeve with circular cutout */}
      <div
        aria-hidden="true"
        className="relative z-10 w-32 sm:w-36 h-32 sm:h-36 -rotate-3 bg-gradient-to-br from-[#f9eed9] via-[#f0dcba] to-[#e4c99a] border border-[#c9904a]/60 rounded-xs shadow-2xl flex items-center justify-center overflow-hidden"
      >
        {/* Parchment fiber grain */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#8a421d_0.8px,transparent_0.8px)] [background-size:8px_8px]" />

        {/* Delicate Gold Foil Border Framing on Sleeve */}
        <div className="absolute inset-2 border border-[#c9904a]/30 rounded-xs pointer-events-none" />

        {/* Center circular cutout revealing the black disc inside */}
        <div className="w-14 h-14 rounded-full bg-[#1a1209]/85 border-2 border-[#c9904a]/70 shadow-inner flex items-center justify-center">
          <span className="text-[#fde68a]/80 text-sm font-serif drop-shadow-sm">♪</span>
        </div>

        {/* Aged wear corners and crease lines */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-black/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-black/15 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />
      </div>

      {/* Scattered rose petal confetti at bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-2 z-20 flex gap-1 pointer-events-none drop-shadow-md"
      >
        <span className="w-3.5 h-4 bg-[#c52838] rounded-full rotate-45 transform scale-90 shadow-sm" />
        <span className="w-4 h-3 bg-[#e89898] rounded-full -rotate-12 transform scale-75 shadow-sm" />
        <span className="w-3 h-3 bg-[#8f1828] rounded-full rotate-180 transform scale-90 shadow-sm" />
      </div>
    </div>
  );
}

/** Artifact 4: Crimson Gift Box with ornate lace bow & perched butterfly */
function GiftBoxArtifact() {
  return (
    <div className="relative w-36 sm:w-44 md:w-48 lg:w-52 aspect-[5/4] flex items-center justify-center select-none">
      {/* Gift Box Container */}
      <div className="relative z-10 w-32 sm:w-36 h-28 sm:h-32 flex flex-col items-center justify-end">
        {/* Large Cream Floral Lace Ribbon Bow on top */}
        <div
          aria-hidden="true"
          className="absolute -top-3 z-30 flex items-center justify-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
        >
          <svg viewBox="0 0 100 50" fill="none" className="w-28 sm:w-32 h-auto">
            {/* Left Lace Loop with Inner Depth */}
            <path
              d="M50 25 C35 8, 12 12, 18 28 C22 36, 40 32, 50 25 Z"
              fill="#fdf6e7"
              stroke="#d9a85f"
              strokeWidth="1.2"
            />
            <path
              d="M46 24 C36 14, 22 17, 24 26 C28 31, 38 29, 46 24 Z"
              fill="#f5ebd4"
              opacity="0.6"
            />

            {/* Right Lace Loop with Inner Depth */}
            <path
              d="M50 25 C65 8, 88 12, 82 28 C78 36, 60 32, 50 25 Z"
              fill="#fdf6e7"
              stroke="#d9a85f"
              strokeWidth="1.2"
            />
            <path
              d="M54 24 C64 14, 78 17, 76 26 C72 31, 62 29, 54 24 Z"
              fill="#f5ebd4"
              opacity="0.6"
            />

            {/* Hanging Lace Ribbon Tails with Gold Edge */}
            <path
              d="M48 28 C42 40, 36 44, 32 48 M52 28 C58 40, 64 44, 68 48"
              stroke="#f5ecd5"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M48 28 C42 40, 36 44, 32 48 M52 28 C58 40, 64 44, 68 48"
              stroke="#c9904a"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="1 2"
            />

            {/* Center Dimensional Gold Medallion Knot */}
            <ellipse cx="50" cy="25" rx="6.5" ry="5.5" fill="#f5ecd5" stroke="#c9904a" strokeWidth="1.2" />
            <circle cx="50" cy="25" r="4" fill="#fde68a" stroke="#b08038" strokeWidth="0.8" />
            <path
              d="M48.5 24.2 C48.5 23.2 49.3 22.5 50 23.2 C50.7 22.5 51.5 23.2 51.5 24.2 C51.5 25.4 50 26.5 50 26.5 C50 26.5 48.5 25.4 48.5 24.2 Z"
              fill="#991b1b"
            />
          </svg>
        </div>

        {/* 3D Gift Box Body (Crimson Velvet with Golden Silk Ribbon) */}
        <div className="relative w-28 sm:w-32 h-20 sm:h-22 bg-gradient-to-br from-[#c52838] via-[#9e1a28] to-[#690b14] rounded-xs border border-[#fde68a]/40 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Top Lid Rim Bevel Highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-b from-[#fca5a5]/40 to-transparent pointer-events-none" />

          {/* Vertical Satin Gold Ribbon with Specular Sheen */}
          <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-[#b37e38] via-[#fde68a] via-[#fffbeb] to-[#996515] border-x border-[#fde68a]/70 shadow-[0_0_8px_rgba(246,201,78,0.35)]" />

          {/* Horizontal Satin Gold Ribbon with Specular Sheen */}
          <div className="absolute inset-x-0 h-5 bg-gradient-to-b from-[#b37e38] via-[#fde68a] via-[#fffbeb] to-[#996515] border-y border-[#fde68a]/70 shadow-[0_0_8px_rgba(246,201,78,0.35)]" />

          {/* Diagonal Silk Lustre Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

          {/* Velvet Box Ambient Edge Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 pointer-events-none" />
        </div>
      </div>

      {/* Red Monarch Butterfly perched on the right side of the gift box */}
      <div
        aria-hidden="true"
        className="absolute -right-2 top-8 z-30 w-14 h-12 rotate-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] pointer-events-none"
      >
        <svg viewBox="0 0 64 50" fill="none" className="w-full h-full">
          {/* Upper Wings */}
          <path d="M32 24 C26 12, 10 2, 2 10 C-4 17, 2 34, 18 36 Z" fill="#d82525" stroke="#110505" strokeWidth="2" />
          <path d="M32 24 C38 12, 54 2, 62 10 C68 17, 62 34, 46 36 Z" fill="#d82525" stroke="#110505" strokeWidth="2" />

          {/* Wing Veins */}
          <path d="M12 16 C18 22, 26 24, 30 24" stroke="#110505" strokeWidth="1" />
          <path d="M52 16 C46 22, 38 24, 34 24" stroke="#110505" strokeWidth="1" />

          {/* Lower Wings */}
          <path d="M32 26 C24 30, 14 36, 20 46 Z" fill="#c01818" stroke="#110505" strokeWidth="1.2" />
          <path d="M32 26 C40 30, 50 36, 44 46 Z" fill="#c01818" stroke="#110505" strokeWidth="1.2" />

          {/* Pollen Specks on Wing Margins */}
          <circle cx="6" cy="10" r="1.2" fill="#fff9eb" />
          <circle cx="58" cy="10" r="1.2" fill="#fff9eb" />
          <circle cx="10" cy="18" r="0.8" fill="#fde68a" />
          <circle cx="54" cy="18" r="0.8" fill="#fde68a" />

          {/* Butterfly Thorax & Abdomen */}
          <ellipse cx="32" cy="27" rx="1.8" ry="8" fill="#0d0404" />
        </svg>
      </div>
    </div>
  );
}

export function SelectionScene(props: SceneProps) {
  const { isActive = false, className, onNext } = props;
  const { goToScene } = useExperience();
  const audio = useAudio();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const handleSelectArtifact = useCallback(
    (targetScene: CanonicalSceneName, artifactId: string) => {
      setSelectedId(artifactId);

      // Audio feedback: card flip / chapter select SFX
      audio.playSfx("sfx-card-flip");

      // Tactile delay before scene transition
      setTimeout(() => {
        goToScene(targetScene);
      }, 350);
    },
    [audio, goToScene]
  );

  const handleAdvance = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onNext) {
      onNext();
    } else {
      goToScene("journey");
    }
  }, [audio, onNext, goToScene]);

  // Connect animations to existing utilities via useGSAP
  useGSAP(
    () => {
      if (!isActive) return;

      // 1. Headline dramatic letter-spacing reveal
      dramaticReveal(".selection-headline", {
        duration: 1.4,
        trackingStart: "0.22em",
        trackingEnd: "0.03em",
      });

      // 2. Staggered entrance for the 4 physical artifacts
      reveal(".selection-artifact-card", {
        direction: "up",
        distance: 40,
        stagger: 0.12,
        duration: 1.0,
        ease: "power2.out",
      });

      // 3. Gentle ambient floating on background light aura
      floatingMovement(".selection-ambient-glow", {
        yDistance: 12,
        xDistance: 4,
        duration: 6.0,
      });

      // 4. Subtle breathing glow on the bottom CTA button
      breathingAnimation(".selection-cta-btn", {
        scaleTo: 1.03,
        opacityFrom: 0.9,
        opacityTo: 1.0,
        duration: 3.0,
      });
    },
    [isActive],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      id="scene-selection"
      data-scene="selection"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden px-4 sm:px-6 md:px-8 py-8 md:py-14 pb-[max(2rem,env(safe-area-inset-bottom))] select-none",
        "bg-scene-stage",
        className
      )}
    >
      {/* ── 1. Background Atmosphere & Spotlight Flares ───────── */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      {/* Warm Center Spotlight behind the 4 artifacts */}
      <div
        aria-hidden="true"
        className="selection-ambient-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[850px] h-[350px] md:h-[500px] rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.22)_0%,_rgba(201,144,74,0.08)_50%,_transparent_75%)] blur-3xl z-0"
      />

      {/* Floating ambient particles */}
      <FloatingDecoration preset="drift" depth={3} className="top-16 left-12 w-28 h-28">
        <div className="w-full h-full rounded-full bg-gold/10 blur-xl" />
      </FloatingDecoration>
      <FloatingDecoration preset="drift-reverse" depth={3} className="bottom-20 right-16 w-32 h-32">
        <div className="w-full h-full rounded-full bg-rose/15 blur-xl" />
      </FloatingDecoration>
      <FloatingDecoration preset="sparkle" depth={2} className="top-24 right-32 w-2 h-2">
        <div className="w-full h-full rounded-full bg-gold/60 blur-[0.5px]" />
      </FloatingDecoration>

      {/* ── 2. Top Header Title ───────────────────────────────── */}
      <header className="relative z-10 w-full text-center mt-2 md:mt-4">
        <h1 className="selection-headline font-handwriting text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#fdf8f0] font-normal leading-tight tracking-wide drop-shadow-[0_2px_12px_rgba(246,201,78,0.35)]">
          {SELECTION_CONTENT.headline}
        </h1>
      </header>

      {/* ── 3. Four Thematic Interactive Artifacts Deck ───────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3.5 sm:gap-8 lg:gap-10 items-end justify-items-center px-1 sm:px-0">
          {SELECTION_CONTENT.artifacts.map((artifact) => {
            const isSelected = selectedId === artifact.id;

            return (
              <button
                key={artifact.id}
                type="button"
                aria-label={artifact.ariaLabel}
                onClick={() => handleSelectArtifact(artifact.targetScene, artifact.id)}
                className={cn(
                  "selection-artifact-card group relative flex flex-col items-center justify-end text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0509] rounded-sm cursor-pointer gpu-accelerated transition-transform duration-300 ease-out",
                  isSelected && "scale-105"
                )}
              >
                {/* Subtle specular glint overlay across artifact card on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-2 bg-gradient-to-tr from-transparent via-gold/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                />

                {/* Vertical Light Beam aura behind each artifact */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 w-32 sm:w-40 h-44 rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.18)_0%,_transparent_70%)] blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-110"
                />

                {/* Starlight sparkles & magical dust motes */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 -right-1 text-gold/70 text-xs sm:text-sm animate-[pulse_3s_ease-in-out_infinite] group-hover:text-[#fef08a] group-hover:scale-125 transition-all duration-300 drop-shadow-[0_0_6px_rgba(246,201,78,0.8)]"
                >
                  ✦
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/3 -left-2 text-gold/50 text-[0.65rem] sm:text-xs animate-[pulse_4s_ease-in-out_infinite_1s] group-hover:text-gold/90 transition-all duration-300 drop-shadow-[0_0_4px_rgba(246,201,78,0.6)]"
                >
                  ✧
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-3 right-1/4 w-1 h-1 rounded-full bg-[#fde68a]/60 blur-[0.4px] animate-[pulse_2.5s_ease-in-out_infinite]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-14 left-1/4 w-1.5 h-1.5 rounded-full bg-[#f5d089]/40 blur-[0.6px] animate-[pulse_3.5s_ease-in-out_infinite_0.5s]"
                />

                {/* Skeuomorphic Physical Artifact Representation */}
                <div className="transition-transform duration-300 ease-out group-hover:-translate-y-2.5 group-hover:scale-105 group-active:scale-95 drop-shadow-[0_10px_25px_rgba(0,0,0,0.65)]">
                  {artifact.id === "artifact-journey" && <CameraArtifact />}
                  {artifact.id === "artifact-moment" && <PocketWatchArtifact />}
                  {artifact.id === "artifact-playlist" && <VinylArtifact />}
                  {artifact.id === "artifact-gift" && <GiftBoxArtifact />}
                </div>

                {/* Script Chapter Title & Underline Bar */}
                <div className="mt-4 flex flex-col items-center">
                  <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#fdf8f0] font-normal tracking-wide transition-colors duration-300 group-hover:text-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {artifact.label}
                  </span>

                  {/* Horizontal Underline matching selection-scene.png */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1 h-[1.5px] w-12 sm:w-16 bg-[#fdf8f0]/80 transition-all duration-300 group-hover:w-20 group-hover:bg-gold shadow-sm",
                      !artifact.hasUnderline && "opacity-0 group-hover:opacity-100"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. Bottom Advance CTA Button ─────────────────────── */}
      <footer className="relative z-10 w-full flex flex-col items-center pt-4 md:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          aria-label="Advance to the first chapter: Our Journey"
          onClick={handleAdvance}
          className="selection-cta-btn group relative inline-flex flex-col items-center text-center cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0509] rounded-sm p-1"
        >
          <span className="font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#fdf8f0] font-medium uppercase transition-colors duration-300 group-hover:text-gold drop-shadow-md">
            {SELECTION_CONTENT.ctaText}
          </span>
          <span
            aria-hidden="true"
            className="mt-1 h-[1px] w-28 sm:w-36 bg-[#fdf8f0]/80 transition-all duration-300 group-hover:w-44 group-hover:bg-gold shadow-sm"
          />
        </button>
      </footer>
    </section>
  );
}
