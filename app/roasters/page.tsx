import { Metadata } from "next";
import RoasterPortal from "@/components/roasters/RoasterPortal";

export const metadata: Metadata = {
  title: "Roaster Portal",
  description:
    "Engage with Baho Coffee as a roaster. Access exclusive resources, connect with our team, and discover partnership opportunities.",
};

export default function RoastersPage() {
  return (
    <div className="pt-20 pb-20 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <RoasterPortal />
    </div>
  );
}

