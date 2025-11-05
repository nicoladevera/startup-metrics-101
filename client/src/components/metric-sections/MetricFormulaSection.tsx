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
    <section className="mb-12" data-testid="section-formula">
      <h2 className="text-3xl font-bold text-primary mb-5">The Formula</h2>
      <Card className="bg-muted border-l-4 border-primary p-6">
        <div className="font-mono text-xl text-primary font-semibold mb-3" data-testid="formula">
          {formula}
        </div>
        <p className="text-muted-foreground text-base leading-relaxed">
          {formulaPlain}
        </p>
      </Card>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-foreground mb-3">Sample Calculation:</h3>
        <p className="text-muted-foreground mb-3">{sampleCalculation.description}</p>
        <ul className="space-y-2">
          {sampleCalculation.steps.map((step, index) => (
            <li key={index} className="text-muted-foreground pl-4 border-l-2 border">
              {step}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
