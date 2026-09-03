"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { MapPin, Coffee, Calendar, Image as ImageIcon, Award, UserCircle, X, ArrowUpRight } from "lucide-react";
import { WashingStation } from "@/types";
import LeafletLoader from "./LeafletLoader";
import { bestOfRwanda2026Meta } from "@/backend/lib/bestOfRwanda2026Data";

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

interface WashingStationDetailsProps {
  station: WashingStation;
}

export default function WashingStationDetails({
  station,
}: WashingStationDetailsProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
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

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowLeft" && station.photos.length > 1) {
        const currentIndex = station.photos.indexOf(selectedPhoto);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : station.photos.length - 1;
        setSelectedPhoto(station.photos[prevIndex]);
      } else if (e.key === "ArrowRight" && station.photos.length > 1) {
        const currentIndex = station.photos.indexOf(selectedPhoto);
        const nextIndex = currentIndex < station.photos.length - 1 ? currentIndex + 1 : 0;
        setSelectedPhoto(station.photos[nextIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, station.photos]);

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
                {station.location.altitude && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Altitude:</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{station.location.altitude}</span>
                  </div>
                )}
                {station.location.latitude && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Latitude:</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{station.location.latitude}</span>
                  </div>
                )}
                {station.location.longitude && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Longitude:</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{station.location.longitude}</span>
                  </div>
                )}
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
                  <Marker position={station.location.coordinates}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{station.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{station.location.address}</p>
                        {station.location.altitude && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                            <span className="font-medium">Altitude:</span> {station.location.altitude}
                          </p>
                        )}
                        {station.location.latitude && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                            <span className="font-medium">Latitude:</span> {station.location.latitude}
                          </p>
                        )}
                        {station.location.longitude && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                            <span className="font-medium">Longitude:</span> {station.location.longitude}
                          </p>
                        )}
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${station.location.coordinates[0]},${station.location.coordinates[1]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded transition-colors"
                        >
                          <MapPin className="w-4 h-4" />
                          Get Directions
                        </a>
                      </div>
                    </Popup>
                  </Marker>
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
          <div className="mb-16">
            <div className="mb-8 max-w-2xl">
              <p className="text-[11px] tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400 mb-3">
                The people behind the coffee
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Featured farmers
              </h2>
            </div>

            <div className="space-y-12">
              {station.farmers.map((farmer) => {
                const gallery =
                  farmer.photos && farmer.photos.length > 0
                    ? farmer.photos
                    : farmer.photo
                      ? [farmer.photo]
                      : [];

                return (
                  <article
                    key={farmer.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                  >
                    {gallery.length > 0 && (
                      <div
                        className={`grid gap-3 lg:col-span-5 ${
                          gallery.length > 1 ? "grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {gallery.map((src) => (
                          <div
                            key={src}
                            className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900"
                          >
                            <Image
                              src={src}
                              alt={`${farmer.name} — ${station.name}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 50vw, 20vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={gallery.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
                        <span className="text-[11px] tracking-[0.16em] uppercase text-gray-400 dark:text-gray-500">
                          {farmer.role || "Coffee farmer"}
                        </span>
                        {farmer.awardLabel && (
                          <>
                            <span className="text-gray-300 dark:text-gray-700">·</span>
                            <span className="text-[11px] tracking-[0.14em] uppercase text-primary-600 dark:text-primary-400">
                              {farmer.awardLabel}
                              {farmer.awardScore ? ` · ${farmer.awardScore}` : ""}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                        {farmer.name}
                      </h3>

                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                        {farmer.location}
                        {farmer.yearsOfExperience
                          ? ` · ${farmer.yearsOfExperience} years of experience`
                          : ""}
                      </p>

                      <p className="text-[15px] md:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mb-6">
                        {farmer.story}
                      </p>

                      {farmer.awardLabel && (
                        <div className="pt-5 border-t border-gray-100 dark:border-gray-800">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-lg leading-relaxed">
                            This farmer&apos;s lot is headed to the Best of Rwanda Auction 2026—
                            on the Best of Rwanda platform powered by V-Auction.
                          </p>
                          <div className="flex flex-wrap items-center gap-5">
                            <Link
                              href="/best-of-rwanda-2026"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                              View winning lot
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>
                            <a
                              href={bestOfRwanda2026Meta.auctionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                            >
                              Register to bid
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Manager */}
        {station.manager && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-md">
                <UserCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Station Manager</h2>
            </div>
            <div className="relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-transparent dark:from-primary-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-coffee-100/20 to-transparent dark:from-coffee-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Manager Photo */}
                {station.manager.photo ? (
                  <div className="relative flex-shrink-0 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-coffee-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800 transform transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={station.manager.photo}
                        alt={station.manager.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative flex-shrink-0">
                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-primary-100 to-coffee-100 dark:from-primary-900 dark:to-coffee-900 flex items-center justify-center shadow-2xl ring-4 ring-white dark:ring-gray-800">
                      <UserCircle className="w-24 h-24 text-primary-400 dark:text-primary-500" />
                    </div>
                  </div>
                )}
                
                {/* Manager Info */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {station.manager.name}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-primary-100 to-primary-50 dark:from-primary-900/50 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold border border-primary-200 dark:border-primary-700">
                      <Award className="w-4 h-4" />
                      <span>Manager</span>
                    </div>
                  </div>
                  {station.manager.description && (
                    <div className="pt-2">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                        {station.manager.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Photos */}
        {station.photos.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Station Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {station.photos.map((photo, index) => (
                <div
                  key={photo}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo}
                    alt={`${station.name} - Photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <div
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto}
                alt={`${station.name} - Full size`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {station.photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {station.photos.map((photo, index) => (
                  <button
                    key={photo}
                    onClick={() => setSelectedPhoto(photo)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedPhoto === photo
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

