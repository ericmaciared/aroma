import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getUser } from '@/lib/auth';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserMenu } from '@/components/layout/user-menu';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { CurrencySwitcher } from '@/components/layout/currency-switcher';
import { MobileNav } from '@/components/layout/mobile-nav';
import { NavLink } from '@/components/layout/nav-link';
import { Button } from '@/components/ui/button';

export async function Header() {
  const user = await getUser();
  const t = await getTranslations('nav');

  const navLinks = [
    { href: '/explore',   label: t('explore'),   also: ['/perfume']  },
    { href: '/recommend', label: t('recommend'),  also: []            },
    { href: '/brands',    label: t('brands'),    also: ['/brand']    },
    { href: '/notes',     label: t('notes'),     also: ['/note']     },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg/80 border-b border-border-strong backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-mono text-[15px] font-medium tracking-tight text-fg">
          aroma<span className="text-amber">·</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label, also }) => (
            <NavLink key={href} href={href} label={label} also={also} />
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5">
            <LocaleSwitcher />
            <CurrencySwitcher />
          </div>
          <ThemeToggle />
          {user ? (
            <UserMenu email={user.email ?? ''} />
          ) : (
            <Button asChild size="sm"
              className="h-7 px-3 text-[12px] font-medium bg-accent text-accent-fg hover:opacity-85 rounded-sm">
              <Link href="/auth/login">{t('signIn')}</Link>
            </Button>
          )}
          <MobileNav links={navLinks} />
        </div>

      </div>
    </header>
  );
}
