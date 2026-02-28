export const EUR_USD_RATE = 0.92;

export type Currency = 'USD' | 'EUR';

export function formatPrice(usd: number, currency: Currency): string {
  if (currency === 'USD') return `$${usd}`;
  const eur = usd * EUR_USD_RATE;
  const rounded = eur < 50 ? Math.round(eur) : Math.round(eur / 5) * 5;
  return `€${rounded}`;
}
