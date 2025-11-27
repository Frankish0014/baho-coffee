"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";

// Mock data - replace with actual testimonials
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Wilden Pretorius",
    company: "Archer Roasters",
    role: "Cupper",
    country: "Dubai",
    content:
      "Baho Coffee consistently delivers exceptional quality. Their washed coffees from stations like Bugoyi and Humure have become customer favorites with their bright, clean profiles.",
    rating: 5,
  },
  {
    id: "2",
    name: "Drew",
    company: "Three Coffee",
    role: "Head Roaster",
    country: "Dubai",
    content:
      "The traceability and transparency that Baho Coffee provides is unmatched. We know exactly where our coffee comes from.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ben Bowdoin",
    company: "Sundog Trading",
    role: "Founder",
    country: "USA",
    content:
      "Working with Baho Coffee has been a game-changer. Their commitment to sustainability and quality is evident in every cup.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-coffee-50 to-coffee-100 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
            <Quote className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            What Our Partners Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Trusted by coffee professionals around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </p>
                {testimonial.country && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {testimonial.country}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

