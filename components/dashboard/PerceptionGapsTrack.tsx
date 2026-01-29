"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import type { Dimension } from "@/lib/data"

interface PerceptionGapsTrackProps {
  dimensions: Dimension[]
}

export function PerceptionGapsTrack({ dimensions }: PerceptionGapsTrackProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const sortedByGap = [...dimensions].sort(
    (a, b) => Math.abs(b.userScore - b.partnerScore) - Math.abs(a.userScore - a.partnerScore)
  )

  return (
    <div ref={ref}>
      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#6366F1]" />
          <span className="text-muted-foreground">You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#E85A4F]" />
          <span className="text-muted-foreground">Partner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-4 rounded bg-accent/20" />
          <span className="text-muted-foreground">Gap area</span>
        </div>
      </div>

      {/* Gap visualization */}
      <div className="space-y-2">
        {sortedByGap.map((dimension, index) => {
          const gap = Math.abs(dimension.userScore - dimension.partnerScore)
          const minScore = Math.min(dimension.userScore, dimension.partnerScore)
          const hasSignificantGap = gap >= 10

          return (
            <motion.div
              key={dimension.name}
              className="group"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {dimension.name}
                </span>
                <motion.span
                  className={`text-xs font-semibold ${hasSignificantGap ? 'text-[#c4334f]' : 'text-muted-foreground'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {gap > 0 ? `${gap} pts` : 'Aligned'}
                </motion.span>
              </div>

              {/* Score bar with gap visualization */}
              <div className="relative h-8 overflow-hidden rounded-lg bg-muted">
                {/* Gap highlight area */}
                {gap > 0 && (
                  <motion.div
                    className="absolute top-0 h-full bg-accent/15"
                    initial={{ left: `${minScore}%`, width: 0 }}
                    animate={isInView ? {
                      left: `${minScore}%`,
                      width: `${gap}%`
                    } : {}}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                )}

                {/* User score marker */}
                <motion.div
                  className="absolute top-1 h-6 w-1.5 rounded-full bg-[#6366F1] shadow-sm"
                  initial={{ left: 0 }}
                  animate={isInView ? { left: `calc(${dimension.userScore}% - 3px)` } : {}}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />

                {/* Partner score marker */}
                <motion.div
                  className="absolute top-1 h-6 w-1.5 rounded-full bg-[#E85A4F] shadow-sm"
                  initial={{ left: 0 }}
                  animate={isInView ? { left: `calc(${dimension.partnerScore}% - 3px)` } : {}}
                  transition={{
                    delay: 0.25 + index * 0.08,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />

                {/* Score labels on hover */}
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-[10px] font-medium text-muted-foreground">0</span>
                  <span className="text-[10px] font-medium text-muted-foreground">100</span>
                </div>
              </div>

              {/* Individual scores */}
              <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                <span>You: {dimension.userScore}</span>
                <span>Partner: {dimension.partnerScore}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary insight */}
      <motion.div
        className="mt-6 rounded-lg bg-muted/50 p-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {dimensions.filter(d => Math.abs(d.userScore - d.partnerScore) >= 10).length} dimensions
          </span>
          {' '}show significant perception gaps (10+ points). These represent opportunities for deeper conversation.
        </p>
      </motion.div>
    </div>
  )
}
