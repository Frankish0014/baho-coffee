import type { Metadata } from "next";
import type { BestOfRwandaLot } from "@/backend/lib/bestOfRwanda2026Data";
import { formatBuyers, formatPricePerLb } from "@/backend/lib/bestOfRwanda2026Data";

export const SITE_URL = "https://bahocoffee.com";
export const SITE_NAME = "Baho Coffee Company Ltd";
export const SITE_SHORT = "Baho Coffee";
export const DEFAULT_OG_IMAGE = "/hero/BAHOCOFFEECOMPANYLTD._29.jpg";
export const CONTENT_UPDATED = new Date("2026-11-02");

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
  noIndex?: boolean;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = "Baho Coffee — specialty coffee from Rwanda",
  keywords,
  noIndex,
  absoluteTitle,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const images = [{ url: image, width: 1200, height: 630, alt: imageAlt }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: noIndex ? undefined : { canonical: url },
    openGraph:
      type === "article"
        ? {
            type: "article",
            locale: "en_US",
            url,
            siteName: SITE_SHORT,
            title,
            description,
            images,
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
          }
        : {
            type: "website",
            locale: "en_US",
            url,
            siteName: SITE_SHORT,
            title,
            description,
            images,
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_SHORT,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/hero/logo.avif"),
        },
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        description:
          "Baho Coffee Company Ltd exports specialty coffee from Rwanda, working with washing stations and farmers across the country.",
        email: "info@bahocoffee.com",
        telephone: "+250788302976",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kigali",
          addressCountry: "RW",
        },
        areaServed: "Worldwide",
        knowsAbout: [
          "Rwandan specialty coffee",
          "Green coffee export",
          "Coffee washing stations",
        ],
        sameAs: ["https://instagram.com/bahocoffee"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_SHORT,
        description:
          "Specialty coffee exporter in Rwanda. Washing stations, traceable lots, and Best of Rwanda 2026 auction results.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: [absoluteUrl(post.image)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/hero/logo.avif"),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "en",
  };
}

export function auctionResultsJsonLd(lots: BestOfRwandaLot[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best of Rwanda 2026 auction results — Baho Coffee",
    description:
      "Prices and buyers for the four Baho Coffee lots sold at the Best of Rwanda 2026 specialty coffee auction.",
    numberOfItems: lots.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: lots.map((lot, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `${lot.cwsName} — Best of Rwanda 2026 Lot ${lot.sale.auctionLot}`,
        description: `${lot.description} Sold to ${formatBuyers(lot.sale.buyers)} at ${formatPricePerLb(lot.sale.pricePerLb)} per pound.`,
        image: absoluteUrl(lot.sale.image),
        brand: {
          "@type": "Brand",
          name: SITE_SHORT,
        },
        category: "Green coffee",
        countryOfOrigin: "Rwanda",
        offers: {
          "@type": "Offer",
          price: lot.sale.pricePerLb.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/SoldOut",
          seller: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      },
    })),
  };
}
