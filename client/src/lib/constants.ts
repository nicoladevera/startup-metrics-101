/**
 * Application Constants
 */

// Application Metadata
export const APP_NAME = 'Startup Metrics 101';
export const APP_DESCRIPTION = 'Learn 15 essential startup financial metrics';

// Local Storage Keys
export const STORAGE_KEYS = {
  BUSINESS_TYPE: 'businessType',
  THEME: 'theme',
} as const;

// Business Types
export const BUSINESS_TYPES = {
  B2B: 'B2B',
  B2C: 'B2C',
} as const;

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (should match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// API Configuration
export const API = {
  BASE_URL: '/api',
  TIMEOUT: 30000, // 30 seconds
} as const;

// Validation Limits
export const VALIDATION = {
  MIN_INPUT_VALUE: 0,
  MAX_INPUT_VALUE: Number.MAX_SAFE_INTEGER,
  DECIMAL_PLACES: 2,
} as const;

// Chart Configuration
export const CHART = {
  DEFAULT_MONTHS: 6,
  ANIMATION_DURATION: 300,
  COLORS: {
    PRIMARY: '#2563EB',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
  },
} as const;

// URL Routes
export const ROUTES = {
  HOME: '/',
  METRIC: '/metric/:id',
  NOT_FOUND: '/404',
} as const;

// Metric Count
export const METRICS_COUNT = 15;

// Calculator Input Limits (these can be imported by individual metrics)
export const INPUT_LIMITS = {
  CUSTOMERS: { MIN: 0, MAX: 10000, STEP: 1 },
  REVENUE: { MIN: 0, MAX: 10000000, STEP: 1000 },
  PERCENTAGE: { MIN: 0, MAX: 100, STEP: 0.1 },
  CURRENCY: { MIN: 0, MAX: 10000000, STEP: 1 },
} as const;
