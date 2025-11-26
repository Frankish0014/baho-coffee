"use client";

import { motion } from "framer-motion";
import { 
  Smartphone, Camera, Globe, TrendingUp, Users, 
  BarChart, BookOpen, Video, Mail, Share2, Image as ImageIcon
} from "lucide-react";

export default function ProducerResources() {
  const strategies = [
    {
      icon: Camera,
      title: "Visual Storytelling",
      description: "Learn how to capture compelling photos and videos of your coffee farm, processing, and community",
      tips: [
        "Show the journey from cherry to cup",
        "Highlight your unique processing methods",
        "Feature the people behind your coffee",
      ],
    },
    {
      icon: Globe,
      title: "Online Presence",
      description: "Build and maintain a strong digital presence to reach international buyers",
      tips: [
        "Create a professional website or profile",
        "Use social media effectively",
        "Engage with coffee communities online",
      ],
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Connect directly with buyers through effective email campaigns",
      tips: [
        "Share harvest updates and availability",
        "Send cupping notes and quality reports",
        "Build long-term relationships",
      ],
    },
    {
      icon: Share2,
      title: "Content Marketing",
      description: "Create valuable content that showcases your coffee and story",
      tips: [
        "Write blog posts about your farm",
        "Share behind-the-scenes content",
        "Educate buyers about your process",
      ],
    },
  ];

  const tools = [
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Use mobile apps for easy photo sharing and communication",
    },
    {
      icon: Video,
      title: "Video Content",
      description: "Create short videos to showcase your farm and process",
    },
    {
      icon: BarChart,
      title: "Analytics",
      description: "Track your online engagement and reach",
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Connect with other producers and industry professionals",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Digital Marketing for Producers
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Resources and tools to help coffee producers improve their online presence, reach more buyers, and grow their business through digital marketing.
          </p>
        </motion.div>
      </div>

      {/* Why Digital Marketing */}
      <section className="mb-16 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800">
        <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
          Why Digital Marketing Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Reach Global Buyers",
              description: "Connect with roasters and importers worldwide",
            },
            {
              title: "Tell Your Story",
              description: "Share your unique story and build brand recognition",
            },
            {
              title: "Increase Sales",
              description: "Better marketing leads to more opportunities and higher prices",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marketing Strategies */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif font-bold mb-8 text-gray-900 dark:text-white">
          Marketing Strategies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <Icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {strategy.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{strategy.description}</p>
                <ul className="space-y-2">
                  {strategy.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-serif font-bold mb-8 text-gray-900 dark:text-white">
          Tools & Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow"
              >
                <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Getting Started */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Contact us to learn more about digital marketing support for producers
          </p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
            Contact Us
          </button>
        </motion.div>
      </section>
    </div>
  );
}

