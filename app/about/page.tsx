import { Metadata } from "next";
import { pageMetadata } from "@/backend/lib/seo";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = pageMetadata({
  title: "About Baho Coffee",
  description:
    "Baho Coffee Company Ltd exports specialty coffee from Rwanda and works with farmers and washing stations across the country.",
  path: "/about",
  keywords: ["about Baho Coffee", "Rwandan coffee exporter", "coffee company Kigali"],
});

export default function AboutPage() {
  return <AboutPageClient />;
}

