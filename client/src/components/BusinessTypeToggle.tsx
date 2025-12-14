import { useState } from 'react';
import { Building2, ShoppingCart } from 'lucide-react';
import { BusinessType } from '@shared/metrics';

interface BusinessTypeToggleProps {
  value: BusinessType;
  onChange: (value: BusinessType) => void;
}

export function BusinessTypeToggle({ value, onChange }: BusinessTypeToggleProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3" data-testid="business-type-toggle">
      <span className="text-sm font-medium text-muted-foreground">Business Type:</span>
      <div className="inline-flex rounded-xl p-1 bg-secondary/50 dark:bg-white/5 border border-border/50 dark:border-white/10">
        <button
          onClick={() => onChange('B2B')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 rounded-lg ${
            value === 'B2B'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/5'
          }`}
          data-testid="toggle-b2b"
        >
          <Building2 className="w-4 h-4" />
          B2B
        </button>
        <button
          onClick={() => onChange('B2C')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200 rounded-lg ${
            value === 'B2C'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/5'
          }`}
          data-testid="toggle-b2c"
        >
          <ShoppingCart className="w-4 h-4" />
          B2C
        </button>
      </div>
    </div>
  );
}

export function useBusinessType(): [BusinessType, (value: BusinessType) => void] {
  const [businessType, setBusinessTypeState] = useState<BusinessType>(() => {
    const stored = localStorage.getItem('businessType');
    return (stored === 'B2C' ? 'B2C' : 'B2B') as BusinessType;
  });

  const setBusinessType = (value: BusinessType) => {
    setBusinessTypeState(value);
    localStorage.setItem('businessType', value);
  };

  return [businessType, setBusinessType];
}
