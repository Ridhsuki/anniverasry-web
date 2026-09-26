// ─────────────────────────────────────────────────────────────
// Root Layout
// Foundation layout for the entire anniversary website.
// Configures fonts, metadata, and viewport settings.
// ─────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SITE_METADATA } from "@/constants/site";

import "./globals.css";

// ── Fonts ──────────────────────────────────────────────────────
// Geist as the system sans-serif base. Swap for custom fonts
// by adding them to /public/fonts and loading via next/font/local.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ── Metadata ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s — ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.url,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: SITE_METADATA.title,
  },
  robots: {
    index: false, // Keep private until ready to share
    follow: false,
  },
};

// ── Viewport ────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  // Prevent auto-zoom on input focus (mobile UX)
  maximumScale: 1,
};

// ── Layout ──────────────────────────────────────────────────────
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
