import { AlertTriangle } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricMistakesSectionProps {
  mistakes: string[];
}

export function MetricMistakesSection({ mistakes }: MetricMistakesSectionProps) {
  return (
    <section className="mb-12" data-testid="section-mistakes">
      <div className="flex items-center gap-3 mb-5">
        <AlertTriangle className="w-7 h-7 text-primary" />
        <h2 className="text-3xl font-bold text-primary">Common Mistakes to Avoid</h2>
      </div>
      <ul className="space-y-4">
        {mistakes.map((mistake, index) => (
          <li
            key={index}
            className="bg-warning-light dark:bg-warning-dark/20 rounded-lg border-l-4 border-warning p-4 text-[1.05rem] leading-relaxed flex items-start gap-3"
            data-testid={`mistake-${index}`}
          >
            <AlertTriangle className="w-5 h-5 text-warning dark:text-warning-light flex-shrink-0 mt-0.5" />
            <span className="text-foreground">{addTooltips(mistake)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
