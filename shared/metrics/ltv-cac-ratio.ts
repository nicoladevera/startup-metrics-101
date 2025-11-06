import type { Metric } from './types';

export const LTV_CAC_RATIO_METRIC: Metric = {
    id: 'ltv-cac-ratio',
    name: 'LTV:CAC Ratio',
    iconName: 'Scale',
    shortDescription: 'Unit economics health indicator',
    definition: 'The LTV:CAC ratio compares the lifetime value of a customer to the cost of acquiring them. It\'s the gold standard metric for assessing business model sustainability and unit economics health.',
    whyItMatters: 'This ratio tells you if your business makes financial sense. A 3:1 ratio or higher indicates healthy unit economics where customers generate 3x more value than they cost to acquire. Below 1:1 means you\'re losing money on each customer.',
    formula: 'LTV:CAC Ratio = Customer Lifetime Value ÷ Customer Acquisition Cost',
    formulaPlain: 'LTV to CAC ratio equals lifetime value divided by customer acquisition cost',
    sampleCalculation: {
      description: 'LTV is $3,000 and CAC is $1,000',
      steps: [
        'Customer Lifetime Value: $3,000',
        'Customer Acquisition Cost: $1,000',
        'LTV:CAC = $3,000 ÷ $1,000 = 3:1'
      ]
    },
    calculator: {
      inputs: [
        { name: 'ltv', label: 'Lifetime Value (LTV)', unit: '$', min: 0, max: 50000, step: 100, defaultValue: 3000, prefix: '$' },
        { name: 'cac', label: 'Customer Acquisition Cost (CAC)', unit: '$', min: 1, max: 20000, step: 50, defaultValue: 1000, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.ltv / inputs.cac,
      formatResult: (result) => `${result.toFixed(1)}:1`,
      getBenchmark: (result) => {
        if (result >= 3) return { threshold: 3, color: 'success', label: 'Excellent', feedback: 'Excellent! Your unit economics are healthy and sustainable.' };
        if (result >= 1.5) return { threshold: 1.5, color: 'warning', label: 'Acceptable', feedback: 'Acceptable for early stage, but aim for 3:1 or better long-term.' };
        return { threshold: 0, color: 'error', label: 'Poor', feedback: 'Warning: You\'re spending too much to acquire customers relative to their value.' };
      }
    },
    tips: [
      'Target 3:1 or higher for sustainable SaaS businesses',
      'Above 5:1 might indicate under-investment in growth',
      'Calculate ratio using same time period for both LTV and CAC',
      'Track this ratio by customer segment and acquisition channel',
      'Improve ratio by increasing LTV (reduce churn) or decreasing CAC (better conversion)'
    ],
    commonMistakes: [
      'Comparing gross LTV to CAC instead of using profit margins',
      'Not accounting for the time value of money in long payback periods',
      'Using blended CAC instead of channel-specific CAC for decisions',
      'Celebrating a high ratio that comes from under-spending on growth'
    ],
    hasChart: true,
    chartType: 'bar'
  };
