import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Baho Coffee. We're here to answer your questions about our coffee, exports, and partnerships.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}

