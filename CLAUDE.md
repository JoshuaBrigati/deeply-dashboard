# Relationship Health Dashboard - Project Instructions

## Project Overview
Building a premium Relationship Health Score Dashboard for a take-home design engineering assignment. This visualizes assessment results from the "Whole Relationship Model" - a 7-dimension framework for understanding relationship health.

## Tech Stack (Required)
- Next.js 15 with App Router
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui components
- Recharts for data visualization
- Framer Motion for animations
- Geist font (built into Next.js)

## Design Direction
- **Aesthetic**: Premium wellness app (think Calm, Headspace)
- **Palette**: Warm, approachable - cream backgrounds, sage greens, soft corals
- **Typography**: Geist Sans for UI, Geist Mono for numbers/scores
- **Tone**: Supportive, not clinical. This is sensitive personal data.

## Color Tokens (use these exactly)
```css
--background: #FFFBF7 (warm white)
--card: #FFFFFF
--card-muted: #FEF7ED (warm cream for callouts)
--score-good: #5B8A72 (sage green, 70-100)
--score-medium: #E9B872 (warm amber, 40-69)  
--score-low: #E07A5F (terracotta, 0-39)
--text-primary: #2D3436
--text-muted: #6B7280
--accent: #6366F1 (indigo for interactive elements)
```

## Component Architecture
All components should be:
1. Fully typed with TypeScript interfaces
2. Accept data via props (no hardcoded data)
3. Use Tailwind only (no inline styles)
4. Include subtle Framer Motion animations
5. Be responsive (mobile-first)

## File Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/              # shadcn components
│   ├── dashboard/
│   │   ├── OverallScore.tsx
│   │   ├── DimensionRadar.tsx
│   │   ├── DimensionCard.tsx
│   │   ├── PerceptionGapBar.tsx
│   │   └── InsightCard.tsx
│   └── shared/
│       └── AnimatedNumber.tsx
├── lib/
│   ├── utils.ts
│   └── data.ts
└── types/
    └── assessment.ts
```

## The 7 Dimensions (in hierarchical order)
1. **Foundation** - Individual Wholeness (most critical - affects all above)
2. **Connection** - How Partners Relate  
3. **Operations** - Daily Partnership
4. **Boundary** - Internal and External
5. **Alignment** - Shared Direction
6. **Repair** - Recovery Systems
7. **Meta** - Relationship About the Relationship

## Key Visualization Requirements
1. **Overall Score**: Large hero display with animated radial progress ring
2. **Radar/Spider Chart**: Overlay both partners' scores to show gaps
3. **Dimension Cards**: Show each dimension with perception gap visualization
4. **Insight Card**: Highlight the biggest opportunity area

## Animation Guidelines
- Use `framer-motion` for all animations
- Score numbers should count up on mount
- Cards should fade in with stagger
- Hover states should have subtle lift (translateY + shadow)
- Progress bars should animate from 0 to value

## Code Style
- Prefer `const` arrow functions for components
- Use descriptive variable names
- Extract magic numbers to named constants
- Group related Tailwind classes logically
- No comments unless explaining complex logic

## What NOT to do
- No create-react-app patterns
- No CSS modules or styled-components
- No hardcoded colors (use Tailwind config)
- No placeholder "Lorem ipsum" text
- No console.logs in final code
```

---

### **Initial Claude Code Prompts (Run in Order)**

#### **Prompt 1: Project Setup**
```
Create a new Next.js 15 project with TypeScript, Tailwind CSS, and the App Router. 

Set up:
1. Geist font (import from 'geist/font/sans' and 'geist/font/mono')
2. Custom Tailwind config with the color palette from CLAUDE.md
3. shadcn/ui initialized with the "new-york" style
4. Install recharts and framer-motion

Configure the layout.tsx with proper fonts and metadata for "Relationship Health Dashboard".
```

#### **Prompt 2: Types & Data**
```
Create the TypeScript types and mock data for the assessment.

In src/types/assessment.ts, create interfaces for:
- SubDimension (name, icon, userScore, partnerScore)
- Dimension (name, description, icon, scores, warningText, subDimensions array)
- AssessmentResult (overallScore, assessmentDate, dimensions array)

In src/lib/data.ts, create mock data with all 7 dimensions and their sub-dimensions based on the Whole Relationship Model. Include realistic "When X Fails" warning text for each dimension. Use the sample scores from the assignment but expand with sub-dimension scores.

Add helper functions:
- getScoreColor(score: number) - returns the appropriate color class
- getScoreLabel(score: number) - returns "Strong", "Developing", or "Needs Attention"  
- getPerceptionGap(userScore, partnerScore) - returns the absolute difference
- getBiggestGap(dimensions) - returns the dimension with largest perception gap
```

#### **Prompt 3: Overall Score Component**
```
Create the OverallScore component in src/components/dashboard/OverallScore.tsx

Requirements:
- Large circular progress ring (SVG-based, not a library)
- Score number in the center that counts up from 0 on mount using framer-motion
- Ring should animate from 0 to the score percentage
- Color of ring based on score (good/medium/low)
- Below the ring: interpretation text ("Strong Foundation", "Room to Grow", etc.)
- Assessment date displayed subtly
- Responsive: smaller on mobile

Use framer-motion for the number counting animation and ring fill animation.
The component should accept: score, maxScore, assessmentDate, label
```

#### **Prompt 4: Radar Chart Component**
```
Create the DimensionRadar component in src/components/dashboard/DimensionRadar.tsx

Requirements:
- Use Recharts RadarChart
- Show all 7 dimensions as axes
- TWO data series: User (filled, semi-transparent) and Partner (stroke only, dashed)
- Custom colors: User in indigo, Partner in coral
- Interactive tooltips showing both scores on hover
- Legend at bottom showing "You" vs "Partner"
- Animate on mount
- Responsive sizing

The chart should clearly highlight perception gaps where the two polygons diverge.
```

#### **Prompt 5: Dimension Card Component**
```
Create the DimensionCard component in src/components/dashboard/DimensionCard.tsx

Requirements:
- Card with icon, dimension name, and description
- Two horizontal progress bars: one for user, one for partner
- Visual perception gap indicator between the bars
- Score numbers displayed with appropriate colors
- Subtle background tint based on average score health
- Hover state: slight lift with shadow
- Framer Motion fade-in animation (use whileInView)
- Expandable: click to show sub-dimensions (optional detail)

Props: dimension (full Dimension object), index (for stagger animation)
```

#### **Prompt 6: Perception Gap Bar Component**
```
Create the PerceptionGapBar component in src/components/dashboard/PerceptionGapBar.tsx

A reusable component that visualizes the gap between two scores:
- Shows a horizontal bar from 0-100
- Two markers: one for user score, one for partner score  
- A highlighted "gap zone" between them
- Gap severity indicated by color (small gap = green, large gap = amber/red)
- Labels showing "You: X" and "Partner: Y"
- Tooltip showing the gap value on hover

This should be visually clear at a glance which score is higher and by how much.
```

#### **Prompt 7: Insight Card Component**
```
Create the InsightCard component in src/components/dashboard/InsightCard.tsx

An AI-powered insight card that:
- Identifies the dimension with the biggest opportunity (lowest score OR biggest gap)
- Shows a warm, supportive headline: "Your Biggest Opportunity"
- Displays the dimension name and why it matters
- Shows the "When X Fails" warning text reframed positively
- Includes a subtle sparkle/star icon to indicate AI-generated
- Has a distinct visual treatment (gradient border or accent background)
- Framer Motion entrance animation

Use the getBiggestGap helper to determine which dimension to highlight.
```

#### **Prompt 8: Dashboard Page Assembly**
```
Assemble all components in src/app/page.tsx

Layout:
1. Header with title "Your Relationship Health" and subtle description
2. Overall Score component (hero, centered on mobile, left-aligned on desktop)
3. Radar chart (full width on mobile, side-by-side with score on desktop)
4. Section header: "Dimension Breakdown"
5. Grid of 7 DimensionCards (1 column mobile, 2 columns tablet, responsive)
6. Insight Card at the bottom (full width)

Add:
- Staggered fade-in animations for cards
- Proper spacing and visual hierarchy
- A subtle gradient or pattern in the header area
- Footer with "Assessment powered by the Whole Relationship Model"

Make sure the page feels premium, calm, and supportive - not clinical or scary.
```

#### **Prompt 9: Polish & Micro-interactions**
```
Add final polish to all components:

1. Add smooth hover states to all interactive elements
2. Ensure all animations have appropriate easing (easeOut for entrances)
3. Add a subtle loading skeleton state for the page
4. Verify all colors match the design system
5. Check responsive breakpoints (sm, md, lg)
6. Add focus states for accessibility
7. Ensure proper contrast ratios for text

Test the full flow and fix any visual inconsistencies.
```

#### **Prompt 10: README & Deploy**
```
Create a comprehensive README.md with:

1. Project title and one-line description
2. Screenshot placeholder (I'll add after)
3. Live demo link placeholder
4. Tech stack badges
5. Setup instructions (npm install && npm run dev)
6. Design decisions section (2-3 paragraphs explaining):
   - Why I chose this visual direction
   - How I approached the hierarchy visualization
   - Key interaction decisions
7. "What I'd improve with more time" section
8. AI tools used section (Claude Code, Pencil.dev, etc.)

Then prepare for Vercel deployment - ensure build passes with no errors.
```

---

## **Part 2: Pencil.dev Instructions**

### **Setup**
1. Download Pencil from [pencil.dev](https://pencil.dev)
2. Ensure Claude Code CLI is installed and authenticated
3. Open Pencil and connect it to your project directory

### **Pencil Workflow for This Project**

#### **Canvas 1: Overall Score Exploration**

**Prompt to Pencil:**
```
Design a hero "Overall Score" component for a relationship health dashboard.

Requirements:
- Large circular progress ring showing 72/100
- Score number prominently displayed in center
- Warm, premium aesthetic (think wellness app)
- Colors: sage green (#5B8A72) for the progress ring
- Cream/warm white background (#FFFBF7)
- Below ring: "Strong Foundation" label
- Small text: "Assessed January 15, 2026"
- Subtle shadow on the card container

Style: Modern, calming, supportive. Not clinical or harsh.
```

**Notes to add on canvas:**
- "Ring should animate from 0 to 72% on page load"
- "Number should count up from 0"
- "Consider adding a subtle gradient inside the ring"

---

#### **Canvas 2: Dimension Card Design**

**Prompt to Pencil:**
```
Design a "Dimension Card" component showing relationship assessment scores.

Content:
- Icon: 💬 (Connection dimension)
- Title: "Connection"  
- Subtitle: "How Partners Relate"
- Two horizontal progress bars:
  - "You: 82" (indigo color)
  - "Partner: 68" (coral color)
- Visual indicator showing 14-point gap between scores

Style:
- White card on cream background
- Rounded corners (12px)
- Subtle shadow
- Warm, premium feel
- Clear visual hierarchy
- Show the perception gap prominently

This card will be repeated 7 times for each dimension.
```

**Notes to add:**
- "Gap of 10+ points should be highlighted"
- "Hover: lift card slightly with deeper shadow"
- "Consider expandable state showing sub-dimensions"

---

#### **Canvas 3: Radar Chart Concept**

**Prompt to Pencil:**
```
Design a radar/spider chart comparing two partners' relationship scores.

Data points (7 axes):
- Foundation, Connection, Operations, Boundary, Alignment, Repair, Meta

Visual requirements:
- Two overlapping polygons
- User: filled indigo with 30% opacity
- Partner: coral outline only, dashed
- Show where polygons diverge (perception gaps)
- Clean axis labels around the outside
- Legend: "You" vs "Partner"
- Contained in a white card

Background: cream (#FFFBF7)
The divergence between shapes should be immediately visible.
```

---

#### **Canvas 4: Insight Card**

**Prompt to Pencil:**
```
Design an "AI Insight" card for the relationship dashboard.

Content:
- Small sparkle icon ✨
- Headline: "Your Biggest Opportunity"
- Subhead: "Repair - Recovery Systems"
- Body text: "This dimension shows the largest perception gap between you and your partner. When repair systems struggle, past hurts can resurface and resentment can build. The good news: this is very addressable with focused work."
- Optional: subtle CTA "Learn more →"

Style:
- Distinct from other cards (maybe gradient border or tinted background)
- Warm amber/cream tint
- Feels supportive and actionable, not alarming
- Premium, modern typography
```

---

#### **Canvas 5: Full Dashboard Layout**

**Prompt to Pencil:**
```
Design the full page layout for a Relationship Health Dashboard.

Sections (top to bottom):
1. Header: "Your Relationship Health" title + subtle tagline
2. Hero row: Overall Score (left) + Radar Chart (right) on desktop
3. Section divider: "Dimension Breakdown"
4. 2-column grid of 7 Dimension Cards
5. Full-width Insight Card at bottom
6. Footer: "Powered by the Whole Relationship Model"

Requirements:
- Desktop: max-width 1200px, centered
- Cream background (#FFFBF7)
- Generous whitespace
- Clear visual hierarchy
- Premium wellness app aesthetic

Show me the full page composition.
```

---

### **Pencil → Claude Code Handoff**

Once you've finalized designs in Pencil, use these prompts to implement:

**In Claude Code:**
```
Look at the Pencil design file in the project. Implement the Overall Score component matching the design exactly:
- Same colors, spacing, and proportions
- Same typography hierarchy
- Add the animations specified in the notes
- Use Tailwind classes that match the visual spacing