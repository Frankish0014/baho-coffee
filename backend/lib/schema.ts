import { CoffeeProduct, WashingStation } from "@/types";

export function generateProductSchema(product: CoffeeProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "Baho Coffee",
    },
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: product.currency || "USD",
          availability: product.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        }
      : undefined,
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Baho Coffee",
    url: "https://bahocoffee.com",
    logo: "https://bahocoffee.com/logo.png",
    description:
      "Baho Coffee exports specialty coffee from Rwanda. Connecting farmers with the world.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RW",
      addressLocality: "Kigali",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+250-XXX-XXX-XXX",
      contactType: "customer service",
      email: "info@bahocoffee.com",
    },
    sameAs: [
      "https://facebook.com/bahocoffee",
      "https://instagram.com/bahocoffee",
      "https://twitter.com/bahocoffee",
    ],
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Baho Coffee",
    image: "https://bahocoffee.com/logo.png",
    "@id": "https://bahocoffee.com",
    url: "https://bahocoffee.com",
    telephone: "+250-XXX-XXX-XXX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
  };
}

