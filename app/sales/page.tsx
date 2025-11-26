import { Metadata } from "next";
import DigitalSales from "@/components/sales/DigitalSales";

export const metadata: Metadata = {
  title: "Digital Coffee Sales",
  description:
    "Purchase premium Rwandan specialty coffee directly online. Browse our selection, place orders, and track shipments.",
};

export default function SalesPage() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <DigitalSales />
    </div>
  );
}

