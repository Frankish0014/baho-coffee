"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Partner } from "@/types";

// Mock data - replace with actual partners
const partners: Partner[] = [
  {
    id: "1",
    name: "Global Coffee Importers",
    logo: "/partner-1.png",
    country: "USA",
    website: "https://example.com",
  },
  {
    id: "2",
    name: "European Specialty Coffee",
    logo: "/partner-2.png",
    country: "Germany",
    website: "https://example.com",
  },
  {
    id: "3",
    name: "Asia Pacific Coffee Co.",
    logo: "/partner-3.png",
    country: "Singapore",
    website: "https://example.com",
  },
  {
    id: "4",
    name: "African Coffee Network",
    logo: "/partner-4.png",
    country: "Kenya",
    website: "https://example.com",
  },
];

export default function Partners() {
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Global Partners
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trusted by coffee importers and roasters worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="h-20 w-full mb-4 flex items-center justify-center">
                <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-sm">{partner.name}</span>
                </div>
                {/* Replace with actual partner logo */}
                {/* <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={80}
                  className="object-contain"
                /> */}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white text-center mb-1">
                {partner.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {partner.country}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

