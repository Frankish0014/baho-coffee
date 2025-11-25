"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram } from "lucide-react";
import Link from "next/link";

// Instagram posts using available photos
const instagramPosts = [
  { id: "1", image: "/hero/BAHO_27.jpg", url: "https://instagram.com/bahocoffee" },
  { id: "2", image: "/hero/BAHO_29.jpg", url: "https://instagram.com/bahocoffee" },
  { id: "3", image: "/hero/BAHO_31 (1).jpg", url: "https://instagram.com/bahocoffee" },
  { id: "4", image: "/hero/BAHO_32 (1).jpg", url: "https://instagram.com/bahocoffee" },
  { id: "5", image: "/hero/BAHO_35.jpg", url: "https://instagram.com/bahocoffee" },
  { id: "6", image: "/hero/DSC08945.jpg", url: "https://instagram.com/bahocoffee" },
];

export default function InstagramFeed() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
            <Instagram className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Follow Our Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            See our coffee farms, washing stations, and community impact on
            Instagram
          </p>
          <Link
            href="https://instagram.com/bahocoffee"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
          >
            @bahocoffee
            <Instagram className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={post.image}
                alt="Baho Coffee Instagram post"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white/0 group-hover:text-white/80 transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

