"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Dimension } from "@/types/assessment";
import { getScoreColor } from "@/lib/data";
import { Card } from "@/components/ui/card";

interface DimensionCardProps {
  dimension: Dimension;
  index: number;
}

const getGapColor = (gap: number): string => {
  if (gap <= 5) return "#5B8A72"; // score-good (green)
  if (gap <= 10) return "#E9B872"; // score-medium (amber)
  return "#E07A5F"; // score-low (coral)
};

const getGapLabel = (gap: number): string => {
  if (gap <= 5) return "Aligned";
  if (gap <= 10) return "Notable";
  return "Significant";
};

const getGapBorderStyle = (gap: number): React.CSSProperties => {
  if (gap >= 11) {
    return {
      borderColor: "#E07A5F",
      borderWidth: "2px",
      boxShadow: "0 0 0 1px rgba(224, 122, 95, 0.1), 0 4px 12px rgba(224, 122, 95, 0.15)",
    };
  }
  if (gap >= 10) {
    return {
      borderColor: "#E9B872",
      borderWidth: "2px",
      boxShadow: "0 0 0 1px rgba(233, 184, 114, 0.1), 0 4px 12px rgba(233, 184, 114, 0.12)",
    };
  }
  return {};
};

export function DimensionCard({ dimension, index }: DimensionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const gap = Math.abs(dimension.userScore - dimension.partnerScore);
  const avgScore = Math.round(
    (dimension.userScore + dimension.partnerScore) / 2
  );

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  const borderStyle = getGapBorderStyle(gap);
  const hasSignificantGap = gap >= 10;

  return (
    <Card
      padding="none"
      hover
      className={`overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        hasSignificantGap
          ? "focus-visible:ring-foreground focus-visible:ring-offset-4"
          : "focus-visible:ring-accent"
      }`}
      style={borderStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 + 0.3 }}
      onClick={() => setIsExpanded(!isExpanded)}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${dimension.name} dimension. Score: You ${dimension.userScore}, Partner ${dimension.partnerScore}. Click to ${isExpanded ? "collapse" : "expand"} details.`}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">
              {dimension.icon}
            </span>
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {dimension.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {dimension.description}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-muted-foreground"
            aria-hidden="true"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Score Comparison */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground w-14">
              You
            </span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-user"
                initial={{ width: 0 }}
                animate={{ width: `${dimension.userScore}%` }}
                transition={{ duration: 0.6, delay: index * 0.05 + 0.4 }}
              />
            </div>
            <span
              className="text-sm font-bold w-8 text-right"
              style={{ color: getScoreColor(dimension.userScore) }}
            >
              {dimension.userScore}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground w-14">
              Partner
            </span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-partner"
                initial={{ width: 0 }}
                animate={{ width: `${dimension.partnerScore}%` }}
                transition={{ duration: 0.6, delay: index * 0.05 + 0.5 }}
              />
            </div>
            <span
              className="text-sm font-bold w-8 text-right"
              style={{ color: getScoreColor(dimension.partnerScore) }}
            >
              {dimension.partnerScore}
            </span>
          </div>
        </div>

        {/* Footer stats */}
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Combined average</span>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getScoreColor(avgScore) }}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-foreground">
                {avgScore}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Perception gap</span>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getGapColor(gap) }}
                aria-hidden="true"
              />
              <span
                className="text-sm font-semibold"
                style={{ color: getGapColor(gap) }}
              >
                {gap} pts
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded font-semibold"
                style={{
                  backgroundColor: `${getGapColor(gap)}20`,
                  color: getGapColor(gap),
                }}
              >
                {getGapLabel(gap)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable sub-dimensions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-secondary/30 space-y-3">
              {dimension.subDimensions.map((sub, subIndex) => (
                <motion.div
                  key={sub.name}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: subIndex * 0.05 }}
                >
                  <span className="text-base" aria-hidden="true">
                    {sub.icon}
                  </span>
                  <span className="text-sm text-muted-foreground flex-1 min-w-0 truncate">
                    {sub.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-user w-6 text-right">
                      {sub.userScore}
                    </span>
                    <span className="text-xs text-muted-foreground">/</span>
                    <span className="text-xs font-semibold text-partner w-6">
                      {sub.partnerScore}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
