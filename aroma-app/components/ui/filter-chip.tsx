'use client';

import { cn } from '@/lib/utils';

interface Props {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function FilterChip({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'font-mono text-[11px] tracking-[0.02em] px-3 py-1 rounded-full border transition-all',
        active
          ? 'bg-accent text-accent-fg border-accent'
          : 'bg-transparent text-fg-muted border-border hover:border-border-strong hover:text-fg'
      )}
    >
      {label}
    </button>
  );
}
