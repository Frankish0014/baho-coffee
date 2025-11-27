import { WashingStation } from "@/types";

/**
 * WASHING STATIONS DATA FILE
 * 
 * To add or update manager information for any washing station:
 * 1. Find the washing station in the array below
 * 2. Add or update the "manager" field with:
 *    - name: Manager's full name
 *    - photo: Path to manager's photo (e.g., "/washing-stations/managers/john-doe.jpg")
 *    - description: Important description about the manager
 * 
 * Example:
 * manager: {
 *   name: "John Doe",
 *   photo: "/washing-stations/managers/john-doe.jpg",
 *   description: "John has been managing this station for over 10 years..."
 * }
 * 
 * 3. Save the file and the changes will appear on the website
 */

// All washing stations data
export const washingStations: WashingStation[] = [
  {
    id: "1",
    name: "Humure CWS",
    slug: "humure",
    location: {
      address: "Eastern Province, Rwanda",
      coordinates: [-1.5833, 29.7167],
    },
    description:
      "Humure Coffee Washing Station is dedicated to producing high-quality specialty coffee through sustainable practices and direct partnerships with local farmers.",
    photos: ["/washing-stations/humure.jpg","/washing-stations/shara.jpg","/washing-stations/ngororero.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural", "Honey", "Other Experimental Methods"],
    varieties: ["Red Bourbon"],
    farmers: [],
    annualCapacity: "180 tons",
    established: 2011,
    manager: {
      name: "Nzaramba Straton",
      photo: "/washing-stations/managers/humure-manager.jpg",
      description: "Include his experience, achievements or any other.",
    },
  },
  {
    id: "2",
    name: "Fugi CWS",
    slug: "fugi",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-1.9441, 29.7959],
    },
    description:
      "Fugi Coffee Washing Station focuses on processing exceptional washed coffees with bright, clean profiles that showcase Rwanda's unique terroir.",
    photos: ["/washing-stations/fugi.png"],
    videos: [],
    processingMethods: ["Washed", "Honey", "Natural", "Other Experimental Methods"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "200 tons",
    established: 2010,
    manager: {
      name: "Munyangaju Aphordis",
      photo: "/washing-stations/managers/humure-manager.jpg",
      description: "Add an important description about the manager here. This could include their experience, achievements, or role at the washing station.",
    },
  },
  {
    id: "3",
    name: "Gitoki CWS",
    slug: "gitoki",
    location: {
      address: "Eastern Province, Rwanda",
      coordinates: [-2.0833, 29.3333],
    },
    description:
      "Gitoki Coffee Washing Station is known for its commitment to quality and sustainable farming practices, working closely with smallholder farmers.",
    photos: ["/washing-stations/gitoki.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural", "Honey", "Other Experimental Methods"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "150 tons",
    established: 2012,
  },
  {
    id: "4",
    name: "Muzo CWS",
    slug: "muzo",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-2.0167, 29.3833],
    },
    description:
      "Muzo Coffee Washing Station processes specialty coffees with a focus on traceability and supporting local farming communities.",
    photos: ["/washing-stations/muzo.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey", "Natural"],
    varieties: ["Bourbon", "Typica"],
    farmers: [],
    annualCapacity: "220 tons",
    established: 2009,
  },
  {
    id: "5",
    name: "Gakenke CWS",
    slug: "gakenke",
    location: {
      address: "Northern Province, Rwanda",
      coordinates: [-1.6333, 29.7500],
    },
    description:
      "Gakenke Coffee Washing Station is our newest addition, established this year. It brings fresh capacity and modern processing techniques to our network.",
    photos: ["/washing-stations/gakenke.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "160 tons",
    established: 2025,
  },
  {
    id: "6",
    name: "Cyabingo CWS",
    slug: "cyabingo",
    location: {
      address: "Northern Province, Rwanda",
      coordinates: [-1.5500, 29.6833],
    },
    description:
      "Cyabingo Coffee Washing Station is another new addition this year, expanding our reach in the Northern Province with state-of-the-art facilities.",
    photos: ["/washing-stations/cyabingo.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey"],
    varieties: ["Bourbon"],
    farmers: [],
    annualCapacity: "170 tons",
    established: 2024,
  },
  {
    id: "7",
    name: "Ngoma CWS",
    slug: "ngoma",
    location: {
      address: "Eastern Province, Rwanda",
      coordinates: [-2.1167, 30.4167],
    },
    description:
      "Ngoma Coffee Washing Station processes coffees from the Eastern Province, known for their balanced flavor profiles and consistent quality.",
    photos: ["/washing-stations/ngoma.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "190 tons",
    established: 2011,
  },
  {
    id: "8",
    name: "Akagera CWS",
    slug: "akagera",
    location: {
      address: "Eastern Province, Rwanda",
      coordinates: [-2.0833, 30.5000],
    },
    description:
      "Akagera Coffee Washing Station, named after the nearby Akagera National Park, focuses on sustainable practices and environmental conservation.",
    photos: ["/washing-stations/akagera.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey"],
    varieties: ["Bourbon", "Typica"],
    farmers: [],
    annualCapacity: "175 tons",
    established: 2013,
  },
  {
    id: "9",
    name: "Bugoyi CWS",
    slug: "bugoyi",
    location: {
      address: "Western Province, Rwanda",
      coordinates: [-1.9441, 29.7959],
    },
    description:
      "Bugoyi Coffee Washing Station is one of our flagship stations, processing some of our finest washed coffees with bright, clean profiles.",
    photos: ["/washing-stations/bugoyi.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "200 tons",
    established: 2010,
  },
  {
    id: "10",
    name: "Matyazo CWS",
    slug: "matyazo",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-2.6039, 29.7439],
    },
    description:
      "Matyazo Coffee Washing Station specializes in natural processed coffees, creating rich, fruity profiles that highlight Rwanda's unique coffee characteristics.",
    photos: ["/washing-stations/matyazo.png"],
    videos: [],
    processingMethods: ["Natural", "Washed"],
    varieties: ["Bourbon", "Typica"],
    farmers: [],
    annualCapacity: "185 tons",
    established: 2012,
  },
  {
    id: "11",
    name: "Bweyeye CWS",
    slug: "bweyeye",
    location: {
      address: "Western Province, Rwanda",
      coordinates: [-2.0167, 29.3500],
    },
    description:
      "Bweyeye Coffee Washing Station works with local cooperatives to process high-quality specialty coffees while supporting community development.",
    photos: ["/washing-stations/bweyeye.png"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "165 tons",
    established: 2011,
  },
  {
    id: "12",
    name: "Kinazi CWS",
    slug: "kinazi",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-2.5500, 29.8000],
    },
    description:
      "Kinazi Coffee Washing Station is known for its exceptional quality control and traceability, ensuring every batch meets our high standards.",
    photos: ["/washing-stations/kinazi.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey", "Natural"],
    varieties: ["Bourbon", "Typica"],
    farmers: [],
    annualCapacity: "195 tons",
    established: 2010,
  },
  {
    id: "13",
    name: "Karambi CWS",
    slug: "karambi",
    location: {
      address: "Western Province, Rwanda",
      coordinates: [-1.9167, 29.8333],
    },
    description:
      "Karambi Coffee Washing Station processes specialty coffees with a focus on empowering women farmers and sustainable practices.",
    photos: ["/washing-stations/karambi.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "180 tons",
    established: 2011,
  },
  {
    id: "14",
    name: "Muganza CWS",
    slug: "muganza",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-1.9167, 29.8333],
    },
    description:
      "Muganza Coffee Washing Station processes specialty coffees with a focus on empowering women farmers and sustainable practices.",
    photos: ["/washing-stations/muganza.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "180 tons",
    established: 2011,
  },
  {
    id: "15",
    name: "Shara CWS",
    slug: "shara",
    location: {
      address: "Western Province, Rwanda",
      coordinates: [-1.9167, 29.8333],
    },
    description:
      "Shara Coffee Washing Station processes specialty coffees with a focus on empowering women farmers and sustainable practices.",
    photos: ["/washing-stations/shara.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "180 tons",
    established: 2011,
  },
  {
    id: "16",
    name: "Ngororero CWS",
    slug: "ngororero",
    location: {
      address: "Western Province, Rwanda",
      coordinates: [-1.9167, 29.8333],
    },
    description:
      "Ngororero Coffee Washing Station processes specialty coffees with a focus on empowering women farmers and sustainable practices.",
    photos: ["/washing-stations/ngororero.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "180 tons",
    established: 2024,
  },
  {
    id: "17",
    name: "Shangi CWS",
    slug: "shangi",
    location: {
      address: "Western Province, Rwanda",
      coordinates: [-1.9167, 29.8333],
    },
    description:
      "Shangi Coffee Washing Station processes specialty coffees with a focus on empowering women farmers and sustainable practices.",
    photos: ["/washing-stations/shangi.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "180 tons",
    established: 2011,
  },
  {
    id: "18",
    name: "Mugera CWS",
    slug: "mugera",
    location: {
      address: "Western Province, Rwanda",
      coordinates: [-1.9167, 29.8333],
    },
    description:
      "Mugera Coffee Washing Station processes specialty coffees with a focus on empowering women farmers and sustainable practices.",
    photos: ["/washing-stations/mugera.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "180 tons",
    established: 2011,
  },
];

// Helper function to get station by slug
export function getWashingStationBySlug(slug: string): WashingStation | null {
  return washingStations.find((s) => s.slug === slug) || null;
}

// Helper function to get all stations
export function getAllWashingStations(): WashingStation[] {
  return washingStations;
}

