"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/washing-stations/ngoma-cws-1.jpg",
    title: "Best of Rwanda 2026",
    subtitle:
      "Four winning lots go to auction on 21 October—via Best of Rwanda, powered by V-Auction.",
    accent: "Going to auction",
    primaryCta: { href: "/best-of-rwanda-2026", label: "View winning lots" },
    secondaryCta: {
      href: "https://www.bestofrwandacoffee.com",
      label: "Register to bid",
      external: true,
    },
  },
  {
    image: "/hero/BAHO_61.jpg",
    title: "Rwandan Specialty Coffee",
    subtitle: "From farm to cup—excellence in every bean.",
    accent: "Baho Coffee Company",
    primaryCta: { href: "/products", label: "Explore our coffee" },
    secondaryCta: { href: "/about", label: "Our story", external: false },
  },
  {
    image: "/hero/Ngoma.jpg",
    title: "Empowering Communities",
    subtitle: "Supporting farmers and connecting people through coffee.",
    accent: "People & place",
    primaryCta: { href: "/washing-stations", label: "Our stations" },
    secondaryCta: { href: "/about", label: "Our story", external: false },
  },
  {
    image: "/hero/hero-3.jpg",
    title: "Traceable & Sustainable",
    subtitle: "Know your coffee’s journey from seed to cup.",
    accent: "Origin with care",
    primaryCta: { href: "/products", label: "Explore our coffee" },
    secondaryCta: { href: "/export", label: "Export with us", external: false },
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] flex items-end sm:items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map((s, index) =>
            currentSlide === index ? (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pb-28 sm:pb-0 pt-28">
        <div className="max-w-4xl mx-auto sm:mx-0 text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-white/70 mb-5">
                {slide.accent}
              </p>

              <h1 className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold text-white tracking-tight leading-[1.05] mb-5 max-w-3xl">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl mb-9">
                {slide.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <Link
                  href={slide.primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors"
                >
                  {slide.primaryCta.label}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {slide.secondaryCta.external ? (
                  <a
                    href={slide.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/35 text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors"
                  >
                    {slide.secondaryCta.label}
                  </a>
                ) : (
                  <Link
                    href={slide.secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/35 text-white text-sm font-medium tracking-wide hover:bg-white/10 transition-colors"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                )}
              </div>

              {currentSlide !== 0 && (
                <div className="mt-8">
                  <Link
                    href="/best-of-rwanda-2026"
                    className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white transition-colors"
                  >
                    <span className="border-b border-white/35 hover:border-white pb-px">
                      Best of Rwanda 2026 — view winning lots
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-5 sm:left-8 lg:left-12 z-10 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group p-1"
          >
            <span
              className={`block h-[2px] transition-all duration-300 ${
                currentSlide === index
                  ? "w-10 bg-white"
                  : "w-5 bg-white/35 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
