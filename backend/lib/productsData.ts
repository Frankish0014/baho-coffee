import { CoffeeProduct } from "@/types";

/**
 * PRODUCT DATA FILE
 * 
 * This file contains all product information that appears on product detail pages.
 * 
 * To edit a product:
 * 1. Find the product in the products array below
 * 2. Update any field you want to change:
 *    - name: Product name (e.g., "Humure Natural")
 *    - description: Product description text
 *    - flavorNotes: Array of flavor notes (e.g., ["Berry", "Fruity", "Rich"])
 *    - region: Region name (e.g., "Eastern Province")
 *    - processingMethod: Processing type (e.g., "Natural", "Washed", "Honey")
 *    - washingStation: Washing station name (e.g., "Humure")
 *    - farm: Farm information (e.g., "Multiple smallholder farms")
 *    - packagingOptions: Array of packaging sizes and prices
 *    - images: Array of image paths (e.g., ["/products/humure-natural.jpg"])
 *    - videoUrl: YouTube or video URL (optional)
 *    - pdfProfileUrl: Path to PDF profile (optional)
 * 
 * 3. Save the file and the changes will appear on the website
 */

export const products: CoffeeProduct[] = [
  {
    id: "humure-natural",
    name: "Humure Natural",
    slug: "humure-natural",
    description:
      "Humure Coffee Washing Station is dedicated to producing high-quality specialty coffee through sustainable practices and direct partnerships with local farmers.",
    flavorNotes: ["Berry", "Fruity", "Rich"],
    region: "Eastern Province",
    processingMethod: "Natural",
    washingStation: "Humure",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "250g", weight: "250g", price: 15 },
      { size: "500g", weight: "500g", price: 28 },
      { size: "1kg", weight: "1kg", price: 50 },
    ],
    images: ["/products/humure-natural.jpg"],
    videoUrl: "https://youtube.com/watch?v=example",
    pdfProfileUrl: "/pdfs/humure-natural-profile.pdf",
    available: true,
    featured: true,
  },
  {
    id: "humure-washed",
    name: "Humure Washed",
    slug: "humure-washed",
    description:
      "Smooth and balanced washed coffee with caramel sweetness. Processed at Humure CWS in the Eastern Province of Rwanda.",
    flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
    region: "Eastern Province",
    processingMethod: "Washed",
    washingStation: "Humure",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "250g", weight: "250g", price: 15 },
      { size: "500g", weight: "500g", price: 28 },
      { size: "1kg", weight: "1kg", price: 50 },
    ],
    images: ["/products/humure-washed.jpg"],
    videoUrl: "https://youtube.com/watch?v=example",
    pdfProfileUrl: "/pdfs/humure-washed-profile.pdf",
    available: true,
    featured: true,
  },
  {
    id: "humure-honey",
    name: "Humure Honey",
    slug: "humure-honey",
    description:
      "Smooth and balanced honey coffee with caramel sweetness. Processed at Humure CWS in the Eastern Province of Rwanda.",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    region: "Eastern Province",
    processingMethod: "Honey",
    washingStation: "Humure",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "250g", weight: "250g", price: 15 },
      { size: "500g", weight: "500g", price: 28 },
      { size: "1kg", weight: "1kg", price: 50 },
    ],
    images: ["/products/humure-honey.jpg"],
    videoUrl: "https://youtube.com/watch?v=example",
    pdfProfileUrl: "/pdfs/humure-honey-profile.pdf",
    available: true,
    featured: true,
  },
  {
    id: "bugoyi-washed",
    name: "Bugoyi Washed",
    slug: "bugoyi-washed",
    description:
      "A bright and clean coffee with delicate citrus notes and floral undertones. Grown at high altitude in the Western Province of Rwanda, processed at Bugoyi CWS.",
    flavorNotes: ["Citrus", "Floral", "Tea-like", "Lemon"],
    region: "Western Province",
    processingMethod: "Washed",
    washingStation: "Bugoyi",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "250g", weight: "250g", price: 15 },
      { size: "500g", weight: "500g", price: 28 },
      { size: "1kg", weight: "1kg", price: 50 },
    ],
    images: ["/products/bugoyi-washed.jpg"],
    videoUrl: "https://youtube.com/watch?v=example",
    pdfProfileUrl: "/pdfs/bugoyi-washed-profile.pdf",
    available: true,
    featured: true,
  },
  {
    id: "matyazo-natural",
    name: "Matyazo Natural",
    slug: "matyazo-natural",
    description:
      "Rich and fruity natural processed coffee with deep berry notes. Processed at Matyazo CWS in the Southern Province of Rwanda.",
    flavorNotes: ["Berry", "Chocolate", "Wine-like", "Fruity"],
    region: "Northern Province",
    processingMethod: "Natural",
    washingStation: "Matyazo",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "250g", weight: "250g", price: 10 },
      { size: "500g", weight: "500g", price: 20 },
      { size: "1kg", weight: "1kg", price: 45 },
    ],
    images: ["/products/matyazo-natural.jpg"],
    videoUrl: "https://youtube.com/watch?v=example",
    pdfProfileUrl: "/pdfs/matyazo-natural-profile.pdf",
    available: true,
    featured: true,
  },
  // Add more products here as needed
];

// Helper function to get product by slug
export function getProductBySlug(slug: string): CoffeeProduct | null {
  return products.find((p) => p.slug === slug) || null;
}

// Helper function to get all products
export function getAllProducts(): CoffeeProduct[] {
  return products;
}

// Helper function to get featured products
export function getFeaturedProducts(): CoffeeProduct[] {
  return products.filter((p) => p.featured);
}

