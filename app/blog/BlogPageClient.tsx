"use client";

import BlogPostsList from "@/components/blog/BlogPostsList";
import { PageAnimation, PageHeader } from "@/components/ui/PageAnimation";

export default function BlogPageClient() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Blog & News"
          description="Stories from our farms, insights about coffee, and updates from the Baho Coffee community."
        />
        <PageAnimation direction="up" delay={0.2}>
          <BlogPostsList />
        </PageAnimation>
      </div>
    </div>
  );
}

