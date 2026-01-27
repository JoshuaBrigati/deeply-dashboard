"use client";

import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Dimension } from "@/types/assessment";

interface DimensionRadarProps {
  dimensions: Dimension[];
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="mb-2 font-medium text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DimensionRadar = ({ dimensions }: DimensionRadarProps) => {
  const data = dimensions.map((dim) => ({
    dimension: dim.name,
    user: dim.userScore,
    partner: dim.partnerScore,
    fullMark: 100,
  }));

  return (
    <motion.div
      className="w-full h-64 md:h-80"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid
            stroke="#E5E0DB"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{
              fill: "#4A5568",
              fontSize: 12,
              fontWeight: 500,
            }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#6B7280", fontSize: 10 }}
            axisLine={false}
            tickCount={5}
          />
          <Radar
            name="You"
            dataKey="user"
            stroke="#6366F1"
            fill="#6366F1"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: "#6366F1", r: 4 }}
            animationBegin={300}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
          <Radar
            name="Partner"
            dataKey="partner"
            stroke="#E07A5F"
            fill="#E07A5F"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#E07A5F", r: 4 }}
            animationBegin={600}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
            }}
            iconType="circle"
            iconSize={12}
            formatter={(value) => (
              <span className="text-sm text-foreground font-medium">{value}</span>
            )}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
