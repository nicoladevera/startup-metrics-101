export interface CalculatorInput {
  name: string;
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
}

export interface BenchmarkZone {
  threshold: number;
  color: 'success' | 'warning' | 'error';
  label: string;
  feedback: string;
}

export type BusinessType = 'B2B' | 'B2C';

export interface Metric {
  id: string;
  name: string;
  iconName: string;
  shortDescription: string;
  definition: string;
  whyItMatters: string;
  formula: string;
  formulaPlain: string;
  sampleCalculation: {
    description: string;
    steps: string[];
  };
  calculator: {
    inputs: CalculatorInput[];
    calculateFn: (inputs: Record<string, number>) => number;
    formatResult: (result: number) => string;
    getBenchmark: (result: number, businessType?: BusinessType) => BenchmarkZone;
  };
  tips: string[];
  commonMistakes: string[];
  hasChart?: boolean;
  chartType?: 'line' | 'bar' | 'gauge';
  supportsBusinessTypes?: boolean;
}
