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
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
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
      className={`${fontVariables} antialiased`}
    >
      <body className="min-h-dvh overflow-x-hidden antialiased bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
