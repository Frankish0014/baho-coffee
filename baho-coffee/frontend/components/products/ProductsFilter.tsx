"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

export default function ProductsFilter() {
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
              <label className="block text-sm font-medium mb-2">Region</label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
                <option>All Regions</option>
                <option>Western Province</option>
                <option>Southern Province</option>
                <option>Northern Province</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Processing Method
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
                <option>All Methods</option>
                <option>Washed</option>
                <option>Natural</option>
                <option>Honey</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

