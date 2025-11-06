import type { Metric } from './types';

export const MRR_METRIC: Metric = {
    id: 'mrr',
    name: 'Monthly Recurring Revenue (MRR)',
    iconName: 'TrendingUp',
    shortDescription: 'Predictable monthly revenue from subscriptions',
    definition: 'MRR is the predictable revenue your business expects to receive every month from subscriptions. It\'s like a financial heartbeat that shows the health of your recurring revenue stream.',
    whyItMatters: 'Investors and founders track MRR because it provides a clear, consistent measure of business growth. Unlike one-time sales, MRR shows sustainable, predictable revenue that compounds over time. A healthy MRR growth rate (15-20% month-over-month for early-stage startups) signals strong product-market fit.',
    formula: 'MRR = Number of Customers × Average Revenue Per Customer',
    formulaPlain: 'Monthly Recurring Revenue equals the number of paying customers multiplied by the average monthly revenue per customer',
    sampleCalculation: {
      description: 'A SaaS company has 200 customers paying an average of $50/month',
      steps: [
        'Number of customers: 200',
        'Average revenue per customer: $50',
        'MRR = 200 × $50 = $10,000/month'
      ]
    },
    calculator: {
      inputs: [
        { name: 'customers', label: 'Number of Customers', min: 0, max: 10000, step: 1, defaultValue: 200 },
        { name: 'avgRevenue', label: 'Avg Monthly Revenue per Customer', unit: '$', min: 0, max: 1000, step: 1, defaultValue: 50, prefix: '$' }
      ],
      calculateFn: (inputs) => inputs.customers * inputs.avgRevenue,
      formatResult: (result) => `$${result.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      getBenchmark: (result) => {
        if (result >= 100000) return { threshold: 100000, color: 'success', label: 'Excellent', feedback: 'Strong MRR! You\'re at a scale that attracts serious investor attention.' };
        if (result >= 10000) return { threshold: 10000, color: 'success', label: 'Good', feedback: 'Healthy MRR showing solid traction and growth potential.' };
        if (result >= 1000) return { threshold: 1000, color: 'warning', label: 'Early Stage', feedback: 'Promising start - focus on consistent growth and retention.' };
        return { threshold: 0, color: 'error', label: 'Getting Started', feedback: 'Keep building! Focus on acquiring and retaining customers.' };
      }
    },
    tips: [
      'Track MRR growth rate monthly - aim for 15-20% MoM growth in early stages',
      'Break down MRR into New, Expansion, and Churned MRR for deeper insights',
      'Focus on increasing MRR through both new customers and existing customer expansion',
      'SaaS companies should aim for $100K MRR before Series A fundraising',
      'Pay attention to MRR composition - recurring revenue is more valuable than one-time fees'
    ],
    commonMistakes: [
      'Including one-time fees or setup charges in MRR calculations',
      'Not accounting for annual contracts properly (divide by 12 for MRR)',
      'Forgetting to subtract churned MRR when calculating net new MRR',
      'Mixing different billing cycles without normalizing to monthly'
    ],
    hasChart: true,
    chartType: 'line'
  };
