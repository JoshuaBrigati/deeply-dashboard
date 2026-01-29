"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: "primary" | "accent";
}

export function FloatingHearts() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effect on scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);

  const [hearts] = useState<Heart[]>(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.08 + 0.03,
      color: Math.random() > 0.5 ? "primary" : "accent",
    }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs with parallax */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#6366F1]/6 blur-[100px]"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#E85A4F]/6 blur-[100px]"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#059669]/4 blur-[80px]"
        style={{ y: y3 }}
      />

      {/* Floating hearts */}
      {isMounted && hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [0, -30, 0],
            rotate: [-5, 5, -5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color === "primary" ? "#E85A4F" : "#6366F1"}
            style={{ opacity: heart.opacity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
