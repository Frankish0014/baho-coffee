import { Metadata } from "next";
import MediaPageClient from "./MediaPageClient";

export const metadata: Metadata = {
  title: "Media & Downloads",
  description:
    "Browse our photo gallery, watch videos, and download reports and certifications from Baho Coffee.",
};

export default function MediaPage() {
  return <MediaPageClient />;
}

