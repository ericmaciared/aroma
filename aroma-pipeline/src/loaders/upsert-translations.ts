import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import type { Locale } from '@aroma/shared';

interface TranslationData {
  evokes?: string[];
  description?: string;
}

/**
 * Merges new translations into the perfume's translations JSONB column.
 * Safe to call multiple times — only updates the specified locale.
 */
export async function upsertPerfumeTranslations(
  perfumeId: string,
  locale: Locale,
  data: TranslationData
): Promise<void> {
  // Use Postgres jsonb merge to avoid overwriting other locales
  const { error } = await supabase.rpc('merge_perfume_translations', {
    p_perfume_id: perfumeId,
    p_locale: locale,
    p_data: data,
  });

  if (error) throw new Error(`Failed to upsert translations for ${perfumeId}: ${error.message}`);

  logger.info(`Upserted ${locale} translations for perfume ${perfumeId}`);
}
