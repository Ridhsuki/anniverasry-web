// ─────────────────────────────────────────────────────────────
// SignatureBlock
// Handwritten signature and keepsake paperweight for the final love letter.
// Includes author signoff, commemorative vow, and burgundy wax seal keepsake.
// ─────────────────────────────────────────────────────────────

"use client";

import type { LetterSignature } from "@/data/finalLetter";
import { cn } from "@/utils";

/** Dimensional Burgundy Wax Seal Paperweight */
function WaxSealPaperweight({ monogram }: { monogram: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative w-14 sm:w-16 md:w-18 aspect-square rounded-full flex items-center justify-center select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transform rotate-6 hover:rotate-0 transition-transform"
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#c23b3b] via-[#991b1b] to-[#7f1d1d] border-2 border-[#fca5a5]/40 flex items-center justify-center shadow-inner">
        {/* Inner Ring */}
        <div className="absolute inset-1.5 rounded-full border border-[#fca5a5]/30 pointer-events-none" />
        {/* Embossed Monogram */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="font-serif text-[0.6rem] text-[#fde68a] leading-none">♥</span>
          <span className="font-serif text-xs sm:text-sm font-bold tracking-widest text-[#fff9eb] drop-shadow-xs">
            {monogram}
          </span>
        </div>
      </div>
    </div>
  );
}

export interface SignatureBlockProps {
  signature: LetterSignature;
  closingVow: string;
  className?: string;
}

export function SignatureBlock({
  signature,
  closingVow,
  className,
}: SignatureBlockProps) {
  return (
    <div
      className={cn(
        "signature-block relative w-full pt-6 border-t border-[#c9904a]/30 flex flex-col sm:flex-row items-center justify-between gap-6 select-none",
        className
      )}
    >
      {/* Left: Commemorative Vow Banner */}
      <div className="flex flex-col text-left max-w-xs">
        <p className="font-handwriting text-base sm:text-lg text-rose/90 italic leading-snug">
          &ldquo;{closingVow}&rdquo;
        </p>
        <div className="flex items-center gap-2 mt-2 text-gold/60 text-xs">
          <span>❦</span>
          <span className="h-[1px] w-12 bg-gold/40" />
          <span className="font-serif text-[0.65rem] tracking-widest uppercase">
            {signature.date}
          </span>
        </div>
      </div>

      {/* Right: Handwritten Sign-off & Wax Seal Paperweight */}
      <div className="flex items-center gap-4 text-right">
        <div className="flex flex-col items-end">
          <span className="font-handwriting text-sm sm:text-base text-[#6b3512] italic">
            {signature.closing}
          </span>
          <span className="font-handwriting text-2xl sm:text-3xl text-[#3b180d] font-normal leading-tight mt-0.5">
            {signature.authorName} &amp; {signature.partnerName}
          </span>
          <span className="font-serif text-[0.65rem] text-[#8c4918] tracking-widest uppercase font-semibold mt-0.5">
            Forever &amp; Always
          </span>
        </div>

        {/* Physical Wax Seal Paperweight Anchor */}
        <WaxSealPaperweight monogram={signature.monogram} />
      </div>
    </div>
  );
}
