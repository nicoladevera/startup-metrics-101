import { describe, it, expect } from 'vitest';
import {
  createInputSchema,
  validateMetricInputs,
  sanitizeNumericInput,
  sanitizeCalculatorInputs,
} from '../shared/validation';

describe('Input Validation', () => {
  describe('createInputSchema', () => {
    it('should accept values within range', () => {
      const schema = createInputSchema(0, 100);
      expect(schema.safeParse(50).success).toBe(true);
    });

    it('should reject values below minimum', () => {
      const schema = createInputSchema(0, 100);
      const result = schema.safeParse(-1);
      expect(result.success).toBe(false);
    });

    it('should reject values above maximum', () => {
      const schema = createInputSchema(0, 100);
      const result = schema.safeParse(101);
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric values', () => {
      const schema = createInputSchema(0, 100);
      const result = schema.safeParse('not a number');
      expect(result.success).toBe(false);
    });

    it('should reject infinite values', () => {
      const schema = createInputSchema(0, 100);
      const result = schema.safeParse(Infinity);
      expect(result.success).toBe(false);
    });

    it('should reject NaN', () => {
      const schema = createInputSchema(0, 100);
      const result = schema.safeParse(NaN);
      expect(result.success).toBe(false);
    });
  });

  describe('validateMetricInputs', () => {
    it('should validate MRR inputs correctly', () => {
      const result = validateMetricInputs('mrr', {
        customers: 200,
        avgRevenue: 50,
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid MRR inputs', () => {
      const result = validateMetricInputs('mrr', {
        customers: -1,
        avgRevenue: 50,
      });
      expect(result.success).toBe(false);
    });

    it('should validate CAC inputs correctly', () => {
      const result = validateMetricInputs('cac', {
        marketing: 50000,
        customers: 100,
      });
      expect(result.success).toBe(true);
    });

    it('should reject CAC with zero customers', () => {
      const result = validateMetricInputs('cac', {
        marketing: 50000,
        customers: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should validate LTV inputs correctly', () => {
      const result = validateMetricInputs('ltv', {
        avgRevenue: 100,
        churnRate: 5,
      });
      expect(result.success).toBe(true);
    });

    it('should reject LTV with churn rate below minimum', () => {
      const result = validateMetricInputs('ltv', {
        avgRevenue: 100,
        churnRate: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should validate Burn Rate inputs correctly', () => {
      const result = validateMetricInputs('burn-rate', {
        expenses: 100000,
        revenue: 30000,
      });
      expect(result.success).toBe(true);
    });

    it('should validate Runway inputs correctly', () => {
      const result = validateMetricInputs('runway', {
        cash: 500000,
        burn: 50000,
      });
      expect(result.success).toBe(true);
    });

    it('should reject Runway with zero burn', () => {
      const result = validateMetricInputs('runway', {
        cash: 500000,
        burn: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should validate Churn Rate inputs correctly', () => {
      const result = validateMetricInputs('churn-rate', {
        starting: 200,
        lost: 10,
      });
      expect(result.success).toBe(true);
    });

    it('should validate NRR inputs correctly', () => {
      const result = validateMetricInputs('nrr', {
        starting: 100000,
        expansion: 30000,
        churn: 10000,
      });
      expect(result.success).toBe(true);
    });

    it('should validate Gross Margin inputs correctly', () => {
      const result = validateMetricInputs('gross-margin', {
        revenue: 100000,
        cogs: 20000,
      });
      expect(result.success).toBe(true);
    });

    it('should validate Contribution Margin inputs correctly', () => {
      const result = validateMetricInputs('contribution-margin', {
        revenue: 100000,
        cogs: 20000,
        variable: 30000,
      });
      expect(result.success).toBe(true);
    });

    it('should validate Net Profit Margin inputs correctly', () => {
      const result = validateMetricInputs('net-profit-margin', {
        revenue: 500000,
        cogs: 100000,
        opex: 350000,
      });
      expect(result.success).toBe(true);
    });

    it('should validate Growth Rate inputs correctly', () => {
      const result = validateMetricInputs('growth-rate', {
        lastMonth: 50000,
        thisMonth: 60000,
      });
      expect(result.success).toBe(true);
    });

    it('should validate Rule of 40 inputs correctly', () => {
      const result = validateMetricInputs('rule-of-40', {
        growthRate: 50,
        profitMargin: -10,
      });
      expect(result.success).toBe(true);
    });

    it('should validate Unit Economics inputs correctly', () => {
      const result = validateMetricInputs('unit-economics', {
        ltv: 3000,
        cac: 1000,
      });
      expect(result.success).toBe(true);
    });

    it('should return error for unknown metric ID', () => {
      const result = validateMetricInputs('unknown-metric', {
        foo: 123,
      });
      expect(result.success).toBe(false);
    });

    it('should reject inputs exceeding maximum values', () => {
      const result = validateMetricInputs('mrr', {
        customers: 20000, // max is 10000
        avgRevenue: 50,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('sanitizeNumericInput', () => {
    it('should convert string numbers to numbers', () => {
      expect(sanitizeNumericInput('123')).toBe(123);
      expect(sanitizeNumericInput('45.67')).toBe(45.67);
    });

    it('should pass through valid numbers', () => {
      expect(sanitizeNumericInput(123)).toBe(123);
      expect(sanitizeNumericInput(45.67)).toBe(45.67);
    });

    it('should throw on invalid inputs', () => {
      expect(() => sanitizeNumericInput('not a number')).toThrow('Invalid number input');
      expect(() => sanitizeNumericInput(NaN)).toThrow('Invalid number input');
      expect(() => sanitizeNumericInput(Infinity)).toThrow('Invalid number input');
      expect(() => sanitizeNumericInput(undefined)).toThrow('Invalid number input');
      expect(() => sanitizeNumericInput(null)).toThrow('Invalid number input');
    });

    it('should handle negative numbers', () => {
      expect(sanitizeNumericInput('-10')).toBe(-10);
      expect(sanitizeNumericInput(-10)).toBe(-10);
    });

    it('should handle zero', () => {
      expect(sanitizeNumericInput(0)).toBe(0);
      expect(sanitizeNumericInput('0')).toBe(0);
    });
  });

  describe('sanitizeCalculatorInputs', () => {
    it('should sanitize all inputs in an object', () => {
      const inputs = {
        customers: '200',
        avgRevenue: 50,
      };
      const result = sanitizeCalculatorInputs(inputs);
      expect(result).toEqual({
        customers: 200,
        avgRevenue: 50,
      });
    });

    it('should throw if any input is invalid', () => {
      const inputs = {
        customers: '200',
        avgRevenue: 'invalid',
      };
      expect(() => sanitizeCalculatorInputs(inputs)).toThrow('Invalid number input');
    });

    it('should handle empty object', () => {
      const result = sanitizeCalculatorInputs({});
      expect(result).toEqual({});
    });

    it('should preserve decimal values', () => {
      const inputs = {
        value1: '123.45',
        value2: 67.89,
      };
      const result = sanitizeCalculatorInputs(inputs);
      expect(result).toEqual({
        value1: 123.45,
        value2: 67.89,
      });
    });
  });
});
