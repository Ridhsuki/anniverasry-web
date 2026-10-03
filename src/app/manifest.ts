import type { MetadataRoute } from "next";

import { SITE_METADATA } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nayyy & Keillaa — Anniversary Keepsake",
    short_name: SITE_METADATA.title,
    description: SITE_METADATA.description,
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
