"use client";

import { useEffect } from "react";

const CHUNK_RELOAD_KEY = "chunk-error-reload";

/**
 * Handles ChunkLoadError (common after deployments when cached HTML references old chunks).
 * Auto-reloads once to fetch fresh chunks. Uses sessionStorage to prevent reload loops.
 */
export default function ChunkLoadErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const message =
        event instanceof ErrorEvent
          ? event.message
          : String((event as PromiseRejectionEvent).reason?.message ?? (event as PromiseRejectionEvent).reason);

      if (
        typeof message === "string" &&
        (message.includes("ChunkLoadError") || message.includes("Loading chunk") || message.includes("Failed to fetch dynamically imported module"))
      ) {
        const hasReloaded = sessionStorage.getItem(CHUNK_RELOAD_KEY);
        if (!hasReloaded) {
          sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
          window.location.reload();
        } else {
          sessionStorage.removeItem(CHUNK_RELOAD_KEY);
        }
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return null;
}
