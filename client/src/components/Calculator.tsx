import { useState, useEffect } from "react";
import { type CalculatorInput } from "@shared/metrics";
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
    setValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {inputs.map((input) => (
        <div key={input.name} className="space-y-3" data-testid={`input-group-${input.name}`}>
          <Label className="text-base font-semibold text-foreground">
            {input.label}
          </Label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative w-full sm:w-auto sm:min-w-[180px]">
              {input.prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
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
                className={`w-full px-4 py-3 text-base border-2 focus:border-primary transition-colors ${
                  input.prefix ? 'pl-7' : ''
                } ${input.suffix ? 'pr-16 sm:pr-20' : ''}`}
                data-testid={`input-${input.name}`}
              />
              {input.suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none text-sm">
                  {input.suffix}
                </span>
              )}
            </div>
            <Slider
              value={[values[input.name]]}
              onValueChange={([value]) => handleInputChange(input.name, value)}
              min={input.min}
              max={input.max}
              step={input.step}
              className="flex-1"
              data-testid={`slider-${input.name}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
