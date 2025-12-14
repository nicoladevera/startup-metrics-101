import { BookOpen } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricDefinitionSectionProps {
  definition: string;
}

export function MetricDefinitionSection({ definition }: MetricDefinitionSectionProps) {
  return (
    <section className="group" data-testid="section-definition">
      <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-lg dark:hover:shadow-glow-sm">
        {/* Header */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">What Is It?</h2>
        </div>

        {/* Content */}
        <div className="text-sm sm:text-base lg:text-[1.05rem] leading-relaxed sm:leading-[1.85] text-foreground/90">
          <p>{addTooltips(definition)}</p>
        </div>
      </div>
    </section>
  );
}
