// ─────────────────────────────────────────────────────────────
// GiftScene
// Scene 6: Interactive gift unboxing / keepsake reveal.
// Structural foundation only — no finalized design content.
// ─────────────────────────────────────────────────────────────

"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function GiftScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-gift"
      data-scene="gift"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 text-center select-none",
        className
      )}
    >
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl w-full flex flex-col items-center gap-10">
        <header className="scene-header flex flex-col items-center gap-3" />
        <div className="scene-stage relative w-full flex items-center justify-center min-h-[340px]">
          {children}
        </div>
        <footer className="scene-actions flex items-center justify-between w-full max-w-md" />
      </div>
    </section>
  );
}
