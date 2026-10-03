// ─────────────────────────────────────────────────────────────
// Root Layout
// Foundation layout for the entire anniversary website.
// Configures Google Fonts, design tokens, metadata, and viewport.
// ─────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from "next";

import { SITE_METADATA } from "@/constants/site";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

// ── Metadata ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: SITE_METADATA.title,
    template: `%s — ${SITE_METADATA.title}`,
  },
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE_METADATA.url),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_METADATA.title,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_METADATA.url,
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    siteName: SITE_METADATA.title,
    images: [
      {
        url: "/images/photos/photo-intro-couple-standing.webp",
        width: 800,
        height: 1067,
        alt: "Nayyy & Keillaa Anniversary Keepsake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: ["/images/photos/photo-intro-couple-standing.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ── Viewport ────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
      className={`${fontVariables} antialiased`}
    >
      <body className="min-h-dvh overflow-x-hidden antialiased bg-bg-primary text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#f9edd8] focus:text-[#1a1209] focus:border focus:border-[#c9904a] focus:rounded-sm focus:shadow-lg focus:font-serif focus:text-sm focus:tracking-wider focus:outline-none focus:ring-2 focus:ring-gold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
