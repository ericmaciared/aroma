import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { PerfumeCard } from '@/components/perfume/perfume-card';
import { MonoLabel } from '@/components/ui/mono-label';

async function getFeaturedPerfumes() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('perfumes')
    .select(`id, name, price_usd, community_rating, key_accords, olfactive_family, brands(name)`)
    .order('community_rating', { ascending: false })
    .limit(4);
  return data ?? [];
}

export default async function HomePage() {
  const featured = await getFeaturedPerfumes();

  return (
    <div className="max-w-7xl mx-auto px-6">

      {/* ── Hero ── */}
      <section className="pt-20 pb-16 border-b border-border">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-fg-subtle mb-5 flex items-center gap-2">
          <span className="inline-block w-5 h-px bg-fg-subtle" />
          AI-powered fragrance discovery
        </div>

        <h1 className="text-[clamp(38px,5vw,64px)] font-light tracking-[-0.03em] leading-[1.08] text-fg max-w-2xl mb-6">
          Find the scent<br />
          that <em className="font-light italic">defines</em> you.
        </h1>

        <p className="text-[15px] font-light text-fg-muted max-w-[420px] leading-[1.65] mb-9">
          Precision fragrance matching. Tell us your skin, your taste, your mood — and we&apos;ll find perfumes that are genuinely yours.
        </p>

        <div className="flex gap-2.5 items-center">
          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-medium bg-accent text-accent-fg rounded hover:opacity-85 transition-opacity"
          >
            Start exploring
          </Link>
          <Link
            href="/recommend"
            className="inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-normal border border-border-strong text-fg-muted rounded hover:border-fg hover:text-fg transition-all"
          >
            Get AI recommendations
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-9 mt-14 pt-8 border-t border-border">
          {[
            { num: '12,400', label: 'Fragrances' },
            { num: '17',     label: 'Sensory axes' },
            { num: '82',     label: 'Allergens mapped' },
            { num: '1536d',  label: 'Embedding model' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="font-mono text-[22px] tracking-tight text-fg leading-none mb-1">
                {num}
              </div>
              <MonoLabel>{label}</MonoLabel>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured ── */}
      {featured.length > 0 && (
        <section className="py-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-[18px] font-normal tracking-[-0.02em]">Featured</h2>
            <Link href="/explore"
              className="font-mono text-[11px] text-fg-subtle hover:text-fg transition-colors tracking-[0.06em]">
              view all →
            </Link>
          </div>

          <div
            className="grid gap-px bg-border border border-border rounded-lg overflow-hidden"
            style={{ gridTemplateColumns: `repeat(${Math.min(featured.length, 4)}, 1fr)` }}
          >
            {featured.map(p => (
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
        </section>
      )}

    </div>
  );
}
