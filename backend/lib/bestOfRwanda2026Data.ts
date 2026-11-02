export interface LotSale {
  auctionLot: string;
  pricePerLb: number;
  buyers: string[];
  note: string;
  image: string;
}

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
  sale: LotSale;
}

export const bestOfRwanda2026Meta = {
  title: "Best of Rwanda Specialty Coffee 2026",
  subtitle: "Auction results",
  eventDate: "21 October 2026",
  organizedBy: "NAEB (National Agricultural Export Development Board)",
  summary:
    "All four Baho Coffee lots sold at the Best of Rwanda 2026 auction. Ngoma Coffee Washing Station brought the highest price, at $54.80 per pound.",
  closing:
    "Thank you to the buyers who believe in the quality and potential of Rwandan specialty coffee.",
  tagline: "We produce to connect coffee and people.",
  celebrationImage: "/best-of-rwanda-2026/celebration.jpg",
  thankYouImage: "/best-of-rwanda-2026/thank-you.jpg",
  appreciationCertificate: "/certificates/baho-bor-2026-appreciation.jpg",
};

export const bestOfRwanda2026Lots: BestOfRwandaLot[] = [
  {
    id: "2",
    lotNumber: 5,
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
    sale: {
      auctionLot: "05",
      pricePerLb: 54.8,
      buyers: ["COMANSA.KR"],
      note: "Thank you for securing Lot 05 from Ngoma CWS at the Best of Rwanda 2026 auction. Your support helps showcase the quality of Rwandan specialty coffee.",
      image: "/best-of-rwanda-2026/ngoma-lot-05.jpg",
    },
  },
  {
    id: "3",
    lotNumber: 9,
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
      "Kabera Frederick represents farmers at Muganza CWS. Lot 004 moved from the National Jury to the International Jury of Best of Rwanda 2026, reflecting collaboration between farmers and the station.",
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
    sale: {
      auctionLot: "09",
      pricePerLb: 42.1,
      buyers: ["ROW Specialty Coffee"],
      note: "Thank you for choosing Lot 09 from Muganza CWS. We appreciate your confidence in our coffee and your support for Rwanda's specialty coffee community.",
      image: "/best-of-rwanda-2026/muganza-lot-09.jpg",
    },
  },
  {
    id: "4",
    lotNumber: 12,
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
    sale: {
      auctionLot: "12",
      pricePerLb: 30,
      buyers: ["Alinea Coffee Roaster", "Caffeinelab Coffee Roaster"],
      note: "Thank you for securing Lot 12 from Kinazi CWS. Your partnership helps bring Rwandan specialty coffee to more coffee lovers.",
      image: "/best-of-rwanda-2026/kinazi-lot-12.jpg",
    },
  },
  {
    id: "1",
    lotNumber: 14,
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
    sale: {
      auctionLot: "14",
      pricePerLb: 27,
      buyers: ["BREW92"],
      note: "Thank you for securing Lot 14 from Bweyeye CWS. We are grateful for your trust in our coffee and for being part of the journey of Rwandan specialty coffee.",
      image: "/best-of-rwanda-2026/bweyeye-lot-14.jpg",
    },
  },
];

export function formatPricePerLb(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatBuyers(buyers: string[]): string {
  if (buyers.length <= 1) return buyers[0] ?? "";
  if (buyers.length === 2) return `${buyers[0]} & ${buyers[1]}`;
  return `${buyers.slice(0, -1).join(", ")} & ${buyers[buyers.length - 1]}`;
}

export function getAllBestOfRwanda2026Lots(): BestOfRwandaLot[] {
  return [...bestOfRwanda2026Lots].sort(
    (a, b) => b.sale.pricePerLb - a.sale.pricePerLb
  );
}
