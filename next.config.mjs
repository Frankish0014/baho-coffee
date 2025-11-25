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
    // Exclude Sanity config files from the build
    config.resolve.alias = {
      ...config.resolve.alias,
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
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-leaflet"],
  },
};

export default nextConfig;

