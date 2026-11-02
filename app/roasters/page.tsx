import { Metadata } from "next";
import RoastersPageClient from "./RoastersPageClient";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "For Coffee Roasters",
  description:
    "Partner with Baho Coffee for traceable Rwandan lots, samples, and direct relationships with washing stations.",
  path: "/roasters",
  keywords: ["coffee roasters Rwanda", "specialty coffee sourcing", "Baho Coffee roasters"],
});

export default function RoastersPage() {
  return <RoastersPageClient />;
}

