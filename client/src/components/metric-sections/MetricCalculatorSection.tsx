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
    <section className="mb-10" data-testid="section-calculator">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-lg">
          <CalcIcon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Interactive Calculator</h2>
      </div>
      <Card className="bg-gradient-to-br from-card to-card/50 dark:from-card dark:to-card/80 border border-card-border dark:border-border p-10 shadow-lg rounded-xl">
        {supportsBusinessTypes && (
          <div className="mb-8 pb-8 border-b border-border/50">
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
