import { createClient } from '@/lib/supabase/server';
import { getPerfumeById } from '@/lib/queries';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PerfumePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  let perfume;
  try {
    perfume = await getPerfumeById(supabase, id);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{perfume.name}</h1>
      <p className="text-muted-foreground mt-1">{(perfume as any).brands?.name}</p>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div><span className="font-medium">Family:</span> {perfume.olfactive_family ?? '—'}</div>
        <div><span className="font-medium">Year:</span> {perfume.year_released ?? '—'}</div>
        <div><span className="font-medium">Rating:</span> {perfume.community_rating ?? '—'}</div>
      </div>
      <pre className="mt-8 text-xs bg-muted p-4 rounded overflow-auto">
        {JSON.stringify(perfume, null, 2)}
      </pre>
    </div>
  );
}
