import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const CONTRIBUTION_MARGIN_METRIC: Metric = {
    id: 'contribution-margin',
    name: 'Contribution Margin',
    iconName: 'Sliders',
    shortDescription: 'Profit after variable costs',
    definition: 'Contribution margin is revenue minus variable costs - the amount each sale contributes to covering fixed costs and generating profit. It\'s more comprehensive than gross margin as it includes variable operating expenses.',
    whyItMatters: 'Contribution margin shows true unit economics because it includes all variable costs like sales commissions and marketing. It helps determine breakeven points and pricing strategies. Positive contribution margin means each additional customer improves profitability.',
    formula: 'Contribution Margin = ((Revenue - Variable Costs) ÷ Revenue) × 100',
    formulaPlain: 'Contribution margin equals revenue minus all variable costs, divided by revenue, times 100',
    sampleCalculation: {
      description: 'Revenue $100K, COGS $20K, variable sales/marketing $30K',
      steps: [
        'Revenue: $100,000',
        'COGS: $20,000',
        'Variable sales/marketing: $30,000',
        'Total variable costs: $50,000',
        'Contribution Margin = (($100K - $50K) ÷ $100K) × 100 = 50%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'revenue', label: 'Revenue', unit: '$', min: 0, max: 10000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'cogs', label: 'Cost of Goods Sold', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 20000, prefix: '$' },
        { name: 'variable', label: 'Variable Sales/Marketing', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 30000, prefix: '$' }
      ],
      calculateFn: (inputs) => safeDivide((inputs.revenue - inputs.cogs - inputs.variable) * 100, inputs.revenue),
      formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(1)}%`,
      getBenchmark: (result, businessType = 'B2B') => {
        if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Revenue is required to calculate this metric. Enter your revenue to see your contribution margin.' };

        if (businessType === 'B2C') {
          // B2C benchmarks: Lower margins due to higher variable marketing costs
          if (result >= 40) return { threshold: 40, color: 'success', label: 'Excellent', feedback: 'Excellent contribution margin for B2C! Strong unit economics despite marketing costs.' };
          if (result >= 30) return { threshold: 30, color: 'success', label: 'Good', feedback: 'Healthy B2C contribution margin. Good balance of growth and efficiency.' };
          if (result >= 20) return { threshold: 20, color: 'warning', label: 'Acceptable', feedback: 'Acceptable for B2C. Focus on reducing variable costs or increasing prices.' };
          if (result >= 0) return { threshold: 0, color: 'warning', label: 'Low', feedback: 'Positive but low for B2C. Each sale barely covers variable costs.' };
          return { threshold: -1, color: 'error', label: 'Negative', feedback: 'Negative margin! You lose money on each sale. Urgent action needed.' };
        } else {
          // B2B benchmarks: Higher margins expected with lower variable marketing spend
          if (result >= 60) return { threshold: 60, color: 'success', label: 'Excellent', feedback: 'Excellent contribution margin for B2B! Strong unit economics and efficiency.' };
          if (result >= 50) return { threshold: 50, color: 'success', label: 'Good', feedback: 'Healthy B2B contribution margin. Good foundation for profitable growth.' };
          if (result >= 40) return { threshold: 40, color: 'warning', label: 'Moderate', feedback: 'Moderate margin for B2B. Work on reducing variable costs or improving pricing.' };
          if (result >= 0) return { threshold: 0, color: 'warning', label: 'Low', feedback: 'Positive but low for B2B. Each sale barely covers variable costs.' };
          return { threshold: -1, color: 'error', label: 'Negative', feedback: 'Negative margin! You lose money on each sale. Urgent action needed.' };
        }
      }
    },
    tips: [
      'Include all variable costs: COGS, commissions, payment fees, delivery',
      'B2B should target 50-70% contribution margin (lower variable marketing costs)',
      'B2C typically achieves 30-50% contribution margin (higher paid acquisition costs)',
      'Use contribution margin to set pricing and evaluate customer segments',
      'Higher contribution margin means faster path to profitability',
      'Track by product, channel, and customer type to optimize mix'
    ],
    commonMistakes: [
      'Confusing contribution margin with gross margin (missing variable costs)',
      'Including fixed costs like rent and salaries in the calculation',
      'Not accounting for all sales commissions and variable marketing spend',
      'Forgetting shipping, payment processing, and referral fees'
    ],
    supportsBusinessTypes: true
  };
