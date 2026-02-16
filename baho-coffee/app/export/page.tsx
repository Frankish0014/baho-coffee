import { Metadata } from "next";
import ExportPageClient from "./ExportPageClient";

export const metadata: Metadata = {
  title: "Export & Sales Portal",
  description:
    "For international buyers: Request quotations, view green coffee availability, and learn about our export process.",
};

export default function ExportPage() {
  return <ExportPageClient />;
}

