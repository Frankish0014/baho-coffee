"use client";

import DigitalSales from "@/components/sales/DigitalSales";
import { PageAnimation } from "@/components/ui/PageAnimation";

export default function SalesPageClient() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <PageAnimation direction="fade" delay={0.1}>
        <DigitalSales />
      </PageAnimation>
    </div>
  );
}

