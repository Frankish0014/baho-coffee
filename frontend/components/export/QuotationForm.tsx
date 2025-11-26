"use client";

import { useState } from "react";
import { CoffeeProduct } from "@/types";

// Mock products - based on actual washing stations
const products: CoffeeProduct[] = [
  {
    id: "1",
    name: "Bugoyi Washed",
    slug: "bugoyi-washed",
    description: "Specialty washed coffee from Bugoyi CWS",
    flavorNotes: ["Citrus", "Floral", "Bright"],
    region: "Western Province",
    processingMethod: "Washed",
    washingStation: "Bugoyi",
    packagingOptions: [],
    images: [],
    available: true,
    featured: false,
  },
  {
    id: "2",
    name: "Humure Washed",
    slug: "humure-washed",
    description: "High-quality washed coffee from Humure CWS",
    flavorNotes: ["Clean", "Sweet", "Balanced"],
    region: "Northern Province",
    processingMethod: "Washed",
    washingStation: "Humure",
    packagingOptions: [],
    images: [],
    available: true,
    featured: false,
  },
  {
    id: "3",
    name: "Matyazo Natural",
    slug: "matyazo-natural",
    description: "Rich natural processed coffee from Matyazo CWS",
    flavorNotes: ["Fruity", "Berry", "Rich"],
    region: "Southern Province",
    processingMethod: "Natural",
    washingStation: "Matyazo",
    packagingOptions: [],
    images: [],
    available: true,
    featured: false,
  },
  {
    id: "4",
    name: "Kinazi Washed",
    slug: "kinazi-washed",
    description: "Exceptional quality washed coffee from Kinazi CWS",
    flavorNotes: ["Complex", "Floral", "Tea-like"],
    region: "Southern Province",
    processingMethod: "Washed",
    washingStation: "Kinazi",
    packagingOptions: [],
    images: [],
    available: true,
    featured: false,
  },
];

export default function QuotationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    phone: "",
    productInterest: [] as string[],
    quantity: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate product selection
    if (formData.productInterest.length === 0) {
      setSubmitStatus({
        type: "error",
        message: "Please select at least one product of interest.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      console.log("📤 Submitting quotation form...");
      console.log("📋 Form data:", formData);
      
      const response = await fetch("/api/export/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📥 Response status:", response.status);
      console.log("📥 Response ok:", response.ok);
      
      const data = await response.json();
      console.log("📥 Response data:", data);

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: data.message || "Quotation request submitted successfully! Check your email for confirmation.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          country: "",
          phone: "",
          productInterest: [],
          quantity: "",
          message: "",
        });
      } else {
        console.error("API Error Response:", data);
        console.error("Response Status:", response.status);
        const errorMessage = data.error || data.message || "Failed to submit quotation request. Please try again.";
        setSubmitStatus({
          type: "error",
          message: errorMessage + (data.saved ? " (Your request was saved, but email failed.)" : ""),
        });
      }
    } catch (error: any) {
      console.error("Network Error:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "An error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProduct = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      productInterest: prev.productInterest.includes(productId)
        ? prev.productInterest.filter((id) => id !== productId)
        : [...prev.productInterest, productId],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Country *</label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Quantity (kg) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 1000, 5000, 10000"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Products of Interest *
          </label>
          <div className="space-y-2">
            {products.map((product) => (
              <label
                key={product.id}
                className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.productInterest.includes(product.id)}
                  onChange={() => toggleProduct(product.id)}
                  className="w-4 h-4 text-primary-600"
                />
                <span>{product.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          />
        </div>

        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Request Quotation"}
        </button>
      </div>
    </form>
  );
}

