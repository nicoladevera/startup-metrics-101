# Startup Metrics Explained

## Project Overview
**Startup Metrics Explained** is a responsive, browser-based educational web application that teaches 15 key startup financial metrics through interactive calculators, real-time visualizations, and comprehensive educational content.

**Status**: ✅ Production Ready (Architect Approved)

## Key Features
- **15 Essential Metrics**: MRR, ARR, Burn Rate, Runway, CAC, LTV, LTV:CAC Ratio, Churn Rate, NRR, Gross Margin, Contribution Margin, Net Profit Margin, Growth Rate, Rule of 40, Unit Economics
- **Interactive Calculators**: Real-time calculations with synchronized number inputs and range sliders
- **Color-Coded Feedback**: Green (healthy), Yellow (acceptable), Red (concerning) with contextual explanations
- **Visual Analytics**: Chart.js visualizations (line, bar, gauge charts)
- **Educational Content**: Definitions, formulas, why it matters, pro tips, common mistakes, benchmarks
- **Dark Mode**: Full theme support with localStorage persistence
- **Responsive Design**: Mobile-first approach with professional blue color scheme (#2563EB)
- **Searchable Interface**: Real-time search filtering on homepage

## Technology Stack
- **Frontend**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React (100% icon-based, NO emojis)
- **Theme**: Custom ThemeProvider with dark mode support
- **Build**: Vite + Express backend for serving

## Architecture

### File Structure
```
client/src/
├── components/
│   ├── ui/              # Shadcn/UI base components
│   ├── Calculator.tsx   # Reusable calculator with synchronized inputs
│   ├── ResultDisplay.tsx # Color-coded result feedback
│   ├── MetricChart.tsx  # Chart.js wrapper component
│   ├── MetricTooltip.tsx # Educational tooltips
│   ├── ThemeProvider.tsx # Dark mode provider
│   └── ThemeToggle.tsx  # Theme toggle button
├── pages/
│   ├── HomePage.tsx     # Metric grid with search
│   └── MetricDetail.tsx # Individual metric pages
├── lib/
│   ├── icons.tsx        # Icon utility (getIcon)
│   └── queryClient.ts   # TanStack Query setup
└── App.tsx              # Main app with routing

shared/
└── metrics.ts           # All 15 metrics data structure

server/
├── index.ts             # Express server
└── routes.ts            # API routes (currently minimal)
```

### Key Components

#### Metrics Data (`shared/metrics.ts`)
Each metric includes:
- `id`: Unique identifier
- `name`: Display name
- `iconName`: Lucide icon name (e.g., 'TrendingUp', 'DollarSign')
- `shortDescription`: Brief summary
- `definition`: Detailed explanation
- `whyItMatters`: Business importance
- `formula`: Mathematical formula
- `formulaPlain`: Plain English formula
- `sampleCalculation`: Example with steps
- `calculator`: Interactive calculator config with inputs, calculateFn, formatResult, getBenchmark
- `tips`: Pro tips array
- `commonMistakes`: Common mistakes array
- `hasChart`: Boolean for chart display
- `chartType`: 'line' | 'bar' | 'gauge'

#### Calculator Component
- Synchronized number inputs and range sliders
- Real-time calculation on value change
- Validation and formatting
- Responsive grid layout

#### Color-Coded Feedback System
- **Green** (text-green-600): Healthy/excellent metrics
- **Yellow** (text-yellow-600): Acceptable/moderate metrics
- **Red** (text-red-600): Concerning/poor metrics
- Each benchmark includes status and explanation

#### Theme System
- ThemeProvider manages light/dark state
- localStorage persistence ('theme' key)
- Toggles 'light'/'dark' class on document.documentElement
- All components use semantic color tokens that adapt to theme

## Design System

### Color Palette
- **Primary**: #2563EB (Professional Blue)
- **Success**: Green tones for positive feedback
- **Warning**: Yellow/orange for moderate feedback
- **Destructive**: Red tones for concerning feedback
- All colors configured in `tailwind.config.ts` with HSL values

### Typography
- Headings: Bold, large sizes with proper hierarchy
- Body: 1.1rem with 1.8 line-height for readability
- Formula: Monospace font for code/formulas
- Responsive scaling across breakpoints

### Design Principles
- **NO Emojis**: 100% Lucide React icons only
- **Spacing**: Consistent padding and gaps (p-4, p-6, p-8, gap-3, gap-4)
- **Borders**: Subtle borders with primary color accents
- **Animations**: Smooth hover transitions on cards
- **Accessibility**: Proper semantic HTML, data-testid on all interactive elements

## Testing

### E2E Test Coverage
✅ Homepage search functionality
✅ Navigation between pages
✅ Calculator inputs and sliders synchronization
✅ Color-coded feedback display
✅ Theme toggle (light/dark)
✅ Chart rendering
✅ Responsive layout
✅ All 15 metrics verified

### Test IDs
- `hero-title`: Main homepage title
- `input-search`: Search input field
- `button-theme-toggle`: Theme toggle button
- `link-metric-{id}`: Metric card links (e.g., link-metric-mrr)
- `metric-card-{id}`: Metric cards
- `button-back`: Back to homepage button
- `metric-title`: Metric detail page title
- `section-definition`, `section-calculator`, etc.: Page sections
- `tip-{index}`, `mistake-{index}`: Individual tips/mistakes

## User Preferences
- **Design Style**: Professional, clean, educational
- **Color Scheme**: Blue (#2563EB) with semantic colors
- **Interactivity**: Real-time calculations, synchronized inputs
- **Educational Focus**: Comprehensive learning with examples, tips, and mistakes

## Recent Changes (Latest Session)
**Date**: October 14, 2025

### Critical Fixes Applied
1. **Icon System Overhaul**:
   - Replaced ALL emoji icons with Lucide React icons
   - Updated metrics.ts: changed `icon` field to `iconName` with proper Lucide names
   - Created getIcon() utility in `lib/icons.tsx`
   - Updated HomePage and MetricDetail to render Lucide icons
   - Replaced 💡 with `<Lightbulb>` in tips section
   - Replaced ⚠️ with `<AlertTriangle>` in mistakes section

2. **Dark Mode Implementation**:
   - Created ThemeProvider component with localStorage persistence
   - Added ThemeToggle component
   - Integrated theme system in App.tsx
   - All colors now adapt to light/dark mode

3. **Test Coverage Enhancement**:
   - Added data-testid to all Link components
   - Verified all interactive elements are testable
   - Ran comprehensive e2e test suite (30/30 steps passed)
   - Targeted icon verification tests (all passed)

### Architect Reviews
- **Review 1**: Identified emoji icons, missing dark mode, missing data-testids
- **Review 2**: Confirmed all fixes applied correctly
- **Final Review**: Approved for production deployment

## Running the Application
The workflow "Start application" runs `npm run dev` which:
1. Starts Express server on port 5000 (backend)
2. Starts Vite dev server (frontend)
3. Hot module reloading enabled
4. Serves on http://localhost:5000

## Deployment
Application is ready for publishing to Replit's deployment platform. All features tested and approved.

## Known Non-Issues
- Fast Refresh warning on MetricTooltip.tsx: Non-critical, causes full reload instead of hot reload due to `addTooltips` utility export (not a component)
- Browserslist data notice: Cosmetic warning, doesn't affect functionality

## Future Enhancements (Optional)
- Add more metrics (e.g., Quick Ratio, Magic Number, Payback Period)
- Add comparison tools to compare multiple metrics
- Add export/save calculator results
- Add metric favorites/bookmarks
- Add metric relationships visualization
