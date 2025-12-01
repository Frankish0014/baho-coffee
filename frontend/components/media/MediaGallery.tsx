"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, Video, FileText, Download, X, ChevronLeft, ChevronRight } from "lucide-react";

const tabs = [
  { id: "all", label: "All Photos", icon: ImageIcon },
  { id: "hero", label: "Hero Images", icon: ImageIcon },
  { id: "products", label: "Products", icon: ImageIcon },
  { id: "washing-stations", label: "Washing Stations", icon: ImageIcon },
  { id: "videos", label: "Videos", icon: Video },
  { id: "downloads", label: "Downloads", icon: FileText },
];

// All images organized by category
const imageCategories = {
  hero: [
    { src: "/hero/casual.jpg", alt: "Baho Coffee" },
    { src: "/hero/BAHO_29.jpg", alt: "Baho Coffee" },
    { src: "/hero/BAHO_31 (1).jpg", alt: "Baho Coffee" },
    { src: "/hero/BAHO_32 (1).jpg", alt: "Baho Coffee" },
    { src: "/hero/BAHO_35.jpg", alt: "Baho Coffee" },
    { src: "/hero/BAHO_61.jpg", alt: "Baho Coffee" },
    { src: "/hero/BAHO_74.jpg", alt: "Baho Coffee" },
    { src: "/hero/BOR2025.png", alt: "Baho Coffee" },
    { src: "/hero/DSC08945.jpg", alt: "Baho Coffee" },
    { src: "/hero/hero-1.jpg", alt: "Baho Coffee Hero" },
    { src: "/hero/hero-2.jpg", alt: "Baho Coffee Hero" },
    { src: "/hero/hero-3.jpg", alt: "Baho Coffee Hero" },
    { src: "/hero/IMAGE_27.jpg", alt: "Baho Coffee" },
    { src: "/hero/Ngoma.jpg", alt: "Ngoma" },
    { src: "/hero/Ni  Ngoma.jpg", alt: "Ngoma" },
    { src: "/hero/Bag.png", alt: "Coffee Bag" },
    { src: "/hero/Export.png", alt: "Export" },
  ],
  products: [
    { src: "/products/casual.jpg", alt: "Baho Coffee Product" },
    { src: "/products/BAHO_29.jpg", alt: "Baho Coffee Product" },
    { src: "/products/BAHO_31 (1).jpg", alt: "Baho Coffee Product" },
    { src: "/products/BAHO_32 (1).jpg", alt: "Baho Coffee Product" },
    { src: "/products/BAHO_35.jpg", alt: "Baho Coffee Product" },
    { src: "/products/BAHO_61.jpg", alt: "Baho Coffee Product" },
    { src: "/products/bugoyi-washed.jpg", alt: "Bugoyi Washed Coffee" },
    { src: "/products/fugi-honey.jpg", alt: "Fugi Honey Coffee" },
    { src: "/products/fugi-natural.jpg", alt: "Fugi Natural Coffee" },
    { src: "/products/fugi-washed.jpg", alt: "Fugi Washed Coffee" },
    { src: "/products/gitoki-natural.jpg", alt: "Gitoki Natural Coffee" },
    { src: "/products/gitoki-washed.jpg", alt: "Gitoki Washed Coffee" },
    { src: "/products/humure-honey.jpg", alt: "Humure Honey Coffee" },
    { src: "/products/humure-natural.jpg", alt: "Humure Natural Coffee" },
    { src: "/products/humure-other-experimental-methods.jpg", alt: "Humure Experimental Coffee" },
    { src: "/products/humure-washed.jpg", alt: "Humure Washed Coffee" },
    { src: "/products/humure-washed1.jpg", alt: "Humure Washed Coffee" },
    { src: "/products/matyazo-natural.jpg", alt: "Matyazo Natural Coffee" },
    { src: "/products/DSC08945.jpg", alt: "Baho Coffee Product" },
    { src: "/products/IMAGE_27.jpg", alt: "Baho Coffee Product" },
    { src: "/products/Ngoma.jpg", alt: "Ngoma Coffee" },
    { src: "/products/Bag.png", alt: "Coffee Bag" },
    { src: "/products/BOR2025.png", alt: "Baho Coffee" },
    { src: "/products/Export.png", alt: "Export" },
  ],
  "washing-stations": [
    { src: "/washing-stations/8.jpg", alt: "Washing Station" },
    { src: "/washing-stations/Akagera.jpg", alt: "Akagera Washing Station" },
    { src: "/washing-stations/Bugoyi n1.jpg", alt: "Bugoyi Washing Station" },
    { src: "/washing-stations/bugoyi.jpg", alt: "Bugoyi Washing Station" },
    { src: "/washing-stations/Bugoyi1.jpg", alt: "Bugoyi Washing Station" },
    { src: "/washing-stations/Bugoyi2.jpg", alt: "Bugoyi Washing Station" },
    { src: "/washing-stations/bweyeye.png", alt: "Bweyeye Washing Station" },
    { src: "/washing-stations/cyabingo.jpg", alt: "Cyabingo Washing Station" },
    { src: "/washing-stations/farm.jpg", alt: "Coffee Farm" },
    { src: "/washing-stations/Fugi still.jpg", alt: "Fugi Washing Station" },
    { src: "/washing-stations/fugi.jpg", alt: "Fugi Washing Station" },
    { src: "/washing-stations/fugi.png", alt: "Fugi Washing Station" },
    { src: "/washing-stations/gakenke.jpg", alt: "Gakenke Washing Station" },
    { src: "/washing-stations/gakenke1.jpg", alt: "Gakenke Washing Station" },
    { src: "/washing-stations/gitoki.jpg", alt: "Gitoki Washing Station" },
    { src: "/washing-stations/humure.jpg", alt: "Humure Washing Station" },
    { src: "/washing-stations/karambi.jpg", alt: "Karambi Washing Station" },
    { src: "/washing-stations/Kinazi.jpg", alt: "Kinazi Washing Station" },
    { src: "/washing-stations/matyazo.png", alt: "Matyazo Washing Station" },
    { src: "/washing-stations/muganza.jpg", alt: "Muganza Washing Station" },
    { src: "/washing-stations/mugera.jpg", alt: "Mugera Washing Station" },
    { src: "/washing-stations/muzo.jpg", alt: "Muzo Washing Station" },
    { src: "/washing-stations/Ngoma.jpg", alt: "Ngoma Washing Station" },
    { src: "/washing-stations/ngororero.jpg", alt: "Ngororero Washing Station" },
    { src: "/washing-stations/shangi.jpg", alt: "Shangi Washing Station" },
    { src: "/washing-stations/shara.jpg", alt: "Shara Washing Station" },
  ],
};

// Combine all images for "all" tab
const allImages = [
  ...imageCategories.hero,
  ...imageCategories.products,
  ...imageCategories["washing-stations"],
];

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getCurrentImages = () => {
    if (activeTab === "all") return allImages;
    if (activeTab === "hero") return imageCategories.hero;
    if (activeTab === "products") return imageCategories.products;
    if (activeTab === "washing-stations") return imageCategories["washing-stations"];
    return [];
  };

  const openLightbox = (image: { src: string; alt: string }, index: number) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    const currentImages = getCurrentImages();
    if (direction === "next") {
      setLightboxIndex((prev) => (prev + 1) % currentImages.length);
      setSelectedImage(currentImages[(lightboxIndex + 1) % currentImages.length]);
    } else {
      setLightboxIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
      setSelectedImage(currentImages[(lightboxIndex - 1 + currentImages.length) % currentImages.length]);
    }
  };

  const currentImages = getCurrentImages();

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const count = tab.id === "all" 
            ? allImages.length 
            : tab.id === "hero" 
            ? imageCategories.hero.length 
            : tab.id === "products" 
            ? imageCategories.products.length 
            : tab.id === "washing-stations" 
            ? imageCategories["washing-stations"].length 
            : 0;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {count > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Photos Content */}
      {(activeTab === "all" || activeTab === "hero" || activeTab === "products" || activeTab === "washing-stations") && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer group relative"
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Videos Content */}
      {activeTab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Coffee Processing at Washing Station", thumbnail: "/hero/casual.jpg" },
            { title: "Farm to Cup Journey", thumbnail: "/hero/BAHO_29.jpg" },
            { title: "Sustainable Farming Practices", thumbnail: "/hero/BAHO_35.jpg" },
            { title: "Women in Coffee", thumbnail: "/hero/BAHO_61.jpg" },
            { title: "Coffee Harvesting", thumbnail: "/washing-stations/farm.jpg" },
            { title: "Quality Control", thumbnail: "/products/bugoyi-washed.jpg" },
          ].map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden relative group cursor-pointer"
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Downloads Content */}
      {activeTab === "downloads" && (
        <div className="space-y-4">
          {[
            { name: "Company Profile 2024", type: "PDF", size: "2.5 MB", description: "Complete company overview and history" },
            { name: "Sustainability Report 2024", type: "PDF", size: "1.8 MB", description: "Our commitment to sustainable practices" },
            { name: "Certifications", type: "PDF", size: "3.2 MB", description: "All quality and sustainability certifications" },
            { name: "Product Catalog 2024", type: "PDF", size: "5.1 MB", description: "Complete product listing with specifications" },
            { name: "Coffee Processing Guide", type: "PDF", size: "1.2 MB", description: "Guide to our coffee processing methods" },
            { name: "Washing Stations Directory", type: "PDF", size: "2.1 MB", description: "Information about all our washing stations" },
          ].map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{file.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{file.description}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {file.type} • {file.size}
                  </p>
                </div>
              </div>
              <button className="ml-4 p-3 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors group">
                <Download className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("prev");
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox("next");
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {lightboxIndex + 1} / {currentImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
