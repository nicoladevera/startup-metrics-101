# Startup Metrics Explained

## Overview

Startup Metrics Explained is an educational web application designed to help startup employees and aspiring entrepreneurs understand 15 essential business metrics. The platform provides interactive calculators, clear explanations, real-world examples, and visual feedback to make complex startup metrics accessible and understandable. The application features a clean, modern interface that balances professionalism with approachability, drawing inspiration from educational platforms like Khan Academy while maintaining the polish of professional dashboard tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured with custom plugins for Replit integration
- Wouter for client-side routing (lightweight alternative to React Router)

**UI Component System:**
- Shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Design system follows the "new-york" Shadcn style with custom color palette and spacing system

**State Management:**
- TanStack Query (React Query) for server state management and caching
- React hooks and local component state for UI state
- Custom TooltipProvider and ThemeProvider contexts for global UI state

**Key Frontend Features:**
- Interactive metric calculators with real-time feedback
- Dynamic tooltip system for technical term definitions
- Chart.js integration for data visualization (line, bar, and gauge charts)
- Responsive design supporting both desktop and mobile viewports
- Dark/light theme support with persistent user preference

**Design System:**
- Color palette: Deep blue primary (#2563EB), semantic colors for feedback (green/success, amber/warning, red/error)
- Typography: System font stack with monospace fonts for formulas
- Spacing: Consistent 4px-based scale (4, 8, 12, 20, 30, 40, 50)
- Component styling includes hover/active elevation states for interactive feedback

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- Development/production mode switching via NODE_ENV
- Custom middleware for request logging and error handling
- Vite middleware integration in development mode for HMR

**Application Structure:**
- Monorepo-style architecture with shared types between client and server
- `/server` directory: Express application, routes, and storage layer
- `/client` directory: React application and UI components
- `/shared` directory: Shared TypeScript types, schemas, and business logic

**Data Layer:**
- In-memory storage implementation (MemStorage class) for development
- Interface-based storage abstraction (IStorage) for easy database migration
- Currently implements basic user CRUD operations
- Prepared for Drizzle ORM integration with PostgreSQL (schema and config present)

**API Design:**
- RESTful API pattern with `/api` prefix for all endpoints
- JSON request/response format
- Centralized error handling middleware
- Request/response logging for debugging

### External Dependencies

**Database:**
- PostgreSQL configured via Drizzle ORM (ready for production use)
- Neon serverless PostgreSQL driver (@neondatabase/serverless)
- Database schema defined using Drizzle with Zod validation
- Migration system configured (drizzle-kit) with migration files in `/migrations`

**Third-Party Libraries:**
- Chart.js for data visualization and metric charts
- React Hook Form with Zod resolvers for form validation
- date-fns for date manipulation and formatting
- Lucide React for consistent iconography

**UI Component Dependencies:**
- @radix-ui/* packages for accessible UI primitives (25+ components including dialogs, dropdowns, tooltips, etc.)
- cmdk for command palette functionality
- vaul for drawer component
- embla-carousel-react for carousel functionality
- react-day-picker for calendar/date selection

**Development Tools:**
- TypeScript for type safety across the stack
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing
- Replit-specific plugins for development experience

**Session Management:**
- connect-pg-simple for PostgreSQL session store (configured but not yet active)
- Express session middleware ready for authentication implementation

**Notable Architecture Decisions:**
- Metrics are defined as data structures (shared/metrics.ts) rather than hardcoded, allowing for easy extension
- Calculator logic is colocated with metric definitions for maintainability
- Tooltip definitions centralized in a dictionary for consistency
- Theme system uses CSS variables for easy customization
- Component path aliases (@/, @shared/, @assets/) for cleaner imports