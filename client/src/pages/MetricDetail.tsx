import { useState, useCallback, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { getMetricById } from "@shared/metrics";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useBusinessType } from "@/components/BusinessTypeToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Home } from "lucide-react";
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
  const [isLoaded, setIsLoaded] = useState(false);

  const [result, setResult] = useState<number | null>(null);
  const [businessType, setBusinessType] = useBusinessType();

  useEffect(() => {
    if (metric) {
      document.title = `Startup Metrics 101 - ${metric.name}`;
      window.scrollTo(0, 0);
    }
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-muted mb-6">
            <Home className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Metric Not Found</h1>
          <p className="text-muted-foreground mb-8">The metric you're looking for doesn't exist.</p>
          <Link href="/">
            <Button data-testid="button-back-home" size="lg">
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/[0.07] via-transparent to-indigo-500/[0.05] dark:from-blue-600/15 dark:via-blue-900/10 dark:to-indigo-900/20 pointer-events-none" />
      
      {/* Secondary radial glow - both modes */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)] pointer-events-none" />
      
      {/* Bottom corner accent */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.10),transparent_50%)] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Header */}
        <div className={`flex items-center justify-between pt-4 sm:pt-6 lg:pt-8 mb-4 sm:mb-6 lg:mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Link href="/">
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground text-sm" 
              data-testid="button-back"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">All Metrics</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        {/* Hero Section */}
        <div className={`relative mb-8 sm:mb-10 lg:mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0085FF] dark:from-[#0a1220] dark:via-[#0d1829] dark:to-[#101d30]" />
            
            {/* Decorative elements - hidden on mobile for performance */}
            <div className="hidden sm:block absolute top-0 right-0 w-60 lg:w-80 h-60 lg:h-80 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
            <div className="hidden sm:block absolute bottom-0 left-0 w-40 lg:w-60 h-40 lg:h-60 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
            
            {/* Content */}
            <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-16">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-white">
                  {getIcon(metric.iconName, "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10")}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h1 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 tracking-tight" 
                    data-testid="metric-title"
                  >
                    {metric.name}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl">
                    {metric.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className={`space-y-6 sm:space-y-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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

        {/* Bottom Navigation */}
        <div className={`mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-border/50 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to All Metrics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
