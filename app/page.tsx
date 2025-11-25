import Hero from "@/components/home/Hero";
import StorySection from "@/components/home/StorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import OriginStory from "@/components/home/OriginStory";
import Certifications from "@/components/home/Certifications";
import InstagramFeed from "@/components/home/InstagramFeed";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Baho Coffee - Exporting specialty coffee from Rwanda. Discover our story, washing stations, and the finest Rwandan coffee.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <FeaturedProducts />
      <OriginStory />
      <Certifications />
      <InstagramFeed />
      <Partners />
      <Testimonials />
    </>
  );
}

