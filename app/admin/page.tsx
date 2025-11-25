import { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing Baho Coffee content",
};

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

