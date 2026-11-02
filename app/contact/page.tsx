import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Baho Coffee",
  description:
    "Contact Baho Coffee in Kigali about specialty coffee, exports, and samples. Email info@bahocoffee.com or call +250 788 302 976.",
  path: "/contact",
  keywords: ["contact Baho Coffee", "coffee exporter Kigali", "Rwandan coffee samples"],
});

export default function ContactPage() {
  return <ContactPageClient />;
}

