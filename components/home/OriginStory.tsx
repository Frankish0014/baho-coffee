"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Award, Users, Leaf } from "lucide-react";
import { getAllWashingStations } from "@/lib/washingStationsData";

export default function OriginStory() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const washingStationsCount = getAllWashingStations().length;

  const stats = [
    { icon: MapPin, value: washingStationsCount.toString(), label: "Washing Stations" },
    { icon: Users, value: "500+", label: "Farmers" },
    { icon: Award, value: "85+", label: "Quality Score" },
    { icon: Leaf, value: "100%", label: "Sustainable" },
  ];

  return (
    <section ref={ref} className="py-20 relative text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero/BAHO_35.jpg"
          alt="Rwandan coffee landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Rwanda: The Land of a Thousand Hills
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Rwanda&apos;s unique terroir, high altitude, and rich volcanic soil create
            the perfect conditions for exceptional specialty coffee.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">
                Why Rwanda Coffee?
              </h3>
              <ul className="space-y-3 text-primary-100">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>
                    High altitude (1,200-2,000m) creates slow bean development
                    and complex flavors
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>
                    Volcanic soil provides rich minerals and nutrients
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>
                    Perfect climate with distinct wet and dry seasons
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>
                    Traditional processing methods passed down through
                    generations
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">
                Our Impact
              </h3>
              <p className="text-primary-100 mb-4">
                Through our direct partnerships with washing stations and
                farmers, we&apos;re creating sustainable livelihoods and empowering
                communities across Rwanda.
              </p>
              <p className="text-primary-100">
                We&apos;re particularly proud of our work supporting women in coffee,
                who play a crucial role in every step of the coffee production
                process.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

