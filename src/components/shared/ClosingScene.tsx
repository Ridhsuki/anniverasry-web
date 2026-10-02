// ─────────────────────────────────────────────────────────────
// ClosingScene
// Celebratory completion actions and emotional ending state.
// ─────────────────────────────────────────────────────────────

"use client";

import { VintageButton } from "@/components/ui";
import { cn } from "@/utils";

export interface ClosingSceneProps {
  onReplay: () => void;
  replayLabel: string;
  className?: string;
}

export function ClosingScene({
  onReplay,
  replayLabel,
  className,
}: ClosingSceneProps) {
  return (
    <footer
      className={cn(
        "closing-scene-footer relative z-20 w-full max-w-md mx-auto flex flex-col items-center text-center mt-8 pb-6 gap-4 select-none",
        className
      )}
    >
      {/* Commemorative Date Badge */}
      <div className="flex items-center justify-center gap-3 text-gold/70 text-xs select-none">
        <span>❦</span>
        <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <span className="font-serif tracking-[0.25em] uppercase text-xs sm:text-sm font-semibold text-[#fdf8f0]">
          26-09-26
        </span>
        <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <span>❦</span>
      </div>

      {/* Heartfelt Closing Note */}
      <p className="font-handwriting text-base sm:text-lg text-gold/80 italic max-w-sm">
        Terima kasih telah menjadi bagian terindah dari setiap detik perjalanan ini.
      </p>

      {/* Replay Journey Action Button */}
      <div className="mt-2">
        <VintageButton
          variant="gold"
          size="lg"
          aria-label="Replay the anniversary experience from the beginning"
          onClick={onReplay}
          className="px-8 py-3.5 text-xs sm:text-sm tracking-[0.25em] font-serif shadow-[0_4px_20px_rgba(246,201,78,0.35)] hover:shadow-[0_0_30px_rgba(246,201,78,0.55)] transition-all active:scale-95"
        >
          {replayLabel}
        </VintageButton>
      </div>
    </footer>
  );
}
