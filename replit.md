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