"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Coffee, Users, Calendar } from "lucide-react";
import { WashingStation } from "@/types";
import { getAllWashingStations } from "@/lib/washingStationsData";

// Get all washing stations
const stations = getAllWashingStations();

export default function WashingStationsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {stations.map((station, index) => (
        <StationCard key={station.id} station={station} index={index} />
      ))}
    </div>
  );
}

function StationCard({
  station,
  index,
}: {
  station: WashingStation;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = station.photos?.[0] || `/washing-stations/${station.slug}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="h-48 relative overflow-hidden rounded-t-lg">
        {!imageError && station.photos?.length !== 0 ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={station.name}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
              aria-hidden
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-800">
            <Coffee className="w-16 h-16 text-white/30" />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          {station.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {station.description}
        </p>

        <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>{station.location.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Coffee className="w-4 h-4" />
            <span>Processing: {station.processingMethods.join(", ")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Capacity: {station.annualCapacity}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Established: {station.established}</span>
          </div>
        </div>

        <Link
          href={`/washing-stations/${station.slug}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
        >
          Learn More →
        </Link>
      </div>
    </motion.div>
  );
}

