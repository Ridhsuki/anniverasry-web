import type { MetadataRoute } from "next";

import { SITE_METADATA } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_METADATA.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
