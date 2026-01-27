import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

const FRAMEWORK_CONTEXT = `
# The Whole Relationship Model Framework

The Whole Relationship Model is a comprehensive 7-dimension framework for understanding relationship health. The dimensions are hierarchical—Foundation affects everything above it.

## The 7 Dimensions (in hierarchical order)

### 1. Foundation - Individual Wholeness (Most Critical)
The base upon which everything else is built. When individuals are whole, they can fully show up for each other.
- **Sub-dimensions:** Self-Awareness, Emotional Regulation, Personal Growth
- **When it fails:** Individual struggles overflow into the relationship. Personal unresolved issues become shared burdens, and neither partner can fully show up for the other.

### 2. Connection - How Partners Relate
The emotional bond and communication patterns between partners.
- **Sub-dimensions:** Emotional Intimacy, Communication Quality, Physical Affection
- **When it fails:** Partners feel like strangers living parallel lives. Emotional intimacy fades, and conversations become transactional rather than meaningful.

### 3. Operations - Daily Partnership
The practical mechanics of running a life together.
- **Sub-dimensions:** Task Division, Financial Partnership, Time Management
- **When it fails:** Daily life becomes a source of conflict. Chores, finances, and logistics create friction instead of flowing smoothly as a team.

### 4. Boundary - Internal and External
How the couple protects their relationship from internal enmeshment and external pressures.
- **Sub-dimensions:** Personal Space, Family Boundaries, Work-Life Balance
- **When it fails:** The relationship either becomes enmeshed or disconnected. External pressures from family, work, or friends can erode the partnership's integrity.

### 5. Alignment - Shared Direction
Whether partners are building toward a common future.
- **Sub-dimensions:** Shared Values, Future Vision, Life Goals
- **When it fails:** Partners pull in different directions. Dreams and goals diverge, creating a sense of growing apart rather than building together.

### 6. Repair - Recovery Systems
The ability to heal from inevitable hurts and conflicts.
- **Sub-dimensions:** Conflict Resolution, Forgiveness, Rebuilding Trust
- **When it fails:** Small hurts accumulate into lasting resentment. Conflicts remain unresolved, trust erodes, and the relationship struggles to heal from inevitable wounds.

### 7. Meta - Relationship About the Relationship
The couple's ability to reflect on and intentionally improve their relationship.
- **Sub-dimensions:** Relationship Awareness, Growth Mindset, Intentionality
- **When it fails:** The relationship lacks self-awareness. Partners stop reflecting on patterns, miss opportunities for growth, and repeat the same cycles.

## Scoring System
- **70-100:** Strong/Thriving - This area is a relationship strength
- **40-69:** Developing - Room for growth but not critical
- **0-39:** Needs Attention - Priority area for focused work

## Perception Gaps
When partners score the same dimension differently, it reveals a "perception gap." Large gaps (10+ points) indicate partners experience this area of the relationship quite differently, which itself is valuable information for discussion.
`;

interface SubDimension {
  name: string;
  icon: string;
  userScore: number;
  partnerScore: number;
}

interface Dimension {
  id: string;
  name: string;
  description: string;
  icon: string;
  userScore: number;
  partnerScore: number;
  warningText: string;
  subDimensions: SubDimension[];
}

interface InsightRequest {
  dimension: Dimension;
  allDimensions: Dimension[];
  overallScore: number;
}

export async function POST(request: Request) {
  try {
    const body: InsightRequest = await request.json();
    const { dimension, allDimensions, overallScore } = body;

    const gap = Math.abs(dimension.userScore - dimension.partnerScore);
    const avgScore = Math.round((dimension.userScore + dimension.partnerScore) / 2);

    // Build context about all dimensions for comparative analysis
    const dimensionsSummary = allDimensions
      .map((d) => {
        const dGap = Math.abs(d.userScore - d.partnerScore);
        const dAvg = Math.round((d.userScore + d.partnerScore) / 2);
        return `- ${d.name}: You=${d.userScore}, Partner=${d.partnerScore}, Gap=${dGap}, Avg=${dAvg}`;
      })
      .join("\n");

    const prompt = `You are a compassionate relationship coach providing insight based on the Whole Relationship Model assessment.

${FRAMEWORK_CONTEXT}

## Current Assessment Data

**Overall Relationship Score:** ${overallScore}/100

**All Dimension Scores:**
${dimensionsSummary}

**Focus Dimension: ${dimension.name}** (${dimension.description})
- Your Score: ${dimension.userScore}
- Partner's Score: ${dimension.partnerScore}
- Perception Gap: ${gap} points
- Average Score: ${avgScore}

**Sub-dimensions for ${dimension.name}:**
${dimension.subDimensions
  .map((s) => `- ${s.name}: You=${s.userScore}, Partner=${s.partnerScore}`)
  .join("\n")}

## Your Task

Write a personalized, supportive insight about the "${dimension.name}" dimension. Your response should:

1. **Acknowledge the perception gap** (${gap} points) between partners in a non-judgmental way
2. **Identify the specific sub-dimension** that shows the largest discrepancy and why that matters
3. **Provide one concrete, actionable suggestion** for starting a conversation about this dimension
4. **Frame everything positively** - awareness is the first step to growth
5. **Keep it warm and supportive** - this is sensitive personal data

**Tone:** Like a wise friend who happens to be a relationship therapist. Warm, insightful, never preachy or clinical.

**Length:** 2-3 short paragraphs (about 100-150 words total)

**Important:** Do NOT use bullet points or numbered lists. Write in flowing prose. Do NOT start with "I" or mention that you're an AI.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const textContent = message.content.find((block) => block.type === "text");
    const insight = textContent ? textContent.text : "";

    return NextResponse.json({ insight });
  } catch (error) {
    console.error("Error generating insight:", error);
    return NextResponse.json(
      { error: "Failed to generate insight" },
      { status: 500 }
    );
  }
}
