// ─────────────────────────────────────────────────────────────
// AmbientParticles
// Lightweight, deterministic CSS-animated golden motes floating
// gently through the atmosphere.
// Zero JavaScript loops, purely GPU-accelerated compositing.
// Deterministic data ensures 100% hydration matching between SSR
// and client. Suppresses animation when prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo } from "react";

import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/utils";

interface ParticleDef {
  id: number;
  top: string;
  left: string;
  size: number;
  duration: string;
  delay: string;
  driftX: string;
  driftY: string;
  maxOpacity: number;
  color: string;
  blur: string;
}

// 20 fixed, deterministic particle definitions distributed gracefully
const DETERMINISTIC_PARTICLES: ParticleDef[] = [
  { id: 1, top: "12%", left: "15%", size: 3, duration: "13s", delay: "0s", driftX: "22px", driftY: "-30px", maxOpacity: 0.45, color: "#fef08a", blur: "0.5px" },
  { id: 2, top: "28%", left: "82%", size: 2.5, duration: "16s", delay: "-4s", driftX: "-18px", driftY: "-25px", maxOpacity: 0.35, color: "#fde68a", blur: "0.5px" },
  { id: 3, top: "45%", left: "22%", size: 4, duration: "14s", delay: "-2s", driftX: "25px", driftY: "-35px", maxOpacity: 0.4, color: "#fcd34d", blur: "1px" },
  { id: 4, top: "68%", left: "75%", size: 2, duration: "18s", delay: "-7s", driftX: "-15px", driftY: "-20px", maxOpacity: 0.3, color: "#fed7aa", blur: "0.5px" },
  { id: 5, top: "85%", left: "30%", size: 3.5, duration: "15s", delay: "-3s", driftX: "18px", driftY: "-28px", maxOpacity: 0.4, color: "#fef08a", blur: "0.8px" },
  { id: 6, top: "20%", left: "48%", size: 2, duration: "12s", delay: "-5s", driftX: "-12px", driftY: "-22px", maxOpacity: 0.3, color: "#fde68a", blur: "0.5px" },
  { id: 7, top: "60%", left: "40%", size: 3, duration: "17s", delay: "-8s", driftX: "20px", driftY: "-32px", maxOpacity: 0.42, color: "#fcd34d", blur: "0.8px" },
  { id: 8, top: "35%", left: "65%", size: 2.5, duration: "13s", delay: "-1s", driftX: "-22px", driftY: "-26px", maxOpacity: 0.35, color: "#fef08a", blur: "0.5px" },
  { id: 9, top: "78%", left: "12%", size: 3, duration: "15s", delay: "-6s", driftX: "16px", driftY: "-24px", maxOpacity: 0.38, color: "#fed7aa", blur: "0.6px" },
  { id: 10, top: "15%", left: "90%", size: 2, duration: "19s", delay: "-9s", driftX: "-14px", driftY: "-20px", maxOpacity: 0.32, color: "#fde68a", blur: "0.5px" },
  { id: 11, top: "52%", left: "88%", size: 3.5, duration: "14s", delay: "-3.5s", driftX: "-24px", driftY: "-30px", maxOpacity: 0.4, color: "#fcd34d", blur: "1px" },
  { id: 12, top: "90%", left: "60%", size: 2.5, duration: "16s", delay: "-2.5s", driftX: "15px", driftY: "-22px", maxOpacity: 0.35, color: "#fef08a", blur: "0.5px" },
  { id: 13, top: "8%", left: "35%", size: 3, duration: "15s", delay: "-4.5s", driftX: "18px", driftY: "-26px", maxOpacity: 0.45, color: "#fde68a", blur: "0.7px" },
  { id: 14, top: "38%", left: "8%", size: 2, duration: "18s", delay: "-7.5s", driftX: "20px", driftY: "-24px", maxOpacity: 0.3, color: "#fed7aa", blur: "0.5px" },
  { id: 15, top: "72%", left: "50%", size: 4, duration: "13s", delay: "-1.5s", driftX: "-16px", driftY: "-36px", maxOpacity: 0.42, color: "#fcd34d", blur: "1px" },
  { id: 16, top: "25%", left: "28%", size: 2.5, duration: "17s", delay: "-8.5s", driftX: "14px", driftY: "-22px", maxOpacity: 0.35, color: "#fef08a", blur: "0.5px" },
  { id: 17, top: "62%", left: "92%", size: 3, duration: "14s", delay: "-5.5s", driftX: "-20px", driftY: "-28px", maxOpacity: 0.38, color: "#fde68a", blur: "0.7px" },
  { id: 18, top: "82%", left: "80%", size: 2, duration: "16s", delay: "-10s", driftX: "-18px", driftY: "-20px", maxOpacity: 0.3, color: "#fed7aa", blur: "0.5px" },
  { id: 19, top: "48%", left: "55%", size: 3.5, duration: "15s", delay: "-2.2s", driftX: "22px", driftY: "-30px", maxOpacity: 0.4, color: "#fcd34d", blur: "0.9px" },
  { id: 20, top: "95%", left: "20%", size: 2.5, duration: "13s", delay: "-6.2s", driftX: "12px", driftY: "-25px", maxOpacity: 0.35, color: "#fef08a", blur: "0.5px" },
];

export interface AmbientParticlesProps {
  className?: string;
  count?: number;
}

export function AmbientParticles({ className, count = 20 }: AmbientParticlesProps) {
  const isMobile = useIsMobile();
  // On mobile, use far fewer particles to reduce GPU compositor load
  const effectiveCount = isMobile ? Math.min(count, 6) : count;
  const particles = useMemo(() => {
    return DETERMINISTIC_PARTICLES.slice(0, Math.min(effectiveCount, DETERMINISTIC_PARTICLES.length));
  }, [effectiveCount]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "ambient-particles pointer-events-none fixed inset-0 z-30 overflow-hidden select-none",
        className
      )}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className={cn(
            "pointer-events-none absolute rounded-full animate-ambient-mote",
            !isMobile && "will-change-transform"
          )}
          style={
            {
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: isMobile ? undefined : `0 0 ${p.size * 2}px ${p.color}`,
              filter: isMobile ? undefined : `blur(${p.blur})`,
              "--duration": p.duration,
              animationDelay: p.delay,
              "--drift-x": p.driftX,
              "--drift-y": p.driftY,
              "--drift-opacity": p.maxOpacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
