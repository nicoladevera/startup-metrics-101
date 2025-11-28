import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const RUNWAY_METRIC: Metric = {
    id: 'runway',
    name: 'Runway',
    iconName: 'Plane',
    shortDescription: 'Months of cash remaining',
    definition: 'Runway is the number of months your company can operate before running out of cash, based on your current burn rate and cash balance. It\'s your financial lifeline.',
    whyItMatters: 'Runway determines when you need to raise funding or reach profitability. Investors want to see at least 12-18 months of runway. Running out of runway forces difficult decisions like layoffs or fire sales. Smart founders start fundraising when they have 6+ months remaining.',
    formula: 'Runway = Cash Balance ÷ Monthly Burn Rate',
    formulaPlain: 'Runway in months equals your current cash balance divided by monthly burn rate',
    sampleCalculation: {
      description: 'Company has $500K cash with $50K/month burn',
      steps: [
        'Cash balance: $500,000',
        'Monthly burn rate: $50,000',
        'Runway = $500,000 ÷ $50,000 = 10 months'
      ]
    },
    calculator: {
      inputs: [
        { name: 'cash', label: 'Cash Balance', unit: '$', min: 0, max: 10000000, step: 10000, defaultValue: 500000, prefix: '$' },
        { name: 'burn', label: 'Monthly Burn Rate', unit: '$', min: 0, max: 500000, step: 1000, defaultValue: 50000, prefix: '$' }
      ],
      calculateFn: (inputs) => safeDivide(inputs.cash, inputs.burn),
      formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(1)} months`,
      getBenchmark: (result) => {
        if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Monthly burn rate is required to calculate runway. Enter your monthly burn rate to see how many months of runway you have.' };
        if (result >= 18) return { threshold: 18, color: 'success', label: 'Healthy', feedback: 'Excellent runway! You have plenty of time to execute and grow.' };
        if (result >= 12) return { threshold: 12, color: 'success', label: 'Good', feedback: 'Solid runway. Consider starting fundraising conversations soon.' };
        if (result >= 6) return { threshold: 6, color: 'warning', label: 'Caution', feedback: 'Start fundraising now! 6 months is the minimum safe runway.' };
        return { threshold: 0, color: 'error', label: 'Critical', feedback: 'Critical! Take immediate action: cut costs, raise emergency funding, or pivot to revenue.' };
      }
    },
    tips: [
      'Maintain 12-18 months runway minimum; start fundraising at 6 months',
      'Build a 13-week cash flow forecast to track runway precisely',
      'Account for seasonal revenue variations in runway calculations',
      'Have a plan to extend runway by 30-40% through cost cuts if needed',
      'Consider runway extension through revenue growth, not just fundraising'
    ],
    commonMistakes: [
      'Not accounting for upcoming large expenses or seasonal variations',
      'Assuming revenue will stay flat when calculating runway',
      'Forgetting about the 3-6 month fundraising timeline',
      'Not having a contingency plan when runway drops below 9 months'
    ],
    hasChart: true,
    chartType: 'gauge'
  };
