import { Metadata } from "next";
import ProducersPageClient from "./ProducersPageClient";

export const metadata: Metadata = {
  title: "Digital Marketing for Producers",
  description:
    "Resources and tools for coffee producers. Learn digital marketing strategies, improve your online presence, and grow your business.",
};

export default function ProducersPage() {
  return <ProducersPageClient />;
}

