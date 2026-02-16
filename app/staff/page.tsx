import { Metadata } from "next";
import Staff from "@/components/staff/staff";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership team at Baho Coffee—dedicated to quality, sustainability, and empowering Rwanda's coffee communities.",
};

export default function StaffPage() {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Staff />
    </div>
  );
}
