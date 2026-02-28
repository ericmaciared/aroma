'use client';

import { useState, useMemo } from 'react';
import { PerfumeCard } from '@/components/perfume/perfume-card';
import { MonoLabel } from '@/components/ui/mono-label';
import { cn } from '@/lib/utils';

interface Perfume {
  id: string;
  name: string;
  key_accords: string[] | null;
  olfactive_family: string | null;
  community_rating: number | null;
  price_usd: number | null;
  images?: Array<{ url: string; image_type: string }> | null;
}

type SortKey = 'rating' | 'name' | 'price';

interface Props {
  perfumes: Perfume[];
  families: string[];
}

export function BrandPerfumeGrid({ perfumes, families }: Props) {
  const [sort, setSort] = useState<SortKey>('rating');
  const [family, setFamily] = useState<string | null>(null);

  const displayed = useMemo(() => {
    let result = family
      ? perfumes.filter(p => p.olfactive_family === family)
      : perfumes;

    return [...result].sort((a, b) => {
      if (sort === 'rating') {
        return (b.community_rating ?? -1) - (a.community_rating ?? -1);
      }
      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      }
      // price asc, nulls last
      if (a.price_usd == null && b.price_usd == null) return 0;
      if (a.price_usd == null) return 1;
      if (b.price_usd == null) return -1;
      return a.price_usd - b.price_usd;
    });
  }, [perfumes, sort, family]);

  const SORT_OPTIONS: { key: SortKey; label: string }[] = [
    { key: 'rating', label: 'Rating' },
    { key: 'name',   label: 'Name'   },
    { key: 'price',  label: 'Price'  },
  ];

  return (
    <div className="border-t border-border pt-8">
      {/* Header row */}
      <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
        <MonoLabel>All Fragrances</MonoLabel>

        {/* Sort toggles */}
        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] text-fg-subtle mr-2 tracking-[0.08em]">Sort</span>
          {SORT_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSort(key)}
              className={cn(
                'font-mono text-[10px] tracking-[0.08em] uppercase px-2.5 py-1 rounded transition-colors',
                sort === key
                  ? 'bg-fg text-bg'
                  : 'text-fg-muted hover:text-fg hover:bg-muted'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Family filter chips */}
      {families.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button
            onClick={() => setFamily(null)}
            className={cn(
              'font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1 rounded-full border transition-colors',
              family === null
                ? 'border-fg bg-fg text-bg'
                : 'border-border text-fg-muted hover:border-fg-subtle hover:text-fg'
            )}
          >
            All
          </button>
          {families.map(f => (
            <button
              key={f}
              onClick={() => setFamily(f === family ? null : f)}
              className={cn(
                'font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1 rounded-full border transition-colors',
                family === f
                  ? 'border-fg bg-fg text-bg'
                  : 'border-border text-fg-muted hover:border-fg-subtle hover:text-fg'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {displayed.length > 0 ? (
        <div
          className="grid gap-px bg-border border border-border rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
        >
          {displayed.map(p => (
            <PerfumeCard
              key={p.id}
              id={p.id}
              name={p.name}
              keyAccords={p.key_accords}
              olfactiveFamily={p.olfactive_family}
              communityRating={p.community_rating}
              priceUsd={p.price_usd}
              imageUrl={p.images?.[0]?.url ?? null}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <MonoLabel>No results</MonoLabel>
          <p className="text-fg-muted text-sm mt-2">Try a different filter.</p>
        </div>
      )}
    </div>
  );
}
