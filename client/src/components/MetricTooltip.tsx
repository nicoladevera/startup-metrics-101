import { useState } from "react";
import { TOOLTIPS } from "@shared/metrics";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricTooltipProps {
  term: string;
  children?: React.ReactNode;
}

export function MetricTooltip({ term, children }: MetricTooltipProps) {
  const definition = TOOLTIPS[term];
  const [open, setOpen] = useState(false);

  if (!definition) {
    return <>{children || term}</>;
  }



  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={200}>
      <TooltipTrigger asChild>
        <span
          className="border-b-2 border-dotted border-primary cursor-help font-semibold text-primary"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        >
          {children || term}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-gray-800 text-white dark:bg-gray-900">
        <p className="text-sm leading-relaxed">{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function addTooltips(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  const terms = Object.keys(TOOLTIPS).sort((a, b) => b.length - a.length);

  const matches: Array<{ term: string; index: number }> = [];

  terms.forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({ term: match[0], index: match.index });
    }
  });

  matches.sort((a, b) => a.index - b.index);

  const used: number[] = [];
  matches.forEach((match, i) => {
    const overlaps = used.some(usedIndex => {
      const usedMatch = matches[usedIndex];
      return match.index < usedMatch.index + usedMatch.term.length &&
        match.index + match.term.length > usedMatch.index;
    });

    if (!overlaps) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <MetricTooltip key={`tooltip-${i}`} term={match.term}>
          {match.term}
        </MetricTooltip>
      );
      lastIndex = match.index + match.term.length;
      used.push(i);
    }
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
