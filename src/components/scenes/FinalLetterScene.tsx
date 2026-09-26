// ─────────────────────────────────────────────────────────────
// FinalLetterScene
// Scene 7: Emotional handwritten love letter & keepsake finale.
// Structural foundation only — no finalized design content.
// ─────────────────────────────────────────────────────────────

"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function FinalLetterScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-final-letter"
      data-scene="final"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-16 px-6",
        className
      )}
    >
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl w-full flex flex-col items-center gap-10">
        <header className="scene-header text-center flex flex-col items-center gap-3" />
        <div className="scene-stage relative w-full flex items-center justify-center min-h-[460px]">
          {children}
        </div>
        <footer className="scene-actions flex items-center justify-center gap-6" />
      </div>
    </section>
  );
}
