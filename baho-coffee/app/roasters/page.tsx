import { Metadata } from "next";
import RoastersPageClient from "./RoastersPageClient";

export const metadata: Metadata = {
  title: "Roaster Portal",
  description:
    "Engage with Baho Coffee as a roaster. Access exclusive resources, connect with our team, and discover partnership opportunities.",
};

export default function RoastersPage() {
  return <RoastersPageClient />;
}

