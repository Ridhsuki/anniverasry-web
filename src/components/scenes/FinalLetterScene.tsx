// ─────────────────────────────────────────────────────────────
// FinalLetterScene
// Scene 7: Emotional handwritten love letter & keepsake finale.
// Visual benchmark: docs/references/image-map.md
// ─────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef } from "react";

import {
  breathingAnimation,
  dramaticReveal,
  floatingMovement,
  paperReveal,
  reveal,
} from "@/animations";
import {
  ClosingScene,
  LetterPaper,
  SignatureBlock,
} from "@/components/shared";
import { FloatingDecoration } from "@/components/ui";
import { useExperience } from "@/context/ExperienceContext";
import { FINAL_LETTER_CONTENT } from "@/data/finalLetter";
import { useAudio } from "@/hooks/useAudio";
import { useGSAP } from "@/hooks/useGSAP";
import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

/** Falling Red Rose Petal SVG */
function FallingRosePetal({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("select-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]", className)}>
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path
          d="M16 2 C8 8, 2 18, 6 26 C10 32, 22 32, 26 24 C30 16, 24 6, 16 2 Z"
          fill="#9f1239"
          opacity="0.85"
        />
        <path
          d="M16 4 C10 10, 6 18, 9 24 C12 28, 20 28, 23 22"
          stroke="#be123c"
          strokeWidth="0.75"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export function FinalLetterScene(props: SceneProps) {
  const { isActive = false, className, onPrevious } = props;
  const audio = useAudio();
  const { goToScene } = useExperience();

  const containerRef = useRef<HTMLElement>(null);

  // Return to Gift Scene
  const handleBack = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onPrevious) {
      onPrevious();
    } else {
      goToScene("gift");
    }
  }, [audio, onPrevious, goToScene]);

  // Replay Journey from Beginning
  const handleReplay = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    goToScene("intro");
  }, [audio, goToScene]);

  // GSAP animation lifecycle
  useGSAP(
    (gsapInstance) => {
      if (!isActive) return;

      const isMobile =
        typeof window !== "undefined" &&
        (window.matchMedia("(max-width: 768px)").matches ||
          window.matchMedia("(pointer: coarse)").matches);

      if (isMobile) {
        // High-performance 2D mobile entrance: single-pass fade & gentle rise without 3D unfold or staggered paragraph lag
        gsapInstance.fromTo(
          ".final-letter-title",
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        gsapInstance.fromTo(
          ".letter-paper-sheet",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.1 }
        );

        // Keep all paragraphs visible immediately on paper without stuttering staggered pop-in
        gsapInstance.set(".letter-paragraph", { opacity: 1, y: 0 });

        gsapInstance.fromTo(
          [".signature-block", ".closing-scene-footer"],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", delay: 0.25 }
        );

        // Lightweight drift for mobile petals
        floatingMovement(".final-falling-petal", {
          yDistance: 12,
          xDistance: 4,
          duration: 7.0,
        });
      } else {
        // 1. Headline dramatic typographic expansion
        dramaticReveal(".final-letter-title", {
          duration: 1.4,
          trackingStart: "0.18em",
          trackingEnd: "0.02em",
        });

        // 2. Unfold parchment paper sheet with physical tilt settling
        paperReveal(".letter-paper-sheet", {
          duration: 1.4,
          direction: "unfold",
          delay: 0.15,
        });

        // 3. Staggered paragraphs fade-in
        reveal(".letter-paragraph", {
          direction: "up",
          distance: 20,
          stagger: 0.12,
          duration: 1.0,
          delay: 0.4,
          ease: "power2.out",
        });

        // 4. Reveal signature block & closing section
        reveal(".signature-block", {
          direction: "up",
          distance: 25,
          duration: 1.1,
          delay: 0.8,
          ease: "power2.out",
        });

        reveal(".closing-scene-footer", {
          direction: "up",
          distance: 20,
          duration: 1.0,
          delay: 1.0,
          ease: "power2.out",
        });

        // 5. Ambient falling rose petals drifting slowly downward
        floatingMovement(".final-falling-petal", {
          yDistance: 24,
          xDistance: 8,
          duration: 6.5,
        });

        // 6. Breathing glow on center warm spotlight
        breathingAnimation(".final-ambient-glow", {
          opacityFrom: 0.7,
          opacityTo: 1.0,
          duration: 3.5,
        });
      }
    },
    [isActive],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      id="scene-final-letter"
      data-scene="final"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden px-4 sm:px-6 md:px-8 py-8 md:py-14 pb-[max(2.5rem,env(safe-area-inset-bottom))] select-none",
        "bg-scene-stage",
        className
      )}
    >
      {/* ── 1. Atmosphere & Drifting Rose Petals ─────────────── */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      {/* Floating Rose Petals Across Viewport */}
      <FloatingDecoration preset="drift" depth={2} className="final-falling-petal top-16 left-8 sm:left-16 w-8 h-8">
        <FallingRosePetal className="transform -rotate-45" />
      </FloatingDecoration>
      <FloatingDecoration preset="drift-reverse" depth={3} className="final-falling-petal top-28 right-12 sm:right-24 w-10 h-10">
        <FallingRosePetal className="transform rotate-30" />
      </FloatingDecoration>
      <FloatingDecoration preset="sway" depth={2} className="hidden sm:block final-falling-petal bottom-36 left-12 sm:left-28 w-9 h-9">
        <FallingRosePetal className="transform rotate-12" />
      </FloatingDecoration>
      <FloatingDecoration preset="float" depth={3} className="final-falling-petal bottom-20 right-16 sm:right-32 w-11 h-11">
        <FallingRosePetal className="transform -rotate-25" />
      </FloatingDecoration>

      {/* Warm Golden Candlelight Spotlight Behind Letter */}
      <div
        aria-hidden="true"
        className="final-ambient-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[600px] rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.2)_0%,_rgba(201,144,74,0.06)_50%,_transparent_75%)] blur-3xl z-0"
      />

      {/* ── 2. Top Header & Navigation Bar ───────────────────── */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between gap-4 pb-4 border-b border-[#c9904a]/25">
        <div className="flex flex-col text-left">
          <h1 className="final-letter-title font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#fdf8f0] font-normal leading-tight tracking-wide drop-shadow-[0_2px_12px_rgba(246,201,78,0.35)]">
            {FINAL_LETTER_CONTENT.title}
          </h1>
          <p className="font-serif text-[0.65rem] sm:text-xs md:text-sm tracking-[0.2em] text-gold/80 uppercase mt-0.5">
            {FINAL_LETTER_CONTENT.subtitle}
          </p>
        </div>

        {/* Top Right Minimalist Cinematic Gold "BACK ◂" Button */}
        <button
          type="button"
          aria-label="Back to gift keepsake"
          onClick={handleBack}
          className="group relative shrink-0 inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-3 sm:px-4 py-2 font-serif text-xs sm:text-sm font-semibold tracking-[0.2em] md:tracking-[0.25em] uppercase text-gold hover:text-[#fff9eb] transition-all duration-300 active:scale-95 cursor-pointer bg-transparent border-0 shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 focus-visible:rounded-xs"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {FINAL_LETTER_CONTENT.backButtonLabel}
          </span>
        </button>
      </header>

      {/* ── 3. Main Center Stage: Full Unfolded Love Letter ───── */}
      <main className="relative z-10 w-full max-w-3xl mx-auto my-6 md:my-10 px-2 sm:px-4">
        <LetterPaper
          greeting={FINAL_LETTER_CONTENT.greeting}
          paragraphs={FINAL_LETTER_CONTENT.paragraphs}
          photo={FINAL_LETTER_CONTENT.photo}
        >
          {/* Signature & Wax Seal Paperweight */}
          <SignatureBlock
            signature={FINAL_LETTER_CONTENT.signature}
            closingVow={FINAL_LETTER_CONTENT.closingVow}
          />
        </LetterPaper>
      </main>

      {/* ── 4. Celebratory Ending Actions & Replay ────────────── */}
      <ClosingScene
        onReplay={handleReplay}
        replayLabel={FINAL_LETTER_CONTENT.replayButtonLabel}
      />
    </section>
  );
}
