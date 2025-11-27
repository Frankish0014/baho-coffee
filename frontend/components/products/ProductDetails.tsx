"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Download,
  Mail,
  MapPin,
  Coffee,
  Package,
  Play,
} from "lucide-react";
import { CoffeeProduct } from "@/types";
import SampleRequestModal from "./SampleRequestModal";  

interface ProductDetailsProps {
  product: CoffeeProduct;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [showSampleModal, setShowSampleModal] = useState(false);

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images/Video */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-coffee-400 to-coffee-800 flex items-center justify-center">
                  <Coffee className="w-32 h-32 text-white/20" />
                </div>
              )}
            </div>
            {product.videoUrl && (
              <a
                href={product.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Watch Product Video</span>
              </a>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>

            {/* Flavor Notes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Flavor Notes</h3>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                <span>
                  <strong>Region:</strong> {product.region}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-primary-600" />
                <span>
                  <strong>Processing:</strong> {product.processingMethod}
                </span>
              </div>
              {product.washingStation && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span>
                    <strong>Washing Station:</strong> {product.washingStation}
                  </span>
                </div>
              )}
              {product.farm && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <span>
                    <strong>Farm:</strong> {product.farm}
                  </span>
                </div>
              )}
            </div>

            {/* Packaging Options */}
            {product.packagingOptions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Packaging Options
                </h3>
                <div className="space-y-2">
                  {product.packagingOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <span>{option.size}</span>
                      {option.price && (
                        <span className="font-semibold">
                          ${option.price} {product.currency || "USD"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowSampleModal(true)}
                className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Request a Sample
              </button>
              {product.pdfProfileUrl && (
                <a
                  href={product.pdfProfileUrl}
                  download
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSampleModal && (
        <SampleRequestModal
          product={product}
          onClose={() => setShowSampleModal(false)}
        />
      )}
    </div>
  );
}

