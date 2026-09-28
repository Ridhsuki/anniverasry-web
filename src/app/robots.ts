import type { MetadataRoute } from "next";

import { SITE_METADATA } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/", // Private commemorative celebration website
    },
    sitemap: `${SITE_METADATA.url}/sitemap.xml`,
  };
}
