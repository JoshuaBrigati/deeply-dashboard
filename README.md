# Relationship Health Dashboard

A premium visualization dashboard for relationship assessment results, built as a take-home project demonstrating design engineering skills. The dashboard presents data from the "Whole Relationship Model" - a 7-dimension framework for understanding relationship health.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple)

## Features

- **Overall Score Ring** - Animated radial progress with score interpretation
- **Radar Chart** - Visual overlay comparing user and partner perception across all 7 dimensions
- **Dimension Breakdown** - Expandable cards with sub-dimension details and color-coded perception gap indicators
- **Real AI Insights** - Claude API generates personalized relationship coaching based on the full Whole Relationship Model framework
- **Gap Highlighting** - Cards with significant perception gaps have prominent colored borders to draw attention
- **Loading Skeletons** - Polished shimmer loading states
- **Full Accessibility** - Keyboard navigation, ARIA labels, reduced motion support

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (New York style)
- **Charts:** Recharts
- **Animations:** Framer Motion
- **AI:** Claude API (Anthropic SDK)
- **Font:** Geist Sans & Mono

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Anthropic API key to .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

**Note:** The AI Insight feature requires an Anthropic API key. Get one at [console.anthropic.com](https://console.anthropic.com/). Without the key, the insight dialog will show an error state.

## Design Decisions

### Visual Direction
The dashboard embraces a **warm wellness aesthetic** inspired by apps like Calm and Headspace. Rather than clinical charts and stark colors, I chose a cream background (#FFFBF7), sage greens for positive scores, and soft coral/terracotta for areas needing attention. This creates a supportive atmosphere appropriate for sensitive relationship data. The color palette avoids alarming reds, instead using warm amber and terracotta tones that feel constructive rather than critical.

### Hierarchy & Information Architecture
The 7-dimension "Whole Relationship Model" has inherent hierarchy where Foundation affects everything above it. I visualized this through multiple lenses: the radar chart shows the overall shape of the relationship, color-coded borders highlight cards with significant perception gaps, and expandable dimension cards allow progressive disclosure of sub-dimension details. The card with the biggest gap features a "See AI Insight" button that opens a dialog with personalized coaching powered by Claude.

### Interaction Philosophy
Every animation serves a purpose: score numbers count up to create anticipation and draw attention to the final value; cards fade in with staggered timing to guide the eye down the page; hover states provide feedback that elements are interactive. I implemented full keyboard navigation with visible focus rings, making the dashboard accessible to all users. The expand/collapse pattern on dimension cards uses spring physics for a natural, premium feel rather than linear easing.

## What I'd Improve With More Time

- **Dark Mode** - Add theme toggle with smooth transition
- **Print Stylesheet** - Optimize for sharing physical copies
- **Storybook** - Document components for design system usage
- **E2E Tests** - Add Playwright tests for critical flows
- **Animations** - Add exit animations and page transitions
- **Tooltips** - Enhance radar chart with richer hover details

## AI Tools Used

- **Claude Code** - Primary development assistant for component architecture, TypeScript types, and implementation
- **Claude API** - Powers the real-time AI insights with full Whole Relationship Model context
- **Lovable** - Rapid prototyping of component variations

## Project Structure

```
├── app/
│   ├── api/
│   │   └── insight/
│   │       └── route.ts           # Claude API endpoint for AI insights
│   ├── layout.tsx                 # Root layout with fonts
│   ├── loading.tsx                # Page loading skeleton
│   ├── page.tsx                   # Dashboard page
│   └── globals.css                # Tailwind config & custom properties
├── components/
│   ├── dashboard/
│   │   ├── DashboardSkeleton.tsx  # Full-page loading skeleton
│   │   ├── DimensionCard.tsx      # Expandable dimension details
│   │   ├── DimensionRadar.tsx     # Recharts radar comparison
│   │   ├── InsightDialog.tsx      # AI insight dialog popup
│   │   └── OverallScore.tsx       # Hero score ring
│   └── ui/
│       ├── animated-number.tsx    # Spring-animated counter
│       ├── card.tsx               # Reusable motion card
│       ├── dialog.tsx             # shadcn dialog component
│       └── skeleton.tsx           # Base skeleton primitives
├── lib/
│   ├── data.ts                    # Mock data & helper functions
│   └── utils.ts                   # Tailwind merge utility
└── types/
    └── assessment.ts              # TypeScript interfaces
```
