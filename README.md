# Startup Metrics 101

An interactive educational platform that teaches startup professionals about essential business metrics through clear explanations, interactive calculators, and comprehensive learning resources.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)

## 🎯 Overview

Startup Metrics 101 makes complex startup metrics understandable and actionable for founders, investors, and startup professionals. Learn about 15 essential business metrics with hands-on calculation tools, real-time feedback, and comprehensive educational content.

## ✨ Features

### 📊 15 Essential Startup Metrics

- **MRR** (Monthly Recurring Revenue) - Predictable monthly subscription revenue
- **ARR** (Annual Recurring Revenue) - Annualized version of MRR
- **Burn Rate** - Monthly cash spending rate
- **Runway** - Months of cash remaining
- **CAC** (Customer Acquisition Cost) - Cost to acquire one customer
- **LTV** (Lifetime Value) - Total revenue per customer over lifetime
- **LTV:CAC Ratio** - Customer value vs. acquisition cost relationship
- **Churn Rate** - Percentage of customers lost
- **NRR** (Net Revenue Retention) - Revenue growth from existing customers
- **Gross Margin** - Revenue minus cost of goods sold
- **Contribution Margin** - Revenue after variable costs
- **Net Profit Margin** - Final profit as percentage of revenue
- **Growth Rate** - Month-over-month or period-over-period growth
- **Rule of 40** - Growth rate + profit margin indicator
- **Unit Economics** - LTV to CAC comparison

### 🧮 Interactive Learning

For each metric, you get:

- **Clear Definition** - Easy-to-understand explanation
- **Why It Matters** - Business impact and importance
- **Visual Formula** - Mathematical formula display
- **Sample Calculation** - Worked example with numbers
- **Interactive Calculator** - Real-time calculation with inputs and sliders
- **Benchmark Feedback** - Color-coded results (green/yellow/red) with actionable guidance
  - Green: Excellent performance, meeting or exceeding industry standards
  - Yellow: Acceptable but needs improvement
  - Red: Below target or cannot calculate (missing required data)
- **Best Practices** - Tips and strategies for improvement
- **Common Mistakes** - Pitfalls to avoid
- **Data Visualization** - Charts and graphs

### 🎨 User Experience

- **Premium Glass Aesthetic** - Sophisticated glassmorphism design with subtle transparency and depth
- **Blue Gradient Accents** - Thoughtfully placed blue gradients and glows throughout both themes
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop with adaptive layouts
- **Dual Theme System** - Beautiful dark mode with deep navy blues and vibrant light mode with blue undertones
- **Plus Jakarta Sans Typography** - Modern, professional font for enhanced readability
- **Search & Filter** - Quickly find the metrics you need with an elegant search interface
- **Smooth Animations** - Subtle fade-in and hover effects for polished interactions
- **Glass Cards** - Elevated card design with backdrop blur and refined borders
- **Accessible** - High contrast, screen reader support, and keyboard navigation

## 📸 Screenshots

### Homepage - Metric Dashboard
Browse all 15 essential startup metrics with search and filtering capabilities in a premium dark mode interface featuring glass cards, blue gradients, and sophisticated visual design.

![Homepage](docs/screenshots/homepage.png)

The homepage showcases:
- **Hero Section** - Gradient blue background with centered title "Startup Metrics 101" and descriptive subtitle
- **Key Features** - Three feature highlights: Free Platform (sparkles icon), Interactive Calculators (calculator icon), and Clear Explanations (book icon)
- **Search Bar** - Glass-effect search bar with magnifying glass icon and "Search metrics..." placeholder
- **Metric Cards Grid** - Three-column grid displaying 9+ metric cards, each with:
  - Icon in the top-left corner (line graph, dollar sign, flame, airplane, target, diamond, scales, trend line, bar chart)
  - Bold metric name with abbreviation (e.g., "Monthly Recurring Revenue (MRR)")
  - One-line description below the name
- **Theme Toggle** - Sun/moon icon in the top-right corner for switching between light and dark modes
- **Subtle Grid Pattern** - Blue-tinted grid overlay visible in the dark background

### Interactive Calculator - Net Revenue Retention (NRR)
Real-time metric calculations with interactive sliders, instant feedback, and color-coded benchmarks. The calculator features elevated glass styling with refined inputs and prominent result displays.

![Interactive Calculator](docs/screenshots/interactive-calculator.png)

The calculator interface includes:
- **Sample Calculation Section** - Example walkthrough showing:
  - Starting MRR: $100,000
  - Expansion revenue: +$30,000
  - Churned revenue: -$10,000
  - Final NRR calculation: 120%
- **Interactive Calculator Section** - Three input fields with synchronized sliders:
  - **Starting MRR** - Input box ($100,000) with slider ranging $0 to $1,000,000
  - **Expansion Revenue** - Input box ($30,000) with slider ranging $0 to $500,000
  - **Churned Revenue** - Input box ($10,000) with slider ranging $0 to $500,000
- **Result Display** - Prominent result card showing:
  - Green status badge with checkmark icon labeled "Excellent"
  - Large green percentage "120%" displayed prominently
  - Feedback message: "Exceptional! Your product has strong expansion and retention."
- **Glass Card Design** - Elevated container with blue-tinted borders and subtle glow
- **Dark Theme** - Clean dark blue background with light blue and green accents

## 🏢 Business Type Support (B2B vs B2C)

Several metrics include **business type-specific benchmarks** to provide more accurate and relevant feedback based on your business model. The platform recognizes that B2B (Business-to-Business) and B2C (Business-to-Consumer) companies have fundamentally different economics.

### Metrics with Business Type Differentiation

The following 5 metrics support B2B/B2C toggle with tailored benchmarks:

| Metric | B2B Benchmark | B2C Benchmark | Why It Differs |
|--------|---------------|---------------|----------------|
| **Gross Margin** | 70-90% (Excellent) | 40-60% (Good) | B2B software has minimal marginal costs; B2C often involves physical goods or inventory |
| **Contribution Margin** | 60-80% (Excellent) | 30-50% (Good) | B2B has lower variable costs per customer; B2C has higher transaction and fulfillment costs |
| **Customer Acquisition Cost (CAC)** | $500-5,000+ | $10-100 | B2B requires sales teams and longer cycles; B2C relies on digital marketing at scale |
| **Lifetime Value (LTV)** | $5,000-50,000+ | $100-1,000 | B2B contracts are larger and longer-term; B2C purchases are smaller and more frequent |
| **Churn Rate** | 5-7% annual (Good) | 30-40% annual (Acceptable) | B2B has contracts and switching costs; B2C has low friction and high competition |

### How to Use Business Type Toggle

1. **Navigate to a metric detail page** that supports business types (look for CAC, LTV, Gross Margin, Contribution Margin, or Churn Rate)
2. **Toggle between B2B and B2C** using the selector above the calculator
3. **Calculator benchmarks automatically adjust** - thresholds and feedback change to match your selected business model
4. **Your selection persists** across the session for consistent analysis

### Key Differences Explained

**B2B (Business-to-Business)**:
- Higher customer lifetime values ($5K-$50K+)
- Higher customer acquisition costs ($500-$5K+)
- Lower churn rates (5-7% annually is good)
- Higher margins (70-90% gross margin expected)
- Longer sales cycles, more deliberate purchases
- Contract-based relationships with switching costs

**B2C (Business-to-Consumer)**:
- Lower customer lifetime values ($100-$1K)
- Lower customer acquisition costs ($10-$100)
- Higher churn rates (30-40% annually acceptable)
- Lower margins (40-60% gross margin typical)
- Shorter purchase cycles, impulse buying
- Transactional relationships with easy switching

### Example: Gross Margin Benchmarks

**B2B SaaS Company**:
```
Revenue: $100,000
COGS: $20,000
Gross Margin: 80%
Result: ✅ Excellent (meets 70%+ threshold)
Feedback: "Excellent gross margin for B2B! Typical for healthy SaaS businesses."
```

**B2C E-commerce Company**:
```
Revenue: $100,000
COGS: $55,000
Gross Margin: 45%
Result: ✅ Good (meets 40%+ threshold)
Feedback: "Healthy B2C gross margin. Good foundation for sustainable growth."
```

The same 45% margin would be flagged as ⚠️ "Moderate" for B2B, but is ✅ "Good" for B2C - showcasing how the platform provides context-aware feedback.

## 🛠️ Tech Stack

### Frontend
- **React 18.3** with TypeScript
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling with custom glass utilities
- **Plus Jakarta Sans** - Premium typography for modern, professional look
- **shadcn/ui** - Radix UI component library with custom glass variants
- **Wouter 3.3** - Lightweight routing
- **TanStack React Query 5.6** - Data fetching
- **Framer Motion 11.13** - Subtle animations and transitions
- **Chart.js 4.5** + **Recharts 2.15** - Data visualization
- **React Hook Form 7.55** - Form handling
- **Zod 3.24** - Schema validation

### Backend
- **Express.js 4.21** - Web server
- **Node.js 20+** with TypeScript
- **PostgreSQL 16** - Database
- **Drizzle ORM 0.39** - Database management
- **Passport.js 0.7** - Authentication
- **WebSocket (ws 8.18)** - Real-time features

### Testing & Quality
- **Vitest 4.0** - Unit and integration tests
- **Playwright 1.56** - End-to-end testing
- **TypeScript 5.6** - Type checking

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- PostgreSQL 16 (for database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nicoladevera/startup-metrics-101.git
   cd startup-metrics-101
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional for database features)

   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

   Add the following variables (see Environment Variables section below for details):
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/startup_metrics
   SESSION_SECRET=your-secret-key-here
   PORT=5000
   ```

4. **Push database schema** (if using database)
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   **Note**: The server will start on port 5000 by default. If port 5000 is unavailable (common on macOS due to AirPlay), you can use a different port:
   ```bash
   PORT=3000 npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000` (or the port you specified)

## 🔐 Environment Variables

The application can run without a database (metrics work entirely client-side), but database features require the following environment variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | No | - | PostgreSQL connection string. Format: `postgresql://user:password@host:port/database` |
| `SESSION_SECRET` | No | - | Secret key for session management. Use a long random string in production. |
| `PORT` | No | `5000` | Port number for the development/production server. |

### Example .env file:

```env
# Database (optional - only needed for user accounts/saved data)
DATABASE_URL=postgresql://postgres:password@localhost:5432/startup_metrics

# Session security (optional - only needed with database)
SESSION_SECRET=your-very-long-random-secret-key-change-this-in-production

# Server configuration
PORT=5000
```

### Running without a database:

The app works perfectly without a database - all metrics and calculators function client-side. Simply skip the database setup steps and run:

```bash
npm install
npm run dev
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run test` | Run unit and integration tests |
| `npm run test:e2e` | Run end-to-end tests with Playwright |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema changes |

## 📁 Project Structure

```
startupmetrics101/
├── client/                    # React frontend
│   ├── src/
│   │   ├── App.tsx           # Main app with routing
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── metric-sections/  # Metric page sections
│   │   ├── hooks/            # Custom React hooks
│   │   └── lib/              # Utilities
│   └── index.html
│
├── server/                    # Express backend
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API routes
│   └── storage.ts            # Data persistence
│
├── shared/                    # Shared code
│   ├── metrics/              # Metric definitions
│   │   ├── mrr.ts
│   │   ├── arr.ts
│   │   ├── burn-rate.ts
│   │   └── ...
│   ├── validation.ts         # Input validation schemas
│   └── schema.ts             # Database schema
│
├── test/                      # Unit tests
├── e2e/                       # E2E tests
└── scripts/                   # Build scripts
```

## 🧪 Testing

### Unit & Integration Tests

Run Vitest tests:
```bash
npm run test
```

Tests cover:
- All metric calculations
- Input validation
- Edge cases and boundary conditions

### End-to-End Tests

Run Playwright tests:
```bash
npm run test:e2e
```

E2E tests cover:
- Homepage navigation and search
- Metric detail pages
- Calculator interactions
- Theme toggling

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Option 1: Kill the process using port 5000
lsof -ti:5000 | xargs kill

# Option 2: Use a different port
PORT=3000 npm run dev

# Option 3: Find and stop the conflicting process
lsof -i :5000  # See what's using the port
# Then manually stop that process
```

**Note**: On macOS, port 5000 is sometimes used by AirPlay/Control Center. You can either disable AirPlay Receiver in System Settings or use a different port.

#### Database Connection Issues

**Problem**: `Error: connect ECONNREFUSED` or database connection failures

**Solutions**:
1. **Verify PostgreSQL is running**:
   ```bash
   # macOS
   brew services list
   brew services start postgresql

   # Linux
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

2. **Check DATABASE_URL format**:
   ```env
   # Correct format
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name

   # Common mistakes to avoid:
   # ❌ Missing protocol: username:password@localhost:5432/database_name
   # ❌ Wrong protocol: postgres:// (should be postgresql://)
   # ❌ Missing port: postgresql://user:pass@localhost/db
   ```

3. **Test database connection**:
   ```bash
   psql $DATABASE_URL
   # or
   psql -U your_username -d startup_metrics
   ```

4. **Remember**: Database is optional! If you don't need user accounts or saved data, simply run without DATABASE_URL.

#### Build/Type Check Failures

**Problem**: TypeScript errors or build failures after pulling updates

**Solutions**:
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Clear build cache
rm -rf dist

# Run type check to see specific errors
npm run check
```

#### Tests Failing

**Problem**: Unit or E2E tests failing unexpectedly

**Solutions**:

1. **For E2E test failures**:
   ```bash
   # Install Playwright browsers
   npx playwright install

   # Run E2E tests in headed mode to see what's happening
   npx playwright test --headed

   # Run specific test file
   npx playwright test e2e/homepage.spec.ts
   ```

2. **For unit test failures**:
   ```bash
   # Run tests in watch mode
   npm run test

   # Run specific test file
   npx vitest test/metrics.test.ts
   ```

#### Dark Mode Not Working in Production

**Problem**: Dark mode works in development but not in production build

**Solution**: This was fixed in recent commits. Ensure you have the latest version:
```bash
git pull origin main
npm install
npm run build
```

The fix includes critical CSS injection to prevent FOUC (Flash of Unstyled Content) and ensures theme persistence.

#### Calculator Shows "Cannot Calculate" / "N/A"

**Problem**: Calculator displays "N/A" with red error badge instead of results

**Explanation**: This is expected behavior when required inputs are zero or missing. For example:
- Net Profit Margin requires non-zero revenue
- Growth Rate requires non-zero previous period value
- LTV:CAC ratio requires non-zero CAC

**Solution**: Enter valid non-zero values for all required inputs. The error message will explain which data is needed.

### Still Having Issues?

If you're experiencing issues not covered here:

1. Check the [GitHub Issues](https://github.com/nicoladevera/startup-metrics-101/issues) for similar problems
2. Review recent commits for relevant fixes
3. Open a new issue with:
   - Your environment (OS, Node version, npm version)
   - Steps to reproduce
   - Error messages or screenshots
   - What you've already tried

## 🎨 Customization

### Adding a New Metric

1. Create a new metric file in `shared/metrics/your-metric.ts`
2. Define the metric interface with all required fields
3. Add validation schema in `shared/validation.ts`
4. Export from `shared/metrics/index.ts`
5. Add tests in `test/metrics.test.ts`

Example metric structure:
```typescript
export const yourMetric: Metric = {
  id: 'your-metric',
  name: 'Your Metric',
  category: 'growth',
  definition: 'Clear explanation...',
  formula: 'Mathematical formula',
  whyItMatters: 'Why this metric is important...',
  inputs: [...],
  calculate: (inputs) => { ... },
  benchmark: (value) => { ... }
}
```

### Theming & Design System

The app features a sophisticated design system with glassmorphism effects and blue gradient accents.

**Design Tokens** (defined in `client/src/index.css`):
- **Glass Cards** - `.glass-card` and `.glass-card-elevated` utilities with backdrop blur
- **Color Palette** - Blue-tinted backgrounds and borders for both dark and light modes
- **Gradients** - Radial and linear gradients for depth and visual interest
- **Shadows & Glows** - Custom shadow utilities with blue-tinted glows

**Customize Colors** in `tailwind.config.ts`:
```typescript
colors: {
  primary: { ... },      // Vibrant blue (#0066FF)
  success: { ... },      // Emerald green
  warning: { ... },      // Amber yellow
  error: { ... }         // Red
}
```

**Glass Card Utilities**:
- `.glass-card` - Standard glass effect with subtle transparency
- `.glass-card-elevated` - Enhanced glass with blue glow for important sections
- `.bg-grid-pattern` - Subtle grid overlay for texture
- `.glow-primary` - Blue glow effects for interactive elements

**Theme Variables**:
- Dark mode uses deep navy backgrounds (`hsl(222 58% 7%)`) with blue undertones
- Light mode uses soft blue-gray backgrounds (`hsl(220 30% 97%)`) with blue accents
- Both themes feature consistent blue gradient overlays and radial glows

## 🚢 Deployment

### Replit Deployment

This project is configured for Replit deployment:

1. Import repository to Replit
2. Configure PostgreSQL database
3. Run `npm run build`
4. Start with `npm run start`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Secret for session management
   - `PORT` - Server port (default: 5000)

3. **Start the server**
   ```bash
   npm run start
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. **Run appropriate checks before committing** (see Quality Checks section below)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Quality Checks Before Committing

Run the appropriate checks based on your changes:

#### For ALL changes:
```bash
npm run check           # TypeScript type checking
npm run test            # Unit tests
```

#### Based on change type:

**Metrics/Calculator Changes** (shared/metrics/, shared/utils/):
```bash
npm run check           # Type checking
npm run test            # Unit tests (metrics.test.ts)
npm run test:e2e        # E2E tests (calculator interactions)
npm audit               # Security vulnerabilities
```

**UI/Component Changes** (client/src/components/, client/src/pages/):
```bash
npm run check           # Type checking
npm run test:e2e        # E2E tests (user flows)
npm run build           # Ensure production build works
```

**Backend/API Changes** (server/):
```bash
npm run check           # Type checking
npm run test            # Unit tests
npm run build           # Ensure production build works
npm audit               # Security vulnerabilities
```

**Dependency Changes** (package.json, package-lock.json):
```bash
npm audit               # Security vulnerabilities
npm run check           # Type checking
npm run test            # All unit tests
npm run test:e2e        # All E2E tests
npm run build           # Production build
```

**Documentation Only** (README.md, comments):
- No checks required, but verify markdown renders correctly

#### Quick Check All
For comprehensive validation before major commits:
```bash
npm audit && npm run check && npm run test && npm run test:e2e && npm run build
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Typography: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) from Google Fonts
- Design inspiration: Modern glassmorphism and premium dashboard aesthetics

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

Made with ❤️ for the startup community
