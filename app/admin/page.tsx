import { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { pageMetadata } from "@/backend/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admin",
  description: "Private dashboard for managing Baho Coffee content.",
  path: "/admin",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminDashboard />
      </div>
    </div>
  );
}