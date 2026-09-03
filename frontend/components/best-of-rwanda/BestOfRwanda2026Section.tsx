"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  bestOfRwanda2026Meta,
  getAllBestOfRwanda2026Lots,
} from "@/backend/lib/bestOfRwanda2026Data";
import AuctionPromo from "@/components/best-of-rwanda/AuctionPromo";

export default function BestOfRwanda2026Section() {
  const lots = getAllBestOfRwanda2026Lots();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-white dark:bg-gray-950"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14 md:mb-16"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-primary-600 dark:text-primary-400 mb-4">
            Best of Rwanda 2026
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-5">
            Four lots.
            <br />
            One national stage.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {bestOfRwanda2026Meta.summary}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <AuctionPromo variant="section" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {lots.map((lot, index) => (
            <motion.article
              key={lot.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 + index * 0.07 }}
              className="group"
            >
              <Link href={`/best-of-rwanda-2026#lot-${lot.id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={lot.image}
                    alt={`${lot.cwsName} — Best of Rwanda 2026`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      {lot.awardPlace && (
                        <p className="text-[11px] tracking-[0.16em] uppercase text-white/75 mb-1">
                          {lot.awardPlace}
                          {lot.awardScore ? ` · ${lot.awardScore}` : ""}
                        </p>
                      )}
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                        {lot.cwsName}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-white/80 shrink-0 mb-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {lot.processingMethod}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                  {lot.description}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          className="mt-14 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
            Auction opens {bestOfRwanda2026Meta.eventDate}
          </p>
          <div className="flex flex-wrap items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <Link
              href="/best-of-rwanda-2026"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Full lot stories
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={bestOfRwanda2026Meta.auctionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
            >
              Open V-Auction
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
