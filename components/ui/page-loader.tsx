"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const dimensions = [
  { icon: "\u{1F495}", name: "Foundation", delay: 0 },
  { icon: "\u{1F4AC}", name: "Connection", delay: 0.15 },
  { icon: "\u{2699}\u{FE0F}", name: "Operations", delay: 0.3 },
  { icon: "\u{1F6E1}\u{FE0F}", name: "Boundary", delay: 0.45 },
  { icon: "\u{1F3AF}", name: "Alignment", delay: 0.6 },
  { icon: "\u{1F527}", name: "Repair", delay: 0.75 },
  { icon: "\u{1F52E}", name: "Meta", delay: 0.9 },
];

interface PageLoaderProps {
  onLoadComplete: () => void;
}

export function PageLoader({ onLoadComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState<'orbiting' | 'absorbing' | 'pulse' | 'reveal'>('orbiting');
  const [currentDimension, setCurrentDimension] = useState(0);

  useEffect(() => {
    const orbitTimer = setTimeout(() => setPhase('absorbing'), 1500);
    const absorbTimer = setTimeout(() => setPhase('pulse'), 3200);
    const pulseTimer = setTimeout(() => setPhase('reveal'), 3800);
    const completeTimer = setTimeout(() => onLoadComplete(), 4300);

    return () => {
      clearTimeout(orbitTimer);
      clearTimeout(absorbTimer);
      clearTimeout(pulseTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadComplete]);

  useEffect(() => {
    if (phase === 'orbiting' || phase === 'absorbing') {
      const interval = setInterval(() => {
        setCurrentDimension(prev => (prev + 1) % dimensions.length);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== 'reveal' && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.15,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.6 },
            scale: { duration: 0.8 },
            filter: { duration: 0.5 }
          }}
        >
          <div className="absolute inset-0 bg-background" />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-[#6366F1]/10 blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-[#E85A4F]/10 blur-[100px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center">
            {/* Orbiting icons container */}
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
              {dimensions.map((dim, index) => {
                const angle = (index * 360) / dimensions.length - 90;
                const radius = 160;
                const radians = (angle * Math.PI) / 180;
                const x = Math.cos(radians) * radius;
                const y = Math.sin(radians) * radius;

                return (
                  <motion.div
                    key={dim.name}
                    className="absolute left-1/2 top-1/2 flex items-center justify-center"
                    initial={{
                      x: x - 24,
                      y: y - 24,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={
                      phase === 'orbiting'
                        ? {
                          x: x - 24,
                          y: y - 24,
                          opacity: 1,
                          scale: 1,
                          rotate: [0, 360],
                        }
                        : phase === 'absorbing'
                          ? {
                            x: -24,
                            y: -24,
                            opacity: 0,
                            scale: 0,
                          }
                          : {
                            x: -24,
                            y: -24,
                            opacity: 0,
                            scale: 0,
                          }
                    }
                    transition={
                      phase === 'orbiting'
                        ? {
                          x: { duration: 0.6, delay: dim.delay, ease: [0.22, 1, 0.36, 1] },
                          y: { duration: 0.6, delay: dim.delay, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.4, delay: dim.delay },
                          scale: { duration: 0.5, delay: dim.delay, type: "spring", stiffness: 200 },
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                        }
                        : {
                          duration: 0.4,
                          delay: dim.delay * 0.5,
                          ease: [0.32, 0, 0.67, 0]
                        }
                    }
                  >
                    <motion.div
                      className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg flex items-center justify-center text-xl md:text-2xl"
                      whileHover={{ scale: 1.1 }}
                      animate={
                        phase === 'orbiting'
                          ? { rotate: [0, -360] }
                          : {}
                      }
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                      }}
                    >
                      {dim.icon}
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Dashed orbit circle */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-[#6366F1]/20"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={
                phase === 'orbiting' || phase === 'absorbing'
                  ? { opacity: 0.5, scale: 1, rotate: 360 }
                  : { opacity: 0, scale: 1.5 }
              }
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 0.6 },
                rotate: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
            />

              {/* Light particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`light-${i}`}
                  className="absolute inset-0"
                initial={{ rotate: i * 45, opacity: 0 }}
                animate={
                  phase === 'orbiting' || phase === 'absorbing'
                    ? { rotate: i * 45 + 360, opacity: 1 }
                    : { rotate: i * 45 + 720, opacity: 0 }
                }
                transition={{
                  rotate: {
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  opacity: { duration: 0.5, delay: i * 0.1 }
                }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut"
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0
                        ? "radial-gradient(circle, #6366F1 0%, transparent 70%)"
                        : "radial-gradient(circle, #E85A4F 0%, transparent 70%)",
                      boxShadow: i % 2 === 0
                        ? "0 0 12px 4px rgba(99, 102, 241, 0.6)"
                        : "0 0 12px 4px rgba(232, 90, 79, 0.6)",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

              {/* Centered text content - inside the orbit container */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.div
                  className="h-8 overflow-hidden text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentDimension}
                      className="block text-lg md:text-xl font-semibold text-foreground/80"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {dimensions[currentDimension].icon} {dimensions[currentDimension].name}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>

                <motion.p
                  className="mt-4 text-sm text-muted-foreground font-medium tracking-wide text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {phase === 'orbiting' && "Gathering your dimensions..."}
                  {phase === 'absorbing' && "Analyzing your relationship..."}
                  {phase === 'pulse' && "Preparing your insights..."}
                </motion.p>

                <motion.div
                  className="mt-4 flex gap-2 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#6366F1]/40"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 1, 0.4],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom branding - outside orbit container */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/60 font-medium">
                Whole Relationship Model
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
