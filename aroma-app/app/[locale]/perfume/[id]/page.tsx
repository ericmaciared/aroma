import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { MonoLabel } from '@/components/ui/mono-label';
import { AccordTag } from '@/components/ui/accord-tag';
import { ScoreCard } from '@/components/ui/score-card';
import { SensoryBar } from '@/components/ui/sensory-bar';
import { NotesPyramid } from '@/components/perfume/notes-pyramid';
import { SENSORY_AXES } from '@aroma/shared';

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

  // Build sensory data from flat columns
  const sensoryData = SENSORY_AXES
    .map(axis => ({
      label: axis.replace(/_/g, ' '),
      key: axis,
      value: (p as any)[`sensory_${axis}`] as number | null,
    }))
    .filter(s => s.value != null && s.value > 0)
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
    .slice(0, 8);

  const reformulationRisk = (p as any).reformulation_risk as string | null;
  const showReformulationAlert =
    reformulationRisk === 'significantly_changed' || reformulationRisk === 'known_changes';

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Reformulation alert */}
      {showReformulationAlert && (
        <div className="mb-6 border border-border-strong rounded px-4 py-3 flex items-center gap-3 bg-muted">
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

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12">

        {/* ── Left: image + actions ── */}
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

        {/* ── Right: details ── */}
        <div>

          {/* Brand */}
          <MonoLabel className="block mb-2">
            {(p as any).brands?.name ?? '—'}
          </MonoLabel>

          {/* Name */}
          <h1 className="text-[36px] font-light tracking-[-0.03em] leading-[1.1] mb-3">
            {p.name}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-1 mb-6 flex-wrap">
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
                ${(p as any).price_usd}
              </span>
            )}
          </div>

          {/* Scores */}
          <div className="grid grid-cols-3 gap-2 mb-7">
            <ScoreCard value={(p as any).compliment_getter} label="compliments" />
            <ScoreCard value={(p as any).longevity_score} label="longevity" />
            <ScoreCard value={(p as any).blind_buy_safe} label="blind buy" />
          </div>

          {/* Notes pyramid */}
          {((p as any).notes_top || (p as any).notes_heart || (p as any).notes_base) && (
            <div className="mb-7">
              <MonoLabel className="block mb-3">Note pyramid</MonoLabel>
              <NotesPyramid
                top={(p as any).notes_top}
                heart={(p as any).notes_heart}
                base={(p as any).notes_base}
              />
            </div>
          )}

          {/* Sensory profile */}
          {sensoryData.length > 0 && (
            <div className="mb-7">
              <MonoLabel className="block mb-3">Sensory profile</MonoLabel>
              <div className="space-y-0">
                {sensoryData.map(s => (
                  <SensoryBar key={s.key} label={s.label} value={s.value ?? 0} />
                ))}
              </div>
            </div>
          )}

          {/* Key accords */}
          {(p as any).key_accords && (p as any).key_accords.length > 0 && (
            <div className="mb-7">
              <MonoLabel className="block mb-2">Key accords</MonoLabel>
              <div className="flex flex-wrap gap-1.5">
                {((p as any).key_accords as string[]).map((accord) => (
                  <AccordTag key={accord}>{accord}</AccordTag>
                ))}
              </div>
            </div>
          )}

          {/* Community verdict */}
          {(((p as any).praised_for?.length ?? 0) > 0 || ((p as any).criticized_for?.length ?? 0) > 0) && (
            <div className="mb-7">
              <MonoLabel className="block mb-2">Community says</MonoLabel>
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

          {/* Evokes */}
          {(p as any).evokes && (p as any).evokes.length > 0 && (
            <div>
              <MonoLabel className="block mb-2">Evokes</MonoLabel>
              <p className="text-[14px] font-light text-fg-muted leading-relaxed italic">
                &ldquo;{((p as any).evokes as string[]).join(' · ')}&rdquo;
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
