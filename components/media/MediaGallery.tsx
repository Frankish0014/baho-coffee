"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video, FileText, Download } from "lucide-react";

const tabs = [
  { id: "photos", label: "Photos", icon: ImageIcon },
  { id: "videos", label: "Videos", icon: Video },
  { id: "downloads", label: "Downloads", icon: FileText },
];

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState("photos");

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === "photos" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center">
                <Video className="w-16 h-16 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "downloads" && (
        <div className="space-y-4">
          {[
            { name: "Company Profile 2024", type: "PDF", size: "2.5 MB" },
            { name: "Sustainability Report", type: "PDF", size: "1.8 MB" },
            { name: "Certifications", type: "PDF", size: "3.2 MB" },
            { name: "Product Catalog", type: "PDF", size: "5.1 MB" },
          ].map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{file.name}</h3>
                  <p className="text-sm text-gray-500">
                    {file.type} • {file.size}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

