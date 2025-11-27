export interface CoffeeProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  flavorNotes: string[];
  region: string;
  processingMethod: string;
  farm?: string;
  washingStation?: string;
  packagingOptions: PackagingOption[];
  price?: number;
  currency?: string;
  images: string[];
  videoUrl?: string;
  pdfProfileUrl?: string;
  available: boolean;
  featured: boolean;
}

export interface PackagingOption {
  size: string;
  weight: string;
  price?: number;
}

export interface WashingStation {
  id: string;
  name: string;
  slug: string;
  location: {
    address: string;
    coordinates: [number, number]; // [lat, lng]
  };
  description: string;
  photos: string[];
  videos: string[];
  processingMethods: string[];
  varieties: string[];
  farmers: Farmer[];
  annualCapacity: string;
  established: number;
  manager?: {
    name: string;
    photo?: string;
    description?: string;
  };
}

export interface Farmer {
  id: string;
  name: string;
  photo?: string;
  story: string;
  location: string;
  yearsOfExperience: number;
  varieties: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  category: "farming" | "women-in-coffee" | "events" | "sustainability" | "news";
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  image?: string;
  content: string;
  rating: number;
  country?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  country: string;
}

export interface Certification {
  id: string;
  name: string;
  logo: string;
  description: string;
  issuedBy: string;
  year: number;
  url?: string;
}

export interface QuotationRequest {
  name: string;
  email: string;
  company?: string;
  country: string;
  phone: string;
  productInterest: string[];
  quantity: string;
  message?: string;
}

