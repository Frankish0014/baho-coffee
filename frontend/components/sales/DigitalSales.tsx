"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Package, Truck, CheckCircle2, Star, Filter, Search, X, Plus, Minus, CreditCard, User, Mail, Phone, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { CoffeeProduct } from "@/types";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

// Lazy load Stripe only when needed
const getStripePromise = () => {
  if (typeof window === "undefined") return null; // SSR check
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey || publishableKey === "") {
    return null;
  }
  return loadStripe(publishableKey);
};

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
    region: "Eastern Province",
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
  {
    id: "humure-natural",
    name: "Humure Natural",
    slug: "humure-natural",
    region: "Eastern Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Rich"],
    description: "Humure Coffee Washing Station is dedicated to producing high-quality specialty coffee through sustainable practices",
    price: 9.25,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3500,
    images: ["/products/humure-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "humure-honey",
    name: "Humure Honey",
    slug: "humure-honey",
    region: "Eastern Province",
    processingMethod: "Honey",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    description: "Smooth and balanced honey coffee with caramel sweetness",
    price: 9.50,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2800,
    images: ["/products/humure-honey.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "fugi-washed",
    name: "Fugi Washed",
    slug: "fugi-washed",
    region: "Southern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Clean"],
    description: "Fugi Coffee Washing Station focuses on processing exceptional washed coffees with bright, clean profiles",
    price: 8.60,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 4500,
    images: ["/products/fugi-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "fugi-honey",
    name: "Fugi Honey",
    slug: "fugi-honey",
    region: "Southern Province",
    processingMethod: "Honey",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    description: "Rich honey processed coffee with sweet caramel notes",
    price: 9.30,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3200,
    images: ["/products/fugi-honey.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "fugi-natural",
    name: "Fugi Natural",
    slug: "fugi-natural",
    region: "Southern Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Wine-like"],
    description: "Bold natural processed coffee with intense fruity characteristics",
    price: 9.40,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2500,
    images: ["/products/fugi-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "gitoki-washed",
    name: "Gitoki Washed",
    slug: "gitoki-washed",
    region: "Eastern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Clean"],
    description: "Gitoki Coffee Washing Station is known for its commitment to quality and sustainable farming practices",
    price: 8.65,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 4200,
    images: ["/products/gitoki-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "gitoki-natural",
    name: "Gitoki Natural",
    slug: "gitoki-natural",
    region: "Eastern Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Rich"],
    description: "Complex natural processed coffee with rich berry flavors",
    price: 9.20,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2900,
    images: ["/products/gitoki-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "muzo-washed",
    name: "Muzo Washed",
    slug: "muzo-washed",
    region: "Southern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Tea-like"],
    description: "Muzo Coffee Washing Station processes specialty coffees with a focus on traceability",
    price: 8.55,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3800,
    images: ["/products/muzo-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "muzo-honey",
    name: "Muzo Honey",
    slug: "muzo-honey",
    region: "Southern Province",
    processingMethod: "Honey",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    description: "Smooth honey processed coffee with balanced sweetness",
    price: 9.15,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2700,
    images: ["/products/muzo-honey.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "gakenke-washed",
    name: "Gakenke Washed",
    slug: "gakenke-washed",
    region: "Northern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Clean"],
    description: "Gakenke Coffee Washing Station brings fresh capacity and modern processing techniques",
    price: 8.70,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3600,
    images: ["/products/gakenke-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "gakenke-natural",
    name: "Gakenke Natural",
    slug: "gakenke-natural",
    region: "Northern Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Rich"],
    description: "Bold natural processed coffee from the Northern Province",
    price: 9.35,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2400,
    images: ["/products/gakenke-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "cyabingo-washed",
    name: "Cyabingo Washed",
    slug: "cyabingo-washed",
    region: "Northern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Clean"],
    description: "Cyabingo Coffee Washing Station expands our reach in the Northern Province with state-of-the-art facilities",
    price: 8.80,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3300,
    images: ["/products/cyabingo-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "cyabingo-honey",
    name: "Cyabingo Honey",
    slug: "cyabingo-honey",
    region: "Northern Province",
    processingMethod: "Honey",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    description: "Smooth honey processed coffee with exceptional sweetness",
    price: 9.45,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2600,
    images: ["/products/cyabingo-honey.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "ngoma-washed",
    name: "Ngoma Washed",
    slug: "ngoma-washed",
    region: "Eastern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Balanced"],
    description: "Ngoma Coffee Washing Station processes coffees known for their balanced flavor profiles",
    price: 8.45,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 4100,
    images: ["/products/ngoma-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "ngoma-natural",
    name: "Ngoma Natural",
    slug: "ngoma-natural",
    region: "Eastern Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Wine-like"],
    description: "Rich natural processed coffee with consistent quality",
    price: 9.10,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3100,
    images: ["/products/ngoma-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "akagera-washed",
    name: "Akagera Washed",
    slug: "akagera-washed",
    region: "Eastern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Clean"],
    description: "Akagera Coffee Washing Station focuses on sustainable practices and environmental conservation",
    price: 8.90,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3400,
    images: ["/products/akagera-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "akagera-honey",
    name: "Akagera Honey",
    slug: "akagera-honey",
    region: "Eastern Province",
    processingMethod: "Honey",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    description: "Premium honey processed coffee with environmental sustainability focus",
    price: 9.60,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2200,
    images: ["/products/akagera-honey.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "bweyeye-washed",
    name: "Bweyeye Washed",
    slug: "bweyeye-washed",
    region: "Western Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Tea-like"],
    description: "Bweyeye Coffee Washing Station works with local cooperatives to process high-quality specialty coffees",
    price: 8.40,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3900,
    images: ["/products/bweyeye-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "bweyeye-natural",
    name: "Bweyeye Natural",
    slug: "bweyeye-natural",
    region: "Western Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Rich"],
    description: "Community-focused natural processed coffee with rich flavors",
    price: 9.05,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3000,
    images: ["/products/bweyeye-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "kinazi-washed",
    name: "Kinazi Washed",
    slug: "kinazi-washed",
    region: "Southern Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Clean"],
    description: "Kinazi Coffee Washing Station is known for its exceptional quality control and traceability",
    price: 8.85,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 3700,
    images: ["/products/kinazi-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "kinazi-honey",
    name: "Kinazi Honey",
    slug: "kinazi-honey",
    region: "Southern Province",
    processingMethod: "Honey",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    description: "Premium honey processed coffee with exceptional traceability",
    price: 9.55,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2300,
    images: ["/products/kinazi-honey.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "kinazi-natural",
    name: "Kinazi Natural",
    slug: "kinazi-natural",
    region: "Southern Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Wine-like"],
    description: "Complex natural processed coffee meeting high quality standards",
    price: 9.65,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2100,
    images: ["/products/kinazi-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "karambi-washed",
    name: "Karambi Washed",
    slug: "karambi-washed",
    region: "Western Province",
    processingMethod: "Washed",
    flavorNotes: ["Citrus", "Floral", "Clean"],
    description: "Karambi Coffee Washing Station processes specialty coffees with a focus on empowering women farmers",
    price: 8.35,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 4000,
    images: ["/products/karambi-washed.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
  {
    id: "karambi-natural",
    name: "Karambi Natural",
    slug: "karambi-natural",
    region: "Western Province",
    processingMethod: "Natural",
    flavorNotes: ["Berry", "Fruity", "Rich"],
    description: "Women-empowerment focused natural processed coffee",
    price: 9.00,
    currency: "USD",
    unit: "per kg",
    availableQuantity: 2800,
    images: ["/products/karambi-natural.jpg"],
    packagingOptions: [{ size: "60kg", weight: "60kg" }],
    available: true,
    featured: true,
  },
];

type CheckoutStep = "cart" | "checkout" | "payment" | "confirmation";

export default function DigitalSales() {
  const [cart, setCart] = useState<Array<{ product: SalesProduct; quantity: number }>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProcessing, setSelectedProcessing] = useState<string>("all");
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep | null>(null);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [quantityInputs, setQuantityInputs] = useState<Record<string, string>>({});
  
  // Lazy load Stripe only when payment step is reached
  const stripePromise = useMemo(() => {
    if (checkoutStep === "payment") {
      return getStripePromise();
    }
    return null;
  }, [checkoutStep]);
  
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    paymentMethod: "card",
  });

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
    // Ensure checkout step is null so cart is visible
    setCheckoutStep(null);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleQuantityChange = (productId: string, value: string) => {
    // Allow empty string for deletion
    if (value === "") {
      setQuantityInputs(prev => ({ ...prev, [productId]: "" }));
      return;
    }
    
    // Only allow numbers
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setQuantityInputs(prev => ({ ...prev, [productId]: value }));
      updateCartQuantity(productId, numValue);
    }
  };

  const handleQuantityBlur = (productId: string) => {
    const inputValue = quantityInputs[productId];
    const numValue = parseInt(inputValue || "", 10);
    
    // If empty or invalid, set to 1
    if (isNaN(numValue) || numValue < 1) {
      updateCartQuantity(productId, 1);
      setQuantityInputs(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    } else {
      // Clear the input state since we're using the cart quantity
      setQuantityInputs(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCheckoutStep("checkout");
  };

  const handlePayment = () => {
    setCheckoutStep("payment");
  };

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handlePaymentSuccess = (orderId: string, total: number) => {
    setOrderId(orderId);
    setOrderTotal(total);
    setCheckoutStep("confirmation");
    setCart([]);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const handleBackToCart = () => {
    setCheckoutStep(null);
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
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Cart Badge */}
      {cart.length > 0 && !checkoutStep && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-32 right-4 sm:right-6 bg-primary-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-[55] cursor-pointer hover:bg-primary-700 transition-colors"
          onClick={() => {
            // Scroll to cart if needed
            const cartElement = document.querySelector('[data-cart-sidebar]');
            if (cartElement) {
              cartElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {totalCartItems}
          </span>
        </motion.div>
      )}

      {/* Shopping Cart Sidebar - Fixed positioning above WhatsApp button */}
      {cart.length > 0 && !checkoutStep && (
        <motion.div
          data-cart-sidebar
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-4 sm:right-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 max-w-sm w-[calc(100vw-2rem)] sm:w-full z-[60] max-h-[calc(100vh-8rem)] flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Cart ({totalCartItems})
            </h3>
            <button
              onClick={() => setCart([])}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3 mb-4 overflow-y-auto flex-1 min-h-0">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.product.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    ${item.product.price?.toFixed(2) || "0.00"} per kg
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantityInputs[item.product.id] !== undefined ? quantityInputs[item.product.id] : item.quantity}
                      onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                      onBlur={() => handleQuantityBlur(item.product.id)}
                      onFocus={(e) => {
                        // Store current value when focusing to allow deletion
                        if (quantityInputs[item.product.id] === undefined) {
                          setQuantityInputs(prev => ({ ...prev, [item.product.id]: item.quantity.toString() }));
                        }
                      }}
                      className="w-16 px-2 py-1 text-sm font-medium text-center text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">
                    ${((item.quantity * (item.product.price || 0))).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ${totalCartValue.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutStep && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => checkoutStep === "cart" && setCheckoutStep(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Checkout Form */}
              {checkoutStep === "checkout" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
                    <button
                      onClick={handleBackToCart}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={checkoutData.name}
                            onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={checkoutData.email}
                            onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            value={checkoutData.phone}
                            onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Shipping Address
                      </h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Street Address *"
                          value={checkoutData.address}
                          onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                          required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="City *"
                            value={checkoutData.city}
                            onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Country *"
                            value={checkoutData.country}
                            onChange={(e) => setCheckoutData({ ...checkoutData, country: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            required
                          />
                          <input
                            type="text"
                            placeholder="ZIP Code *"
                            value={checkoutData.zipCode}
                            onChange={(e) => setCheckoutData({ ...checkoutData, zipCode: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Order Total:</span>
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          ${totalCartValue.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={handlePayment}
                        disabled={!checkoutData.name || !checkoutData.email || !checkoutData.phone || !checkoutData.address}
                        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        Continue to Payment
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {checkoutStep === "payment" && (
                <>
                  {stripePromise ? (
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        amount={totalCartValue}
                        checkoutData={checkoutData}
                        items={cart.map(item => ({
                          productId: item.product.id,
                          productName: item.product.name,
                          quantity: item.quantity,
                          price: item.product.price || 0,
                          total: (item.product.price || 0) * item.quantity,
                        }))}
                        onBack={() => {
                          setCheckoutStep("checkout");
                          setPaymentError(null);
                        }}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        onPaymentMethodChange={(method) => {
                          setCheckoutData({ ...checkoutData, paymentMethod: method });
                        }}
                      />
                    </Elements>
                  ) : (
                    <div className="p-6">
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          ⚠️ Stripe payment is not configured. Please add your <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to your environment variables.
                        </p>
                      </div>
                      {checkoutData.paymentMethod === "bank" ? (
                        <div className="space-y-4">
                          <p className="text-gray-600 dark:text-gray-400">
                            For bank transfer, please contact us directly to complete your order.
                          </p>
                          <button
                            onClick={() => {
                              const currentTotal = cart.reduce((sum, item) => sum + ((item.product.price || 0) * item.quantity), 0);
                              setOrderTotal(currentTotal);
                              setCheckoutStep("confirmation");
                              setCart([]);
                            }}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                          >
                            Complete Order (Bank Transfer)
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-gray-600 dark:text-gray-400">
                            Card payments are currently unavailable. Please select "Bank Transfer" as your payment method or contact us for assistance.
                          </p>
                          <button
                            onClick={() => setCheckoutStep("checkout")}
                            className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Back to Checkout
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Confirmation Step */}
              {checkoutStep === "confirmation" && (
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Order Confirmed!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for your order. We've sent a confirmation email to {checkoutData.email}
                  </p>
                  {orderId && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <strong>Order ID:</strong> {orderId}
                    </p>
                  )}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <strong>Order Total:</strong> ${orderTotal.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Shipping to:</strong> {checkoutData.address}, {checkoutData.city}, {checkoutData.country}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCheckoutStep(null);
                      setCheckoutData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        city: "",
                        country: "",
                        zipCode: "",
                        paymentMethod: "card",
                      });
                    }}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

