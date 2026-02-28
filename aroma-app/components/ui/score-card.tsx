import { cn } from '@/lib/utils';
import { MonoLabel } from './mono-label';

interface Props {
  value: number | null | undefined;
  label: string;
  suffix?: string;    // e.g. "/ 5"
  sublabel?: string;  // e.g. "2,431 ratings"
  className?: string;
}

export function ScoreCard({ value, label, suffix, sublabel, className }: Props) {
  return (
    <div className={cn(
      'border border-border rounded bg-muted p-3',
      className
    )}>
      <div className="font-mono text-[20px] tracking-tight text-fg leading-none mb-1 flex items-baseline gap-1">
        <span>{value != null ? value.toFixed(1) : '—'}</span>
        {suffix && (
          <span className="text-[12px] text-fg-subtle">{suffix}</span>
        )}
      </div>
      <MonoLabel>{label}</MonoLabel>
      {sublabel && (
        <div className="font-mono text-[9px] text-fg-subtle tracking-[0.04em] mt-0.5">
          {sublabel}
        </div>
      )}
    </div>
  );
}
