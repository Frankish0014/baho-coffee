"use client";

import { useEffect, useRef } from "react";

export default function WhiteFavicon() {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    // Function to create white favicon - runs immediately and consistently
    const createWhiteFavicon = () => {
      if (!isMountedRef.current || typeof document === "undefined") return;

      // Create canvas to apply white filter
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 64; // Higher resolution for better quality
      canvas.height = 64;

      if (!ctx) return;

      // Load the logo image
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        if (!isMountedRef.current || !document.head) return;
        try {
          // Draw image to canvas
          ctx.drawImage(img, 0, 0, 64, 64);

          // Get image data
          const imageData = ctx.getImageData(0, 0, 64, 64);
          const data = imageData.data;

          // Apply white filter: convert to white while preserving shape
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // If pixel has content (not fully transparent)
            if (a > 10) {
              // Make it white, preserving the shape based on alpha
              const whiteValue = 255; // Pure white

              data[i] = whiteValue;     // R
              data[i + 1] = whiteValue; // G
              data[i + 2] = whiteValue; // B
              // Use original alpha but ensure it's visible
              data[i + 3] = Math.max(a, 200); // Ensure good visibility
            }
          }

          ctx.putImageData(imageData, 0, 0);

          // Create favicon from canvas
          const favicon = canvas.toDataURL("image/png");

          // Create or update our own favicon link without touching Next.js-managed tags
          let link =
            document.querySelector<HTMLLinkElement>(
              'link[rel="icon"][data-white-favicon="true"]'
            ) || document.createElement("link");

          link.rel = "icon";
          link.type = "image/png";
          link.href = favicon;
          link.sizes = "32x32";
          link.setAttribute("data-white-favicon", "true");

          if (!link.parentNode) {
            document.head.appendChild(link);
          }
        } catch {
          // Ignore DOM errors if component unmounted or head changed
        }
      };

      img.onerror = () => {
        if (!isMountedRef.current || !document.head) return;
        try {
          // Fallback: create a simple white square if image fails to load
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, 64, 64);
          const favicon = canvas.toDataURL("image/png");

          let link =
            document.querySelector<HTMLLinkElement>(
              'link[rel="icon"][data-white-favicon="true"]'
            ) || document.createElement("link");

          link.rel = "icon";
          link.type = "image/png";
          link.href = favicon;
          link.sizes = "32x32";
          link.setAttribute("data-white-favicon", "true");

          if (!link.parentNode) {
            document.head.appendChild(link);
          }
        } catch {
          // Ignore DOM errors if component unmounted
        }
      };

      img.src = "/hero/logo.avif";
    };

    // Handle ready state
    let handleReady: (() => void) | null = null;

    // Run immediately when component mounts
    if (typeof window !== "undefined" && document.readyState === "complete") {
      createWhiteFavicon();
    } else if (typeof window !== "undefined") {
      // If DOM is not ready, wait for it
      handleReady = () => {
        createWhiteFavicon();
        if (handleReady) {
          window.removeEventListener("load", handleReady);
        }
      };
      window.addEventListener("load", handleReady);
      // Also try immediately in case DOM is already ready
      createWhiteFavicon();
    }

    // Re-apply on visibility change to ensure it stays constant
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        createWhiteFavicon();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Re-apply periodically to ensure it stays constant (every 5 seconds)
    const interval = setInterval(createWhiteFavicon, 5000);

    return () => {
      isMountedRef.current = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
      if (typeof window !== "undefined" && handleReady) {
        window.removeEventListener("load", handleReady);
      }
    };
  }, []);

  return null;
}
