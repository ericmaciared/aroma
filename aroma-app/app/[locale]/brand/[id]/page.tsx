import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BrandPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: brand } = await supabase
    .from('brands')
    .select('*')
    .eq('id', id)
    .single();

  if (!brand) notFound();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{brand.name}</h1>
      {brand.country && <p className="text-muted-foreground mt-1">{brand.country}</p>}
    </div>
  );
}
