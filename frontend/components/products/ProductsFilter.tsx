"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

const REGIONS = [
  "",
  "Eastern Province",
  "Northern Province",
  "Southern Province",
  "Western Province",
];

const PROCESSING_METHODS = [
  "",
  "Washed",
  "Natural",
  "Honey",
  "Other Experimental Methods",
];

interface ProductsFilterProps {
  region: string;
  onRegionChange: (value: string) => void;
  processingMethod: string;
  onProcessingMethodChange: (value: string) => void;
}

export default function ProductsFilter({
  region,
  onRegionChange,
  processingMethod,
  onProcessingMethodChange,
}: ProductsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Filter className="w-5 h-5" />
        <span>Filter Products</span>
      </button>

      {isOpen && (
        <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => onRegionChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="">All Regions</option>
                {REGIONS.filter(Boolean).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                Processing Method
              </label>
              <select
                value={processingMethod}
                onChange={(e) => onProcessingMethodChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="">All Methods</option>
                {PROCESSING_METHODS.filter(Boolean).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}