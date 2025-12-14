import { FunctionSquare, FileText } from "lucide-react";

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
    <section data-testid="section-formula">
      {/* Formula Card - Elevated Glass */}
      <div className="glass-card-elevated rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 mb-4 sm:mb-6">
        {/* Header */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/20 dark:bg-primary/30 text-primary">
            <FunctionSquare className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">The Formula</h2>
        </div>

        {/* Formula Display */}
        <div 
          className="font-mono text-sm sm:text-base lg:text-lg text-primary font-semibold p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 mb-4 sm:mb-5 overflow-x-auto"
          data-testid="formula"
        >
          {formula}
        </div>

        {/* Plain Explanation */}
        <p className="text-foreground/80 text-sm sm:text-base lg:text-[1.02rem] leading-relaxed">
          {formulaPlain}
        </p>
      </div>

      {/* Sample Calculation Card */}
      <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-lg dark:hover:shadow-glow-sm">
        {/* Header */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">Sample Calculation</h3>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base lg:text-[1.02rem]">
          {sampleCalculation.description}
        </p>

        {/* Steps */}
        <ul className="space-y-2.5 sm:space-y-3">
          {sampleCalculation.steps.map((step, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 sm:gap-4 text-foreground/90 text-sm sm:text-base lg:text-[1.02rem] leading-relaxed group/step"
            >
              <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-primary/10 dark:bg-primary/20 text-primary text-xs sm:text-sm font-semibold mt-0.5 transition-colors group-hover/step:bg-primary/20 dark:group-hover/step:bg-primary/30">
                {index + 1}
              </span>
              <span className="flex-1 pt-0.5">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
