"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  alpha: number;
  twinkleSpeed: number;
  hue: number;
};

const PARTICLE_COUNT = 90;

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      velocityX: (Math.random() - 0.5) * 0.3,
      velocityY: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      twinkleSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      hue: Math.random() > 0.4 ? 28 + Math.random() * 12 : 0,
    });

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, createParticle);
    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.alpha += particle.twinkleSpeed;

        if (particle.alpha <= 0.15 || particle.alpha >= 0.9) {
          particle.twinkleSpeed *= -1;
        }

        if (particle.x < -50) particle.x = window.innerWidth + 50;
        if (particle.x > window.innerWidth + 50) particle.x = -50;
        if (particle.y < -50) particle.y = window.innerHeight + 50;
        if (particle.y > window.innerHeight + 50) particle.y = -50;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 14
        );

        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 80%, ${particle.alpha})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 10, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 opacity-60 blur-[0.3px] transition-opacity duration-500 dark:opacity-70"
    />
  );
}

