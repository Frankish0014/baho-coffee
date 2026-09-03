export interface BestOfRwandaLot {
  id: string;
  lotNumber: number;
  cwsName: string;
  cwsSlug: string;
  lotRef: string;
  processingMethod: string;
  farmerRepresentative: string;
  region: string;
  district: string;
  location: string;
  altitude: string;
  variety: string;
  certificate: string | null;
  description: string;
  farmerStory: string;
  image: string;
  cwsPhotos?: string[];
  farmerPhotos?: string[];
  awardPlace?: string;
  awardScore?: string;
  awardCategory?: string;
  awardCertificate?: string;
}

export const bestOfRwanda2026Meta = {
  title: "Best of Rwanda Specialty Coffee 2026",
  subtitle: "Baho Coffee winning lots",
  eventDate: "21 October 2026",
  auctionUrl: "https://www.bestofrwandacoffee.com",
  auctionName: "Best of Rwanda Auction 2026",
  platformName: "Best of Rwanda Specialty Coffee",
  poweredBy: "V-Auction",
  organizedBy: "NAEB (National Agricultural Export Development Board)",
  incoterms: "FOB, Rwanda",
  contactEmail: "bestofrwanda@v-auction.com",
  summary:
    "Four Baho Coffee lots progressed through the Best of Rwanda 2026 competition—showcasing exceptional coffees from our washing stations across Rwanda.",
  auctionSummary:
    "Our winning lots will be offered at the Best of Rwanda Auction 2026—Rwanda’s premier specialty coffee auction, organized by NAEB and powered by the V-Auction platform. Buyers can register, request samples, and bid online.",
  appreciationCertificate: "/certificates/baho-bor-2026-appreciation.jpg",
};

export const bestOfRwanda2026Lots: BestOfRwandaLot[] = [
  {
    id: "1",
    lotNumber: 1,
    cwsName: "Bweyeye CWS",
    cwsSlug: "bweyeye",
    lotRef: "001",
    processingMethod: "Natural",
    farmerRepresentative: "Hakizamungu Elizaphan",
    region: "Western Province",
    district: "Rusizi",
    location: "Bweyeye",
    altitude: "1600–2000m",
    variety: "Red Bourbon",
    certificate: null,
    description:
      "Premium natural coffee from Bweyeye Coffee Washing Station in Rusizi District, grown between 1600–2000 meters. The cool climate near Nyungwe Forest creates ideal conditions for high-quality coffee. Ripe cherries are carefully sorted and dried with the pulp intact.",
    farmerStory:
      "Represented by Hakizamungu Elizaphan and nine partner farmers from Bweyeye Sector—Rasano, Murwa, Kiyabo, Gikungu, and Nyamuzi—whose cherries are processed at Baho Bweyeye CWS.",
    image: "/washing-stations/bweyeye-cws-1.jpg",
    cwsPhotos: [
      "/washing-stations/bweyeye-cws-1.jpg",
      "/washing-stations/bweyeye-cws-2.jpg",
    ],
    farmerPhotos: [
      "/washing-stations/bweyeye-farmer-1.jpg",
      "/washing-stations/bweyeye-farmer-2.jpg",
    ],
    awardPlace: "14th Place",
    awardScore: "87.95",
    awardCategory: "Special Processing",
    awardCertificate: "/certificates/bweyeye-bor-2026.jpg",
  },
  {
    id: "2",
    lotNumber: 2,
    cwsName: "Ngoma CWS",
    cwsSlug: "ngoma",
    lotRef: "1",
    processingMethod: "Natural (Anaerobic, shade-dried)",
    farmerRepresentative: "Ngayabarambirwa Jean Bosco",
    region: "Western Province",
    district: "Nyamasheke",
    location: "Bushekeri",
    altitude: "1700–1800m",
    variety: "Red Bourbon",
    certificate: null,
    description:
      "A specially prepared lot selected from four high-altitude farmers, processed using anaerobic natural methods under shade at Ngoma Coffee Washing Station.",
    farmerStory:
      "Ngayabarambirwa Jean Bosco farms professionally across more than 7 hectares of young coffee trees—delivering exceptional cherries despite less than ten years in coffee farming.",
    image: "/washing-stations/ngoma-cws-1.jpg",
    cwsPhotos: [
      "/washing-stations/ngoma-cws-1.jpg",
      "/washing-stations/ngoma-cws-2.jpg",
    ],
    farmerPhotos: [
      "/washing-stations/ngoma-farmer-1.jpg",
      "/washing-stations/ngoma-farmer-2.jpg",
    ],
    awardPlace: "5th Place",
    awardScore: "89.60",
    awardCategory: "Special Processing",
    awardCertificate: "/certificates/ngoma-bor-2026.jpg",
  },
  {
    id: "3",
    lotNumber: 3,
    cwsName: "Muganza CWS",
    cwsSlug: "muganza",
    lotRef: "004",
    processingMethod: "Anaerobic Natural",
    farmerRepresentative: "Kabera Frederick",
    region: "Southern Province",
    district: "Nyamagabe",
    location: "Kibirizi",
    altitude: "1890–1950m",
    variety: "Arabica",
    certificate: "Fairtrade",
    description:
      "River Flow Fermentation Lot 004—an experimental anaerobic natural processed at Muganza CWS using closely monitored fermentation, hygiene, drying, and full traceability.",
    farmerStory:
      "Kabera Frederick represents farmers at Muganza CWS. Lot 004 progressed from the National Jury to the International Jury stage of Best of Rwanda 2026, reflecting collaboration between farmers and the station.",
    image: "/washing-stations/muganza-cws-1.jpg",
    cwsPhotos: [
      "/washing-stations/muganza-cws-1.jpg",
      "/washing-stations/muganza-cws-2.jpg",
    ],
    farmerPhotos: [
      "/washing-stations/muganza-farmer-1.jpg",
      "/washing-stations/muganza-farmer-2.jpg",
    ],
    awardPlace: "9th Place",
    awardScore: "88.16",
    awardCategory: "Special Processing",
    awardCertificate: "/certificates/muganza-bor-2026.jpg",
  },
  {
    id: "4",
    lotNumber: 4,
    cwsName: "Kinazi CWS",
    cwsSlug: "kinazi",
    lotRef: "LOT 71",
    processingMethod: "Natural",
    farmerRepresentative: "Mukarugira Emertha",
    region: "Southern Province",
    district: "Ruhango",
    location: "Kinazi",
    altitude: "1450–1500m",
    variety: "Arabica",
    certificate: "Rainforest Alliance Certified",
    description:
      "Natural lot 71 from Kinazi CWS: cherries are float-separated, carefully dried on raised beds with regular turning over 19 days to 12.0% moisture, then stored in clean bags.",
    farmerStory:
      "Mukarugira Emertha and fellow Kinazi farmers harvest only ripe cherries using clean equipment and deliver them directly to the washing station for processing.",
    image: "/washing-stations/kinazi-cws-1.jpg",
    cwsPhotos: [
      "/washing-stations/kinazi-cws-1.jpg",
      "/washing-stations/kinazi-cws-2.jpg",
    ],
    farmerPhotos: [
      "/washing-stations/kinazi-farmer-1.jpg",
      "/washing-stations/kinazi-farmer-2.jpg",
    ],
    awardPlace: "12th Place",
    awardScore: "88.07",
    awardCategory: "Special Processing",
    awardCertificate: "/certificates/kinazi-bor-2026.jpg",
  },
];

export function getAllBestOfRwanda2026Lots(): BestOfRwandaLot[] {
  return bestOfRwanda2026Lots;
}
