import Link from 'next/link';
import { AccordTag } from '@/components/ui/accord-tag';
import { MonoLabel } from '@/components/ui/mono-label';

interface PerfumeCardProps {
  id: string;
  name: string;
  brandName?: string;
  brandId?: string;
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
  brandId,
  olfactiveFamily,
  keyAccords,
  communityRating,
  priceUsd,
  imageUrl,
}: PerfumeCardProps) {
  return (
    <div className="relative group bg-card hover:bg-muted transition-colors duration-150 p-5 flex flex-col">
      {/* Stretch link — makes the whole card navigate to the perfume page */}
      <Link href={`/perfume/${id}`} aria-label={name} className="absolute inset-0 z-0" />

      {/* Bottle image */}
      <div className="pointer-events-none w-full aspect-[3/4] bg-muted rounded flex items-center justify-center mb-4 overflow-hidden border border-border relative">
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

      {/* Brand — links to brand page when brandId is present */}
      {brandName && (
        brandId ? (
          <Link
            href={`/brand/${brandId}`}
            className="relative z-10 self-start mb-1 hover:opacity-70 transition-opacity"
          >
            <MonoLabel>{brandName}</MonoLabel>
          </Link>
        ) : (
          <MonoLabel className="pointer-events-none mb-1">{brandName}</MonoLabel>
        )
      )}

      {/* Name */}
      <h3 className="pointer-events-none text-[14px] font-normal tracking-tight text-fg leading-snug mb-2">
        {name}
      </h3>

      {/* Accords */}
      {keyAccords && keyAccords.length > 0 && (
        <div className="pointer-events-none flex flex-wrap gap-1 mb-3">
          {keyAccords.slice(0, 3).map(accord => (
            <AccordTag key={accord}>{accord}</AccordTag>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pointer-events-none mt-auto pt-3 border-t border-border flex items-center justify-between">
        <span className="font-mono text-[11px] text-fg-muted">
          {communityRating != null ? (
            <><span className="text-fg">{communityRating.toFixed(1)}</span> / 5</>
          ) : '—'}
        </span>
        <span className="font-mono text-[11px] text-fg-muted">
          {priceUsd != null ? `$${priceUsd}` : '—'}
        </span>
      </div>
    </div>
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
