import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { getBlogPostBySlug, getAllBlogPosts } from "@/backend/lib/blogData";
import MarkdownContent from "@/components/blog/MarkdownContent";
import BlogAd from "@/components/blog/BlogAd";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categoryColors = {
    farming: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
    "women-in-coffee":
      "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300",
    events: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
    sustainability:
      "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
    news: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
  };

  return (
    <div className="pt-20 pb-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Category and Date */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  categoryColors[post.category]
                }`}
              >
                {post.category.replace("-", " ")}
              </span>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-8">
              <User className="w-5 h-5 mr-2" />
              <span>{post.author}</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Content with Ad Insertion */}
            <BlogPostContentWithAds content={post.content} postSlug={post.slug} />
          </div>
        </article>

        {/* Related Posts or Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Posts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Component to render blog content with ads inserted at strategic points
function BlogPostContentWithAds({ 
  content, 
  postSlug 
}: { 
  content: string; 
  postSlug: string;
}) {
  // For the "Empowering Women in Coffee" post, insert ad after "Our Commitment to Women" section
  if (postSlug === "women-in-coffee-rwanda") {
    // Find the end of "Our Commitment to Women" section (before "## Success Stories")
    const commitmentIndex = content.indexOf("## Our Commitment to Women");
    const successStoriesIndex = content.indexOf("## Success Stories");
    
    if (commitmentIndex !== -1 && successStoriesIndex !== -1 && successStoriesIndex > commitmentIndex) {
      const beforeAd = content.substring(0, successStoriesIndex);
      const afterAd = content.substring(successStoriesIndex);
      
      return (
        <>
          <MarkdownContent content={beforeAd} />
          <BlogAd />
          <MarkdownContent content={afterAd} />
        </>
      );
    }
  }
  
  // For other posts, insert ad in the middle of content
  const contentLength = content.length;
  const halfwayPoint = Math.floor(contentLength / 2);
  
  // Try to find a good break point (after a paragraph or section)
  let breakPoint = halfwayPoint;
  const searchRange = 500; // Search within 500 characters of halfway point
  
  // Look for paragraph breaks or section headers near the halfway point
  for (let i = halfwayPoint; i < Math.min(contentLength, halfwayPoint + searchRange); i++) {
    if (content[i] === '\n' && i > 0 && content[i - 1] === '\n') {
      breakPoint = i;
      break;
    }
  }
  
  const beforeAd = content.substring(0, breakPoint);
  const afterAd = content.substring(breakPoint);
  
  return (
    <>
      <MarkdownContent content={beforeAd} />
      <BlogAd variant="compact" />
      <MarkdownContent content={afterAd} />
    </>
  );
}
