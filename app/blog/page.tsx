import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read about coffee farming insights, women in coffee stories, sustainability efforts, and updates from Baho Coffee.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}

