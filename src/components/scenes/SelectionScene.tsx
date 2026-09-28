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
    <div className="relative w-44 sm:w-48 md:w-52 aspect-[5/4] flex items-center justify-center select-none">
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
        {/* Camera Top Plate (Brushed Silver) */}
        <path
          d="M12 28 C12 24, 16 22, 20 22 L140 22 C144 22, 148 24, 148 28 L148 40 L12 40 Z"
          fill="url(#silverGrad)"
          stroke="#555"
          strokeWidth="0.8"
        />

        {/* Shutter Button & Dials */}
        <rect x="28" y="16" width="14" height="6" rx="1.5" fill="#bbb" stroke="#444" strokeWidth="0.8" />
        <rect x="48" y="18" width="10" height="4" rx="1" fill="#999" stroke="#444" strokeWidth="0.8" />
        <rect x="118" y="17" width="18" height="5" rx="1" fill="#aaa" stroke="#444" strokeWidth="0.8" />
        <rect x="74" y="19" width="16" height="3" rx="0.5" fill="#333" />

        {/* Viewfinder Windows */}
        <rect x="120" y="27" width="16" height="9" rx="1" fill="#1c2d3d" stroke="#555" strokeWidth="0.8" />
        <rect x="36" y="28" width="10" height="7" rx="1" fill="#2c1d10" stroke="#555" strokeWidth="0.8" />

        {/* Camera Main Body (Textured Leatherette) */}
        <rect x="10" y="40" width="140" height="62" rx="3" fill="#181818" stroke="#333" strokeWidth="1" />
        <rect x="14" y="44" width="132" height="54" rx="2" fill="#222" opacity="0.6" />

        {/* Horizontal Chrome Grip Band */}
        <rect x="10" y="70" width="140" height="2" fill="#888" opacity="0.4" />

        {/* Camera Bottom Plate */}
        <rect x="10" y="100" width="140" height="5" rx="1" fill="url(#silverGrad)" stroke="#444" strokeWidth="0.6" />

        {/* Central Rangefinder Lens Barrel */}
        <circle cx="80" cy="70" r="32" fill="#151515" stroke="#777" strokeWidth="2.5" />
        <circle cx="80" cy="70" r="28" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
        <circle cx="80" cy="70" r="23" fill="#0d1822" stroke="#555" strokeWidth="1" />
        <circle cx="80" cy="70" r="16" fill="#060c12" />

        {/* Lens Glass Specular Reflection */}
        <ellipse cx="74" cy="64" rx="7" ry="4" transform="rotate(-25 74 64)" fill="#5890c4" opacity="0.4" />
        <circle cx="88" cy="76" r="2.5" fill="#fde68a" opacity="0.5" />

        {/* Screws & Mechanical Accents */}
        <circle cx="20" cy="34" r="1.5" fill="#777" />
        <circle cx="140" cy="34" r="1.5" fill="#777" />

        <defs>
          <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="50%" stopColor="#d5d5d5" />
            <stop offset="100%" stopColor="#a8a8a8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Artifact 2: Antique Pocket Watch with Roman numerals & luggage date tag */
function PocketWatchArtifact() {
  return (
    <div className="relative w-44 sm:w-48 md:w-52 aspect-[5/4] flex items-center justify-center select-none">
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
        className="absolute -bottom-2 right-1 z-20 rotate-12 bg-[#eedab6] border border-[#c9904a]/60 px-2 py-1 rounded-[2px] shadow-lg flex items-center gap-1"
      >
        <span className="w-1.5 h-1.5 rounded-full border border-[#8a421d]/50 bg-[#2d1f10]" />
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

        {/* Outer Watch Case (Blue Steel & Brass Bezel) */}
        <circle cx="65" cy="80" r="48" fill="url(#blueSteel)" stroke="#243b53" strokeWidth="2.5" />
        <circle cx="65" cy="80" r="44" fill="#d9a85f" stroke="#b08038" strokeWidth="1" />
        <circle cx="65" cy="80" r="41" fill="#fffcf4" stroke="#c9904a" strokeWidth="1.2" />

        {/* Watch Face Roman Numerals (XII, III, VI, IX, etc.) */}
        <text x="65" y="52" textAnchor="middle" fontSize="8" fontFamily="serif" fontWeight="bold" fill="#2d1f10">XII</text>
        <text x="96" y="83" textAnchor="middle" fontSize="8" fontFamily="serif" fontWeight="bold" fill="#2d1f10">III</text>
        <text x="65" y="113" textAnchor="middle" fontSize="8" fontFamily="serif" fontWeight="bold" fill="#2d1f10">VI</text>
        <text x="34" y="83" textAnchor="middle" fontSize="8" fontFamily="serif" fontWeight="bold" fill="#2d1f10">IX</text>

        <text x="81" y="59" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">I</text>
        <text x="92" y="70" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">II</text>
        <text x="92" y="96" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">IV</text>
        <text x="81" y="107" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">V</text>
        <text x="49" y="107" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">VII</text>
        <text x="38" y="96" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">VIII</text>
        <text x="38" y="70" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">X</text>
        <text x="49" y="59" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#5c4020">XI</text>

        {/* Minute Track Ring */}
        <circle cx="65" cy="80" r="38" fill="none" stroke="#d5be9b" strokeWidth="0.8" strokeDasharray="1 3" />

        {/* Vintage Clock Hands set at ~10:08 */}
        {/* Hour Hand (pointing toward ~10) */}
        <line x1="65" y1="80" x2="48" y2="60" stroke="#1a1209" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="51" cy="63" r="2.2" fill="#1a1209" />

        {/* Minute Hand (pointing toward ~2) */}
        <line x1="65" y1="80" x2="84" y2="54" stroke="#1a1209" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="81" cy="57" r="1.8" fill="#1a1209" />

        {/* Center Pivot Pin */}
        <circle cx="65" cy="80" r="2.8" fill="#d9a85f" stroke="#1a1209" strokeWidth="1" />

        {/* Curved Glass Specular Highlight */}
        <path
          d="M36 62 C46 48, 84 48, 94 62 C84 54, 46 54, 36 62 Z"
          fill="#ffffff"
          opacity="0.4"
        />

        <defs>
          <linearGradient id="blueSteel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#627d98" />
            <stop offset="50%" stopColor="#486581" />
            <stop offset="100%" stopColor="#243b53" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Artifact 3: Vintage Vinyl Sleeve with disc sliding out & rose petal confetti */
function VinylArtifact() {
  return (
    <div className="relative w-44 sm:w-48 md:w-52 aspect-[5/4] flex items-center justify-center select-none">
      {/* Vinyl Record Disc sliding outward to the top-right */}
      <div
        aria-hidden="true"
        className="absolute top-1 right-2 w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#111] border border-[#333] shadow-xl flex items-center justify-center rotate-12 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
      >
        {/* Vinyl Sound Grooves */}
        <div className="absolute inset-1 rounded-full border border-white/5" />
        <div className="absolute inset-3 rounded-full border border-white/5" />
        <div className="absolute inset-5 rounded-full border border-white/10" />
        <div className="absolute inset-7 rounded-full border border-white/5" />

        {/* Vinyl Center Red Label */}
        <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#b81d2c] via-[#8f1828] to-[#590f19] border border-[#fde68a]/40 flex items-center justify-center shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20" />
        </div>
      </div>

      {/* Aged Paper Record Sleeve with circular cutout */}
      <div
        aria-hidden="true"
        className="relative z-10 w-32 sm:w-36 h-32 sm:h-36 -rotate-3 bg-gradient-to-br from-[#f9eed9] via-[#f0dcba] to-[#e4c99a] border border-[#c9904a]/50 rounded-xs shadow-2xl flex items-center justify-center overflow-hidden"
      >
        {/* Parchment fiber grain */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#8a421d_0.8px,transparent_0.8px)] [background-size:8px_8px]" />

        {/* Center circular cutout revealing the black disc inside */}
        <div className="w-14 h-14 rounded-full bg-[#1a1209]/80 border-2 border-[#c9904a]/60 shadow-inner flex items-center justify-center">
          <span className="text-gold/60 text-xs font-serif">♪</span>
        </div>

        {/* Aged wear corners and crease lines */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-black/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-black/15 to-transparent pointer-events-none" />
      </div>

      {/* Scattered rose petal confetti at bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-2 z-20 flex gap-1 pointer-events-none drop-shadow-md"
      >
        <span className="w-3.5 h-4 bg-[#c52838] rounded-full rotate-45 transform scale-90" />
        <span className="w-4 h-3 bg-[#e89898] rounded-full -rotate-12 transform scale-75" />
        <span className="w-3 h-3 bg-[#8f1828] rounded-full rotate-180 transform scale-90" />
      </div>
    </div>
  );
}

/** Artifact 4: Crimson Gift Box with ornate lace bow & perched butterfly */
function GiftBoxArtifact() {
  return (
    <div className="relative w-44 sm:w-48 md:w-52 aspect-[5/4] flex items-center justify-center select-none">
      {/* Gift Box Container */}
      <div className="relative z-10 w-32 sm:w-36 h-28 sm:h-32 flex flex-col items-center justify-end">
        {/* Large Cream Floral Lace Ribbon Bow on top */}
        <div
          aria-hidden="true"
          className="absolute -top-3 z-30 flex items-center justify-center drop-shadow-lg"
        >
          <svg viewBox="0 0 100 50" fill="none" className="w-28 sm:w-32 h-auto">
            {/* Left Lace Loop */}
            <path
              d="M50 25 C35 8, 12 12, 18 28 C22 36, 40 32, 50 25 Z"
              fill="#fdf6e7"
              stroke="#d9a85f"
              strokeWidth="1.2"
            />
            {/* Right Lace Loop */}
            <path
              d="M50 25 C65 8, 88 12, 82 28 C78 36, 60 32, 50 25 Z"
              fill="#fdf6e7"
              stroke="#d9a85f"
              strokeWidth="1.2"
            />
            {/* Center Bow Knot */}
            <ellipse cx="50" cy="25" rx="6" ry="5" fill="#f5ecd5" stroke="#c9904a" strokeWidth="1.2" />

            {/* Hanging Lace Ribbon Tails */}
            <path
              d="M48 28 C42 40, 36 44, 32 48 M52 28 C58 40, 64 44, 68 48"
              stroke="#f5ecd5"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* 3D Gift Box Body (Crimson with Gold Ribbon) */}
        <div className="relative w-28 sm:w-32 h-20 sm:h-22 bg-gradient-to-br from-[#c52838] via-[#a81c2b] to-[#730d17] rounded-xs border border-[#fde68a]/30 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Vertical Gold Ribbon */}
          <div className="absolute inset-y-0 w-6 bg-gradient-to-r from-[#d9a85f] via-[#fde68a] to-[#c9904a] border-x border-[#fde68a]/60 shadow-sm" />

          {/* Horizontal Gold Ribbon */}
          <div className="absolute inset-x-0 h-5 bg-gradient-to-b from-[#d9a85f] via-[#fde68a] to-[#c9904a] border-y border-[#fde68a]/60 shadow-sm" />

          {/* Velvet Box Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
        </div>
      </div>

      {/* Red Monarch Butterfly perched on the right side of the gift box */}
      <div
        aria-hidden="true"
        className="absolute -right-2 top-8 z-30 w-14 h-12 rotate-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none"
      >
        <svg viewBox="0 0 64 50" fill="none" className="w-full h-full">
          <path d="M32 24 C26 12, 10 2, 2 10 C-4 17, 2 34, 18 36 Z" fill="#d82525" stroke="#110505" strokeWidth="2" />
          <path d="M32 24 C38 12, 54 2, 62 10 C68 17, 62 34, 46 36 Z" fill="#d82525" stroke="#110505" strokeWidth="2" />
          <path d="M32 26 C24 30, 14 36, 20 46 Z" fill="#c01818" stroke="#110505" />
          <path d="M32 26 C40 30, 50 36, 44 46 Z" fill="#c01818" stroke="#110505" />
          <circle cx="6" cy="10" r="1" fill="#fff9eb" />
          <circle cx="58" cy="10" r="1" fill="#fff9eb" />
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
        "relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden px-4 py-8 md:py-14 select-none",
        "bg-[radial-gradient(ellipse_at_center,_#520f1c_0%,_#2e050c_50%,_#0d0103_100%)]",
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-8 lg:gap-10 items-end justify-items-center">
          {SELECTION_CONTENT.artifacts.map((artifact) => {
            const isSelected = selectedId === artifact.id;

            return (
              <button
                key={artifact.id}
                type="button"
                aria-label={artifact.ariaLabel}
                onClick={() => handleSelectArtifact(artifact.targetScene, artifact.id)}
                className={cn(
                  "selection-artifact-card group relative flex flex-col items-center justify-end text-center focus-visible:outline-none cursor-pointer gpu-accelerated transition-transform duration-300 ease-out",
                  isSelected && "scale-105"
                )}
              >
                {/* Vertical Light Beam aura behind each artifact */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 w-32 sm:w-40 h-44 rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.18)_0%,_transparent_70%)] blur-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-110"
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
      <footer className="relative z-10 w-full flex flex-col items-center pb-2 md:pb-4">
        <button
          type="button"
          onClick={handleAdvance}
          className="selection-cta-btn group relative inline-flex flex-col items-center text-center cursor-pointer transition-colors duration-300 focus-visible:outline-none"
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
