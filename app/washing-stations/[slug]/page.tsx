import { Metadata } from "next";
import WashingStationDetails from "@/components/washing-stations/WashingStationDetails";
import { WashingStation } from "@/types";
import { getWashingStationBySlug } from "@/backend/lib/washingStationsData";

// Get washing station by slug
async function getWashingStation(
  slug: string
): Promise<WashingStation | null> {
  return getWashingStationBySlug(slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const station = await getWashingStation(slug);

  if (!station) {
    return {
      title: "Washing Station Not Found",
    };
  }

  return {
    title: station.name,
    description: station.description,
  };
}

export default async function WashingStationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const station = await getWashingStation(slug);

  if (!station) {
    return (
      <div className="pt-20 pb-20 text-center bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Station Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The washing station you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <WashingStationDetails station={station} />
    </div>
  );
}

