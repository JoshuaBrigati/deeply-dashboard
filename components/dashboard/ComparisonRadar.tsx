"use client"

import { motion } from "framer-motion"
import type { Dimension } from "@/lib/data"

interface ComparisonRadarProps {
  dimensions: Dimension[]
}

export function ComparisonRadar({ dimensions }: ComparisonRadarProps) {
  const centerX = 200
  const centerY = 200
  const maxRadius = 100
  const levels = 5

  // Calculate points for each dimension
  const angleStep = (2 * Math.PI) / dimensions.length
  const startAngle = -Math.PI / 2 // Start from top

  const getPoint = (score: number, index: number) => {
    const angle = startAngle + index * angleStep
    const radius = (score / 100) * maxRadius
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  }

  const getLabelPoint = (index: number, offset: number = 20) => {
    const angle = startAngle + index * angleStep
    const radius = maxRadius + offset
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  }

  // Generate path for scores
  const generatePath = (scores: number[]) => {
    const points = scores.map((score, i) => getPoint(score, i))
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z'
  }

  const userPath = generatePath(dimensions.map(d => d.userScore))
  const partnerPath = generatePath(dimensions.map(d => d.partnerScore))

  // Generate grid lines
  const gridPaths = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius
    const points = dimensions.map((_, index) => {
      const angle = startAngle + index * angleStep
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      }
    })
    return points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ') + ' Z'
  })

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#6366F1]" />
          <span className="text-muted-foreground">You</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#E85A4F]" />
          <span className="text-muted-foreground">Partner</span>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="flex justify-center">
        <svg viewBox="0 0 400 400" className="w-full h-auto mx-auto">
          {/* Grid */}
          {gridPaths.map((path, i) => (
            <motion.path
              key={i}
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            />
          ))}

          {/* Axis lines */}
          {dimensions.map((_, i) => {
            const end = getPoint(100, i)
            return (
              <motion.line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={end.x}
                y2={end.y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              />
            )
          })}

          {/* Partner area */}
          <motion.path
            d={partnerPath}
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#E85A4F]"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.15 }}
            transition={{
              delay: 0.6,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          />

          {/* User area */}
          <motion.path
            d={userPath}
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#6366F1]"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.15 }}
            transition={{
              delay: 0.8,
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          />

          {/* Data points - User */}
          {dimensions.map((d, i) => {
            const point = getPoint(d.userScore, i)
            return (
              <motion.circle
                key={`user-${i}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="currentColor"
                className="text-[#6366F1]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 1.2 + i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
            )
          })}

          {/* Data points - Partner */}
          {dimensions.map((d, i) => {
            const point = getPoint(d.partnerScore, i)
            return (
              <motion.circle
                key={`partner-${i}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="currentColor"
                className="text-[#E85A4F]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 1.0 + i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
            )
          })}

          {/* Labels */}
          {dimensions.map((d, i) => {
            const labelPoint = getLabelPoint(i, 35)
            const angle = startAngle + i * angleStep
            const isLeft = Math.cos(angle) < -0.1
            const isRight = Math.cos(angle) > 0.1

            return (
              <motion.text
                key={`label-${i}`}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={isLeft ? 'end' : isRight ? 'start' : 'middle'}
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                {d.name}
              </motion.text>
            )
          })}
        </svg>
      </div>

      {/* Score summary */}
      <motion.div
        className="mt-4 flex justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-center">
          <p className="text-2xl font-semibold text-[#6366F1]">
            {Math.round(dimensions.reduce((sum, d) => sum + d.userScore, 0) / dimensions.length)}
          </p>
          <p className="text-xs text-muted-foreground">Your avg</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold text-[#E85A4F]">
            {Math.round(dimensions.reduce((sum, d) => sum + d.partnerScore, 0) / dimensions.length)}
          </p>
          <p className="text-xs text-muted-foreground">Partner avg</p>
        </div>
      </motion.div>
    </div>
  )
}
