import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { PerfumeCard } from '@/components/perfume/perfume-card';
import { MonoLabel } from '@/components/ui/mono-label';

async function getFeaturedPerfumes() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('perfumes')
    .select(`id, name, price_usd, community_rating, key_accords, olfactive_family, brands(id, name), images(url, image_type)`)
    .order('community_rating', { ascending: false })
    .limit(4);
  return data ?? [];
}

export default async function HomePage() {
  const t = await getTranslations('home');
  const featured = await getFeaturedPerfumes();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">

      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 border-b border-border overflow-hidden">

        {/* Amber glow — self-contained div, swap-friendly for future video/canvas bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 30% 40%, color-mix(in srgb, var(--aroma-amber) 10%, transparent), transparent 70%)',
          }}
        />

        {/* Ghost stat number */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[180px] font-medium leading-none text-fg select-none opacity-[0.04] tracking-tight pr-4 hidden lg:block"
        >
          12,400
        </div>

        {/* Eyebrow */}
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-amber mb-5 flex items-center gap-2">
          <span className="inline-block w-5 h-px bg-amber" />
          {t('eyebrow')}
        </div>

        <h1 className="text-[clamp(38px,5vw,64px)] font-light tracking-[-0.03em] leading-[1.08] text-fg max-w-2xl mb-6">
          {t.rich('title', {
            em: (chunks) => <em className="font-light italic">{chunks}</em>
          })}
        </h1>

        <p className="text-[15px] font-light text-fg-muted max-w-[420px] leading-[1.65] mb-9">
          {t('subtitle')}
        </p>

        <div className="flex gap-2.5 items-center">
          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-medium bg-amber text-amber-fg rounded-sm hover:opacity-90 transition-opacity"
          >
            {t('ctaExplore')}
          </Link>
          <Link
            href="/recommend"
            className="inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-normal border border-border-strong text-fg-muted rounded-sm hover:border-fg hover:text-fg transition-all"
          >
            {t('ctaRecommend')}
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-8 border-t border-border">
          {[
            { num: '12,400', label: t('stats.fragrances') },
            { num: '17',     label: t('stats.sensoryAxes') },
            { num: '82',     label: t('stats.allergensMapped') },
            { num: '1536d',  label: t('stats.embeddingModel') },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="font-mono text-[22px] tracking-tight text-amber leading-none mb-1">
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
            <h2 className="text-[18px] font-normal tracking-[-0.02em]">{t('featuredTitle')}</h2>
            <Link href="/explore"
              className="font-mono text-[11px] text-fg-subtle hover:text-fg transition-colors tracking-[0.04em]">
              {t('viewAll')}
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
            {featured.map((p, index) => (
              <PerfumeCard
                key={p.id}
                id={p.id}
                name={p.name}
                brandName={(p as any).brands?.name}
                brandId={(p as any).brands?.id}
                olfactiveFamily={p.olfactive_family}
                keyAccords={p.key_accords}
                communityRating={p.community_rating}
                priceUsd={p.price_usd}
                imageUrl={(p as any).images?.[0]?.url ?? null}
                style={{ animationDelay: `${Math.min(index, 7) * 30}ms` }}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
