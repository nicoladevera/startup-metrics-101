import type { Metric } from './types';

export const RULE_OF_40_METRIC: Metric = {
    id: 'rule-of-40',
    name: 'Rule of 40',
    iconName: 'CircleDot',
    shortDescription: 'Growth + Profitability benchmark',
    definition: 'The Rule of 40 states that a healthy SaaS company\'s growth rate plus profit margin should equal or exceed 40%. It balances the tradeoff between growth and profitability.',
    whyItMatters: 'The Rule of 40 helps evaluate whether a company is balancing growth and profitability appropriately. It\'s widely used by VCs and public market investors to assess SaaS company health. Companies above 40% are considered well-balanced and valuable.',
    formula: 'Rule of 40 = YoY Revenue Growth Rate + Profit Margin',
    formulaPlain: 'Rule of 40 score equals your year-over-year revenue growth percentage plus your profit margin percentage',
    sampleCalculation: {
      description: '50% YoY growth with -10% profit margin',
      steps: [
        'Year-over-year growth rate: 50%',
        'Profit margin: -10%',
        'Rule of 40 = 50% + (-10%) = 40%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'growthRate', label: 'YoY Revenue Growth Rate', unit: '%', min: -50, max: 200, step: 1, defaultValue: 50, suffix: '%' },
        { name: 'profitMargin', label: 'Profit Margin', unit: '%', min: -100, max: 100, step: 1, defaultValue: -10, suffix: '%' }
      ],
      calculateFn: (inputs) => inputs.growthRate + inputs.profitMargin,
      formatResult: (result) => `${result.toFixed(0)}%`,
      getBenchmark: (result) => {
        if (result >= 40) return { threshold: 40, color: 'success', label: 'Excellent', feedback: 'Outstanding! You\'re balancing growth and profitability well.' };
        if (result >= 25) return { threshold: 25, color: 'warning', label: 'Fair', feedback: 'Acceptable but aim for 40%+. Optimize growth or profitability.' };
        return { threshold: 0, color: 'error', label: 'Below Target', feedback: 'Below target. You\'re either growing too slowly or burning too much cash.' };
      }
    },
    tips: [
      'Use this metric when you\'re past product-market fit and scaling',
      'Early-stage companies can be below 40% if hypergrowth justifies losses',
      'Public SaaS companies are heavily judged on Rule of 40 compliance',
      'If growth is slowing, shift focus to profitability to maintain 40%+',
      'Can substitute EBITDA margin for profit margin for more generous calculation'
    ],
    commonMistakes: [
      'Using MoM growth instead of YoY growth in the calculation',
      'Applying this rule to pre-product-market-fit startups (not relevant)',
      'Not adjusting for one-time expenses when calculating profit margin',
      'Comparing companies at vastly different scales (early vs mature)'
    ]
  };
