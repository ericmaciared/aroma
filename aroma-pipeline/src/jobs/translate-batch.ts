import 'dotenv/config';
import { supabase } from '../config/supabase.js';
import { translatePerfumeFields } from '../enrichers/translation-enricher.js';
import { upsertPerfumeTranslations } from '../loaders/upsert-translations.js';
import { loadCheckpoint, saveCheckpoint } from '../utils/checkpoint.js';
import { getCostSummary } from '../utils/cost-tracker.js';
import { logger } from '../utils/logger.js';
import { PIPELINE_LOCALES } from '../config/locales.js';
import type { Locale } from '@aroma/shared';

const BATCH_SIZE = 20;
const JOB_NAME = 'translate-batch';

interface Checkpoint {
  lastProcessedId: string | null;
  processedCount: number;
  locale: Locale;
}

async function translateBatch(targetLocale: Locale) {
  logger.info(`Starting translation batch for locale: ${targetLocale}`);

  const checkpoint = loadCheckpoint<Checkpoint>(`${JOB_NAME}-${targetLocale}`) ?? {
    lastProcessedId: null,
    processedCount: 0,
    locale: targetLocale,
  };

  logger.info(`Resuming from checkpoint`, checkpoint);

  let processed = checkpoint.processedCount;
  let cursor = checkpoint.lastProcessedId;
  let hasMore = true;

  while (hasMore) {
    // Fetch perfumes that don't yet have translations for this locale
    let query = supabase
      .from('perfumes')
      .select('id, name, evokes, brands(name)')
      .is(`translations->${targetLocale}`, null)  // not yet translated
      .not('evokes', 'is', null)                  // has English evokes to translate
      .order('id')
      .limit(BATCH_SIZE);

    if (cursor) query = query.gt('id', cursor);

    const { data, error } = await query;
    if (error) throw new Error(`Fetch failed: ${error.message}`);
    if (!data || data.length === 0) { hasMore = false; break; }

    for (const perfume of data) {
      try {
        const translated = await translatePerfumeFields(
          {
            perfumeName: perfume.name,
            brandName: (perfume as any).brands?.name ?? '',
            evokes: perfume.evokes ?? [],
          },
          targetLocale
        );

        await upsertPerfumeTranslations(perfume.id, targetLocale, translated);
        processed++;
        cursor = perfume.id;

        saveCheckpoint(`${JOB_NAME}-${targetLocale}`, {
          lastProcessedId: cursor,
          processedCount: processed,
          locale: targetLocale,
        });

        // Rate limiting
        await new Promise(r => setTimeout(r, 200));

      } catch (err) {
        logger.error(`Failed to translate perfume ${perfume.id}`, err);
      }
    }

    logger.info(`Progress: ${processed} perfumes translated to ${targetLocale}`);
    if (data.length < BATCH_SIZE) hasMore = false;
  }

  logger.success(`Translation complete for ${targetLocale}. Total: ${processed}`);
  logger.info(getCostSummary());
}

async function main() {
  const localeArg = process.argv[2] as Locale | undefined;
  const localesToRun = localeArg ? [localeArg] : PIPELINE_LOCALES;

  for (const locale of localesToRun) {
    await translateBatch(locale);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
