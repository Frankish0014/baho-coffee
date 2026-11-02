import { Metadata } from "next";
import ExportPageClient from "./ExportPageClient";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Export Rwandan Green Coffee",
  description:
    "Request a quotation for Rwandan green coffee. Baho Coffee’s export desk covers availability, samples, and buyers worldwide.",
  path: "/export",
  keywords: ["Rwandan green coffee export", "coffee quotation", "Baho Coffee export"],
});

export default function ExportPage() {
  return <ExportPageClient />;
}

