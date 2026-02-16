"use client";

import { useState } from "react";
import { CoffeeProduct } from "@/types";
import { 
  validateName, 
  validateEmail, 
  validateCompany, 
  validateCountry, 
  validatePhone, 
  validateQuantity,
  validateMessage 
} from "@/frontend/lib/validation";

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
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    company?: string;
    country?: string;
    phone?: string;
    quantity?: string;
    message?: string;
  }>({});
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

    // Client-side validation
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const companyValidation = validateCompany(formData.company);
    const countryValidation = validateCountry(formData.country);
    const phoneValidation = validatePhone(formData.phone);
    const quantityValidation = validateQuantity(formData.quantity);
    
    const newErrors: typeof errors = {};
    if (!nameValidation.valid) newErrors.name = nameValidation.error;
    if (!emailValidation.valid) newErrors.email = emailValidation.error;
    if (!companyValidation.valid) newErrors.company = companyValidation.error;
    if (!countryValidation.valid) newErrors.country = countryValidation.error;
    if (!phoneValidation.valid) newErrors.phone = phoneValidation.error;
    if (!quantityValidation.valid) newErrors.quantity = quantityValidation.error;
    
    if (formData.message) {
      const messageValidation = validateMessage(formData.message);
      if (!messageValidation.valid) newErrors.message = messageValidation.error;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    setErrors({});
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
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) {
                  const validation = validateName(e.target.value);
                  if (validation.valid) {
                    setErrors({ ...errors, name: undefined });
                  }
                }
              }}
              onBlur={(e) => {
                const validation = validateName(e.target.value);
                if (!validation.valid) {
                  setErrors({ ...errors, name: validation.error });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
                errors.name 
                  ? "border-red-500 dark:border-red-500" 
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) {
                  const validation = validateEmail(e.target.value);
                  if (validation.valid) {
                    setErrors({ ...errors, email: undefined });
                  }
                }
              }}
              onBlur={(e) => {
                const validation = validateEmail(e.target.value);
                if (!validation.valid) {
                  setErrors({ ...errors, email: validation.error });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
                errors.email 
                  ? "border-red-500 dark:border-red-500" 
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company *</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => {
                setFormData({ ...formData, company: e.target.value });
                if (errors.company) {
                  const validation = validateCompany(e.target.value);
                  if (validation.valid) {
                    setErrors({ ...errors, company: undefined });
                  }
                }
              }}
              onBlur={(e) => {
                const validation = validateCompany(e.target.value);
                if (!validation.valid) {
                  setErrors({ ...errors, company: validation.error });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
                errors.company 
                  ? "border-red-500 dark:border-red-500" 
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Country *</label>
            <input
              type="text"
              required
              value={formData.country}
              onChange={(e) => {
                setFormData({ ...formData, country: e.target.value });
                if (errors.country) {
                  const validation = validateCountry(e.target.value);
                  if (validation.valid) {
                    setErrors({ ...errors, country: undefined });
                  }
                }
              }}
              onBlur={(e) => {
                const validation = validateCountry(e.target.value);
                if (!validation.valid) {
                  setErrors({ ...errors, country: validation.error });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
                errors.country 
                  ? "border-red-500 dark:border-red-500" 
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.country}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) {
                  const validation = validatePhone(e.target.value);
                  if (validation.valid) {
                    setErrors({ ...errors, phone: undefined });
                  }
                }
              }}
              onBlur={(e) => {
                const validation = validatePhone(e.target.value);
                if (!validation.valid) {
                  setErrors({ ...errors, phone: validation.error });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
                errors.phone 
                  ? "border-red-500 dark:border-red-500" 
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
            )}
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
              onChange={(e) => {
                setFormData({ ...formData, quantity: e.target.value });
                if (errors.quantity) {
                  const validation = validateQuantity(e.target.value);
                  if (validation.valid) {
                    setErrors({ ...errors, quantity: undefined });
                  }
                }
              }}
              onBlur={(e) => {
                const validation = validateQuantity(e.target.value);
                if (!validation.valid) {
                  setErrors({ ...errors, quantity: validation.error });
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
                errors.quantity 
                  ? "border-red-500 dark:border-red-500" 
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.quantity}</p>
            )}
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
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) {
                const validation = validateMessage(e.target.value);
                if (validation.valid) {
                  setErrors({ ...errors, message: undefined });
                }
              }
            }}
            onBlur={(e) => {
              if (e.target.value) {
                const validation = validateMessage(e.target.value);
                if (!validation.valid) {
                  setErrors({ ...errors, message: validation.error });
                }
              }
            }}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
              errors.message 
                ? "border-red-500 dark:border-red-500" 
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
          )}
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

