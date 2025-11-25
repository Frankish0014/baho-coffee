"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function StorySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>
                Baho Coffee was founded with a mission to showcase Rwanda&apos;s
                exceptional specialty coffee to the world. We work directly with
                local washing stations and farmers to ensure the highest quality
                beans while supporting sustainable farming practices.
              </p>
              <p>
                Our name &quot;Baho&quot; means &quot;life&quot; in Kinyarwanda, reflecting our
                commitment to bringing life and opportunity to coffee-growing
                communities across Rwanda.
              </p>
              <p>
                Through our partnerships with washing stations across Rwanda, including Humure, Fugi, Gitoki, Muzo, Gakenke, Cyabingo, Ngoma, Akagera, Bugoyi, Matyazo, Bweyeye, Kinazi, and Karambi, we&apos;re able to trace every bean back to its origin, ensuring transparency and quality at every step.
              </p>
            </div>
            <motion.a
              href="/about"
              className="inline-block mt-8 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/hero/BAHO_27.jpg"
              alt="Baho Coffee Story"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

