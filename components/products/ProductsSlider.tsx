"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CoffeeProduct } from "@/types";
import { getAllWashingStations } from "@/lib/washingStationsData";

// Generate products from all washing stations
const washingStations = getAllWashingStations();

// Create products for each processing method of each station
const allProducts: CoffeeProduct[] = washingStations.flatMap((station) => {
  const productName = station.name.replace(" CWS", "");
  
  // Create a product for each processing method
  return station.processingMethods.map((processingMethod, methodIndex) => {
    // Generate flavor notes based on processing method
    const flavorNotes = processingMethod === "Natural" 
      ? ["Berry", "Fruity", "Rich"]
      : processingMethod === "Honey"
      ? ["Sweet", "Honey", "Caramel"]
      : ["Citrus", "Floral", "Clean"];
    
    return {
      id: `${station.id}-${methodIndex}`,
      name: `${productName} ${processingMethod}`,
      slug: `${station.slug}-${processingMethod.toLowerCase()}`,
      description: station.description || `Specialty ${processingMethod.toLowerCase()} processed coffee from ${productName} washing station.`,
      flavorNotes,
      region: station.location.address.split(",")[0] || "Rwanda",
      processingMethod,
      washingStation: productName,
      packagingOptions: [{ size: "250g", weight: "250g" }],
      images: [`/products/${station.slug}-${processingMethod.toLowerCase()}.jpg`],
      available: true,
      featured: true,
    };
  });
});

// Log all generated product slugs (for debugging - remove in production)
if (typeof window !== "undefined") {
  console.log("Generated Product Slugs:", allProducts.map(p => ({ name: p.name, slug: p.slug })));
}

export default function ProductsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3; // Show 3 items at a time on desktop

  const totalSlides = Math.ceil(allProducts.length / itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 9 seconds
  useEffect(() => {
    if (totalSlides <= 1) return; // Don't auto-slide if there's only one slide

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 9000); // 9 seconds

    return () => clearInterval(interval);
  }, [totalSlides]); // Re-run when total slides change

  const getVisibleProducts = () => {
    const start = currentIndex * itemsPerView;
    return allProducts.slice(start, start + itemsPerView);
  };

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getVisibleProducts().map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index
                ? "w-8 bg-primary-600"
                : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: CoffeeProduct;
  index: number;
}) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc =
    product.images?.[0] ||
    `/products/${product.slug.replace(/\s+/g, "-").toLowerCase()}.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
    >
      {/* Image Container with 3D Effect */}
      <div className="relative h-72 overflow-hidden">
        {!imageError && imageSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src={imageSrc}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {/* Multi-layer gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating badge */}
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

      {/* Content with enhanced styling */}
      <div className="p-6 relative">
        {/* Decorative line */}
        <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Enhanced Flavor Notes */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.flavorNotes.slice(0, 3).map((note, noteIndex) => (
            <motion.span
              key={note}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 + noteIndex * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1.5 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/50 dark:to-primary-800/50 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium shadow-sm border border-primary-200/50 dark:border-primary-700/50"
            >
              {note}
            </motion.span>
          ))}
        </div>
        
        {/* Info Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            {product.region}
          </span>
          <span className="font-medium">{product.processingMethod}</span>
        </div>
        
        {/* Enhanced CTA Button */}
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

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

