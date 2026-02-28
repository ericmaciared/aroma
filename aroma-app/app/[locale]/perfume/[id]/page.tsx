import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MonoLabel } from '@/components/ui/mono-label';
import { AccordTag } from '@/components/ui/accord-tag';
import { ScoreCard } from '@/components/ui/score-card';
import { NotesPyramid } from '@/components/perfume/notes-pyramid';
import { SensoryRadar, type SensoryDataPoint } from '@/components/perfume/sensory-radar';
import { SENSORY_AXES } from '@aroma/shared';
import { PriceDisplay } from '@/components/perfume/price-display';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PerfumePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: p, error } = await supabase
    .from('perfumes')
    .select(`*, brands(id, name, slug)`)
    .eq('id', id)
    .single();

  if (error || !p) notFound();

  // All 17 sensory axes for radar chart (0 when null)
  const radarData: SensoryDataPoint[] = SENSORY_AXES.map(axis => ({
    axis,
    value: ((p as any)[`sensory_${axis}`] as number | null) ?? 0,
    fullMark: 10,
  }));
  const hasSensoryData = radarData.some(d => d.value > 0);

  const reformulationRisk = (p as any).reformulation_risk as string | null;
  const showReformulationAlert =
    reformulationRisk === 'significantly_changed' || reformulationRisk === 'known_changes';

  const communityRating = (p as any).community_rating as number | null;
  const ratingCount = (p as any).rating_count as number | null;

  // Score cards — only show non-null values
  const scores = [
    {
      key: 'community_rating',
      value: communityRating,
      label: 'community',
      suffix: '/ 5',
      sublabel: ratingCount ? `${ratingCount.toLocaleString()} ratings` : undefined,
    },
    { key: 'compliment_getter', value: (p as any).compliment_getter, label: 'compliments' },
    { key: 'longevity_score',   value: (p as any).longevity_score,   label: 'longevity'   },
    { key: 'sillage_score',     value: (p as any).sillage_score,     label: 'sillage'     },
    { key: 'blind_buy_safe',    value: (p as any).blind_buy_safe,    label: 'blind buy'   },
    { key: 'value_for_money',   value: (p as any).value_for_money,   label: 'value'       },
  ].filter(s => s.value != null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">

      {/* Reformulation alert */}
      {showReformulationAlert && (
        <div className="border border-border-strong rounded px-4 py-3 flex flex-wrap items-start gap-x-3 gap-y-1.5 bg-muted">
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-fg-subtle">
            reformulation
          </span>
          <span className="text-[13px] text-fg-muted">
            {reformulationRisk === 'significantly_changed'
              ? 'This fragrance has been significantly reformulated. Seek older batches for the original formula.'
              : 'Known formula changes reported by the community.'}
          </span>
        </div>
      )}

      {/* ── HERO ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

        {/* Left: image + actions */}
        <div>
          <div className="w-full aspect-[2/3] bg-muted rounded-lg border border-border flex items-center justify-center mb-4">
            {(p as any).images?.[0]?.url ? (
              <img
                src={(p as any).images[0].url}
                alt={p.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="font-mono text-[11px] text-fg-subtle tracking-[0.08em]">
                no image
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full py-2.5 text-[13px] font-medium bg-accent text-accent-fg rounded hover:opacity-85 transition-opacity">
              Add to wishlist
            </button>
            <button className="w-full py-2.5 text-[13px] font-normal border border-border-strong text-fg-muted rounded hover:border-fg hover:text-fg transition-all">
              I own this
            </button>
          </div>
        </div>

        {/* Right: identity */}
        <div className="flex flex-col justify-center">
          {(p as any).brands?.id ? (
            <Link href={`/brand/${(p as any).brands.id}`} className="hover:opacity-70 transition-opacity">
              <MonoLabel className="block mb-2">{(p as any).brands.name}</MonoLabel>
            </Link>
          ) : (
            <MonoLabel className="block mb-2">{(p as any).brands?.name ?? '—'}</MonoLabel>
          )}

          <h1 className="text-[clamp(26px,5vw,36px)] font-light tracking-[-0.03em] leading-[1.1] mb-4">
            {p.name}
          </h1>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-x-0 gap-y-1 mb-6">
            {[
              (p as any).concentration,
              (p as any).gender_target,
              (p as any).year_released,
            ].filter(Boolean).map((val: string | number, i: number) => (
              <span key={i} className="font-mono text-[11px] text-fg-subtle flex items-center">
                {i > 0 && <span className="mx-2 text-border-strong">·</span>}
                {val}
              </span>
            ))}
            {(p as any).price_usd && (
              <span className="font-mono text-[11px] text-fg-muted flex items-center">
                <span className="mx-2 text-border-strong">·</span>
                <PriceDisplay priceUsd={(p as any).price_usd} />
              </span>
            )}
          </div>

          {/* Key accords */}
          {(p as any).key_accords?.length > 0 && (
            <>
              <div className="border-t border-border pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {((p as any).key_accords as string[]).map((accord) => (
                    <AccordTag key={accord}>{accord}</AccordTag>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── SCORES ── */}
      {scores.length > 0 && (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-4">Scores</MonoLabel>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {scores.map(s => (
              <ScoreCard
                key={s.key}
                value={s.value}
                label={s.label}
                suffix={s.suffix}
                sublabel={s.sublabel}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── SENSORY PROFILE ── */}
      {hasSensoryData && (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-2">Sensory profile</MonoLabel>
          <div className="max-w-lg mx-auto">
            <SensoryRadar data={radarData} />
          </div>
        </div>
      )}

      {/* ── NOTES PYRAMID ── */}
      {((p as any).notes_top || (p as any).notes_heart || (p as any).notes_base) && (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-3">Note pyramid</MonoLabel>
          <NotesPyramid
            top={(p as any).notes_top}
            heart={(p as any).notes_heart}
            base={(p as any).notes_base}
          />
        </div>
      )}

      {/* ── COMMUNITY SAYS ── */}
      {(((p as any).praised_for?.length ?? 0) > 0 || ((p as any).criticized_for?.length ?? 0) > 0) && (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-3">Community says</MonoLabel>
          <div className="flex flex-wrap gap-1.5">
            {((p as any).praised_for ?? [] as string[]).map((tag: string) => (
              <span key={tag}
                className="font-mono text-[11px] px-2 py-1 rounded-sm bg-tag-bg text-tag-fg">
                {tag} ↑
              </span>
            ))}
            {((p as any).criticized_for ?? [] as string[]).map((tag: string) => (
              <span key={tag}
                className="font-mono text-[11px] px-2 py-1 rounded-sm bg-tag-bg text-fg-subtle">
                {tag} ↓
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── EVOKES ── */}
      {(p as any).evokes?.length > 0 && (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-2">Evokes</MonoLabel>
          <p className="text-[14px] font-light text-fg-muted leading-relaxed italic">
            &ldquo;{((p as any).evokes as string[]).join(' · ')}&rdquo;
          </p>
        </div>
      )}

    </div>
  );
}
