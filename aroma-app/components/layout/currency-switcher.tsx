'use client';

import { useCurrency } from '@/contexts/currency-context';

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  function toggle() {
    setCurrency(currency === 'USD' ? 'EUR' : 'USD');
  }

  return (
    <button
      onClick={toggle}
      suppressHydrationWarning
      className="font-mono text-[11px] text-fg-subtle hover:text-fg transition-colors tracking-[0.04em] px-2 py-1 rounded-sm border border-border hover:border-border-strong"
    >
      {currency}
    </button>
  );
}
