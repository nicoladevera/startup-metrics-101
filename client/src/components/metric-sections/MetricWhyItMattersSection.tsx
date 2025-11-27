import { Target } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricWhyItMattersSectionProps {
  whyItMatters: string;
}

export function MetricWhyItMattersSection({ whyItMatters }: MetricWhyItMattersSectionProps) {
  return (
    <section className="mb-10" data-testid="section-why-it-matters">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-lg">
          <Target className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Why It Matters</h2>
      </div>
      <div className="bg-card dark:bg-card border border-card-border dark:border-border rounded-xl p-8 shadow-md">
        <div className="text-[1.1rem] leading-[1.8] text-foreground">
          <p>{addTooltips(whyItMatters)}</p>
        </div>
      </div>
    </section>
  );
}
