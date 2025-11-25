import { Metadata } from "next";
import WashingStationDetails from "@/components/washing-stations/WashingStationDetails";
import { WashingStation } from "@/types";
import { getWashingStationBySlug } from "@/lib/washingStationsData";

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
      <div className="pt-20 pb-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Station Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The washing station you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return <WashingStationDetails station={station} />;
}

