"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import GoogleAnalytics, { trackPageView } from "./GoogleAnalytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Check cookie consent before tracking
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      try {
        const preferences = JSON.parse(consent);
        if (preferences.analytics) {
          // Track page view when route changes
          trackPageView(pathname);
        }
      } catch (e) {
        // If consent is invalid, don't track
      }
    }
  }, [pathname]);

  // Only load Google Analytics if consent is given
  const consent = typeof window !== "undefined" ? localStorage.getItem("cookie-consent") : null;
  let shouldLoadAnalytics = false;

  if (consent) {
    try {
      const preferences = JSON.parse(consent);
      shouldLoadAnalytics = preferences.analytics === true;
    } catch (e) {
      shouldLoadAnalytics = false;
    }
  }

  return shouldLoadAnalytics ? <GoogleAnalytics /> : null;
}

