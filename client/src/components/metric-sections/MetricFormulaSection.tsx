import { Card } from "@/components/ui/card";

interface MetricFormulaSectionProps {
  formula: string;
  formulaPlain: string;
  sampleCalculation: {
    description: string;
    steps: string[];
  };
}

export function MetricFormulaSection({
  formula,
  formulaPlain,
  sampleCalculation,
}: MetricFormulaSectionProps) {
  return (
    <section className="mb-10" data-testid="section-formula">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-lg">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-foreground">The Formula</h2>
      </div>
      <Card className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent border-l-4 border-primary p-8 shadow-md rounded-xl">
        <div className="font-mono text-xl text-primary font-semibold mb-4 bg-primary/5 dark:bg-primary/10 p-4 rounded-lg" data-testid="formula">
          {formula}
        </div>
        <p className="text-foreground text-base leading-relaxed">
          {formulaPlain}
        </p>
      </Card>

      <div className="mt-8 bg-card dark:bg-card border border-card-border dark:border-border rounded-xl p-8 shadow-md">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <div className="bg-primary/10 dark:bg-primary/20 p-1.5 rounded-md">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          Sample Calculation
        </h3>
        <p className="text-muted-foreground mb-5 text-base">{sampleCalculation.description}</p>
        <ul className="space-y-3">
          {sampleCalculation.steps.map((step, index) => (
            <li key={index} className="text-foreground pl-5 border-l-2 border-primary/30 py-1.5 text-base leading-relaxed hover:border-primary/60 transition-colors duration-200">
              {step}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
