import type { Metric } from './types';

export const GROSS_MARGIN_METRIC: Metric = {
    id: 'gross-margin',
    name: 'Gross Margin',
    iconName: 'Banknote',
    shortDescription: 'Profit after direct costs',
    definition: 'Gross margin is the percentage of revenue remaining after subtracting the direct costs of delivering your product or service (COGS). It shows how efficiently you deliver value to customers.',
    whyItMatters: 'Gross margin determines how much money is available for sales, marketing, R&D, and operations. SaaS companies should have 70-90% gross margins. Lower margins limit growth potential and reduce company valuation. Investors use gross margin to assess scalability.',
    formula: 'Gross Margin = ((Revenue - COGS) ÷ Revenue) × 100',
    formulaPlain: 'Gross margin percentage equals revenue minus cost of goods sold, divided by revenue, times 100',
    sampleCalculation: {
      description: 'Revenue is $100K, COGS is $20K',
      steps: [
        'Revenue: $100,000',
        'Cost of Goods Sold: $20,000',
        'Gross Profit = $100K - $20K = $80K',
        'Gross Margin = ($80K ÷ $100K) × 100 = 80%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'revenue', label: 'Total Revenue', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'cogs', label: 'Cost of Goods Sold (COGS)', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 20000, prefix: '$' }
      ],
      calculateFn: (inputs) => ((inputs.revenue - inputs.cogs) / inputs.revenue) * 100,
      formatResult: (result) => `${result.toFixed(1)}%`,
      getBenchmark: (result, businessType = 'B2B') => {
        if (businessType === 'B2C') {
          // B2C benchmarks: Lower margins due to physical goods and competition
          if (result >= 50) return { threshold: 50, color: 'success', label: 'Excellent', feedback: 'Excellent gross margin for B2C! Strong pricing power and efficiency.' };
          if (result >= 40) return { threshold: 40, color: 'success', label: 'Good', feedback: 'Healthy B2C gross margin. Good foundation for sustainable growth.' };
          if (result >= 30) return { threshold: 30, color: 'warning', label: 'Acceptable', feedback: 'Acceptable margin for B2C. Work on reducing COGS or premium positioning.' };
          return { threshold: 0, color: 'error', label: 'Low', feedback: 'Low margin for B2C limits growth. Focus on pricing and cost efficiency.' };
        } else {
          // B2B benchmarks: Higher margins expected for software/services
          if (result >= 70) return { threshold: 70, color: 'success', label: 'Excellent', feedback: 'Excellent gross margin for B2B! Typical for healthy SaaS businesses.' };
          if (result >= 50) return { threshold: 50, color: 'warning', label: 'Moderate', feedback: 'Decent margin for B2B but work on reducing COGS for better scalability.' };
          return { threshold: 0, color: 'error', label: 'Low', feedback: 'Low margin limits growth. Focus on pricing and cost efficiency.' };
        }
      }
    },
    tips: [
      'B2B SaaS should target 70-90% gross margin',
      'B2C ecommerce typically achieves 40-60% margins',
      'Hardware/marketplace businesses typically have 30-50% margins',
      'Include hosting, support, and delivery costs in COGS',
      'Gross margin should improve as you scale due to efficiency gains',
      'Higher margins allow for more aggressive growth investment'
    ],
    commonMistakes: [
      'Including sales and marketing costs in COGS (they\'re operating expenses)',
      'Not accounting for customer support and success costs',
      'Forgetting to include payment processing fees and hosting costs',
      'Not tracking margin by customer segment or product line'
    ],
    supportsBusinessTypes: true
  };
