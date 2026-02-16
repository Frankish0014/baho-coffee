import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AIAgentWidget from "@/components/ui/AIAgentWidget";
import CursorTrail from "@/components/effects/CursorTrail";
import SuppressMetaMaskErrors from "@/components/effects/SuppressMetaMaskErrors";
import ChunkLoadErrorHandler from "@/components/effects/ChunkLoadErrorHandler";
import CookieConsent from "@/components/analytics/CookieConsent";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import WhiteFavicon from "@/components/ui/WhiteFavicon";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baho Coffee - Rwandan Specialty Coffee",
    template: "%s | Baho Coffee",
  },
  description:
    "Baho Coffee exports specialty coffee from Rwanda. Discover our washing stations, meet our farmers, and experience the finest Rwandan coffee.",
  keywords: [
    "Rwanda coffee",
    "specialty coffee",
    "Baho Coffee",
    "green coffee exporter",
    "Rwandan coffee",
    "women in coffee",
    "coffee washing stations",
  ],
  authors: [{ name: "Baho Coffee" }],
  creator: "Baho Coffee",
  publisher: "Baho Coffee",
  metadataBase: new URL("https://bahocoffee.com"),
  // Icons - WhiteFavicon component overrides for dark mode; this prevents 404
  icons: {
    icon: [{ url: "/hero/logo.avif", type: "image/avif" }],
    apple: [{ url: "/hero/logo.avif", type: "image/avif" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bahocoffee.com",
    siteName: "Baho Coffee",
    title: "Baho Coffee - Rwandan Specialty Coffee",
    description:
      "Exporting specialty coffee from Rwanda. Discover our washing stations and meet our farmers.",
    images: [
      {
        url: "/hero/BAHO_29.jpg",
        width: 1200,
        height: 630,
        alt: "Baho Coffee - Rwandan Specialty Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baho Coffee - Rwandan Specialty Coffee",
    description:
      "Exporting specialty coffee from Rwanda. Discover our washing stations and meet our farmers.",
    images: ["/hero/BAHO_29.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Google verification code - add your actual code when available
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        suppressHydrationWarning
      >
        <Script
          id="suppress-metamask-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Suppress MetaMask errors immediately, before React loads
                (function() {
                  var originalError = console.error;
                  var originalWarn = console.warn;
                  
                  function isMetaMaskError(message) {
                    if (!message) return false;
                    var lower = String(message).toLowerCase();
                    return lower.includes('metamask') ||
                           lower.includes('failed to connect to metamask') ||
                           lower.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
                           lower.includes('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn') ||
                           lower.includes('object.connect') ||
                           lower.includes('scripts/inpage.js');
                  }
                  
                  console.error = function() {
                    var message = Array.prototype.slice.call(arguments).join(' ');
                    if (!isMetaMaskError(message)) {
                      originalError.apply(console, arguments);
                    }
                  };
                  
                  console.warn = function() {
                    var message = Array.prototype.slice.call(arguments).join(' ');
                    if (!isMetaMaskError(message)) {
                      originalWarn.apply(console, arguments);
                    }
                  };
                  
                  // Prevent window.ethereum errors
                  if (window.ethereum) {
                    var originalRequest = window.ethereum.request;
                    if (originalRequest) {
                      window.ethereum.request = function() {
                        return Promise.reject(new Error('MetaMask not supported'));
                      };
                    }
                  }
                })();
              })();
            `,
          }}
        />
        <Script
          id="white-favicon-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function createWhiteFavicon() {
                  var existingLinks = document.querySelectorAll('link[rel*="icon"], link[rel*="shortcut"]');
                  existingLinks.forEach(function(link) { link.remove(); });
                  
                  var canvas = document.createElement("canvas");
                  var ctx = canvas.getContext("2d");
                  canvas.width = 64;
                  canvas.height = 64;
                  
                  if (!ctx) return;
                  
                  var img = new Image();
                  img.crossOrigin = "anonymous";
                  
                  img.onload = function() {
                    ctx.drawImage(img, 0, 0, 64, 64);
                    var imageData = ctx.getImageData(0, 0, 64, 64);
                    var data = imageData.data;
                    
                    for (var i = 0; i < data.length; i += 4) {
                      var a = data[i + 3];
                      if (a > 10) {
                        data[i] = 255;
                        data[i + 1] = 255;
                        data[i + 2] = 255;
                        data[i + 3] = Math.max(a, 200);
                      }
                    }
                    
                    ctx.putImageData(imageData, 0, 0);
                    var favicon = canvas.toDataURL("image/png");
                    
                    var link = document.createElement("link");
                    link.rel = "icon";
                    link.type = "image/png";
                    link.href = favicon;
                    link.sizes = "32x32";
                    document.head.appendChild(link);
                    
                    var link16 = document.createElement("link");
                    link16.rel = "icon";
                    link16.type = "image/png";
                    link16.href = favicon;
                    link16.sizes = "16x16";
                    document.head.appendChild(link16);
                    
                    var appleLink = document.createElement("link");
                    appleLink.rel = "apple-touch-icon";
                    appleLink.href = favicon;
                    document.head.appendChild(appleLink);
                    
                    var shortcutLink = document.createElement("link");
                    shortcutLink.rel = "shortcut icon";
                    shortcutLink.href = favicon;
                    document.head.appendChild(shortcutLink);
                  };
                  
                  img.onerror = function() {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, 64, 64);
                    var favicon = canvas.toDataURL("image/png");
                    var link = document.createElement("link");
                    link.rel = "icon";
                    link.type = "image/png";
                    link.href = favicon;
                    document.head.appendChild(link);
                  };
                  
                  img.src = "/hero/logo.avif";
                }
                
                if (document.readyState === "loading") {
                  document.addEventListener("DOMContentLoaded", createWhiteFavicon);
                } else {
                  createWhiteFavicon();
                }
                
                setInterval(createWhiteFavicon, 5000);
              })();
            `,
          }}
        />
        <WhiteFavicon />
        <ThemeProvider>
          <AnalyticsProvider />
          <SuppressMetaMaskErrors />
          <ChunkLoadErrorHandler />
          <CursorTrail />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
          <AIAgentWidget />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}

