"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  y: number;
  variant: "dot" | "bean";
  rotation: number;
  size: number;
};

const MAX_PARTICLES = 20;

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      idRef.current += 1;
      const variant = Math.random() > 0.5 ? "bean" : "dot";
      const size = variant === "bean" ? Math.random() * 0.4 + 0.9 : Math.random() * 0.5 + 0.8;

      const newParticle: Particle = {
        id: idRef.current,
        x: event.clientX,
        y: event.clientY,
        variant,
        rotation: Math.random() * 40 - 20,
        size,
      };

      setParticles((prev) => {
        const next = [...prev, newParticle];
        return next.length > MAX_PARTICLES ? next.slice(next.length - MAX_PARTICLES) : next;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            initial={{ opacity: 0, scale: 0.4, x: "-50%", y: "-50%" }}
            animate={{ opacity: 0.8, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute ${particle.variant === "dot" ? "rounded-full bg-white/30 dark:bg-white/10 blur-[1px]" : ""}`}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.variant === "dot" ? `${8 * particle.size}px` : `${10 * particle.size}px`,
              height: particle.variant === "dot" ? `${8 * particle.size}px` : `${18 * particle.size}px`,
              transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
              background:
                particle.variant === "bean"
                  ? "linear-gradient(135deg, rgba(80,48,34,0.7), rgba(139,69,19,0.4))"
                  : undefined,
              borderRadius: particle.variant === "bean" ? "999px 999px 700px 700px" : undefined,
              boxShadow:
                particle.variant === "bean"
                  ? "0 2px 6px rgba(0,0,0,0.15)"
                  : "0 0 8px rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

