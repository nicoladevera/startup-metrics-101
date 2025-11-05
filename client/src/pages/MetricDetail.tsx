import { useState, useCallback, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { getMetricById } from "@shared/metrics";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useBusinessType } from "@/components/BusinessTypeToggle";
import { ArrowLeft } from "lucide-react";
import {
  MetricDefinitionSection,
  MetricWhyItMattersSection,
  MetricFormulaSection,
  MetricCalculatorSection,
  MetricTipsSection,
  MetricMistakesSection,
} from "@/components/metric-sections";

export default function MetricDetail() {
  const [, params] = useRoute("/metric/:id");
  const metric = params?.id ? getMetricById(params.id) : undefined;

  const [result, setResult] = useState<number | null>(null);
  const [businessType, setBusinessType] = useBusinessType();

  useEffect(() => {
    if (metric) {
      document.title = `Startup Metrics 101 - ${metric.name}`;
      window.scrollTo(0, 0);
    }
  }, [metric]);

  const handleCalculate = useCallback((values: Record<string, number>) => {
    if (!metric) return;
    const calculatedResult = metric.calculator.calculateFn(values);
    setResult(calculatedResult);
  }, [metric]);

  if (!metric) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Metric Not Found</h1>
          <Link href="/">
            <Button data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedResult = result !== null ? metric.calculator.formatResult(result) : '';
  const benchmark = result !== null ? metric.calculator.getBenchmark(result, businessType) : null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="pt-8 mb-8">
          <Link href="/">
            <Button variant="default" className="gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to All Metrics
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-primary">
              {getIcon(metric.iconName, "w-12 h-12")}
            </div>
            <h1 className="text-4xl font-bold text-foreground border-b-[3px] border-primary pb-3 flex-1" data-testid="metric-title">
              {metric.name}
            </h1>
          </div>
        </div>

        {/* Educational Sections */}
        <MetricDefinitionSection definition={metric.definition} />

        <MetricWhyItMattersSection whyItMatters={metric.whyItMatters} />

        <MetricFormulaSection
          formula={metric.formula}
          formulaPlain={metric.formulaPlain}
          sampleCalculation={metric.sampleCalculation}
        />

        {/* Interactive Calculator */}
        <MetricCalculatorSection
          inputs={metric.calculator.inputs}
          onCalculate={handleCalculate}
          result={result}
          formattedResult={formattedResult}
          benchmark={benchmark}
          supportsBusinessTypes={metric.supportsBusinessTypes}
          businessType={businessType}
          onBusinessTypeChange={setBusinessType}
        />

        {/* Learning Resources */}
        <MetricTipsSection tips={metric.tips} />

        <MetricMistakesSection mistakes={metric.commonMistakes} />
      </div>
    </div>
  );
}
