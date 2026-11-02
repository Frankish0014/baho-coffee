import { Metadata } from "next";
import MediaPageClient from "./MediaPageClient";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Media and Downloads",
  description:
    "Photos, video, and downloads from Baho Coffee washing stations, farmers, and specialty coffee work in Rwanda.",
  path: "/media",
  keywords: ["Baho Coffee photos", "Rwanda coffee media"],
});

export default function MediaPage() {
  return <MediaPageClient />;
}

