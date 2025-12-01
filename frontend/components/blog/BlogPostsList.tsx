"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { BlogPost } from "@/types";

// Mock data - replace with CMS data
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Coffee Processing: Washed vs Natural",
    slug: "coffee-processing-washed-vs-natural",
    excerpt:
      "Learn about the different processing methods and how they affect the final cup profile of your coffee.",
    content: "",
    author: "Baho Coffee Team",
    publishedAt: "2024-01-15",
    image: "/hero/casual.jpg",
    category: "farming",
    tags: ["processing", "education"],
  },
  {
    id: "2",
    title: "Empowering Women in Coffee: Stories from Rwanda",
    slug: "women-in-coffee-rwanda",
    excerpt:
      "Meet the incredible women who are shaping the future of Rwandan coffee.",
    content: "",
    author: "Baho Coffee Team",
    publishedAt: "2024-01-10",
    image: "/hero/BAHO_29.jpg",
    category: "women-in-coffee",
    tags: ["women", "community"],
  },
  {
    id: "3",
    title: "Sustainable Farming Practices at Our Washing Stations",
    slug: "sustainable-farming-practices",
    excerpt:
      "Discover how we're working with farmers to implement sustainable practices.",
    content: "",
    author: "Baho Coffee Team",
    publishedAt: "2024-01-05",
    image: "/hero/BAHO_35.jpg",
    category: "sustainability",
    tags: ["sustainability", "farming"],
  },
];

const categoryColors = {
  farming: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
  "women-in-coffee": "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
  events: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
  sustainability: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
  news: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
};

export default function BlogPostsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  categoryColors[post.category]
                }`}
              >
                {post.category.replace("-", " ")}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" />
                {post.author}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

