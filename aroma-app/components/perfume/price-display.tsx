'use client';

import { useCurrency } from '@/contexts/currency-context';
import { formatPrice } from '@/lib/format-price';

interface PriceDisplayProps {
  priceUsd?: number | null;
  className?: string;
}

export function PriceDisplay({ priceUsd, className }: PriceDisplayProps) {
  const { currency } = useCurrency();

  if (priceUsd == null) return <span className={className}>—</span>;

  return <span className={className}>{formatPrice(priceUsd, currency)}</span>;
}
