import { CoffeeProduct } from "@/types";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/backend/lib/seo";

export function generateProductSchema(product: CoffeeProduct) {
  const offerPrice = product.price ?? product.packagingOptions.find((option) => option.price)?.price;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image)),
    url: absoluteUrl(`/products/${product.slug}`),
    brand: {
      "@type": "Brand",
      name: "Baho Coffee",
    },
    category: "Specialty coffee",
    countryOfOrigin: "Rwanda",
    offers: offerPrice
      ? {
          "@type": "Offer",
          price: String(offerPrice),
          priceCurrency: product.currency || "USD",
          availability: product.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: absoluteUrl(`/products/${product.slug}`),
          seller: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        }
      : undefined,
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/hero/logo.avif"),
    email: "info@bahocoffee.com",
    telephone: "+250788302976",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    sameAs: ["https://instagram.com/bahocoffee"],
  };
}

