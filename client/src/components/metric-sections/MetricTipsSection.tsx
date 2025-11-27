import { Lightbulb } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricTipsSectionProps {
  tips: string[];
}

export function MetricTipsSection({ tips }: MetricTipsSectionProps) {
  return (
    <section className="mb-10" data-testid="section-tips">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-success/10 dark:bg-success/20 p-2.5 rounded-lg">
          <Lightbulb className="w-6 h-6 text-success" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Pro Tips</h2>
      </div>
      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="bg-success/5 dark:bg-success/10 rounded-xl border border-success/20 dark:border-success/30 p-6 text-[1.05rem] leading-relaxed flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            data-testid={`tip-${index}`}
          >
            <div className="bg-success/10 dark:bg-success/20 p-2 rounded-lg flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-success" />
            </div>
            <span className="text-foreground flex-1">{addTooltips(tip)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
