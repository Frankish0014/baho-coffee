"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode, useEffect, useState } from "react";

interface PageAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export function PageAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: PageAnimationProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0, // Trigger as soon as any part is visible
    rootMargin: "50px 0px", // Trigger 50px before element enters viewport
  });
  
  // Fallback: ensure content is always visible
  const [isVisible, setIsVisible] = useState(true); // Start visible by default
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
    // Always ensure visibility after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [inView]);

  // If content should be visible immediately (already in view or fallback triggered)
  const shouldShowImmediately = inView || isVisible;

  const getInitial = () => {
    // If already visible, don't animate from hidden state
    if (shouldShowImmediately) {
      return { opacity: 1, x: 0, y: 0 };
    }
    
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up":
        return { opacity: 1, y: 0 };
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
        return { opacity: 1, x: 0 };
      case "right":
        return { opacity: 1, x: 0 };
      case "fade":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{ duration: shouldShowImmediately ? 0 : 0.6, delay: shouldShowImmediately ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <PageAnimation direction="fade" className={`text-center mb-12 ${className}`}>
      <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </PageAnimation>
  );
}

