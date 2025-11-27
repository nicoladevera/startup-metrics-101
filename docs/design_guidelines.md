# Startup Metrics Explained - Design Guidelines

## Design Approach

**Selected Approach:** Hybrid - Modern Educational Platform with Dashboard Aesthetics

Drawing inspiration from educational platforms like Khan Academy and Duolingo for approachability, combined with dashboard/analytics tools like Stripe's Dashboard and Linear for professional data presentation. This creates a trustworthy, information-dense interface that remains welcoming to startup newcomers.

---

## Core Design Elements

### A. Color Palette

**Light Mode (Primary):**
- Primary Brand: 217 91% 60% (Deep Blue - #2563EB)
- Success/Healthy: 142 76% 36% (Green - #10B981)
- Warning/Caution: 38 92% 50% (Amber - #F59E0B)
- Error/Concern: 0 72% 51% (Red - #EF4444)
- Background: 220 14% 98% (Off-white - #F9FAFB)
- Surface: 0 0% 100% (Pure white)
- Text Primary: 220 9% 9% (#111827)
- Text Secondary: 215 14% 34% (#4B5563)
- Borders: 220 13% 91% (#E5E7EB)

**Accent Usage:**
- Use primary blue for interactive elements, CTAs, and metric headers
- Apply green/yellow/red exclusively for calculator feedback zones
- Maintain high contrast for accessibility (minimum 4.5:1 ratio)

### B. Typography

**Font Stack:**
- Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif
- Monospace (for formulas/code): 'SF Mono', 'Monaco', 'Courier New', monospace

**Type Scale:**
- Hero/Page Titles: 2.5rem (40px), weight 700
- Section Headings: 1.8rem (28px), weight 700
- Card Titles: 1.4rem (22px), weight 700
- Body Text: 1.1rem (17.6px), weight 400, line-height 1.8
- Small/Meta Text: 0.95rem (15px), weight 400

### C. Spacing System

**Tailwind Units:** Use 4, 8, 12, 20, 30, 40, 50 for consistent rhythm
- Component padding: p-6 (24px) to p-10 (40px)
- Section spacing: mb-12 (48px) to mb-20 (80px)
- Card gaps: gap-5 (20px)
- Input groups: mb-6 (24px)

### D. Component Library

**Homepage Metrics Grid:**
- 3-column grid on desktop (grid-cols-3), 2-column on tablet (md:grid-cols-2), single column on mobile
- Card design: white background, rounded-xl (12px), shadow-md, border-2 transparent
- Hover state: transform -translateY-1, shadow-lg, border-primary
- Card content: Large emoji/icon (text-4xl), metric name in primary blue (text-xl font-bold), one-line description (text-gray-600)

**Search Functionality:**
- Prominent search bar below hero (max-w-2xl centered)
- Input: rounded-lg, border-2, px-5 py-4, focus:border-primary
- Real-time filtering of metric cards with smooth fade transitions

**Individual Metric Pages:**
- Sticky back button (top-8, z-50): primary blue button with left arrow icon
- Page title: text-4xl font-bold with 3px bottom border in primary blue
- Section titles: text-3xl with icon prefix (emoji or Font Awesome icon)

**Interactive Calculator Section:**
- Distinct background: bg-gray-50, rounded-xl, border-2 border-gray-200, p-8
- Input groups: Label (font-semibold text-gray-700) + synchronized number input and slider
- Number input: w-36, px-4 py-3, rounded-md, border-2, focus:border-primary
- Range slider: Custom styled with primary blue thumb (20px circle), gray-300 track
- Result display: Separate card with white bg, rounded-xl, shadow-lg, p-8, centered text
- Result value: text-5xl font-bold with color-coded class (green/yellow/red)
- Feedback message: Matching colored background (bg-green-100, bg-yellow-100, bg-red-100) with dark text, rounded-lg, p-4

**Formula Display:**
- Light gray background (bg-gray-100), rounded-lg, border-l-4 border-primary, p-6
- Formula text: Monospace font, text-xl, text-primary-dark, font-semibold

**Tooltips:**
- Dotted underline on trigger terms (border-b-2 border-dotted border-primary)
- Tooltip popup: Dark background (#1F2937), white text, rounded-md, shadow-xl, max-w-xs
- Position: Above term with arrow pointer
- Transition: Smooth fade-in (transition-opacity 300ms)

**Tips & Mistakes Lists:**
- Tips: Light gray bg, rounded-lg, border-l-4 border-green-500, p-4, lightbulb emoji prefix
- Mistakes: Light yellow bg, rounded-lg, border-l-4 border-yellow-500, p-4, warning emoji prefix
- Each list item: mb-4 spacing

**Chart Containers:**
- White background, rounded-lg, shadow-sm, p-5
- Chart.js styling: Primary blue for main data, gray for grid lines
- Responsive canvas with aspect ratio 2:1 for desktop, 1:1 for mobile

---

## Layout Specifications

### Homepage Layout:
- Hero section: Gradient background (from primary 600 to primary 700), white text, py-12, rounded-xl
- Hero title: text-5xl font-bold, centered
- Hero subtitle: text-xl, max-w-3xl, centered, opacity-90
- Search bar: mt-8, max-w-2xl mx-auto
- Metrics grid: mt-12, grid with gap-5

### Metric Detail Page Layout:
- Container: max-w-4xl mx-auto, px-4
- Back button: mt-8 mb-8
- Content sections: Stacked vertically with mb-12 spacing
- Two-column layout for calculator inputs on desktop (grid-cols-2 gap-8), stack on mobile
- Full-width result display and charts

---

## Interaction & Animation Guidelines

**Transitions:**
- Card hover: 300ms ease for transform and shadow
- Input focus: 300ms for border-color
- Page navigation: Smooth scroll behavior
- Tooltip: 200ms fade-in/out

**Micro-interactions:**
- Button press: Subtle scale (0.98) on active state
- Slider thumb: Scale to 1.1 on hover
- Calculator result: Gentle pulse animation on value update (optional, subtle)

**Avoid:**
- Heavy animations that distract from learning
- Parallax or scroll-triggered effects
- Loading spinners (all client-side, instant)

---

## Images

**Homepage Hero Background:**
- Abstract gradient mesh or subtle geometric pattern overlay on gradient
- No specific image needed - use CSS gradient with optional SVG pattern

**Metric Page Icons:**
- Use Font Awesome icons or emoji for each metric category
- Consistent size (text-4xl) and placement in section headers

**No photography required** - This is a data/educational tool where clarity trumps visual decoration

---

## Accessibility & Responsiveness

**Breakpoints:**
- Mobile: < 768px (single column, stacked layout)
- Tablet: 768px - 1024px (2-column grid)
- Desktop: > 1024px (3-column grid, side-by-side calculator inputs)

**Keyboard Navigation:**
- Tab order follows visual hierarchy
- Focus rings: 2px primary blue outline with 2px offset
- Slider controls keyboard accessible (arrow keys)

**Touch Targets:**
- Minimum 44px × 44px for all interactive elements on mobile
- Slider thumb: 32px on touch devices

---

## Visual Hierarchy Principles

1. **Calculator Results Dominate:** Largest, boldest element on metric pages
2. **Color Communicates Status:** Green/yellow/red instantly convey metric health
3. **Progressive Disclosure:** Essential info first, advanced tips/mistakes sections below
4. **Scannable Content:** Clear section headers, bullet points, short paragraphs
5. **Data Clarity:** Charts and visualizations simplified, no chart junk