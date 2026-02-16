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
    flavorNotes: ["Citrus", "Floral", "We can add more flavor notes here"],
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
    flavorNotes: ["Berry", "Chocolate", "We can add more flavor notes here"],
    region: "Northern Province",
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
    flavorNotes: ["Caramel", "Nuts", "Honey", "We can add more flavor notes here"],
    region: "Eastern Province",
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
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc =
    product.images?.[0] ||
    `/products/${product.slug.replace(/\s+/g, "-").toLowerCase()}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-72 overflow-hidden">
        {!imageError && imageSrc ? (
          <>
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImageError(true)}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-xs font-semibold text-primary-700 dark:text-primary-400 shadow-lg"
            >
              {product.processingMethod}
            </motion.div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-coffee-400 to-coffee-800">
            <Coffee className="w-24 h-24 text-white/20" />
          </div>
        )}
      </div>
      <div className="p-6 relative">
        <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {product.flavorNotes.slice(0, 3).map((note, noteIndex) => (
            <motion.span
              key={note}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1 + noteIndex * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium shadow-sm border border-primary-200/50 dark:border-primary-700/50"
            >
              {note}
            </motion.span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            Region: {product.region}
          </span>
        </div>
        <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold group/link transition-colors"
          >
            <span>View Details</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 0.6 }}
      />
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/products"
              className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full font-semibold transition-all duration-300 overflow-hidden shadow-xl shadow-primary-500/50"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

