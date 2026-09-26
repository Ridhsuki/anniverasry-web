// ─────────────────────────────────────────────────────────────
// TypeScript Design Tokens
// Mirrors src/styles/tokens.css as typed JS constants.
// Use these for inline styles, GSAP tween values, and
// any place where CSS variables can't be accessed directly.
// ─────────────────────────────────────────────────────────────

// ── Colors ────────────────────────────────────────────────────
export const colors = {
  // Primitives
  cream: {
    50:  "#fdf8f0",
    100: "#f9edd8",
    200: "#f2dbb4",
    300: "#e8c48a",
    400: "#d9a85f",
    500: "#c9904a",
  },
  gold: {
    100: "#fef3c7",
    200: "#fde68a",
    300: "#f6c94e",
    400: "#e8a820",
    500: "#c9862b",
    600: "#a66820",
  },
  rose: {
    100: "#fce7e7",
    200: "#f5c6c6",
    300: "#e89898",
    400: "#d46b6b",
    500: "#b84848",
    600: "#8f2f2f",
  },
  sage: {
    100: "#e8ede0",
    200: "#cad6bc",
    300: "#a8bc97",
    400: "#849e72",
    500: "#63804f",
    600: "#445934",
  },
  night: {
    950: "#080808",
    900: "#0d0d0d",
    800: "#141414",
    700: "#1c1c1c",
    600: "#262626",
    500: "#333333",
    400: "#4a4a4a",
  },
  ink: {
    900: "#1a1209",
    800: "#2d1f10",
    700: "#3d2b15",
    600: "#5c4020",
    500: "#7a5930",
    400: "#9e7848",
    300: "#c4a06e",
  },

  // Semantic
  semantic: {
    bgBase:     "#0d0d0d",
    bgElevated: "#141414",
    bgPaper:    "#f9edd8",
    bgPaperAged:"#f2dbb4",
    textPrimary:"#fdf8f0",
    textSecondary:"#e8c48a",
    textMuted:  "#c4a06e",
    textOnPaper:"#2d1f10",
    accentGold: "#f6c94e",
    accentRose: "#e89898",
    accentSage: "#a8bc97",
  },
} as const;

// ── Typography ────────────────────────────────────────────────
export const typography = {
  fontFamily: {
    display:     "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
    serif:       "var(--font-playfair), 'Playfair Display', 'Times New Roman', serif",
    sans:        "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
    handwriting: "var(--font-dancing), 'Dancing Script', cursive",
  },
  fontSize: {
    xs:      "clamp(0.65rem,  0.6rem + 0.25vw, 0.75rem)",
    sm:      "clamp(0.8rem,   0.75rem + 0.25vw, 0.875rem)",
    base:    "clamp(0.9rem,   0.875rem + 0.25vw, 1rem)",
    lg:      "clamp(1rem,     0.95rem + 0.5vw, 1.125rem)",
    xl:      "clamp(1.1rem,   1rem + 0.75vw, 1.25rem)",
    "2xl":   "clamp(1.25rem,  1.1rem + 1vw, 1.5rem)",
    "3xl":   "clamp(1.5rem,   1.25rem + 1.5vw, 1.875rem)",
    "4xl":   "clamp(1.875rem, 1.5rem + 2vw, 2.25rem)",
    "5xl":   "clamp(2.25rem,  1.75rem + 3vw, 3rem)",
    "6xl":   "clamp(3rem,     2rem + 4vw, 4.5rem)",
    display: "clamp(4rem,     3rem + 6vw, 8rem)",
  },
  lineHeight: {
    none:    1,
    tight:   1.15,
    snug:    1.35,
    normal:  1.55,
    relaxed: 1.75,
    loose:   2,
  },
  letterSpacing: {
    tighter: "-0.06em",
    tight:   "-0.03em",
    normal:  "0em",
    wide:    "0.05em",
    wider:   "0.1em",
    widest:  "0.2em",
  },
  fontWeight: {
    light:    300,
    regular:  400,
    medium:   500,
    semibold: 600,
    bold:     700,
    black:    900,
  },
} as const;

// ── Spacing ────────────────────────────────────────────────────
export const spacing = {
  px:    "1px",
  0.5:   "0.125rem",
  1:     "0.25rem",
  1.5:   "0.375rem",
  2:     "0.5rem",
  2.5:   "0.625rem",
  3:     "0.75rem",
  4:     "1rem",
  5:     "1.25rem",
  6:     "1.5rem",
  8:     "2rem",
  10:    "2.5rem",
  12:    "3rem",
  16:    "4rem",
  20:    "5rem",
  24:    "6rem",
  32:    "8rem",
  40:    "10rem",
  48:    "12rem",
  64:    "16rem",
} as const;

// ── Animation ─────────────────────────────────────────────────
export const animation = {
  duration: {
    instant:   0,
    fast:      0.2,
    normal:    0.4,
    moderate:  0.6,
    slow:      0.8,
    slower:    1.2,
    cinematic: 1.8,
    epic:      2.4,
  },
  ease: {
    linear:    "none",          // GSAP "none"
    smooth:    "power2.out",
    snap:      "power3.inOut",
    cinematic: "power4.out",
    bounce:    "back.out(1.7)",
    elastic:   "elastic.out(1, 0.5)",
    // Framer Motion / CSS equivalents
    cssSmooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    cssCinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
    cssBounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  stagger: {
    tight:   0.06,
    normal:  0.10,
    relaxed: 0.15,
    slow:    0.20,
  },
} as const;

// ── Shadows ────────────────────────────────────────────────────
export const shadows = {
  paperSm: "0 1px 2px rgba(26, 18, 9, 0.3), 0 1px 6px rgba(26, 18, 9, 0.2)",
  paper:   "0 2px 4px rgba(26, 18, 9, 0.3), 0 4px 16px rgba(26, 18, 9, 0.25), 0 0 24px rgba(201, 144, 74, 0.05)",
  paperLg: "0 4px 8px rgba(26, 18, 9, 0.35), 0 8px 32px rgba(26, 18, 9, 0.30), 0 0 48px rgba(201, 144, 74, 0.08)",
  paperXl: "0 8px 16px rgba(26, 18, 9, 0.40), 0 16px 64px rgba(26, 18, 9, 0.35), 0 0 80px rgba(201, 144, 74, 0.12)",
  glowGold:"0 0 20px rgba(246, 201, 78, 0.20), 0 0 60px rgba(246, 201, 78, 0.10)",
  glowRose:"0 0 20px rgba(232, 152, 152, 0.20), 0 0 60px rgba(232, 152, 152, 0.10)",
  frame:   "0 2px 4px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)",
} as const;

// ── Z-Index ────────────────────────────────────────────────────
export const zIndex = {
  below:   -1,
  base:     0,
  raised:  10,
  content: 20,
  sticky:  30,
  overlay: 40,
  modal:   50,
  navbar:  60,
  toast:   70,
  cursor:  80,
  top:    999,
} as const;

// ── Types derived from tokens ──────────────────────────────────
export type ColorToken = keyof typeof colors.semantic;
export type DurationToken = keyof typeof animation.duration;
export type EaseToken = keyof typeof animation.ease;
export type ZIndexToken = keyof typeof zIndex;
