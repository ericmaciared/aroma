import { createClient } from '@/lib/supabase/server';
import { MonoLabel } from '@/components/ui/mono-label';
import { Link } from '@/i18n/navigation';

export default async function NotesPage() {
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from('note_library')
    .select('name, olfactive_family')
    .order('olfactive_family', { ascending: true, nullsFirst: false })
    .order('name', { ascending: true });

  const all = notes ?? [];

  // Group by olfactive_family
  const grouped = new Map<string, string[]>();
  for (const { name, olfactive_family } of all) {
    const key = olfactive_family ?? 'other';
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(name);
  }

  // Sort families alphabetically, keep 'other' last
  const families = [...grouped.keys()].sort((a, b) => {
    if (a === 'other') return 1;
    if (b === 'other') return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">

      {/* ── HEADER ── */}
      <div className="max-w-2xl">
        <MonoLabel className="block mb-3">ingredient library</MonoLabel>
        <h1 className="text-[clamp(28px,5vw,42px)] font-light tracking-[-0.03em] leading-[1.1] mb-4">
          Notes
        </h1>
        <p className="font-mono text-[11px] text-fg-subtle">
          {all.length.toLocaleString()} notes · {families.length} families
        </p>
      </div>

      {/* ── FAMILIES ── */}
      <div className="space-y-8">
        {families.map(family => {
          const familyNotes = grouped.get(family)!;
          return (
            <div key={family} className="border-t border-border pt-6">
              <div className="flex items-baseline gap-3 mb-4">
                <MonoLabel>{family}</MonoLabel>
                <span className="font-mono text-[10px] text-fg-subtle">
                  {familyNotes.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {familyNotes.map(name => (
                  <Link
                    key={name}
                    href={`/note/${encodeURIComponent(name.toLowerCase())}`}
                    className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-fg-muted hover:border-fg-subtle hover:text-fg transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
