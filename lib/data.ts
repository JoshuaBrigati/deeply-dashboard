import { AssessmentResult, Dimension } from "@/types/assessment";

export const mockAssessmentData: AssessmentResult = {
  overallScore: 72,
  partnerOverallScore: 72,
  assessmentDate: "January 15, 2026",
  dimensions: [
    {
      id: "foundation",
      name: "Foundation",
      description: "Individual Wholeness",
      icon: "🏛️",
      userScore: 78,
      partnerScore: 75,
      warningText:
        "When Foundation fails, individual struggles overflow into the relationship. Personal unresolved issues become shared burdens, and neither partner can fully show up for the other.",
      subDimensions: [
        { name: "Self-Awareness", icon: "🔍", userScore: 80, partnerScore: 77 },
        { name: "Emotional Regulation", icon: "🧘", userScore: 76, partnerScore: 73 },
        { name: "Personal Growth", icon: "🌱", userScore: 78, partnerScore: 75 },
      ],
    },
    {
      id: "connection",
      name: "Connection",
      description: "How Partners Relate",
      icon: "💬",
      userScore: 82,
      partnerScore: 68,
      warningText:
        "When Connection fails, partners feel like strangers living parallel lives. Emotional intimacy fades, and conversations become transactional rather than meaningful.",
      subDimensions: [
        { name: "Emotional Intimacy", icon: "❤️", userScore: 85, partnerScore: 70 },
        { name: "Communication Quality", icon: "💭", userScore: 80, partnerScore: 65 },
        { name: "Physical Affection", icon: "🤗", userScore: 81, partnerScore: 69 },
      ],
    },
    {
      id: "operations",
      name: "Operations",
      description: "Daily Partnership",
      icon: "⚙️",
      userScore: 71,
      partnerScore: 74,
      warningText:
        "When Operations fail, daily life becomes a source of conflict. Chores, finances, and logistics create friction instead of flowing smoothly as a team.",
      subDimensions: [
        { name: "Task Division", icon: "📋", userScore: 68, partnerScore: 76 },
        { name: "Financial Partnership", icon: "💰", userScore: 72, partnerScore: 73 },
        { name: "Time Management", icon: "⏰", userScore: 73, partnerScore: 73 },
      ],
    },
    {
      id: "boundary",
      name: "Boundary",
      description: "Internal and External",
      icon: "🛡️",
      userScore: 58,
      partnerScore: 78,
      warningText:
        "When Boundaries fail, the relationship either becomes enmeshed or disconnected. External pressures from family, work, or friends can erode the partnership's integrity.",
      subDimensions: [
        { name: "Personal Space", icon: "🚪", userScore: 55, partnerScore: 80 },
        { name: "Family Boundaries", icon: "👨‍👩‍👧", userScore: 60, partnerScore: 76 },
        { name: "Work-Life Balance", icon: "⚖️", userScore: 59, partnerScore: 78 },
      ],
    },
    {
      id: "alignment",
      name: "Alignment",
      description: "Shared Direction",
      icon: "🧭",
      userScore: 75,
      partnerScore: 68,
      warningText:
        "When Alignment fails, partners pull in different directions. Dreams and goals diverge, creating a sense of growing apart rather than building together.",
      subDimensions: [
        { name: "Shared Values", icon: "💎", userScore: 78, partnerScore: 70 },
        { name: "Future Vision", icon: "🔮", userScore: 72, partnerScore: 66 },
        { name: "Life Goals", icon: "🎯", userScore: 75, partnerScore: 68 },
      ],
    },
    {
      id: "repair",
      name: "Repair",
      description: "Recovery Systems",
      icon: "🔧",
      userScore: 52,
      partnerScore: 61,
      warningText:
        "When Repair fails, small hurts accumulate into lasting resentment. Conflicts remain unresolved, trust erodes, and the relationship struggles to heal from inevitable wounds.",
      subDimensions: [
        { name: "Conflict Resolution", icon: "🤝", userScore: 50, partnerScore: 58 },
        { name: "Forgiveness", icon: "🕊️", userScore: 54, partnerScore: 63 },
        { name: "Rebuilding Trust", icon: "🔐", userScore: 52, partnerScore: 62 },
      ],
    },
    {
      id: "meta",
      name: "Meta",
      description: "Relationship About the Relationship",
      icon: "🪞",
      userScore: 85,
      partnerScore: 82,
      warningText:
        "When Meta fails, the relationship lacks self-awareness. Partners stop reflecting on patterns, miss opportunities for growth, and repeat the same cycles.",
      subDimensions: [
        { name: "Relationship Awareness", icon: "👁️", userScore: 87, partnerScore: 84 },
        { name: "Growth Mindset", icon: "📈", userScore: 84, partnerScore: 80 },
        { name: "Intentionality", icon: "🎪", userScore: 84, partnerScore: 82 },
      ],
    },
  ],
};

export const getScoreColor = (score: number): string => {
  if (score >= 70) return "#5B8A72";
  if (score >= 40) return "#E9B872";
  return "#E07A5F";
};

export const getScoreBgColor = (score: number): string => {
  if (score >= 70) return "bg-score-good text-white";
  if (score >= 40) return "bg-score-medium";
  return "bg-score-low";
};

export const getOverallLabel = (score: number): string => {
  if (score >= 80) return "Thriving Relationship";
  if (score >= 70) return "Strong Foundation";
  if (score >= 50) return "Room to Grow";
  if (score >= 30) return "Needs Attention";
  return "Critical Focus Area";
};

export const getPerceptionGap = (
  userScore: number,
  partnerScore: number
): number => {
  return Math.abs(userScore - partnerScore);
};

export const getBiggestGap = (dimensions: Dimension[]): Dimension | null => {
  if (dimensions.length === 0) return null;

  return dimensions.reduce((maxGap, dimension) => {
    const currentGap = getPerceptionGap(
      dimension.userScore,
      dimension.partnerScore
    );
    const maxGapValue = getPerceptionGap(maxGap.userScore, maxGap.partnerScore);
    return currentGap > maxGapValue ? dimension : maxGap;
  }, dimensions[0]);
};
