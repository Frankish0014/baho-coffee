import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { bestOfRwanda2026Meta } from "@/backend/lib/bestOfRwanda2026Data";

interface AuctionPromoProps {
  variant?: "page" | "section";
}

export default function AuctionPromo({ variant = "page" }: AuctionPromoProps) {
  const facts = [
    { label: "Date", value: bestOfRwanda2026Meta.eventDate },
    { label: "Platform", value: `${bestOfRwanda2026Meta.poweredBy}` },
    { label: "Organizer", value: "NAEB" },
    { label: "Terms", value: bestOfRwanda2026Meta.incoterms },
  ];

  return (
    <section
      className={`group relative overflow-hidden ${
        variant === "section" ? "mb-16" : "mb-20"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px] lg:min-h-[380px]">
        {/* Visual plane */}
        <div className="relative lg:col-span-5 min-h-[240px] lg:min-h-full overflow-hidden">
          <Image
            src="/washing-stations/ngoma-cws-1.jpg"
            alt="Best of Rwanda Auction 2026"
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority={variant === "page"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/30" />
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/70 mb-2">
              Going to auction
            </p>
            <p className="font-serif text-2xl text-white leading-tight">
              21 October 2026
            </p>
          </div>
        </div>

        {/* Content plane */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-12 bg-[#0f1f17] text-white">
          <p className="text-[11px] tracking-[0.22em] uppercase text-emerald-300/80 mb-4">
            Best of Rwanda Specialty Coffee · powered by {bestOfRwanda2026Meta.poweredBy}
          </p>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1] mb-5">
            Bid on Baho&apos;s
            <br />
            winning lots
          </h2>

          <p className="text-white/70 text-[15px] md:text-base leading-relaxed max-w-xl mb-8">
            Four Baho lots will be offered at the national specialty coffee auction—
            organized by NAEB, hosted on the Best of Rwanda platform powered by V-Auction.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 border-t border-white/10 pt-6">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-[100px]">
                <p className="text-[10px] tracking-[0.18em] uppercase text-white/45 mb-1">
                  {fact.label}
                </p>
                <p className="text-sm font-medium text-white/95">{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={bestOfRwanda2026Meta.auctionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#0f1f17] text-sm font-semibold tracking-wide hover:bg-emerald-50 transition-colors"
            >
              Register to bid
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {variant === "section" ? (
              <Link
                href="/best-of-rwanda-2026"
                className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors"
              >
                Explore winning lots
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <a
                href={`mailto:${bestOfRwanda2026Meta.contactEmail}`}
                className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors"
              >
                {bestOfRwanda2026Meta.contactEmail}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
