import { Metadata } from "next";
import WashingStationsList from "@/components/washing-stations/WashingStationsList";

export const metadata: Metadata = {
  title: "Washing Stations",
  description:
    "Explore our network of washing stations across Rwanda. Learn about each station's location, processing methods, and the farmers we work with.",
};

export default function WashingStationsPage() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Our Washing Stations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover the washing stations where our coffee is processed. Each
            station has its own unique story and contributes to the exceptional
            quality of our coffee.
          </p>
        </div>
        <WashingStationsList />
      </div>
    </div>
  );
}

