// ─────────────────────────────────────────────────────────────
// Journey Scene Data
// Structured content for Scene 3 (Journey) based on docs/references/image-map.md
// and docs/references/screenshots/journey-scene.png.
// Decoupled from JSX for maintainability, type safety, and CMS-readiness.
// ─────────────────────────────────────────────────────────────

export interface JourneyPhotoConfig {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  date?: string;
  frameVariant: "gold" | "polaroid" | "classic" | "filigree";
  aspectRatio: "square" | "portrait" | "landscape" | "auto";
  rotation: number;
  tapeStyle?: "none" | "top-center" | "corners";
}

export interface JourneyMilestone {
  id: string;
  chapter: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  photo: JourneyPhotoConfig;
  tags?: string[];
}

export interface JourneyHeroCluster {
  left: {
    headline: string;
    subtitle: string;
    description: string;
    photo: JourneyPhotoConfig;
  };
  right: {
    soundtrackLabel: string;
    songTitle: string;
    artist: string;
    notesDescription: string;
    photos: JourneyPhotoConfig[];
  };
}

export interface JourneySceneContent {
  title: string;
  subtitle: string;
  backButtonLabel: string;
  advanceButtonLabel: string;
  timelineHeading: string;
  timelineSubtitle: string;
  hero: JourneyHeroCluster;
  milestones: JourneyMilestone[];
}

export const JOURNEY_CONTENT: JourneySceneContent = {
  title: "Our Romantic Journey",
  subtitle: "Nayyy & Keillaa • Yung Kai - 'Blue'",
  backButtonLabel: "BACK ◂",
  advanceButtonLabel: "VIEW OUR MOMENTS ❯",
  timelineHeading: "Chronicles of Our Love",
  timelineSubtitle: "Setiap langkah kecil yang membawa kita pada hari ini",
  hero: {
    left: {
      headline: "Our Journey",
      subtitle: "Yung Kai - 'Blue'",
      description:
        "Sebuah perjalanan rasa yang dimulai dari tatap mata sederhana, tumbuh menjadi komitmen terindah.",
      photo: {
        id: "hero-photo-couple",
        src: "/images/journey/photo-journey-hero-left.webp",
        alt: "Nayyy & Keillaa in Baroque Gilded Frame",
        caption: "Forever With You",
        date: "26-09-26",
        frameVariant: "filigree",
        aspectRatio: "portrait",
        rotation: -1.5,
        tapeStyle: "top-center",
      },
    },
    right: {
      soundtrackLabel: "Our Soundtrack",
      songTitle: "Blue",
      artist: "Yung Kai",
      notesDescription: "Melodi cinta yang selalu berdenting di hati kita.",
      photos: [
        {
          id: "hero-photo-tilted-back",
          src: "/images/journey/photo-journey-right-back.webp",
          alt: "Sweet moment together",
          frameVariant: "gold",
          aspectRatio: "portrait",
          rotation: 6,
          tapeStyle: "corners",
        },
        {
          id: "hero-photo-front-square",
          src: "/images/journey/photo-journey-right-front.webp",
          alt: "Candid smile portrait",
          caption: "Forever & Always",
          frameVariant: "filigree",
          aspectRatio: "square",
          rotation: -3,
          tapeStyle: "none",
        },
      ],
    },
  },
  milestones: [
    {
      id: "journey-chapter-1",
      chapter: "Chapter 01",
      date: "14 Februari 2024",
      title: "Awal Mula Kisah Kita",
      subtitle: "The First Spark",
      description:
        "Pertemuan yang tak pernah disangka, berawal dari tatapan malu-malu dan senyum canggung yang menghangatkan suasana. Dari situlah lembaran pertama kisah cinta kita mulai tertulis.",
      quote: "Every love story is beautiful, but ours is my favorite.",
      photo: {
        id: "milestone-1-photo",
        src: "/images/journey/photo-journey-first-meet.webp",
        alt: "Hari pertama kita bertemu",
        caption: "Hari Pertama Kisah Kita",
        date: "14-02-24",
        frameVariant: "filigree",
        aspectRatio: "portrait",
        rotation: -2,
        tapeStyle: "top-center",
      },
      tags: ["First Date", "The Spark", "Unforgettable"],
    },
    {
      id: "journey-chapter-2",
      chapter: "Chapter 02",
      date: "21 Mei 2024",
      title: "Langkah-Langkah Kecil Berdua",
      subtitle: "Little Adventures",
      description:
        "Menyusuri jalanan kota di sore hari, berbagi cerita tentang mimpi dan masa kecil, menikmati kopi hangat di tempat rahasia kita. Di setiap tawa lepasmu, aku menemukan rumah.",
      quote: "It's not where we go, but who we walk with.",
      photo: {
        id: "milestone-2-photo",
        src: "/images/journey/photo-journey-walk.webp",
        alt: "Menjelajahi sudut kota bersama",
        caption: "Senja di Sudut Kota",
        date: "21-05-24",
        frameVariant: "gold",
        aspectRatio: "landscape",
        rotation: 2,
        tapeStyle: "corners",
      },
      tags: ["Adventures", "City Walks", "Laughter"],
    },
    {
      id: "journey-chapter-3",
      chapter: "Chapter 03",
      date: "26 September 2024",
      title: "Melodi di Antara Ribuan Rasa",
      subtitle: "Our Soundtrack",
      description:
        "Melewati berbagai pasang surut bersama, saling menguatkan saat salah satu lelah. Lagu Bruno Mars yang berdengung di mobil menjadi saksi bisu betapa dalamnya rasa ini tumbuh.",
      quote: "'Cause I'd risk it all for you...",
      photo: {
        id: "milestone-3-photo",
        src: "/images/journey/photo-journey-anniversary.webp",
        alt: "Perayaan satu tahun perjalanan cinta",
        caption: "Melodi Abadi Kita",
        date: "26-09-24",
        frameVariant: "filigree",
        aspectRatio: "portrait",
        rotation: -2.5,
        tapeStyle: "top-center",
      },
      tags: ["Anniversary", "Bruno Mars", "Deep Love"],
    },
    {
      id: "journey-chapter-4",
      chapter: "Chapter 04",
      date: "26 September 2026 & Seterusnya",
      title: "Janji untuk Hari Esok",
      subtitle: "To Infinity & Beyond",
      description:
        "Bukan sekadar mengingat kenangan manis yang telah berlalu, tetapi merayakan janji suci untuk terus berjalan bergandengan tangan menghadapi masa depan apa pun yang menanti.",
      quote: "Today, tomorrow, and every single lifetime after.",
      photo: {
        id: "milestone-4-photo",
        src: "/images/journey/photo-journey-future.webp",
        alt: "Genggaman tangan menuju masa depan",
        caption: "Janji Selamanya",
        date: "26-09-26",
        frameVariant: "polaroid",
        aspectRatio: "portrait",
        rotation: 3,
        tapeStyle: "corners",
      },
      tags: ["Promise", "Forever", "Our Future"],
    },
  ],
};
