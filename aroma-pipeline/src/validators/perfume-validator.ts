import { PerfumeSchema, type PerfumeInput } from '@aroma/shared';
import { logger } from '../utils/logger.js';

export function validatePerfume(data: unknown): PerfumeInput | null {
  const result = PerfumeSchema.safeParse(data);
  if (!result.success) {
    logger.warn('Perfume validation failed', result.error.flatten());
    return null;
  }
  return result.data;
}

export function scorePerfumeCompleteness(data: PerfumeInput): number {
  const fields = [
    data.name, data.brand_name, data.year_released, data.concentration,
    data.notes_top, data.notes_heart, data.notes_base,
    data.sensory_sweetness, data.sensory_freshness, data.sensory_warmth,
    data.community_rating, data.evokes, data.mood_tags,
  ];
  const filled = fields.filter(f => f !== undefined && f !== null).length;
  return Math.round((filled / fields.length) * 100);
}
