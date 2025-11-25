import { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Baho Coffee's mission, history, leadership team, and our commitment to supporting Rwandan coffee farmers and communities.",
};

export default function AboutPage() {
  return (
    <div className="pt-20 pb-20">
      <AboutContent />
    </div>
  );
}

