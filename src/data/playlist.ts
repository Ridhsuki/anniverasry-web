// ─────────────────────────────────────────────────────────────
// Playlist Scene Data
// Structured content for Scene 5 (Playlist) based on
// docs/references/image-map.md and docs/references/screenshots/playlist-scene.png.
// Decoupled from JSX for maintainability, type safety, and CMS-readiness.
// ─────────────────────────────────────────────────────────────

export interface TrackMetadata {
  album?: string;
  year?: string;
  note?: string;
  bpm?: number;
  key?: string;
}

export interface PlaylistTrack {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  audioSrc: string;
  duration: string;
  durationSeconds: number;
  mood: string;
  metadata?: TrackMetadata;
}

export interface PlaylistLetterContent {
  title: string;
  salutation: string;
  body: string;
  closing: string;
  signature: string;
}

export interface PlaylistPhotoAltar {
  photoSrc: string;
  photoAlt: string;
  caption: string;
  date: string;
}

export interface PlaylistSceneContent {
  headline: string;
  subtitle: string;
  backButtonLabel: string;
  advanceButtonLabel: string;
  letter: PlaylistLetterContent;
  photoAltar: PlaylistPhotoAltar;
  tracks: PlaylistTrack[];
}

export const PLAYLIST_CONTENT: PlaylistSceneContent = {
  headline: "Nayyy & Keillaa",
  subtitle: "Our Cherished Soundtrack & Love Letter",
  backButtonLabel: "BACK ◂",
  advanceButtonLabel: "CONTINUE TO THE GIFT ❯",
  letter: {
    title: "Surat Cinta untukmu",
    salutation: "Happy anniversary, sayang.",
    body: "Terima kasih ya sudah mau berjalan sejauh ini sama aku, melewati banyak hal baik dan sulit sama-sama. Hadirnya kamu bikin hari-hari aku jauhan lebih berarti dan berwarna. Aku bersyukur banget bisa punya kamu di hidupku. Semoga kita bisa terus saling jaga, saling memahami, dan makin kuat menghadapi hari esok bersama.",
    closing: "Selamanya milikmu,",
    signature: "Nayyy & Keillaa ♥ 26-09-26",
  },
  photoAltar: {
    photoSrc: "/images/playlist/photo-playlist-altar.webp",
    photoAlt: "Nayyy & Keillaa Portrait in Baroque Gold Frame",
    caption: "Blue With You",
    date: "26-09-26",
  },
  tracks: [
    {
      id: "track-blue",
      title: "Blue",
      artist: "Yung Kai",
      coverImage: "/images/playlist/cover-blue.webp",
      audioSrc: "/audio/bgm/soundtrack-blue.mp3",
      duration: "3:41",
      durationSeconds: 221,
      mood: "Dreamy & Tender",
      metadata: {
        album: "Blue - Single",
        year: "2024",
        note: "Your world is my world and your home is my home, melodi terindah kita berdua.",
      },
    },
    {
      id: "track-until-i-found-you",
      title: "Until I Found You",
      artist: "Stephen Sanchez",
      coverImage: "/images/playlist/cover-until-i-found-you.webp",
      audioSrc: "/audio/bgm/soundtrack-until-i-found-you.mp3",
      duration: "2:58",
      durationSeconds: 178,
      mood: "Vintage Nostalgia",
      metadata: {
        album: "Memories In Sepia",
        year: "2024",
        note: "Mengingatkan pada debar pertama kali mata kita saling menatap.",
      },
    },
    {
      id: "track-golden-hour",
      title: "Golden Hour",
      artist: "JVKE",
      coverImage: "/images/playlist/cover-golden-hour.webp",
      audioSrc: "/audio/bgm/soundtrack-golden-hour.mp3",
      duration: "3:29",
      durationSeconds: 209,
      mood: "Euphoric & Dreamy",
      metadata: {
        album: "Sunset Conversations",
        year: "2024",
        note: "Senja terindah saat kita duduk memandang langit berganti jingga.",
      },
    },
    {
      id: "track-die-with-a-smile",
      title: "Die With A Smile",
      artist: "Lady Gaga & Bruno Mars",
      coverImage: "/images/playlist/cover-die-with-a-smile.webp",
      audioSrc: "/audio/bgm/soundtrack-die-with-a-smile.mp3",
      duration: "4:11",
      durationSeconds: 251,
      mood: "Timeless Ballad",
      metadata: {
        album: "Forever & Always",
        year: "2024",
        note: "Janji untuk saling menggenggam dalam suka maupun duka.",
      },
    },
  ],
};
