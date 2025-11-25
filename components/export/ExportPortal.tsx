"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Package, MapPin, Download } from "lucide-react";
import QuotationForm from "./QuotationForm";
import AvailabilityDashboard from "./AvailabilityDashboard";

export default function ExportPortal() {
  const [activeTab, setActiveTab] = useState<"request" | "availability">(
    "request"
  );

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("request")}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === "request"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          Request Quotation
        </button>
        <button
          onClick={() => setActiveTab("availability")}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === "availability"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          Green Coffee Availability
        </button>
      </div>

      {/* Content */}
      {activeTab === "request" && <QuotationForm />}
      {activeTab === "availability" && <AvailabilityDashboard />}

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <Mail className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Export Process</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Learn about our export process, shipping, and quality control
            procedures.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <Package className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Packaging Options</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We offer various packaging options including jute bags, GrainPro
            bags, and custom packaging.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <MapPin className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Traceability</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Every batch is traceable back to its washing station and farmer
            group.
          </p>
        </div>
      </div>
    </div>
  );
}

