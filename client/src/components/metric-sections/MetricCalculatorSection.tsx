import { Calculator as CalcIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Calculator } from "@/components/Calculator";
import { ResultDisplay } from "@/components/ResultDisplay";
import { BusinessTypeToggle } from "@/components/BusinessTypeToggle";
import type { CalculatorInput, BenchmarkZone, BusinessType } from "@shared/metrics";

interface MetricCalculatorSectionProps {
  inputs: CalculatorInput[];
  onCalculate: (values: Record<string, number>) => void;
  result: number | null;
  formattedResult: string;
  benchmark: BenchmarkZone | null;
  supportsBusinessTypes?: boolean;
  businessType: BusinessType;
  onBusinessTypeChange: (type: BusinessType) => void;
}

export function MetricCalculatorSection({
  inputs,
  onCalculate,
  result,
  formattedResult,
  benchmark,
  supportsBusinessTypes,
  businessType,
  onBusinessTypeChange,
}: MetricCalculatorSectionProps) {
  return (
    <section className="mb-12" data-testid="section-calculator">
      <div className="flex items-center gap-3 mb-5">
        <CalcIcon className="w-7 h-7 text-primary" />
        <h2 className="text-3xl font-bold text-primary">Interactive Calculator</h2>
      </div>
      <Card className="bg-card border-2 border-card-border p-8">
        {supportsBusinessTypes && (
          <div className="mb-6 pb-6 border-b border-border">
            <BusinessTypeToggle
              value={businessType}
              onChange={onBusinessTypeChange}
            />
          </div>
        )}

        <Calculator inputs={inputs} onCalculate={onCalculate} />

        {result !== null && benchmark && (
          <ResultDisplay
            result={result}
            formattedResult={formattedResult}
            benchmark={benchmark}
          />
        )}
      </Card>
    </section>
  );
}
