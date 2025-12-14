import { Calculator as CalcIcon } from "lucide-react";
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
    <section data-testid="section-calculator">
      {/* Calculator Card - Elevated Glass */}
      <div className="glass-card-elevated rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/20 dark:bg-primary/30 text-primary">
            <CalcIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Calculator</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Enter your values below</p>
          </div>
        </div>

        {/* Business Type Toggle */}
        {supportsBusinessTypes && (
          <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border/30 dark:border-white/10">
            <BusinessTypeToggle
              value={businessType}
              onChange={onBusinessTypeChange}
            />
          </div>
        )}

        {/* Calculator Inputs */}
        <Calculator inputs={inputs} onCalculate={onCalculate} />

        {/* Result Display */}
        {benchmark && (
          <ResultDisplay
            result={result}
            formattedResult={formattedResult}
            benchmark={benchmark}
          />
        )}
      </div>
    </section>
  );
}
