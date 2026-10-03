// ─────────────────────────────────────────────────────────────
// CinematicCursor
// Bespoke desktop custom cursor featuring a warm golden core point,
// soft trailing ambient aura, reactive interactive-element scaling,
// and ripple burst on click.
// Fully compliant with accessibility standards (disabled on touch
// devices and for users with prefers-reduced-motion enabled).
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useRef, useState } from "react";

export function CinematicCursor() {
  const [isEnabled, setIsEnabled] = useState(false);

  // Direct DOM refs to avoid React re-renders on every animation frame
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const mote1Ref = useRef<HTMLDivElement>(null);
  const mote2Ref = useRef<HTMLDivElement>(null);
  const mote3Ref = useRef<HTMLDivElement>(null);

  // Mutable animation state
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const mote1Pos = useRef({ x: -100, y: -100 });
  const mote2Pos = useRef({ x: -100, y: -100 });
  const mote3Pos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isClicking = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Guard against non-browser environments
    if (typeof window === "undefined") return;

    // 2. Accessibility & device capability check: fine pointer and no reduced motion
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const checkEnabled = () => {
      const finePointer = pointerQuery.matches;
      const reducedMotion = motionQuery.matches;
      setIsEnabled(finePointer && !reducedMotion);
    };

    checkEnabled();

    // Listen for media query state changes
    pointerQuery.addEventListener("change", checkEnabled);
    motionQuery.addEventListener("change", checkEnabled);

    return () => {
      pointerQuery.removeEventListener("change", checkEnabled);
      motionQuery.removeEventListener("change", checkEnabled);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      document.documentElement.classList.remove("cinematic-cursor-active");
      return;
    }

    // Toggle active class to hide native OS cursor exclusively on fine-pointer devices
    document.documentElement.classList.add("cinematic-cursor-active");

    // Movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        // Snap trailing positions to initial position to avoid fly-in from corner
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        mote1Pos.current.x = e.clientX;
        mote1Pos.current.y = e.clientY;
        mote2Pos.current.x = e.clientX;
        mote2Pos.current.y = e.clientY;
        mote3Pos.current.x = e.clientX;
        mote3Pos.current.y = e.clientY;
      }
    };

    // Hover detection on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, [role="button"], input, select, textarea, [data-interactive], .cursor-pointer, [tabindex="0"]'
      );
      isHovered.current = !!interactive;
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isClicking.current = true;
      if (rippleRef.current) {
        rippleRef.current.style.left = `${e.clientX}px`;
        rippleRef.current.style.top = `${e.clientY}px`;
        rippleRef.current.style.animation = "none";
        // Force reflow
        void rippleRef.current.offsetWidth;
        rippleRef.current.style.animation = "cursorRipple 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards";
      }
    };

    const handleMouseUp = () => {
      isClicking.current = false;
    };

    // 60fps GPU-composited render loop
    const render = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Smooth organic lerp factors
      const ringLerp = isHovered.current ? 0.28 : 0.18;

      ringPos.current.x += (targetX - ringPos.current.x) * ringLerp;
      ringPos.current.y += (targetY - ringPos.current.y) * ringLerp;

      // Cascading star dust motes lerping
      mote1Pos.current.x += (targetX - mote1Pos.current.x) * 0.14;
      mote1Pos.current.y += (targetY - mote1Pos.current.y) * 0.14;

      mote2Pos.current.x += (mote1Pos.current.x - mote2Pos.current.x) * 0.11;
      mote2Pos.current.y += (mote1Pos.current.y - mote2Pos.current.y) * 0.11;

      mote3Pos.current.x += (mote2Pos.current.x - mote3Pos.current.x) * 0.08;
      mote3Pos.current.y += (mote2Pos.current.y - mote3Pos.current.y) * 0.08;

      const currentVisibility = isVisible.current ? "1" : "0";

      // 1. Center Core Dot (tight tracking)
      if (dotRef.current) {
        const scale = isHovered.current ? (isClicking.current ? 1.1 : 1.5) : isClicking.current ? 0.8 : 1.0;
        dotRef.current.style.opacity = currentVisibility;
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      // 2. Outer Halo Ring (graceful trailing)
      if (ringRef.current) {
        const ringScale = isHovered.current ? (isClicking.current ? 1.3 : 1.6) : isClicking.current ? 0.85 : 1.0;
        ringRef.current.style.opacity = currentVisibility;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      // 3. Multi-Mote Star Dust Trail (cascading magical motes)
      if (mote1Ref.current) {
        mote1Ref.current.style.opacity = currentVisibility;
        mote1Ref.current.style.transform = `translate3d(${mote1Pos.current.x}px, ${mote1Pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (mote2Ref.current) {
        mote2Ref.current.style.opacity = currentVisibility;
        mote2Ref.current.style.transform = `translate3d(${mote2Pos.current.x}px, ${mote2Pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (mote3Ref.current) {
        mote3Ref.current.style.opacity = currentVisibility;
        mote3Ref.current.style.transform = `translate3d(${mote3Pos.current.x}px, ${mote3Pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    rafId.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove("cinematic-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className="cinematic-cursor-layer pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {/* ── Multi-Mote Star Dust Trail ─────────────────────────── */}
      <div
        ref={mote3Ref}
        className="pointer-events-none absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#fde047]/30 blur-[1px] will-change-transform"
      />
      <div
        ref={mote2Ref}
        className="pointer-events-none absolute top-0 left-0 w-2 h-2 rounded-full bg-[#fef08a]/45 blur-[0.7px] will-change-transform"
      />
      <div
        ref={mote1Ref}
        className="pointer-events-none absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#fffbeb]/65 blur-[0.4px] will-change-transform"
      />

      {/* ── Outer Trailing Halo Ring ───────────────────────────── */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 w-8 h-8 rounded-full border border-[#f6c94e]/50 bg-[#f6c94e]/[0.06] shadow-[0_0_14px_rgba(246,201,78,0.25)] transition-[border-color,background-color] duration-200 will-change-transform"
      />

      {/* ── Core Golden Point ──────────────────────────────────── */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 w-2 h-2 rounded-full bg-[#fde68a] shadow-[0_0_8px_rgba(246,201,78,0.95),0_0_16px_rgba(246,201,78,0.5)] transition-[background-color] duration-150 will-change-transform"
      />

      {/* ── Click Ripple Ring ──────────────────────────────────── */}
      <div
        ref={rippleRef}
        className="pointer-events-none absolute w-8 h-8 rounded-full border border-[#f6c94e]/70 opacity-0 will-change-transform"
      />
    </div>
  );
}
