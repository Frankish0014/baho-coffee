"use client";

import { useEffect } from "react";

export default function LeafletLoader() {
  useEffect(() => {
    // Dynamically import Leaflet CSS to avoid SSR issues
    if (typeof window !== "undefined") {
      // Fix Leaflet default marker icon issue
      delete (window as any).L?.Icon?.Default?.prototype?._getIconUrl;
      
      // Import CSS
      import("leaflet/dist/leaflet.css").catch(() => {
        // CSS already loaded or failed, that's okay
      });
      
      // Fix marker icons
      import("leaflet").then((L) => {
        if (L.default && L.default.Icon && L.default.Icon.Default) {
          L.default.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          });
        }
      }).catch(() => {
        // Leaflet not loaded yet, that's okay
      });
    }
  }, []);

  return null;
}

