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
  velocityX: number;
  velocityY: number;
  life: number;
};

const MAX_PARTICLES = 25;
const PARTICLE_LIFETIME = 1.2;

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const lastParticleTime = useRef(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let isFirstMove = true;

    const handleMove = (event: MouseEvent) => {
      const now = Date.now();
      const timeSinceLastParticle = now - lastParticleTime.current;
      
      // Throttle particle creation for smoother performance
      if (timeSinceLastParticle < 16) return; // ~60fps
      
      lastParticleTime.current = now;
      
      const newX = event.clientX;
      const newY = event.clientY;
      
      if (isFirstMove) {
        lastX = newX;
        lastY = newY;
        isFirstMove = false;
        return;
      }

      // Calculate velocity for physics-based movement
      const velocityX = newX - lastX;
      const velocityY = newY - lastY;
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      
      lastX = newX;
      lastY = newY;
      
      // Create more particles when moving fast
      const particleCount = speed > 10 ? 2 : 1;
      
      for (let i = 0; i < particleCount; i++) {
        idRef.current += 1;
        const variant = Math.random() > 0.5 ? "bean" : "dot";
        const baseSize = variant === "bean" ? 0.9 : 0.8;
        const sizeVariation = variant === "bean" ? 0.4 : 0.5;
        const size = baseSize + Math.random() * sizeVariation;

        const newParticle: Particle = {
          id: idRef.current,
          x: newX + (Math.random() - 0.5) * 10,
          y: newY + (Math.random() - 0.5) * 10,
          variant,
          rotation: Math.random() * 360,
          size,
          velocityX: velocityX * 0.1 + (Math.random() - 0.5) * 2,
          velocityY: velocityY * 0.1 + (Math.random() - 0.5) * 2,
          life: PARTICLE_LIFETIME,
        };

        setParticles((prev) => {
          const next = [...prev, newParticle];
          return next.length > MAX_PARTICLES ? next.slice(next.length - MAX_PARTICLES) : next;
        });
      }
    };

    // Update particle physics
    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.velocityX * 0.5,
            y: particle.y + particle.velocityY * 0.5,
            velocityX: particle.velocityX * 0.92, // Friction
            velocityY: particle.velocityY * 0.92,
            rotation: particle.rotation + (particle.variant === "bean" ? 2 : 0),
            life: particle.life - 0.016, // ~60fps
          }))
          .filter((particle) => particle.life > 0)
      );
      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };

    animationFrameRef.current = requestAnimationFrame(updateParticles);
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden>
      <AnimatePresence mode="popLayout">
        {particles.map((particle) => {
          const progress = 1 - particle.life / PARTICLE_LIFETIME;
          const opacity = Math.max(0, 1 - progress * 1.2); // Fade out faster
          const scale = 0.3 + progress * 0.7; // Scale up as it fades

          return (
            <motion.span
              key={particle.id}
              initial={{ 
                opacity: 0, 
                scale: 0.2,
                x: "-50%", 
                y: "-50%",
                rotate: particle.rotation,
              }}
              animate={{ 
                opacity,
                scale,
                x: "-50%", 
                y: "-50%",
                rotate: particle.rotation + (particle.variant === "bean" ? 360 : 0),
              }}
              exit={{ 
                opacity: 0, 
                scale: 1.6,
                rotate: particle.rotation + (particle.variant === "bean" ? 180 : 0),
              }}
              transition={{ 
                duration: PARTICLE_LIFETIME,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
                opacity: { duration: PARTICLE_LIFETIME * 0.8 },
                scale: { duration: PARTICLE_LIFETIME, ease: "easeOut" },
                rotate: { 
                  duration: PARTICLE_LIFETIME,
                  ease: particle.variant === "bean" ? "linear" : "easeOut",
                },
              }}
              className={`absolute ${particle.variant === "dot" ? "rounded-full" : ""}`}
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.variant === "dot" 
                  ? `${8 * particle.size * scale}px` 
                  : `${10 * particle.size * scale}px`,
                height: particle.variant === "dot" 
                  ? `${8 * particle.size * scale}px` 
                  : `${18 * particle.size * scale}px`,
                transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
                background:
                  particle.variant === "bean"
                    ? `linear-gradient(135deg, 
                        rgba(139, 69, 19, ${opacity * 0.8}), 
                        rgba(101, 67, 33, ${opacity * 0.5}))`
                    : `radial-gradient(circle, 
                        rgba(255, 255, 255, ${opacity * 0.4}) 0%, 
                        rgba(255, 255, 255, ${opacity * 0.1}) 100%)`,
                borderRadius: particle.variant === "bean" ? "999px 999px 700px 700px" : undefined,
                boxShadow:
                  particle.variant === "bean"
                    ? `0 2px 8px rgba(0, 0, 0, ${opacity * 0.2}), 
                       0 0 12px rgba(139, 69, 19, ${opacity * 0.3})`
                    : `0 0 ${8 * scale}px rgba(255, 255, 255, ${opacity * 0.4}), 
                       0 0 ${16 * scale}px rgba(255, 255, 255, ${opacity * 0.2})`,
                filter: particle.variant === "dot" ? `blur(${0.5 * (1 - progress)}px)` : "none",
                backdropFilter: particle.variant === "dot" ? "blur(1px)" : "none",
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

