import { Metadata } from "next";
import ProducersPageClient from "./ProducersPageClient";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resources for Coffee Producers",
  description:
    "Practical resources for coffee producers working with Baho Coffee in Rwanda, including ways to present their coffee online.",
  path: "/producers",
  keywords: ["coffee producers Rwanda", "Baho Coffee farmers"],
});

export default function ProducersPage() {
  return <ProducersPageClient />;
}

