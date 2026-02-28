import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getUser } from '@/lib/auth';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserMenu } from '@/components/layout/user-menu';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { CurrencySwitcher } from '@/components/layout/currency-switcher';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Button } from '@/components/ui/button';

export async function Header() {
  const user = await getUser();
  const t = await getTranslations('nav');

  const navLinks = [
    { href: '/explore',   label: t('explore')   },
    { href: '/recommend', label: t('recommend')  },
    { href: '/brands',    label: t('brands')     },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg/80 border-b border-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-mono text-[15px] font-medium tracking-tight text-fg">
          aroma<span className="text-fg-subtle font-light">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href}
              className="text-[13px] text-fg-muted hover:text-fg transition-colors tracking-wide">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <LocaleSwitcher />
            <CurrencySwitcher />
          </div>
          <ThemeToggle />
          {user ? (
            <UserMenu email={user.email ?? ''} />
          ) : (
            <Button asChild size="sm"
              className="h-7 px-3 text-[12px] font-medium bg-accent text-accent-fg hover:opacity-85 rounded">
              <Link href="/auth/login">{t('signIn')}</Link>
            </Button>
          )}
          {/* Mobile hamburger — only shown on small screens */}
          <MobileNav links={navLinks} />
        </div>

      </div>
    </header>
  );
}
