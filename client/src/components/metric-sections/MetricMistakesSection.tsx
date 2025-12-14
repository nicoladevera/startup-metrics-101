import { AlertTriangle, XCircle } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricMistakesSectionProps {
  mistakes: string[];
}

export function MetricMistakesSection({ mistakes }: MetricMistakesSectionProps) {
  return (
    <section data-testid="section-mistakes">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground">Common Mistakes</h2>
      </div>

      {/* Mistakes List */}
      <ul className="space-y-3 sm:space-y-4">
        {mistakes.map((mistake, index) => (
          <li
            key={index}
            className="group glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-l-4 border-amber-500/50 hover:border-amber-500 transition-all duration-300 hover:shadow-lg"
            data-testid={`mistake-${index}`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 mt-0.5">
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="flex-1 text-sm sm:text-base lg:text-[1.02rem] leading-relaxed text-foreground/90">
                {addTooltips(mistake)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
