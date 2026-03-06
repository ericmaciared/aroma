'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { MonoLabel } from './mono-label';

interface Props {
  value: number | null | undefined;
  label: string;
  suffix?: string;
  sublabel?: string;
  className?: string;
}

function useCountUp(target: number | null | undefined, duration = 800) {
  const [display, setDisplay] = useState<number | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (target == null) { setDisplay(null); return; }
    const end = target;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((eased * end).toFixed(1)));
      if (progress < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return display;
}

export function ScoreCard({ value, label, suffix, sublabel, className }: Props) {
  const displayed = useCountUp(value);
  const isHighScore = value != null && value >= 4.0;

  return (
    <div className={cn(
      'border border-border rounded bg-muted p-3 border-l-2 transition-colors',
      isHighScore ? 'border-l-amber' : 'border-l-transparent',
      className
    )}>
      <div className="font-mono-data text-fg leading-none mb-1 flex items-baseline gap-1">
        <span>{displayed != null ? displayed.toFixed(1) : '—'}</span>
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
