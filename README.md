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
- **Best Practices** - Tips and strategies for improvement
- **Common Mistakes** - Pitfalls to avoid
- **Data Visualization** - Charts and graphs

### 🎨 User Experience

- **Modern UI** - Clean, professional dashboard design
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Dark/Light Mode** - Theme toggle for comfortable viewing
- **Search & Filter** - Quickly find the metrics you need
- **Smooth Animations** - Polished, professional interactions
- **Accessible** - High contrast and screen reader support

## 🛠️ Tech Stack

### Frontend
- **React 18.3** with TypeScript
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **shadcn/ui** - Radix UI component library
- **Wouter 3.3** - Lightweight routing
- **TanStack React Query 5.6** - Data fetching
- **Framer Motion 11.13** - Animations
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
   git clone https://github.com/yourusername/startupmetrics101.git
   cd startupmetrics101
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional for database features)
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Push database schema** (if using database)
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

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

### Theming

Customize colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: { ... },
  success: { ... },
  warning: { ... },
  error: { ... }
}
```

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
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

Made with ❤️ for the startup community
