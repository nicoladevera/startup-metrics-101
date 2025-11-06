/**
 * Server Configuration Constants
 */

// Port configuration with fallbacks
export const DEFAULT_PORT = 5000;
export const FALLBACK_PORTS = [5000, 3000, 3001, 3003] as const;

// Server timeouts (in milliseconds)
export const SERVER_TIMEOUT = 30000; // 30 seconds
export const KEEP_ALIVE_TIMEOUT = 5000; // 5 seconds

// Request limits
export const MAX_JSON_SIZE = '10mb';
export const MAX_URL_ENCODED_SIZE = '10mb';

// Logging
export const LOG_LINE_MAX_LENGTH = 80;

/**
 * Environment Constants
 */
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Session Configuration
 */
export const SESSION_CONFIG = {
  SECRET_MIN_LENGTH: 32,
  MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;
