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

  const formattedResult = metric.calculator.formatResult(result);
  const benchmark = metric.calculator.getBenchmark(result, businessType);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="pt-8 mb-8">
          <Link href="/">
            <Button variant="default" className="gap-2 shadow-md hover:shadow-lg transition-all duration-200" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to All Metrics
            </Button>
          </Link>
        </div>

        {/* Page Title - Enhanced Hero */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent border border-primary/20 dark:border-primary/30 rounded-2xl p-10 mb-12 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -z-10"></div>
          <div className="relative flex flex-col sm:flex-row items-start gap-6">
            <div className="text-primary bg-primary/10 dark:bg-primary/20 p-4 rounded-xl shadow-md flex-shrink-0">
              {getIcon(metric.iconName, "w-14 h-14")}
            </div>
            <div className="flex-1 w-full">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 leading-tight" data-testid="metric-title">
                {metric.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {metric.shortDescription}
              </p>
            </div>
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
