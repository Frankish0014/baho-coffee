import { Metadata } from "next";
import SalesPageClient from "./SalesPageClient";

export const metadata: Metadata = {
  title: "Digital Coffee Sales",
  description:
    "Purchase premium Rwandan specialty coffee directly online. Browse our selection, place orders, and track shipments.",
};

export default function SalesPage() {
  return <SalesPageClient />;
}

