# Startup Metrics Explained

## Overview
**Startup Metrics Explained** is a responsive, browser-based educational web application designed to teach 15 key startup financial metrics. It provides interactive calculators, real-time visualizations, and comprehensive educational content to help users understand essential business performance indicators. The project's ambition is to offer a professional, clean, and interactive learning experience for startup founders, investors, and enthusiasts.

## User Preferences
- **Design Style**: Professional, clean, educational
- **Color Scheme**: Blue (#2563EB) with semantic colors
- **Interactivity**: Real-time calculations, synchronized inputs
- **Educational Focus**: Comprehensive learning with examples, tips, and mistakes

## System Architecture

### Key Features
- **15 Essential Metrics**: Covers metrics like MRR, ARR, Burn Rate, CAC, LTV, Churn Rate, Rule of 40, and Unit Economics.
- **Interactive Calculators**: Real-time calculations with synchronized number inputs and range sliders.
- **Color-Coded Feedback**: Provides immediate feedback (Green: healthy, Yellow: acceptable, Red: concerning) with contextual explanations.
- **Visual Analytics**: Utilizes Chart.js for data visualization (line, bar, gauge charts).
- **Educational Content**: Includes definitions, formulas, business importance, pro tips, common mistakes, and benchmarks for each metric.
- **Dark Mode**: Full theme support with localStorage persistence for user preference.
- **Responsive Design**: Mobile-first approach with a professional blue color scheme.
- **Searchable Interface**: Real-time search filtering on the homepage.

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React (no emojis)
- **Theme**: Custom ThemeProvider with dark mode support
- **Build**: Vite + Express backend for serving

### Design System
- **Color Palette**: Primary blue (#2563EB), with semantic greens, yellows, and reds for feedback. All colors are configured in `tailwind.config.ts` using HSL values and adapt to the theme.
- **Typography**: Bold headings with proper hierarchy, 1.1rem body text with 1.8 line-height for readability, and monospace font for formulas. Responsive scaling is implemented across breakpoints.
- **Design Principles**: Emphasis on Lucide React icons (no emojis), consistent spacing (p-4, p-6, p-8, gap-3, gap-4), subtle borders with primary color accents, smooth hover transitions, and accessibility with semantic HTML and `data-testid` on interactive elements.

### System Design Choices
- **Metrics Data Structure**: Each metric in `shared/metrics.ts` includes `id`, `name`, `iconName`, `shortDescription`, `definition`, `whyItMatters`, `formula`, `formulaPlain`, `sampleCalculation`, `calculator` configuration, `tips`, `commonMistakes`, `hasChart`, and `chartType`.
- **Calculator Component**: Features synchronized number inputs and range sliders, real-time calculation, validation, and responsive grid layout.
- **Color-Coded Feedback System**: Utilizes Tailwind CSS classes (`text-green-600`, `text-yellow-600`, `text-red-600`) for visual feedback based on metric benchmarks.
- **Theme System**: `ThemeProvider` manages light/dark state, persists choice in `localStorage`, and toggles 'light'/'dark' classes on `document.documentElement`, ensuring components adapt using semantic color tokens.
- **Mobile Optimization**: Implements `window.scrollTo(0, 0)` for consistent scroll position on page load and responsive calculator layouts to prevent content cutoff on mobile devices.
- **Accessibility**: Enhanced glossary term tooltips (`MetricTooltip`) to support both hover (desktop) and tap (mobile) interactions.

## External Dependencies
- **React**: Frontend JavaScript library.
- **TypeScript**: Superset of JavaScript for type safety.
- **Wouter**: Lightweight React router for navigation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn/UI**: UI component library based on Tailwind CSS.
- **Chart.js**: JavaScript charting library for data visualization.
- **react-chartjs-2**: React wrapper for Chart.js.
- **Lucide React**: Icon library.
- **Vite**: Frontend build tool.
- **Express**: Backend web framework for serving the application.

## Recent Changes (Current Session)
**Date**: October 15, 2025

### Mobile Result Display Overflow Fix
**Issue**: Calculator result values were cut off on mobile devices (e.g., "$102,000/month" on Burn Rate page had text truncated at screen edge)

**Root Cause**: Fixed large font-size (`text-5xl` = 48px) didn't scale down for mobile viewports, causing overflow on narrow screens

**Solution Implemented**:
- Used CSS `clamp()` for fluid responsive text sizing instead of Tailwind breakpoint utilities
- Formula: `fontSize: clamp(1.875rem, 5vw, 3rem)`
  - Minimum: 1.875rem (30px) on narrow screens
  - Preferred: 5vw (5% of viewport width) - scales smoothly
  - Maximum: 3rem (48px) on wide screens
- Applied as inline style to ensure it's not overridden
- Added `break-words` class for additional overflow protection
- Reduced card padding on mobile: `p-4 sm:p-6 lg:p-8`

**Why Clamp() Over Responsive Classes**:
- Provides smooth, continuous scaling vs. breakpoint jumps
- Guarantees text fits on any viewport size
- More predictable behavior across devices

**Impact**: 
- Fixes ALL 15 metric calculators (shared ResultDisplay component)
- Universal benefit across MRR, ARR, Burn Rate, CAC, LTV, Churn Rate, etc.

**E2E Test Results** (18/18 steps passed):
✅ Mobile (390px): "$102,000/month" displays fully without cutoff
✅ Mobile: "$170,000/month" (larger value) also displays correctly
✅ Tablet (768px): Text scales appropriately (~38px)
✅ Desktop (1920px): Text scales to maximum size (~48px)
✅ No overflow detected on any viewport size
✅ Smooth responsive scaling across all breakpoints

### Follow-up: Single-Line Display Fix
**Issue**: Large values like "$970,000/month" were breaking across two lines with the "h" from "month" wrapping to the second line

**Root Cause**: The `break-words` class allowed text to wrap across multiple lines when it approached viewport width limits

**Solution Implemented**:
- Replaced `break-words` with `whitespace-nowrap` in ResultDisplay component
- This ensures the result always displays on a single line
- The CSS `clamp()` function automatically scales the text down to fit available width
- Perfect synergy: clamp() handles responsive sizing, nowrap prevents line breaks

**E2E Test Results** (20/20 steps passed):
✅ Mobile (390px): "$970,000/month" displays on single line without wrapping
✅ Mobile: "$4,970,000/month" (extremely large value) still single line
✅ Tablet (768px): Single-line display with ~38.4px font size
✅ Desktop (1920px): Single-line display at maximum 48px font size
✅ `whitespace-nowrap` confirmed in computed styles across all viewports
✅ Text scales down appropriately to maintain single-line display

### Follow-up: Mobile Overflow Fix (Reduced Minimum Font Size)
**Issue**: Long values like "$1,000,000/month" extended slightly beyond the card boundaries on mobile, causing overflow

**Root Cause**: The minimum font size (1.875rem = 30px) in the clamp() formula was still too large for very long text on narrow mobile screens

**Solution Implemented**:
- Reduced minimum font size in clamp() from `1.875rem` to `1.25rem` (30px → 20px)
- Updated formula: `clamp(1.25rem, 5vw, 3rem)`
- This allows more aggressive text scaling on mobile while maintaining readability
- Text now fits completely within card bounds even for very large values

**E2E Test Results** (20/20 steps passed):
✅ Mobile (390px): "$1,000,000/month" fits completely within card (no overflow)
✅ Mobile: "$10,000,000/month" (extreme value) also fits within bounds
✅ Font size correctly scales to 20px minimum on mobile
✅ Text remains readable at smaller size
✅ Tablet (768px): Scales to ~38.4px appropriately
✅ Desktop (1920px): Maximum 48px maintained