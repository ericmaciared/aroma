import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en', 'fr'],
  defaultLocale: 'es',
  // Spanish gets clean URLs: /explore
  // Others get prefixed: /en/explore, /fr/explore
  localePrefix: 'as-needed',
});
