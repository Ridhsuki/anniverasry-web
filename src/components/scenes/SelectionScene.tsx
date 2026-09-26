// ─────────────────────────────────────────────────────────────
// SelectionScene
// Scene 2: Interactive chapter or memory selector.
// Structural foundation only — no finalized design content.
// ─────────────────────────────────────────────────────────────

"use client";

import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

export function SelectionScene(props: SceneProps) {
  const { isActive = false, className, children } = props;

  return (
    <section
      id="scene-selection"
      data-scene="selection"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 select-none",
        className
      )}
    >
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl w-full flex flex-col items-center gap-10">
        <header className="scene-header text-center flex flex-col items-center gap-2" />
        <div className="scene-stage relative w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center min-h-[360px]">
          {children}
        </div>
        <footer className="scene-actions flex items-center justify-between w-full max-w-2xl px-4" />
      </div>
    </section>
  );
}
