import { Metadata } from "next";

export const dynamic = "force-dynamic";
import BlogPostsList from "@/components/blog/BlogPostsList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read about coffee farming insights, women in coffee stories, sustainability efforts, and updates from Baho Coffee.",
};

export default function BlogPage() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Blog & News
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stories from our farms, insights about coffee, and updates from the
            Baho Coffee community.
          </p>
        </div>
        <BlogPostsList />
      </div>
    </div>
  );
}

