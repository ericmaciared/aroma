import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { MonoLabel } from '@/components/ui/mono-label';
import { PerfumeCard } from '@/components/perfume/perfume-card';
import { BrandPerfumeGrid } from '@/components/brand/brand-perfume-grid';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BrandPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: brand }, { data: perfumes }] = await Promise.all([
    supabase
      .from('brands')
      .select('id, name, slug, country, founding_year, tier, description, website')
      .eq('id', id)
      .single(),
    supabase
      .from('perfumes')
      .select('id, name, key_accords, olfactive_family, community_rating, price_usd, images(url, image_type)')
      .eq('brand_id', id)
      .order('community_rating', { ascending: false, nullsFirst: false }),
  ]);

  if (!brand) notFound();

  const allPerfumes = perfumes ?? [];

  // Compute avg rating
  const rated = allPerfumes.filter(p => p.community_rating != null);
  const avgRating =
    rated.length > 0
      ? (rated.reduce((sum, p) => sum + p.community_rating!, 0) / rated.length).toFixed(1)
      : null;

  // Top 6 by rating for the featured row
  const topRated = allPerfumes.slice(0, 6);

  // Unique olfactive families (preserve order of first appearance)
  const families = [...new Set(
    allPerfumes.map(p => p.olfactive_family).filter((f): f is string => !!f)
  )];

  const metaParts: string[] = [];
  if (brand.founding_year) metaParts.push(`Founded ${brand.founding_year}`);
  if (brand.country) metaParts.push(brand.country);
  if (allPerfumes.length > 0) metaParts.push(`${allPerfumes.length} fragrances`);
  if (avgRating) metaParts.push(`★ ${avgRating} avg`);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">

      {/* ── HEADER ── */}
      <div className="max-w-2xl">
        {brand.tier && (
          <MonoLabel className="block mb-3">{brand.tier}</MonoLabel>
        )}

        <h1 className="text-[clamp(28px,5vw,42px)] font-light tracking-[-0.03em] leading-[1.1] mb-4">
          {brand.name}
        </h1>

        {/* Meta row */}
        {metaParts.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-0 gap-y-1 mb-5">
            {metaParts.map((part, i) => (
              <span key={i} className="font-mono text-[11px] text-fg-subtle flex items-center">
                {i > 0 && <span className="mx-2 text-border-strong">·</span>}
                {part}
              </span>
            ))}
          </div>
        )}

        {brand.description && (
          <p className="text-[14px] font-light text-fg-muted leading-relaxed mb-5">
            {brand.description}
          </p>
        )}

        {brand.website && (
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted border border-border px-3 py-1.5 rounded hover:border-fg-subtle hover:text-fg transition-colors"
          >
            Visit website
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-60">
              <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>

      {/* ── TOP RATED ── */}
      {topRated.length > 0 && (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-5">Top Rated</MonoLabel>
          <div
            className="grid gap-px bg-border border border-border rounded-lg overflow-hidden"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
          >
            {topRated.map(p => (
              <PerfumeCard
                key={p.id}
                id={p.id}
                name={p.name}
                keyAccords={p.key_accords}
                olfactiveFamily={p.olfactive_family}
                communityRating={p.community_rating}
                priceUsd={p.price_usd}
                imageUrl={(p as any).images?.[0]?.url ?? null}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── ALL FRAGRANCES (client sort/filter) ── */}
      {allPerfumes.length > 0 ? (
        <BrandPerfumeGrid
          perfumes={allPerfumes}
          families={families}
        />
      ) : (
        <div className="border-t border-border pt-8 py-16 text-center">
          <MonoLabel>No fragrances yet</MonoLabel>
          <p className="text-fg-muted text-sm mt-2">Check back soon.</p>
        </div>
      )}

    </div>
  );
}
