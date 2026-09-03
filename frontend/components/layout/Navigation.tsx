"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  
  // Pages that should have white navigation before scrolling (home page with hero)
  const hasHeroBackground = pathname === "/";
  
  // Match logo: white when over hero OR in dark theme; dark when scrolled in light theme
  const shouldBeWhite = hasHeroBackground && !scrolled;
  const useWhiteText = shouldBeWhite || theme === "dark";
  const linkColor = useWhiteText ? "#ffffff" : "#111827"; // white or gray-900

  useEffect(() => {
    // Check initial scroll position
    setScrolled(window.scrollY > 20);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/washing-stations", label: "Stations" },
    { href: "/best-of-rwanda-2026", label: "Best of Rwanda" },
    { href: "/blog", label: "Blog" },
    { href: "/export", label: "Export" },
    { href: "/roasters", label: "Roasters" },
    { href: "/about", label: "About" },
    { href: "/staff", label: "Team" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      data-nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/hero/logo.avif"
              alt="Baho Coffee"
              width={260}
              height={88}
              className={`h-12 md:h-14 w-auto transition-all duration-300 ${
                useWhiteText ? "brightness-0 invert" : ""
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ color: linkColor }}
                  className={`relative px-2.5 xl:px-3 py-2 text-[13px] tracking-wide transition-opacity duration-300 ${
                    isActive ? "opacity-100 font-medium" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-2.5 right-2.5 xl:left-3 xl:right-3 bottom-1 h-px bg-current opacity-70"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              style={{ color: linkColor }}
              className="ml-2 p-2 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              style={{ color: linkColor }}
              className="p-2 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: linkColor }}
              className="p-2 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "text-primary-700 dark:text-primary-300 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

