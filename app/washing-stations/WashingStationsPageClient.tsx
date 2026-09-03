"use client";

import WashingStationsList from "@/components/washing-stations/WashingStationsList";
import { PageAnimation, PageHeader } from "@/components/ui/PageAnimation";

export default function WashingStationsPageClient() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Our Washing Stations"
          description="Discover our 20 washing stations across Rwanda. Each station has its own unique story and contributes to the exceptional quality of our coffee."
        />
        <PageAnimation direction="up" delay={0.2}>
          <WashingStationsList />
        </PageAnimation>
      </div>
    </div>
  );
}

