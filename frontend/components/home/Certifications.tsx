"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award } from "lucide-react";
import { Certification } from "@/types";

// Actual certifications from public/certficates folder
const certifications: Certification[] = [
  {
    id: "1",
    name: "USDA-NOP Organic Certificate",
    logo: "/certficates/USDA.png",
    description: "Organic certification for Europe & USA markets",
    issuedBy: "USDA National Organic Program",
    IssuedOn: "30-Dec-2025",
    url: "/certficates/USDA-NOP Certificate-Organic.pdf",
    // referenceNumber: "1780897600",
  },
  {
    id: "2",
    name: "JAS Organic Certificate",
    logo: "/certficates/jasorganic.png",
    description: "Japanese version of organic certification",
    issuedBy: "Japan Agricultural Standards",
    IssuedOn: "01-Jan-2026",
    url: "/certficates/JAS Certificate - Organic.pdf",
    // referenceNumber: "CU 897600JAS-01.2026",
  },
  {
    id: "3",
    name: "Rainforest Alliance Certified",
    logo: "/certficates/Rainforest.jpg",
    description: "Sustainable farming and environmental protection",
    issuedBy: "Rainforest Alliance",
    IssuedOn: "18-Jul-2025",
    url: "/certficates/RainForest Alliance Certificate.pdf",
    // referenceNumber: "CU 897600JAS-01.2026",

  },
  // {
  //   id: "4",
  //   name: "Fair Trade Certified",
  //   logo: "/certficates/fairtrade.png",
  //   description: "Ensuring fair prices and working conditions",
  //   issuedBy: "Fair Trade International",
  //   year: 2023,
  // },
];

export default function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
            <Award className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Certifications & Awards
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Committed to quality, sustainability, and ethical practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="h-32 mb-4 flex items-center justify-center">
                {cert.logo ? (
                  <img
                    src={cert.logo} 
                    alt={cert.name}
                    width={100}
                    height={100}
                    className="object-contain rounded-full"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Award className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {cert.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                {cert.issuedBy} : {cert.IssuedOn}
              </p>
              {/* <p className="text-xs text-gray-500 dark:text-gray-400 hover">
                  Reference Number: {cert.referenceNumber}
              </p> */}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  View Certificate
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

