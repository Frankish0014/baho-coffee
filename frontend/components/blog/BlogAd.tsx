"use client";

import { motion } from "framer-motion";
import { Trophy, Calendar, ExternalLink, Coffee } from "lucide-react";
import Link from "next/link";

interface BlogAdProps {
  variant?: "default" | "compact";
}

export default function BlogAd({ variant = "default" }: BlogAdProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`my-12 ${
        variant === "compact" ? "max-w-md mx-auto" : "w-full"
      }`}
    >
      <div className="relative bg-gradient-to-br from-primary-50 via-primary-100 to-coffee-50 dark:from-primary-900/30 dark:via-primary-800/20 dark:to-coffee-900/20 rounded-2xl p-6 md:p-8 border-2 border-primary-200 dark:border-primary-800 shadow-xl overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-200/20 dark:bg-primary-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-coffee-200/20 dark:bg-coffee-800/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          {/* Ad Label */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-primary-200/50 dark:bg-primary-800/50 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold uppercase tracking-wide">
              Sponsored
            </span>
            <Trophy className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>

          {/* Ad Content */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <Coffee className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Best of Rwanda Specialty Coffee 2026
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-3">
                  Discover the best coffee from the land of a thousand hills. Join Rwanda&apos;s premier specialty coffee auction and bid on exceptional lots from top producers.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span>21 October 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Trophy className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span>Global Online Auction</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="https://www.bestofrwandacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Read more</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
