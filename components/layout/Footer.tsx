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
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/hero/logo.avif"
                alt="Baho Coffee"
                width={180}
                height={60}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm mb-4">
              Exporting specialty coffee from Rwanda. Connecting farmers
              with the world.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Kigali, Rwanda</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+250 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@bahocoffee.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.label}
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
                    className="hover:text-primary-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} Baho Coffee. All rights reserved. | Made with ❤️ in
            Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
}

