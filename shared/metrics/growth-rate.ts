import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const GROWTH_RATE_METRIC: Metric = {
    id: 'growth-rate',
    name: 'Growth Rate (MoM)',
    iconName: 'LineChart',
    shortDescription: 'Month-over-month revenue growth',
    definition: 'Month-over-month growth rate measures the percentage increase in revenue (usually MRR) from one month to the next. It\'s the primary metric for tracking business momentum.',
    whyItMatters: 'Growth rate determines your trajectory and fundraising potential. Early-stage startups should aim for 15-20% MoM growth. Sustained high growth rates prove product-market fit and attract investor attention. Declining growth rates signal problems.',
    formula: 'MoM Growth Rate = ((This Month MRR - Last Month MRR) ÷ Last Month MRR) × 100',
    formulaPlain: 'Month-over-month growth rate equals current month revenue minus previous month revenue, divided by previous month revenue, times 100',
    sampleCalculation: {
      description: 'Last month MRR was $50K, this month is $60K',
      steps: [
        'Last month MRR: $50,000',
        'This month MRR: $60,000',
        'Growth = $60K - $50K = $10K',
        'MoM Growth Rate = ($10K ÷ $50K) × 100 = 20%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'lastMonth', label: 'Last Month MRR', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 50000, prefix: '$' },
        { name: 'thisMonth', label: 'This Month MRR', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 60000, prefix: '$' }
      ],
      calculateFn: (inputs) => safeDivide((inputs.thisMonth - inputs.lastMonth) * 100, inputs.lastMonth),
      formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(1)}%`,
      getBenchmark: (result) => {
        if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Last month MRR is required to calculate growth rate. Enter your previous month\'s revenue to see your growth rate.' };
        if (result >= 15) return { threshold: 15, color: 'success', label: 'Excellent', feedback: 'Outstanding growth! You\'re on a strong trajectory.' };
        if (result >= 10) return { threshold: 10, color: 'success', label: 'Good', feedback: 'Solid growth rate indicating healthy business momentum.' };
        if (result >= 5) return { threshold: 5, color: 'warning', label: 'Moderate', feedback: 'Moderate growth. Look for ways to accelerate.' };
        if (result >= 0) return { threshold: 0, color: 'warning', label: 'Slow', feedback: 'Low growth. Investigate and address growth obstacles.' };
        return { threshold: -1, color: 'error', label: 'Declining', feedback: 'Negative growth! Immediate action needed to reverse the trend.' };
      }
    },
    tips: [
      'Early-stage SaaS should aim for 15-20% MoM growth',
      'Growth naturally slows as you scale - 5-10% is good at $10M+ ARR',
      'Track growth by cohort and acquisition channel for deeper insights',
      'Compound monthly growth: 15% MoM = 5x growth annually',
      'Watch for growth vs retention tradeoff - sustainable growth requires both'
    ],
    commonMistakes: [
      'Cherry-picking exceptional months instead of showing consistent trends',
      'Not accounting for seasonality in month-over-month comparisons',
      'Confusing gross growth with net growth (must subtract churn)',
      'Celebrating growth that comes from unsustainable discounting or burn'
    ],
    hasChart: true,
    chartType: 'line'
  };
