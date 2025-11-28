import type { Metric } from './types';

export const BURN_RATE_METRIC: Metric = {
    id: 'burn-rate',
    name: 'Burn Rate',
    iconName: 'Flame',
    shortDescription: 'Monthly cash spend rate',
    definition: 'Burn rate is the amount of cash your company spends each month. It\'s the speed at which you\'re using up your cash reserves, typically expressed as a negative number showing monthly cash outflow.',
    whyItMatters: 'Burn rate determines how long your startup can survive before running out of money. Investors closely monitor burn rate to assess operational efficiency and runway. High burn is acceptable if it drives proportional growth, but unsustainable burn is a red flag.',
    formula: 'Burn Rate = Monthly Expenses - Monthly Revenue',
    formulaPlain: 'Monthly burn rate equals your total monthly expenses minus monthly revenue',
    sampleCalculation: {
      description: 'A startup spends $100K/month with $30K revenue',
      steps: [
        'Monthly expenses: $100,000',
        'Monthly revenue: $30,000',
        'Burn Rate = $100,000 - $30,000 = $70,000/month'
      ]
    },
    calculator: {
      inputs: [
        { name: 'expenses', label: 'Monthly Expenses', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'revenue', label: 'Monthly Revenue', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 30000, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.expenses - inputs.revenue,
      formatResult: (result) => result === null ? 'N/A' : `$${result.toLocaleString('en-US', { maximumFractionDigits: 2 })}/month`,
      getBenchmark: (result) => {
        if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Data is required to calculate burn rate.' };
        const ratio = result / 100000;
        if (ratio <= 0.3) return { threshold: 30000, color: 'success', label: 'Low Burn', feedback: 'Excellent capital efficiency! You\'re managing expenses well.' };
        if (ratio <= 0.7) return { threshold: 70000, color: 'warning', label: 'Moderate Burn', feedback: 'Manageable burn - ensure it\'s driving proportional growth.' };
        return { threshold: 70001, color: 'error', label: 'High Burn', feedback: 'High burn rate - focus on path to profitability or ensure funding runway is sufficient.' };
      }
    },
    tips: [
      'Track gross burn (total spend) and net burn (spend minus revenue) separately',
      'Reduce burn by 25-30% when approaching 6 months of runway remaining',
      'Aim for burn that supports 3x revenue growth year-over-year',
      'Keep burn predictable - avoid large month-to-month variations',
      'Benchmark: Enterprise SaaS should aim for 2-3x burn-to-ARR ratio'
    ],
    commonMistakes: [
      'Not accounting for irregular expenses like annual software licenses',
      'Ignoring upcoming hires or expense increases in burn projections',
      'Confusing cash burn with accounting losses (use actual cash flow)',
      'Not separating one-time expenses from recurring monthly burn'
    ],
    hasChart: true,
    chartType: 'gauge'
  };
