import { Metadata } from "next";
import { pageMetadata } from "@/backend/lib/seo";
import WashingStationsPageClient from "./WashingStationsPageClient";

export const metadata: Metadata = pageMetadata({
  title: "Coffee Washing Stations in Rwanda",
  description:
    "Explore Baho Coffee washing stations across Rwanda. See location, altitude, processing methods, and the farmers behind each station.",
  path: "/washing-stations",
  keywords: ["coffee washing station Rwanda", "Baho Coffee stations", "Rwandan coffee origin"],
});

export default function WashingStationsPage() {
  return <WashingStationsPageClient />;
}

