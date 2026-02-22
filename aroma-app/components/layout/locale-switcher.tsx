'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { LOCALE_NAMES, SUPPORTED_LOCALES } from '@aroma/shared';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="font-mono text-[11px] text-fg-subtle hover:text-fg transition-colors tracking-[0.06em] px-2 py-1 rounded hover:bg-bg-muted">
          {locale.toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {SUPPORTED_LOCALES.map(loc => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`font-mono text-[11px] tracking-[0.06em] ${locale === loc ? 'text-fg' : 'text-fg-muted'}`}
          >
            {loc.toUpperCase()} — {LOCALE_NAMES[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
