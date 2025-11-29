"use client";

import Image from "next/image";
import ProductsSlider from "@/components/products/ProductsSlider";
import ProductsFilter from "@/components/products/ProductsFilter";
import { PageAnimation } from "@/components/ui/PageAnimation";
import { motion } from "framer-motion";

export default function ProductsPageClient() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          <PageAnimation direction="right" className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Our Coffee Products
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Discover our selection of Rwandan specialty coffees from all our washing stations, each
              with unique flavor profiles and traceable origins.
            </p>
          </PageAnimation>
          <PageAnimation direction="left" delay={0.2} className="h-80 lg:h-96 relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <Image
                src="/hero/BAHO_29.jpg"
                alt="Freshly processed coffee at a Baho Coffee washing station"
                fill
                className="rounded-2xl object-cover shadow-2xl"
                priority
              />
            </motion.div>
          </PageAnimation>
        </div>
        <PageAnimation direction="up" delay={0.3}>
          <ProductsFilter />
        </PageAnimation>
        <PageAnimation direction="up" delay={0.4}>
          <ProductsSlider />
        </PageAnimation>
      </div>
    </div>
  );
}

