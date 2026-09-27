// ─────────────────────────────────────────────────────────────
// Final Letter Scene Data
// Structured content and metadata for Scene 7 (Final Letter).
// Visual benchmark: docs/references/image-map.md
// ─────────────────────────────────────────────────────────────

export interface LetterPhotoMetadata {
  src: string;
  alt: string;
  caption: string;
  date: string;
  rotation: number;
}

export interface LetterSignature {
  closing: string;
  authorName: string;
  partnerName: string;
  date: string;
  monogram: string;
}

export interface LetterDecorations {
  hasWaxSealWeight: boolean;
  hasFallingPetals: boolean;
  hasFoldCreases: boolean;
}

export interface FinalLetterContent {
  title: string;
  subtitle: string;
  greeting: string;
  paragraphs: string[];
  signature: LetterSignature;
  photo: LetterPhotoMetadata;
  decorations: LetterDecorations;
  closingVow: string;
  replayButtonLabel: string;
  backButtonLabel: string;
}

export const FINAL_LETTER_CONTENT: FinalLetterContent = {
  title: "Surat Cinta untuk Hari Ini & Selamanya",
  subtitle: "The Final Chapter • Our Eternal Keepsake",
  greeting: "Dearest Keillaa,",
  paragraphs: [
    "Mungkin tidak ada kata yang benar-benar cukup untuk merangkum betapa berartinya kehadiranmu dalam hidupku. Tapi jika aku harus memilih satu rasa yang paling mendalam setiap kali menatap matamu, itu adalah rasa syukur yang tak pernah habis.",
    "Terima kasih telah menjadi rumah tempatku pulang di setiap lelah, menjadi tawa di hari-hari yang berat, dan menjadi alasan terbesar mengapa aku selalu bersemangat menyambut hari esok. Bersamamu, hal-hal paling sederhana berubah menjadi kenangan paling berharga.",
    "Kita sudah melewati begitu banyak cerita—dari tawa lepas di dalam mobil saat lagu kesukaan kita berdendang, obrolan larut malam tentang mimpi-mimpi kita, hingga saat-saat kita belajar saling mengerti dan menenangkan hati satu sama lain. Di setiap langkah itu, aku semakin yakin bahwa memilihmu adalah hal terindah yang pernah terjadi dalam hidupku.",
    "Hari ini, di perayaan hari istimewa kita, aku tidak hanya merayakan semua kenangan manis yang telah kita ukir, tapi juga memperbarui janjiku untuk terus ada di sisimu. Menjaga senyumanmu, menggenggam erat tanganmu di kala badai, dan terus mencintaimu lebih dari hari kemarin.",
  ],
  signature: {
    closing: "Dengan segenap jiwa dan cintaku selamanya,",
    authorName: "Nayyy",
    partnerName: "Keillaa",
    date: "26 September 2026",
    monogram: "N&K",
  },
  photo: {
    src: "/images/photos/photo-journey-hero-left.webp",
    alt: "Nayyy & Keillaa anniversary keepsake photo",
    caption: "Forever & Always",
    date: "26-09-26",
    rotation: -3,
  },
  decorations: {
    hasWaxSealWeight: true,
    hasFallingPetals: true,
    hasFoldCreases: true,
  },
  closingVow: "Happy Anniversary, cintaku. Menuju selamanya bersama.",
  replayButtonLabel: "ULANGI KISAH KITA ↺",
  backButtonLabel: "BACK ◂",
};
