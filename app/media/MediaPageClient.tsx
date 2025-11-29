"use client";

import MediaGallery from "@/components/media/MediaGallery";
import { PageAnimation, PageHeader } from "@/components/ui/PageAnimation";

export default function MediaPageClient() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Media & Downloads"
          description="Explore our photo gallery, watch videos, and download resources."
        />
        <PageAnimation direction="up" delay={0.2}>
          <MediaGallery />
        </PageAnimation>
      </div>
    </div>
  );
}

