import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CursorTrail from "@/components/effects/CursorTrail";
import BackgroundParticles from "@/components/effects/BackgroundParticles";

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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Baho Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baho Coffee - Rwandan Specialty Coffee",
    description:
      "Exporting specialty coffee from Rwanda. Discover our washing stations and meet our farmers.",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans relative bg-[#050302] text-gray-900 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <BackgroundParticles />
          <CursorTrail />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

