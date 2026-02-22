export const SUPPORTED_LOCALES = ['es', 'en', 'fr'] as const;
export const DEFAULT_LOCALE = 'es' as const;

export type Locale = typeof SUPPORTED_LOCALES[number];

// Fields that get translated per perfume (stored in translations JSONB)
export const TRANSLATABLE_PERFUME_FIELDS = ['evokes', 'description'] as const;
export type TranslatablePerfumeField = typeof TRANSLATABLE_PERFUME_FIELDS[number];

// Vocabulary categories that use vocabulary_translations table
export const VOCABULARY_CATEGORIES = [
  'mood_tag',
  'aesthetic_tag',
  'praised_for',
  'criticized_for',
  'layer_role',
  'occasion',
] as const;
export type VocabularyCategory = typeof VOCABULARY_CATEGORIES[number];

// Maps locale codes to display names
export const LOCALE_NAMES: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
};

// Maps locale codes to language names for AI prompts
export const LOCALE_LANGUAGE_NAMES: Record<Locale, string> = {
  es: 'Spanish',
  en: 'English',
  fr: 'French',
};
