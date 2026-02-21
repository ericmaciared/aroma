import { createClient } from '@/lib/supabase/server';
import { getPerfumes } from '@/lib/queries';
import Link from 'next/link';

export default async function ExplorePage() {
  const supabase = await createClient();
  const perfumes = await getPerfumes(supabase, { limit: 24 });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Explore Perfumes</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {perfumes.map((p) => (
          <Link key={p.id} href={`/perfume/${p.id}`}
            className="border rounded-lg p-4 hover:border-foreground transition-colors">
            <p className="font-semibold truncate">{p.name}</p>
            <p className="text-sm text-muted-foreground">{(p as any).brands?.name}</p>
            <p className="text-xs mt-2 capitalize">{p.olfactive_family}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
