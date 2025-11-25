"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Heart, Leaf, Award } from "lucide-react";

export default function AboutContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "We prioritize the well-being of our farmers and their communities.",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "Committed to sustainable farming practices and environmental protection.",
    },
    {
      icon: Award,
      title: "Quality",
      description:
        "Dedicated to delivering the highest quality specialty coffee.",
    },
    {
      icon: Users,
      title: "Empowerment",
      description:
        "Supporting women in coffee and creating opportunities for all.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          About Baho Coffee
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Connecting Rwanda&apos;s finest specialty coffee with the world, one cup at
          a time.
        </p>
      </motion.div>

      {/* Story Section */}
      <section ref={ref} className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Baho Coffee was founded with a simple yet powerful mission: to
                showcase Rwanda&apos;s exceptional specialty coffee to the world
                while creating sustainable livelihoods for coffee farmers.
              </p>
              <p>
                The name &quot;Baho&quot; means &quot;life&quot; in Kinyarwanda, reflecting our
                commitment to bringing life and opportunity to coffee-growing
                communities across Rwanda.
              </p>
              <p>
                Since our founding, we&apos;ve worked directly with washing stations
                and farmers to ensure the highest quality beans while supporting
                sustainable farming practices and empowering women in coffee.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-96 relative rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/hero/BAHO_27.jpg"
              alt="Baho Coffee team at the washing station"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4">Our Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Impact */}
      <section className="bg-primary-600 text-white rounded-lg p-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-serif font-bold mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Farmers Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-primary-100">Washing Stations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-primary-100">Countries Served</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

