import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Baho Coffee's mission, history, leadership team, and our commitment to supporting Rwandan coffee farmers and communities.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}

