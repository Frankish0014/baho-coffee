"use client";

import AboutContent from "@/components/about/AboutContent";
import { PageAnimation } from "@/components/ui/PageAnimation";

export default function AboutPageClient() {
  return (
    <PageAnimation className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen" direction="fade" delay={0.1}>
      <AboutContent />
    </PageAnimation>
  );
}

