import { openai } from '../config/openai.js';
import { trackTokens } from '../utils/cost-tracker.js';
import { logger } from '../utils/logger.js';
import { LOCALE_LANGUAGE_NAMES, type Locale } from '@aroma/shared';

interface TranslationInput {
  perfumeName: string;
  brandName: string;
  evokes: string[];
  description?: string;
}

interface TranslationOutput {
  evokes: string[];
  description?: string;
}

export async function translatePerfumeFields(
  input: TranslationInput,
  targetLocale: Locale
): Promise<TranslationOutput> {
  const language = LOCALE_LANGUAGE_NAMES[targetLocale];

  const prompt = `You are translating fragrance data for the perfume "${input.perfumeName}" by ${input.brandName}.

Translate the following fields into ${language}. Preserve the poetic, evocative tone. Keep translations culturally natural — do not translate literally if a more natural ${language} expression exists.

EVOKES (short evocative phrases, 3-8 words each):
${input.evokes.map((e, i) => `${i + 1}. ${e}`).join('\n')}

${input.description ? `DESCRIPTION:\n${input.description}` : ''}

Respond with valid JSON only, no markdown:
{
  "evokes": ["translated phrase 1", "translated phrase 2", ...],
  ${input.description ? '"description": "translated description"' : ''}
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.3,
  });

  const usage = response.usage;
  if (usage) trackTokens(usage.prompt_tokens, usage.completion_tokens);

  const raw = response.choices[0].message.content;
  if (!raw) throw new Error('Empty translation response');

  const parsed = JSON.parse(raw) as TranslationOutput;

  logger.info(`Translated to ${language}: ${input.perfumeName}`, {
    evokesCount: parsed.evokes?.length,
  });

  return parsed;
}
