// ─────────────────────────────────────────────────────────────
// Gallery Scene Data
// Structured content for Scene 4 (Gallery / Moments) based on
// docs/references/image-map.md and docs/references/screenshots/gallery-scene.png.
// Decoupled from JSX for maintainability, type safety, and CMS-readiness.
// ─────────────────────────────────────────────────────────────

export interface GallerySticker {
  id: string;
  type: "saturn" | "whale" | "planet" | "heart-pair" | "ribbon" | "rose-sprig" | "heart-pin";
  positionClasses: string;
  label: string;
  rotation?: number;
  scale?: number;
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date: string;
  rotation: number;
  tapeStyle: "none" | "top-center" | "corners";
  aspectRatio: "square" | "portrait" | "landscape" | "auto";
  frameVariant: "polaroid" | "gold" | "classic" | "filigree";
  pinVariant?: "red-heart" | "gold-pin" | "none";
  location?: string;
  storySnippet?: string;
}

export interface GallerySceneContent {
  title: string;
  subtitle: string;
  backButtonLabel: string;
  advanceButtonLabel: string;
  dateText: string;
  photos: GalleryPhotoItem[];
  ambientStickers: GallerySticker[];
}

export const GALLERY_CONTENT: GallerySceneContent = {
  title: "Happy Anniversary",
  subtitle: "Our Cherished Moments & Memories",
  backButtonLabel: "BACK ◂",
  advanceButtonLabel: "CONTINUE TO PLAYLIST ❯",
  dateText: "26-09-26",
  photos: [
    // ── Row 1 (Top 4 Polaroids) ─────────────────────────────
    {
      id: "gallery-photo-1",
      src: "/images/gallery/photo-gallery-smile.webp",
      alt: "Senyuman manis saat pertama kali jalan bersama",
      caption: "Senyuman Pertama",
      date: "26-09-23",
      rotation: -3.5,
      tapeStyle: "corners",
      aspectRatio: "portrait",
      frameVariant: "polaroid",
      pinVariant: "red-heart",
      location: "Taman Kota",
      storySnippet: "Hari pertama saat kita mulai saling mengenal dunia satu sama lain dengan segala canda tawanya.",
    },
    {
      id: "gallery-photo-2",
      src: "/images/gallery/photo-gallery-coffee.webp",
      alt: "Kencan sore di coffee shop favorit",
      caption: "Kencan Sederhana",
      date: "14-11-23",
      rotation: 4.5,
      tapeStyle: "top-center",
      aspectRatio: "square",
      frameVariant: "polaroid",
      pinVariant: "none",
      location: "Kedai Kopi Sudut",
      storySnippet: "Hanya segelas kopi hangat dan obrolan tentang masa depan yang membuat kita lupa waktu berjam-jam.",
    },
    {
      id: "gallery-photo-3",
      src: "/images/gallery/photo-gallery-sunset.webp",
      alt: "Siluet berdua saat matahari terbenam",
      caption: "Langit Senja Kita",
      date: "28-01-24",
      rotation: -2.0,
      tapeStyle: "none",
      aspectRatio: "portrait",
      frameVariant: "polaroid",
      pinVariant: "red-heart",
      location: "Bukit Bintang",
      storySnippet: "Melihat gradasi jingga di langit, bersamamu setiap detik terasa tenang dan penuh rasa syukur.",
    },
    {
      id: "gallery-photo-4",
      src: "/images/gallery/photo-gallery-selfie.webp",
      alt: "Selfie konyol dan tawa lepas",
      caption: "Tawa Tanpa Batas",
      date: "14-02-24",
      rotation: 5.0,
      tapeStyle: "corners",
      aspectRatio: "portrait",
      frameVariant: "polaroid",
      pinVariant: "red-heart",
      location: "Pasar Malam",
      storySnippet: "Candaan spontan dan tawa renyahmu yang selalu berhasil menghapus semua lelah di hariku.",
    },

    // ── Row 2 (Bottom 4 Polaroids) ──────────────────────────
    {
      id: "gallery-photo-5",
      src: "/images/gallery/photo-gallery-beach.webp",
      alt: "Berjalan santai di tepi pantai",
      caption: "Menyusuri Pantai",
      date: "21-05-24",
      rotation: 3.0,
      tapeStyle: "top-center",
      aspectRatio: "portrait",
      frameVariant: "polaroid",
      pinVariant: "red-heart",
      location: "Pantai Pasir Putih",
      storySnippet: "Suara deburan ombak lembut dan jejak langkah kaki kita yang saling bersisian di atas pasir.",
    },
    {
      id: "gallery-photo-6",
      src: "/images/gallery/photo-gallery-city.webp",
      alt: "Suasana malam berdua di bawah lampu kota",
      caption: "Di Bawah Lampu Kota",
      date: "18-07-24",
      rotation: -4.0,
      tapeStyle: "corners",
      aspectRatio: "square",
      frameVariant: "polaroid",
      pinVariant: "none",
      location: "Jembatan Kota",
      storySnippet: "Hiruk pikuk kota seketika hening saat tangan kita saling menggenggam erat.",
    },
    {
      id: "gallery-photo-7",
      src: "/images/gallery/photo-gallery-trip.webp",
      alt: "Perjalanan liburan akhir pekan",
      caption: "Petualangan Kecil",
      date: "09-08-24",
      rotation: 2.5,
      tapeStyle: "top-center",
      aspectRatio: "portrait",
      frameVariant: "polaroid",
      pinVariant: "red-heart",
      location: "Puncak Kebun Teh",
      storySnippet: "Menikmati udara sejuk, kabut tipis, dan secangkir teh hangat sambil menertawakan hal-hal kecil.",
    },
    {
      id: "gallery-photo-8",
      src: "/images/gallery/photo-gallery-anniversary.webp",
      alt: "Momen perayaan satu tahun cinta kita",
      caption: "Satu Tahun Bersama",
      date: "26-09-24",
      rotation: -3.0,
      tapeStyle: "corners",
      aspectRatio: "portrait",
      frameVariant: "polaroid",
      pinVariant: "red-heart",
      location: "Makan Malam Spesial",
      storySnippet: "Tiga ratus enam puluh lima hari yang membuktikan bahwa mencintaimu adalah keputusan terindah dalam hidupku.",
    },
  ],
  ambientStickers: [
    {
      id: "sticker-saturn",
      type: "saturn",
      positionClasses: "left-2 sm:left-6 -bottom-6 sm:-bottom-8 w-16 sm:w-20 md:w-24 z-30",
      label: "Golden Saturn Sticker",
      rotation: -12,
    },
    {
      id: "sticker-whale",
      type: "whale",
      positionClasses: "right-2 sm:right-6 top-1/2 -translate-y-1/2 w-14 sm:w-18 md:w-20 z-30",
      label: "Cute Blue Watercolor Whale Sticker",
      rotation: 8,
    },
    {
      id: "sticker-planet",
      type: "planet",
      positionClasses: "right-4 sm:right-8 -bottom-6 sm:-bottom-8 w-14 sm:w-18 md:w-20 z-30",
      label: "Purple Galaxy Swirl Planet Sticker",
      rotation: -6,
    },
    {
      id: "sticker-heart-pair",
      type: "heart-pair",
      positionClasses: "left-1/2 -translate-x-1/2 -bottom-5 sm:-bottom-7 w-12 sm:w-14 z-30",
      label: "Soft Pink Heart Pair Sticker",
      rotation: 4,
    },
    {
      id: "sticker-ribbon-top",
      type: "ribbon",
      positionClasses: "left-1/2 -translate-x-1/2 -top-5 sm:-top-6 w-16 sm:w-20 z-30",
      label: "Red Velvet Ribbon Bow",
      rotation: 0,
    },
  ],
};
