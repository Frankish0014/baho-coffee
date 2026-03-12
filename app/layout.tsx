import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
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
    default: "BAHO COFFEE COMPANY LTD | RWANDA Specialty Coffee Company",
    template: "%s | BAHO COFFEE COMPANY LTD",
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
    siteName: "BAHO COFFEE COMPANY LTD",
    title: "BAHO COFFEE COMPANY LTD | RWANDA Specialty Coffee Company",
    description:
      "Exporting specialty coffee from Rwanda. Discover our washing stations and meet our farmers.",
    images: [
      {
        url: "/hero/BAHOCOFFEECOMPANYLTD._29.jpg",
        width: 1200,
        height: 630,
        alt: "BAHO COFFEE COMPANY LTD | RWANDA Specialty Coffee Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BAHO COFFEE COMPANY LTD | RWANDA Specialty Coffee Company",
    description:
      "Exporting specialty coffee from Rwanda. Discover our washing stations and meet our farmers.",
    images: ["/hero/BAHOCOFFEECOMPANYLTD._29.jpg"],
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
          id="chunk-load-error-handler"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var k='chunk-error-reload';
                function r(m){
                  if(typeof m!=='string')return;
                  if(m.indexOf('ChunkLoadError')!==-1||m.indexOf('Loading chunk')!==-1||m.indexOf('Failed to fetch dynamically imported module')!==-1){
                    if(!sessionStorage.getItem(k)){sessionStorage.setItem(k,'1');location.reload();}
                    else{sessionStorage.removeItem(k);}
                  }
                }
                window.addEventListener('error',function(e){r(e.message);});
                window.addEventListener('unhandledrejection',function(e){r(String(e.reason&&e.reason.message||e.reason||''));});
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

