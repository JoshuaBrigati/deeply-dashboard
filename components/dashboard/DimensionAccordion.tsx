"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Dimension } from "@/lib/data";
import { getScoreColor, getScoreLabel } from "@/lib/data";

interface DimensionAccordionProps {
  dimensions: Dimension[];
}

// Individual dimension card - always expanded
function DimensionItem({
  dimension,
}: {
  dimension: Dimension;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });

  const avgScore = Math.round((dimension.userScore + dimension.partnerScore) / 2);
  const scoreColor = getScoreColor(avgScore);
  const gap = Math.abs(dimension.userScore - dimension.partnerScore);
  const hasLargeGap = gap >= 15;
  const trend = dimension.userScore > dimension.partnerScore ? "user" : dimension.userScore < dimension.partnerScore ? "partner" : "equal";

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        delay: 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="overflow-hidden"
    >
      <div
        className={`glass-card rounded-2xl border transition-all duration-300 relative ${hasLargeGap
            ? "border-amber-500/30"
            : "border-border"
          }`}
      >
        {/* Gradient overlay for large gaps */}
        {hasLargeGap && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Header */}
        <div className="p-5 md:p-6 flex items-center gap-4 relative z-10">
          {/* Icon */}
          <motion.div
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shrink-0"
            style={{ backgroundColor: `${scoreColor}15` }}
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          >
            <span>{dimension.icon}</span>
          </motion.div>

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              <span className="text-primary">Layer {dimension.id}:</span>{" "}
              {dimension.name}
              <span className="hidden md:inline text-muted-foreground font-normal"> — {dimension.description}</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 truncate md:hidden">
              {dimension.description}
            </p>
          </div>

          {/* Score & Gap indicators */}
          <div className="hidden sm:flex items-center gap-3">
            {hasLargeGap && (
              <motion.span
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 ${gap >= 20
                    ? "bg-destructive/15 text-destructive border border-destructive/30"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  }`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
              >
                {trend === "user" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : trend === "partner" ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
                {gap}pt gap
              </motion.span>
            )}

            {/* Score badge */}
            <motion.div
              className="px-4 py-2 rounded-xl text-sm font-bold"
              style={{
                backgroundColor: `${scoreColor}15`,
                color: scoreColor
              }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
            >
              {avgScore}
            </motion.div>
          </div>
        </div>

        {/* Content - Always visible */}
        <div className="px-5 md:px-6 pb-6 relative z-10">
          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Score comparison */}
          <motion.div
            className="flex items-center justify-center gap-8 mb-6 py-4 rounded-xl bg-secondary/30"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            {/* User score */}
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-[#6366F1]" />
                <span className="text-xs font-medium text-muted-foreground">You</span>
              </div>
              <motion.span
                className="text-2xl font-bold text-[#6366F1]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                {dimension.userScore}
              </motion.span>
            </div>

            {/* Gap indicator */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-1">Gap</span>
              <motion.div
                className={`px-3 py-1 rounded-full text-sm font-bold ${gap >= 20
                    ? "bg-destructive/15 text-destructive"
                    : gap >= 10
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      : "bg-green-500/15 text-green-600 dark:text-green-400"
                  }`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
              >
                {gap}
              </motion.div>
            </div>

            {/* Partner score */}
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-[#E85A4F]" />
                <span className="text-xs font-medium text-muted-foreground">Partner</span>
              </div>
              <motion.span
                className="text-2xl font-bold text-[#E85A4F]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.32 }}
              >
                {dimension.partnerScore}
              </motion.span>
            </div>
          </motion.div>

          {/* Sub-dimensions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dimension.subDimensions.map((sub, subIndex) => {
              const subGap = Math.abs(sub.userScore - sub.partnerScore);
              const subAvg = Math.round((sub.userScore + sub.partnerScore) / 2);
              const subColor = getScoreColor(subAvg);

              return (
                <motion.div
                  key={sub.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.3 + subIndex * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className={`p-4 rounded-xl bg-card border transition-colors duration-300 ${subGap >= 15
                      ? "border-destructive/30 hover:border-destructive/50"
                      : subGap >= 10
                        ? "border-amber-500/20 hover:border-amber-500/40"
                        : "border-border hover:border-primary/30"
                    }`}
                >
                  {/* Sub-dimension header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{sub.icon}</span>
                    <h4 className="font-semibold text-foreground text-sm flex-1">{sub.name}</h4>
                    {subGap >= 10 && (
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${subGap >= 15
                            ? "bg-destructive/15 text-destructive"
                            : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                          }`}
                      >
                        {subGap}pt
                      </span>
                    )}
                  </div>

                  {/* Score bars */}
                  <div className="space-y-2.5">
                    {/* User score */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#818CF8]"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${sub.userScore}%` } : {}}
                          transition={{
                            duration: 0.8,
                            delay: 0.4 + subIndex * 0.06,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#6366F1] w-8 text-right tabular-nums">
                        {sub.userScore}
                      </span>
                    </div>

                    {/* Partner score */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#E85A4F] to-[#F97066]"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${sub.partnerScore}%` } : {}}
                          transition={{
                            duration: 0.8,
                            delay: 0.45 + subIndex * 0.06,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#E85A4F] w-8 text-right tabular-nums">
                        {sub.partnerScore}
                      </span>
                    </div>
                  </div>

                  {/* Average score */}
                  <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Average</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold"
                        style={{ color: subColor }}
                      >
                        {subAvg}
                      </span>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${subColor}15`,
                          color: subColor
                        }}
                      >
                        {getScoreLabel(subAvg)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Warning callout */}
          {dimension.warningText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 p-5 rounded-xl bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent border border-destructive/20 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive" />

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-destructive mb-1">
                    When {dimension.name} Cracks
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {dimension.warningText}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function DimensionAccordion({ dimensions }: DimensionAccordionProps) {
  return (
    <div className="space-y-6">
      {dimensions.map((dimension) => (
        <DimensionItem
          key={dimension.id}
          dimension={dimension}
        />
      ))}
    </div>
  );
}
