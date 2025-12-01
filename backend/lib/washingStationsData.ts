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
      coordinates: [-1.68802, 30.310967], // Updated from provided data
      altitude: "1624 - 1850 m absl",
      longitude: "30°18.6580'E",
      latitude: "1°41.2812'S",
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
      coordinates: [-2.7668167, 29.681625], // Updated from provided data (South is negative)
      altitude: "1648 m absl",
      longitude: "29.681625",
      latitude: "2.7668167",
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
      coordinates: [-1.6489, 30.334733], // Updated from provided data
      altitude: "1420.7 m absl",
      longitude: "30°20.0840'E",
      latitude: "1°38.9340'S",
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
      address: "Northern Province, Rwanda", // Updated: Muzo is in Northern Province
      coordinates: [-1.708683, 29.674917], // Updated from provided data
      altitude: "1669 m absl",
      longitude: "29°40.4950'E",
      latitude: "1°42.5210'S",
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
      coordinates: [-1.708683, 29.674917], // Updated from provided data (same as Muzo location)
      altitude: "1669 m absl",
      longitude: "29°40.4950'E",
      latitude: "1°42.5210'S",
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
      address: "Western Province, Rwanda", // Updated: Ngoma is in Western Province
      coordinates: [-2.379863, 29.075369], // Updated from provided data
      altitude: "1524 m absl",
      longitude: "29.075369",
      latitude: "-2.379863",
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
      address: "Western Province, Rwanda", // Updated: Akagera is in Western Province
      coordinates: [-2.39732, 29.08453], // Updated from provided data
      altitude: "1569 m absl",
      longitude: "29.08453",
      latitude: "-2.39732",
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
      coordinates: [-1.830012, 29.29498], // Updated from provided data
      altitude: "1673 m a.s.l",
      longitude: "29.29498",
      latitude: "-1.830012",
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
      address: "Western Province, Rwanda", // Updated: Matyazo is in Western Province
      coordinates: [-1.792766, 29.632108], // Updated from provided data (E 29'37'56.39052, S 1'47'35.9394)
      altitude: "1500 - 2200 m asl",
      longitude: "E 29°37'56.39052",
      latitude: "S 1°47'35.9394",
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
      coordinates: [-2.590256, 29.186428], // Updated from provided data (E29'11'11.14188, S 2'35'28.09212")
      altitude: "1700 - 2000 m absl",
      longitude: "E 29°11'11.14188",
      latitude: "S 2°35'28.09212",
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
      coordinates: [-1.704852, 30.3428], // Updated from provided data
      altitude: "1800 m absl",
      longitude: "30°20.5680'E",
      latitude: "1°42.2911'S",
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
      address: "Southern Province, Rwanda", // Updated: Karambi is in Southern Province
      coordinates: [-2.505333, 29.616933], // Updated from provided data
      altitude: "1650 - 2000 m absl",
      longitude: "E 029°37.016",
      latitude: "02°30.32'S",
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
      coordinates: [-2.43497, 29.5545913], // Updated from provided data (East is positive)
      altitude: "1849 m absl",
      longitude: "29.5545913",
      latitude: "-2.43497",
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
      coordinates: [-2.359, 29.085], // Updated from provided data
      altitude: "1500 - 1700 m absl",
      longitude: "29.085",
      latitude: "-2.359",
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
      coordinates: [-1.792766, 29.632108], // Using same coordinates as Matyazo (same district)
      altitude: "1500 - 2200 m asl",
      longitude: "E 29°37'56.39052",
      latitude: "S 1°47'35.9394",
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
      coordinates: [-2.557222, 29.0059], // Updated from provided data (2.33'26" = 2.557222 degrees, South is negative)
      altitude: "1395 - 1805 m absl",
      longitude: "29.0059",
      latitude: "2°33'26\"S",
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
      coordinates: [-2.353577, 29.093808], // Updated from provided data
      altitude: "1500 - 1750 m absl", // Fixed typo: 17500 -> 1750
      longitude: "29.093808",
      latitude: "-2.353577",
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
  {
    id: "19",
    name: "Remera CWS",
    slug: "remera",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-2.46863, 29.553228], // Updated from provided data
      altitude: "1918 m a.s.l",
      longitude: "E 29°33'11.622\"",
      latitude: "S 2°28'7.068\"",
    },
    description:
      "Remera Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
    photos: ["/washing-stations/remera.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural", "Honey"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "175 tons",
    established: 2012,
  },
  {
    id: "20",
    name: "Kigoma CWS",
    slug: "kigoma",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-2.497632, 29.636797], // Updated from provided data
      altitude: "1884 m absl",
      longitude: "29.636797, E29 38'12.46812",
      latitude: "-2.497632, S2 29'51.576\"",
    },
    description:
      "Kigoma Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
    photos: ["/washing-stations/kigoma.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "170 tons",
    established: 2011,
  },
  {
    id: "21",
    name: "Nyarusiza CWS",
    slug: "nyarusiza",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-2.530368, 29.575161], // Updated from provided data
      altitude: "1740 - 1953 m absl",
      longitude: "29.575161",
      latitude: "-2.530368",
    },
    description:
      "Nyarusiza Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
    photos: ["/washing-stations/nyarusiza.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural", "Honey"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "185 tons",
    established: 2012,
  },
  {
    id: "22",
    name: "Muhazi CWS",
    slug: "muhazi",
    location: {
      address: "Southern Province, Rwanda",
      coordinates: [-2.125185, 29.714233], // Updated from provided data (E2°07'30.667, 29°42'51.233")
      altitude: "1500 - 2045 m absl",
      longitude: "29°42'51.233\"",
      latitude: "S 2°07'30.667\"",
    },
    description:
      "Muhazi Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
    photos: ["/washing-stations/muhazi.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "190 tons",
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

