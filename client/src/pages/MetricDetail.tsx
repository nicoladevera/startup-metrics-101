import { useState, useCallback } from "react";
import { useRoute, Link } from "wouter";
import { getMetricById } from "@shared/metrics";
import { Calculator } from "@/components/Calculator";
import { ResultDisplay } from "@/components/ResultDisplay";
import { MetricChart } from "@/components/MetricChart";
import { addTooltips } from "@/components/MetricTooltip";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Target, Calculator as CalcIcon, Lightbulb, AlertTriangle } from "lucide-react";

export default function MetricDetail() {
  const [, params] = useRoute("/metric/:id");
  const metric = params?.id ? getMetricById(params.id) : undefined;
  
  const [calculatorValues, setCalculatorValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = useCallback((values: Record<string, number>) => {
    if (!metric) return;
    setCalculatorValues(values);
    const calculatedResult = metric.calculator.calculateFn(values);
    setResult(calculatedResult);
  }, [metric]);

  if (!metric) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Metric Not Found</h1>
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
  const benchmark = result !== null ? metric.calculator.getBenchmark(result) : null;

  // Generate sample chart data
  const generateChartData = () => {
    if (metric.chartType === 'line') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const baseValue = result || 10000;
      return {
        labels: months,
        data: months.map((_, i) => baseValue * (1 + i * 0.15))
      };
    } else if (metric.chartType === 'bar') {
      return {
        labels: ['LTV', 'CAC'],
        data: [calculatorValues.ltv || 3000, calculatorValues.cac || 1000]
      };
    } else if (metric.chartType === 'gauge') {
      return {
        labels: ['Current'],
        data: [result || 0]
      };
    }
    return { labels: [], data: [] };
  };

  const chartData = generateChartData();

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

        {/* Definition Section */}
        <section className="mb-12" data-testid="section-definition">
          <div className="flex items-center gap-3 mb-5">
            <BookOpen className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary">What Is It?</h2>
          </div>
          <div className="text-[1.1rem] leading-[1.8] text-gray-700 space-y-4">
            <p>{addTooltips(metric.definition)}</p>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className="mb-12" data-testid="section-why-it-matters">
          <div className="flex items-center gap-3 mb-5">
            <Target className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Why It Matters</h2>
          </div>
          <div className="text-[1.1rem] leading-[1.8] text-gray-700">
            <p>{addTooltips(metric.whyItMatters)}</p>
          </div>
        </section>

        {/* Formula Section */}
        <section className="mb-12" data-testid="section-formula">
          <h2 className="text-3xl font-bold text-primary mb-5">The Formula</h2>
          <Card className="bg-gray-100 border-l-4 border-primary p-6">
            <div className="font-mono text-xl text-blue-900 font-semibold mb-3" data-testid="formula">
              {metric.formula}
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              {metric.formulaPlain}
            </p>
          </Card>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Sample Calculation:</h3>
            <p className="text-gray-700 mb-3">{metric.sampleCalculation.description}</p>
            <ul className="space-y-2">
              {metric.sampleCalculation.steps.map((step, index) => (
                <li key={index} className="text-gray-700 pl-4 border-l-2 border-gray-300">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mb-12" data-testid="section-calculator">
          <div className="flex items-center gap-3 mb-5">
            <CalcIcon className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Interactive Calculator</h2>
          </div>
          <Card className="bg-gray-50 border-2 border-gray-200 p-8">
            <Calculator
              inputs={metric.calculator.inputs}
              onCalculate={handleCalculate}
            />
            
            {result !== null && benchmark && (
              <ResultDisplay
                result={result}
                formattedResult={formattedResult}
                benchmark={benchmark}
              />
            )}
          </Card>
        </section>

        {/* Chart Section */}
        {metric.hasChart && result !== null && chartData.data.length > 0 && (
          <section className="mb-12" data-testid="section-chart">
            <h2 className="text-3xl font-bold text-primary mb-5">Visualization</h2>
            <MetricChart
              type={metric.chartType!}
              data={chartData.data}
              labels={chartData.labels}
              title={`${metric.name} Trend`}
            />
          </section>
        )}

        {/* Tips Section */}
        <section className="mb-12" data-testid="section-tips">
          <div className="flex items-center gap-3 mb-5">
            <Lightbulb className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Pro Tips</h2>
          </div>
          <ul className="space-y-4">
            {metric.tips.map((tip, index) => (
              <li
                key={index}
                className="bg-gray-100 rounded-lg border-l-4 border-success p-4 text-[1.05rem] leading-relaxed flex items-start gap-3"
                data-testid={`tip-${index}`}
              >
                <Lightbulb className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>{addTooltips(tip)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Common Mistakes Section */}
        <section className="mb-12" data-testid="section-mistakes">
          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold text-primary">Common Mistakes to Avoid</h2>
          </div>
          <ul className="space-y-4">
            {metric.commonMistakes.map((mistake, index) => (
              <li
                key={index}
                className="bg-warning-light rounded-lg border-l-4 border-warning p-4 text-[1.05rem] leading-relaxed flex items-start gap-3"
                data-testid={`mistake-${index}`}
              >
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <span>{addTooltips(mistake)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
