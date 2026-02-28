'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
}

// ── Animation variants ────────────────────────────────────────────────────────

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18, ease: 'easeOut' as const } },
  exit:    { opacity: 0, transition: { duration: 0.2,  ease: 'easeIn' as const, delay: 0.05 } },
};

const navVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  exit:    { transition: { staggerChildren: 0.03, staggerDirection: -1 as const } },
};

const linkVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' as const } },
};

// ─────────────────────────────────────────────────────────────────────────────

export function MobileNav({ links }: Props) {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  // Portal needs document.body — only available after hydration
  useEffect(() => { setMounted(true); }, []);

  // Close the menu once the new page has rendered (pathname changed).
  // Keeping the overlay alive during the route transition prevents flash of old content.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleLink = (href: string) => {
    // If already on this page, pathname won't change and the useEffect won't fire
    // e.g. pathname="/en/explore" ends with href="/explore"
    if (pathname.endsWith(href)) {
      setOpen(false);
    }
    router.push(href);
  };

  const overlay = (
    <motion.div
      key="mobile-nav"
      className="fixed inset-0 z-[100] bg-bg flex flex-col"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top bar */}
      <div className="h-[52px] shrink-0 flex items-center justify-between px-4 border-b border-border">
        <span className="font-mono text-[15px] font-medium tracking-tight text-fg">
          aroma<span className="text-fg-subtle font-light">.</span>
        </span>
        <button
          onClick={() => setOpen(false)}
          className="flex items-center justify-center w-8 h-8 text-fg-muted hover:text-fg transition-colors"
          aria-label="Close menu"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <motion.nav
        className="flex flex-col flex-1 justify-center px-6 gap-0 overflow-hidden"
        variants={navVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {links.map(({ href, label }) => (
          <motion.button
            key={href}
            variants={linkVariants}
            onClick={() => handleLink(href)}
            className="text-left text-[28px] font-light tracking-[-0.02em] text-fg py-5 border-b border-border first:border-t hover:text-fg-muted transition-colors"
          >
            {label}
          </motion.button>
        ))}
      </motion.nav>
    </motion.div>
  );

  return (
    <>
      {/* Hamburger */}
      <button
        className="md:hidden flex items-center justify-center w-8 h-8 text-fg-muted hover:text-fg transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M0 1h16M0 6h16M0 11h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {mounted && createPortal(
        <AnimatePresence>{open && overlay}</AnimatePresence>,
        document.body
      )}
    </>
  );
}
