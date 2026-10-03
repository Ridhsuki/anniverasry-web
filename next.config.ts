import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    // Allow optimized images from external domains (add as needed)
    remotePatterns: [],
    // Use modern image formats for better compression
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for fixed-size images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Configured qualities for Next.js image optimization
    qualities: [75, 85, 90],
  },

  // Experimental features for performance
  experimental: {
    // Optimize CSS for production builds
    optimizeCss: true,
  },

  // Compiler options for performance
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
