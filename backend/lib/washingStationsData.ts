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
      address: "Gatsibo District, Eastern Province, Rwanda",
      coordinates: [-1.68802, 30.310967], 
      altitude: "1582-1882m Asl",
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
      photo: "/washing-stations/managers/Straton Nzaramba.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "2",
    name: "Fugi CWS",
    slug: "fugi",
    location: {
      address: "Nyaruguru District, Southern Province, Rwanda",
      coordinates: [-2.7668167, 29.681625], 
      altitude: "1700-2000m Asl",
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
      photo: "/washing-stations/managers/Aphrodis.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "3",
    name: "Gitoki CWS",
    slug: "gitoki",
    location: {
      address: "Gatsibo District, Eastern Province, Rwanda",
      coordinates: [-1.6489, 30.334733],
      altitude: "1500-1800m Asl",
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
    manager: {
      name: "Nyirishema",
      photo: "/washing-stations/managers/Nyirishema.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "4",
    name: "Muzo CWS",
    slug: "muzo",
    location: {
      address: "Gakenke District, Northern Province, Rwanda",
      coordinates: [-1.708683, 29.674917], 
      altitude: "1500-2100m Asl",
      longitude: "29°40.4950'E",
      latitude: "1°42.5210'S",
    },
    description:
      "Muzo Coffee Washing Station processes specialty coffees with a focus on traceability and supporting local farming communities.",
    photos: ["/washing-stations/Muzo.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey", "Natural"],
    varieties: ["Bourbon"],
    farmers: [],
    annualCapacity: "220 tons",
    established: 2009,
    manager: {
      name: "Vedaste",
      photo: "/washing-stations/VedasteMuzo.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "5",
    name: "Gaseke CWS",
    slug: "gaseke",
    location: {
      address: "Muhanga District, Southern Province, Rwanda",
      coordinates: [-2.08, 29.75],
      altitude: "1500-1900m Asl",
    },
    description:
      "Gaseke Coffee Washing Station processes specialty coffees in Muhanga, where volcanic soils and high altitude produce distinctive Rwandan profiles.",
    photos: ["/washing-stations/Processing coffee.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "160 tons",
    established: 2025,
    manager: {
      name: "Gaseke Station Manager",
      photo: "/washing-stations/managers/Munyangaju.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "6",
    name: "Cyabingo CWS",
    slug: "cyabingo",
    location: {
      address: "Gakenke District, Northern Province, Rwanda",
      coordinates: [-1.5500, 29.6833],
      altitude: "1535-2000m Asl",
    },
    description:
      "Cyabingo Coffee Washing Station is another new addition this year, expanding our reach in the Northern Province with state-of-the-art facilities.",
    photos: ["/washing-stations/cyabingo.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey"],
    varieties: ["Bourbon"],
    farmers: [],
    annualCapacity: "170 tons",
    established: 2025,
    manager: {
      name: "Charles Mvuyekure",
      photo: "/washing-stations/managers/Charles.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "7",
    name: "Ngoma CWS",
    slug: "ngoma",
    location: {
      address: "Nyamasheke District, Western Province, Rwanda", 
      coordinates: [-2.379863, 29.075369], 
      altitude: "1500-2000m Asl",
      longitude: "29.075369",
      latitude: "-2.379863",
    },
    description:
      "Ngoma Coffee Washing Station processes coffees from Nyamasheke in the Western Province, known for their balanced flavor profiles and consistent quality.",
    photos: [
      "/washing-stations/ngoma-cws-1.jpg",
      "/washing-stations/ngoma-cws-2.jpg",
    ],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [
      {
        id: "ngoma-jean-bosco",
        name: "Ngayabarambirwa Jean Bosco",
        photo: "/washing-stations/ngoma-farmer-1.jpg",
        photos: [
          "/washing-stations/ngoma-farmer-1.jpg",
          "/washing-stations/ngoma-farmer-2.jpg",
        ],
        story:
          "Ngayabarambirwa Jean Bosco farms professionally across more than 7 hectares of young coffee trees, delivering exceptional cherries for Ngoma CWS and Best of Rwanda 2026 lot 1.",
        location: "Bushekeri, Nyamasheke District",
        yearsOfExperience: 8,
        varieties: ["Red Bourbon"],
        role: "Coffee farmer",
        awardLabel: "5th Place · Best of Rwanda 2026",
        awardScore: "89.60",
      },
    ],
    annualCapacity: "190 tons",
    established: 2011,
  },
  {
    id: "8",
    name: "Akagera CWS",
    slug: "akagera",
    location: {
      address: "Nyamasheke District, Western Province, Rwanda",
      coordinates: [-2.39732, 29.08453], 
      altitude: "1600-2000m Asl",
      longitude: "29.08453",
      latitude: "-2.39732",
    },
    description:
      "Akagera Coffee Washing Station in Nyamasheke focuses on sustainable practices and environmental conservation.",
    photos: ["/washing-stations/Akagera.jpg"],
    videos: [],
    processingMethods: ["Washed", "Honey"],
    varieties: ["Bourbon"],
    farmers: [],
    annualCapacity: "175 tons",
    established: 2013,
    manager: {
      name: "Akagera Station Manager",
      photo: "/washing-stations/managers/Aphrodic.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "9",
    name: "Bugoyi CWS",
    slug: "bugoyi",
    location: {
      address: "Rutsiro District, Western Province, Rwanda",
      coordinates: [-1.830012, 29.29498], 
      altitude: "1500-1900m Asl",
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
    manager: {
      name: "Bugoyi Station Manager",
      photo: "/washing-stations/managers/Spirie (2).jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "10",
    name: "Matyazo CWS",
    slug: "matyazo",
    location: {
      address: "Ngororero District, Western Province, Rwanda", 
      coordinates: [-1.792766, 29.632108], 
      altitude: "1500-2200m Asl",
      longitude: "E 29°37'56.39052",
      latitude: "S 1°47'35.9394",
    },
    description:
      "Matyazo Coffee Washing Station specializes in natural processed coffees, creating rich, fruity profiles that highlight Rwanda's unique coffee characteristics.",
    photos: ["/washing-stations/matyazo.png"],
    videos: [],
    processingMethods: ["Natural", "Washed"],
    varieties: ["Bourbon"],
    farmers: [],
    annualCapacity: "185 tons",
    established: 2012,
    manager: {
      name: "Charles Mvuyekure",
      photo: "/washing-stations/managers/Charles.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "11",
    name: "Bweyeye CWS",
    slug: "bweyeye",
    location: {
      address: "Rusizi District, Western Province, Rwanda",
      coordinates: [-2.590256, 29.186428],
      altitude: "1700-2000m Asl",
      longitude: "E 29°11'11.14188",
      latitude: "S 2°35'28.09212",
    },
    description:
      "Bweyeye Coffee Washing Station works with local cooperatives to process high-quality specialty coffees while supporting community development.",
    photos: [
      "/washing-stations/bweyeye-cws-1.jpg",
      "/washing-stations/bweyeye-cws-2.jpg",
    ],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [
      {
        id: "bweyeye-elizaphan",
        name: "Hakizamungu Elizaphan",
        photo: "/washing-stations/bweyeye-farmer-1.jpg",
        photos: [
          "/washing-stations/bweyeye-farmer-1.jpg",
          "/washing-stations/bweyeye-farmer-2.jpg",
        ],
        story:
          "Hakizamungu Elizaphan is a coffee farmer representing ten partner farmers from Bweyeye Sector whose cherries are processed at Baho Bweyeye CWS. Their lot 001 placed among the Best of Rwanda 2026 winners and will be offered at auction.",
        location: "Bweyeye, Rusizi District",
        yearsOfExperience: 25,
        varieties: ["Red Bourbon"],
        role: "Coffee farmer",
        awardLabel: "14th Place · Best of Rwanda 2026",
        awardScore: "87.95",
      },
    ],
    annualCapacity: "165 tons",
    established: 2011,
  },
  {
    id: "12",
    name: "Kinazi CWS",
    slug: "kinazi",
    location: {
      address: "Ruhango District, Southern Province, Rwanda",
      coordinates: [-2.15, 29.78], 
      altitude: "1555-1900m Asl",
      longitude: "30°20.5680'E",
      latitude: "1°42.2911'S",
    },
    description:
      "Kinazi Coffee Washing Station is known for its exceptional quality control and traceability, ensuring every batch meets our high standards.",
    photos: [
      "/washing-stations/kinazi-cws-1.jpg",
      "/washing-stations/kinazi-cws-2.jpg",
    ],
    videos: [],
    processingMethods: ["Washed", "Honey", "Natural"],
    varieties: ["Bourbon"],
    farmers: [
      {
        id: "kinazi-emertha",
        name: "Mukarugira Emertha",
        photo: "/washing-stations/kinazi-farmer-1.jpg",
        photos: [
          "/washing-stations/kinazi-farmer-1.jpg",
          "/washing-stations/kinazi-farmer-2.jpg",
        ],
        story:
          "Mukarugira Emertha is a coffee farmer representing Kinazi growers for lot 71 in Best of Rwanda 2026, harvesting ripe cherries with clean equipment for direct delivery to the station.",
        location: "Kinazi, Ruhango District",
        yearsOfExperience: 15,
        varieties: ["Arabica"],
        role: "Coffee farmer",
        awardLabel: "12th Place · Best of Rwanda 2026",
        awardScore: "88.07",
      },
    ],
    annualCapacity: "195 tons",
    established: 2010,
    manager: {
      name: "Valens Ganishuri",
      photo: "/washing-stations/managers/Valens.jpg", 
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "13",
    name: "Buheta CWS",
    slug: "buheta",
    location: {
      address: "Gakenke District, Northern Province, Rwanda",
      coordinates: [-1.70, 29.67],
      altitude: "1600-2050m Asl",
    },
    description:
      "Buheta Coffee Washing Station processes specialty coffees with a focus on quality, traceability, and supporting local farming communities.",
    photos: ["/washing-stations/farm.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural", "Honey"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "170 tons",
    established: 2025,
    manager: {
      name: "Buheta Station Manager",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "20",
    name: "Karambi CWS",
    slug: "karambi",
    location: {
      address: "Nyamasheke District, Western Province, Rwanda",
      coordinates: [-2.41, 29.09],
      altitude: "1650-2000m Asl",
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
    manager: {
      name: "Karambi Station Manager",
      photo: "/washing-stations/managers/Spirie (2).jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "14",
    name: "Muganza CWS",
    slug: "muganza",
    location: {
      address: "Nyamagabe District, Southern Province, Rwanda",
      coordinates: [-2.43497, 29.5545913], 
      altitude: "1505-1844m Asl",
      longitude: "29.5545913",
      latitude: "-2.43497",
    },
    description:
      "Muganza Coffee Washing Station processes specialty coffees in Kibirizi Sector, Nyamagabe District, with a focus on innovative processing and farmer collaboration.",
    photos: [
      "/washing-stations/muganza-cws-1.jpg",
      "/washing-stations/muganza-cws-2.jpg",
    ],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [
      {
        id: "muganza-kabera",
        name: "Kabera Frederick",
        photo: "/washing-stations/muganza-farmer-1.jpg",
        photos: [
          "/washing-stations/muganza-farmer-1.jpg",
          "/washing-stations/muganza-farmer-2.jpg",
        ],
        story:
          "Kabera Frederick is a coffee farmer at Muganza CWS whose lot 004 placed among the Best of Rwanda 2026 winners and will be offered at auction.",
        location: "Kibirizi, Nyamagabe District",
        yearsOfExperience: 20,
        varieties: ["Arabica"],
        role: "Coffee farmer",
        awardLabel: "9th Place · Best of Rwanda 2026",
        awardScore: "88.16",
      },
    ],
    annualCapacity: "180 tons",
    established: 2011,
  },
  {
    id: "15",
    name: "Shara CWS",
    slug: "shara",
    location: {
      address: "Nyamasheke District, Western Province, Rwanda",
      coordinates: [-2.359, 29.085], 
      altitude: "1500-2000m Asl",
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
    manager: {
      name: "Cyprie Komezusenge",
      photo: "/washing-stations/managers/Spirie.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "16",
    name: "Ngororero CWS",
    slug: "ngororero",
    location: {
      address: "Ngororero District, Western Province, Rwanda",
      coordinates: [-1.792766, 29.632108], 
      altitude: "1500-2050m Asl",
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
    manager: {
      name: "Innocent",
      photo: "/washing-stations/managers/innocent.jpg",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "17",
    name: "Kamegeri CWS",
    slug: "kamegeri",
    location: {
      address: "Nyamasheke District, Western Province, Rwanda",
      coordinates: [-2.42, 29.09],
      altitude: "1500-2000m Asl",
    },
    description:
      "Kamegeri Coffee Washing Station processes specialty coffees from Nyamasheke, known for mineral-rich soils and clean cup profiles.",
    photos: ["/washing-stations/Processing coffee.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural", "Honey"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "175 tons",
    established: 2025,
    manager: {
      name: "Kamegeri Station Manager",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "18",
    name: "Neza CWS",
    slug: "neza",
    location: {
      address: "Nyamasheke District, Western Province, Rwanda",
      coordinates: [-2.40, 29.08],
      altitude: "1500-2000m Asl",
    },
    description:
      "Neza Coffee Washing Station processes specialty coffees with a focus on quality, sustainable practices, and close work with smallholder farmers.",
    photos: ["/washing-stations/farm.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural", "Honey"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "170 tons",
    established: 2025,
    manager: {
      name: "Neza Station Manager",
      description: "Experience, achievements or any other.",
    },
  },
  {
    id: "19",
    name: "Mukura CWS",
    slug: "mukura",
    location: {
      address: "Gakenke District, Northern Province, Rwanda",
      coordinates: [-1.70, 29.67],
      altitude: "1500-2000m Asl",
    },
    description:
      "Mukura Coffee Washing Station processes specialty coffees in Gakenke, supporting local farmers and producing fully traceable lots.",
    photos: ["/washing-stations/Processing coffee.jpg"],
    videos: [],
    processingMethods: ["Washed", "Natural"],
    varieties: ["Bourbon", "Red Bourbon"],
    farmers: [],
    annualCapacity: "165 tons",
    established: 2025,
    manager: {
      name: "Mukura Station Manager",
      description: "Experience, achievements or any other.",
    },
  },
  // {
  //   id: "19",
  //   name: "Remera CWS",
  //   slug: "remera",
  //   location: {
  //     address: "Southern Province, Rwanda",
  //     coordinates: [-2.46863, 29.553228], 
  //     altitude: "1918 m a.s.l",
  //     longitude: "E 29°33'11.622\"",
  //     latitude: "S 2°28'7.068\"",
  //   },
  //   description:
  //     "Remera Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
  //   photos: ["/washing-stations/remera.jpg"],
  //   videos: [],
  //   processingMethods: ["Washed", "Natural", "Honey"],
  //   varieties: ["Bourbon", "Red Bourbon"],
  //   farmers: [],
  //   annualCapacity: "175 tons",
  //   established: 2012,
  //   manager: {
  //     name: "Remera Station Manager",
  //     photo: "/washing-stations/managers/Spirie (2).jpg",
  //     description: "Experience, achievements or any other.",
  //   },
  // },
  // {
  //   id: "20",
  //   name: "Kigoma CWS",
  //   slug: "kigoma",
  //   location: {
  //     address: "Southern Province, Rwanda",
  //     coordinates: [-2.497632, 29.636797], 
  //     altitude: "1884 m absl",
  //     longitude: "29.636797, E29 38'12.46812",
  //     latitude: "-2.497632, S2 29'51.576\"",
  //   },
  //   description:
  //     "Kigoma Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
  //   photos: ["/washing-stations/kigoma.jpg"],
  //   videos: [],
  //   processingMethods: ["Washed", "Natural"],
  //   varieties: ["Bourbon", "Red Bourbon"],
  //   farmers: [],
  //   annualCapacity: "170 tons",
  //   established: 2011,
  //   manager: {
  //     name: "Kigoma Station Manager",
  //     photo: "/washing-stations/managers/Spirie (2).jpg",
  //     description: "Experience, achievements or any other.",
  //   },
  // },
  // {
  //   id: "21",
  //   name: "Nyarusiza CWS",
  //   slug: "nyarusiza",
  //   location: {
  //     address: "Southern Province, Rwanda",
  //     coordinates: [-2.530368, 29.575161], 
  //     altitude: "1740 - 1953 m absl",
  //     longitude: "29.575161",
  //     latitude: "-2.530368",
  //   },
  //   description:
  //     "Nyarusiza Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
  //   photos: ["/washing-stations/nyarusiza.jpg"],
  //   videos: [],
  //   processingMethods: ["Washed", "Natural", "Honey"],
  //   varieties: ["Bourbon", "Red Bourbon"],
  //   farmers: [],
  //   annualCapacity: "185 tons",
  //   established: 2012,
  //   manager: {
  //     name: "Nyarusiza Station Manager",
  //     photo: "/washing-stations/managers/Spirie (2).jpg",
  //     description: "Experience, achievements or any other.",
  //   },
  // },
  // {
  //   id: "22",
  //   name: "Muhazi CWS",
  //   slug: "muhazi",
  //   location: {
  //     address: "Southern Province, Rwanda",
  //     coordinates: [-2.125185, 29.714233], 
  //     altitude: "1500 - 2045 m absl",
  //     longitude: "29°42'51.233\"",
  //     latitude: "S 2°07'30.667\"",
  //   },
  //   description:
  //     "Muhazi Coffee Washing Station processes specialty coffees with a focus on quality and sustainable practices.",
  //   photos: ["/washing-stations/muhazi.jpg"],
  //   videos: [],
  //   processingMethods: ["Washed", "Natural"],
  //   varieties: ["Bourbon", "Red Bourbon"],
  //   farmers: [],
  //   annualCapacity: "190 tons",
  //   established: 2011,
  //   manager: {
  //     name: "Muhazi Station Manager",
  //     photo: "/washing-stations/managers/Spirie (2).jpg",
  //     description: "Experience, achievements or any other.",
  //   },
  // },
];

// Helper function to get station by slug
export function getWashingStationBySlug(slug: string): WashingStation | null {
  return washingStations.find((s) => s.slug === slug) || null;
}

// Helper function to get all stations
export function getAllWashingStations(): WashingStation[] {
  return washingStations;
}