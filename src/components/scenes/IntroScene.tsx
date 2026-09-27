// ─────────────────────────────────────────────────────────────
// IntroScene
// Scene 1: Interactive envelope opening & cinematic entrance.
// Visual benchmark: docs/references/screenshots/intro-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef, useState } from "react";

import {
  breathingAnimation,
  dramaticReveal,
  floatingMovement,
  paperReveal,
  reveal,
} from "@/animations";
import {
  FloatingDecoration,
  PaperCard,
  PhotoFrame,
  VintageButton,
} from "@/components/ui";
import { INTRO_CONTENT, type IntroPhotoItem } from "@/data/intro";
import { useAudio } from "@/hooks/useAudio";
import { useGSAP } from "@/hooks/useGSAP";
import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

/** Decorative red monarch butterfly matching intro-scene.png */
function MonarchButterfly({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <svg
        viewBox="0 0 64 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Left Forewing */}
        <path
          d="M32 24 C26 12, 10 2, 2 10 C-4 17, 2 34, 18 36 C25 36, 29 30, 32 24 Z"
          fill="#d82525"
        />
        <path
          d="M32 24 C26 12, 10 2, 2 10 C-4 17, 2 34, 18 36 Z"
          stroke="#110505"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M10 12 C18 20, 24 25, 32 24 M6 22 C14 26, 22 28, 30 26 M14 8 C22 16, 26 22, 31 24"
          stroke="#110505"
          strokeWidth="1.2"
        />

        {/* Right Forewing */}
        <path
          d="M32 24 C38 12, 54 2, 62 10 C68 17, 62 34, 46 36 C39 36, 35 30, 32 24 Z"
          fill="#d82525"
        />
        <path
          d="M32 24 C38 12, 54 2, 62 10 C68 17, 62 34, 46 36 Z"
          stroke="#110505"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M54 12 C46 20, 40 25, 32 24 M58 22 C50 26, 42 28, 34 26 M50 8 C42 16, 38 22, 33 24"
          stroke="#110505"
          strokeWidth="1.2"
        />

        {/* Hindwings */}
        <path
          d="M32 26 C24 30, 14 36, 20 46 C26 50, 32 40, 32 32 Z"
          fill="#c01818"
          stroke="#110505"
          strokeWidth="2"
        />
        <path
          d="M32 26 C40 30, 50 36, 44 46 C38 50, 32 40, 32 32 Z"
          fill="#c01818"
          stroke="#110505"
        />

        {/* White Edge Spots */}
        <circle cx="4" cy="12" r="1" fill="#fff9eb" />
        <circle cx="8" cy="8" r="0.9" fill="#fff9eb" />
        <circle cx="14" cy="5" r="1.1" fill="#fff9eb" />
        <circle cx="60" cy="12" r="1" fill="#fff9eb" />
        <circle cx="56" cy="8" r="0.9" fill="#fff9eb" />
        <circle cx="50" cy="5" r="1.1" fill="#fff9eb" />

        {/* Body & Antennae */}
        <ellipse cx="32" cy="27" rx="2" ry="9" fill="#0d0404" />
        <path
          d="M31 18 Q27 10, 22 8 M33 18 Q37 10, 42 8"
          stroke="#0d0404"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/** Romantic rose cluster floral bouquet */
function RoseCluster({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
        flip && "-scale-x-100",
        className
      )}
    >
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Sage Foliage */}
        <path
          d="M20 45 C10 35, 12 20, 28 28 C28 40, 22 45, 20 45 Z"
          fill="#445934"
          opacity="0.85"
        />
        <path
          d="M80 50 C92 40, 90 22, 74 32 C74 42, 78 48, 80 50 Z"
          fill="#445934"
          opacity="0.85"
        />

        {/* Baby's Breath / Gypsophila Sprigs */}
        <circle cx="16" cy="20" r="2.2" fill="#fdf8f0" />
        <circle cx="24" cy="15" r="1.8" fill="#fdf8f0" />
        <circle cx="10" cy="28" r="2" fill="#fdf8f0" />
        <circle cx="85" cy="22" r="2.2" fill="#fdf8f0" />
        <circle cx="78" cy="16" r="1.8" fill="#fdf8f0" />
        <circle cx="92" cy="30" r="2" fill="#fdf8f0" />

        {/* Velvet Red Rose (Main) */}
        <circle cx="48" cy="46" r="22" fill="#7a0e1c" />
        <path
          d="M38 42 C40 34, 56 34, 58 42 C56 50, 40 50, 38 42 Z"
          fill="#9e1828"
        />
        <path
          d="M44 40 C46 36, 52 36, 54 40 C52 44, 46 44, 44 40 Z"
          fill="#bf2436"
        />
        <path
          d="M47 38 A2 2 0 1 1 51 38 A2 2 0 1 1 47 38"
          fill="#e03b4e"
        />

        {/* Blush Pink Rose (Secondary) */}
        <circle cx="70" cy="54" r="16" fill="#ba636e" />
        <circle cx="70" cy="54" r="11" fill="#e89898" />
        <circle cx="70" cy="54" r="6" fill="#f5c6c6" />

        {/* Small Red Rosebud */}
        <circle cx="28" cy="56" r="12" fill="#7a0e1c" />
        <circle cx="28" cy="56" r="7" fill="#9e1828" />
      </svg>
    </div>
  );
}

/** Tilted scrapbook photo item with placeholder fallback */
function IntroPhotoCard({ photo }: { photo: IntroPhotoItem }) {
  return (
    <div
      className={cn(
        "intro-photo-card transition-transform duration-300 ease-out hover:scale-105 hover:z-30",
        photo.positionClasses
      )}
    >
      <PhotoFrame
        variant={photo.variant}
        rotation={photo.rotation}
        aspectRatio={photo.aspectRatio}
        className="w-full shadow-2xl"
      >
        <div className="relative w-full h-full min-h-[140px] bg-gradient-to-br from-[#2a1710] via-[#1a0e08] to-[#0d0704] flex flex-col items-center justify-center p-3 overflow-hidden">
          {/* Subtle vintage texture overlay */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d9a85f_1px,transparent_1px)] [background-size:8px_8px]" />

          {/* Golden inner vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(201,144,74,0.25)]" />

          {/* Placeholder art representation */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
            <span className="text-gold/70 text-lg">✦</span>
            <span className="font-handwriting text-gold/80 text-sm tracking-wide">
              {photo.alt}
            </span>
            <span className="font-sans text-[0.6rem] text-gold/50 tracking-widest uppercase">
              26-09-26
            </span>
          </div>

          {/* Perched monarch butterfly if assigned */}
          {photo.hasButterfly && (
            <MonarchButterfly className="absolute -bottom-2 -right-3 w-14 h-12 z-30 transform rotate-12" />
          )}
        </div>
      </PhotoFrame>
    </div>
  );
}

export function IntroScene(props: SceneProps) {
  const { isActive = false, className, onNext, onComplete } = props;
  const audio = useAudio();
  const [isOpening, setIsOpening] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const handleOpenEnvelope = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio feedback: trigger prepared wax crack / shimmer SFX
    audio.playSfx("sfx-wax-crack");

    // Seamless delay to let tactile audio/visual register before scene transition
    setTimeout(() => {
      if (onNext) {
        onNext();
      } else if (onComplete) {
        onComplete();
      }
    }, 450);
  }, [audio, isOpening, onNext, onComplete]);

  // Connect animations to existing utilities via useGSAP
  useGSAP(
    () => {
      if (!isActive) return;

      // 1. Staggered entrance for the 5 scrapbook photos
      reveal(".intro-photo-card", {
        direction: "up",
        distance: 35,
        stagger: 0.12,
        duration: 1.0,
        ease: "power2.out",
      });

      // 2. Unfold parchment letter within the envelope
      paperReveal(".intro-envelope-letter", {
        duration: 1.2,
        direction: "unfold",
        delay: 0.25,
      });

      // 3. Typographic headline reveal
      dramaticReveal(".intro-headline-text", {
        duration: 1.5,
        delay: 0.4,
        trackingStart: "0.18em",
        trackingEnd: "0.02em",
      });

      // 4. Subtle ambient breathing on the wax seal
      breathingAnimation(".intro-wax-seal-btn", {
        scaleTo: 1.06,
        opacityFrom: 0.92,
        opacityTo: 1.0,
        duration: 2.8,
      });

      // 5. Gentle floating oscillation on the central envelope group
      floatingMovement(".intro-floating-envelope", {
        yDistance: 8,
        xDistance: 3,
        rotationAngle: 0.8,
        duration: 5.5,
      });
    },
    [isActive],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      id="scene-intro"
      data-scene="intro"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-8 md:py-12 select-none",
        "bg-[radial-gradient(ellipse_at_center,_#4a0d18_0%,_#240409_55%,_#0d0103_100%)]",
        className
      )}
    >
      {/* ── 1. Background Atmosphere & Ambient Lighting ───────── */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      {/* Warm golden spotlight centered behind the envelope */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[600px] h-[340px] md:h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(246,201,78,0.18)_0%,_rgba(201,144,74,0.08)_45%,_transparent_70%)] blur-2xl z-0"
      />

      {/* Floating bokeh ambient particles */}
      <FloatingDecoration preset="drift" depth={3} className="top-12 left-10 w-24 h-24">
        <div className="w-full h-full rounded-full bg-gold/10 blur-xl" />
      </FloatingDecoration>
      <FloatingDecoration preset="drift-reverse" depth={3} className="bottom-16 right-12 w-32 h-32">
        <div className="w-full h-full rounded-full bg-rose/15 blur-xl" />
      </FloatingDecoration>
      <FloatingDecoration preset="sway" depth={2} className="top-1/4 right-20 w-3 h-3">
        <div className="w-full h-full rounded-full bg-gold/40 blur-[1px]" />
      </FloatingDecoration>
      <FloatingDecoration preset="float" depth={2} className="bottom-1/3 left-16 w-2.5 h-2.5">
        <div className="w-full h-full rounded-full bg-rose/50 blur-[1px]" />
      </FloatingDecoration>

      {/* ── 2. Primary Composition Stage ─────────────────────── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Floating Envelope Composition */}
        <div className="intro-floating-envelope relative w-full max-w-xl flex items-center justify-center">
          {/* Scrapbook Photos Layer (Positioned around envelope matching intro-scene.png) */}
          {INTRO_CONTENT.photos.map((photo) => (
            <IntroPhotoCard key={photo.id} photo={photo} />
          ))}

          {/* Floral Bouquets Flanking Envelope */}
          <RoseCluster className="absolute -top-10 -left-6 md:-left-12 w-28 md:w-36 z-20" />
          <RoseCluster className="absolute -bottom-8 -right-6 md:-right-12 w-28 md:w-36 z-20" flip />

          {/* Envelope Body */}
          <div className="relative w-full max-w-md md:max-w-lg">
            {/* Protruding Deckle-Edged Letter */}
            <div className="intro-envelope-letter relative z-10 -mb-8 px-4">
              <PaperCard
                variant="deckle"
                shadow="xl"
                hasTexture={true}
                className="w-full text-center py-8 px-6 md:py-10 md:px-10 border-[#c9904a]/40 bg-gradient-to-b from-[#fdf8f0] via-[#f9edd8] to-[#f2dbb4]"
              >
                {/* Headline: "Happy Anniversary" */}
                <h1 className="intro-headline-text font-handwriting text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3b1c0e] font-normal leading-tight tracking-wide drop-shadow-[0_1px_2px_rgba(201,144,74,0.3)]">
                  {INTRO_CONTENT.headline}
                </h1>

                {/* Commemorative Date: 26-09-26 */}
                <p className="mt-3 font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#6b3a1a] font-medium uppercase">
                  {INTRO_CONTENT.date}
                </p>

                {/* Dedication Text */}
                <div className="mt-4 flex flex-col items-center gap-0.5">
                  <p className="font-handwriting text-base sm:text-lg text-[#5c3016] italic">
                    {INTRO_CONTENT.salutation}
                  </p>
                  <p className="font-handwriting text-sm sm:text-base text-[#4a240f] tracking-wide">
                    ({INTRO_CONTENT.coupleNames})
                  </p>
                </div>
              </PaperCard>
            </div>

            {/* Envelope Pocket Base */}
            <div className="relative z-20 w-full h-24 md:h-28 bg-gradient-to-t from-[#e8c48a] to-[#f2dbb4] rounded-b-md shadow-2xl border-t border-[#c9904a]/50 flex items-center justify-center [clip-path:polygon(0%_0%,50%_45%,100%_0%,100%_100%,0%_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(#c9904a_0.75px,transparent_0.75px)] [background-size:10px_10px] opacity-30" />
            </div>

            {/* Central Dimensional Wax Seal Button */}
            <div className="absolute left-1/2 bottom-12 md:bottom-14 -translate-x-1/2 z-30">
              <VintageButton
                variant="wax-seal"
                aria-label="Open anniversary envelope"
                onClick={handleOpenEnvelope}
                className={cn(
                  "intro-wax-seal-btn w-16 h-16 md:w-20 md:h-20 shadow-[0_6px_20px_rgba(0,0,0,0.7),0_0_25px_rgba(212,107,107,0.4)]",
                  isOpening && "scale-110 brightness-125 transition-all duration-300"
                )}
              >
                {/* Embossed Wax Monogram */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-xs md:text-sm font-serif leading-none tracking-tighter text-[#fde68a]">
                    ♥
                  </span>
                  <span className="font-serif text-[0.65rem] md:text-xs font-bold tracking-widest text-[#fdf8f0]">
                    {INTRO_CONTENT.monogram}
                  </span>
                </div>
              </VintageButton>
            </div>
          </div>
        </div>

        {/* ── 3. Bottom CTA Action Banner ────────────────────── */}
        <div className="relative z-20 mt-12 md:mt-16 flex flex-col items-center gap-3">
          <VintageButton
            variant="secondary"
            size="lg"
            onClick={handleOpenEnvelope}
            className="intro-cta-banner px-8 py-3 bg-gradient-to-r from-[#fdf8f0] via-[#f9edd8] to-[#f2dbb4] text-[#2d1f10] border border-[#c9904a]/50 shadow-[0_4px_16px_rgba(0,0,0,0.4),0_0_20px_rgba(201,144,74,0.15)] hover:border-gold hover:shadow-[0_0_24px_rgba(246,201,78,0.3)] transition-all duration-300 tracking-[0.25em] text-xs sm:text-sm font-serif"
          >
            {INTRO_CONTENT.ctaText}
          </VintageButton>

          {/* Floating Petal Accents Flanking Banner */}
          <div className="flex items-center gap-6 text-rose/60 text-xs select-none pointer-events-none">
            <span>❧</span>
            <span className="tracking-widest uppercase font-sans text-[0.65rem] text-gold/60">
              Tap the seal to continue
            </span>
            <span>☙</span>
          </div>
        </div>
      </div>
    </section>
  );
}
