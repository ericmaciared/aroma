import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getUser } from '@/lib/auth';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserMenu } from '@/components/layout/user-menu';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { CurrencySwitcher } from '@/components/layout/currency-switcher';
import { Button } from '@/components/ui/button';

export async function Header() {
  const user = await getUser();
  const t = await getTranslations('nav');

  return (
    <header className="sticky top-0 z-50 bg-bg/80 border-b border-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-[52px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-mono text-[15px] font-medium tracking-tight text-fg">
          aroma<span className="text-fg-subtle font-light">.</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-7">
          <Link href="/explore"
            className="text-[13px] text-fg-muted hover:text-fg transition-colors tracking-wide">
            {t('explore')}
          </Link>
          <Link href="/recommend"
            className="text-[13px] text-fg-muted hover:text-fg transition-colors tracking-wide">
            {t('recommend')}
          </Link>
          <Link href="/brands"
            className="text-[13px] text-fg-muted hover:text-fg transition-colors tracking-wide">
            {t('brands')}
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <CurrencySwitcher />
          <ThemeToggle />
          {user ? (
            <UserMenu email={user.email ?? ''} />
          ) : (
            <Button asChild size="sm"
              className="h-7 px-3 text-[12px] font-medium bg-accent text-accent-fg hover:opacity-85 rounded">
              <Link href="/auth/login">{t('signIn')}</Link>
            </Button>
          )}
        </div>

      </div>
    </header>
  );
}
