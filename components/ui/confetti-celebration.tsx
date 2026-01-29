"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  shape: "circle" | "heart" | "square";
  delay: number;
  // New properties for stable animation
  endX: number;
  duration: number;
}

interface ConfettiCelebrationProps {
  trigger: boolean;
  duration?: number;
}

const colors = ["#6366F1", "#E85A4F", "#10B981", "#D97706", "#EC4899", "#8B5CF6"];

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    rotation: Math.random() * 360,
    scale: 0.5 + Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: ["circle", "heart", "square"][Math.floor(Math.random() * 3)] as "circle" | "heart" | "square",
    delay: Math.random() * 0.5,
    endX: (Math.random() - 0.5) * 200,
    duration: 2.5 + Math.random(),
  }));
}

function ConfettiShape({ shape, color }: { shape: string; color: string }) {
  if (shape === "heart") {
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    );
  }
  if (shape === "square") {
    return <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />;
  }
  return <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />;
}

export function ConfettiCelebration({ trigger, duration = 3000 }: ConfettiCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let startTimer: NodeJS.Timeout;
    let endTimer: NodeJS.Timeout;
    let cleanupTimer: NodeJS.Timeout;

    if (trigger) {
      // Defer the start to avoid synchronous setState warning
      startTimer = setTimeout(() => {
        setIsActive(true);
        setConfetti(generateConfetti(50));
      }, 0);

      endTimer = setTimeout(() => {
        setIsActive(false);
        setConfetti([]);
      }, duration);
    } else {
      cleanupTimer = setTimeout(() => {
        setIsActive(false);
        setConfetti([]);
      }, 0);
    }

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
      clearTimeout(cleanupTimer);
    };
  }, [trigger, duration]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
              }}
              initial={{
                y: 0,
                x: 0,
                rotate: 0,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                y: ["0vh", "120vh"],
                x: [0, piece.endX],
                rotate: [0, piece.rotation + 720],
                scale: [0, piece.scale, piece.scale, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <ConfettiShape shape={piece.shape} color={piece.color} />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
