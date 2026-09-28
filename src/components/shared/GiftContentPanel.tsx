// ─────────────────────────────────────────────────────────────
// GiftContentPanel
// The revealed keepsake parchment card displaying the personal
// anniversary dedication and final letter advance action.
// ─────────────────────────────────────────────────────────────

"use client";

import Image from "next/image";

import { PaperCard, PhotoFrame, VintageButton } from "@/components/ui";
import { GIFT_CONTENT } from "@/data/gift";
import { cn } from "@/utils";

export interface GiftContentPanelProps {
  isOpen: boolean;
  onAdvance: () => void;
  className?: string;
}

export function GiftContentPanel({
  isOpen,
  onAdvance,
  className,
}: GiftContentPanelProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "gift-content-panel relative z-30 w-full max-w-lg mx-auto animate-fade-in select-none",
        className
      )}
    >
      <PaperCard
        variant="deckle"
        shadow="xl"
        hasTexture={true}
        padding="md"
        className="w-full bg-gradient-to-b from-[#fdfbf7] via-[#f9edd8] to-[#f2dbb4] border-[#c9904a]/50 text-[#2d1f10] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(246,201,78,0.3)]"
      >
        {/* Header Ribbon & Monogram Tag */}
        <div className="flex items-center justify-between border-b border-[#c9904a]/30 pb-2.5 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-rose text-base leading-none">♥</span>
            <span className="font-serif text-xs tracking-widest text-[#783e15] uppercase font-semibold">
              {GIFT_CONTENT.metadata.occasion}
            </span>
          </div>
          <span className="font-serif text-xs text-[#5c3016] tracking-wider uppercase font-semibold">
            {GIFT_CONTENT.metadata.date}
          </span>
        </div>

        {/* Title & Subheading */}
        <h3 className="font-serif text-xl sm:text-2xl text-[#2a1708] font-bold leading-tight">
          {GIFT_CONTENT.revealMessage.heading}
        </h3>
        <p className="font-handwriting text-base sm:text-lg text-rose/90 mt-1 mb-3.5">
          {GIFT_CONTENT.revealMessage.subheading}
        </p>

        {/* Keepsake Photo */}
        {GIFT_CONTENT.metadata.photoSrc && (
          <div className="my-3 flex justify-center">
            <div className="w-32 sm:w-40 drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
              <PhotoFrame
                variant="polaroid"
                rotation={-1.5}
                aspectRatio="square"
                tapeStyle="top-center"
                caption={GIFT_CONTENT.metadata.keepsakeTitle}
                className="w-full"
              >
                <div className="relative w-full h-full min-h-[110px] sm:min-h-[120px] bg-gradient-to-br from-[#24140b] to-[#0a0503] overflow-hidden">
                  <Image
                    src={GIFT_CONTENT.metadata.photoSrc}
                    alt={GIFT_CONTENT.metadata.keepsakeTitle}
                    fill
                    sizes="160px"
                    loading="lazy"
                    quality={85}
                    className="relative z-10 w-full h-full object-cover"
                  />
                </div>
              </PhotoFrame>
            </div>
          </div>
        )}

        {/* Body Dedication */}
        <p className="font-serif text-xs sm:text-sm text-[#3b1f10] leading-relaxed text-justify opacity-95">
          {GIFT_CONTENT.revealMessage.body}
        </p>

        {/* Closing & Signature */}
        <div className="mt-5 pt-3 border-t border-[#c9904a]/25 flex flex-col items-end text-right">
          <span className="font-handwriting text-sm sm:text-base text-[#6b3512] italic">
            {GIFT_CONTENT.revealMessage.closing}
          </span>
          <span className="font-serif text-xs text-[#4a240f] tracking-wider uppercase font-bold mt-0.5">
            {GIFT_CONTENT.revealMessage.signature}
          </span>
        </div>

        {/* Forward Advance CTA Button */}
        <div className="mt-6 flex flex-col items-center">
          <VintageButton
            variant="gold"
            size="md"
            onClick={onAdvance}
            className="w-full sm:w-auto px-8 py-3 text-xs sm:text-sm tracking-[0.2em] font-serif shadow-lg hover:shadow-[0_0_24px_rgba(246,201,78,0.5)] transition-all"
          >
            {GIFT_CONTENT.visual.revealedCtaText}
          </VintageButton>
        </div>
      </PaperCard>
    </div>
  );
}
