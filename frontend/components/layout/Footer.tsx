import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: "/about", label: "About Us" },
      { href: "/washing-stations", label: "Washing Stations" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
    products: [
      { href: "/products", label: "All Products" },
      { href: "/export", label: "Export Portal" },
      { href: "/media", label: "Media & Downloads" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/certifications", label: "Certifications" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/bahocoffee", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com/bahocoffee", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/bahocoffee", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/bahocoffee", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900 dark:from-gray-900 dark:via-gray-900 dark:to-primary-900 text-white dark:text-white overflow-hidden transition-colors duration-300">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <Image
                src="/hero/logo.avif"
                alt="Baho Coffee"
                width={400}
                height={100}
                className="h-16 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed !text-white dark:!text-white">
              Exporting specialty coffee from Rwanda. Connecting farmers
              with the world through exceptional quality and sustainable practices.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-primary-500/10 dark:bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-primary-400 dark:text-primary-400" />
                </div>
                <span className="!text-white dark:!text-white group-hover:!text-white dark:group-hover:!text-white transition-colors">Kigali, Rwanda</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-primary-500/10 dark:bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary-400 dark:text-primary-400" />
                </div>
                <span className="!text-white dark:!text-white group-hover:!text-white dark:group-hover:!text-white transition-colors">+250 788 302 976  </span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="p-2 bg-primary-500/10 dark:bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary-400 dark:text-primary-400" />
                </div>
                <span className="!text-white dark:!text-white group-hover:!text-white dark:group-hover:!text-white transition-colors">bahocoffee@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="!text-white dark:!text-white font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 !text-white dark:!text-white hover:!text-primary-400 dark:hover:!text-primary-400 transition-all duration-300 text-sm"
                  >
                    <span className="w-0 h-0.5 bg-primary-400 dark:bg-primary-400 group-hover:w-4 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="!text-white dark:!text-white font-semibold mb-6 text-lg">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 !text-white dark:!text-white hover:!text-primary-400 dark:hover:!text-primary-400 transition-all duration-300 text-sm"
                  >
                    <span className="w-0 h-0.5 bg-primary-400 dark:bg-primary-400 group-hover:w-4 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="!text-white dark:!text-white font-semibold mb-6 text-lg">Legal</h4>
            <ul className="space-y-3 mb-8">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 !text-white dark:!text-white hover:!text-primary-400 dark:hover:!text-primary-400 transition-all duration-300 text-sm"
                  >
                    <span className="w-0 h-0.5 bg-primary-400 dark:bg-primary-400 group-hover:w-4 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 dark:bg-gray-800/50 hover:bg-primary-500/20 dark:hover:bg-primary-500/20 rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 !text-white dark:!text-white group-hover:!text-primary-400 dark:group-hover:!text-primary-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 dark:border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="!text-white dark:!text-white">
              © {currentYear} Baho Coffee. All rights reserved.
            </p>
            <p className="flex items-center gap-2 !text-white dark:!text-white">
              Made with <span className="text-red-500 dark:text-red-500 animate-pulse">❤️</span> in Rwanda
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

