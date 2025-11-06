import type { Metric } from './types';

export const CAC_METRIC: Metric = {
    id: 'cac',
    name: 'Customer Acquisition Cost (CAC)',
    iconName: 'Target',
    shortDescription: 'Cost to acquire one customer',
    definition: 'CAC is the total cost of acquiring a new customer, including all sales and marketing expenses. It measures how efficiently you can acquire customers and is fundamental to understanding unit economics.',
    whyItMatters: 'CAC determines if your business model is sustainable. If CAC is too high relative to customer lifetime value, your business loses money on each customer. Investors scrutinize CAC because it reveals sales efficiency and scalability potential.',
    formula: 'CAC = (Sales + Marketing Costs) ÷ Number of New Customers',
    formulaPlain: 'Customer Acquisition Cost equals total sales and marketing expenses divided by the number of new customers acquired in that period',
    sampleCalculation: {
      description: 'Company spends $50K on sales/marketing and acquires 100 customers',
      steps: [
        'Sales & Marketing costs: $50,000',
        'New customers acquired: 100',
        'CAC = $50,000 ÷ 100 = $500 per customer'
      ]
    },
    calculator: {
      inputs: [
        { name: 'marketing', label: 'Sales & Marketing Costs', unit: '$', min: 0, max: 500000, step: 1000, defaultValue: 50000, prefix: '$' },
        { name: 'customers', label: 'New Customers Acquired', min: 1, max: 10000, step: 1, defaultValue: 100 }
      ],
      calculateFn: (inputs) => inputs.marketing / inputs.customers,
      formatResult: (result) => `$${result.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
      getBenchmark: (result, businessType = 'B2B') => {
        if (businessType === 'B2C') {
          // B2C benchmarks: Much lower CAC due to shorter sales cycles
          if (result <= 50) return { threshold: 50, color: 'success', label: 'Excellent', feedback: 'Excellent CAC for B2C! Very efficient acquisition channels.' };
          if (result <= 100) return { threshold: 100, color: 'success', label: 'Good', feedback: 'Healthy B2C CAC. Ensure LTV is at least 3x this number.' };
          if (result <= 150) return { threshold: 150, color: 'warning', label: 'High', feedback: 'CAC is elevated for B2C. Optimize conversion rates and channel efficiency.' };
          return { threshold: 151, color: 'error', label: 'Very High', feedback: 'CAC is too high for B2C. Revisit your acquisition strategy and channel mix.' };
        } else {
          // B2B benchmarks: Higher CAC acceptable due to longer sales cycles and higher LTV
          if (result <= 200) return { threshold: 200, color: 'success', label: 'Excellent', feedback: 'Excellent CAC for B2B! You have efficient acquisition channels.' };
          if (result <= 500) return { threshold: 500, color: 'success', label: 'Good', feedback: 'Healthy B2B CAC. Ensure LTV is at least 3x this number.' };
          if (result <= 1000) return { threshold: 1000, color: 'warning', label: 'High', feedback: 'CAC is elevated. Focus on improving conversion rates and channel efficiency.' };
          return { threshold: 1001, color: 'error', label: 'Very High', feedback: 'CAC is too high. Revisit your acquisition strategy and channel mix.' };
        }
      }
    },
    tips: [
      'Include all sales and marketing costs: salaries, tools, ads, events, content',
      'Calculate CAC by channel to identify most efficient acquisition sources',
      'Aim for CAC payback period under 12 months',
      'Track CAC trend over time - should decrease as you optimize',
      'B2B SaaS CAC is typically $200-$500, Enterprise can be $5K-$50K+',
      'B2C CAC is typically $30-$100 due to shorter sales cycles and lower touch'
    ],
    commonMistakes: [
      'Excluding sales team salaries and overhead from CAC calculations',
      'Not accounting for marketing tools, agencies, and software costs',
      'Calculating CAC over too short a period (use at least quarterly data)',
      'Forgetting that CAC naturally increases as you move upmarket or expand'
    ],
    supportsBusinessTypes: true
  };
