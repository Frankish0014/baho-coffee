"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award } from "lucide-react";
import { Certification } from "@/types";

// Mock data - replace with actual certifications
const certifications: Certification[] = [
  {
    id: "1",
    name: "Fair Trade Certified",
    logo: "/cert-fairtrade.png",
    description: "Ensuring fair prices and working conditions",
    issuedBy: "Fair Trade International",
    year: 2023,
  },
  {
    id: "2",
    name: "Organic Certified",
    logo: "/cert-organic.png",
    description: "100% organic farming practices",
    issuedBy: "USDA Organic",
    year: 2023,
  },
  {
    id: "3",
    name: "Rainforest Alliance",
    logo: "/cert-rainforest.png",
    description: "Sustainable farming and environmental protection",
    issuedBy: "Rainforest Alliance",
    year: 2023,
  },
  {
    id: "4",
    name: "C.A.F.E. Practices",
    logo: "/cert-cafe.png",
    description: "Starbucks verified ethical sourcing",
    issuedBy: "Starbucks",
    year: 2023,
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="h-24 mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Award className="w-10 h-10 text-gray-400" />
                </div>
                {/* Replace with actual certification logo */}
                {/* <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={80}
                  height={80}
                  className="object-contain"
                /> */}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {cert.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {cert.issuedBy} • {cert.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

