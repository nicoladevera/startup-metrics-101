// Auto-generated index file
export * from './types';
export { TOOLTIPS } from './tooltips';

import { MRR_METRIC } from './mrr';
import { ARR_METRIC } from './arr';
import { BURN_RATE_METRIC } from './burn-rate';
import { RUNWAY_METRIC } from './runway';
import { CAC_METRIC } from './cac';
import { LTV_METRIC } from './ltv';
import { LTV_CAC_RATIO_METRIC } from './ltv-cac-ratio';
import { CHURN_RATE_METRIC } from './churn-rate';
import { NRR_METRIC } from './nrr';
import { GROSS_MARGIN_METRIC } from './gross-margin';
import { CONTRIBUTION_MARGIN_METRIC } from './contribution-margin';
import { NET_PROFIT_MARGIN_METRIC } from './net-profit-margin';
import { GROWTH_RATE_METRIC } from './growth-rate';
import { RULE_OF_40_METRIC } from './rule-of-40';
import { UNIT_ECONOMICS_METRIC } from './unit-economics';

export const METRICS = [
  MRR_METRIC,
  ARR_METRIC,
  BURN_RATE_METRIC,
  RUNWAY_METRIC,
  CAC_METRIC,
  LTV_METRIC,
  LTV_CAC_RATIO_METRIC,
  CHURN_RATE_METRIC,
  NRR_METRIC,
  GROSS_MARGIN_METRIC,
  CONTRIBUTION_MARGIN_METRIC,
  NET_PROFIT_MARGIN_METRIC,
  GROWTH_RATE_METRIC,
  RULE_OF_40_METRIC,
  UNIT_ECONOMICS_METRIC
];

export function getMetricById(id: string) {
  return METRICS.find(m => m.id === id);
}
