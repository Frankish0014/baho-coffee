import { Metadata } from "next";
import ProducerResources from "@/components/producers/ProducerResources";

export const metadata: Metadata = {
  title: "Digital Marketing for Producers",
  description:
    "Resources and tools for coffee producers. Learn digital marketing strategies, improve your online presence, and grow your business.",
};

export default function ProducersPage() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <ProducerResources />
    </div>
  );
}

