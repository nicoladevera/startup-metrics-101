import type { Metric } from './types';

export const ARR_METRIC: Metric = {
    id: 'arr',
    name: 'Annual Recurring Revenue (ARR)',
    iconName: 'DollarSign',
    shortDescription: 'Yearly value of recurring subscriptions',
    definition: 'ARR is the yearly value of your recurring revenue streams, normalized to an annual figure. It\'s MRR multiplied by 12, representing the annual commitment value of your subscription base.',
    whyItMatters: 'ARR is the standard metric for reporting SaaS business size. VCs use ARR milestones ($1M, $10M, $100M) to evaluate company stage and funding rounds. It provides a clearer picture of business scale than MRR and is essential for long-term financial planning.',
    formula: 'ARR = MRR × 12',
    formulaPlain: 'Annual Recurring Revenue equals Monthly Recurring Revenue multiplied by 12',
    sampleCalculation: {
      description: 'If your MRR is $50,000',
      steps: [
        'MRR: $50,000',
        'ARR = $50,000 × 12',
        'ARR = $600,000'
      ]
    },
    calculator: {
      inputs: [
        { name: 'mrr', label: 'Monthly Recurring Revenue (MRR)', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 50000, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.mrr * 12,
      formatResult: (result) => `$${result.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      getBenchmark: (result) => {
        if (result >= 10000000) return { threshold: 10000000, color: 'success', label: 'Scale Stage', feedback: 'Excellent! You\'re at Series B/C scale with strong market position.' };
        if (result >= 1000000) return { threshold: 1000000, color: 'success', label: 'Growth Stage', feedback: 'Great milestone! You\'ve proven product-market fit at scale.' };
        if (result >= 100000) return { threshold: 100000, color: 'warning', label: 'Early Growth', feedback: 'Good progress - focus on scaling sales and marketing efficiently.' };
        return { threshold: 0, color: 'error', label: 'Early Stage', feedback: 'Keep growing! Work towards the $1M ARR milestone for Series A.' };
      }
    },
    tips: [
      '$1M ARR is typically the minimum for Series A fundraising',
      '$10M ARR often indicates readiness for Series B',
      'Track ARR growth rate - best-in-class SaaS companies triple ARR year-over-year',
      'Use ARR for annual planning and investor communications, MRR for operational metrics',
      'Consider ARR per employee as an efficiency metric (aim for $150K-$200K)'
    ],
    commonMistakes: [
      'Confusing ARR with actual revenue collected (ARR is a forward-looking metric)',
      'Including non-recurring revenue in ARR calculations',
      'Not adjusting for known upcoming churn in ARR projections',
      'Mixing annual and monthly contracts without proper normalization'
    ],
    hasChart: true,
    chartType: 'line'
  };
