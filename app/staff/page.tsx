import { Metadata } from "next";
import Staff from "@/components/staff/staff";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Team",
  description:
    "Meet the Baho Coffee team in Kigali—the people who work with farmers, washing stations, and international coffee buyers.",
  path: "/staff",
  keywords: ["Baho Coffee team", "coffee company Rwanda"],
});

export default function StaffPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Staff />
    </div>
  );
}
