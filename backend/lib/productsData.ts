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
    id: "natural coffee",
    name: "Natural coffee",
    slug: "natural coffee",
    description:
      "Cherries are dried whole, resulting in sweeter, fruitier, and heavier-bodied coffee.",
    flavorNotes: ["Berry", "Fruity", "Sweet"],
    region: "Rwanda Provinces",
    processingMethod: "Natural",
    washingStation: "All Washing Stations",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "60kg", weight: "60kg", price: "600 - 900$" },
    ],
    images: ["/products/natural coffee.jpg"],
    // videoUrl: "https://youtube.com/watch?v=example",
    // pdfProfileUrl: "/pdfs/humure-natural-profile.pdf",
    available: true,
    featured: true,
  },
  {
    id: "Fully Washed Coffee",
    name: "Fully Washed Coffee",
    slug: "fully-washed-coffee",
    description:
      "The most common method, involving pulping, fermenting (often 18-24 hours), washing, and drying on raised beds.",
    flavorNotes: ["ripe berries (blueberry, strawberry, raspberry)" , " tropical fruits (mango, pineapple)" , "chocolate"],
    region: "Rwanda Provinces",
    processingMethod: "Washed",
    washingStation: "All Washing Stations",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "60kg", weight: "60kg", price: "600 - 900$" }
    ],
    images: ["/products/fully washed coffee.jpg"],
    // videoUrl: "https://youtube.com/watch?v=example",
    // pdfProfileUrl: "/pdfs/humure-washed-profile.pdf",
    available: true,
    featured: true,
  },
  {
    id: "Honey Coffee",
    name: "Honey Coffee",
    slug: "honey-coffee",
    description:
      "A hybrid method where the skin is removed but some mucilage remains during drying, creating a balance between washed and natural profiles.",
    flavorNotes: ["Sweet", "Honey", "Caramel"],
    region: "Rwanda Provinces",
    processingMethod: "Honey",
    washingStation: "All Washing Stations",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "60kg", weight: "60kg", price: "600 - 900$" },
    ],
    images: ["/products/honey coffee.jpg"],
    videoUrl: "https://youtube.com/watch?v=example",
    pdfProfileUrl: "/pdfs/humure-honey-profile.pdf",
    available: true,
    featured: true,
  },
  {
    id: "Experimental/Anaerobic Coffees",
    name: "Experimental/Anaerobic Coffees",
    slug: "experimental-anaerobic-coffees",
    description:
      "Experimental/Anaerobic Coffees are a unique type of coffee that is processed using experimental methods. They are processed at All Washing Stations in Rwanda.",
    flavorNotes: ["Experimental", "Anaerobic", "Unique"],
    region: "Rwanda Provinces",
    processingMethod: "Experimental/Anaerobic",
    washingStation: "All Washing Stations",
    farm: "Multiple smallholder farms",
    packagingOptions: [
      { size: "60kg", weight: "60kg", price: "600 - 900$" },
    ],
    images: ["/products/Experimental coffee.jpg"],
    // videoUrl: "https://youtube.com/watch?v=example",
    // pdfProfileUrl: "/pdfs/experimental-anaerobic-coffees-profile.pdf",
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