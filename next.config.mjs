import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  // Increase timeout for chunk loading
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  webpack: (config, { isServer, dev }) => {
    // Configure path aliases for new structure
    const existingAlias = config.resolve.alias || {};
    config.resolve.alias = {
      ...existingAlias,
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'frontend/components'),
      '@/lib': path.resolve(__dirname, 'backend/lib'),
      '@/types': path.resolve(__dirname, 'frontend/types'),
      '@/backend': path.resolve(__dirname, 'backend'),
      'sanity.config': false,
      'sanity.cli': false,
    };
    
    // Optimize chunk loading in development
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
      };
    }
    
    return config;
  },
  images: {
    domains: [
      "images.unsplash.com",
      "instagram.com",
      "cdn.instagram.com",
      "scontent.cdninstagram.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.instagram.com",
      },
      {
        protocol: "https",
        hostname: "**.cdn.instagram.com",
      },
    ],
    // Allow unoptimized images in development to avoid 400 errors for missing images
    unoptimized: process.env.NODE_ENV === "development",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-leaflet"],
  },
};

export default nextConfig;

