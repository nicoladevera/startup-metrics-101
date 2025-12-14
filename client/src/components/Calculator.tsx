import { useState, useEffect } from "react";
import { type CalculatorInput } from "@shared/metrics";
import { sanitizeNumericInput } from "@shared/validation";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculatorProps {
  inputs: CalculatorInput[];
  onCalculate: (values: Record<string, number>) => void;
}

export function Calculator({ inputs, onCalculate }: CalculatorProps) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    inputs.forEach(input => {
      initial[input.name] = input.defaultValue;
    });
    return initial;
  });

  useEffect(() => {
    onCalculate(values);
  }, [values, onCalculate]);

  const handleInputChange = (name: string, value: number) => {
    try {
      // Sanitize and validate the input
      const sanitizedValue = sanitizeNumericInput(value);
      setValues(prev => ({ ...prev, [name]: sanitizedValue }));
    } catch (error) {
      // If validation fails, revert to previous value or use 0
      console.warn('Invalid input value:', value, error);
      setValues(prev => ({ ...prev, [name]: prev[name] || 0 }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {inputs.map((input) => (
        <div key={input.name} className="space-y-3 sm:space-y-4" data-testid={`input-group-${input.name}`}>
          {/* Label */}
          <Label className="text-xs sm:text-sm font-medium text-foreground/80 uppercase tracking-wide">
            {input.label}
          </Label>

          {/* Input Row */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Number Input with Glass Effect */}
            <div className="relative">
              {input.prefix && (
                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none font-medium text-sm sm:text-base">
                  {input.prefix}
                </span>
              )}
              <Input
                type="number"
                value={values[input.name]}
                onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value) || 0)}
                min={input.min}
                max={input.max}
                step={input.step}
                className={`w-full h-12 sm:h-14 px-3 sm:px-4 text-base sm:text-lg font-semibold bg-background/50 dark:bg-white/5 border-border/50 dark:border-white/10 rounded-lg sm:rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                  input.prefix ? 'pl-7 sm:pl-8' : ''
                } ${input.suffix ? 'pr-16 sm:pr-20' : ''}`}
                data-testid={`input-${input.name}`}
              />
              {input.suffix && (
                <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-xs sm:text-sm font-medium">
                  {input.suffix}
                </span>
              )}
            </div>

            {/* Slider */}
            <div className="px-1">
              <Slider
                value={[values[input.name]]}
                onValueChange={([value]) => handleInputChange(input.name, value)}
                min={input.min}
                max={input.max}
                step={input.step}
                className="w-full"
                data-testid={`slider-${input.name}`}
              />
              {/* Min/Max Labels */}
              <div className="flex justify-between mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-muted-foreground">
                <span>{input.prefix}{input.min.toLocaleString()}{input.suffix}</span>
                <span>{input.prefix}{input.max.toLocaleString()}{input.suffix}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
