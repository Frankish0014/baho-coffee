"use client";

import ExportPortal from "@/components/export/ExportPortal";
import { PageAnimation, PageHeader } from "@/components/ui/PageAnimation";

export default function ExportPageClient() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Export & Sales Portal"
          description="For international buyers and importers. Request quotations, view availability, and track your orders."
        />
        <PageAnimation direction="up" delay={0.2}>
          <ExportPortal />
        </PageAnimation>
      </div>
    </div>
  );
}

