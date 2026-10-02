// ─────────────────────────────────────────────────────────────
// GiftScene
// Scene 6: Mysterious physical gift reveal before the final letter.
// Visual benchmark: docs/references/screenshots/gift-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef, useState } from "react";

import {
  breathingAnimation,
  dramaticReveal,
  floatingMovement,
  reveal,
} from "@/animations";
import {
  GiftBox,
  GiftContentPanel,
  RevealEffect,
} from "@/components/shared";
import { FloatingDecoration } from "@/components/ui";
import { useExperience } from "@/context/ExperienceContext";
import { GIFT_CONTENT } from "@/data/gift";
import { useAudio } from "@/hooks/useAudio";
import { useGSAP } from "@/hooks/useGSAP";
import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

/** Corner Filigree Scrollwork Ornament SVG */
function CornerFiligree({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("w-12 sm:w-16 md:w-20 aspect-square select-none pointer-events-none opacity-70", className)}>
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full stroke-[#d9a85f]">
        <path d="M4 76 L4 20 C4 11, 11 4, 20 4 L76 4" strokeWidth="1.5" />
        <path d="M10 70 L10 24 C10 16, 16 10, 24 10 L70 10" strokeWidth="0.75" strokeOpacity="0.6" />
        <path d="M8 8 C16 16, 24 8, 32 16 M8 8 C16 24, 8 24, 16 32" strokeWidth="1.2" />
        <circle cx="20" cy="20" r="3" fill="#d9a85f" stroke="none" />
        <circle cx="8" cy="8" r="2" fill="#d9a85f" stroke="none" />
      </svg>
    </div>
  );
}

/** Full-Screen Ornate Double-Line Gold Frame with Corner Scrollwork */
function OrnateFiligreeFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 select-none overflow-hidden">
      {/* Outer Gold Inset Border */}
      <div className="absolute inset-3 sm:inset-4 md:inset-6 border border-[#c9904a]/40 rounded-sm pointer-events-none" />
      {/* Inner Delicate Inset Border */}
      <div className="absolute inset-4 sm:inset-5 md:inset-8 border border-[#d9a85f]/25 rounded-sm pointer-events-none" />

      {/* 4 Corner Ornaments */}
      <CornerFiligree className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6" />
      <CornerFiligree className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 -scale-x-100" />
      <CornerFiligree className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 -scale-y-100" />
      <CornerFiligree className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 -scale-100" />
    </div>
  );
}

/** Starlight Lens Flare Sparkle */
function StarlightFlare({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "gift-starlight-flare inline-block select-none pointer-events-none text-gold drop-shadow-[0_0_8px_rgba(254,240,138,0.9)]",
        className
      )}
    >
      ✦
    </span>
  );
}

export function GiftScene(props: SceneProps) {
  const { isActive = false, className, onNext, onPrevious } = props;
  const audio = useAudio();
  const { goToScene } = useExperience();

  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

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

  // Unseal Envelope / Open Gift
  const handleOpenGift = useCallback(() => {
    if (isOpening || isOpened) return;

    setIsOpening(true);
    // Sound effect: cracking wax seal
    audio.playSfx("sfx-wax-crack");

    // After brief luminous bloom, open keepsake panel
    setTimeout(() => {
      setIsOpening(false);
      setIsOpened(true);
    }, 750);
  }, [audio, isOpening, isOpened]);

  // Advance to Final Letter Scene
  const handleAdvance = useCallback(() => {
    audio.playSfx("sfx-parchment-unfold");
    if (onNext) {
      onNext();
    } else {
      goToScene("final-letter");
    }
  }, [audio, onNext, goToScene]);

  // GSAP animation lifecycle
  useGSAP(
    () => {
      if (!isActive) return;

      // 1. Headline dramatic typographic expansion
      dramaticReveal(".gift-headline-text", {
        duration: 1.4,
        trackingStart: "0.18em",
        trackingEnd: "0.02em",
      });

      // 2. Center stage entrance
      reveal(".gift-stage-center", {
        direction: "up",
        distance: 30,
        duration: 1.1,
        ease: "power2.out",
      });

      // 3. Starlight flares twinkling pulse
      floatingMovement(".gift-starlight-flare", {
        yDistance: 4,
        xDistance: 2,
        duration: 2.5,
      });

      // 4. Subtle breathing glow on initial advance CTA
      breathingAnimation(".gift-initial-cta", {
        scaleTo: 1.05,
        opacityFrom: 0.85,
        opacityTo: 1.0,
        duration: 2.8,
      });
    },
    [isActive],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      id="scene-gift"
      data-scene="gift"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden px-4 py-8 md:py-12 select-none",
        "bg-[radial-gradient(ellipse_at_center,_#4a0b16_0%,_#28030b_50%,_#0d0103_100%)]",
        className
      )}
    >
      {/* ── 1. Ornate Border & Cinematic Atmosphere ──────────── */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />
      <OrnateFiligreeFrame />

      {/* Center Warm Romantic Spotlight Focus */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[950px] h-[550px] rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.2)_0%,_rgba(201,144,74,0.06)_50%,_transparent_75%)] blur-3xl z-0"
      />

      {/* Floating Sparkles */}
      <FloatingDecoration preset="sparkle" depth={2} className="top-24 left-16 w-3 h-3">
        <StarlightFlare className="text-xl" />
      </FloatingDecoration>
      <FloatingDecoration preset="sparkle" depth={2} className="top-32 right-20 w-3 h-3">
        <StarlightFlare className="text-xl" />
      </FloatingDecoration>
      <FloatingDecoration preset="float" depth={3} className="bottom-28 left-20 w-2.5 h-2.5">
        <StarlightFlare className="text-lg text-rose/70" />
      </FloatingDecoration>
      <FloatingDecoration preset="drift" depth={3} className="bottom-32 right-24 w-2.5 h-2.5">
        <StarlightFlare className="text-lg text-gold/70" />
      </FloatingDecoration>

      {/* ── 2. Top Header & Navigation Bar ───────────────────── */}
      <header className="relative z-30 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 mt-2 pb-2">
        <div className="flex-1" />

        {/* Dramatic Script Headline: "Press the Envelope" */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
          <StarlightFlare className="text-xl sm:text-2xl" />
          <h1 className="gift-headline-text font-handwriting text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fdf8f0] font-normal italic tracking-wide drop-shadow-[0_2px_14px_rgba(246,201,78,0.45)]">
            {GIFT_CONTENT.visual.headlineText}
          </h1>
          <StarlightFlare className="text-xl sm:text-2xl" />
        </div>

        {/* Top Right "BACK ◂" Button */}
        <div className="flex-1 flex justify-end">
          <button
            type="button"
            aria-label="Back to selection hub"
            onClick={handleBack}
            className="shrink-0 inline-flex items-center justify-center font-serif text-xs sm:text-sm font-bold tracking-widest uppercase px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#380e18] hover:bg-[#520f1c] text-gold shadow-[0_2px_10px_rgba(0,0,0,0.5)] border-2 border-gold/70 transition-all duration-300 active:scale-95 cursor-pointer ring-1 ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0509]"
          >
            {GIFT_CONTENT.visual.backButtonLabel}
          </button>
        </div>
      </header>

      {/* ── 3. Main Center Stage: Envelope & Reveal Bloom ─────── */}
      <main className="gift-stage-center relative z-20 w-full max-w-3xl mx-auto my-auto flex flex-col items-center justify-center min-h-[280px] sm:min-h-[380px] md:min-h-[440px]">
        {/* Luminous Bloom Particle Effect on Unsealing */}
        <RevealEffect isActive={isOpening} />

        {/* Sealed Royal Envelope resting on Petal Wreath Bed */}
        {!isOpened ? (
          <GiftBox
            isOpening={isOpening}
            isOpened={isOpened}
            onOpen={handleOpenGift}
            className="my-auto"
          />
        ) : (
          /* Revealed Romantic Keepsake Card */
          <GiftContentPanel
            isOpen={isOpened}
            onAdvance={handleAdvance}
          />
        )}
      </main>

      {/* ── 4. Bottom Footer: "tap to lanjut" CTA ─────────────── */}
      <footer className="relative z-30 w-full max-w-md mx-auto flex flex-col items-center text-center pb-2 md:pb-4">
        {!isOpened ? (
          <button
            type="button"
            aria-label="Unseal the anniversary gift envelope"
            onClick={handleOpenGift}
            className="gift-initial-cta group relative inline-flex items-center gap-3 cursor-pointer transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0509] rounded-sm p-1"
          >
            <StarlightFlare className="text-sm sm:text-base" />
            <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-gold/90 font-normal tracking-wide transition-colors duration-300 group-hover:text-gold drop-shadow-md">
              {GIFT_CONTENT.visual.initialCtaText}
            </span>
            <StarlightFlare className="text-sm sm:text-base" />
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3 text-gold/60 text-xs sm:text-sm font-serif select-none">
            <span>❦</span>
            <span className="tracking-widest uppercase text-[0.65rem]">
              Keepsake Unlocked
            </span>
            <span>❦</span>
          </div>
        )}
      </footer>
    </section>
  );
}
