// ─────────────────────────────────────────────────────────────
// VintageButton
// Reusable tactile button component with romantic, vintage styling.
// Supports multiple variants (primary, secondary, gold, ghost, wax-seal),
// sizes, and subtle GPU-accelerated interaction states.
// ─────────────────────────────────────────────────────────────

"use client";

import { forwardRef } from "react";

import type { VintageButtonProps } from "@/types/components";
import { cn } from "@/utils";

const variantStyles: Record<NonNullable<VintageButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-b from-[#2a1d12] to-[#1a1209] text-[#fdf8f0] border border-[#c9904a]/40 shadow-md hover:border-[#f6c94e] hover:shadow-[0_0_20px_rgba(246,201,78,0.25)] active:scale-[0.98]",
  secondary:
    "bg-[#f9edd8] text-[#2d1f10] border border-[#c9904a]/30 shadow-sm hover:bg-[#f2dbb4] hover:border-[#c9904a]/60 active:scale-[0.98]",
  gold:
    "bg-gradient-to-r from-[#d9a85f] via-[#fde68a] to-[#c9904a] text-[#1a1209] font-medium border border-[#fde68a]/60 shadow-[0_2px_12px_rgba(246,201,78,0.3)] hover:brightness-105 hover:shadow-[0_0_24px_rgba(246,201,78,0.45)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[#e8c48a] border border-[#c9904a]/20 hover:border-[#c9904a]/60 hover:bg-[#c9904a]/5 hover:text-[#fdf8f0] active:scale-[0.98]",
  "wax-seal":
    "bg-gradient-to-br from-[#d46b6b] via-[#b84848] to-[#8f2f2f] text-[#fdf8f0] rounded-full border-2 border-[#f5c6c6]/30 shadow-[0_4px_16px_rgba(143,47,47,0.4)] hover:brightness-110 active:scale-95 font-serif",
};

const sizeStyles: Record<NonNullable<VintageButtonProps["size"]>, string> = {
  sm: "px-3.5 py-1.5 text-xs tracking-wider",
  md: "px-5 py-2.5 text-sm tracking-wider",
  lg: "px-8 py-3.5 text-base tracking-widest",
};

export const VintageButton = forwardRef<HTMLButtonElement, VintageButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      ornate = false,
      isLoading = false,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isWaxSeal = variant === "wax-seal";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "group relative inline-flex items-center justify-center font-serif transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-50 select-none gpu-accelerated cursor-pointer",
          isWaxSeal
            ? "aspect-square p-3"
            : cn("rounded-sm uppercase", sizeStyles[size]),
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {/* Subtle vintage inner border ring */}
        {!isWaxSeal && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[2px] rounded-[1px] border border-white/5 opacity-60 transition-opacity group-hover:opacity-100"
          />
        )}

        {/* Optional decorative flourish */}
        {ornate && !isWaxSeal && (
          <span
            aria-hidden="true"
            className="mr-2 text-xs text-gold/70 transition-transform group-hover:scale-110"
          >
            ✦
          </span>
        )}

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            children
          )}
        </span>

        {ornate && !isWaxSeal && (
          <span
            aria-hidden="true"
            className="ml-2 text-xs text-gold/70 transition-transform group-hover:scale-110"
          >
            ✦
          </span>
        )}
      </button>
    );
  }
);

VintageButton.displayName = "VintageButton";
