import { createClient } from '@/lib/supabase/server';
import { MonoLabel } from '@/components/ui/mono-label';
import { PerfumeCard } from '@/components/perfume/perfume-card';
import { Link } from '@/i18n/navigation';
import { getPerfumesByNote } from '@/lib/queries';
import { NoteHero } from '@/components/note/note-hero';

interface Props {
  params: Promise<{ name: string }>;
}

function hasNote(arr: unknown, noteName: string): boolean {
  if (!Array.isArray(arr)) return false;
  return arr.some((n: { name?: string }) => n?.name?.toLowerCase() === noteName);
}

export default async function NotePage({ params }: Props) {
  const { name } = await params;
  const noteName = decodeURIComponent(name).toLowerCase();
  const displayName = noteName.charAt(0).toUpperCase() + noteName.slice(1);

  const supabase = await createClient();

  const [{ data: noteRow }, perfumes] = await Promise.all([
    supabase
      .from('note_library')
      .select('name, olfactive_family, description, is_natural, is_common_allergen, eu_declared_allergen')
      .ilike('name', noteName)
      .maybeSingle(),
    getPerfumesByNote(supabase, noteName),
  ]);

  const note = noteRow as {
    name: string;
    olfactive_family: string | null;
    description: string | null;
    is_natural: boolean | null;
    is_common_allergen: boolean | null;
    eu_declared_allergen: boolean | null;
  } | null;

  // Position breakdown
  const topCount   = perfumes.filter(p => hasNote((p as any).notes_top,   noteName)).length;
  const heartCount = perfumes.filter(p => hasNote((p as any).notes_heart, noteName)).length;
  const baseCount  = perfumes.filter(p => hasNote((p as any).notes_base,  noteName)).length;
  const total = perfumes.length;

  // Related notes: collect all co-occurring notes, rank by frequency
  const noteFreq = new Map<string, number>();
  for (const p of perfumes) {
    const allNotes = [
      ...((p as any).notes_top   ?? []),
      ...((p as any).notes_heart ?? []),
      ...((p as any).notes_base  ?? []),
    ] as Array<{ name?: string }>;
    for (const n of allNotes) {
      const nn = n?.name?.toLowerCase();
      if (!nn || nn === noteName) continue;
      noteFreq.set(nn, (noteFreq.get(nn) ?? 0) + 1);
    }
  }
  const relatedNotes = [...noteFreq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([n]) => n);

  const metaParts: string[] = [];
  if (total > 0) metaParts.push(`${total} perfume${total !== 1 ? 's' : ''}`);
  if (topCount   > 0) metaParts.push(`${topCount} top`);
  if (heartCount > 0) metaParts.push(`${heartCount} heart`);
  if (baseCount  > 0) metaParts.push(`${baseCount} base`);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">

      {/* ── HERO ── */}
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8 lg:gap-12">

        {/* Left: botanical illustration */}
        <div className="sm:pt-1">
          <NoteHero family={note?.olfactive_family ?? null} name={displayName} />
        </div>

        {/* Right: identity */}
        <div className="flex flex-col justify-center">
          <MonoLabel className="block mb-3">
            {note?.olfactive_family ?? 'note'}
          </MonoLabel>

          <h1 className="text-[clamp(28px,5vw,42px)] font-light tracking-[-0.03em] leading-[1.1] mb-4">
            {displayName}
          </h1>

          {/* Stats row */}
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

          {/* Tags: natural / allergen */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {note?.is_natural === true && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-border text-fg-muted tracking-[0.06em]">
                natural
              </span>
            )}
            {note?.is_natural === false && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-border text-fg-subtle tracking-[0.06em]">
                synthetic
              </span>
            )}
            {note?.eu_declared_allergen && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-border text-fg-subtle tracking-[0.06em]">
                EU allergen
              </span>
            )}
            {note?.is_common_allergen && !note?.eu_declared_allergen && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-border text-fg-subtle tracking-[0.06em]">
                common allergen
              </span>
            )}
          </div>

          {/* Description */}
          {note?.description && (
            <p className="text-[14px] font-light text-fg-muted leading-relaxed max-w-prose">
              {note.description}
            </p>
          )}
        </div>
      </div>

      {/* ── PERFUMES ── */}
      {perfumes.length > 0 ? (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-5">Perfumes featuring {displayName}</MonoLabel>
          <div
            className="grid gap-px bg-border border border-border rounded-lg overflow-hidden"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
          >
            {perfumes.map(p => {
              const brand = (p as any).brands as { id?: string; name?: string } | null;
              return (
                <PerfumeCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  brandName={brand?.name}
                  brandId={brand?.id}
                  keyAccords={p.key_accords}
                  olfactiveFamily={p.olfactive_family}
                  communityRating={p.community_rating}
                  priceUsd={p.price_usd}
                  imageUrl={(p as any).images?.[0]?.url ?? null}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="border-t border-border pt-8 py-16 text-center">
          <MonoLabel>No perfumes found</MonoLabel>
          <p className="text-fg-muted text-sm mt-2">
            No fragrances with {displayName} in our database yet.
          </p>
        </div>
      )}

      {/* ── RELATED NOTES ── */}
      {relatedNotes.length > 0 && (
        <div className="border-t border-border pt-8">
          <MonoLabel className="block mb-4">Often appears with</MonoLabel>
          <div className="flex flex-wrap gap-1.5">
            {relatedNotes.map(n => (
              <Link
                key={n}
                href={`/note/${encodeURIComponent(n)}`}
                className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-fg-muted hover:border-fg-subtle hover:text-fg transition-colors"
              >
                {n.charAt(0).toUpperCase() + n.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
