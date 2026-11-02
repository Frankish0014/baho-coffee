"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  bestOfRwanda2026Meta,
  formatBuyers,
  formatPricePerLb,
  getAllBestOfRwanda2026Lots,
} from "@/backend/lib/bestOfRwanda2026Data";

export default function BestOfRwanda2026Section() {
  const lots = getAllBestOfRwanda2026Lots();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const lead = lots[0];

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-white dark:bg-gray-950"
      aria-labelledby="bor-2026-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-primary-600 dark:text-primary-400 mb-4">
            Best of Rwanda 2026
          </p>
          <h2
            id="bor-2026-heading"
            className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-5"
          >
            Four lots sold.
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {bestOfRwanda2026Meta.summary}
          </p>
          {lead && (
            <p className="mt-5 text-sm tracking-wide text-gray-500 dark:text-gray-400">
              Highest price{" "}
              <span className="text-gray-900 dark:text-white font-medium">
                {formatPricePerLb(lead.sale.pricePerLb)}/lb
              </span>
              {" · "}
              {lead.cwsName}
              {" · "}
              {formatBuyers(lead.sale.buyers)}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
          {lots.map((lot, index) => (
            <motion.article
              key={lot.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + index * 0.07 }}
              className="group"
            >
              <Link href={`/best-of-rwanda-2026#lot-${lot.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-gray-950">
                  <Image
                    src={lot.sale.image}
                    alt={`${lot.cwsName} auction result, Lot ${lot.sale.auctionLot}, ${formatPricePerLb(lot.sale.pricePerLb)} per pound`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.16em] uppercase text-gray-400 dark:text-gray-500 mb-1">
                      Lot {lot.sale.auctionLot}
                      {lot.awardPlace ? ` · ${lot.awardPlace}` : ""}
                    </p>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                      {lot.cwsName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {formatBuyers(lot.sale.buyers)}
                    </p>
                  </div>
                  <p className="font-serif text-2xl text-gray-900 dark:text-white shrink-0">
                    {formatPricePerLb(lot.sale.pricePerLb)}
                    <span className="text-sm text-gray-400">/lb</span>
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            {bestOfRwanda2026Meta.closing}
          </p>
          <Link
            href="/best-of-rwanda-2026"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors shrink-0"
          >
            Full auction results
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
