import { Metadata } from "next";
import UnsubscribeClient from "./UnsubscribeClient";

export const metadata: Metadata = {
  title: "Unsubscribe from Newsletter",
  description: "Unsubscribe from the Baho Coffee newsletter.",
  robots: "noindex, nofollow",
};

export default function NewsletterUnsubscribePage() {
  return <UnsubscribeClient />;
}
