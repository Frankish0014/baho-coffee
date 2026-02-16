"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, ArrowRight } from "lucide-react";
import { CoffeeProduct } from "@/types";

// Mock data - replace with API call
const allProducts: CoffeeProduct[] = [
  {
    id: "1",
    name: "Bugoyi Washed",
    slug: "bugoyi-washed",
    description: "Bright and clean with notes of citrus and floral",
    flavorNotes: ["Citrus", "Floral", "Tea-like"],
    region: "Western Province",
    processingMethod: "Washed",
    washingStation: "Bugoyi",
    packagingOptions: [{ size: "250g", weight: "250g" }],
    images: ["/products/bugoyi-washed.jpg"],
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "Matyazo Natural",
    slug: "matyazo-natural",
    description: "Rich and fruity with deep berry notes",
    flavorNotes: ["Berry", "Chocolate", "Wine-like"],
    region: "Southern Province",
    processingMethod: "Natural",
    washingStation: "Matyazo",
    packagingOptions: [{ size: "250g", weight: "250g" }],
    images: ["/products/matyazo-natural.jpg"],
    available: true,
    featured: true,
  },
  {
    id: "3",
    name: "Humure Washed",
    slug: "humure-washed",
    description: "Smooth and balanced with caramel sweetness from Humure CWS",
    flavorNotes: ["Caramel", "Nuts", "Honey"],
    region: "Northern Province",
    processingMethod: "Washed",
    washingStation: "Humure",
    packagingOptions: [{ size: "250g", weight: "250g" }],
    images: ["/products/humure-washed.jpg"],
    available: true,
    featured: false,
  },
];

export default function ProductsGrid() {
  const [filteredProducts, setFilteredProducts] =
    useState<CoffeeProduct[]>(allProducts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="relative h-64 overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-coffee-400 to-coffee-800 flex items-center justify-center">
                <Coffee className="w-24 h-24 text-white/20" />
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.flavorNotes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                >
                  {note}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>{product.region}</span>
              <span>{product.processingMethod}</span>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

