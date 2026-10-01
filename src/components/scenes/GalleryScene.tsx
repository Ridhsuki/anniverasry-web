// ─────────────────────────────────────────────────────────────
// GalleryScene
// Scene 4: Interactive scrapbook photo gallery.
// Visual benchmark: docs/references/screenshots/gallery-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef, useState } from "react";

import {
  breathingAnimation,
  dramaticReveal,
  floatingMovement,
  reveal,
} from "@/animations";
import { GalleryLightbox, PhotoGalleryItem } from "@/components/shared";
import { FloatingDecoration } from "@/components/ui";
import { useExperience } from "@/context/ExperienceContext";
import { GALLERY_CONTENT, type GalleryPhotoItem } from "@/data/gallery";
import { useAudio } from "@/hooks/useAudio";
import { useGSAP } from "@/hooks/useGSAP";
import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

/** Warm Glowing Fairy Lights Canopy Strung Across Top Edge */
function FairyLightsCanopy({ className }: { className?: string }) {
  const bulbs = [
    { x: "5%", y: "14px" },
    { x: "15%", y: "24px" },
    { x: "25%", y: "18px" },
    { x: "35%", y: "26px" },
    { x: "45%", y: "16px" },
    { x: "55%", y: "24px" },
    { x: "65%", y: "18px" },
    { x: "75%", y: "26px" },
    { x: "85%", y: "20px" },
    { x: "95%", y: "15px" },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fairy-lights-canopy pointer-events-none absolute top-0 left-0 right-0 h-16 z-20 select-none overflow-hidden",
        className
      )}
    >
      {/* Hanging Swag Wire */}
      <svg
        viewBox="0 0 1000 50"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-8 opacity-60"
      >
        <path
          d="M0 10 Q 250 45, 500 20 Q 750 45, 1000 10"
          stroke="#451a03"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Warm Golden Bulb Orbs */}
      {bulbs.map((bulb, i) => (
        <div
          key={i}
          style={{ left: bulb.x, top: bulb.y }}
          className="absolute -translate-x-1/2 flex flex-col items-center"
        >
          {/* Bulb socket */}
          <div className="w-1.5 h-1.5 bg-[#27150a] rounded-xs" />
          {/* Glowing Glass Bulb */}
          <div className="w-3.5 h-4.5 rounded-full bg-gradient-to-b from-[#fffbeb] via-[#fde047] to-[#eab308] shadow-[0_0_12px_rgba(250,204,21,0.85),0_0_24px_rgba(234,179,8,0.4)] transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}

/** Golden Saturn Illustrative Sticker */
function SaturnSticker({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]", className)}>
      <svg viewBox="0 0 80 50" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="saturnBody" cx="40%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
        </defs>
        {/* Back Ring */}
        <ellipse cx="40" cy="25" rx="36" ry="10" stroke="#fde047" strokeWidth="3" opacity="0.6" strokeDasharray="30 80" />
        {/* Planet Sphere */}
        <circle cx="40" cy="25" r="16" fill="url(#saturnBody)" stroke="#a16207" strokeWidth="0.75" />
        {/* Front Ring */}
        <ellipse cx="40" cy="25" rx="36" ry="10" stroke="#fef08a" strokeWidth="3.5" strokeDasharray="60 50" />
        {/* Star Sparkle */}
        <path d="M64 10 L66 14 L70 16 L66 18 L64 22 L62 18 L58 16 L62 14 Z" fill="#ffffff" opacity="0.8" />
      </svg>
    </div>
  );
}

/** Cute Pastel Blue Watercolor Whale Sticker */
function WhaleSticker({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]", className)}>
      <svg viewBox="0 0 70 45" fill="none" className="w-full h-full">
        {/* Whale Body */}
        <path
          d="M8 26 C12 12, 36 10, 52 18 C58 21, 64 16, 68 12 C66 22, 60 28, 54 28 C46 38, 22 38, 12 32 C6 28, 8 26, 8 26 Z"
          fill="#93c5fd"
          stroke="#60a5fa"
          strokeWidth="1.2"
        />
        {/* Belly Lines */}
        <path d="M22 28 C26 31, 36 31, 44 28" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" />
        {/* Whale Eye & Smile */}
        <circle cx="20" cy="22" r="1.5" fill="#1e3a8a" />
        <path d="M24 25 Q 26 27, 28 25" stroke="#1e3a8a" strokeWidth="1" strokeLinecap="round" fill="none" />
        {/* Water Spout */}
        <path d="M30 14 Q 30 6, 26 4 M30 14 Q 32 6, 36 4" stroke="#bfdbfe" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Purple Swirl Watercolor Galaxy Planet Sticker */
function PlanetSticker({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]", className)}>
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
        <defs>
          <radialGradient id="purplePlanet" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="85%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#3b0764" />
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="22" fill="url(#purplePlanet)" stroke="#d8b4fe" strokeWidth="1" />
        <path d="M14 26 Q 30 38, 46 24" stroke="#f3e8ff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" fill="none" />
        <path d="M18 34 Q 32 44, 42 32" stroke="#f3e8ff" strokeWidth="1" opacity="0.4" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

/** Soft Pastel Pink Heart Pair Sticker */
function HeartPairSticker({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("select-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]", className)}>
      <svg viewBox="0 0 50 35" fill="none" className="w-full h-full">
        {/* Left Heart */}
        <path
          d="M16 26 C10 20, 2 14, 2 8 C2 3.5, 5.5 1, 9 1 C12 1, 14 3, 16 5 C18 3, 20 1, 23 1 C26.5 1, 30 3.5, 30 8 C30 14, 22 20, 16 26 Z"
          fill="#fbcfe8"
          stroke="#f472b6"
          strokeWidth="1.2"
        />
        {/* Right Overlapping Small Heart */}
        <path
          d="M34 32 C29 27, 22 22, 22 17 C22 13.5, 24.5 11.5, 27.5 11.5 C30 11.5, 32 13, 34 14.5 C36 13, 38 11.5, 40.5 11.5 C43.5 11.5, 46 13.5, 46 17 C46 22, 39 27, 34 32 Z"
          fill="#fda4af"
          stroke="#fb7185"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

/** Red Satin Ribbon Bow Embellishment */
function RibbonBow({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]", className)}>
      <svg viewBox="0 0 70 40" fill="none" className="w-full h-full">
        {/* Center Knot */}
        <ellipse cx="35" cy="18" rx="5" ry="4" fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.75" />
        {/* Left Loop */}
        <path
          d="M32 18 C22 8, 4 8, 8 20 C10 26, 24 24, 32 18 Z"
          fill="#dc2626"
          stroke="#991b1b"
          strokeWidth="0.75"
        />
        {/* Right Loop */}
        <path
          d="M38 18 C48 8, 66 8, 62 20 C60 26, 46 24, 38 18 Z"
          fill="#dc2626"
          stroke="#991b1b"
          strokeWidth="0.75"
        />
        {/* Ribbon Tails */}
        <path d="M33 22 L24 38 L30 36 L34 22 Z" fill="#b91c1c" />
        <path d="M37 22 L46 38 L40 36 L36 22 Z" fill="#b91c1c" />
      </svg>
    </div>
  );
}

export function GalleryScene(props: SceneProps) {
  const { isActive = false, className, onNext, onPrevious } = props;
  const audio = useAudio();
  const { goToScene } = useExperience();

  const [activeModalPhoto, setActiveModalPhoto] = useState<GalleryPhotoItem | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Return to Selection Hub
  const handleBack = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onPrevious) {
      onPrevious();
    } else {
      goToScene("selection");
    }
  }, [audio, onPrevious, goToScene]);

  // Advance to next experience (PlaylistScene)
  const handleAdvance = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onNext) {
      onNext();
    } else {
      goToScene("playlist");
    }
  }, [audio, onNext, goToScene]);

  // Open Lightbox
  const handleOpenPhoto = useCallback(
    (photo: GalleryPhotoItem) => {
      audio.playSfx("sfx-card-flip");
      setActiveModalPhoto(photo);
    },
    [audio]
  );

  // Close Lightbox
  const handleCloseModal = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    setActiveModalPhoto(null);
  }, [audio]);

  // GSAP animations lifecycle
  useGSAP(
    () => {
      if (!isActive) return;

      // 1. Headline dramatic typographic expansion
      dramaticReveal(".gallery-headline-text", {
        duration: 1.4,
        trackingStart: "0.18em",
        trackingEnd: "0.02em",
      });

      // 2. Staggered entrance for all 8 Polaroid cards
      reveal(".gallery-photo-card", {
        direction: "up",
        distance: 35,
        stagger: 0.08,
        duration: 0.9,
        ease: "power2.out",
      });

      // 3. Gentle breathing loop on fairy lights canopy
      breathingAnimation(".fairy-lights-canopy", {
        opacityFrom: 0.82,
        opacityTo: 1.0,
        duration: 3.2,
      });

      // 4. Subtle floating on stickers
      floatingMovement(".gallery-ambient-sticker", {
        yDistance: 8,
        xDistance: 3,
        duration: 5.5,
      });

      // 5. Breathing animation on advance CTA button
      breathingAnimation(".gallery-advance-btn", {
        scaleTo: 1.04,
        opacityFrom: 0.92,
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
      id="scene-gallery"
      data-scene="gallery"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden px-4 py-8 md:py-12 select-none",
        "bg-[radial-gradient(ellipse_at_center,_#520f1c_0%,_#2e050c_50%,_#0d0103_100%)]",
        className
      )}
    >
      {/* ── 1. Atmosphere & Fairy Lights Canopy ──────────────── */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />
      <FairyLightsCanopy />

      {/* Warm Ambient Center Spotlight Flare */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[500px] rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.16)_0%,_rgba(201,144,74,0.06)_50%,_transparent_75%)] blur-3xl z-0"
      />

      {/* Floating Sparkle Particles */}
      <FloatingDecoration preset="sparkle" depth={2} className="top-24 left-10 w-2 h-2">
        <div className="w-full h-full rounded-full bg-gold/70 blur-[0.5px]" />
      </FloatingDecoration>
      <FloatingDecoration preset="sparkle" depth={2} className="top-28 right-16 w-2.5 h-2.5">
        <div className="w-full h-full rounded-full bg-gold/60 blur-[0.5px]" />
      </FloatingDecoration>

      {/* ── 2. Top Header & Navigation Bar ───────────────────── */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between gap-4 mt-6 pb-4 border-b border-[#c9904a]/25">
        <div className="flex flex-col text-left">
          <h1 className="gallery-headline-text font-handwriting text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fdf8f0] font-normal leading-tight tracking-wide drop-shadow-[0_2px_12px_rgba(246,201,78,0.35)]">
            {GALLERY_CONTENT.title}
          </h1>
          <p className="font-serif text-[0.65rem] sm:text-xs md:text-sm tracking-[0.2em] text-gold/80 uppercase mt-0.5">
            {GALLERY_CONTENT.subtitle}
          </p>
        </div>

        {/* Sage Green Pill "BACK ◂" Button */}
        <button
          type="button"
          aria-label="Back to selection hub"
          onClick={handleBack}
          className="shrink-0 inline-flex items-center justify-center font-serif text-xs sm:text-sm font-bold tracking-widest uppercase px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#87b07c] hover:bg-[#97c38b] text-[#162e15] shadow-[0_2px_10px_rgba(0,0,0,0.4)] border border-[#a8d39f]/50 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          {GALLERY_CONTENT.backButtonLabel}
        </button>
      </header>

      {/* ── 3. Scrapbook Board & 2x4 Photo Grid ──────────────── */}
      <main className="relative z-10 w-full max-w-6xl mx-auto my-6 md:my-10">
        <div className="relative rounded-lg p-2 sm:p-6 md:p-8 bg-[#20050a]/40 border border-[#c9904a]/25 shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xs">
          {/* Top Center Red Satin Ribbon Bow */}
          <RibbonBow className="gallery-ambient-sticker absolute -top-5 left-1/2 -translate-x-1/2 w-16 sm:w-20 z-30" />

          {/* 8-Photo Scrapbook Polaroid Grid (2x4 on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 items-center justify-items-center">
            {GALLERY_CONTENT.photos.map((photo, index) => (
              <PhotoGalleryItem
                key={photo.id}
                photo={photo}
                index={index}
                isSelected={activeModalPhoto?.id === photo.id}
                onClick={handleOpenPhoto}
              />
            ))}
          </div>

          {/* ── Illustrative Scrapbook Stickers (Matching Screenshot) ── */}
          {/* Golden Saturn (Bottom Left) */}
          <SaturnSticker className="gallery-ambient-sticker absolute -bottom-5 sm:-bottom-7 left-3 sm:left-6 w-18 sm:w-24 z-30 transform -rotate-12" />

          {/* Cute Watercolor Whale (Middle Right) */}
          <WhaleSticker className="gallery-ambient-sticker absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-6 w-16 sm:w-22 z-30 transform rotate-6" />

          {/* Purple Swirl Galaxy Planet (Bottom Right) */}
          <PlanetSticker className="gallery-ambient-sticker absolute -bottom-6 sm:-bottom-8 right-4 sm:right-10 w-16 sm:w-20 z-30 transform -rotate-6" />

          {/* Soft Pink Heart Pair (Bottom Center) */}
          <HeartPairSticker className="gallery-ambient-sticker absolute -bottom-5 left-1/2 -translate-x-1/2 w-14 sm:w-16 z-30" />
        </div>
      </main>

      {/* ── 4. Footer: Commemorative Date & Advance CTA ──────── */}
      <footer className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center text-center mt-2 pb-2 md:pb-4 gap-4">
        {/* Date "26-09-26" */}
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-8 sm:w-12 bg-gold/40" />
          <span className="font-handwriting text-lg sm:text-xl md:text-2xl text-gold/90 font-normal tracking-wide">
            {GALLERY_CONTENT.dateText}
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-gold/40" />
        </div>

        {/* Advance CTA Button */}
        <button
          type="button"
          onClick={handleAdvance}
          className="gallery-advance-btn group relative inline-flex flex-col items-center cursor-pointer transition-transform duration-300 focus-visible:outline-none"
        >
          <span className="font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#fdf8f0] font-medium uppercase transition-colors duration-300 group-hover:text-gold drop-shadow-md">
            {GALLERY_CONTENT.advanceButtonLabel}
          </span>
          <span
            aria-hidden="true"
            className="mt-1.5 h-[1.5px] w-32 sm:w-44 bg-gradient-to-r from-transparent via-gold/90 to-transparent transition-all duration-300 group-hover:w-56 shadow-sm"
          />
        </button>
      </footer>

      {/* ── 5. Scrapbook Lightbox Expansion Modal ────────────── */}
      <GalleryLightbox
        photo={activeModalPhoto}
        onClose={handleCloseModal}
      />
    </section>
  );
}
