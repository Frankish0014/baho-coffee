import { Metadata } from "next";
import ProductDetails from "@/components/products/ProductDetails";
import { CoffeeProduct } from "@/types";
import { getAllWashingStations } from "@/lib/washingStationsData";

// Generate products dynamically from washing stations (same as ProductsSlider)
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

// Mock data - replace with actual data fetching
async function getProduct(slug: string): Promise<CoffeeProduct | null> {
  // Generate products dynamically from washing stations
  const products = generateAllProducts();
  
  // Also include manually added products (for custom content)
  const manualProducts: CoffeeProduct[] = [
    {
      id: "1",
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
      id: "2",
      name: "Matyazo Natural",
      slug: "matyazo-natural",
      description:
        "Rich and fruity natural processed coffee with deep berry notes. Processed at Matyazo CWS in the Southern Province of Rwanda.",
      flavorNotes: ["Berry", "Chocolate", "Wine-like", "Fruity"],
      region: "Southern Province",
      processingMethod: "Natural",
      washingStation: "Matyazo",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 16 },
        { size: "500g", weight: "500g", price: 30 },
        { size: "1kg", weight: "1kg", price: 55 },
      ],
      images: ["/products/matyazo-natural.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/matyazo-natural-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "3",
      name: "Humure Washed",
      slug: "humure-washed",
      description:
        "Smooth and balanced washed coffee with caramel sweetness. Processed at Humure CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Washed",
      washingStation: "Humure",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/humure-washed1.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/humure-washed-profile.pdf",
      available: true,
      featured: true,
    },

    {
      id: "4",
      name: "Humure Other Experimental Methods Coffee",
      slug: "humure-other-experimental-methods",
      description:
        "Smooth and balanced other experimental methods coffee with caramel sweetness. Processed at Humure CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Other Experimental Methods",
      washingStation: "Humure",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/humure-other-experimental-methods.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/humure-other-experimental-methods-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "5",
      name: "Humure honey",
      slug: "humure-honey",
      description:
        "Smooth and balanced honey coffee with caramel sweetness. Processed at Humure CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Honey",
      washingStation: "Humure",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/humure-other-experimental-methods.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/humure-washed-profile.pdf",
      available: true,
      featured: true,
    },
    
    {
      id: "6",
      name: "Humure Other Experimental Methods",
      slug: "humure-other-experimental-methods",
      description:
        "Smooth and balanced honey coffee with caramel sweetness. Processed at Humure CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Other Experimental Methods",
      washingStation: "Humure",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/humure-other-experimental-methods.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/humure-washed-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "7",
      name: "Fugi Honey",
      slug: "fugi-honey",
      description:
        "Smooth and balanced honey coffee with caramel sweetness. Processed at Fugi CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Honey",
      washingStation: "Fugi",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/fugi-honey.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/fugi-honey-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "8",
      name: "Fugi Natural",
      slug: "fugi-natural",
      description:
        "Smooth and balanced natural coffee with caramel sweetness. Processed at Fugi CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Natural",
      washingStation: "Fugi",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/fugi-natural.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/fugi-natural-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "9",
      name: "Gitoki Washed",
      slug: "gitoki-washed",
      description:
        "Smooth and balanced washed coffee with caramel sweetness. Processed at Gitoki CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Washed",
      washingStation: "Gitoki",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/gitoki-washed.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/fugi-other-experimental-methods-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "10",
      name: "Gitoki Washed",
      slug: "gitoki-washed",
      description:
        "Smooth and balanced washed coffee with caramel sweetness. Processed at Gitoki CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Washed",
      washingStation: "Gitoki",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/gitoki-washed1.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/gitoki-washed-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "11",
      name: "Gitoki Natural",
      slug: "gitoki-natural",
      description:
        "Smooth and balanced natural coffee with caramel sweetness. Processed at Gitoki CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Natural",
      washingStation: "Gitoki",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/gitoki-natural.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/gitoki-natural-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "12",
      name: "Gitoki Other Experimental Methods",
      slug: "gitoki-other-experimental-methods",
      description:
        "Smooth and balanced honey coffee with caramel sweetness. Processed at Gitoki CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Other Experimental Methods",
      washingStation: "Gitoki",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/gitoki-other-experimental-methods.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/gitoki-other-experimental-methods-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "13",
      name: "Kinazi Honey",
      slug: "kinazi-honey",
      description:
        "Smooth and balanced honey coffee with caramel sweetness. Processed at Kinazi CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Honey",
      washingStation: "Kinazi",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/kinazi-honey.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/kinazi-honey-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "14",
      name: "Kinazi Natural",
      slug: "kinazi-natural",
      description:
        "Smooth and balanced natural coffee with caramel sweetness. Processed at Kinazi CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Natural",
      washingStation: "Kinazi",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/kinazi-natural.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/kinazi-natural-profile.pdf",
      available: true,
      featured: true,
    },
    {
      id: "15",
      name: "Kinazi Other Experimental Methods",
      slug: "kinazi-other-experimental-methods",
      description:
        "Smooth and balanced honey coffee with caramel sweetness. Processed at Kinazi CWS in the Northern Province of Rwanda.",
      flavorNotes: ["Caramel", "Nuts", "Honey", "Sweet"],
      region: "Northern Province",
      processingMethod: "Other Experimental Methods",
      washingStation: "Kinazi",
      farm: "Multiple smallholder farms",
      packagingOptions: [
        { size: "250g", weight: "250g", price: 15 },
        { size: "500g", weight: "500g", price: 28 },
        { size: "1kg", weight: "1kg", price: 50 },
      ],
      images: ["/products/kinazi-other-experimental-methods.jpg"],
      videoUrl: "https://youtube.com/watch?v=example",
      pdfProfileUrl: "/pdfs/kinazi-other-experimental-methods-profile.pdf",
      available: true,
      featured: true,
    },
  ];

  // Combine dynamically generated products with manual products
  // Manual products override dynamically generated ones if they have the same slug
  const allProducts = [...products, ...manualProducts];
  
  // Find product by slug (manual products take priority)
  return allProducts.find((p) => p.slug === slug) || null;
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
      <div className="pt-20 pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}

