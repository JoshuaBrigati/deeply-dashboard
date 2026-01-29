"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { getScoreLabel } from "@/lib/data";

interface HeroScoreProps {
  userScore: number;
  partnerScore: number;
  overallScore: number;
  maxScore: number;
  date: string;
  userName?: string;
  partnerName?: string;
}

// Animated number with spring physics
function AnimatedNumber({ value, delay = 0, className = "" }: { value: number; delay?: number; className?: string }) {
  const spring = useSpring(0, { stiffness: 30, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => spring.set(value), delay * 1000);
    const unsubscribe = display.on("change", (latest) => setDisplayValue(latest));
    return () => { clearTimeout(timeout); unsubscribe(); };
  }, [spring, value, display, delay]);

  return <span className={className}>{displayValue}</span>;
}

// Individual person's score display
function PersonScore({
  score, name, color, side, delay
}: {
  score: number; name: string; color: string; side: "left" | "right"; delay: number;
}) {
  const percentage = score;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center gap-2 md:gap-4"
      initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Circular score gauge */}
      <div className="relative">
        {/* Subtle glow effect */}
        <div
          className="absolute inset-[-10px] rounded-full blur-2xl opacity-20"
          style={{ background: color }}
        />

        <svg viewBox="0 0 120 120" className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] relative z-10 -rotate-90">
          {/* Background track */}
          <circle
            cx="60" cy="60" r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-border"
          />

          {/* Animated progress arc */}
          <motion.circle
            cx="60" cy="60" r="45"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>

        {/* Score number in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            <AnimatedNumber value={score} delay={delay + 0.5} />
          </span>
        </div>
      </div>

      {/* Name label */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.8, duration: 0.5 }}
      >
        <span className="text-sm md:text-base font-semibold text-foreground">{name}</span>
        <span
          className="text-[10px] md:text-xs font-medium px-2 md:px-3 py-0.5 md:py-1 rounded-full"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {getScoreLabel(score)}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function HeroScore({
  userScore, partnerScore, overallScore,
  userName = "You", partnerName = "Partner"
}: HeroScoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userColor = "#6366F1";
  const partnerColor = "#E85A4F";

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Ambient background glows - expanded to prevent cutoff */}
      <div className="absolute inset-[-50px] -z-10 overflow-visible">
        <motion.div
          className="absolute top-1/2 left-[20%] w-[250px] h-[250px] -translate-y-1/2 rounded-full blur-[80px]"
          style={{ background: userColor, opacity: 0.15 }}
        />
        <motion.div
          className="absolute top-1/2 right-[20%] w-[250px] h-[250px] -translate-y-1/2 rounded-full blur-[80px]"
          style={{ background: partnerColor, opacity: 0.15 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{ background: "hsl(255, 70%, 55%)", opacity: 0.12 }}
        />
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 relative justify-center">
        {/* User Score - Left */}
        <div data-left-score>
          <PersonScore
            score={userScore}
            name={userName}
            color={userColor}
            side="left"
            delay={0.3}
          />
        </div>

        {/* Center Heart Section */}
        <motion.div
          className="relative"
          data-heart
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* Heart glow - extended overflow */}
          <div className="absolute inset-[-40px] overflow-visible pointer-events-none">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at center, hsl(255, 70%, 55%) 0%, transparent 40%)`,
                opacity: 0.15,
              }}
            />
          </div>

          {/* Heart SVG - Responsive sizing */}
          <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="heroHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={userColor} />
                  <stop offset="50%" stopColor="hsl(255, 70%, 55%)" />
                  <stop offset="100%" stopColor={partnerColor} />
                </linearGradient>
                <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Static heart fill for background */}
              <path
                d="M50 85 C22 60 8 42 8 28 C8 16 17 8 28 8 C37 8 45 14 50 22 C55 14 63 8 72 8 C83 8 92 16 92 28 C92 42 78 60 50 85Z"
                fill="url(#heroHeartGradient)"
                fillOpacity="0.08"
              />

              {/* Heart stroke - cleaner path with proper closure */}
              <motion.path
                d="M50 85 C22 60 8 42 8 28 C8 16 17 8 28 8 C37 8 45 14 50 22 C55 14 63 8 72 8 C83 8 92 16 92 28 C92 42 78 60 50 85Z"
                fill="none"
                stroke="url(#heroHeartGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#heartGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>

            {/* Central score display - no background blob */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center -mt-2 sm:-mt-4 md:-mt-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground">
                <AnimatedNumber value={overallScore} delay={2.3} />
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-medium mt-0.5 md:mt-1">
                Together
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Partner Score - Right */}
        <div data-right-score>
          <PersonScore
            score={partnerScore}
            name={partnerName}
            color={partnerColor}
            side="right"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
}
