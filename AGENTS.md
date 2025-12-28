# AGENTS.md

This document provides comprehensive guidance for AI agents and developers working on the Startup Metrics 101 codebase. It contains everything needed to understand the architecture, development workflow, and project constraints.

## 1. Tech Stack & Dependencies

### Core Technologies
- **Node.js**: >=20.0.0 (required for development and production)
- **TypeScript**: 5.6.3 with strict mode enabled
- **Package Manager**: npm (uses package-lock.json)

### Frontend Stack
- **React**: 18.3.1 with React DOM 18.3.1
- **Build Tool**: Vite 5.4.20 with @vitejs/plugin-react 4.7.0
- **Router**: Wouter 3.3.5 (lightweight client-side routing)
- **Styling**:
  - Tailwind CSS 3.4.17 with @tailwindcss/vite 4.1.3
  - @tailwindcss/typography 0.5.15
  - tailwindcss-animate 1.0.7
  - PostCSS 8.4.47 with Autoprefixer 10.4.20
- **UI Components**: shadcn/ui (New York style)
  - Radix UI primitives (@radix-ui/react-* packages)
  - Custom components in `client/src/components/ui/`
- **State Management**: @tanstack/react-query 5.60.5
- **Forms**: react-hook-form 7.55.0 with @hookform/resolvers 3.10.0
- **Animations**: framer-motion 11.13.1
- **Charts**:
  - recharts 2.15.2
  - chart.js 4.5.1
- **Icons**:
  - lucide-react 0.453.0
  - react-icons 5.4.0
- **Theming**: next-themes 0.4.6
- **Validation**: zod 3.24.2 with zod-validation-error 3.4.0
- **Date Handling**: date-fns 3.6.0 with react-day-picker 8.10.1

### Backend Stack
- **Framework**: Express 4.21.2
- **Runtime**: tsx 4.20.5 (development) / node (production)
- **Database ORM**:
  - drizzle-orm 0.39.1
  - drizzle-zod 0.7.0
  - drizzle-kit 0.31.4 (dev)
- **Database**: PostgreSQL via @neondatabase/serverless 0.10.4
- **Session Management**:
  - express-session 1.18.1
  - connect-pg-simple 10.0.0 (PostgreSQL session store)
  - memorystore 1.6.7 (development fallback)
- **Authentication**:
  - passport 0.7.0
  - passport-local 1.0.0
- **WebSockets**: ws 8.18.0
- **Bundler**: esbuild 0.25.0 (overridden for security)

### Development & Testing
- **TypeScript Compiler**: tsc (type checking only, no emit)
- **Unit Testing**:
  - vitest 4.0.7
  - jsdom 27.1.0
  - @testing-library/react 16.3.0
  - @testing-library/jest-dom 6.9.1
  - @testing-library/user-event 14.6.1
- **E2E Testing**: @playwright/test 1.56.1
- **Replit Plugins** (development only):
  - @replit/vite-plugin-cartographer 0.3.1
  - @replit/vite-plugin-dev-banner 0.1.1
  - @replit/vite-plugin-runtime-error-modal 0.0.3

### Utilities
- **Class Management**:
  - clsx 2.1.1
  - tailwind-merge 2.6.0
  - class-variance-authority 0.7.1
- **Command Palette**: cmdk 1.1.1
- **Carousel**: embla-carousel-react 8.6.0
- **Panels**: react-resizable-panels 2.1.7
- **OTP Input**: input-otp 1.4.2
- **Drawer**: vaul 1.1.2

### Critical Environment Requirements
- **DATABASE_URL**: PostgreSQL connection string (required for database operations)
- **SESSION_SECRET**: Minimum 32 characters for session encryption
- **NODE_ENV**: `development` or `production` (defaults to development)
- **PORT**: Server port (defaults to 5000, with fallbacks: 3000, 3001, 3003)

## 2. Project Structure

This is a **monorepo** with client-server architecture and shared code.

```
startup-metrics-101/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── App.tsx             # Main app component with routing
│   │   ├── main.tsx            # React entry point
│   │   ├── index.css           # Global styles + Tailwind
│   │   ├── components/         # React components
│   │   │   ├── ui/             # shadcn/ui base components (49 files)
│   │   │   ├── metric-sections/ # Metric-specific UI sections
│   │   │   ├── Calculator.tsx  # Interactive calculator component
│   │   │   ├── ResultDisplay.tsx # Calculation results display
│   │   │   ├── MetricChart.tsx # Chart visualizations
│   │   │   ├── MetricTooltip.tsx # Tooltip with definitions
│   │   │   ├── ThemeProvider.tsx # Theme context provider
│   │   │   ├── ThemeToggle.tsx # Dark/light mode toggle
│   │   │   ├── BusinessTypeToggle.tsx # B2B/B2C selector
│   │   │   └── ErrorBoundary.tsx # Error handling wrapper
│   │   ├── pages/              # Route page components
│   │   ├── hooks/              # Custom React hooks
│   │   └── lib/                # Utilities and helpers
│   │       ├── utils.ts        # General utilities
│   │       ├── constants.ts    # Frontend constants
│   │       ├── icons.tsx       # Icon definitions
│   │       └── queryClient.ts  # TanStack Query config
│   └── index.html              # HTML entry point
├── server/                      # Backend Express application
│   ├── index.ts                # Express server entry point
│   ├── routes.ts               # API route registration
│   ├── vite.ts                 # Vite dev server integration
│   ├── storage.ts              # Database/storage utilities
│   └── constants.ts            # Server configuration constants
├── shared/                      # Code shared between client & server
│   ├── metrics/                # Metric definitions (modular)
│   │   ├── index.ts            # Exports all metrics
│   │   ├── mrr.ts              # Monthly Recurring Revenue
│   │   ├── arr.ts              # Annual Recurring Revenue
│   │   ├── growth-rate.ts      # Growth Rate
│   │   ├── nrr.ts              # Net Revenue Retention
│   │   ├── churn-rate.ts       # Churn Rate
│   │   ├── rule-of-40.ts       # Rule of 40
│   │   ├── cac.ts              # Customer Acquisition Cost
│   │   ├── ltv.ts              # Lifetime Value
│   │   ├── ltv-cac-ratio.ts    # LTV:CAC Ratio
│   │   ├── unit-economics.ts   # Unit Economics
│   │   ├── cac-payback-period.ts # CAC Payback Period
│   │   ├── arpu.ts             # Average Revenue Per User
│   │   ├── gross-margin.ts     # Gross Margin
│   │   ├── contribution-margin.ts # Contribution Margin
│   │   ├── net-profit-margin.ts # Net Profit Margin
│   │   ├── ebitda-margin.ts    # EBITDA Margin
│   │   ├── burn-rate.ts        # Burn Rate
│   │   └── runway.ts           # Runway
│   ├── metrics.ts              # Re-exports from metrics/
│   ├── schema.ts               # Database schema (Drizzle)
│   ├── validation.ts           # Zod validation schemas
│   └── utils/                  # Shared utility functions
├── test/                        # Unit tests
│   ├── setup.ts                # Vitest setup (@testing-library/jest-dom)
│   └── validation.test.ts      # Validation tests
├── e2e/                         # End-to-end tests
│   ├── homepage.spec.ts        # Homepage E2E tests
│   ├── metric-detail.spec.ts   # Metric detail page tests
│   └── tooltip.spec.ts         # Tooltip interaction tests
├── docs/                        # Documentation
│   └── screenshots/            # Screenshots for README
├── attached_assets/             # Static assets
├── scripts/                     # Build/deployment scripts
├── migrations/                  # Database migrations (Drizzle)
├── dist/                        # Production build output
│   ├── public/                 # Built frontend assets
│   └── index.js                # Built backend server
├── .github/                     # GitHub configuration
│   └── workflows/              # CI/CD workflows
│       ├── ci.yml              # Main CI pipeline
│       └── security-scan.yml   # Security scanning
├── .claude/                     # Claude Code configuration
├── node_modules/                # Dependencies (ignored)
├── playwright-report/           # Playwright HTML reports (ignored)
└── test-results/                # Test artifacts (ignored)
```

### Architecture Pattern
- **Monorepo**: Single repository with multiple concerns (client, server, shared)
- **Client-Server Separation**: Clear boundary between frontend and backend
- **Shared Code**: TypeScript definitions, validation, and business logic shared via `shared/`
- **Path Aliases**:
  - `@/*` → `client/src/*`
  - `@shared/*` → `shared/*`
  - `@assets/*` → `attached_assets/*`

### Key Design Decisions
1. **Modular Metrics**: Each metric is a separate file in `shared/metrics/` for maintainability
2. **Component Co-location**: UI components organized by feature (ui/, metric-sections/)
3. **shadcn/ui Pattern**: Components copied into codebase (not npm package) for customization
4. **TypeScript Paths**: Configured in `tsconfig.json` and mirrored in Vite/Vitest configs
5. **Build Separation**: Frontend built with Vite, backend bundled with esbuild

## 3. Development Commands

All commands use `npm` as the package manager.

### Setup & Installation
```bash
npm install              # Install all dependencies (use npm ci in CI)
npm ci                   # Clean install from lock file (faster, reproducible)
```

### Development
```bash
npm run dev              # Start development server (PORT=3000 by default)
                         # - Runs Express server with tsx
                         # - NODE_ENV=development
                         # - Includes Vite dev server with HMR
                         # - Replit plugins enabled in Replit environment

PORT=3000 npm run dev    # Start dev server on specific port
```

### Building
```bash
npm run build            # Production build
                         # 1. Builds frontend with Vite → dist/public/
                         # 2. Bundles backend with esbuild → dist/index.js
                         # Output: dist/ directory ready for deployment
```

### Production
```bash
npm start                # Run production server
                         # - Runs dist/index.js with NODE_ENV=production
                         # - Serves built frontend from dist/public/
                         # - Requires DATABASE_URL environment variable
```

### Type Checking
```bash
npm run check            # TypeScript type checking (tsc --noEmit)
                         # - Checks client/, server/, shared/
                         # - Excludes node_modules, dist, test files
                         # - Uses strict mode
```

### Testing
```bash
# Unit Tests (Vitest)
npm test                 # Run unit tests in watch mode
npm run test:ui          # Open Vitest UI dashboard
npm run test:coverage    # Generate coverage report
npm test -- --run        # Run tests once (CI mode)

# E2E Tests (Playwright)
npm run test:e2e         # Run Playwright tests (headless)
npm run test:e2e:ui      # Open Playwright UI mode
npm run test:e2e:headed  # Run tests with browser visible
npm run test:e2e:debug   # Debug tests with Playwright Inspector

npx playwright install --with-deps chromium  # Install Playwright browsers
```

### Database
```bash
npm run db:push          # Push schema changes to database
                         # - Uses Drizzle Kit
                         # - Reads from shared/schema.ts
                         # - Requires DATABASE_URL
```

### Security & Auditing
```bash
npm audit                # Run security audit (all severities)
npm run audit:fix        # Automatically fix vulnerabilities
npm run audit:prod       # Audit production dependencies only
npm run security:check   # Audit + check for outdated packages
```

### Port Configuration
The server tries ports in this order: 5000 → 3000 → 3001 → 3003 (see `server/constants.ts:7`)

## 4. Testing Strategy

### Unit Tests (Vitest)
- **Framework**: Vitest 4.0.7 with jsdom environment
- **Location**: `test/` directory
- **Setup**: `test/setup.ts` imports `@testing-library/jest-dom`
- **Coverage**: Run with `npm run test:coverage`
- **UI**: Run with `npm run test:ui` for visual test runner

**Test Organization:**
```
test/
├── setup.ts              # Global test setup
└── validation.test.ts    # Example: validates shared/validation.ts
```

**Example Test Pattern:**
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '@shared/utils';

describe('MyFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe(expected);
  });
});
```

**Configuration** (`vitest.config.ts:1`):
- Globals enabled (`globals: true`)
- jsdom environment for React testing
- Setup file: `test/setup.ts`
- Excludes: `node_modules`, `dist`, `e2e`, `*.e2e.spec.ts`
- Path aliases: `@/*`, `@shared/*`

### E2E Tests (Playwright)
- **Framework**: Playwright 1.56.1
- **Location**: `e2e/` directory
- **Browser**: Chromium (Desktop Chrome)
- **Base URL**: `http://localhost:3000` (configurable)
- **Parallelization**: Fully parallel (disabled in CI)

**Test Organization:**
```
e2e/
├── homepage.spec.ts         # Tests homepage functionality
├── metric-detail.spec.ts    # Tests individual metric pages
└── tooltip.spec.ts          # Tests tooltip interactions
```

**Configuration** (`playwright.config.ts:1`):
- Test directory: `e2e/`
- Reporter: HTML (saved to `playwright-report/`)
- Retry: 2x on CI, 0x locally
- Workers: 1 in CI (sequential), unlimited locally
- Screenshots: On failure only
- Traces: On first retry
- Web server: Starts dev server automatically (`PORT=3000 npm run dev`)

**Running E2E Tests:**
```bash
npm run test:e2e         # Run all E2E tests
npm run test:e2e:ui      # Interactive mode
npm run test:e2e:headed  # See browser
npm run test:e2e:debug   # Debug with inspector
```

### CI/CD Test Gates
All tests must pass before merging. CI pipeline (`.github/workflows/ci.yml:1`):

1. **Security Audit**: `npm audit --production --audit-level=high`
2. **Dependency Check**: `npm outdated` + `depcheck` for unused deps
3. **Type Check**: `npm run check` (must pass)
4. **Unit Tests**: `npm test -- --run` (must pass)
5. **E2E Tests**: `npm run test:e2e` (must pass)
6. **Build**: `npm run build` (must succeed)

**Additional Security Scanning** (`.github/workflows/security-scan.yml:1`):
- Runs weekly on Mondays at 9:00 AM UTC
- Manual trigger available via workflow_dispatch
- License compliance check with `license-checker`

### Coverage Requirements
- No explicit coverage thresholds configured
- Coverage reports generated with `npm run test:coverage`
- Focus on critical business logic in `shared/` directory

## 5. Code Style & Standards

### TypeScript Configuration
- **Strict Mode**: Enabled (`tsconfig.json:9`)
- **No Emit**: Type checking only (building handled by Vite/esbuild)
- **Module**: ESNext with bundler resolution
- **JSX**: Preserve (handled by Vite)
- **Lib**: `esnext`, `dom`, `dom.iterable`

**Key Settings:**
- `allowImportingTsExtensions: true` - Import `.ts` files directly
- `esModuleInterop: true` - Better CommonJS interop
- `skipLibCheck: true` - Faster builds

### Linting & Formatting
**Note**: This project does NOT use ESLint or Prettier.
- No linting rules enforced automatically
- Code consistency maintained through TypeScript strict mode
- Manual code review for style consistency

### Naming Conventions
- **Files**: kebab-case (e.g., `cac-payback-period.ts`, `metric-detail.spec.ts`)
- **Components**: PascalCase (e.g., `Calculator.tsx`, `ThemeProvider.tsx`)
- **Variables/Functions**: camelCase (e.g., `calculateMetric`, `isValidInput`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `DEFAULT_PORT`, `HTTP_STATUS`)
- **Types/Interfaces**: PascalCase (e.g., `MetricDefinition`, `CalculatorProps`)

### File Organization Patterns

**Component Files:**
```typescript
// 1. Imports (external, then internal)
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Type definitions
interface MyComponentProps {
  // ...
}

// 3. Component definition
export function MyComponent({ prop }: MyComponentProps) {
  // ...
}
```

**Metric Files** (`shared/metrics/*.ts`):
```typescript
// Each metric exports:
export const metricName: MetricDefinition = {
  id: 'unique-id',
  name: 'Display Name',
  formula: 'LaTeX formula string',
  calculate: (inputs) => number,
  inputFields: [...],
  benchmarks: {...},
  // ...
};
```

### Component Architecture

**shadcn/ui Components** (`client/src/components/ui/`):
- Based on Radix UI primitives
- New York style variant
- Copied into codebase (not installed as package)
- Customizable via Tailwind CSS variables
- Import from `@/components/ui/*`

**Custom Components:**
- `Calculator.tsx` (`client/src/components/Calculator.tsx:1`): Generic calculator with dynamic inputs
- `ResultDisplay.tsx` (`client/src/components/ResultDisplay.tsx:1`): Shows calculation results with benchmark colors
- `MetricChart.tsx` (`client/src/components/MetricChart.tsx:1`): Chart.js wrapper for visualizations
- `ErrorBoundary.tsx` (`client/src/components/ErrorBoundary.tsx:1`): React error boundary with user-friendly messages

### Styling Standards
- **Utility-First**: Use Tailwind utility classes
- **CSS Variables**: Custom properties defined in `index.css` for theming
- **Dark Mode**: Class-based (`darkMode: ["class"]` in `tailwind.config.ts:4`)
- **Animations**: Custom keyframes in `tailwind.config.ts:144-177`
  - `fade-in`, `fade-in-up`, `scale-in`, `slide-in-right`
  - Accordion animations from Radix
- **Colors**: HSL-based with alpha channel support
- **Glass Morphism**: Backdrop blur effects (`backdrop-blur-xs`, `backdrop-blur`)

### Import Aliases
Always use path aliases for cleaner imports:
```typescript
// Good
import { Button } from '@/components/ui/button';
import { MetricDefinition } from '@shared/metrics';

// Avoid
import { Button } from '../../../components/ui/button';
import { MetricDefinition } from '../../shared/metrics';
```

### Module System
- **Type**: ES Modules (`"type": "module"` in `package.json:4`)
- **Extensions**: Use `.ts`, `.tsx`, `.js` explicitly where needed
- **No Default Exports**: Prefer named exports for better refactoring

## 6. Boundaries & Constraints

### Critical Files - NEVER Modify or Commit

**Secrets & Credentials:**
- `.env`, `.env.local`, `.env.production` - Environment variables with secrets
- Any files containing `DATABASE_URL`, `SESSION_SECRET`, or API keys
- `credentials.json` or similar authentication files

**Generated/Build Artifacts:**
- `node_modules/` - Dependency installations
- `dist/` - Production build output
- `build/` - Alternative build directory
- `server/public/` - Generated static files
- `playwright-report/` - Test reports
- `test-results/` - Test artifacts
- `.DS_Store` - macOS file system metadata
- `*.tar.gz` - Compressed archives
- `vite.config.ts.*` - Vite temporary files
- `node_modules/typescript/tsbuildinfo` - TypeScript build cache

**Lock Files - Commit but Don't Manually Edit:**
- `package-lock.json` - npm dependency tree (auto-generated)

### Protected Configurations
**Read-only in most cases:**
- `tsconfig.json` - TypeScript compiler settings
- `tailwind.config.ts` - Tailwind CSS configuration
- `vite.config.ts` - Vite bundler settings
- `vitest.config.ts` - Test runner configuration
- `playwright.config.ts` - E2E test configuration
- `drizzle.config.ts` - Database migration settings
- `components.json` - shadcn/ui configuration

**Only modify these if you understand the full impact on the build system.**

### Database Constraints
- **Schema Location**: `shared/schema.ts` - Single source of truth
- **Migration Strategy**: Use `npm run db:push` (Drizzle push)
- **Connection**: Requires `DATABASE_URL` environment variable
- **Database Type**: PostgreSQL only (via Neon serverless)
- **Session Storage**: PostgreSQL (production) or memorystore (development)

### Security Boundaries

**Validation:**
- All user inputs MUST be validated with Zod schemas (`shared/validation.ts`)
- Use `sanitizeNumericInput()` for numeric inputs
- Use `validateMetricInputs()` for calculator inputs
- Never trust client-side data on the server

**Session Management:**
- Session secret MUST be >=32 characters (`server/constants.ts:48`)
- Cookie max age: 7 days (`server/constants.ts:50`)
- Secure cookies in production
- HTTP-only cookies to prevent XSS

**Audit Requirements:**
- High severity vulnerabilities block production deployment
- Run `npm audit --production` before deployment
- Review `npm outdated` regularly
- CI enforces `npm audit --audit-level=high`

### API Boundaries
- **Server Port**: Defaults to 5000, falls back to 3000, 3001, 3003
- **Request Limits**:
  - Max JSON size: 10MB (`server/constants.ts:14`)
  - Max URL-encoded size: 10MB (`server/constants.ts:15`)
- **Timeouts**:
  - Server timeout: 30 seconds (`server/constants.ts:10`)
  - Keep-alive: 5 seconds (`server/constants.ts:11`)

### Deprecated Patterns to Avoid

**Don't Use:**
- CommonJS (`require`, `module.exports`) - Use ES modules
- Default exports - Use named exports
- Inline styles - Use Tailwind utilities or CSS-in-JS
- `any` type - Use specific types or `unknown`
- Ignoring TypeScript errors with `@ts-ignore` - Fix the root cause
- Direct DOM manipulation - Use React refs and state
- Global state without context - Use React Query or Context API

**Deprecated Dependencies:**
- No deprecated packages currently in use
- Check `npm outdated` for packages needing updates

### Shared Code Rules
Files in `shared/` MUST:
- Be usable in both client and server contexts
- Not import browser-only APIs (DOM, window, etc.)
- Not import Node-only APIs (fs, path, etc.) without conditional checks
- Use only TypeScript and Zod (no React)

### Component Rules
- shadcn/ui components in `client/src/components/ui/` should not be modified unless customizing for the project
- Use `components.json` to configure new shadcn/ui component additions
- Custom components go in `client/src/components/` (not `/ui`)

### Metric Definition Rules
When adding new metrics to `shared/metrics/`:
1. Create a new file: `shared/metrics/new-metric.ts`
2. Export a `MetricDefinition` object
3. Add to `shared/metrics/index.ts` exports
4. Follow the existing pattern (see `shared/metrics/mrr.ts` as reference)
5. Include: `id`, `name`, `formula`, `calculate`, `inputFields`, `benchmarks`

## 7. Git Workflow

### Branching Strategy
- **Main Branch**: `main` - Production-ready code
- **Feature Branches**: Create from `main`, merge back via PR
- **Naming**: `feat/feature-name`, `fix/bug-name`, `chore/task-name`, `docs/update-name`

**No `develop` branch** - Direct to `main` with PR review

### Commit Message Conventions
Follow Conventional Commits style (observed from git history):

**Format:**
```
<type>(<scope>): <short description>

<optional body>

<optional footer>
```

**Types:**
- `feat`: New feature (e.g., `feat(ui): enhance home page header`)
- `fix`: Bug fix (e.g., `fix(mobile): use portal for tooltips`)
- `test`: Test additions/changes (e.g., `test: update e2e expectations`)
- `docs`: Documentation updates (e.g., `docs: update README`)
- `chore`: Maintenance tasks (e.g., `chore: remove unused docs/images`)
- `ui`: UI/UX improvements (e.g., `ui: remove 'Updated for 2026' label`)

**Examples from Git History:**
```
feat(ui): enhance home page header with new styling and 2026 badge
fix(mobile): use portal for tooltips to resolve z-index clipping
test: update e2e expectations for new homepage header
docs: update README with new metrics info
chore(docs): update interactive calculator screenshot
```

**Best Practices:**
- Keep first line under 72 characters
- Use imperative mood ("add", not "added" or "adds")
- Include scope when clear (ui, mobile, docs)
- Reference issues/PRs in footer if applicable

### Pull Request Requirements

**Before Opening PR:**
1. All tests pass locally (`npm test -- --run`)
2. Type checking passes (`npm run check`)
3. Build succeeds (`npm run build`)
4. E2E tests pass (`npm run test:e2e`)
5. No high-severity security vulnerabilities (`npm audit --production`)

**PR Process:**
1. Create feature branch from `main`
2. Make changes and commit following conventions
3. Push branch and open PR to `main`
4. CI runs automatically (see `.github/workflows/ci.yml:1`)
5. Address any CI failures
6. Request review
7. Merge after approval

**CI Checks (All Must Pass):**
- ✅ Security Audit
- ✅ Dependency Check
- ✅ Type Check
- ✅ Unit Tests
- ✅ Build
- ✅ E2E Tests

**Merge Strategy:**
- Squash and merge preferred for clean history
- Keep PR focused on single feature/fix
- Update branch with `main` before merging

### Pre-commit Hooks
**Note**: This project does NOT use Husky or pre-commit hooks.
- No automated linting or formatting on commit
- Manual checks recommended before pushing
- CI enforces all quality gates

### Release Process
No formal release process configured (no tags, no semantic versioning automation).

**To Deploy:**
1. Ensure `main` branch is stable
2. All CI checks passing
3. Run `npm run build` to generate `dist/`
4. Deploy `dist/` directory with `DATABASE_URL` configured
5. Run `npm start` in production environment

---

## Quick Reference

### Common Tasks

**Add a New Metric:**
1. Create `shared/metrics/new-metric.ts`
2. Export `MetricDefinition` object
3. Add to `shared/metrics/index.ts`
4. Update tests if needed
5. Commit with `feat: add NewMetric metric`

**Add a shadcn/ui Component:**
```bash
npx shadcn-ui@latest add <component-name>
# Component will be added to client/src/components/ui/
```

**Debug Failed Test:**
```bash
# Unit test
npm run test:ui  # Interactive mode

# E2E test
npm run test:e2e:debug  # Playwright Inspector
```

**Fix Security Vulnerability:**
```bash
npm audit             # See all vulnerabilities
npm audit fix         # Auto-fix if available
npm audit --production  # Check production only
```

**Update Dependencies:**
```bash
npm outdated          # Check for updates
npm update            # Update within semver range
npm install <pkg>@latest  # Update specific package
```

### Path Aliases Cheat Sheet
```typescript
import '@/components/...'     // → client/src/components/
import '@/lib/...'            // → client/src/lib/
import '@/hooks/...'          // → client/src/hooks/
import '@/pages/...'          // → client/src/pages/
import '@shared/...'          // → shared/
import '@assets/...'          // → attached_assets/
```

### Environment Variables Template
```bash
# Required
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=your-secret-here-min-32-chars

# Optional
NODE_ENV=development  # or production
PORT=5000             # or 3000, 3001, 3003
```

---

**Last Updated**: 2025-12-28
**Node Version**: >=20.0.0
**Package Manager**: npm
