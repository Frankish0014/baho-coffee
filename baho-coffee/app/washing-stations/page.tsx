import { Metadata } from "next";
import WashingStationsPageClient from "./WashingStationsPageClient";

export const metadata: Metadata = {
  title: "Washing Stations",
  description:
    "Explore our network of washing stations across Rwanda. Learn about each station's location, processing methods, and the farmers we work with.",
};

export default function WashingStationsPage() {
  return <WashingStationsPageClient />;
}

