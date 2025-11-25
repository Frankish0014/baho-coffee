"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { MapPin, Coffee, Users, Calendar, Image as ImageIcon } from "lucide-react";
import { WashingStation } from "@/types";
import LeafletLoader from "./LeafletLoader";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

interface WashingStationDetailsProps {
  station: WashingStation;
}

export default function WashingStationDetails({
  station,
}: WashingStationDetailsProps) {
  const [mounted, setMounted] = useState(false);
  const mapId = useRef(`map-detail-${station.id}-${Math.random().toString(36).substr(2, 9)}`);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRendered = useRef(false);

  useEffect(() => {
    // Only set mounted once to prevent double render
    if (!hasRendered.current) {
      hasRendered.current = true;
      const timer = setTimeout(() => {
        setMounted(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          {station.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {station.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Station Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Station Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span>{station.location.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <span>Established: {station.established}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-5 h-5 text-primary-600" />
                  <span>Annual Capacity: {station.annualCapacity}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Processing Methods</h3>
              <div className="flex flex-wrap gap-2">
                {station.processingMethods.map((method) => (
                  <span
                    key={method}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Coffee Varieties</h3>
              <div className="flex flex-wrap gap-2">
                {station.varieties.map((variety) => (
                  <span
                    key={variety}
                    className="px-4 py-2 bg-coffee-100 dark:bg-coffee-900 text-coffee-700 dark:text-coffee-300 rounded-full"
                  >
                    {variety}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <LeafletLoader />
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            {mounted ? (
              <div 
                ref={containerRef}
                id={mapId.current}
                key={mapId.current}
                className="h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
              >
                <MapContainer
                  key={`${mapId.current}-container`}
                  center={station.location.coordinates}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={station.location.coordinates} />
                </MapContainer>
              </div>
            ) : (
              <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Loading map...</p>
              </div>
            )}
          </div>
        </div>

        {/* Farmers */}
        {station.farmers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Our Farmers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {station.farmers.map((farmer) => (
                <div
                  key={farmer.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                >
                  <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {farmer.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                    {farmer.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
                    {farmer.yearsOfExperience} years of experience
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {farmer.story}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos */}
        {station.photos.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {station.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800"
                >
                  <Image
                    src={photo}
                    alt={`${station.name} photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

