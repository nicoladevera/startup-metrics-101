import type { Metric } from './types';
import { safeDivide } from '../utils/math';

export const NRR_METRIC: Metric = {
    id: 'nrr',
    name: 'Net Revenue Retention (NRR)',
    iconName: 'BarChart3',
    shortDescription: 'Revenue growth from existing customers',
    definition: 'NRR measures the percentage of recurring revenue retained from existing customers, including expansions, upsells, and downgrades. An NRR over 100% means your existing customers are growing in value.',
    whyItMatters: 'NRR is the single best predictor of SaaS success. Companies with 120%+ NRR can grow significantly even without new customer acquisition. It proves product stickiness and expansion potential. Public SaaS companies with high NRR trade at premium valuations.',
    formula: 'NRR = ((Starting MRR + Expansion - Churn - Contraction) ÷ Starting MRR) × 100',
    formulaPlain: 'Net Revenue Retention equals starting recurring revenue plus expansion minus churned and downgraded revenue, divided by starting revenue, times 100',
    sampleCalculation: {
      description: 'Started with $100K MRR, +$30K expansion, -$10K churn',
      steps: [
        'Starting MRR: $100,000',
        'Expansion revenue: +$30,000',
        'Churned revenue: -$10,000',
        'NRR = (($100K + $30K - $10K) ÷ $100K) × 100 = 120%'
      ]
    },
    calculator: {
      inputs: [
        { name: 'starting', label: 'Starting MRR', unit: '$', min: 0, max: 1000000, step: 1000, defaultValue: 100000, prefix: '$' },
        { name: 'expansion', label: 'Expansion Revenue', unit: '$', min: 0, max: 500000, step: 1000, defaultValue: 30000, prefix: '$' },
        { name: 'churn', label: 'Churned Revenue', unit: '$', min: 0, max: 500000, step: 1000, defaultValue: 10000, prefix: '$' }
      ],
      calculateFn: (inputs) => safeDivide((inputs.starting + inputs.expansion - inputs.churn) * 100, inputs.starting),
      formatResult: (result) => result === null ? 'N/A' : `${result.toFixed(0)}%`,
      getBenchmark: (result) => {
        if (result === null) return { threshold: 0, color: 'error', label: 'Cannot Calculate', feedback: 'Starting MRR is required to calculate NRR. Enter your starting monthly recurring revenue to see your net revenue retention.' };
        if (result >= 120) return { threshold: 120, color: 'success', label: 'Excellent', feedback: 'Exceptional! Your product has strong expansion and retention.' };
        if (result >= 100) return { threshold: 100, color: 'success', label: 'Good', feedback: 'Solid NRR. You\'re retaining and growing existing customer revenue.' };
        if (result >= 85) return { threshold: 85, color: 'warning', label: 'Fair', feedback: 'Acceptable but focus on expansion and reducing churn.' };
        return { threshold: 0, color: 'error', label: 'Poor', feedback: 'Low NRR indicates retention and expansion challenges.' };
      }
    },
    tips: [
      'Best-in-class SaaS companies achieve 120%+ NRR',
      'NRR over 100% means you can grow without new customer acquisition',
      'Focus on expansion revenue through upsells, cross-sells, and usage-based pricing',
      'Track NRR monthly and investigate dips immediately',
      'Enterprise SaaS typically has higher NRR than SMB SaaS'
    ],
    commonMistakes: [
      'Including new customer revenue in NRR calculations',
      'Not tracking expansion, contraction, and churn separately',
      'Calculating NRR on too short a time period (use annual cohorts)',
      'Confusing gross retention (without expansion) with net retention'
    ]
  };
