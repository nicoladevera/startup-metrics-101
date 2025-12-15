import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const CAC_PAYBACK_PERIOD_METRIC: Metric = {
    id: 'cac-payback-period',
    name: 'CAC Payback Period',
    iconName: 'Timer',
    shortDescription: 'Months to recover acquisition cost',
    definition: 'CAC Payback Period measures the number of months it takes to earn back the money spent acquiring a customer. It determines how capital-efficient your growth is.',
    whyItMatters: 'This dictates your cash flow needs. A shorter payback period means you can reinvest your profits faster to grow. If it takes too long to recover costs, you might run out of cash even if your LTV:CAC is healthy.',
    formula: 'Payback Period = CAC ÷ (ARPU × Gross Margin %)',
    formulaPlain: 'Payback Period equals acquisition cost divided by (monthly revenue per user times gross margin percentage)',
    sampleCalculation: {
        description: 'CAC is $1,000, ARPU is $100, Gross Margin is 80%',
        steps: [
            'CAC: $1,000',
            'Monthly Gross Profit per User: $100 × 0.80 = $80',
            'Payback Period = $1,000 ÷ $80 = 12.5 months'
        ]
    },
    supportsBusinessTypes: true,
    calculator: {
        inputs: [
            { name: 'cac', label: 'Customer Acquisition Cost', unit: '$', min: 0, max: 20000, step: 50, defaultValue: 1000, prefix: '$' },
            { name: 'arpu', label: 'Average Revenue Per User (Monthly)', unit: '$', min: 0, max: 5000, step: 10, defaultValue: 100, prefix: '$' },
            { name: 'grossMargin', label: 'Gross Margin', unit: '%', min: 0, max: 100, step: 1, defaultValue: 80, suffix: '%' }
        ],
        calculateFn: (inputs) => {
            const marginDecimal = inputs.grossMargin / 100;
            const monthlyGrossProfit = inputs.arpu * marginDecimal;
            return safeDivide(inputs.cac, monthlyGrossProfit);
        },
        formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(1)} months`,
        getBenchmark: (result, businessType) => {
            if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Enter all values to calculate payback period.' };

            if (businessType === 'B2B') {
                if (result <= 12) return { threshold: 12, color: 'success', label: 'Excellent', feedback: 'Recovering CAC in under a year is best-in-class for B2B.' };
                if (result <= 18) return { threshold: 18, color: 'warning', label: 'Good', feedback: 'Healthy range for most B2B SaaS businesses.' };
                if (result <= 24) return { threshold: 24, color: 'warning', label: 'Fair', feedback: 'Acceptable for enterprise sales, but watch cash flow carefully.' };
                return { threshold: 999, color: 'error', label: 'Poor', feedback: 'Taking over 2 years to recover costs indicates inefficiency.' };
            } else {
                // B2C benchmarks are generally tighter
                if (result <= 6) return { threshold: 6, color: 'success', label: 'Excellent', feedback: 'Best-in-class for consumer apps. Viral growth potential.' };
                if (result <= 9) return { threshold: 9, color: 'success', label: 'Good', feedback: 'Assessment: Healthy consumer unit economics.' };
                if (result <= 12) return { threshold: 12, color: 'warning', label: 'Fair', feedback: 'Acceptable, but leaves little margin for error in B2C.' };
                return { threshold: 999, color: 'error', label: 'Poor', feedback: 'Too slow for B2C constraints. High churn risk likely makes this unsustainable.' };
            }
        }
    },
    tips: [
        'Aim for a payback period of <12 months for small/medium business sales',
        'Payback periods up to 18-24 months can be acceptable for enterprise contracts with lock-in',
        'Reduce payback period by lowering CAC or increasing ARPU/Net Revenue Retention',
        'Offer annual upfront payments to instantly solve cash flow constraints'
    ],
    commonMistakes: [
        'Using Revenue instead of Gross Profit in the denominator',
        'Forgetting to include all costs in CAC (salaries, overhead, tools)',
        'Calculating blended payback instead of segment-specific payback',
        'Ignoring churn risk - if payback > average lifetime, you lose money'
    ],
    hasChart: true,
    chartType: 'bar'
};
