"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/hero/hero-1.jpg",
    fallback: "/hero-1.jpg", // Fallback for old path
    title: "Rwandan Specialty Coffee",
    subtitle: "From Farm to Cup, Excellence in Every Bean",
  },
  {
    image: "/hero/hero-2.jpg",
    fallback: "/hero-2.jpg", // Fallback for old path
    title: "Empowering Women in Coffee",
    subtitle: "Supporting Communities, One Cup at a Time",
  },
  {
    image: "/hero/hero-3.jpg",
    fallback: "/hero-3.jpg", // Fallback for old path
    title: "Traceable & Sustainable",
    subtitle: "Know Your Coffee's Journey from Seed to Cup",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
            }}
            transition={{ duration: 1 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              Explore Our Coffee
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Our Story
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="w-6 h-6 text-white/70" />
      </motion.div>
    </section>
  );
}

