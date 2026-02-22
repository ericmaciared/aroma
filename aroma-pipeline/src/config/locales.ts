import { type Locale } from '@aroma/shared';

// Locales to enrich during pipeline runs
// English is canonical (stored in flat columns), others go to translations JSONB
export const PIPELINE_LOCALES: Locale[] = ['es', 'fr'];

// Fields to translate per locale
export const FIELDS_TO_TRANSLATE = ['evokes', 'description'] as const;
