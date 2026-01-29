import type { SubDimension, Dimension, AssessmentData } from "@/types/assessment";

export type { SubDimension, Dimension, AssessmentData };

export const assessmentData: AssessmentData = {
  overallScore: 72,
  maxScore: 100,
  assessmentDate: "2026-01-15",
  coupleNames: { user: "You", partner: "Partner" },
  dimensions: [
    {
      id: 1,
      name: "Foundation",
      description: "Individual Wholeness",
      icon: "💕",
      userScore: 78,
      partnerScore: 75,
      warningText: "When foundation cracks: codependency, controlling behavior, emotional dysregulation. This layer must be addressed first.",
      subDimensions: [
        { name: "Self-Regulation", icon: "🧘", userScore: 80, partnerScore: 72 },
        { name: "Self-Worth & Security", icon: "💎", userScore: 75, partnerScore: 78 },
        { name: "Personal Responsibility", icon: "✅", userScore: 82, partnerScore: 74 },
        { name: "Health & Wellbeing", icon: "🏥", userScore: 75, partnerScore: 76 }
      ]
    },
    {
      id: 2,
      name: "Connection",
      description: "How Partners Relate",
      icon: "💬",
      userScore: 82,
      partnerScore: 68,
      warningText: "When connection breaks: feeling like roommates, lonely together, constant conflict, contempt.",
      subDimensions: [
        { name: "Communication", icon: "🗣️", userScore: 85, partnerScore: 65 },
        { name: "Emotional Intimacy", icon: "❤️", userScore: 80, partnerScore: 70 },
        { name: "Physical Intimacy", icon: "🔥", userScore: 81, partnerScore: 69 }
      ]
    },
    {
      id: 3,
      name: "Operations",
      description: "Daily Partnership",
      icon: "⚙️",
      userScore: 71,
      partnerScore: 74,
      warningText: "When operations fail: resentment over inequality, 'I do everything,' financial conflicts.",
      subDimensions: [
        { name: "Domestic Systems", icon: "🏠", userScore: 68, partnerScore: 76 },
        { name: "Financial Systems", icon: "💰", userScore: 72, partnerScore: 71 },
        { name: "Time Allocation", icon: "⏰", userScore: 73, partnerScore: 75 }
      ]
    },
    {
      id: 4,
      name: "Boundary",
      description: "Internal & External",
      icon: "🛡️",
      userScore: 58,
      partnerScore: 78,
      warningText: "When boundaries fail: intrusive in-laws, suffocation, parallel lives, external validation seeking.",
      subDimensions: [
        { name: "Internal Boundaries", icon: "🔒", userScore: 55, partnerScore: 80 },
        { name: "External Boundaries", icon: "🌍", userScore: 61, partnerScore: 76 }
      ]
    },
    {
      id: 5,
      name: "Alignment",
      description: "Shared Direction",
      icon: "🎯",
      userScore: 75,
      partnerScore: 68,
      warningText: "When alignment breaks: 'We want different things,' growing apart, fundamental incompatibilities.",
      subDimensions: [
        { name: "Values Alignment", icon: "⚖️", userScore: 78, partnerScore: 70 },
        { name: "Life Stage Transitions", icon: "🔄", userScore: 72, partnerScore: 65 },
        { name: "Growth Trajectories", icon: "📈", userScore: 75, partnerScore: 69 }
      ]
    },
    {
      id: 6,
      name: "Repair",
      description: "Recovery Systems",
      icon: "🔧",
      userScore: 52,
      partnerScore: 61,
      warningText: "When repair fails: can't get past infidelity, bringing up old issues, resentment calcification.",
      subDimensions: [
        { name: "Trust & Repair", icon: "🤝", userScore: 50, partnerScore: 58 },
        { name: "Resilience Through Adversity", icon: "💪", userScore: 54, partnerScore: 64 }
      ]
    },
    {
      id: 7,
      name: "Meta",
      description: "The Relationship About the Relationship",
      icon: "🔮",
      userScore: 85,
      partnerScore: 82,
      warningText: "When meta fails: one person checked out, contempt, power imbalances, feeling unappreciated.",
      subDimensions: [
        { name: "Commitment & Investment", icon: "💍", userScore: 88, partnerScore: 85 },
        { name: "Power Dynamics", icon: "⚖️", userScore: 82, partnerScore: 80 },
        { name: "Appreciation & Positivity", icon: "✨", userScore: 85, partnerScore: 81 }
      ]
    }
  ]
};

// Helper functions
export function getScoreColor(score: number): string {
  if (score >= 80) return "#059669"; // Emerald green
  if (score >= 60) return "#10B981"; // Green
  if (score >= 40) return "#D97706"; // Amber
  return "#E85A4F"; // Coral
}

export function getScoreColorClass(score: number): string {
  if (score >= 80) return "bg-[#059669]/15 text-[#059669] border border-[#059669]/25";
  if (score >= 60) return "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25";
  if (score >= 40) return "bg-[#D97706]/15 text-[#D97706] border border-[#D97706]/25";
  return "bg-[#E85A4F]/15 text-[#E85A4F] border border-[#E85A4F]/25";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Thriving";
  if (score >= 60) return "Healthy";
  if (score >= 40) return "Growing";
  return "Needs Focus";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
