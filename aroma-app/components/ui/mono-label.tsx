import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function MonoLabel({ children, className }: Props) {
  return (
    <span className={cn(
      'font-mono-label text-fg-subtle',
      className
    )}>
      {children}
    </span>
  );
}
