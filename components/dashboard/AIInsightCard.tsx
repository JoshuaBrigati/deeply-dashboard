"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Lightbulb, MessageCircle } from "lucide-react";
import type { Dimension } from "@/lib/data";
import { TypewriterText } from "@/components/ui/typewriter-text";

interface AIInsightCardProps {
  dimensions: Dimension[];
}

export function AIInsightCard({ dimensions }: AIInsightCardProps) {
  // Find the dimension with the biggest perception gap
  const biggestGap = dimensions
    .map((d) => ({
      ...d,
      gap: Math.abs(d.userScore - d.partnerScore),
    }))
    .sort((a, b) => b.gap - a.gap)[0];

  return (
    <motion.div
      className="relative rounded-3xl p-[2px] bg-gradient-to-r from-rose via-teal to-rose animate-gradient-x"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {/* Inner content */}
      <div className="relative rounded-[calc(1.5rem-2px)] bg-card p-8 md:p-10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-rose/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-teal/10 to-transparent rounded-full blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose/15 to-teal/15 border border-rose/20 mb-6">
              <Sparkles className="w-4 h-4 text-rose" />
              <span className="text-sm font-medium bg-gradient-to-r from-rose to-teal bg-clip-text text-transparent">
                AI-Powered Insight
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Your Biggest Growth Opportunity
            </h3>

            {/* Dimension highlight */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted border border-border">
                <span className="text-2xl">{biggestGap.icon}</span>
                <span className="text-lg font-semibold text-foreground">{biggestGap.name}</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                <span className="text-sm font-bold text-accent">{biggestGap.gap}pt gap</span>
              </div>
            </div>

            {/* Supportive copy - typewriter effect with reserved space */}
            <div className="mb-8 min-h-[4.5rem] relative">
              <p className="text-muted-foreground leading-relaxed text-base absolute inset-0 opacity-0 pointer-events-none" aria-hidden="true">
                {`You and your partner see ${biggestGap.name.toLowerCase()} quite differently. This awareness is actually a strength—it highlights exactly where focused conversation can create the most meaningful growth in your relationship.`}
              </p>
              <p className="text-muted-foreground leading-relaxed text-base">
                <TypewriterText
                  text={`You and your partner see ${biggestGap.name.toLowerCase()} quite differently. This awareness is actually a strength—it highlights exactly where focused conversation can create the most meaningful growth in your relationship.`}
                  speed={25}
                  delay={500}
                />
              </p>
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-rose to-rose-light text-white font-semibold hover:shadow-lg hover:shadow-rose/25 transition-all duration-300">
              <span>Start a guided conversation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right - Tips */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Recommended Next Steps
            </h4>

            {[
              {
                icon: MessageCircle,
                title: "Have a discovery talk",
                description: `Ask each other: "What does healthy ${biggestGap.name.toLowerCase()} look like to you?"`
              },
              {
                icon: Lightbulb,
                title: "Explore the sub-dimensions",
                description: "Identify which specific aspects contribute most to the gap"
              },
              {
                icon: Sparkles,
                title: "Set a shared intention",
                description: "Choose one small action you can both commit to this week"
              }
            ].map((tip, i) => (
              <motion.div
                key={tip.title}
                className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-border transition-colors group cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-center p-2 rounded-lg bg-secondary shrink-0">
                  <tip.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-foreground text-sm mb-1">{tip.title}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
