"use client";

import dynamic from "next/dynamic";

// Dynamically import map component to avoid chunk loading issues
const WashingStationsMap = dynamic(
  () => import("@/components/washing-stations/WashingStationsMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-12">
        <p className="text-gray-500">Loading map...</p>
      </div>
    ),
  }
);

export default function WashingStationsMapWrapper() {
  return <WashingStationsMap />;
}

