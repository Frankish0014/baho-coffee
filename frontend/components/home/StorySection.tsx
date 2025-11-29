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
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/20 dark:bg-primary-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-coffee-100/20 dark:bg-coffee-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Our Story
            </h2>
            <div className="space-y-5 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="text-xl">
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
                Through our washing stations across Rwanda, including Humure, Fugi, Gitoki, Muzo, Gakenke, Cyabingo, Ngoma, Akagera, Bugoyi, Matyazo, Bweyeye, Kinazi, Ngororero, Shangi, Mugera, Shara, and Karambi, we&apos;re able to trace every bean back to its origin, ensuring transparency and quality at every step.
              </p>
            </div>
            <motion.a
              href="/about"
              className="group relative inline-block mt-8 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full font-semibold transition-all duration-300 overflow-hidden shadow-lg shadow-primary-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Learn More About Us
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src="/hero/baho_team.jpg"
                alt="Baho Coffee Story"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-bl-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

