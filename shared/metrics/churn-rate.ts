import type { Metric } from './types';

export const CHURN_RATE_METRIC: Metric = {
    id: 'churn-rate',
    name: 'Churn Rate',
    iconName: 'TrendingDown',
    shortDescription: 'Customer loss percentage',
    definition: 'Churn rate is the percentage of customers who stop using your product or service during a given time period. It\'s the opposite of retention and a critical indicator of product-market fit.',
    whyItMatters: 'High churn kills growth because you\'re constantly replacing lost customers instead of growing. For subscription businesses, reducing churn from 5% to 3% monthly can double your growth rate. Investors view low churn as proof of product value and sticky customers.',
    formula: 'Churn Rate = (Customers Lost ÷ Starting Customers) × 100',
    formulaPlain: 'Monthly churn rate equals customers lost during the month divided by customers at start of month, times 100',
    sampleCalculation: {
      description: 'Started month with 200 customers, lost 10',
      steps: [
        'Customers at start: 200',
        'Customers lost: 10',
        'Churn Rate = (10 ÷ 200) × 100 = 5%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'starting', label: 'Customers at Start of Month', min: 1, max: 100000, step: 1, defaultValue: 200 },
        { name: 'lost', label: 'Customers Lost', min: 0, max: 50000, step: 1, defaultValue: 10 }
      ],
      calculateFn: (inputs) => (inputs.lost / inputs.starting) * 100,
      formatResult: (result) => `${result.toFixed(1)}%`,
      getBenchmark: (result, businessType = 'B2B') => {
        if (businessType === 'B2C') {
          // B2C benchmarks: Slightly higher churn acceptable due to lower prices
          if (result <= 2) return { threshold: 2, color: 'success', label: 'Excellent', feedback: 'Excellent retention for B2C! Your customers love your product.' };
          if (result <= 5) return { threshold: 5, color: 'success', label: 'Good', feedback: 'Good B2C churn rate. Continue focusing on retention.' };
          if (result <= 7) return { threshold: 7, color: 'warning', label: 'Acceptable', feedback: 'Acceptable for B2C early-stage, but work on improving retention.' };
          return { threshold: 7.1, color: 'error', label: 'High', feedback: 'High churn for B2C - focus on retention before scaling acquisition.' };
        } else {
          // B2B benchmarks: Lower churn expected due to higher switching costs
          if (result <= 2) return { threshold: 2, color: 'success', label: 'Excellent', feedback: 'Excellent retention for B2B! Your customers love your product.' };
          if (result <= 5) return { threshold: 5, color: 'warning', label: 'Acceptable', feedback: 'Acceptable for B2B early-stage, but work on improving retention.' };
          return { threshold: 5.1, color: 'error', label: 'High', feedback: 'High churn for B2B - focus on retention before scaling acquisition.' };
        }
      }
    },
    tips: [
      'Aim for under 2% monthly churn for consumer products, under 1% for enterprise B2B',
      'Calculate churn cohort-by-cohort to identify trends',
      'Track both customer churn and revenue churn separately',
      'Focus on the first 90 days - most churn happens early',
      'Negative revenue churn (from expansion) is the holy grail'
    ],
    commonMistakes: [
      'Calculating churn on too small a sample size (leads to high variance)',
      'Not distinguishing between voluntary churn (left) and involuntary (payment failed)',
      'Ignoring logo churn vs revenue churn (losing small customers matters less)',
      'Not investigating why customers churn through exit interviews'
    ],
    hasChart: true,
    chartType: 'line',
    supportsBusinessTypes: true
  };
