"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import LeafletLoader from "./LeafletLoader";
import { getAllWashingStations } from "@/lib/washingStationsData";

// Dynamically import Leaflet components to avoid SSR issues
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
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Get all washing stations
const stations = getAllWashingStations();

export default function WashingStationsMap() {
  const [mounted, setMounted] = useState(false);
  const [mapKey, setMapKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initCount = useRef(0);

  useEffect(() => {
    // Only initialize once, even with React Strict Mode double mount
    if (initCount.current === 0) {
      initCount.current = 1;
      const timer = setTimeout(() => {
        setMounted(true);
        // Generate unique key after mount to ensure fresh initialization
        setMapKey(`map-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    // Capture the ref value at the time the effect runs
    const container = containerRef.current;
    return () => {
      if (container && typeof window !== "undefined") {
        // Clean up any Leaflet instances
        const leafletElements = container.querySelectorAll(".leaflet-container, .leaflet-pane, .leaflet-control-container");
        leafletElements.forEach((el) => el.remove());
      }
    };
  }, []);

  if (!mounted || !mapKey) {
    return (
      <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-12">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <LeafletLoader />
      <div 
        ref={containerRef}
        id={mapKey}
        key={mapKey}
        className="h-96 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800"
      >
        <MapContainer
          key={`${mapKey}-container`}
          center={[-1.9441, 29.8]}
          zoom={8}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={station.location.coordinates}
            >
              <Popup>
                <div>
                  <h3 className="font-semibold mb-1">{station.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{station.description}</p>
                  <a
                    href={`/washing-stations/${station.slug}`}
                    className="text-primary-600 hover:underline text-sm"
                  >
                    View Details →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

