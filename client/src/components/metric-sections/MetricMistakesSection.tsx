import { AlertTriangle } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricMistakesSectionProps {
  mistakes: string[];
}

export function MetricMistakesSection({ mistakes }: MetricMistakesSectionProps) {
  return (
    <section className="mb-10" data-testid="section-mistakes">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-warning/10 dark:bg-warning/20 p-2.5 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-warning" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Common Mistakes to Avoid</h2>
      </div>
      <ul className="space-y-4">
        {mistakes.map((mistake, index) => (
          <li
            key={index}
            className="bg-warning/5 dark:bg-warning/10 rounded-xl border border-warning/20 dark:border-warning/30 p-6 text-[1.05rem] leading-relaxed flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            data-testid={`mistake-${index}`}
          >
            <div className="bg-warning/10 dark:bg-warning/20 p-2 rounded-lg flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <span className="text-foreground flex-1">{addTooltips(mistake)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
