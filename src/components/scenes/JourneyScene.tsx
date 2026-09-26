// ─────────────────────────────────────────────────────────────
// JourneyScene
// Scene 3: Chronological storytelling timeline and memory path.
// Structural foundation only — no finalized design content.
// ─────────────────────────────────────────────────────────────

"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function JourneyScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-journey"
      data-scene="journey"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden py-16 px-6",
        className
      )}
    >
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl w-full flex flex-col items-center gap-12">
        <header className="scene-header text-center flex flex-col items-center gap-3" />
        <div className="scene-stage relative w-full flex flex-col gap-12 min-h-[400px]">
          {children}
        </div>
        <footer className="scene-actions flex items-center justify-between w-full max-w-xl" />
      </div>
    </section>
  );
}
