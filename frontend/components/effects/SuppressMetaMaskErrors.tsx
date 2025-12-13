"use client";

import { useEffect } from "react";

/**
 * Suppresses MetaMask extension errors from appearing in the console.
 * MetaMask injects itself into all pages, but this website doesn't use it.
 */
export default function SuppressMetaMaskErrors() {
  useEffect(() => {
    // Store original console.error
    const originalError = console.error;
    const originalWarn = console.warn;

    // Override console.error to filter MetaMask errors
    console.error = (...args: any[]) => {
      const message = args.join(" ");
      // Suppress MetaMask-related errors
      if (
        message.includes("MetaMask") ||
        message.includes("Failed to connect to MetaMask") ||
        message.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") ||
        message.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn")
      ) {
        return; // Suppress the error
      }
      originalError.apply(console, args);
    };

    // Override console.warn to filter MetaMask warnings
    console.warn = (...args: any[]) => {
      const message = args.join(" ");
      // Suppress MetaMask-related warnings
      if (
        message.includes("MetaMask") ||
        message.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") ||
        message.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn")
      ) {
        return; // Suppress the warning
      }
      originalWarn.apply(console, args);
    };

    // Prevent MetaMask from trying to connect if window.ethereum exists
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const originalRequest = (window as any).ethereum.request;
      if (originalRequest) {
        (window as any).ethereum.request = (...args: any[]) => {
          // Silently reject MetaMask requests
          return Promise.reject(new Error("MetaMask not supported on this site"));
        };
      }
    }

    // Cleanup: restore original console methods on unmount
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}

