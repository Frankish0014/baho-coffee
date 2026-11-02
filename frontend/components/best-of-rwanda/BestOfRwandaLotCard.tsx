import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BestOfRwandaLot } from "@/backend/lib/bestOfRwanda2026Data";
import { formatBuyers, formatPricePerLb } from "@/backend/lib/bestOfRwanda2026Data";

interface BestOfRwandaLotCardProps {
  lot: BestOfRwandaLot;
  index: number;
}

export default function BestOfRwandaLotCard({ lot, index }: BestOfRwandaLotCardProps) {
  const reversed = index % 2 === 1;

  return (
    <article id={`lot-${lot.id}`} className="scroll-mt-28 group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <div
          className={`relative aspect-[4/5] overflow-hidden bg-gray-950 ${
            reversed ? "lg:col-span-5 lg:order-2" : "lg:col-span-5"
          }`}
        >
          <Image
            src={lot.sale.image}
            alt={`${lot.cwsName} Best of Rwanda 2026 Lot ${lot.sale.auctionLot}, sold to ${formatBuyers(lot.sale.buyers)} at ${formatPricePerLb(lot.sale.pricePerLb)} per pound`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority={index < 2}
          />
        </div>

        <div
          className={`flex flex-col justify-center ${
            reversed ? "lg:col-span-7 lg:order-1" : "lg:col-span-7"
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-[0.18em] uppercase text-gray-400 dark:text-gray-500 mb-4">
            <span>Lot {lot.sale.auctionLot}</span>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <span className="text-primary-600 dark:text-primary-400">Sold</span>
            {lot.awardPlace && (
              <>
                <span className="text-gray-300 dark:text-gray-700">·</span>
                <span>
                  {lot.awardPlace}
                  {lot.awardScore ? ` · ${lot.awardScore}` : ""}
                </span>
              </>
            )}
          </div>

          <p className="font-serif text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-none mb-2">
            {formatPricePerLb(lot.sale.pricePerLb)}
            <span className="text-xl md:text-2xl font-normal text-gray-400 dark:text-gray-500">
              /lb
            </span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Bought by{" "}
            <span className="text-gray-900 dark:text-white font-medium">
              {formatBuyers(lot.sale.buyers)}
            </span>
          </p>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
            {lot.cwsName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {lot.processingMethod}
            <span className="mx-2 text-gray-300 dark:text-gray-700">·</span>
            {lot.location}, {lot.district}
            <span className="mx-2 text-gray-300 dark:text-gray-700">·</span>
            {lot.altitude}
          </p>

          <p className="text-[15px] md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-xl">
            {lot.description}
          </p>

          <p className="text-[15px] text-gray-700 dark:text-gray-200 leading-relaxed mb-6 max-w-xl">
            {lot.sale.note}
          </p>

          <blockquote className="border-l border-primary-500/40 pl-5 mb-8 max-w-xl">
            <p className="font-serif text-[15px] italic text-gray-700 dark:text-gray-200 leading-relaxed">
              {lot.farmerStory}
            </p>
            <footer className="mt-3 text-sm font-medium text-gray-900 dark:text-white not-italic font-sans">
              — {lot.farmerRepresentative}
            </footer>
          </blockquote>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href={`/washing-stations/${lot.cwsSlug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
            >
              Visit station
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {lot.awardCertificate && (
              <a
                href={lot.awardCertificate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                View certificate
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
