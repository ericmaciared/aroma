import { cn } from '@/lib/utils';

interface Props {
  label: string;
  value: number; // 0–10
  className?: string;
}

export function SensoryBar({ label, value, className }: Props) {
  const pct = Math.min(100, Math.max(0, value * 10));

  return (
    <div className={cn('flex items-center gap-3 py-1.5', className)}>
      <span className="font-mono text-[10px] text-fg-subtle tracking-[0.06em] w-24 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-[2px] bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-fg rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[10px] text-fg-subtle w-6 text-right shrink-0">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
