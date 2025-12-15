import { describe, it, expect } from 'vitest';
import { METRICS, getMetricById } from '../shared/metrics';

describe('Metric Calculator Functions', () => {
  describe('MRR (Monthly Recurring Revenue)', () => {
    const metric = getMetricById('mrr')!;

    it('should calculate MRR correctly', () => {
      const result = metric.calculator.calculateFn({ customers: 200, avgRevenue: 50 });
      expect(result).toBe(10000);
    });

    it('should handle zero customers', () => {
      const result = metric.calculator.calculateFn({ customers: 0, avgRevenue: 50 });
      expect(result).toBe(0);
    });

    it('should format result with currency and locale', () => {
      const formatted = metric.calculator.formatResult(10000);
      expect(formatted).toBe('$10,000');
    });

    it('should return correct benchmark for high MRR', () => {
      const benchmark = metric.calculator.getBenchmark(150000);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return correct benchmark for low MRR', () => {
      const benchmark = metric.calculator.getBenchmark(500);
      expect(benchmark.color).toBe('error');
      expect(benchmark.label).toBe('Getting Started');
    });
  });

  describe('ARR (Annual Recurring Revenue)', () => {
    const metric = getMetricById('arr')!;

    it('should calculate ARR correctly', () => {
      const result = metric.calculator.calculateFn({ mrr: 50000 });
      expect(result).toBe(600000);
    });

    it('should format result correctly', () => {
      const formatted = metric.calculator.formatResult(600000);
      expect(formatted).toBe('$600,000');
    });

    it('should return success for $10M+ ARR', () => {
      const benchmark = metric.calculator.getBenchmark(10000000);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Scale Stage');
    });
  });

  describe('Burn Rate', () => {
    const metric = getMetricById('burn-rate')!;

    it('should calculate burn rate correctly', () => {
      const result = metric.calculator.calculateFn({ expenses: 100000, revenue: 30000 });
      expect(result).toBe(70000);
    });

    it('should handle negative burn (profitability)', () => {
      const result = metric.calculator.calculateFn({ expenses: 30000, revenue: 100000 });
      expect(result).toBe(-70000);
    });

    it('should format result with /month suffix', () => {
      const formatted = metric.calculator.formatResult(70000);
      expect(formatted).toBe('$70,000/month');
    });

    it('should return success for low burn', () => {
      const benchmark = metric.calculator.getBenchmark(25000);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Low Burn');
    });
  });

  describe('Runway', () => {
    const metric = getMetricById('runway')!;

    it('should calculate runway in months correctly', () => {
      const result = metric.calculator.calculateFn({ cash: 500000, burn: 50000 });
      expect(result).toBe(10);
    });

    it('should format result with months', () => {
      const formatted = metric.calculator.formatResult(10);
      expect(formatted).toBe('10.0 months');
    });

    it('should return critical for low runway', () => {
      const benchmark = metric.calculator.getBenchmark(3);
      expect(benchmark.color).toBe('error');
      expect(benchmark.label).toBe('Critical');
    });

    it('should return healthy for 18+ months runway', () => {
      const benchmark = metric.calculator.getBenchmark(20);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Healthy');
    });

    it('should return null when burn is 0', () => {
      const result = metric.calculator.calculateFn({ cash: 500000, burn: 0 });
      expect(result).toBe(null);
    });
  });

  describe('CAC (Customer Acquisition Cost)', () => {
    const metric = getMetricById('cac')!;

    it('should calculate CAC correctly', () => {
      const result = metric.calculator.calculateFn({ marketing: 50000, customers: 100 });
      expect(result).toBe(500);
    });

    it('should format result as currency', () => {
      const formatted = metric.calculator.formatResult(500);
      expect(formatted).toBe('$500');
    });

    it('should return different benchmarks for B2B vs B2C', () => {
      const b2bBenchmark = metric.calculator.getBenchmark(300, 'B2B');
      const b2cBenchmark = metric.calculator.getBenchmark(300, 'B2C');

      expect(b2bBenchmark.color).toBe('success');
      expect(b2cBenchmark.color).toBe('error');
    });

    it('should return excellent for low B2C CAC', () => {
      const benchmark = metric.calculator.getBenchmark(40, 'B2C');
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return null when customers is 0', () => {
      const result = metric.calculator.calculateFn({ marketing: 50000, customers: 0 });
      expect(result).toBe(null);
    });
  });

  describe('LTV (Lifetime Value)', () => {
    const metric = getMetricById('ltv')!;

    it('should calculate LTV correctly', () => {
      const result = metric.calculator.calculateFn({ avgRevenue: 100, churnRate: 5 });
      expect(result).toBe(2000);
    });

    it('should handle low churn rate', () => {
      const result = metric.calculator.calculateFn({ avgRevenue: 100, churnRate: 1 });
      expect(result).toBe(10000);
    });

    it('should format result as currency', () => {
      const formatted = metric.calculator.formatResult(2000);
      expect(formatted).toBe('$2,000');
    });

    it('should return different benchmarks for B2B vs B2C', () => {
      const b2bBenchmark = metric.calculator.getBenchmark(2000, 'B2B');
      const b2cBenchmark = metric.calculator.getBenchmark(2000, 'B2C');

      expect(b2bBenchmark.label).toBe('Good');
      expect(b2cBenchmark.label).toBe('Excellent');
    });

    it('should return null when churn rate is 0', () => {
      const result = metric.calculator.calculateFn({ avgRevenue: 100, churnRate: 0 });
      expect(result).toBe(null);
    });
  });

  describe('LTV:CAC Ratio', () => {
    const metric = getMetricById('ltv-cac-ratio')!;

    it('should calculate ratio correctly', () => {
      const result = metric.calculator.calculateFn({ ltv: 3000, cac: 1000 });
      expect(result).toBe(3);
    });

    it('should format result as ratio', () => {
      const formatted = metric.calculator.formatResult(3.5);
      expect(formatted).toBe('3.5:1');
    });

    it('should return excellent for 3:1 or better', () => {
      const benchmark = metric.calculator.getBenchmark(3.5);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return poor for ratio below 1.5', () => {
      const benchmark = metric.calculator.getBenchmark(1.2);
      expect(benchmark.color).toBe('error');
      expect(benchmark.label).toBe('Poor');
    });

    it('should return null when CAC is 0', () => {
      const result = metric.calculator.calculateFn({ ltv: 3000, cac: 0 });
      expect(result).toBe(null);
    });
  });

  describe('Churn Rate', () => {
    const metric = getMetricById('churn-rate')!;

    it('should calculate churn rate correctly', () => {
      const result = metric.calculator.calculateFn({ starting: 200, lost: 10 });
      expect(result).toBe(5);
    });

    it('should handle zero churn', () => {
      const result = metric.calculator.calculateFn({ starting: 200, lost: 0 });
      expect(result).toBe(0);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(5);
      expect(formatted).toBe('5.0%');
    });

    it('should return different benchmarks for B2B vs B2C', () => {
      const b2bBenchmark = metric.calculator.getBenchmark(4, 'B2B');
      const b2cBenchmark = metric.calculator.getBenchmark(4, 'B2C');

      expect(b2bBenchmark.color).toBe('warning');
      expect(b2cBenchmark.color).toBe('success');
    });

    it('should return null when starting customers is 0', () => {
      const result = metric.calculator.calculateFn({ starting: 0, lost: 10 });
      expect(result).toBe(null);
    });
  });

  describe('NRR (Net Revenue Retention)', () => {
    const metric = getMetricById('nrr')!;

    it('should calculate NRR correctly', () => {
      const result = metric.calculator.calculateFn({
        starting: 100000,
        expansion: 30000,
        churn: 10000
      });
      expect(result).toBe(120);
    });

    it('should handle negative NRR', () => {
      const result = metric.calculator.calculateFn({
        starting: 100000,
        expansion: 5000,
        churn: 30000
      });
      expect(result).toBe(75);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(120);
      expect(formatted).toBe('120%');
    });

    it('should return excellent for 120%+ NRR', () => {
      const benchmark = metric.calculator.getBenchmark(125);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return null when starting revenue is 0', () => {
      const result = metric.calculator.calculateFn({
        starting: 0,
        expansion: 30000,
        churn: 5000
      });
      expect(result).toBe(null);
    });
  });

  describe('Gross Margin', () => {
    const metric = getMetricById('gross-margin')!;

    it('should calculate gross margin correctly', () => {
      const result = metric.calculator.calculateFn({ revenue: 100000, cogs: 20000 });
      expect(result).toBe(80);
    });

    it('should handle zero COGS', () => {
      const result = metric.calculator.calculateFn({ revenue: 100000, cogs: 0 });
      expect(result).toBe(100);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(80);
      expect(formatted).toBe('80.0%');
    });

    it('should return different benchmarks for B2B vs B2C', () => {
      const b2bBenchmark = metric.calculator.getBenchmark(75, 'B2B');
      const b2cBenchmark = metric.calculator.getBenchmark(75, 'B2C');

      expect(b2bBenchmark.label).toBe('Excellent');
      expect(b2cBenchmark.label).toBe('Excellent');
    });

    it('should return null when revenue is 0', () => {
      const result = metric.calculator.calculateFn({ revenue: 0, cogs: 20000 });
      expect(result).toBe(null);
    });
  });

  describe('Contribution Margin', () => {
    const metric = getMetricById('contribution-margin')!;

    it('should calculate contribution margin correctly', () => {
      const result = metric.calculator.calculateFn({
        revenue: 100000,
        cogs: 20000,
        variable: 30000
      });
      expect(result).toBe(50);
    });

    it('should handle negative margin', () => {
      const result = metric.calculator.calculateFn({
        revenue: 100000,
        cogs: 60000,
        variable: 50000
      });
      expect(result).toBe(-10);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(50);
      expect(formatted).toBe('50.0%');
    });

    it('should return different benchmarks for B2B vs B2C', () => {
      const b2bBenchmark = metric.calculator.getBenchmark(65, 'B2B');
      const b2cBenchmark = metric.calculator.getBenchmark(35, 'B2C');

      expect(b2bBenchmark.label).toBe('Excellent');
      expect(b2cBenchmark.label).toBe('Good');
    });

    it('should return negative warning for negative margin', () => {
      const benchmark = metric.calculator.getBenchmark(-5, 'B2B');
      expect(benchmark.color).toBe('error');
      expect(benchmark.label).toBe('Negative');
    });

    it('should return null when revenue is 0', () => {
      const result = metric.calculator.calculateFn({
        revenue: 0,
        cogs: 20000,
        variable: 10000
      });
      expect(result).toBe(null);
    });
  });

  describe('Net Profit Margin', () => {
    const metric = getMetricById('net-profit-margin')!;

    it('should calculate net profit margin correctly', () => {
      const result = metric.calculator.calculateFn({
        revenue: 500000,
        cogs: 100000,
        opex: 350000
      });
      expect(result).toBe(10);
    });

    it('should handle negative profit', () => {
      const result = metric.calculator.calculateFn({
        revenue: 100000,
        cogs: 50000,
        opex: 80000
      });
      expect(result).toBe(-30);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(10);
      expect(formatted).toBe('10.0%');
    });

    it('should return excellent for 20%+ margin', () => {
      const benchmark = metric.calculator.getBenchmark(25);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return null when revenue is 0', () => {
      const result = metric.calculator.calculateFn({
        revenue: 0,
        cogs: 100000,
        opex: 350000
      });
      expect(result).toBe(null);
    });
  });

  describe('Growth Rate (MoM)', () => {
    const metric = getMetricById('growth-rate')!;

    it('should calculate growth rate correctly', () => {
      const result = metric.calculator.calculateFn({ lastMonth: 50000, thisMonth: 60000 });
      expect(result).toBe(20);
    });

    it('should handle negative growth', () => {
      const result = metric.calculator.calculateFn({ lastMonth: 60000, thisMonth: 50000 });
      expect(result).toBeCloseTo(-16.67, 1);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(20);
      expect(formatted).toBe('20.0%');
    });

    it('should return excellent for 15%+ growth', () => {
      const benchmark = metric.calculator.getBenchmark(18);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return null when last month revenue is 0', () => {
      const result = metric.calculator.calculateFn({ lastMonth: 0, thisMonth: 50000 });
      expect(result).toBe(null);
    });
  });

  describe('Rule of 40', () => {
    const metric = getMetricById('rule-of-40')!;

    it('should calculate Rule of 40 correctly', () => {
      const result = metric.calculator.calculateFn({ growthRate: 50, profitMargin: -10 });
      expect(result).toBe(40);
    });

    it('should handle both positive values', () => {
      const result = metric.calculator.calculateFn({ growthRate: 30, profitMargin: 20 });
      expect(result).toBe(50);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(40);
      expect(formatted).toBe('40%');
    });

    it('should return excellent for 40%+', () => {
      const benchmark = metric.calculator.getBenchmark(45);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return error for low scores', () => {
      const benchmark = metric.calculator.getBenchmark(15);
      expect(benchmark.color).toBe('error');
      expect(benchmark.label).toBe('Below Target');
    });
  });

  describe('Unit Economics', () => {
    const metric = getMetricById('unit-economics')!;

    it('should calculate unit economics return correctly', () => {
      const result = metric.calculator.calculateFn({ ltv: 3000, cac: 1000 });
      expect(result).toBe(200);
    });

    it('should handle negative return', () => {
      const result = metric.calculator.calculateFn({ ltv: 500, cac: 1000 });
      expect(result).toBe(-50);
    });

    it('should format result with return suffix', () => {
      const formatted = metric.calculator.formatResult(200);
      expect(formatted).toBe('200% return');
    });

    it('should return excellent for 200%+ return', () => {
      const benchmark = metric.calculator.getBenchmark(250);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('Excellent');
    });

    it('should return negative warning for negative return', () => {
      const benchmark = metric.calculator.getBenchmark(-20);
      expect(benchmark.color).toBe('error');
      expect(benchmark.label).toBe('Negative');
    });

    it('should return null when CAC is 0', () => {
      const result = metric.calculator.calculateFn({ ltv: 3000, cac: 0 });
      expect(result).toBe(null);
    });
  });

  describe('CAC Payback Period', () => {
    const metric = getMetricById('cac-payback-period')!;

    it('should calculate payback period correctly', () => {
      const result = metric.calculator.calculateFn({ cac: 1000, arpu: 100, grossMargin: 80 });
      // $100 * 0.8 = $80 gross profit per month
      // 1000 / 80 = 12.5 months
      expect(result).toBe(12.5);
    });

    it('should format result with months suffix', () => {
      const formatted = metric.calculator.formatResult(12.5);
      expect(formatted).toBe('12.5 months');
    });

    it('should return different benchmarks for B2B vs B2C', () => {
      const b2bBenchmark = metric.calculator.getBenchmark(12, 'B2B');
      const b2cBenchmark = metric.calculator.getBenchmark(12, 'B2C');

      expect(b2bBenchmark.label).toBe('Excellent');
      expect(b2cBenchmark.label).toBe('Fair'); // B2C needs faster payback
    });

    it('should return null when ARPU or Gross Margin is 0', () => {
      const result = metric.calculator.calculateFn({ cac: 1000, arpu: 0, grossMargin: 80 });
      expect(result).toBe(null);
    });
  });

  describe('ARPU (Average Revenue Per User)', () => {
    const metric = getMetricById('arpu')!;

    it('should calculate ARPU correctly', () => {
      const result = metric.calculator.calculateFn({ revenue: 50000, users: 500 });
      expect(result).toBe(100);
    });

    it('should format result with currency', () => {
      const formatted = metric.calculator.formatResult(1000.50);
      expect(formatted).toBe('$1,000.50');
    });

    it('should return different benchmarks for B2B vs B2C', () => {
      const b2bBenchmark = metric.calculator.getBenchmark(100, 'B2B');
      const b2cBenchmark = metric.calculator.getBenchmark(100, 'B2C');

      expect(b2bBenchmark.label).toBe('Good (Mid-Market)');
      expect(b2cBenchmark.label).toBe('High');
    });

    it('should return null when users count is 0', () => {
      const result = metric.calculator.calculateFn({ revenue: 50000, users: 0 });
      expect(result).toBe(null);
    });
  });

  describe('EBITDA Margin', () => {
    const metric = getMetricById('ebitda-margin')!;

    it('should calculate EBITDA margin correctly', () => {
      const result = metric.calculator.calculateFn({ ebitda: 200000, revenue: 1000000 });
      expect(result).toBe(20);
    });

    it('should format result as percentage', () => {
      const formatted = metric.calculator.formatResult(20.5);
      expect(formatted).toBe('20.5%');
    });

    it('should return excellent for high margin', () => {
      const benchmark = metric.calculator.getBenchmark(45);
      expect(benchmark.color).toBe('success');
      expect(benchmark.label).toBe('World Class');
    });

    it('should return warning for burn mode', () => {
      const benchmark = metric.calculator.getBenchmark(-10);
      expect(benchmark.color).toBe('warning');
      expect(benchmark.label).toBe('Burn Mode');
    });

    it('should return error for high burn', () => {
      const benchmark = metric.calculator.getBenchmark(-30);
      expect(benchmark.color).toBe('error');
      expect(benchmark.label).toBe('High Burn');
    });

    it('should return null when revenue is 0', () => {
      const result = metric.calculator.calculateFn({ ebitda: 50000, revenue: 0 });
      expect(result).toBe(null);
    });
  });
});

describe('getMetricById utility', () => {
  it('should return metric when id exists', () => {
    const metric = getMetricById('mrr');
    expect(metric).toBeDefined();
    expect(metric?.id).toBe('mrr');
  });

  it('should return undefined when id does not exist', () => {
    const metric = getMetricById('nonexistent');
    expect(metric).toBeUndefined();
  });
});

describe('METRICS array', () => {
  it('should contain 18 metrics', () => {
    expect(METRICS).toHaveLength(18);
  });

  it('should have unique IDs', () => {
    const ids = METRICS.map(m => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(METRICS.length);
  });

  it('should have all required properties for each metric', () => {
    METRICS.forEach(metric => {
      expect(metric).toHaveProperty('id');
      expect(metric).toHaveProperty('name');
      expect(metric).toHaveProperty('iconName');
      expect(metric).toHaveProperty('shortDescription');
      expect(metric).toHaveProperty('definition');
      expect(metric).toHaveProperty('formula');
      expect(metric).toHaveProperty('calculator');
      expect(metric.calculator).toHaveProperty('inputs');
      expect(metric.calculator).toHaveProperty('calculateFn');
      expect(metric.calculator).toHaveProperty('formatResult');
      expect(metric.calculator).toHaveProperty('getBenchmark');
    });
  });

  it('should have valid calculator inputs for each metric', () => {
    METRICS.forEach(metric => {
      expect(metric.calculator.inputs.length).toBeGreaterThan(0);
      metric.calculator.inputs.forEach(input => {
        expect(input).toHaveProperty('name');
        expect(input).toHaveProperty('label');
        expect(input).toHaveProperty('min');
        expect(input).toHaveProperty('max');
        expect(input).toHaveProperty('step');
        expect(input).toHaveProperty('defaultValue');
        expect(input.min).toBeLessThanOrEqual(input.max);
        expect(input.defaultValue).toBeGreaterThanOrEqual(input.min);
        expect(input.defaultValue).toBeLessThanOrEqual(input.max);
      });
    });
  });
});
