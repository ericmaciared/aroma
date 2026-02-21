import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import type { PerfumeInput } from '@aroma/shared';

export async function upsertBrand(name: string): Promise<string> {
  const { data, error } = await supabase
    .from('brands')
    .upsert({ name }, { onConflict: 'name' })
    .select('id')
    .single();
  if (error) throw new Error(`Failed to upsert brand "${name}": ${error.message}`);
  return data.id;
}

export async function upsertPerfume(input: PerfumeInput): Promise<string> {
  // Resolve brand
  let brand_id = input.brand_id;
  if (!brand_id && input.brand_name) {
    brand_id = await upsertBrand(input.brand_name);
  }

  const { brand_name, ...rest } = input;
  const record = { ...rest, brand_id };

  const { data, error } = await supabase
    .from('perfumes')
    .upsert(record, { onConflict: 'name,brand_id' })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to upsert perfume "${input.name}": ${error.message}`);

  logger.success(`Upserted: ${input.name}`, { id: data.id });
  return data.id;
}
