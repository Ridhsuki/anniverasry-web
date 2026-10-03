// ─────────────────────────────────────────────────────────────
// GiftBox (Royal Envelope & Keepsake Bed)
// Physical gift object component based on gift-scene.png:
// - Luminous cream horizontal royal envelope
// - Dimensional burgundy wax seal with "N&K" monogram
// - Delicate red rosebuds resting on corner
// - Circular wreath bed of red & pink rose petals, pearls, and dew drops
// ─────────────────────────────────────────────────────────────

"use client";

import { cn } from "@/utils";

export interface GiftBoxProps {
  isOpened: boolean;
  isOpening: boolean;
  onOpen: () => void;
  className?: string;
}

export function GiftBox({
  isOpened,
  isOpening,
  onOpen,
  className,
}: GiftBoxProps) {
  return (
    <div
      className={cn(
        "gift-box-container relative flex items-center justify-center select-none",
        className
      )}
    >
      {/* ── 1. Circular Wreath Bed of Rose Petals & Pearls ─────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 sm:-inset-16 md:-inset-20 rounded-full flex items-center justify-center select-none"
      >
        {/* Soft Radial Ambient Rose Halo */}
        <div className="w-[320px] sm:w-[420px] md:w-[480px] h-[220px] sm:h-[300px] md:h-[340px] rounded-full bg-[radial-gradient(ellipse,_rgba(190,24,93,0.35)_0%,_rgba(136,19,55,0.2)_50%,_transparent_75%)] blur-2xl" />

        {/* Dense Wreath Bed SVG (Rose Petals, Dew Drops, Water Droplets, Pearls) */}
        <svg
          viewBox="0 0 400 280"
          fill="none"
          className="absolute inset-0 w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
        >
          {/* Outer Layer: Deep Crimson Rose Petals */}
          <ellipse cx="70" cy="90" rx="24" ry="16" fill="#881337" transform="rotate(-35 70 90)" opacity="0.9" />
          <ellipse cx="110" cy="50" rx="26" ry="18" fill="#9f1239" transform="rotate(-15 110 50)" opacity="0.9" />
          <ellipse cx="170" cy="38" rx="28" ry="19" fill="#be123c" transform="rotate(5 170 38)" opacity="0.95" />
          <ellipse cx="230" cy="42" rx="26" ry="18" fill="#9f1239" transform="rotate(20 230 42)" opacity="0.9" />
          <ellipse cx="290" cy="60" rx="26" ry="17" fill="#881337" transform="rotate(35 290 60)" opacity="0.9" />
          <ellipse cx="335" cy="105" rx="24" ry="16" fill="#9f1239" transform="rotate(55 335 105)" opacity="0.9" />
          <ellipse cx="345" cy="165" rx="25" ry="17" fill="#881337" transform="rotate(80 345 165)" opacity="0.9" />
          <ellipse cx="320" cy="220" rx="26" ry="18" fill="#9f1239" transform="rotate(115 320 220)" opacity="0.9" />
          <ellipse cx="260" cy="250" rx="28" ry="19" fill="#be123c" transform="rotate(160 260 250)" opacity="0.95" />
          <ellipse cx="195" cy="258" rx="27" ry="18" fill="#9f1239" transform="rotate(185 195 258)" opacity="0.9" />
          <ellipse cx="130" cy="245" rx="26" ry="17" fill="#881337" transform="rotate(-150 130 245)" opacity="0.9" />
          <ellipse cx="75" cy="210" rx="24" ry="16" fill="#9f1239" transform="rotate(-120 75 210)" opacity="0.9" />
          <ellipse cx="55" cy="150" rx="24" ry="16" fill="#881337" transform="rotate(-85 55 150)" opacity="0.9" />

          {/* Inner Layer: Soft Pink Petals */}
          <ellipse cx="100" cy="80" rx="20" ry="13" fill="#f43f5e" transform="rotate(-25 100 80)" opacity="0.85" />
          <ellipse cx="150" cy="60" rx="22" ry="14" fill="#fb7185" transform="rotate(10 150 60)" opacity="0.85" />
          <ellipse cx="210" cy="62" rx="21" ry="13" fill="#f43f5e" transform="rotate(25 210 62)" opacity="0.85" />
          <ellipse cx="270" cy="85" rx="20" ry="13" fill="#fb7185" transform="rotate(45 270 85)" opacity="0.85" />
          <ellipse cx="305" cy="140" rx="20" ry="13" fill="#f43f5e" transform="rotate(70 305 140)" opacity="0.85" />
          <ellipse cx="280" cy="205" rx="22" ry="14" fill="#fb7185" transform="rotate(140 280 205)" opacity="0.85" />
          <ellipse cx="220" cy="225" rx="21" ry="13" fill="#f43f5e" transform="rotate(175 220 225)" opacity="0.85" />
          <ellipse cx="160" cy="225" rx="22" ry="14" fill="#fb7185" transform="rotate(-165 160 225)" opacity="0.85" />
          <ellipse cx="105" cy="190" rx="20" ry="13" fill="#f43f5e" transform="rotate(-130 105 190)" opacity="0.85" />

          {/* Glistening Genuine Pearls */}
          <circle cx="85" cy="65" r="4.5" fill="#fef9f2" stroke="#e7e5e4" strokeWidth="0.5" />
          <circle cx="83" cy="63" r="1.5" fill="#ffffff" />
          <circle cx="280" cy="50" r="5" fill="#fef9f2" stroke="#e7e5e4" strokeWidth="0.5" />
          <circle cx="278" cy="48" r="1.5" fill="#ffffff" />
          <circle cx="340" cy="180" r="4" fill="#fef9f2" stroke="#e7e5e4" strokeWidth="0.5" />
          <circle cx="338" cy="178" r="1.2" fill="#ffffff" />
          <circle cx="240" cy="245" r="4.5" fill="#fef9f2" stroke="#e7e5e4" strokeWidth="0.5" />
          <circle cx="238" cy="243" r="1.5" fill="#ffffff" />
          <circle cx="65" cy="180" r="5" fill="#fef9f2" stroke="#e7e5e4" strokeWidth="0.5" />
          <circle cx="63" cy="178" r="1.5" fill="#ffffff" />

          {/* Glistening Morning Dew Droplets */}
          <ellipse cx="140" cy="52" rx="2.5" ry="1.8" fill="#ffffff" opacity="0.75" />
          <ellipse cx="250" cy="70" rx="3" ry="2" fill="#ffffff" opacity="0.7" />
          <ellipse cx="180" cy="240" rx="2.5" ry="1.8" fill="#ffffff" opacity="0.75" />
          <ellipse cx="90" cy="130" rx="2" ry="1.5" fill="#ffffff" opacity="0.65" />
        </svg>
      </div>

      {/* ── 2. Sealed Royal Ivory Envelope ────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Open sealed royal anniversary envelope"
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        className={cn(
          "gift-envelope-btn group relative w-72 sm:w-84 md:w-96 aspect-[16/10] rounded-sm cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
          "bg-gradient-to-b from-[#fdfbf7] via-[#f7f0e4] to-[#ede2cf] border border-[#d9a85f]/40",
          "shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_35px_rgba(254,230,138,0.35)]",
          "transition-all duration-500 ease-out",
          "hover:scale-[1.04] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_45px_rgba(254,230,138,0.5)]",
          isOpening && "scale-[1.05] brightness-125 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_55px_rgba(254,230,138,0.65)]",
          isOpened && "opacity-20 pointer-events-none scale-95"
        )}
      >
        {/* Subtle Envelope Paper Fiber Grain */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c9904a_0.75px,transparent_0.75px)] [background-size:10px_10px]" />

        {/* Crease Seeping Light Glow on Opening */}
        {isOpening && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(254,240,138,0.75)_0%,_rgba(246,201,78,0.35)_45%,_transparent_70%)] blur-md animate-pulse" />
          </div>
        )}

        {/* Envelope Flap Fold Lines */}
        <svg viewBox="0 0 380 240" fill="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* Top Flap Triangular Fold */}
          <path
            d="M0 0 L190 125 L380 0"
            stroke={isOpening ? "#fde68a" : "#c9904a"}
            strokeWidth={isOpening ? 2 : 1}
            strokeOpacity={isOpening ? 0.95 : 0.4}
            className="transition-all duration-300"
            fill="none"
          />
          {/* Bottom Flap Side Lines */}
          <path
            d="M0 240 L150 105 M380 240 L230 105"
            stroke={isOpening ? "#fde68a" : "#c9904a"}
            strokeWidth={isOpening ? 1.5 : 0.75}
            strokeOpacity={isOpening ? 0.8 : 0.25}
            className="transition-all duration-300"
            fill="none"
          />
        </svg>

        {/* ── Two Red Rosebuds Resting on Top-Right Corner ────── */}
        <div
          aria-hidden="true"
          className="absolute -top-3.5 -right-3.5 z-20 w-12 sm:w-14 h-12 sm:h-14 select-none pointer-events-none drop-shadow-md"
        >
          <svg viewBox="0 0 50 50" fill="none" className="w-full h-full">
            {/* Green Stem & Leaves */}
            <path d="M12 38 Q 24 28, 38 14" stroke="#365314" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 28 C16 22, 18 16, 26 22 Z" fill="#4d7c0f" />
            <path d="M30 20 C36 14, 38 22, 32 24 Z" fill="#4d7c0f" />
            {/* Rosebud 1 (Upper Right) */}
            <ellipse cx="38" cy="14" rx="8" ry="6" fill="#be123c" transform="rotate(-30 38 14)" />
            <circle cx="36" cy="12" r="5" fill="#9f1239" />
            <path d="M34 10 C36 8, 40 10, 38 14 Z" fill="#e11d48" />
            {/* Rosebud 2 (Slightly Lower) */}
            <ellipse cx="28" cy="24" rx="7" ry="5" fill="#be123c" transform="rotate(-15 28 24)" />
            <circle cx="27" cy="22" r="4.5" fill="#9f1239" />
          </svg>
        </div>

        {/* ── Dimensional Burgundy Monogram Wax Seal ──────────── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
          {isOpening && (
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,_rgba(254,240,138,0.9)_0%,_rgba(246,201,78,0.5)_50%,_transparent_75%)] blur-md animate-ping pointer-events-none"
            />
          )}
          <div
            className={cn(
              "relative w-16 sm:w-18 md:w-20 aspect-square rounded-full flex items-center justify-center transition-transform duration-300",
              "bg-gradient-to-br from-[#c23b3b] via-[#991b1b] to-[#7f1d1d]",
              "border-2 border-[#fca5a5]/40 shadow-[0_6px_20px_rgba(0,0,0,0.7),0_0_24px_rgba(185,28,28,0.5)]",
              "group-hover:scale-110 active:scale-95",
              isOpening && "scale-125 brightness-150 rotate-12 shadow-[0_0_35px_rgba(254,240,138,0.9)]"
            )}
          >
            {/* Embossed Ring */}
            <div className="absolute inset-1.5 rounded-full border border-[#fca5a5]/30 pointer-events-none" />

            {/* Embossed Double Heart & "N&K" Monogram */}
            <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="font-serif text-[0.65rem] sm:text-xs text-[#fde68a] leading-none">
                ♥
              </span>
              <span className="font-serif text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#fff9eb] drop-shadow-sm">
                N&amp;K
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Click Hint */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] uppercase text-[#783e15] font-semibold">
            Sentuh Segel
          </span>
        </div>
      </div>
    </div>
  );
}
