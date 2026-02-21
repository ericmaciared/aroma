import Link from 'next/link';
import { AccordTag } from '@/components/ui/accord-tag';
import { MonoLabel } from '@/components/ui/mono-label';

interface PerfumeCardProps {
  id: string;
  name: string;
  brandName?: string;
  olfactiveFamily?: string | null;
  keyAccords?: string[] | null;
  communityRating?: number | null;
  priceUsd?: number | null;
  imageUrl?: string | null;
}

export function PerfumeCard({
  id,
  name,
  brandName,
  olfactiveFamily,
  keyAccords,
  communityRating,
  priceUsd,
  imageUrl,
}: PerfumeCardProps) {
  return (
    <Link
      href={`/perfume/${id}`}
      className="group bg-card hover:bg-muted transition-colors duration-150 p-5 flex flex-col"
    >
      {/* Bottle image */}
      <div className="w-full aspect-[3/4] bg-muted rounded flex items-center justify-center mb-4 overflow-hidden border border-border relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <BottlePlaceholder />
        )}
      </div>

      {/* Brand */}
      {brandName && (
        <MonoLabel className="mb-1">{brandName}</MonoLabel>
      )}

      {/* Name */}
      <h3 className="text-[14px] font-normal tracking-tight text-fg leading-snug mb-2">
        {name}
      </h3>

      {/* Accords */}
      {keyAccords && keyAccords.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {keyAccords.slice(0, 3).map(accord => (
            <AccordTag key={accord}>{accord}</AccordTag>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
        <span className="font-mono text-[11px] text-fg-muted">
          {communityRating != null ? (
            <><span className="text-fg">{communityRating.toFixed(1)}</span> / 5</>
          ) : '—'}
        </span>
        <span className="font-mono text-[11px] text-fg-muted">
          {priceUsd != null ? `$${priceUsd}` : '—'}
        </span>
      </div>
    </Link>
  );
}

function BottlePlaceholder() {
  return (
    <svg width="48" height="80" viewBox="0 0 48 80" fill="none" className="opacity-[0.08]">
      <rect x="17" y="0" width="14" height="10" rx="2" fill="currentColor" />
      <path
        d="M11 18 Q9 28 9 46 L9 66 Q9 72 14 72 L34 72 Q39 72 39 66 L39 46 Q39 28 37 18 Z"
        fill="currentColor"
      />
    </svg>
  );
}
