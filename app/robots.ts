import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/studio", "/newsletter/"],
      },
    ],
    sitemap: "https://bahocoffee.com/sitemap.xml",
  };
}

