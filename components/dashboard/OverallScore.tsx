"use client";

import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { getScoreColor, getOverallLabel, getScoreBgColor } from "@/lib/data";

interface OverallScoreProps {
  score: number;
  maxScore?: number;
  assessmentDate: string;
  label?: string;
}

export const OverallScore = ({
  score,
  maxScore = 100,
  assessmentDate,
  label,
}: OverallScoreProps) => {
  const percentage = (score / maxScore) * 100;
  const radius = 90;
  const strokeWidth = 12;
  const displayLabel = label || getOverallLabel(score);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const scoreColor = getScoreColor(score);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 mb-2">
      <div className="relative h-56 w-56">
        <svg className="h-full w-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            className="stroke-muted"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <AnimatedNumber
              value={score}
              className="font-mono text-5xl font-bold text-foreground md:text-6xl"
            />
            <span className="ml-1 font-mono text-xl text-muted-foreground md:text-2xl">
              /{maxScore}
            </span>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-4 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <span className={`px-4 py-1.5 rounded-full text-base font-medium ${getScoreBgColor(score)}`}>
          {displayLabel}
        </span>
        <span className="text-sm text-muted-foreground">Assessed {assessmentDate}</span>
      </motion.div>
    </div>
  );
};
