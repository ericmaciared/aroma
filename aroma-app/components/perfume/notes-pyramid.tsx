import { Link } from '@/i18n/navigation';

interface Note {
  name: string;
  position?: string;
}

interface Props {
  top?: Note[] | null;
  heart?: Note[] | null;
  base?: Note[] | null;
}

export function NotesPyramid({ top, heart, base }: Props) {
  const rows = [
    { label: 'top',   notes: top },
    { label: 'heart', notes: heart },
    { label: 'base',  notes: base },
  ].filter(r => r.notes && r.notes.length > 0);

  if (rows.length === 0) return null;

  return (
    <div className="divide-y divide-border">
      {rows.map(({ label, notes }) => (
        <div key={label} className="flex items-start gap-4 py-2.5">
          <span className="font-mono text-[10px] text-fg-subtle tracking-[0.08em] w-9 pt-0.5 shrink-0">
            {label}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(notes ?? []).map((note, i) => (
              <Link
                key={i}
                href={`/note/${encodeURIComponent(note.name.toLowerCase())}`}
                className="font-mono text-[11px] px-2 py-1 rounded-sm border border-border text-fg-muted hover:border-fg-subtle hover:text-fg transition-colors"
              >
                {note.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
