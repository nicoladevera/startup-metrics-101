import { BookOpen } from "lucide-react";
import { addTooltips } from "@/components/MetricTooltip";

interface MetricDefinitionSectionProps {
  definition: string;
}

export function MetricDefinitionSection({ definition }: MetricDefinitionSectionProps) {
  return (
    <section className="mb-12" data-testid="section-definition">
      <div className="flex items-center gap-3 mb-5">
        <BookOpen className="w-7 h-7 text-primary" />
        <h2 className="text-3xl font-bold text-primary">What Is It?</h2>
      </div>
      <div className="text-[1.1rem] leading-[1.8] text-muted-foreground space-y-4">
        <p>{addTooltips(definition)}</p>
      </div>
    </section>
  );
}
