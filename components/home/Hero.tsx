"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Play, Coffee, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    image: "/hero/hero-1.jpg",
    fallback: "/hero-1.jpg",
    title: "Rwandan Specialty Coffee",
    subtitle: "From Farm to Cup, Excellence in Every Bean",
    accent: "Discover the Art of Coffee",
  },
  {
    image: "/hero/hero-2.jpg",
    fallback: "/hero-2.jpg",
    title: "Empowering Women in Coffee",
    subtitle: "Supporting Communities, One Cup at a Time",
    accent: "Building Sustainable Futures",
  },
  {
    image: "/hero/hero-3.jpg",
    fallback: "/hero-3.jpg",
    title: "Traceable & Sustainable",
    subtitle: "Know Your Coffee's Journey from Seed to Cup",
    accent: "Transparency in Every Sip",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Background Slides with Parallax Effect */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            currentSlide === index && (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  {/* Multi-layer gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-coffee-900/80 via-primary-900/70 to-coffee-800/80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Coffee Bean Decorations */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Coffee className="w-8 h-8 text-white/20" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Accent Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-medium text-white/90">{slides[currentSlide].accent}</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="group relative px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center overflow-hidden shadow-2xl shadow-primary-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Our Coffee
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/about"
                  className="group px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center shadow-xl"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Our Story
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.div
              className={`h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "w-12 bg-white shadow-lg shadow-white/50"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            {currentSlide === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 group cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/70 uppercase tracking-wider font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

