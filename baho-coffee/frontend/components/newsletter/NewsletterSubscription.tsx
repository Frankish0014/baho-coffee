"use client";

import { useState, FormEvent } from "react";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { validateEmail } from "@/frontend/lib/validation";


interface NewsletterSubscriptionProps {
  variant?: "default" | "compact" | "inline";
  className?: string;
}

export default function NewsletterSubscription({ 
  variant = "default",
  className = "",
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setStatus("error");
      setMessage(emailValidation.error || "Please enter a valid email address");
      setEmailError(emailValidation.error);
      return;
    }
    
    setEmailError(undefined);

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Successfully subscribed!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "compact") {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) {
                const validation = validateEmail(e.target.value);
                if (validation.valid) {
                  setEmailError(undefined);
                }
              }
            }}
            onBlur={(e) => {
              const validation = validateEmail(e.target.value);
              if (!validation.valid) {
                setEmailError(validation.error);
              } else {
                setEmailError(undefined);
              }
            }}
            placeholder="Enter your email"
            className={`flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              emailError 
                ? "border-red-500 dark:border-red-500" 
                : "border-gray-300 dark:border-gray-700"
            }`}
            required
            disabled={isSubmitting}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{emailError}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Subscribe
              </>
            )}
          </button>
        </form>
        <AnimatePresence>
          {status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-2 text-sm ${
                status === "success" 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) {
                  const validation = validateEmail(e.target.value);
                  if (validation.valid) {
                    setEmailError(undefined);
                  }
                }
              }}
              onBlur={(e) => {
                const validation = validateEmail(e.target.value);
                if (!validation.valid) {
                  setEmailError(validation.error);
                } else {
                  setEmailError(undefined);
                }
              }}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400 ${
                emailError 
                  ? "border-red-500 dark:border-red-500" 
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
              disabled={isSubmitting}
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{emailError}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                Subscribe
                <Mail className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
        <AnimatePresence>
          {status !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-3 text-sm flex items-center gap-2 ${
                status === "success" 
                  ? "text-green-300 dark:text-green-300" 
                  : "text-red-300 dark:text-red-300"
              }`}
            >
              {status === "success" && <CheckCircle2 className="w-4 h-4" />}
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 sm:p-8 border border-primary-200 dark:border-primary-800 ${className}`}>
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Get our stories delivered?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          From us to your inbox weekly.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Enter your email to subscribe!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) {
                const validation = validateEmail(e.target.value);
                if (validation.valid) {
                  setEmailError(undefined);
                }
              }
            }}
            onBlur={(e) => {
              const validation = validateEmail(e.target.value);
              if (!validation.valid) {
                setEmailError(validation.error);
              } else {
                setEmailError(undefined);
              }
            }}
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              emailError 
                ? "border-red-500 dark:border-red-500" 
                : "border-gray-300 dark:border-gray-700"
            }`}
            required
            disabled={isSubmitting}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{emailError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              Subscribe to Newsletter
              <Mail className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
              status === "success" 
                ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800" 
                : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}
          >
            {status === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
            <p className="text-sm">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

