"use client";

import { useState } from "react";
import { trackEvent } from "@/components/analytics/GoogleAnalytics";
import { validateName, validateEmail, validateSubject, validateMessage } from "@/frontend/lib/validation";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    
    // Client-side validation
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const subjectValidation = validateSubject(formData.subject);
    const messageValidation = validateMessage(formData.message);
    
    const newErrors: typeof errors = {};
    if (!nameValidation.valid) newErrors.name = nameValidation.error;
    if (!emailValidation.valid) newErrors.email = emailValidation.error;
    if (!subjectValidation.valid) newErrors.subject = subjectValidation.error;
    if (!messageValidation.valid) newErrors.message = messageValidation.error;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Track successful form submission
        trackEvent("submit", "contact_form", "Contact Form Submitted", 1);
        
        // Show success message
        let successMessage = data.message || "Message sent successfully!";
        
        // If email is not configured, show a different message
        if (data.emailConfigured === false) {
          successMessage = "Your message has been received and saved! We'll contact you soon.";
        } else if (data.saved && !data.emailConfigured) {
          successMessage = "Your message has been received and saved! We'll contact you soon. (Email notifications are not configured.)";
        }
        
        setSubmitStatus({
          type: "success",
          message: successMessage,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Track form submission error
        trackEvent("error", "contact_form", "Contact Form Error", 0);
        const errorMessage = data.error || data.message || "Failed to send message. Please try again.";
        setSubmitStatus({
          type: "error",
          message: errorMessage,
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

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
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
          <label className="block text-sm font-medium mb-2">Email *</label>
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
          <label className="block text-sm font-medium mb-2">Subject *</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => {
              setFormData({ ...formData, subject: e.target.value });
              if (errors.subject) {
                const validation = validateSubject(e.target.value);
                if (validation.valid) {
                  setErrors({ ...errors, subject: undefined });
                }
              }
            }}
            onBlur={(e) => {
              const validation = validateSubject(e.target.value);
              if (!validation.valid) {
                setErrors({ ...errors, subject: validation.error });
              }
            }}
            className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 ${
              errors.subject 
                ? "border-red-500 dark:border-red-500" 
                : "border-gray-300 dark:border-gray-700"
            }`}
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message *</label>
          <textarea
            required
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
              const validation = validateMessage(e.target.value);
              if (!validation.valid) {
                setErrors({ ...errors, message: validation.error });
              }
            }}
            rows={6}
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
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

