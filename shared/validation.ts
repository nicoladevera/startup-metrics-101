import { z } from 'zod';

/**
 * Base schema for calculator inputs
 * Ensures values are numbers within valid ranges
 */
export const createInputSchema = (min: number, max: number) => {
  return z.number({
    required_error: "This field is required",
    invalid_type_error: "Must be a number",
  })
  .min(min, { message: `Value must be at least ${min}` })
  .max(max, { message: `Value must not exceed ${max}` })
  .finite({ message: "Value must be a finite number" });
};

/**
 * Validation schemas for each metric's calculator inputs
 */
export const MetricValidationSchemas = {
  mrr: z.object({
    customers: createInputSchema(0, 10000),
    avgRevenue: createInputSchema(0, 1000),
  }),

  arr: z.object({
    mrr: createInputSchema(0, 1000000),
  }),

  'burn-rate': z.object({
    expenses: createInputSchema(0, 1000000),
    revenue: createInputSchema(0, 1000000),
  }),

  runway: z.object({
    cash: createInputSchema(0, 10000000),
    burn: createInputSchema(1, 500000),
  }),

  cac: z.object({
    marketing: createInputSchema(0, 500000),
    customers: createInputSchema(1, 10000),
  }),

  ltv: z.object({
    avgRevenue: createInputSchema(0, 1000),
    churnRate: createInputSchema(0.1, 50),
  }),

  'ltv-cac-ratio': z.object({
    ltv: createInputSchema(0, 50000),
    cac: createInputSchema(1, 20000),
  }),

  'churn-rate': z.object({
    starting: createInputSchema(1, 100000),
    lost: createInputSchema(0, 50000),
  }),

  nrr: z.object({
    starting: createInputSchema(0, 1000000),
    expansion: createInputSchema(0, 500000),
    churn: createInputSchema(0, 500000),
  }),

  'gross-margin': z.object({
    revenue: createInputSchema(0, 10000000),
    cogs: createInputSchema(0, 5000000),
  }),

  'contribution-margin': z.object({
    revenue: createInputSchema(0, 10000000),
    cogs: createInputSchema(0, 5000000),
    variable: createInputSchema(0, 5000000),
  }),

  'net-profit-margin': z.object({
    revenue: createInputSchema(0, 10000000),
    cogs: createInputSchema(0, 5000000),
    opex: createInputSchema(0, 5000000),
  }),

  'growth-rate': z.object({
    lastMonth: createInputSchema(0, 10000000),
    thisMonth: createInputSchema(0, 10000000),
  }),

  'rule-of-40': z.object({
    growthRate: createInputSchema(-50, 200),
    profitMargin: createInputSchema(-100, 100),
  }),

  'unit-economics': z.object({
    ltv: createInputSchema(0, 50000),
    cac: createInputSchema(1, 20000),
  }),
} as const;

/**
 * Type helper to get the validation schema for a metric
 */
export type MetricId = keyof typeof MetricValidationSchemas;

/**
 * Validates calculator inputs for a specific metric
 * @param metricId - The ID of the metric
 * @param inputs - The input values to validate
 * @returns Validation result with parsed data or errors
 */
export function validateMetricInputs(
  metricId: string,
  inputs: Record<string, number>
) {
  const schema = MetricValidationSchemas[metricId as MetricId];

  if (!schema) {
    return {
      success: false,
      error: `No validation schema found for metric: ${metricId}`,
    };
  }

  const result = schema.safeParse(inputs);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  } else {
    return {
      success: false,
      error: result.error.format(),
    };
  }
}

/**
 * Sanitizes a single input value
 * Removes any potentially harmful content and ensures it's a valid number
 */
export function sanitizeNumericInput(value: any): number {
  // Explicitly reject null and undefined
  if (value === null || value === undefined) {
    throw new Error('Invalid number input');
  }

  // Convert to number
  const num = Number(value);

  // Check if it's a valid number
  if (isNaN(num) || !isFinite(num)) {
    throw new Error('Invalid number input');
  }

  return num;
}

/**
 * Sanitizes all calculator inputs
 */
export function sanitizeCalculatorInputs(
  inputs: Record<string, any>
): Record<string, number> {
  const sanitized: Record<string, number> = {};

  for (const [key, value] of Object.entries(inputs)) {
    sanitized[key] = sanitizeNumericInput(value);
  }

  return sanitized;
}
