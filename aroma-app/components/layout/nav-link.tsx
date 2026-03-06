'use client';

import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

interface Props {
  href: string;
  label: string;
  also?: string[];
}

export function NavLink({ href, label, also = [] }: Props) {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    pathname.startsWith(href + '/') ||
    also.some(p => pathname === p || pathname.startsWith(p + '/'));

  return (
    <Link
      href={href}
      className={cn(
        'relative text-[13px] transition-colors tracking-wide',
        isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
      )}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-[18px] left-0 right-0 h-[2px] bg-amber rounded-full" />
      )}
    </Link>
  );
}
