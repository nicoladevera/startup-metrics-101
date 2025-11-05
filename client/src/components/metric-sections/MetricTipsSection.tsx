import { Lightbulb } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricTipsSectionProps {
  tips: string[];
}

export function MetricTipsSection({ tips }: MetricTipsSectionProps) {
  return (
    <section className="mb-12" data-testid="section-tips">
      <div className="flex items-center gap-3 mb-5">
        <Lightbulb className="w-7 h-7 text-primary" />
        <h2 className="text-3xl font-bold text-primary">Pro Tips</h2>
      </div>
      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="bg-success-light dark:bg-success-dark/20 rounded-lg border-l-4 border-success p-4 text-[1.05rem] leading-relaxed flex items-start gap-3"
            data-testid={`tip-${index}`}
          >
            <Lightbulb className="w-5 h-5 text-success dark:text-success-light flex-shrink-0 mt-0.5" />
            <span className="text-foreground">{addTooltips(tip)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
