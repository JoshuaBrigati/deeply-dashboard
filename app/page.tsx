"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DimensionRadar } from "@/components/dashboard/DimensionRadar";
import { DimensionCard } from "@/components/dashboard/DimensionCard";
import { InsightDialog } from "@/components/dashboard/InsightDialog";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { mockAssessmentData, getBiggestGap } from "@/lib/data";
import { OverallScore } from "@/components/dashboard/OverallScore";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { overallScore, assessmentDate, dimensions } = mockAssessmentData;
  const [insightDialogOpen, setInsightDialogOpen] = useState(false);
  const biggestGapDimension = getBiggestGap(dimensions);

  useEffect(() => {
    // Simulate loading delay to demonstrate skeleton
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="relative mx-auto max-w-5xl text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-2 text-balance">
              Your Relationship Health
            </h1>
            <div className="flex items-center justify-center gap-2">
              <p className="text-muted-foreground">
                Assessment results from the Whole Relationship Model
              </p>
            </div>
          </div>
        </motion.header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-[#2D3436] mb-2">
              Overall Score
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Your combined relationship health across all dimensions
            </p>
            <OverallScore score={overallScore} assessmentDate={assessmentDate} />
          </Card>

          <Card
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-[#2D3436] mb-2">
              Dimension Comparison
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              See where you and your partner align—and where you differ
            </p>
            <DimensionRadar dimensions={dimensions} />
          </Card>
        </section>

        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-3"
          >
            <h2 className="text-2xl font-semibold text-foreground">
              Dimension Breakdown
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {dimensions.map((dimension, index) => (
              <DimensionCard
                key={dimension.id}
                dimension={dimension}
                index={index}
                isBiggestGap={dimension.id === biggestGapDimension?.id}
                onInsightClick={() => setInsightDialogOpen(true)}
              />
            ))}
          </div>
        </section>

        <footer className="border-t border-border/50 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Assessment powered by the{" "}
            <span className="font-medium text-foreground">
              Whole Relationship Model
            </span>
          </p>
        </footer>
      </div>

      <InsightDialog
        dimension={biggestGapDimension}
        allDimensions={dimensions}
        overallScore={overallScore}
        open={insightDialogOpen}
        onOpenChange={setInsightDialogOpen}
      />
    </div>
  );
}
