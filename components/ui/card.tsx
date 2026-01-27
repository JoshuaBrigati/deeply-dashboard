"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const paddingVariants = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-6 md:p-8",
};

export function Card({
  children,
  className,
  padding = "md",
  hover = false,
  ...motionProps
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]",
        paddingVariants[padding],
        hover && "hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5",
        className
      )}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
