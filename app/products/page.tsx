import { Metadata } from "next";
import Image from "next/image";
import ProductsSlider from "@/components/products/ProductsSlider";
import ProductsFilter from "@/components/products/ProductsFilter";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our selection of Rwandan specialty coffees. Each coffee is carefully selected and traceable to its origin.",
};

export default function ProductsPage() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Our Coffee Products
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
              Discover our selection of Rwandan specialty coffees from all our washing stations, each
              with unique flavor profiles and traceable origins.
            </p>
          </div>
          <div className="h-80 lg:h-96 relative">
            <Image
              src="/hero/BAHO_29.jpg"
              alt="Freshly processed coffee at a Baho Coffee washing station"
              fill
              className="rounded-2xl object-cover shadow-2xl"
              priority
            />
          </div>
        </div>
        <ProductsFilter />
        <ProductsSlider />
      </div>
    </div>
  );
}

