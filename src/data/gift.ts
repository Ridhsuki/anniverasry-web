// ─────────────────────────────────────────────────────────────
// Gift Scene Data
// Structured content and visual configuration for Scene 6 (Gift).
// Visual benchmark: docs/references/screenshots/gift-scene.png
// ─────────────────────────────────────────────────────────────

export interface GiftMetadata {
  sender: string;
  recipient: string;
  occasion: string;
  date: string;
  sealMonogram: string;
  ribbonColor?: string;
  keepsakeTitle: string;
}

export interface GiftRevealMessage {
  heading: string;
  subheading: string;
  body: string;
  closing: string;
  signature: string;
}

export interface GiftVisualConfig {
  headlineText: string;
  initialCtaText: string;
  revealedCtaText: string;
  backButtonLabel: string;
  decorations: {
    hasStarlightFlares: boolean;
    hasDewPearls: boolean;
    hasPetalWreath: boolean;
  };
}

export interface GiftContent {
  title: string;
  subtitle: string;
  metadata: GiftMetadata;
  revealMessage: GiftRevealMessage;
  visual: GiftVisualConfig;
}

export const GIFT_CONTENT: GiftContent = {
  title: "Press the Envelope",
  subtitle: "Sebuah bingkisan kecil dengan sejuta rasa cinta di dalamnya",
  metadata: {
    sender: "Nayyy",
    recipient: "Keillaa",
    occasion: "Anniversary Keepsake",
    date: "26-09-26",
    sealMonogram: "N&K",
    ribbonColor: "gold",
    keepsakeTitle: "Kado Terindah: Kehadiranmu",
  },
  revealMessage: {
    heading: "Untukmu yang Teristimewa",
    subheading: "Hadiah terindah bukanlah apa yang dibungkus pita...",
    body: "Tetapi setiap detik waktu yang kita habiskan bersama, setiap tawa yang kita bagi saat dunia sedang tidak mudah, dan tanganmu yang selalu ada untuk kugenggam. Terima kasih telah menjadi kado paling berharga yang pernah semesta berikan untuk hidupku.",
    closing: "Dengan segenap cintaku,",
    signature: "Nayyy ♥ 26-09-26",
  },
  visual: {
    headlineText: "Press the Envelope",
    initialCtaText: "tap to lanjut",
    revealedCtaText: "BUKA SURAT TERAKHIR ❯",
    backButtonLabel: "BACK ◂",
    decorations: {
      hasStarlightFlares: true,
      hasDewPearls: true,
      hasPetalWreath: true,
    },
  },
};
