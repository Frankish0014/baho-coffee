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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/washing-stations", label: "Washing Stations" },
    { href: "/blog", label: "Blog" },
    { href: "/export", label: "Export" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/hero/logo.avif"
              alt="Baho Coffee"
              width={300}
              height={100}
              className={`h-16 w-auto transition-all duration-300 ${
                (scrolled || !hasHeroBackground) && theme === "light"
                  ? ""
                  : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  scrolled || !hasHeroBackground
                    ? "text-gray-900 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    : "text-white hover:text-white/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                scrolled || !hasHeroBackground
                  ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                  : "hover:bg-white/20 text-white"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                  : "hover:bg-white/20 text-white"
              }`}
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
              className={`p-2 rounded-lg transition-colors ${
                scrolled || !hasHeroBackground
                  ? "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                  : "hover:bg-white/20 text-white"
              }`}
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
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

