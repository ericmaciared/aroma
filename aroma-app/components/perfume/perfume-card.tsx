'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { AccordTag } from '@/components/ui/accord-tag';
import { MonoLabel } from '@/components/ui/mono-label';
import { PriceDisplay } from '@/components/perfume/price-display';
import { FamilyIllustration } from '@/components/ui/family-illustration';

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
  style?: React.CSSProperties;
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
  style,
}: PerfumeCardProps) {
  return (
    <div className="relative group bg-card hover:bg-muted transition-colors duration-150 p-5 flex flex-col animate-fade-up" style={style}>
      {/* Stretch link — makes the whole card navigate to the perfume page */}
      <Link href={`/perfume/${id}`} aria-label={name} className="absolute inset-0 z-0" />

      {/* Bottle image */}
      <div className="pointer-events-none w-full aspect-[3/4] bg-muted rounded flex items-center justify-center mb-4 overflow-hidden border border-border relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 200px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 text-fg-subtle">
            <FamilyIllustration
              family={olfactiveFamily ?? null}
              name={name}
              opacity={0.12}
              className="w-full h-full"
            />
          </div>
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
        <PriceDisplay priceUsd={priceUsd} className="font-mono text-[11px] text-fg-muted" />
      </div>
    </div>
  );
}
