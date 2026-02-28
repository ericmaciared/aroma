import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { MonoLabel } from '@/components/ui/mono-label';

export default async function BrandsPage() {
  const supabase = await createClient();

  const { data: brands } = await supabase
    .from('brands')
    .select('id, name, country, founding_year, tier, description')
    .order('name');

  const allBrands = brands ?? [];

  // Fragrance counts per brand
  const { data: counts } = await supabase
    .from('perfumes')
    .select('brand_id')
    .in('brand_id', allBrands.map(b => b.id));

  const countMap = (counts ?? []).reduce<Record<string, number>>((acc, p) => {
    if (p.brand_id) acc[p.brand_id] = (acc[p.brand_id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-light tracking-[-0.02em] mb-1">Brands</h1>
        <MonoLabel>{allBrands.length} houses</MonoLabel>
      </div>

      {/* Grid */}
      {allBrands.length > 0 ? (
        <div
          className="grid gap-px bg-border border border-border rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {allBrands.map(brand => {
            const count = countMap[brand.id] ?? 0;
            return (
              <Link
                key={brand.id}
                href={`/brand/${brand.id}`}
                className="group bg-card hover:bg-muted transition-colors duration-150 p-6 flex flex-col gap-3"
              >
                {/* Tier + name */}
                <div>
                  {brand.tier && (
                    <MonoLabel className="block mb-2">{brand.tier}</MonoLabel>
                  )}
                  <h2 className="text-[18px] font-light tracking-[-0.02em] text-fg group-hover:text-fg transition-colors">
                    {brand.name}
                  </h2>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-0 gap-y-0.5">
                  {[
                    brand.founding_year ? `Est. ${brand.founding_year}` : null,
                    brand.country,
                    count > 0 ? `${count} fragrances` : null,
                  ].filter(Boolean).map((part, i) => (
                    <span key={i} className="font-mono text-[10px] text-fg-subtle flex items-center">
                      {i > 0 && <span className="mx-1.5 text-border-strong">·</span>}
                      {part}
                    </span>
                  ))}
                </div>

                {/* Description excerpt */}
                {brand.description && (
                  <p className="text-[12px] font-light text-fg-muted leading-relaxed line-clamp-2">
                    {brand.description}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center">
          <MonoLabel>No brands yet</MonoLabel>
        </div>
      )}

    </div>
  );
}
