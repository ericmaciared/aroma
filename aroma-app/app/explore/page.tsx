import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { PerfumeCard } from '@/components/perfume/perfume-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { ExploreFilters } from '@/components/perfume/explore-filters';

interface SearchParams {
  family?: string;
  gender?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

async function getPerfumes(filters: SearchParams) {
  const supabase = await createClient();

  let query = supabase
    .from('perfumes')
    .select(`id, name, price_usd, community_rating, key_accords, olfactive_family, gender_target, brands(name)`)
    .order('community_rating', { ascending: false })
    .limit(48);

  if (filters.family) query = query.eq('olfactive_family', filters.family);
  if (filters.gender) query = query.eq('gender_target', filters.gender);

  const { data } = await query;
  return data ?? [];
}

const FAMILIES = ['woody', 'floral', 'oriental', 'fresh', 'chypre', 'fougere', 'gourmand', 'aquatic'];
const GENDERS  = ['unisex', 'masculine', 'feminine'];

export default async function ExplorePage({ searchParams }: Props) {
  const params = await searchParams;
  const perfumes = await getPerfumes(params);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Page header */}
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-light tracking-[-0.02em] mb-1">Explore</h1>
          <MonoLabel>{perfumes.length} fragrances</MonoLabel>
        </div>
      </div>

      {/* Filters — client component needs Suspense */}
      <Suspense fallback={null}>
        <ExploreFilters
          families={FAMILIES}
          genders={GENDERS}
          activeFamily={params.family}
          activeGender={params.gender}
        />
      </Suspense>

      {/* Grid */}
      {perfumes.length > 0 ? (
        <div
          className="grid gap-px bg-border border border-border rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
        >
          {perfumes.map(p => (
            <PerfumeCard
              key={p.id}
              id={p.id}
              name={p.name}
              brandName={(p as any).brands?.name}
              olfactiveFamily={p.olfactive_family}
              keyAccords={p.key_accords}
              communityRating={p.community_rating}
              priceUsd={p.price_usd}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <MonoLabel>No results</MonoLabel>
          <p className="text-fg-muted text-sm mt-2">Try a different filter.</p>
        </div>
      )}

    </div>
  );
}
