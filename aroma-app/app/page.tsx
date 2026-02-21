import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold tracking-tight">
        Find your next<br />signature scent.
      </h1>
      <p className="text-muted-foreground text-lg mt-4 max-w-md">
        AI-powered fragrance discovery. Tell us what you love and we'll find perfumes that match your taste, skin, and style.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg">
          <Link href="/explore">Browse Perfumes</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/recommend">Get Recommendations</Link>
        </Button>
      </div>
    </div>
  );
}
