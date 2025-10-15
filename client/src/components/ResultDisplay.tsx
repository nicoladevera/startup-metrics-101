import { type BenchmarkZone } from "@shared/metrics";
import { Card } from "@/components/ui/card";

interface ResultDisplayProps {
  result: number;
  formattedResult: string;
  benchmark: BenchmarkZone;
}

export function ResultDisplay({ formattedResult, benchmark }: ResultDisplayProps) {
  const colorClasses = {
    success: {
      text: 'text-success dark:text-success-light',
      bg: 'bg-success-light dark:bg-success-dark/20',
      textColor: 'text-success-dark dark:text-success-light'
    },
    warning: {
      text: 'text-warning dark:text-warning-light',
      bg: 'bg-warning-light dark:bg-warning-dark/20',
      textColor: 'text-warning-dark dark:text-warning-light'
    },
    error: {
      text: 'text-error dark:text-error-light',
      bg: 'bg-error-light dark:bg-error-dark/20',
      textColor: 'text-error-dark dark:text-error-light'
    }
  };

  const colors = colorClasses[benchmark.color];

  return (
    <Card className="p-4 sm:p-6 lg:p-8 text-center shadow-lg mt-8" data-testid="result-display">
      <div className="space-y-4">
        <p className="text-lg text-muted-foreground font-medium">
          {benchmark.label} Result
        </p>
        <div className={`font-bold ${colors.text} whitespace-nowrap`} style={{ fontSize: 'clamp(1.25rem, 5vw, 3rem)' }} data-testid="result-value">
          {formattedResult}
        </div>
        <div className={`${colors.bg} ${colors.textColor} rounded-lg p-4 mt-4`} data-testid="result-feedback">
          <p className="text-base leading-relaxed">{benchmark.feedback}</p>
        </div>
      </div>
    </Card>
  );
}
