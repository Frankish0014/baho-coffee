"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Coffee, Users, Award, TrendingUp, Mail, Calendar, 
  FileText, BarChart, Handshake, Target, Zap, Globe
} from "lucide-react";

export default function RoasterPortal() {
  const [activeTab, setActiveTab] = useState<"overview" | "resources" | "connect">("overview");

  const benefits = [
    {
      icon: Coffee,
      title: "Exclusive Coffee Access",
      description: "Get first access to limited edition lots and new harvests",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "Consistent quality with detailed cupping notes and certifications",
    },
    {
      icon: TrendingUp,
      title: "Competitive Pricing",
      description: "Direct trade relationships mean better prices for you",
    },
    {
      icon: Users,
      title: "Direct Farmer Connection",
      description: "Learn about the farmers and communities behind your coffee",
    },
    {
      icon: Handshake,
      title: "Partnership Opportunities",
      description: "Explore partnership opportunities with our roasters",
    },
  ];

  const resources = [
    {
      icon: FileText,
      title: "Cupping Notes & Profiles",
      description: "Detailed flavor profiles and cupping notes for all our coffees",
      action: "Download",
    },
    {
      icon: BarChart,
      title: "Market Insights",
      description: "Access to market trends and coffee industry reports",
      action: "View",
    },
    {
      icon: Calendar,
      title: "Harvest Calendar",
      description: "Plan your purchases with our harvest and availability calendar",
      action: "View",
    },
    {
      icon: Target,
      title: "Quality Certificates",
      description: "Download certificates of origin, quality analysis, and certifications",
      action: "Download",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Roaster Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Engage with Baho Coffee as a roaster. Access exclusive resources, connect with our team, and discover partnership opportunities.
          </p>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
        {[
          { id: "overview", label: "Overview" },
          { id: "resources", label: "Resources" },
          { id: "connect", label: "Connect" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary-600 text-primary-600 dark:text-primary-400"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-12">
          {/* Why Partner with Us */}
          <section>
            <h2 className="text-3xl font-serif font-bold mb-8 text-gray-900 dark:text-white">
              Why Partner with Baho Coffee?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Partnership Process */}
          <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
            <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              Partnership Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Connect", description: "Reach out to discuss your needs" },
                { step: "2", title: "Sample", description: "Request samples of our coffees" },
                { step: "3", title: "Order", description: "Place your order with confidence" },
                { step: "4", title: "Grow", description: "Build a long-term partnership" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === "resources" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <Icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {resource.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
                <button className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                  {resource.action} →
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Connect Tab */}
      {activeTab === "connect" && (
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              Connect with Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Ready to start a partnership? Get in touch with our roaster relations team.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us about your roastery and what you're looking for..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

