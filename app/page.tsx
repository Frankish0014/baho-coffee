import Hero from "@/components/home/Hero";
import StorySection from "@/components/home/StorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestOfRwanda2026Section from "@/components/best-of-rwanda/BestOfRwanda2026Section";
import OriginStory from "@/components/home/OriginStory";
import Certifications from "@/components/home/Certifications";
import InstagramFeed from "@/components/home/InstagramFeed";
// import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import { Metadata } from "next";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Baho Coffee | Specialty Coffee Exporter from Rwanda",
  description:
    "Baho Coffee exports traceable specialty coffee from Rwanda. Meet the washing stations and see what our four Best of Rwanda 2026 lots sold for.",
  path: "/",
  absoluteTitle: true,
  keywords: [
    "Baho Coffee",
    "Rwanda specialty coffee",
    "green coffee exporter",
    "Best of Rwanda 2026",
    "coffee washing stations Rwanda",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <FeaturedProducts />
      <BestOfRwanda2026Section />
      <OriginStory />
      <Certifications />
      <InstagramFeed />
      {/* <Partners /> */}
      <Testimonials />
    </>
  );
}