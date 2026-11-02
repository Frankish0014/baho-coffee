import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  bestOfRwanda2026Meta,
  formatBuyers,
  formatPricePerLb,
  getAllBestOfRwanda2026Lots,
} from "@/backend/lib/bestOfRwanda2026Data";
import { PageAnimation } from "@/components/ui/PageAnimation";
import BestOfRwandaLotCard from "@/components/best-of-rwanda/BestOfRwandaLotCard";
import JsonLd from "@/components/seo/JsonLd";
import {
  auctionResultsJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/backend/lib/seo";

const lots = getAllBestOfRwanda2026Lots();

export const metadata: Metadata = pageMetadata({
  title: "Best of Rwanda 2026 Auction Results",
  description:
    "Baho Coffee’s Best of Rwanda 2026 results: four lots sold. Ngoma CWS brought $54.80/lb from COMANSA.KR, followed by Muganza, Kinazi, and Bweyeye.",
  path: "/best-of-rwanda-2026",
  image: "/best-of-rwanda-2026/celebration.jpg",
  imageAlt:
    "Best of Rwanda 2026 — Baho Coffee auction results at a Rwandan washing station",
  keywords: [
    "Best of Rwanda 2026",
    "Baho Coffee auction results",
    "Ngoma coffee washing station",
    "Rwandan specialty coffee prices",
    "COMANSA.KR",
    "ROW Specialty Coffee",
  ],
});

export default function BestOfRwanda2026Page() {
  return (
    <div className="pt-24 pb-28 bg-white dark:bg-gray-950 min-h-screen">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Best of Rwanda 2026", path: "/best-of-rwanda-2026" },
          ]),
          auctionResultsJsonLd(lots),
        ]}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageAnimation direction="up" delay={0}>
          <header className="max-w-3xl mb-12 md:mb-16">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="/" className="hover:text-primary-700 dark:hover:text-primary-400">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-900 dark:text-white">Best of Rwanda 2026</li>
              </ol>
            </nav>
            <p className="text-[11px] tracking-[0.22em] uppercase text-primary-600 dark:text-primary-400 mb-5">
              {bestOfRwanda2026Meta.title}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.08] mb-6">
              Auction results
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {bestOfRwanda2026Meta.summary}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
              <span>{bestOfRwanda2026Meta.eventDate}</span>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
              <span>Organized by NAEB</span>
              <span className="w-px h-3 bg-gray-300 dark:bg-gray-700 hidden sm:block" />
              <span>4 lots sold</span>
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

        <PageAnimation direction="up" delay={0.06}>
          <div className="relative mb-16 md:mb-20 h-[320px] md:h-[460px] overflow-hidden">
            <Image
              src={bestOfRwanda2026Meta.celebrationImage}
              alt="Best of Rwanda 2026 — celebrating the people behind every Baho Coffee lot"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>
        </PageAnimation>

        <PageAnimation direction="up" delay={0.08}>
          <section aria-labelledby="results-table-heading" className="mb-16 md:mb-24">
            <h2
              id="results-table-heading"
              className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
            >
              What the coffees brought
            </h2>
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Best of Rwanda 2026 auction prices for Baho Coffee lots
                </caption>
                <thead className="bg-gray-50 dark:bg-gray-900 text-[11px] tracking-[0.16em] uppercase text-gray-500 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Lot</th>
                    <th scope="col" className="px-4 py-3 font-medium">Station</th>
                    <th scope="col" className="px-4 py-3 font-medium">Buyer</th>
                    <th scope="col" className="px-4 py-3 font-medium">Score</th>
                    <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {lots.map((lot) => (
                    <tr key={lot.id} className="text-gray-800 dark:text-gray-100">
                      <td className="px-4 py-4 whitespace-nowrap">{lot.sale.auctionLot}</td>
                      <td className="px-4 py-4">
                        <a
                          href={`#lot-${lot.id}`}
                          className="font-medium hover:text-primary-700 dark:hover:text-primary-400"
                        >
                          {lot.cwsName}
                        </a>
                        <span className="block text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {lot.location}, {lot.district}
                        </span>
                      </td>
                      <td className="px-4 py-4">{formatBuyers(lot.sale.buyers)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                        {lot.awardScore ?? "—"}
                      </td>
                      <td className="px-4 py-4 text-right font-serif text-lg whitespace-nowrap">
                        {formatPricePerLb(lot.sale.pricePerLb)}
                        <span className="text-xs text-gray-400">/lb</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </PageAnimation>

        <div className="space-y-16 lg:space-y-24">
          {lots.map((lot, index) => (
            <PageAnimation key={lot.id} direction="up" delay={0.04 * index}>
              <BestOfRwandaLotCard lot={lot} index={index} />
            </PageAnimation>
          ))}
        </div>

        <PageAnimation direction="up" delay={0.12}>
          <section className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <p className="text-[11px] tracking-[0.22em] uppercase text-primary-600 dark:text-primary-400 mb-4">
                With thanks
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                {bestOfRwanda2026Meta.tagline}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {bestOfRwanda2026Meta.closing} Celebrating the people behind every lot.
              </p>
            </div>
            <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[5/4] overflow-hidden bg-gray-950">
              <Image
                src={bestOfRwanda2026Meta.thankYouImage}
                alt="Thank you from Baho Coffee — we produce to connect coffee and people"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </section>
        </PageAnimation>

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
