import { Metadata } from "next";
import ProductDetails from "@/components/products/ProductDetails";
import { CoffeeProduct } from "@/types";
import { getAllWashingStations } from "@/backend/lib/washingStationsData";
import { getProductBySlug, getAllProducts } from "@/backend/lib/productsData";

// Generate products dynamically from washing stations (fallback for products not in productsData.ts)
function generateAllProducts(): CoffeeProduct[] {
  const washingStations = getAllWashingStations();
  
  return washingStations.flatMap((station) => {
    const productName = station.name.replace(" CWS", "");
    
    return station.processingMethods.map((processingMethod, methodIndex) => {
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
        farm: "Multiple smallholder farms",
        packagingOptions: [
          { size: "250g", weight: "250g", price: 15 },
          { size: "500g", weight: "500g", price: 28 },
          { size: "1kg", weight: "1kg", price: 50 },
        ],
        images: [`/products/${station.slug}-${processingMethod.toLowerCase()}.jpg`],
        videoUrl: "https://youtube.com/watch?v=example",
        pdfProfileUrl: `/pdfs/${station.slug}-${processingMethod.toLowerCase()}-profile.pdf`,
        available: true,
        featured: true,
      };
    });
  });
}

// Get product by slug - checks productsData.ts first, then falls back to generated products
async function getProduct(slug: string): Promise<CoffeeProduct | null> {
  // First, check the productsData.ts file (user-editable)
  const manualProduct = getProductBySlug(slug);
  if (manualProduct) {
    return manualProduct;
  }
  
  // If not found, fall back to dynamically generated products
  const generatedProducts = generateAllProducts();
  return generatedProducts.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="pt-20 pb-20 text-center bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Product Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <ProductDetails product={product} />
    </div>
  );
}