import { Metadata } from "next";
import ExportPortal from "@/components/export/ExportPortal";

export const metadata: Metadata = {
  title: "Export & Sales Portal",
  description:
    "For international buyers: Request quotations, view green coffee availability, and learn about our export process.",
};

export default function ExportPage() {
  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Export & Sales Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            For international buyers and importers. Request quotations, view
            availability, and track your orders.
          </p>
        </div>
        <ExportPortal />
      </div>
    </div>
  );
}

