"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coffee } from "lucide-react";
import { CoffeeProduct } from "@/types";

// Mock data - replace with actual data from CMS/API
const featuredProducts: CoffeeProduct[] = [
  {
    id: "1",
    name: "Bugoyi Washed",
    slug: "bugoyi-washed",
    description: "Bright and clean with notes of citrus and floral",
    flavorNotes: ["Citrus", "Floral", "Tea-like"],
    region: "Western Province",
    processingMethod: "Washed",
    washingStation: "Bugoyi",
    packagingOptions: [
      { size: "250g", weight: "250g" },
      { size: "500g", weight: "500g" },
      { size: "1kg", weight: "1kg" },
    ],
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
    packagingOptions: [
      { size: "250g", weight: "250g" },
      { size: "500g", weight: "500g" },
    ],
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
    packagingOptions: [
      { size: "250g", weight: "250g" },
      { size: "1kg", weight: "1kg" },
    ],
    images: ["/products/humure-washed.jpg"],
    available: true,
    featured: true,
  },
];

function ProductCard({
  product,
  index,
  inView,
}: {
  product: CoffeeProduct;
  index: number;
  inView: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const imageSrc =
    product.images?.[0] ||
    `/products/${product.slug.replace(/\s+/g, "-").toLowerCase()}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative h-64 overflow-hidden">
        {!imageError && imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-coffee-400 to-coffee-800">
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
          <span>Region: {product.region}</span>
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
  );
}

export default function FeaturedProducts() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Featured Coffee
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our selection of Rwandan specialty coffees
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            View All Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

