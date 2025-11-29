"use client";

import { useEffect, useMemo, useState } from "react";
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
  {
  id: "4",
  name: "name",
  company: "company",
  role: "Title",
  country: "country", 
  content:
    "description",
  rating: 5,
  },
  {
  id: "5",
  name: "name",
  company: "company",
  role: "Title",
  country: "country",
  content:
    "description",
  rating: 5,
  },
  
  {
    id: "6",
    name: "name",
    company: "company",
    role: "Title",
    country: "country",
    content:
      "description",
    rating: 5,
  },
  {
    id: "7",
    name: "name",
    company: "company",
    role: "Title",
    country: "country",
    content:
      "description",
    rating: 5,
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const hasSlider = testimonials.length > 3;

  useEffect(() => {
    setCurrentIndex((prev) => {
      if (!hasSlider) return 0;
      return prev % testimonials.length;
    });
  }, [itemsPerView, hasSlider]);

  const visibleTestimonials = useMemo(() => {
    if (!hasSlider) return testimonials;

    const count = Math.min(itemsPerView, testimonials.length);
    return Array.from({ length: count }, (_, offset) => {
      const index = (currentIndex + offset) % testimonials.length;
      return testimonials[index];
    });
  }, [currentIndex, itemsPerView, hasSlider]);

  const totalSlides = hasSlider
    ? Math.ceil(testimonials.length / itemsPerView)
    : 1;
  const activeSlide = hasSlider
    ? Math.floor((currentIndex / itemsPerView) % totalSlides)
    : 0;

  const handlePrev = () => {
    if (!hasSlider) return;
    setCurrentIndex((prev) =>
      (prev - itemsPerView + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    if (!hasSlider) return;
    setCurrentIndex((prev) => (prev + itemsPerView) % testimonials.length);
  };
// Auto-scroll the testimonials
  useEffect(() => {
    if (!hasSlider) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + itemsPerView) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasSlider, itemsPerView]);

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

        {hasSlider ? (
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6">
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.id}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex-1"
                    style={{
                      flex: `0 0 calc(100% / ${itemsPerView})`,
                    }}
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

            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Previous testimonials"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Next testimonials"
            >
              &rarr;
            </button>

            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeSlide
                      ? "bg-primary-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonials slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
}

