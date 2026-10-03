// ─────────────────────────────────────────────────────────────
// JourneyScene
// Scene 3: Chronological storytelling timeline and memory path.
// Visual benchmark: docs/references/screenshots/journey-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef, useState } from "react";

import {
  breathingAnimation,
  dramaticReveal,
  floatingMovement,
  reveal,
} from "@/animations";
import { TimelineItem } from "@/components/shared";
import {
  CinematicImage,
  FloatingDecoration,
  PhotoFrame,
} from "@/components/ui";
import { useExperience } from "@/context/ExperienceContext";
import { JOURNEY_CONTENT } from "@/data/journey";
import { useAudio } from "@/hooks/useAudio";
import { useGSAP } from "@/hooks/useGSAP";
import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

/** Floating translucent pink heart outline */
function TranslucentHeart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]", className)}
    >
      <path
        d="M20 34 C12 26, 2 18, 2 10 C2 4, 7 1, 13 1 C17 1, 19 3, 20 5 C21 3, 23 1, 27 1 C33 1, 38 4, 38 10 C38 18, 28 26, 20 34 Z"
        fill="rgba(251, 113, 133, 0.18)"
        stroke="rgba(255, 205, 210, 0.75)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Skeuomorphic Embossed Silver Antique Rangefinder Camera */
function AntiqueCameraProp({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-36 sm:w-44 md:w-48 aspect-[5/3] select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]",
        className
      )}
    >
      <svg
        viewBox="0 0 160 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="silverPlate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3f4f6" />
            <stop offset="30%" stopColor="#d1d5db" />
            <stop offset="70%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>
          <linearGradient id="darkBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1d1d" />
            <stop offset="100%" stopColor="#0f0e0e" />
          </linearGradient>
          <radialGradient id="lensReflect" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1e3a8a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f172a" />
          </radialGradient>
        </defs>

        {/* Camera Main Body */}
        <rect x="8" y="24" width="144" height="66" rx="6" fill="url(#darkBody)" stroke="#4b5563" strokeWidth="1" />
        {/* Leatherette Grip Texture */}
        <rect x="12" y="32" width="136" height="52" rx="3" fill="#141212" opacity="0.9" />

        {/* Silver Top Plate */}
        <rect x="8" y="16" width="144" height="18" rx="3" fill="url(#silverPlate)" stroke="#e5e7eb" strokeWidth="0.5" />

        {/* Dials & Viewfinder */}
        <rect x="22" y="10" width="22" height="7" rx="1.5" fill="url(#silverPlate)" stroke="#9ca3af" strokeWidth="0.5" />
        <rect x="114" y="8" width="18" height="9" rx="1.5" fill="url(#silverPlate)" stroke="#9ca3af" strokeWidth="0.5" />
        <circle cx="140" cy="12" r="3.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.5" />
        <rect x="36" y="20" width="14" height="8" rx="1" fill="#111827" stroke="#6b7280" strokeWidth="0.5" />
        <rect x="100" y="20" width="8" height="6" rx="1" fill="#fbbf24" opacity="0.8" />

        {/* 35mm Rangefinder Lens */}
        <circle cx="80" cy="56" r="30" fill="url(#silverPlate)" stroke="#6b7280" strokeWidth="1" />
        <circle cx="80" cy="56" r="26" fill="#1e293b" />
        <circle cx="80" cy="56" r="22" fill="url(#silverPlate)" />
        <circle cx="80" cy="56" r="18" fill="url(#lensReflect)" stroke="#93c5fd" strokeWidth="0.75" />
        <circle cx="74" cy="50" r="4.5" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );
}

/** Open Wooden Keepsake Chest Overflowing with Petals & Paper Hearts */
function KeepsakeChestProp({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-36 sm:w-44 md:w-50 aspect-[5/3] select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <svg
        viewBox="0 0 160 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="chestWood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5c2e17" />
            <stop offset="50%" stopColor="#3d1d0e" />
            <stop offset="100%" stopColor="#241007" />
          </linearGradient>
          <linearGradient id="brassTrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d9a85f" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#c9904a" />
          </linearGradient>
        </defs>

        {/* Chest Lower Box */}
        <path d="M18 48 L142 48 L134 92 L26 92 Z" fill="url(#chestWood)" stroke="#1a0a04" strokeWidth="1.5" />

        {/* Brass Straps */}
        <rect x="42" y="48" width="8" height="44" fill="url(#brassTrim)" opacity="0.85" />
        <rect x="110" y="48" width="8" height="44" fill="url(#brassTrim)" opacity="0.85" />
        <rect x="74" y="52" width="12" height="14" rx="2" fill="url(#brassTrim)" stroke="#78350f" strokeWidth="1" />

        {/* Angled Open Lid */}
        <path d="M12 44 L148 44 L138 16 L22 16 Z" fill="url(#chestWood)" stroke="#1a0a04" strokeWidth="1.5" />
        <path d="M42 16 L42 44 M110 16 L110 44" stroke="url(#brassTrim)" strokeWidth="6" opacity="0.85" />

        {/* Overflowing Red Rose Petals */}
        <ellipse cx="60" cy="46" rx="9" ry="6" fill="#881337" transform="rotate(-15 60 46)" />
        <ellipse cx="78" cy="44" rx="10" ry="7" fill="#9f1239" transform="rotate(20 78 44)" />
        <ellipse cx="98" cy="47" rx="9" ry="6" fill="#be123c" transform="rotate(-10 98 47)" />
        <ellipse cx="44" cy="49" rx="8" ry="5" fill="#9f1239" transform="rotate(30 44 49)" />
        <ellipse cx="116" cy="48" rx="8" ry="5" fill="#881337" transform="rotate(-25 116 48)" />

        {/* Pastel Pink Paper Hearts inside chest */}
        <path
          d="M68 45 C64 41, 58 43, 58 47 C58 51, 68 56, 68 56 C68 56, 78 51, 78 47 C78 43, 72 41, 68 45 Z"
          fill="#fbcfe8"
          stroke="#f472b6"
          strokeWidth="0.75"
          transform="scale(0.8) translate(15, 2)"
        />
        <path
          d="M92 42 C88 38, 82 40, 82 44 C82 48, 92 53, 92 53 C92 53, 102 48, 102 44 C102 40, 96 38, 92 42 Z"
          fill="#f472b6"
          stroke="#db2777"
          strokeWidth="0.75"
          transform="scale(0.7) translate(38, 12)"
        />
      </svg>
    </div>
  );
}

/** Open Wooden Music Box with Crank & Glowing Cyan Musical Notes */
function MusicBoxProp({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-40 sm:w-48 md:w-52 aspect-[5/3] select-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {/* Floating Ethereal Cyan Musical Notes Staff */}
      <div className="journey-cyan-notes absolute -top-16 left-6 w-36 h-24 pointer-events-none z-30">
        <svg viewBox="0 0 120 70" fill="none" className="w-full h-full drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">
          {/* Cyan Staff Lines */}
          <path d="M10 50 Q 50 20, 110 30" stroke="rgba(34, 211, 238, 0.65)" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M12 55 Q 52 25, 112 35" stroke="rgba(34, 211, 238, 0.45)" strokeWidth="0.8" />

          {/* Musical Glyph Notes */}
          <text x="25" y="42" fill="#67e8f9" fontSize="16" fontFamily="sans-serif">♪</text>
          <text x="55" y="24" fill="#a5f3fc" fontSize="18" fontFamily="sans-serif">♫</text>
          <text x="88" y="28" fill="#22d3ee" fontSize="14" fontFamily="sans-serif">♬</text>
          <text x="105" y="40" fill="#67e8f9" fontSize="12" fontFamily="sans-serif">♪</text>
        </svg>
      </div>

      <svg
        viewBox="0 0 170 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="musicBoxBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a2511" />
            <stop offset="50%" stopColor="#2e1408" />
            <stop offset="100%" stopColor="#1a0a03" />
          </linearGradient>
          <linearGradient id="goldComb" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d9a85f" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#c9904a" />
          </linearGradient>
        </defs>

        {/* Music Box Lower Body */}
        <rect x="20" y="48" width="120" height="46" rx="4" fill="url(#musicBoxBody)" stroke="#1a0a03" strokeWidth="1.5" />

        {/* Brass corner brackets */}
        <path d="M20 54 L28 48 M140 54 L132 48 M20 88 L28 94 M140 88 L132 94" stroke="url(#goldComb)" strokeWidth="2.5" />

        {/* Gold Stamped Text: "Our Soundtrack" */}
        <text
          x="80"
          y="76"
          fill="#fef08a"
          fontSize="8.5"
          fontFamily="serif"
          fontWeight="bold"
          letterSpacing="1.2"
          textAnchor="middle"
          opacity="0.9"
        >
          OUR SOUNDTRACK
        </text>

        {/* Open Hinged Lid */}
        <path d="M16 46 L144 46 L134 18 L26 18 Z" fill="url(#musicBoxBody)" stroke="#1a0a03" strokeWidth="1.5" />
        <rect x="36" y="24" width="88" height="16" rx="2" fill="#241007" stroke="url(#goldComb)" strokeWidth="0.75" />

        {/* Inner Brass Cylinder & Comb Gear Mechanism */}
        <rect x="44" y="27" width="40" height="10" rx="3" fill="url(#goldComb)" />
        <line x1="88" y1="28" x2="114" y2="28" stroke="url(#goldComb)" strokeWidth="2" strokeDasharray="1.5 1.5" />
        <line x1="88" y1="32" x2="114" y2="32" stroke="url(#goldComb)" strokeWidth="2" strokeDasharray="1.5 1.5" />

        {/* Metal Wind-Up Crank Handle (Right Side) */}
        <path d="M140 68 L154 68 L154 54 L162 54" stroke="url(#goldComb)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="162" cy="54" r="3.5" fill="#fef08a" />
      </svg>
    </div>
  );
}

export function JourneyScene(props: SceneProps) {
  const { isActive = false, className, onNext, onPrevious } = props;
  const audio = useAudio();
  const { goToScene } = useExperience();

  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Audio feedback and milestone selection
  const handleSelectMilestone = useCallback(
    (id: string) => {
      audio.playSfx("sfx-card-flip");
      setSelectedMilestoneId((prev) => (prev === id ? null : id));
    },
    [audio]
  );

  // Return to Selection Hub
  const handleBack = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onPrevious) {
      onPrevious();
    } else {
      goToScene("selection");
    }
  }, [audio, onPrevious, goToScene]);

  // Advance to next experience (GalleryScene)
  const handleAdvance = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onNext) {
      onNext();
    } else {
      goToScene("gallery");
    }
  }, [audio, onNext, goToScene]);

  // Connect GSAP lifecycle via verified useGSAP hook
  useGSAP(
    () => {
      if (!isActive) return;

      // 1. Headline dramatic typographic expansion
      dramaticReveal(".journey-header-title", {
        duration: 1.3,
        trackingStart: "0.18em",
        trackingEnd: "0.02em",
      });

      // 2. Parallax reveal on Left & Right Hero Clusters
      reveal(".journey-hero-left", {
        direction: "left",
        distance: 35,
        duration: 1.1,
        ease: "power2.out",
      });

      reveal(".journey-hero-right", {
        direction: "right",
        distance: 35,
        duration: 1.1,
        ease: "power2.out",
      });

      // 3. Staggered reveal for Chronological Timeline Items
      reveal(".timeline-item-container", {
        direction: "up",
        distance: 40,
        stagger: 0.12,
        duration: 1.0,
        ease: "power2.out",
      });

      // 4. Subtle ambient drifting on floating translucent hearts
      floatingMovement(".journey-floating-hearts", {
        yDistance: 14,
        xDistance: 5,
        duration: 6.5,
      });

      // 5. Breathing animation on bottom advance button
      breathingAnimation(".journey-advance-btn", {
        scaleTo: 1.03,
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
      id="scene-journey"
      data-scene="journey"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden px-4 sm:px-6 md:px-8 py-8 md:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] select-none",
        "bg-scene-stage",
        className
      )}
    >
      {/* ── 1. Atmosphere & Floating Ambient Motifs ───────────── */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      {/* Floating Translucent Pink Hearts */}
      <FloatingDecoration preset="drift" depth={2} className="journey-floating-hearts top-20 left-6 sm:left-14 w-8 sm:w-10 h-8 sm:h-10">
        <TranslucentHeart />
      </FloatingDecoration>
      <FloatingDecoration preset="drift-reverse" depth={3} className="journey-floating-hearts top-1/3 right-8 sm:right-20 w-10 sm:w-12 h-10 sm:h-12">
        <TranslucentHeart />
      </FloatingDecoration>
      <FloatingDecoration preset="sway" depth={2} className="journey-floating-hearts bottom-1/4 left-8 sm:left-24 w-7 sm:w-9 h-7 sm:h-9">
        <TranslucentHeart />
      </FloatingDecoration>
      <FloatingDecoration preset="float" depth={3} className="journey-floating-hearts bottom-24 right-10 sm:right-32 w-11 sm:w-14 h-11 sm:h-14">
        <TranslucentHeart />
      </FloatingDecoration>

      {/* Soft warm bokeh flares */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[350px] rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.15)_0%,_rgba(201,144,74,0.05)_50%,_transparent_75%)] blur-3xl z-0"
      />

      {/* ── 2. Top Header & Navigation Bar ───────────────────── */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between gap-4 pb-4 border-b border-[#c9904a]/25">
        {/* Title & Subtitle */}
        <div className="flex flex-col text-left">
          <h1 className="journey-header-title font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#fdf8f0] font-normal leading-tight tracking-wide drop-shadow-[0_2px_10px_rgba(246,201,78,0.3)]">
            {JOURNEY_CONTENT.title}
          </h1>
          <p className="font-serif text-[0.65rem] sm:text-xs md:text-sm tracking-[0.2em] text-gold/80 uppercase mt-0.5">
            {JOURNEY_CONTENT.subtitle}
          </p>
        </div>

        {/* Sage Green Pill "BACK ◂" Button */}
        <button
          type="button"
          aria-label="Back to selection hub"
          onClick={handleBack}
          className="shrink-0 inline-flex items-center justify-center font-serif text-[0.65rem] sm:text-xs md:text-sm font-bold tracking-wider md:tracking-widest uppercase px-3.5 sm:px-5 md:px-6 py-2 sm:py-2.5 min-h-[44px] min-w-[44px] rounded-full bg-[#87b07c] hover:bg-[#97c38b] text-[#162e15] shadow-[0_2px_10px_rgba(0,0,0,0.4)] border border-[#a8d39f]/50 transition-all duration-300 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0509]"
        >
          {JOURNEY_CONTENT.backButtonLabel}
        </button>
      </header>

      {/* ── 3. Hero Feature Stage (Visual Benchmark) ─────────── */}
      <section className="relative z-10 w-full max-w-6xl mx-auto my-8 md:my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center justify-items-center">
          {/* Left Cluster: Baroque Gilded Frame + Camera + Treasure Chest */}
          <div className="journey-hero-left relative flex flex-col items-center text-center max-w-md w-full">
            {/* Gilded Baroque Frame */}
            <div className="relative z-10 w-60 sm:w-68 md:w-72 drop-shadow-[0_12px_32px_rgba(0,0,0,0.7)]">
              <PhotoFrame
                variant={JOURNEY_CONTENT.hero.left.photo.frameVariant}
                rotation={JOURNEY_CONTENT.hero.left.photo.rotation}
                aspectRatio={JOURNEY_CONTENT.hero.left.photo.aspectRatio}
                tapeStyle={JOURNEY_CONTENT.hero.left.photo.tapeStyle}
                caption={JOURNEY_CONTENT.hero.left.photo.caption}
                date={JOURNEY_CONTENT.hero.left.photo.date}
                className="w-full"
              >
                <div className="relative w-full h-full min-h-[220px] bg-gradient-to-br from-[#2a1710] via-[#1a0e08] to-[#0d0704] flex flex-col items-center justify-center p-3 overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d9a85f_1px,transparent_1px)] [background-size:8px_8px]" />
                  <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(201,144,74,0.35)] pointer-events-none z-20" />
                  {JOURNEY_CONTENT.hero.left.photo.src ? (
                    <CinematicImage
                      src={JOURNEY_CONTENT.hero.left.photo.src}
                      alt={JOURNEY_CONTENT.hero.left.photo.alt}
                      fill
                      sizes="(max-width: 768px) 240px, 300px"
                      loading="lazy"
                      quality={85}
                      className="relative z-10 w-full h-full object-cover rounded-xs"
                    />
                  ) : (
                    <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
                      <span className="text-gold/80 text-xl">✦</span>
                      <span className="font-handwriting text-gold text-lg md:text-xl tracking-wide">
                        {JOURNEY_CONTENT.hero.left.photo.caption}
                      </span>
                      <span className="font-sans text-[0.65rem] text-gold/60 tracking-widest uppercase">
                        Nayyy & Keillaa
                      </span>
                    </div>
                  )}
                </div>
              </PhotoFrame>
            </div>

            {/* Foreground Physical Props: Antique Camera + Keepsake Chest */}
            <div className="relative z-20 -mt-10 sm:-mt-12 flex items-center justify-center gap-2 sm:gap-4 w-full">
              <AntiqueCameraProp className="transform -rotate-6 hover:rotate-0 transition-transform duration-300" />
              <KeepsakeChestProp className="transform rotate-4 hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>

          {/* Right Cluster: Overlapping Gilded Frames + Music Box + Cyan Staff */}
          <div className="journey-hero-right relative flex flex-col items-center text-center max-w-md w-full">
            {/* Overlapping Gilded Frames */}
            <div className="relative z-10 w-full flex items-center justify-center min-h-[250px] sm:min-h-[280px]">
              {/* Back Tilted Rectangular Frame */}
              <div className="absolute -top-4 right-6 sm:right-12 w-44 sm:w-52 z-10 drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
                <PhotoFrame
                  variant={JOURNEY_CONTENT.hero.right.photos[0].frameVariant}
                  rotation={JOURNEY_CONTENT.hero.right.photos[0].rotation}
                  aspectRatio={JOURNEY_CONTENT.hero.right.photos[0].aspectRatio}
                  tapeStyle={JOURNEY_CONTENT.hero.right.photos[0].tapeStyle}
                  className="w-full"
                >
                  <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#24130b] to-[#0c0603] flex items-center justify-center p-2 overflow-hidden">
                    {JOURNEY_CONTENT.hero.right.photos[0]?.src ? (
                      <CinematicImage
                        src={JOURNEY_CONTENT.hero.right.photos[0].src}
                        alt={JOURNEY_CONTENT.hero.right.photos[0].alt}
                        fill
                        sizes="200px"
                        loading="lazy"
                        quality={85}
                        className="relative z-10 w-full h-full object-cover rounded-xs"
                      />
                    ) : (
                      <span className="font-handwriting text-gold/70 text-sm">Cherished Memory</span>
                    )}
                  </div>
                </PhotoFrame>
              </div>

              {/* Front Upright Square Baroque Frame */}
              <div className="relative z-20 w-48 sm:w-56 drop-shadow-[0_12px_32px_rgba(0,0,0,0.75)]">
                <PhotoFrame
                  variant={JOURNEY_CONTENT.hero.right.photos[1].frameVariant}
                  rotation={JOURNEY_CONTENT.hero.right.photos[1].rotation}
                  aspectRatio={JOURNEY_CONTENT.hero.right.photos[1].aspectRatio}
                  caption={JOURNEY_CONTENT.hero.right.photos[1].caption}
                  className="w-full"
                >
                  <div className="relative w-full h-full min-h-[160px] bg-gradient-to-br from-[#2a1710] to-[#0d0704] flex flex-col items-center justify-center p-2 overflow-hidden">
                    {JOURNEY_CONTENT.hero.right.photos[1]?.src ? (
                      <CinematicImage
                        src={JOURNEY_CONTENT.hero.right.photos[1].src}
                        alt={JOURNEY_CONTENT.hero.right.photos[1].alt}
                        fill
                        sizes="220px"
                        loading="lazy"
                        quality={85}
                        className="relative z-10 w-full h-full object-cover rounded-xs"
                      />
                    ) : (
                      <>
                        <span className="text-gold/80 text-base">♥</span>
                        <span className="font-handwriting text-gold text-sm tracking-wide">Forever & Always</span>
                      </>
                    )}
                  </div>
                </PhotoFrame>
              </div>
            </div>

            {/* Foreground Music Box Prop with Cyan Notes */}
            <div className="relative z-20 -mt-6 sm:-mt-8 flex items-center justify-center w-full">
              <MusicBoxProp className="transform hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Chronological Storytelling Timeline ────────────── */}
      <section className="relative z-10 w-full max-w-5xl mx-auto mt-8 md:mt-16 mb-12">
        {/* Timeline Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-3 text-gold/60 text-sm select-none">
            <span>❦</span>
            <span className="h-[1px] w-12 sm:w-20 bg-gold/40" />
            <span className="text-xs">✦</span>
            <span className="h-[1px] w-12 sm:w-20 bg-gold/40" />
            <span>❦</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#fdf8f0] font-bold tracking-tight mt-2">
            {JOURNEY_CONTENT.timelineHeading}
          </h2>
          <p className="font-handwriting text-base sm:text-lg text-gold/80 mt-1">
            {JOURNEY_CONTENT.timelineSubtitle}
          </p>
        </div>

        {/* Central Vertical Connector Line */}
        <div className="relative w-full">
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-0 bottom-0 pointer-events-none z-0",
              // Mobile: positioned at left-4
              "left-4 md:left-1/2 -translate-x-1/2",
              "w-0.5 bg-gradient-to-b from-transparent via-[#c9904a]/70 to-transparent",
              "shadow-[0_0_8px_rgba(246,201,78,0.3)]"
            )}
          />

          {/* Timeline Milestones Deck */}
          <div className="flex flex-col w-full">
            {JOURNEY_CONTENT.milestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.id}
                milestone={milestone}
                index={index}
                isEven={index % 2 !== 0}
                isSelected={selectedMilestoneId === milestone.id}
                onSelect={handleSelectMilestone}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Bottom Navigation Action Footer ────────────────── */}
      <footer className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center text-center mt-6 mb-2 sm:mb-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          aria-label="Advance to the Moments photo gallery"
          onClick={handleAdvance}
          className="journey-advance-btn group relative inline-flex flex-col items-center cursor-pointer transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0509] rounded-sm p-1"
        >
          <span className="font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#fdf8f0] font-medium uppercase transition-colors duration-300 group-hover:text-gold drop-shadow-md">
            {JOURNEY_CONTENT.advanceButtonLabel}
          </span>
          <span
            aria-hidden="true"
            className="mt-1.5 h-[1.5px] w-32 sm:w-44 bg-gradient-to-r from-transparent via-gold/90 to-transparent transition-all duration-300 group-hover:w-56 shadow-sm"
          />
        </button>
      </footer>
    </section>
  );
}
