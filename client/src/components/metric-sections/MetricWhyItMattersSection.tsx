import { Target } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricWhyItMattersSectionProps {
  whyItMatters: string;
}

export function MetricWhyItMattersSection({ whyItMatters }: MetricWhyItMattersSectionProps) {
  return (
    <section className="mb-12" data-testid="section-why-it-matters">
      <div className="flex items-center gap-3 mb-5">
        <Target className="w-7 h-7 text-primary" />
        <h2 className="text-3xl font-bold text-primary">Why It Matters</h2>
      </div>
      <div className="text-[1.1rem] leading-[1.8] text-muted-foreground">
        <p>{addTooltips(whyItMatters)}</p>
      </div>
    </section>
  );
}
