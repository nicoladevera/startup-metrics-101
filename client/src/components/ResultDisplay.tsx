import { type BenchmarkZone } from "@shared/metrics";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface ResultDisplayProps {
  result: number | null;
  formattedResult: string;
  benchmark: BenchmarkZone;
}

export function ResultDisplay({ formattedResult, benchmark }: ResultDisplayProps) {
  const colorConfig = {
    success: {
      icon: CheckCircle2,
      badge: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      result: 'text-emerald-600 dark:text-emerald-400',
      feedback: 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 dark:border-emerald-500/20',
      feedbackText: 'text-emerald-700 dark:text-emerald-300',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.15)] dark:shadow-[0_0_60px_rgba(16,185,129,0.20)]',
    },
    warning: {
      icon: AlertCircle,
      badge: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20',
      result: 'text-amber-600 dark:text-amber-400',
      feedback: 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20 dark:border-amber-500/20',
      feedbackText: 'text-amber-700 dark:text-amber-300',
      glow: 'shadow-[0_0_40px_rgba(245,158,11,0.15)] dark:shadow-[0_0_60px_rgba(245,158,11,0.20)]',
    },
    error: {
      icon: XCircle,
      badge: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/20',
      result: 'text-red-600 dark:text-red-400',
      feedback: 'bg-red-500/5 dark:bg-red-500/10 border-red-500/20 dark:border-red-500/20',
      feedbackText: 'text-red-700 dark:text-red-300',
      glow: 'shadow-[0_0_40px_rgba(239,68,68,0.15)] dark:shadow-[0_0_60px_rgba(239,68,68,0.20)]',
    }
  };

  const config = colorConfig[benchmark.color];
  const Icon = config.icon;

  return (
    <div 
      className={`mt-6 sm:mt-8 lg:mt-10 p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl glass-card ${config.glow} transition-all duration-500`}
      data-testid="result-display"
    >
      <div className="text-center space-y-4 sm:space-y-6">
        {/* Status Badge */}
        <div className="flex justify-center">
          <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border ${config.badge}`}>
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-semibold">{benchmark.label}</span>
          </div>
        </div>

        {/* Result Value */}
        <div 
          className={`font-bold ${config.result} stats-number`}
          style={{ fontSize: 'clamp(1.5rem, 8vw, 4rem)' }}
          data-testid="result-value"
        >
          {formattedResult}
        </div>

        {/* Feedback Card */}
        <div 
          className={`${config.feedback} ${config.feedbackText} rounded-lg sm:rounded-xl p-4 sm:p-5 border`}
          data-testid="result-feedback"
        >
          <p className="text-sm sm:text-base lg:text-[1.02rem] leading-relaxed">
            {benchmark.feedback}
          </p>
        </div>
      </div>
    </div>
  );
}
