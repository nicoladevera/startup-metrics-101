import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const NET_PROFIT_MARGIN_METRIC: Metric = {
    id: 'net-profit-margin',
    name: 'Net Profit Margin',
    iconName: 'DollarSign',
    shortDescription: 'Bottom-line profitability',
    definition: 'Net profit margin is the percentage of revenue that becomes actual profit after all expenses - both variable and fixed. It\'s the ultimate measure of business profitability and efficiency.',
    whyItMatters: 'Net profit margin shows true profitability and sustainability. While startups often run at a loss during growth phase, the path to positive net margins is crucial. Public companies and mature startups are judged heavily on this metric for long-term viability.',
    formula: 'Net Profit Margin = ((Revenue - All Expenses) ÷ Revenue) × 100',
    formulaPlain: 'Net profit margin equals revenue minus all expenses including COGS, operating expenses, and overhead, divided by revenue, times 100',
    sampleCalculation: {
      description: 'Revenue $500K, COGS $100K, operating expenses $350K',
      steps: [
        'Revenue: $500,000',
        'COGS: $100,000',
        'Operating expenses: $350,000',
        'Net Profit = $500K - $100K - $350K = $50K',
        'Net Profit Margin = ($50K ÷ $500K) × 100 = 10%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'revenue', label: 'Total Revenue', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 500000, prefix: '$' },
        { name: 'cogs', label: 'Cost of Goods Sold', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'opex', label: 'Operating Expenses', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 350000, prefix: '$' }
      ],
      calculateFn: (inputs) => safeDivide((inputs.revenue - inputs.cogs - inputs.opex) * 100, inputs.revenue),
      formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(1)}%`,
      getBenchmark: (result) => {
        if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Revenue is required to calculate this metric. Enter your revenue to see your net profit margin.' };
        if (result >= 20) return { threshold: 20, color: 'success', label: 'Excellent', feedback: 'Outstanding profitability! Strong business fundamentals.' };
        if (result >= 10) return { threshold: 10, color: 'success', label: 'Good', feedback: 'Healthy profit margin. You\'re operating efficiently.' };
        if (result >= 0) return { threshold: 0, color: 'warning', label: 'Breakeven', feedback: 'Breakeven or slight profit. Good for early-stage companies.' };
        return { threshold: -1, color: 'error', label: 'Negative', feedback: 'Operating at a loss. Acceptable for growth-stage if improving quarterly.' };
      }
    },
    tips: [
      'Early-stage startups often have negative margins while growing',
      'Mature SaaS companies should target 15-25% net profit margins',
      'Track the trend - improving margins signal operational efficiency',
      'Balance profitability with growth - premature profit focus can limit scale',
      'Rule of 40: Growth rate + profit margin should exceed 40%'
    ],
    commonMistakes: [
      'Comparing net margin across different business stages (early vs mature)',
      'Not accounting for one-time expenses or revenue in calculations',
      'Ignoring the cash vs accrual difference (use cash-based for startups)',
      'Focusing only on net margin without considering growth rate'
    ]
  };
