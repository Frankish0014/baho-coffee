"use client";

import { useEffect } from "react";

/**
 * Suppresses MetaMask extension errors from appearing in the console.
 * MetaMask injects itself into all pages, but this website doesn't use it.
 */
export default function SuppressMetaMaskErrors() {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;

    // Helper function to check if message is MetaMask-related
    const isMetaMaskError = (message: string): boolean => {
      const lowerMessage = message.toLowerCase();
      return (
        lowerMessage.includes("metamask") ||
        lowerMessage.includes("failed to connect to metamask") ||
        lowerMessage.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") ||
        lowerMessage.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn") ||
        lowerMessage.includes("object.connect") ||
        lowerMessage.includes("scripts/inpage.js")
      );
    };

    // Override console.error to filter MetaMask errors
    console.error = (...args: any[]) => {
      const message = args.map(arg => {
        if (typeof arg === 'string') return arg;
        if (arg?.message) return arg.message;
        if (arg?.stack) return arg.stack;
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }).join(" ");
      
      // Suppress MetaMask-related errors
      if (isMetaMaskError(message)) {
        return; // Suppress the error
      }
      originalError.apply(console, args);
    };

    // Override console.warn to filter MetaMask warnings
    console.warn = (...args: any[]) => {
      const message = args.map(arg => {
        if (typeof arg === 'string') return arg;
        if (arg?.message) return arg.message;
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }).join(" ");
      
      // Suppress MetaMask-related warnings
      if (isMetaMaskError(message)) {
        return; // Suppress the warning
      }
      originalWarn.apply(console, args);
    };

    // Also filter console.log for MetaMask messages
    console.log = (...args: any[]) => {
      const message = args.map(arg => {
        if (typeof arg === 'string') return arg;
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }).join(" ");
      
      // Suppress MetaMask-related logs
      if (isMetaMaskError(message)) {
        return; // Suppress the log
      }
      originalLog.apply(console, args);
    };

    // Prevent MetaMask from trying to connect if window.ethereum exists
    if (typeof window !== "undefined") {
      // Intercept window.ethereum before MetaMask can use it
      const ethereumDescriptor = Object.getOwnPropertyDescriptor(window, 'ethereum');
      
      if ((window as any).ethereum) {
        const originalRequest = (window as any).ethereum?.request;
        if (originalRequest) {
          (window as any).ethereum.request = (...args: any[]) => {
            // Silently reject MetaMask requests without logging
            return Promise.reject(new Error("MetaMask not supported"));
          };
        }
      }

      // Also prevent errors from being thrown
      const originalAddEventListener = window.addEventListener;
      window.addEventListener = function(type: string, listener: any, options?: any) {
        if (type === 'error' || type === 'unhandledrejection') {
          const wrappedListener = (event: any) => {
            const errorMessage = event?.message || event?.reason?.message || String(event);
            if (!isMetaMaskError(errorMessage)) {
              listener(event);
            }
          };
          return originalAddEventListener.call(this, type, wrappedListener, options);
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    }

    // Cleanup: restore original console methods on unmount
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
    };
  }, []);

  return null;
}





