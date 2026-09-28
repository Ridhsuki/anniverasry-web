// ─────────────────────────────────────────────────────────────
// Icons
// Bespoke inline SVG icons matching the vintage editorial aesthetic.
// Replaces platform-specific OS emojis with resolution-independent vectors.
// ─────────────────────────────────────────────────────────────

import { cn } from "@/utils";

export interface IconProps {
  className?: string;
  size?: number;
}

/** Antique velvet crimson rose with gold-trimmed petals */
export function RoseIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block shrink-0 drop-shadow-sm", className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" fill="#7a0e1c" />
      <path
        d="M12 5 C8 7, 6 12, 10 16 C14 20, 18 16, 17 11 C16 7, 13 5, 12 5 Z"
        fill="#9e1828"
      />
      <path
        d="M10 8 C12 6, 15 7, 15 10 C15 13, 12 14, 11 12 C10 10, 10 9, 10 8 Z"
        fill="#bf2436"
      />
      <circle cx="12" cy="10" r="1.5" fill="#f87171" />
      <path
        d="M6 18 C7 15, 9 15, 11 16 M18 18 C17 15, 15 15, 13 16"
        stroke="#445934"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Delicate single rose petal */
export function RosePetalIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block shrink-0 drop-shadow-xs", className)}
      aria-hidden="true"
    >
      <path
        d="M10 2 C15 4, 18 10, 15 15 C12 20, 5 18, 3 13 C1 8, 5 1, 10 2 Z"
        fill="#b91c1c"
        opacity="0.9"
      />
      <path
        d="M9 5 C12 7, 14 11, 12 14"
        stroke="#fca5a5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

/** Delicate pink cherry blossom / floral spray */
export function BlossomIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block shrink-0 drop-shadow-sm", className)}
      aria-hidden="true"
    >
      {/* 5 Petals */}
      <circle cx="12" cy="7" r="4" fill="#fbcfe8" opacity="0.9" />
      <circle cx="16.5" cy="10.5" r="4" fill="#fbcfe8" opacity="0.9" />
      <circle cx="15" cy="16" r="4" fill="#fbcfe8" opacity="0.9" />
      <circle cx="9" cy="16" r="4" fill="#fbcfe8" opacity="0.9" />
      <circle cx="7.5" cy="10.5" r="4" fill="#fbcfe8" opacity="0.9" />
      {/* Floral Pistil / Stamen */}
      <circle cx="12" cy="12" r="2.5" fill="#f472b6" />
      <circle cx="12" cy="12" r="1.2" fill="#fde68a" />
    </svg>
  );
}

/** Ornate map location pin */
export function LocationPinIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 10.193 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Speaker mute / silenced audio icon */
export function VolumeMuteIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" fillOpacity="0.2" />
      <line x1="22" x2="16" y1="9" y2="15" />
      <line x1="16" x2="22" y1="9" y2="15" />
    </svg>
  );
}

/** Speaker volume high / active audio icon */
export function VolumeHighIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" fillOpacity="0.2" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

/** Play media icon */
export function PlayIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <polygon points="6,4 20,12 6,20" />
    </svg>
  );
}

/** Pause media icon */
export function PauseIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

/** Previous track icon */
export function PrevTrackIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <polygon points="19,20 9,12 19,4" />
      <rect x="5" y="4" width="2.5" height="16" rx="0.5" />
    </svg>
  );
}

/** Next track icon */
export function NextTrackIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <polygon points="5,4 15,12 5,20" />
      <rect x="16.5" y="4" width="2.5" height="16" rx="0.5" />
    </svg>
  );
}
