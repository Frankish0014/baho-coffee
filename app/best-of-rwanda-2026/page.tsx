import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  bestOfRwanda2026Meta,
  getAllBestOfRwanda2026Lots,
} from "@/backend/lib/bestOfRwanda2026Data";
import { PageAnimation } from "@/components/ui/PageAnimation";
import BestOfRwandaLotCard from "@/components/best-of-rwanda/BestOfRwandaLotCard";
import AuctionPromo from "@/components/best-of-rwanda/AuctionPromo";

export const metadata: Metadata = {
  title: "Best of Rwanda 2026 — Winning Lots",
  description:
    "Explore Baho Coffee's four winning lots from the Best of Rwanda Specialty Coffee 2026 auction—organized by NAEB and powered by V-Auction.",
};

export default function BestOfRwanda2026Page() {
  const lots = getAllBestOfRwanda2026Lots();

  return (
    <div className="pt-24 pb-28 bg-white dark:bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageAnimation direction="up" delay={0}>
          <header className="max-w-3xl mb-14 md:mb-16">
            <p className="text-[11px] tracking-[0.22em] uppercase text-primary-600 dark:text-primary-400 mb-5">
              Best of Rwanda Specialty Coffee 2026
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.08] mb-6">
              Winning lots
              <span className="block text-gray-400 dark:text-gray-500 font-normal">
                headed to auction
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {bestOfRwanda2026Meta.summary}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{bestOfRwanda2026Meta.eventDate}</span>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
              <span>Powered by {bestOfRwanda2026Meta.poweredBy}</span>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
              <Link
                href="/washing-stations"
                className="inline-flex items-center gap-1 text-primary-700 dark:text-primary-400 hover:underline"
              >
                Washing stations
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </header>
        </PageAnimation>

        <PageAnimation direction="up" delay={0.08}>
          <AuctionPromo variant="page" />
        </PageAnimation>

        <PageAnimation direction="up" delay={0.12}>
          <div className="mb-10 md:mb-12 flex items-end justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                The lots
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Ngoma · Muganza · Kinazi · Bweyeye
              </p>
            </div>
            <a
              href={bestOfRwanda2026Meta.auctionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Auction platform
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </PageAnimation>

        <div className="space-y-14 lg:space-y-20">
          {lots.map((lot, index) => (
            <PageAnimation key={lot.id} direction="up" delay={0.04 * index}>
              <BestOfRwandaLotCard lot={lot} index={index} />
            </PageAnimation>
          ))}
        </div>

        {bestOfRwanda2026Meta.appreciationCertificate && (
          <PageAnimation direction="up" delay={0.15}>
            <section className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-4">
                  <p className="text-[11px] tracking-[0.22em] uppercase text-primary-600 dark:text-primary-400 mb-4">
                    Recognition
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                    Certificate of Appreciation
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Presented to Baho Coffee Company Ltd for support and contribution to Best of Rwanda 2026.
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <a
                    href={bestOfRwanda2026Meta.appreciationCertificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900 group"
                  >
                    <Image
                      src={bestOfRwanda2026Meta.appreciationCertificate}
                      alt="Baho Coffee Company Ltd — Best of Rwanda 2026 Certificate of Appreciation"
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </a>
                </div>
              </div>
            </section>
          </PageAnimation>
        )}
      </div>
    </div>
  );
}
