import { Metadata } from "next";
import { pageMetadata } from "@/backend/lib/seo";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = pageMetadata({
  title: "Specialty Coffees",
  description:
    "Browse traceable Rwandan specialty coffees from Baho Coffee washing stations, with origin, process, and flavor notes for each lot.",
  path: "/products",
  keywords: ["Rwandan specialty coffee", "green coffee", "Baho Coffee products"],
});

export default function ProductsPage() {
  return <ProductsPageClient />;
}

