"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { assessmentData } from "@/lib/data";
import { ConfettiCelebration } from "@/components/ui/confetti-celebration";
import { PageLoader } from "@/components/ui/page-loader";
import { ArrowUpRight, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import FocusRevealText from "@/components/ui/focus-reveal-text";
import { HeroScore } from "@/components/ui/hero-score";
import { ComparisonRadar } from "@/components/dashboard/ComparisonRadar";
import { PerceptionGapsTrack } from "@/components/dashboard/PerceptionGapsTrack";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { DimensionAccordion } from "@/components/dashboard/DimensionAccordion";
import GodRays from "@/components/ui/god-rays";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLoadComplete = () => {
    setIsLoading(false);
    if (assessmentData.overallScore >= 70) {
      setTimeout(() => setShowConfetti(true), 800);
    }
  };

  return (
    <>
      <ConfettiCelebration trigger={showConfetti} duration={4000} />

      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader onLoadComplete={handleLoadComplete} />
        )}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
        transition={{
          duration: 0.8,
          delay: isLoading ? 0 : 0.2
        }}
      >
        {!isLoading && (
          <div
            className="absolute top-0 right-0 w-2/3 h-1/2 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 40%), linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%), linear-gradient(to bottom, black 60%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <GodRays durationSeconds={60} className="opacity-20" />
          </div>
        )}
        <div className="noise-overlay" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20">
          <motion.header
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 20 : 0 }}
            transition={{ duration: 0.8, delay: isLoading ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Heart className="w-4 h-4 text-primary" fill="currentColor" />
                </motion.div>
                <span className="text-sm font-medium text-muted-foreground">Whole Relationship Model</span>
              </div>
              <ThemeToggle />
            </nav>
          </motion.header>

          <motion.section
            id="hero"
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden glow-primary"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
            >
              <div className="noise-overlay absolute inset-0" />
              <div className="relative">

                {!isLoading && (
                  <div className="flex flex-col items-center justify-center gap-8">
                    <div className="w-full text-center">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-teal" />
                        <span className="text-sm font-medium text-teal">Strong Foundation</span>
                      </motion.div>

                      {/* Main Title */}
                      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight font-serif text-balance text-foreground mb-4">
                        {!isLoading && (
                          <FocusRevealText
                            text="Your Relationship Health"
                            as="span"
                            className="block [--delay:0.6s] [--per-delay:0.025s]"
                          />
                        )}
                      </h1>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto lg:ml-auto">
                        <FocusRevealText
                          text="You have a solid foundation with room to grow. Focus on your areas of opportunity to reach your full potential."
                          as="span"
                          className="block [--delay:1.8s] [--per-delay:0.015s]"
                        />
                      </p>

                      {/* Stats */}

                    </div>
                    <HeroScore
                      userScore={Math.round(assessmentData.dimensions.reduce((sum, d) => sum + d.userScore, 0) / assessmentData.dimensions.length)}
                      partnerScore={Math.round(assessmentData.dimensions.reduce((sum, d) => sum + d.partnerScore, 0) / assessmentData.dimensions.length)}
                      overallScore={assessmentData.overallScore}
                      maxScore={assessmentData.maxScore}
                      date={assessmentData.assessmentDate}
                      userName={assessmentData.coupleNames.user}
                      partnerName={assessmentData.coupleNames.partner}
                    />

                    <div className="flex items-center gap-6 justify-center lg:justify-end">
                      <div className="text-center lg:text-right">
                        <div className="text-2xl font-bold text-foreground">7</div>
                        <div className="text-sm text-muted-foreground">Dimensions</div>
                      </div>
                      <div className="w-px h-10 bg-border" />
                      <div className="text-center lg:text-right">
                        <div className="text-2xl font-bold text-foreground">
                          {assessmentData.dimensions.filter(d => Math.abs(d.userScore - d.partnerScore) >= 10).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Perception Gaps</div>
                      </div>
                    </div>
                    {/* <div className="w-full text-center lg:text-right">
                      <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-teal" />
                        <span className="text-sm font-medium text-teal">Strong Foundation</span>
                      </motion.div>
\
                      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight font-serif text-balance text-foreground mb-4">
                        {!isLoading && (
                          <FocusRevealText
                            text="Your Relationship Health"
                            as="span"
                            className="block [--delay:0.6s] [--per-delay:0.025s]"
                          />
                        )}
                      </h1>
\
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto lg:ml-auto">
                        <FocusRevealText
                          text="You have a solid foundation with room to grow. Focus on your areas of opportunity to reach your full potential."
                          as="span"
                          className="block [--delay:1.8s] [--per-delay:0.015s]"
                        />
                      </p>

                      <div className="flex items-center gap-6 justify-center lg:justify-end">
                        <div className="text-center lg:text-right">
                          <div className="text-2xl font-bold text-foreground">7</div>
                          <div className="text-sm text-muted-foreground">Dimensions</div>
                        </div>
                        <div className="w-px h-10 bg-border" />
                        <div className="text-center lg:text-right">
                          <div className="text-2xl font-bold text-foreground">
                            {assessmentData.dimensions.filter(d => Math.abs(d.userScore - d.partnerScore) >= 10).length}
                          </div>
                          <div className="text-sm text-muted-foreground">Perception Gaps</div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-6 mt-6">
              <motion.div
                className="glass-card rounded-3xl overflow-hidden glow-primary p-6 shadow-sm md:p-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Relationship Overview</h3>
                  <p className="text-sm text-muted-foreground mt-1">Visual comparison across all dimensions</p>
                </div>

                <ComparisonRadar dimensions={assessmentData.dimensions} />
              </motion.div>

              <motion.div
                className="glass-card rounded-3xl overflow-hidden glow-primary p-6 shadow-sm md:p-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 40 : 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <div className="mb-2">
                  <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                    Perception Gaps
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Where you and your partner see things differently
                  </p>
                </div>
                <PerceptionGapsTrack dimensions={assessmentData.dimensions} />
              </motion.div>
            </div>
          </motion.section>

          <ScrollReveal delay={0.15}>
            <section id="insights" className="mb-16">
              <AIInsightCard dimensions={assessmentData.dimensions} />
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <section id="dimensions" className="mb-16">
              <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2 block">The 7 Layers</span>
                <FocusRevealText
                  text="Explore each layer in detail"
                  as="h2"
                  className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-foreground [--delay:0.1s] [--per-delay:0.025s]"
                  triggerOnScroll
                />
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                  Click any layer to understand what it measures, where you differ, and how to address it.
                </p>
              </motion.div>

              <DimensionAccordion dimensions={assessmentData.dimensions} />
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <footer className="text-center pt-12 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Assessment powered by the Whole Relationship Model
              </p>
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-sm font-medium text-foreground transition-all hover:border-primary/50 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn about the framework
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </footer>
          </ScrollReveal>
        </div>
      </motion.div>
    </>
  );
}
