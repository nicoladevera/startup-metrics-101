import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const UNIT_ECONOMICS_METRIC: Metric = {
    id: 'unit-economics',
    name: 'Unit Economics',
    iconName: 'Calculator',
    shortDescription: 'Profitability per customer',
    definition: 'Unit economics examines the revenue and costs associated with a single customer or transaction. It determines if your business model is fundamentally profitable at the individual unit level before considering scale.',
    whyItMatters: 'Unit economics reveals whether your business can be profitable. Positive unit economics means each customer eventually generates more than they cost. Negative unit economics can\'t be fixed by scale - you just lose more money faster.',
    formula: 'Unit Economics = (LTV - CAC) ÷ CAC × 100',
    formulaPlain: 'Unit economics return equals lifetime value minus acquisition cost, divided by acquisition cost, times 100',
    sampleCalculation: {
      description: 'LTV is $3,000, CAC is $1,000',
      steps: [
        'Lifetime Value: $3,000',
        'Customer Acquisition Cost: $1,000',
        'Profit per customer = $3,000 - $1,000 = $2,000',
        'Unit Economics = ($2,000 ÷ $1,000) × 100 = 200% return'
      ]
    },
    calculator: {
      inputs: [
        { name: 'ltv', label: 'Lifetime Value (LTV)', unit: '$', min: 0, max: 50000, step: 100, defaultValue: 3000, prefix: '$' },
        { name: 'cac', label: 'Customer Acquisition Cost', unit: '$', min: 0, max: 20000, step: 50, defaultValue: 1000, prefix: '$' }
      ],
      calculateFn: (inputs) => safeDivide((inputs.ltv - inputs.cac) * 100, inputs.cac),
      formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(0)}% return`,
      getBenchmark: (result) => {
        if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'CAC is required to calculate unit economics. Enter your customer acquisition cost to see your return per customer.' };
        if (result >= 200) return { threshold: 200, color: 'success', label: 'Excellent', feedback: 'Excellent unit economics! Each customer is highly profitable.' };
        if (result >= 50) return { threshold: 50, color: 'warning', label: 'Acceptable', feedback: 'Positive but aim for 200%+ return on acquisition investment.' };
        if (result >= 0) return { threshold: 0, color: 'warning', label: 'Marginal', feedback: 'Barely profitable per customer. Improve LTV or reduce CAC.' };
        return { threshold: -1, color: 'error', label: 'Negative', feedback: 'Losing money on each customer! This can\'t be fixed with scale.' };
      }
    },
    tips: [
      'Healthy unit economics means you make at least $2 for every $1 spent on CAC',
      'Calculate separately for each customer segment and acquisition channel',
      'Include gross margin in calculations for more accurate unit economics',
      'Track payback period - how long to recover CAC from customer revenue',
      'Positive unit economics is prerequisite for scaling spend profitably'
    ],
    commonMistakes: [
      'Not including all acquisition costs (salaries, tools, overhead)',
      'Using gross revenue instead of gross profit for LTV',
      'Ignoring the time value of money in long payback scenarios',
      'Assuming unit economics will improve with scale without evidence'
    ],
    hasChart: true,
    chartType: 'bar'
  };
