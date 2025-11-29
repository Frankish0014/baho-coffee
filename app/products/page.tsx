import { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our selection of Rwandan specialty coffees. Each coffee is carefully selected and traceable to its origin.",
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}

