"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Package, Truck, CheckCircle2, Star, Filter, Search } from "lucide-react";
import { CoffeeProduct } from "@/types";

// Extended product type for sales
interface SalesProduct extends CoffeeProduct {
  availableQuantity?: number;
  unit?: string;
}

// Mock products for digital sales
const availableProducts: SalesProduct[] = [
  {
    id: "bugoyi-washed",
    name: "Bugoyi Washed",
    slug: "bugoyi-washed",
    region: "Western Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Tea-like"],
    description: "Bright and clean with notes of citrus and floral",
    price: 8.50,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 5000,
    images: ["/products/bugoyi-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "matyazo-natural",
    name: "Matyazo Natural",
    slug: "matyazo-natural",
    region: "Southern Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Chocolate", "Wine-like"],
    description: "Rich and fruity with deep berry notes",
    price: 9.00,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3000,
    images: ["/products/matyazo-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "humure-washed",
    name: "Humure Washed",
    slug: "humure-washed",
    region: "Northern Province",
    processingMethod: "Washed",
    flavorNotes: ["Caramel", "Nuts", "Honey"],
    description: "Smooth and balanced with caramel sweetness",
    price: 8.75,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 4000,
    images: ["/products/humure-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
];

export default function DigitalSales() {
  const [cart, setCart] = useState<Array<{ product: SalesProduct; quantity: number }>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProcessing, setSelectedProcessing] = useState<string>("all");

  const addToCart = (product: SalesProduct, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const filteredProducts = availableProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProcessing = selectedProcessing === "all" || product.processingMethod === selectedProcessing;
    return matchesSearch && matchesProcessing;
  });

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Digital Coffee Sales
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Purchase premium Rwandan specialty coffee directly online. Browse our selection, place orders, and track shipments.
          </p>
        </motion.div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: ShoppingCart, title: "Easy Ordering", description: "Simple online ordering process" },
          { icon: Package, title: "Quality Guaranteed", description: "Premium specialty coffee" },
          { icon: Truck, title: "Fast Shipping", description: "Worldwide delivery available" },
        ].map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800"
            >
              <Icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search coffee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedProcessing}
            onChange={(e) => setSelectedProcessing(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Processing</option>
            <option value="Washed">Washed</option>
            <option value="Natural">Natural</option>
            <option value="Honey">Honey</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="relative h-64">
              <Image
                src={product.images[0] || "/products/bugoyi-washed.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.processingMethod}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif font-bold mb-2 text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price?.toFixed(2) || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.unit || "per kg"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {product.availableQuantity?.toLocaleString() || "Contact"} kg
                  </p>
                </div>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shopping Cart Sidebar */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm w-full z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Cart ({totalCartItems})
            </h3>
            <button
              onClick={() => setCart([])}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{item.product.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.quantity} × ${item.product.price?.toFixed(2) || "0.00"}
                </p>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">
                  ${((item.quantity * (item.product.price || 0))).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ${totalCartValue.toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

