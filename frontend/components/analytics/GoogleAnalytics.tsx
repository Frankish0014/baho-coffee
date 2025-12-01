"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

interface GoogleAnalyticsProps {
  gaId?: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const measurementId = gaId || process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!measurementId) {
      console.log("Google Analytics ID not configured");
      return;
    }

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      page_path: window.location.pathname,
    });
  }, [measurementId]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Helper function to track page views
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_path: url,
    });
  }
}

// Helper function to track events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

