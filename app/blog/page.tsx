import { Metadata } from "next";
import { pageMetadata } from "@/backend/lib/seo";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Coffee Stories from Rwanda",
  description:
    "Stories from Baho Coffee on farming, women in coffee, sustainability, and specialty coffee from Rwanda’s washing stations.",
  path: "/blog",
  keywords: ["Rwanda coffee blog", "women in coffee", "Baho Coffee stories"],
});

export default function BlogPage() {
  return <BlogPageClient />;
}

