import type { Metric } from './types';

export const LTV_METRIC: Metric = {
    id: 'ltv',
    name: 'Lifetime Value (LTV)',
    iconName: 'Gem',
    shortDescription: 'Total revenue from a customer',
    definition: 'LTV is the total revenue you expect to earn from a customer over their entire relationship with your company. It represents the long-term value of each customer acquisition.',
    whyItMatters: 'LTV determines how much you can afford to spend on customer acquisition. A healthy LTV:CAC ratio (3:1 or higher) indicates sustainable growth. LTV is crucial for understanding true profitability and justifying marketing spend.',
    formula: 'LTV = (Average Revenue Per Customer ÷ Churn Rate)',
    formulaPlain: 'Lifetime Value equals average monthly revenue per customer divided by monthly churn rate',
    sampleCalculation: {
      description: 'Average customer pays $100/month with 5% monthly churn',
      steps: [
        'Average revenue per customer: $100/month',
        'Monthly churn rate: 5% (0.05)',
        'LTV = $100 ÷ 0.05 = $2,000'
      ]
    },
    calculator: {
      inputs: [
        { name: 'avgRevenue', label: 'Avg Monthly Revenue per Customer', unit: '$', min: 0, max: 1000, step: 10, defaultValue: 100, prefix: '$' },
        { name: 'churnRate', label: 'Monthly Churn Rate', unit: '%', min: 0.1, max: 50, step: 0.1, defaultValue: 5, suffix: '%' }
      ],
      calculateFn: (inputs) => inputs.avgRevenue / (inputs.churnRate / 100),
      formatResult: (result) => `$${result.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      getBenchmark: (result, businessType = 'B2B') => {
        if (businessType === 'B2C') {
          // B2C benchmarks: Lower LTV due to lower prices and higher churn
          if (result >= 500) return { threshold: 500, color: 'success', label: 'Excellent', feedback: 'Excellent LTV for B2C! Strong customer value.' };
          if (result >= 200) return { threshold: 200, color: 'success', label: 'Good', feedback: 'Healthy B2C LTV. Ensure CAC is under $67 for good unit economics.' };
          if (result >= 100) return { threshold: 100, color: 'warning', label: 'Moderate', feedback: 'Decent LTV. Focus on reducing churn and increasing revenue per customer.' };
          return { threshold: 0, color: 'error', label: 'Low', feedback: 'Low LTV for B2C. Work on retention and pricing strategy.' };
        } else {
          // B2B benchmarks: Higher LTV due to higher prices and lower churn
          if (result >= 5000) return { threshold: 5000, color: 'success', label: 'Excellent', feedback: 'Strong LTV for B2B! Your customers are highly valuable.' };
          if (result >= 2000) return { threshold: 2000, color: 'success', label: 'Good', feedback: 'Healthy B2B LTV. Ensure CAC is under $667 for good unit economics.' };
          if (result >= 500) return { threshold: 500, color: 'warning', label: 'Moderate', feedback: 'Decent LTV. Focus on reducing churn and increasing revenue per customer.' };
          return { threshold: 0, color: 'error', label: 'Low', feedback: 'Low LTV is concerning. Work on retention and pricing strategy.' };
        }
      }
    },
    tips: [
      'Increase LTV by reducing churn and expanding existing customer revenue',
      'Calculate LTV separately for different customer segments',
      'Include expansion revenue from upsells in LTV calculations',
      'Track LTV trends cohort-by-cohort to spot improvements',
      'Consider using 3-year LTV for more conservative planning',
      'B2B LTV typically ranges from $2,000-$10,000+, B2C from $100-$500'
    ],
    commonMistakes: [
      'Using overall churn instead of cohort-specific churn rates',
      'Not including expansion revenue from upsells and cross-sells',
      'Calculating LTV on too small a sample size (wait for statistical significance)',
      'Ignoring gross margin when calculating LTV (should use gross profit LTV)'
    ],
    supportsBusinessTypes: true
  };
