import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AccordTag({ children, className }: Props) {
  return (
    <span className={cn(
      'font-mono text-[10px] tracking-[0.04em] px-1.5 py-0.5',
      'bg-tag-bg text-tag-fg rounded-sm',
      className
    )}>
      {children}
    </span>
  );
}
