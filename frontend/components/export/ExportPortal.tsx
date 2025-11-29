"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Mail, Package, MapPin, Download, DollarSign, FileText, 
  CheckCircle2, TrendingUp, Award, Coffee, Heart, Globe
} from "lucide-react";
import QuotationForm from "./QuotationForm";
import AvailabilityDashboard from "./AvailabilityDashboard";

export default function ExportPortal() {
  const [activeTab, setActiveTab] = useState<"request" | "availability" | "pricing" | "story">(
    "story"
  );

  const tabs = [
    { id: "story", label: "Our Story", icon: Heart },
    { id: "request", label: "Request Quotation", icon: Mail },
    { id: "availability", label: "Availability", icon: Coffee },
    { id: "pricing", label: "Pricing & Contracts", icon: DollarSign },
  ];

  return (
    <div>
      {/* Hero Storytelling Section */}
      <section className="mb-16 bg-gradient-to-br from-primary-50 via-white to-coffee-50 dark:from-primary-900/20 dark:via-gray-900 dark:to-coffee-900/20 rounded-2xl p-12 border border-primary-200 dark:border-primary-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Premium Green Coffee
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              From Rwanda&apos;s Highlands to Your Roastery
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Every bean tells a story of dedication, quality, and community. Our green coffee comes directly from Rwanda&apos;s finest washing stations, where traditional methods meet modern quality standards.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              We work with over <strong className="text-primary-600 dark:text-primary-400">16,000 smallholder farmers</strong> across <strong className="text-primary-600 dark:text-primary-400">15+ washing stations</strong>, ensuring every cup reflects the unique terroir of Rwanda&apos;s diverse regions.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Award, text: "Specialty Grade" },
                { icon: MapPin, text: "Fully Traceable" },
                { icon: Heart, text: "Farmer Direct" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/hero/BAHO_29.jpg"
              alt="Baho Coffee Green Coffee"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Story Tab */}
      {activeTab === "story" && (
        <div className="space-y-12">
          <section>
            <h3 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              Why Choose Baho Coffee Green Coffee?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Award,
                  title: "Consistent Quality",
                  description: "Every batch is cupped and graded to ensure specialty standards. We provide detailed cupping notes and quality certificates with every shipment.",
                },
                {
                  icon: MapPin,
                  title: "Full Traceability",
                  description: "Know exactly where your coffee comes from. Every bag is traceable to its washing station, farmer group, and even individual farmers.",
                },
                {
                  icon: Heart,
                  title: "Direct Trade",
                  description: "We work directly with washing stations and farmers, ensuring fair prices and supporting sustainable livelihoods in coffee-growing communities.",
                },
                {
                  icon: Globe,
                  title: "Global Reach",
                  description: "We ship worldwide with reliable logistics partners. From Kigali to your roastery, we ensure your coffee arrives in perfect condition.",
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-12">
            <h3 className="text-3xl font-serif font-bold mb-6">Our Commitment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "16,000+", label: "Farmers Supported" },
                { number: "15+", label: "Washing Stations" },
                { number: "100%", label: "Traceable" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Request Quotation Tab */}
      {activeTab === "request" && <QuotationForm />}

      {/* Availability Tab */}
      {activeTab === "availability" && <AvailabilityDashboard />}

      {/* Pricing & Contracts Tab */}
      {activeTab === "pricing" && (
        <div className="space-y-12">
          <section>
            <h3 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              Pricing Strategies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Volume-Based Pricing",
                  description: "Competitive pricing based on order volume. Larger orders receive better rates.",
                  details: [
                    "1-10 bags: Standard pricing",
                    "11-50 bags: 5% discount",
                    "51+ bags: Custom pricing",
                  ],
                },
                {
                  title: "Long-Term Contracts",
                  description: "Secure pricing for multiple harvests with long-term partnership agreements.",
                  details: [
                    "Price stability for planning",
                    "Priority access to new lots",
                    "Dedicated account management",
                  ],
                },
                {
                  title: "Spot Purchases",
                  description: "Flexible pricing for immediate purchases from available inventory.",
                  details: [
                    "Quick turnaround",
                    "Current market pricing",
                    "Available lots only",
                  ],
                },
                {
                  title: "Pre-Harvest Contracts",
                  description: "Reserve coffee before harvest at agreed-upon prices.",
                  details: [
                    "Secure supply early",
                    "Lock in pricing",
                    "Plan ahead with confidence",
                  ],
                },
              ].map((strategy, index) => (
                <motion.div
                  key={strategy.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {strategy.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{strategy.description}</p>
                  <ul className="space-y-2">
                    {strategy.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              Contracting & Terms
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="space-y-6">
                {[
                  {
                    title: "Payment Terms",
                    items: [
                      "30% advance payment upon contract signing",
                      "Balance upon shipment confirmation",
                      "Flexible payment options available for long-term partners",
                    ],
                  },
                  {
                    title: "Delivery Terms",
                    items: [
                      "Standard: FOB Kigali, Rwanda",
                      "Alternative: CIF, EXW available upon request",
                      "All shipments comply with Incoterms 2020",
                    ],
                  },
                  {
                    title: "Quality Guarantee",
                    items: [
                      "Cupping notes provided before shipment",
                      "Quality certificates included",
                      "Replacement or refund if quality doesn't meet specifications",
                    ],
                  },
                  {
                    title: "Documentation",
                    items: [
                      "Certificate of Origin",
                      "Quality Analysis Report",
                      "Export permits and customs documentation",
                      "All required certifications (Organic, Fair Trade, etc.)",
                    ],
                  },
                ].map((section, index) => (
                  <div key={section.title} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                    <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-coffee-50 to-coffee-100 dark:from-coffee-900/20 dark:to-coffee-800/20 rounded-xl p-8 border border-coffee-200 dark:border-coffee-800">
            <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Discuss Pricing?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Contact our export team for personalized pricing based on your needs, volume, and partnership goals.
            </p>
            <button 
              onClick={() => setActiveTab("request")}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Request Custom Quote
            </button>
          </section>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <Mail className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Export Process</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Learn about our export process, shipping, and quality control procedures.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <Package className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Packaging Options</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We offer various packaging options including jute bags, GrainPro bags, and custom packaging.
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <MapPin className="w-8 h-8 text-primary-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Traceability</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Every batch is traceable back to its washing station and farmer group.
          </p>
        </div>
      </div>
    </div>
  );
}
