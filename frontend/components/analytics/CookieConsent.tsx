"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (e) {
        // If parsing fails, show banner again
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
    
    // Enable analytics if accepted
    if (allAccepted.analytics) {
      // Analytics will be enabled via GoogleAnalytics component
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    
    // Enable/disable analytics based on preference
    if (preferences.analytics) {
      window.dispatchEvent(new Event("cookie-consent-accepted"));
    }
  };

  const togglePreference = (key: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOpenSettings = () => {
    setShowBanner(true);
    setShowSettings(true);
  };

  if (!showBanner) {
    // Show small cookie icon button to reopen settings
    // Positioned to avoid conflict with WhatsApp button (bottom-right)
    return (
      <button
        onClick={handleOpenSettings}
        className="fixed bottom-6 left-6 z-40 p-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Cookie settings"
      >
        <Cookie className="w-5 h-5" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl isolate"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {!showSettings ? (
              // Cookie Banner
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Cookie className="w-6 h-6 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      We Value Your Privacy
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking "Accept All", you consent to our use of cookies. You can also customize your preferences 
                    or reject non-essential cookies.{" "}
                    <a
                      href="/privacy"
                      className="text-primary-600 hover:underline font-medium"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Customize</span>
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              // Cookie Settings
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    aria-label="Close settings"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Necessary Cookies
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Essential for the website to function properly. These cannot be disabled.
                      </p>
                    </div>
                    <div className="ml-4">
                      <span className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                        Always Active
                      </span>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Analytics Cookies
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => togglePreference("analytics")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.analytics
                            ? "bg-primary-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.analytics ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Marketing Cookies
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Used to deliver personalized advertisements and track campaign performance.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => togglePreference("marketing")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.marketing
                            ? "bg-primary-600"
                            : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.marketing ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors flex-1 sm:flex-none"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

