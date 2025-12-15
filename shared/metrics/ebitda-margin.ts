import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const EBITDA_MARGIN_METRIC: Metric = {
    id: 'ebitda-margin',
    name: 'EBITDA Margin',
    iconName: 'Activity',
    shortDescription: 'Operating profitability ratio',
    definition: 'EBITDA Margin measures a company\'s operating profitability as a percentage of its revenue. EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization.',
    whyItMatters: 'It provides a clear view of operational efficiency, stripping away the effects of financing, accounting decisions, and tax environments. It is a key metric for investors to compare profitability between companies.',
    formula: 'EBITDA Margin = (EBITDA ÷ Total Revenue) × 100',
    formulaPlain: 'EBITDA Margin equals EBITDA divided by total revenue times 100',
    sampleCalculation: {
        description: 'EBITDA is $200,000 and Revenue is $1,000,000',
        steps: [
            'EBITDA: $200,000',
            'Total Revenue: $1,000,000',
            'EBITDA Margin = ($200,000 ÷ $1,000,000) × 100 = 20%'
        ]
    },
    calculator: {
        inputs: [
            { name: 'ebitda', label: 'EBITDA', unit: '$', min: -500000, max: 1000000, step: 1000, defaultValue: 200000, prefix: '$' },
            { name: 'revenue', label: 'Total Revenue', unit: '$', min: 0, max: 5000000, step: 1000, defaultValue: 1000000, prefix: '$' }
        ],
        calculateFn: (inputs) => safeDivide(inputs.ebitda * 100, inputs.revenue),
        formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(1)}%`,
        getBenchmark: (result) => {
            if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Enter EBITDA and Revenue to calculate margin.' };
            if (result >= 40) return { threshold: 40, color: 'success', label: 'World Class', feedback: 'Exceptional profitability.' };
            if (result >= 20) return { threshold: 20, color: 'success', label: 'Healthy', feedback: 'Solid operating profitability.' };
            if (result >= 0) return { threshold: 0, color: 'warning', label: 'Positive', feedback: 'Profitable on an operating basis, but room to improve.' };
            if (result > -20) return { threshold: -20, color: 'warning', label: 'Burn Mode', feedback: 'Losing money, which is typical for early growth but must monitor burn.' };
            return { threshold: -999, color: 'error', label: 'High Burn', feedback: 'Significant operating losses. Ensure you have sufficient runway.' };
        }
    },
    tips: [
        'Use EBITDA Margin to benchmark against competitors in your industry',
        'A negative EBITDA Margin is acceptable for high-growth startups if Unit Economics are positive',
        'Monitor the trend - improving margins over time shows operating leverage',
        'Rule of 40: Growth Rate + EBITDA Margin should ideally be > 40%'
    ],
    commonMistakes: [
        'Confusing with Net Income Margin (which includes interest, taxes, etc.)',
        'Ignoring capitalize software development costs which can inflate EBITDA',
        'Comparing margins between companies with vastly different revenue recognition models',
        'Optimizing for EBITDA too early at the expense of necessary growth investments'
    ],
    hasChart: true,
    chartType: 'bar'
};
