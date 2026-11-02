import { Metadata } from "next";
import UnsubscribeClient from "./UnsubscribeClient";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Unsubscribe",
  description: "Unsubscribe from the Baho Coffee newsletter.",
  path: "/newsletter/unsubscribe",
  noIndex: true,
});

export default function NewsletterUnsubscribePage() {
  return <UnsubscribeClient />;
}
