"use client";

import { useEffect, useState, useCallback } from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { Dimension } from "@/types/assessment";
import { getPerceptionGap, getScoreColor } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InsightDialogProps {
  dimension: Dimension | null;
  allDimensions: Dimension[];
  overallScore: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InsightDialog({
  dimension,
  allDimensions,
  overallScore,
  open,
  onOpenChange,
}: InsightDialogProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(async () => {
    if (!dimension) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dimension,
          allDimensions,
          overallScore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate insight");
      }

      const data = await response.json();
      setInsight(data.insight);
    } catch (err) {
      setError("Unable to generate insight. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [dimension, allDimensions, overallScore]);

  useEffect(() => {
    if (open && dimension && !insight) {
      fetchInsight();
    }
  }, [open, dimension, insight, fetchInsight]);

  if (!dimension) return null;

  const gap = getPerceptionGap(dimension.userScore, dimension.partnerScore);
  const dimensionName = dimension.name.toLowerCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-accent/10 p-2" aria-hidden="true">
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <span className="text-xs font-medium uppercase tracking-wide text-accent">
              AI Insight
            </span>
          </div>
          <DialogTitle className="text-xl font-bold">
            Your Biggest Opportunity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Dimension badge and scores */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 self-start">
              <span className="text-lg" aria-hidden="true">
                {dimension.icon}
              </span>
              <span className="font-medium text-foreground">{dimension.name}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {gap} point gap
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">You:</span>
                <span className="font-semibold" style={{ color: getScoreColor(dimension.userScore) }}>
                  {dimension.userScore}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Partner:</span>
                <span className="font-semibold" style={{ color: getScoreColor(dimension.partnerScore) }}>
                  {dimension.partnerScore}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-dimensions breakdown */}
          <div className="rounded-xl bg-muted/50 p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Sub-dimension Breakdown
            </h4>
            <div className="space-y-3">
              {dimension.subDimensions.map((sub) => {
                const subGap = Math.abs(sub.userScore - sub.partnerScore);
                return (
                  <div key={sub.name} className="flex items-center gap-3">
                    <span className="text-base" aria-hidden="true">
                      {sub.icon}
                    </span>
                    <span className="text-sm text-foreground flex-1 min-w-0">
                      {sub.name}
                    </span>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-medium text-user w-6 text-right">
                        {sub.userScore}
                      </span>
                      <span className="text-muted-foreground">/</span>
                      <span className="font-medium text-partner w-6">
                        {sub.partnerScore}
                      </span>
                      {subGap >= 10 && (
                        <span className="text-xs text-score-medium font-medium">
                          ({subGap}pt gap)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Insight content */}
          {isLoading && (
            <div className="flex items-center gap-3 py-6">
              <Loader2 className="h-5 w-5 animate-spin text-accent" />
              <span className="text-muted-foreground">
                Generating personalized insight...
              </span>
            </div>
          )}

          {error && (
            <div className="py-4">
              <p className="text-muted-foreground">{error}</p>
              <button
                onClick={fetchInsight}
                className="mt-2 text-sm font-medium text-accent hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {insight && !isLoading && (
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {insight}
              </p>
            </div>
          )}

          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Explore {dimensionName} exercises
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
