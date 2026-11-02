"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogAdProps {
  variant?: "default" | "compact";
}

export default function BlogAd({ variant = "default" }: BlogAdProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`my-12 ${variant === "compact" ? "max-w-md mx-auto" : "w-full"}`}
    >
      <Link
        href="/best-of-rwanda-2026"
        className="group grid grid-cols-1 md:grid-cols-12 overflow-hidden border border-gray-200 dark:border-gray-800 bg-[#0f1f17] text-white"
      >
        <div className="relative md:col-span-5 min-h-[180px] md:min-h-[220px]">
          <Image
            src="/best-of-rwanda-2026/ngoma-lot-05.jpg"
            alt="Ngoma Coffee Washing Station sold at Best of Rwanda 2026 for $54.80 per pound"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
        </div>

        <div className="md:col-span-7 flex flex-col justify-center p-6 md:p-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-emerald-300/80 mb-3">
            Best of Rwanda 2026 · Results
          </p>
          <h3 className="font-serif text-2xl font-bold tracking-tight mb-3 leading-tight">
            Four lots sold
          </h3>
          <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-md">
            Ngoma brought $54.80 per pound. See the buyers and prices from the 2026 auction.
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
            See the results
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
