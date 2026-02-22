import { openai } from '../config/openai.js';
import { supabase } from '../config/supabase.js';
import { trackTokens } from '../utils/cost-tracker.js';
import { logger } from '../utils/logger.js';
import {
  LOCALE_LANGUAGE_NAMES,
  type Locale,
  type VocabularyCategory
} from '@aroma/shared';

/**
 * Translates a list of vocabulary terms for a given locale and category,
 * then upserts them into the vocabulary_translations table.
 * Run this once per new locale, not per perfume.
 */
export async function translateVocabulary(
  terms: string[],
  category: VocabularyCategory,
  targetLocale: Locale
): Promise<void> {
  const language = LOCALE_LANGUAGE_NAMES[targetLocale];

  // Check which terms already have translations
  const { data: existing } = await supabase
    .from('vocabulary_translations')
    .select('term')
    .eq('locale', targetLocale)
    .eq('category', category)
    .in('term', terms);

  const existingTerms = new Set((existing ?? []).map(r => r.term));
  const toTranslate = terms.filter(t => !existingTerms.has(t));

  if (toTranslate.length === 0) {
    logger.info(`All ${category} terms already translated for ${targetLocale}`);
    return;
  }

  const prompt = `Translate these fragrance-related terms into ${language}.
Preserve the nuance and register of each term. Use natural ${language} expressions.
Category: ${category}

Terms:
${toTranslate.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Respond with valid JSON only:
{
  "translations": {
    "term1": "translation1",
    "term2": "translation2"
  }
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',  // cheaper model fine for vocabulary
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.1,
  });

  const usage = response.usage;
  if (usage) trackTokens(usage.prompt_tokens, usage.completion_tokens);

  const raw = response.choices[0].message.content;
  if (!raw) throw new Error('Empty vocabulary translation response');

  const { translations } = JSON.parse(raw) as { translations: Record<string, string> };

  // Upsert into vocabulary_translations
  const rows = Object.entries(translations).map(([term, translation]) => ({
    term,
    locale: targetLocale,
    translation,
    category,
  }));

  const { error } = await supabase
    .from('vocabulary_translations')
    .upsert(rows, { onConflict: 'term,locale' });

  if (error) throw new Error(`Failed to upsert vocabulary: ${error.message}`);

  logger.success(`Translated ${rows.length} ${category} terms to ${language}`);
}
