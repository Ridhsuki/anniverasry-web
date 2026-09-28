// ─────────────────────────────────────────────────────────────
// PlaylistScene
// Scene 5: Vintage music room with playable vinyl record player,
// candlelit love letter bordered with rose petals, and photographic altar.
// Visual benchmark: docs/references/screenshots/playlist-scene.png
// ─────────────────────────────────────────────────────────────

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  breathingAnimation,
  dramaticReveal,
  floatingMovement,
  reveal,
} from "@/animations";
import { AudioControls, TrackItem, VinylPlayer } from "@/components/shared";
import {
  BlossomIcon,
  FloatingDecoration,
  PaperCard,
  PhotoFrame,
  RoseIcon,
  RosePetalIcon,
} from "@/components/ui";
import { useExperience } from "@/context/ExperienceContext";
import { PLAYLIST_CONTENT, type PlaylistTrack } from "@/data/playlist";
import { useAudio } from "@/hooks/useAudio";
import { useGSAP } from "@/hooks/useGSAP";
import type { SceneProps } from "@/types/scenes";
import { cn } from "@/utils";

/** Glass-encased Burning White Pillar Candle with Flickering Flame */
function PillarCandle({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-12 sm:w-14 aspect-[1/2] select-none flex flex-col items-center justify-end drop-shadow-[0_4px_16px_rgba(250,204,21,0.45)]",
        className
      )}
    >
      {/* Flickering Candle Flame with Ambient Glow */}
      <div className="absolute top-1 sm:top-2 flex flex-col items-center z-20">
        {/* Outer Warm Flame Halo */}
        <div className="w-8 h-8 rounded-full bg-amber-400/30 blur-md animate-[pulse_2s_ease-in-out_infinite]" />
        {/* Animated Teardrop Flame */}
        <svg
          viewBox="0 0 20 30"
          fill="none"
          className="absolute -top-1 w-5 h-7 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-[pulse_1.5s_ease-in-out_infinite]"
        >
          {/* Flame Outer Yellow */}
          <path
            d="M10 2 C10 2, 17 12, 17 20 C17 25, 14 28, 10 28 C6 28, 3 25, 3 20 C3 12, 10 2, 10 2 Z"
            fill="url(#candleFlame)"
          />
          {/* Flame Inner White-Blue Core */}
          <path
            d="M10 12 C10 12, 14 18, 14 22 C14 25, 12 27, 10 27 C8 27, 6 25, 6 22 C6 18, 10 12, 10 12 Z"
            fill="#ffffff"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="candleFlame" x1="10" y1="2" x2="10" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>
        {/* Candle Wick */}
        <div className="w-0.5 h-2 bg-[#262626] rounded-t-xs -mt-1 z-10" />
      </div>

      {/* Glass Cylinder Votive Holder */}
      <div className="relative w-full h-[78%] rounded-xs p-1 bg-gradient-to-b from-white/10 via-white/5 to-white/15 border border-white/20 backdrop-blur-xs flex flex-col justify-end shadow-inner">
        {/* White Candle Wax Body */}
        <div className="w-full h-[85%] rounded-xs bg-gradient-to-b from-[#fdfbf7] via-[#f5f0e8] to-[#e8e0d5] border-t border-[#fdfbf7] shadow-sm flex flex-col items-center">
          {/* Wax Top Rim Indentation */}
          <div className="w-4/5 h-1.5 rounded-full bg-[#ebe3d7] opacity-80 mt-0.5" />
        </div>
        {/* Glass Specular Glare */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-xs" />
      </div>
    </div>
  );
}

/** Golden Butterfly with Shimmering Wings */
function GoldenButterfly({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("select-none drop-shadow-[0_2px_8px_rgba(246,201,78,0.7)]", className)}>
      <svg viewBox="0 0 40 32" fill="none" className="w-full h-full">
        {/* Left Wing */}
        <path
          d="M20 16 C16 6, 4 2, 2 8 C0 14, 8 24, 18 20 Z"
          fill="url(#goldWing)"
          stroke="#fde047"
          strokeWidth="0.75"
        />
        {/* Right Wing */}
        <path
          d="M20 16 C24 6, 36 2, 38 8 C40 14, 32 24, 22 20 Z"
          fill="url(#goldWing)"
          stroke="#fde047"
          strokeWidth="0.75"
        />
        {/* Body */}
        <ellipse cx="20" cy="16" rx="1.5" ry="6" fill="#78350f" />
        <defs>
          <linearGradient id="goldWing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Rose Petals Frame Border Pattern around Love Letter */
function RosePetalBorder() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-3.5 sm:-inset-4.5 rounded-lg border-2 border-dashed border-rose/30 flex items-center justify-center select-none z-20"
    >
      {/* Decorative Corner & Flank Rose Petals */}
      <div className="absolute -top-3.5 -left-3.5"><RoseIcon size={22} /></div>
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2"><RosePetalIcon size={16} /></div>
      <div className="absolute -top-3.5 -right-3.5"><RoseIcon size={22} /></div>
      <div className="absolute top-1/2 -left-2.5 -translate-y-1/2"><RosePetalIcon size={16} /></div>
      <div className="absolute top-1/2 -right-2.5 -translate-y-1/2"><RosePetalIcon size={16} /></div>
      <div className="absolute -bottom-3.5 -left-3.5"><RoseIcon size={22} /></div>
      <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2"><RosePetalIcon size={16} /></div>
      <div className="absolute -bottom-3.5 -right-3.5"><RoseIcon size={22} /></div>
    </div>
  );
}

export function PlaylistScene(props: SceneProps) {
  const { isActive = false, className, onNext, onPrevious } = props;
  const audio = useAudio();
  const { goToScene } = useExperience();

  // Active track state
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0.15); // Initial progress preview
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const activeTrack = PLAYLIST_CONTENT.tracks[activeTrackIndex] ?? PLAYLIST_CONTENT.tracks[0];

  // Simulated playback timer when active
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          // Loop to next track or rewind
          return 0;
        }
        return prev + 0.01;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        audio.playSfx("sfx-needle-drop");
      } else {
        audio.playSfx("sfx-card-flip");
      }
      return next;
    });
  }, [audio]);

  // Select Track
  const handleSelectTrack = useCallback(
    (track: PlaylistTrack) => {
      const idx = PLAYLIST_CONTENT.tracks.findIndex((t) => t.id === track.id);
      if (idx !== -1) {
        setActiveTrackIndex(idx);
        setIsPlaying(true);
        setProgress(0);
        audio.playSfx("sfx-needle-drop");
      }
    },
    [audio]
  );

  // Next Track
  const handleNextTrack = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    setActiveTrackIndex((prev) => (prev + 1) % PLAYLIST_CONTENT.tracks.length);
    setProgress(0);
  }, [audio]);

  // Prev Track
  const handlePrevTrack = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    setActiveTrackIndex((prev) =>
      prev === 0 ? PLAYLIST_CONTENT.tracks.length - 1 : prev - 1
    );
    setProgress(0);
  }, [audio]);

  // Volume & Mute handlers
  const handleVolumeChange = useCallback((newVol: number) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Return to Selection Hub
  const handleBack = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onPrevious) {
      onPrevious();
    } else {
      goToScene("selection");
    }
  }, [audio, onPrevious, goToScene]);

  // Advance to Gift Scene
  const handleAdvance = useCallback(() => {
    audio.playSfx("sfx-card-flip");
    if (onNext) {
      onNext();
    } else {
      goToScene("gift");
    }
  }, [audio, onNext, goToScene]);

  // GSAP animation lifecycle
  useGSAP(
    () => {
      if (!isActive) return;

      // 1. Headline dramatic typographic expansion
      dramaticReveal(".playlist-headline-text", {
        duration: 1.4,
        trackingStart: "0.18em",
        trackingEnd: "0.02em",
      });

      // 2. Parallax reveal on left love letter and right altar
      reveal(".playlist-left-card", {
        direction: "left",
        distance: 35,
        duration: 1.1,
        ease: "power2.out",
      });

      reveal(".playlist-right-altar", {
        direction: "right",
        distance: 35,
        duration: 1.1,
        ease: "power2.out",
      });

      // 3. Center Turntable Drop Settle
      reveal(".playlist-center-turntable", {
        direction: "up",
        distance: 30,
        duration: 1.0,
        ease: "power2.out",
      });

      // 4. Staggered reveal for track selection cards
      reveal(".track-item", {
        direction: "up",
        distance: 25,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });

      // 5. Floating movements for golden butterflies and ambient hearts
      floatingMovement(".playlist-golden-butterfly", {
        yDistance: 12,
        xDistance: 4,
        duration: 5.5,
      });

      // 6. Breathing animation on advance button
      breathingAnimation(".playlist-advance-btn", {
        scaleTo: 1.04,
        opacityFrom: 0.92,
        opacityTo: 1.0,
        duration: 3.0,
      });
    },
    [isActive],
    containerRef
  );

  return (
    <section
      ref={containerRef}
      id="scene-playlist"
      data-scene="playlist"
      aria-hidden={!isActive}
      className={cn(
        "relative min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden px-4 py-8 md:py-12 select-none",
        "bg-[radial-gradient(ellipse_at_center,_#4a0b16_0%,_#28030b_50%,_#0d0103_100%)]",
        className
      )}
    >
      {/* ── 1. Draped Velvet Theatre Curtains & Candles ──────── */}
      <div className="vignette-overlay absolute inset-0 z-0 pointer-events-none" />

      {/* Burning Candle Lights Flanking Left & Right */}
      <PillarCandle className="absolute top-24 left-4 sm:left-12 z-10" />
      <PillarCandle className="absolute top-20 right-4 sm:right-12 z-10" />
      <PillarCandle className="absolute bottom-28 left-6 sm:left-16 z-10 hidden sm:flex" />

      {/* Floating Golden Butterflies */}
      <FloatingDecoration preset="drift" depth={2} className="playlist-golden-butterfly top-32 left-1/4 w-8 h-7">
        <GoldenButterfly />
      </FloatingDecoration>
      <FloatingDecoration preset="drift-reverse" depth={3} className="playlist-golden-butterfly top-40 right-1/4 w-10 h-8">
        <GoldenButterfly />
      </FloatingDecoration>

      {/* Center Warm Candlelight Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[1000px] h-[500px] rounded-full bg-[radial-gradient(ellipse,_rgba(246,201,78,0.18)_0%,_rgba(201,144,74,0.06)_50%,_transparent_75%)] blur-3xl z-0"
      />

      {/* ── 2. Top Header & Navigation Bar ───────────────────── */}
      <header className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between gap-4 pb-4 border-b border-[#c9904a]/25">
        <div className="flex flex-col text-left">
          <h1 className="playlist-headline-text font-handwriting text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fdf8f0] font-normal leading-tight tracking-wide drop-shadow-[0_2px_12px_rgba(246,201,78,0.35)]">
            {PLAYLIST_CONTENT.headline}
          </h1>
          <p className="font-serif text-[0.65rem] sm:text-xs md:text-sm tracking-[0.2em] text-gold/80 uppercase mt-0.5">
            {PLAYLIST_CONTENT.subtitle}
          </p>
        </div>

        {/* Rectangular-Pill "BACK ◂" Button with Gold Inset Border */}
        <button
          type="button"
          aria-label="Back to selection hub"
          onClick={handleBack}
          className="shrink-0 inline-flex items-center justify-center font-serif text-xs sm:text-sm font-bold tracking-widest uppercase px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#380e18] hover:bg-[#520f1c] text-gold shadow-[0_2px_10px_rgba(0,0,0,0.5)] border-2 border-gold/70 transition-all duration-300 active:scale-95 cursor-pointer ring-1 ring-gold/40"
        >
          {PLAYLIST_CONTENT.backButtonLabel}
        </button>
      </header>

      {/* ── 3. Main Stage: Love Letter, Vinyl Turntable, Altar ── */}
      <main className="relative z-10 w-full max-w-6xl mx-auto my-6 md:my-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start justify-items-center">
          {/* ── Left Feature: Love Letter with Rose Petal Border ─ */}
          <div className="playlist-left-card lg:col-span-4 w-full max-w-md">
            <div className="relative">
              <RosePetalBorder />
              <PaperCard
                variant="deckle"
                shadow="xl"
                hasTexture={true}
                padding="md"
                className="w-full bg-gradient-to-b from-[#fdf8f0] via-[#f9edd8] to-[#f2dbb4] border-[#c9904a]/40 text-[#2d1f10]"
              >
                <div className="flex items-center justify-between border-b border-[#c9904a]/30 pb-2 mb-3">
                  <span className="font-serif text-xs tracking-widest text-[#783e15] uppercase font-semibold">
                    {PLAYLIST_CONTENT.letter.title}
                  </span>
                  <span className="text-rose text-xs">♥</span>
                </div>

                <p className="font-handwriting text-lg sm:text-xl text-[#4a1c0d] font-medium leading-snug mb-3">
                  &ldquo;{PLAYLIST_CONTENT.letter.salutation}&rdquo;
                </p>

                <p className="font-serif text-xs sm:text-sm text-[#3b1f10] leading-relaxed text-justify opacity-95">
                  {PLAYLIST_CONTENT.letter.body}
                </p>

                <div className="mt-4 pt-3 border-t border-[#c9904a]/25 flex flex-col items-end text-right">
                  <span className="font-handwriting text-sm sm:text-base text-[#6b3512] italic">
                    {PLAYLIST_CONTENT.letter.closing}
                  </span>
                  <span className="font-serif text-[0.65rem] sm:text-xs text-[#4a240f] tracking-wider uppercase font-semibold mt-0.5">
                    {PLAYLIST_CONTENT.letter.signature}
                  </span>
                </div>
              </PaperCard>
            </div>
          </div>

          {/* ── Center Feature: Vinyl Player & Playback Bar ─────── */}
          <div className="playlist-center-turntable lg:col-span-4 w-full flex flex-col items-center justify-center gap-6">
            <VinylPlayer
              track={activeTrack}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
            />

            {/* Playback Controls Bar */}
            <AudioControls
              track={activeTrack}
              isPlaying={isPlaying}
              isMuted={isMuted}
              volume={volume}
              progress={progress}
              onTogglePlay={handleTogglePlay}
              onNextTrack={handleNextTrack}
              onPrevTrack={handlePrevTrack}
              onToggleMute={handleToggleMute}
              onVolumeChange={handleVolumeChange}
              onSeek={(newProg) => setProgress(newProg)}
              className="w-full"
            />
          </div>

          {/* ── Right Feature: Photographic Altar & Track List ─── */}
          <div className="playlist-right-altar lg:col-span-4 w-full max-w-md flex flex-col items-center gap-6">
            {/* Gilded Baroque Photo Altar */}
            <div className="relative w-52 sm:w-60 drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]">
              <PhotoFrame
                variant="filigree"
                rotation={-2}
                aspectRatio="portrait"
                caption={PLAYLIST_CONTENT.photoAltar.caption}
                date={PLAYLIST_CONTENT.photoAltar.date}
                className="w-full"
              >
                <div className="relative w-full h-full min-h-[170px] bg-gradient-to-br from-[#24140b] via-[#160b06] to-[#0a0503] flex flex-col items-center justify-center p-2 overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d9a85f_1px,transparent_1px)] [background-size:8px_8px]" />
                  <div className="absolute inset-0 shadow-[inset_0_0_18px_rgba(201,144,74,0.35)] pointer-events-none z-20" />
                  {PLAYLIST_CONTENT.photoAltar.photoSrc ? (
                    <Image
                      src={PLAYLIST_CONTENT.photoAltar.photoSrc}
                      alt={PLAYLIST_CONTENT.photoAltar.photoAlt}
                      fill
                      sizes="240px"
                      loading="lazy"
                      quality={85}
                      className="relative z-10 w-full h-full object-cover rounded-xs"
                    />
                  ) : (
                    <>
                      <span className="text-gold/80 text-xl mb-1">✦</span>
                      <span className="font-handwriting text-gold text-base tracking-wide text-center">
                        {PLAYLIST_CONTENT.photoAltar.caption}
                      </span>
                      <span className="font-sans text-[0.6rem] text-gold/50 tracking-widest uppercase mt-0.5">
                        Nayyy & Keillaa
                      </span>
                    </>
                  )}
                </div>
              </PhotoFrame>

              {/* Decorative Roses below photo */}
              <div className="flex items-center justify-center gap-2.5 -mt-3.5 select-none pointer-events-none drop-shadow-md">
                <RoseIcon size={22} />
                <BlossomIcon size={20} />
                <RoseIcon size={22} />
              </div>
            </div>

            {/* Scrapbook Track Selection List */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center justify-between px-1 mb-1 border-b border-[#c9904a]/20 pb-1">
                <span className="font-serif text-xs tracking-wider uppercase text-gold/80 font-semibold">
                  Pilih Lagu Kenangan
                </span>
                <span className="font-serif text-[0.65rem] text-[#c9904a]/60">
                  {PLAYLIST_CONTENT.tracks.length} Lagu
                </span>
              </div>

              {PLAYLIST_CONTENT.tracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  index={index}
                  isActiveTrack={track.id === activeTrack.id}
                  isPlaying={isPlaying}
                  onSelectTrack={handleSelectTrack}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── 4. Footer & Advance CTA ──────────────────────────── */}
      <footer className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center text-center mt-2 pb-2 md:pb-4">
        <button
          type="button"
          onClick={handleAdvance}
          className="playlist-advance-btn group relative inline-flex flex-col items-center cursor-pointer transition-transform duration-300 focus-visible:outline-none"
        >
          <span className="font-serif text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#fdf8f0] font-medium uppercase transition-colors duration-300 group-hover:text-gold drop-shadow-md">
            {PLAYLIST_CONTENT.advanceButtonLabel}
          </span>
          <span
            aria-hidden="true"
            className="mt-1.5 h-[1.5px] w-32 sm:w-44 bg-gradient-to-r from-transparent via-gold/90 to-transparent transition-all duration-300 group-hover:w-56 shadow-sm"
          />
        </button>
      </footer>
    </section>
  );
}
