import type { SupabaseClient } from '@supabase/supabase-js';

export async function getPerfumesByNote(supabase: SupabaseClient, name: string) {
  const noteName = name.toLowerCase();
  const encoded = JSON.stringify([{ name: noteName }]);
  const { data, error } = await supabase
    .from('perfumes')
    .select(`id, name, key_accords, olfactive_family, community_rating, price_usd, notes_top, notes_heart, notes_base, brands(id, name), images(url, image_type)`)
    .or(`notes_top.cs.${encoded},notes_heart.cs.${encoded},notes_base.cs.${encoded}`)
    .order('community_rating', { ascending: false, nullsFirst: false })
    .limit(100);
  if (error) throw error;
  return data ?? [];
}

export async function getPerfumeById(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase
    .from('perfumes')
    .select(`*, brands(name, slug), images(url, image_type)`)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function getPerfumes(supabase: SupabaseClient, options?: {
  limit?: number;
  offset?: number;
  gender?: string;
  family?: string;
}) {
  let query = supabase
    .from('perfumes')
    .select(`id, name, gender_target, olfactive_family, price_tier, community_rating, brands(name), images(url, image_type)`)
    .order('community_rating', { ascending: false })
    .limit(options?.limit ?? 24);

  if (options?.gender) query = query.eq('gender_target', options.gender);
  if (options?.family) query = query.eq('olfactive_family', options.family);
  if (options?.offset) query = query.range(options.offset, options.offset + (options.limit ?? 24) - 1);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}
