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
      text: 'text-success',
      bg: 'bg-success-light',
      textDark: 'text-success-dark'
    },
    warning: {
      text: 'text-warning',
      bg: 'bg-warning-light',
      textDark: 'text-warning-dark'
    },
    error: {
      text: 'text-error',
      bg: 'bg-error-light',
      textDark: 'text-error-dark'
    }
  };

  const colors = colorClasses[benchmark.color];

  return (
    <Card className="p-8 text-center shadow-lg mt-8" data-testid="result-display">
      <div className="space-y-4">
        <p className="text-lg text-gray-600 font-medium">
          {benchmark.label} Result
        </p>
        <div className={`text-5xl font-bold ${colors.text}`} data-testid="result-value">
          {formattedResult}
        </div>
        <div className={`${colors.bg} ${colors.textDark} rounded-lg p-4 mt-4`} data-testid="result-feedback">
          <p className="text-base leading-relaxed">{benchmark.feedback}</p>
        </div>
      </div>
    </Card>
  );
}
