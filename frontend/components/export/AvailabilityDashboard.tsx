"use client";

import { Package, CheckCircle, XCircle } from "lucide-react";

interface AvailabilityItem {
  product: string;
  quantity: string;
  available: boolean;
  origin: string;
}

// Mock data - based on actual washing stations
const availability: AvailabilityItem[] = [
  {
    product: "Bugoyi Washed - Green Coffee",
    quantity: "5,000 kg",
    available: true,
    origin: "Bugoyi CWS",
  },
  {
    product: "Humure Washed - Green Coffee",
    quantity: "4,500 kg",
    available: true,
    origin: "Humure CWS",
  },
  {
    product: "Matyazo Natural - Green Coffee",
    quantity: "3,800 kg",
    available: true,
    origin: "Matyazo CWS",
  },
  {
    product: "Kinazi Washed - Green Coffee",
    quantity: "4,200 kg",
    available: true,
    origin: "Kinazi CWS",
  },
  {
    product: "Fugi Washed - Green Coffee",
    quantity: "3,500 kg",
    available: true,
    origin: "Fugi CWS",
  },
  {
    product: "Gitoki Natural - Green Coffee",
    quantity: "3,000 kg",
    available: true,
    origin: "Gitoki CWS",
  },
  {
    product: "Muzo Honey Process - Green Coffee",
    quantity: "2,800 kg",
    available: true,
    origin: "Muzo CWS",
  },
  {
    product: "Gakenke Washed - Green Coffee",
    quantity: "2,500 kg",
    available: true,
    origin: "Gakenke CWS",
  },
  {
    product: "Cyabingo Washed - Green Coffee",
    quantity: "2,200 kg",
    available: true,
    origin: "Cyabingo CWS",
  },
  {
    product: "Ngoma Natural - Green Coffee",
    quantity: "Sold Out",
    available: false,
    origin: "Ngoma CWS",
  },
];

export default function AvailabilityDashboard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Current Availability</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="space-y-4">
        {availability.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-primary-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.product}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.origin}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div
                  className={`font-semibold ${
                    item.available
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {item.quantity}
                </div>
                <div className="text-xs text-gray-500">
                  {item.available ? "Available" : "Unavailable"}
                </div>
              </div>
              {item.available ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Note:</strong> Availability is updated regularly. For the most
          current information and to place an order, please request a quotation
          or contact us directly.
        </p>
      </div>
    </div>
  );
}

