import { cn } from '@/lib/utils';
import { MonoLabel } from './mono-label';

interface Props {
  value: number | null | undefined;
  label: string;
  className?: string;
}

export function ScoreCard({ value, label, className }: Props) {
  return (
    <div className={cn(
      'border border-border rounded bg-muted p-3',
      className
    )}>
      <div className="font-mono text-[20px] tracking-tight text-fg leading-none mb-1">
        {value != null ? value.toFixed(1) : '—'}
      </div>
      <MonoLabel>{label}</MonoLabel>
    </div>
  );
}
