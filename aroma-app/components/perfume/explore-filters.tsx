'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FilterChip } from '@/components/ui/filter-chip';
import { MonoLabel } from '@/components/ui/mono-label';

interface Props {
  families: string[];
  genders: string[];
  activeFamily?: string;
  activeGender?: string;
}

export function ExploreFilters({ families, genders, activeFamily, activeGender }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-3 mb-8">
      {/* Family */}
      <div className="flex items-center gap-3 flex-wrap">
        <MonoLabel className="w-14 shrink-0">family</MonoLabel>
        <FilterChip
          label="all"
          active={!activeFamily}
          onClick={() => updateFilter('family', null)}
        />
        {families.map(f => (
          <FilterChip
            key={f}
            label={f}
            active={activeFamily === f}
            onClick={() => updateFilter('family', f)}
          />
        ))}
      </div>

      {/* Gender */}
      <div className="flex items-center gap-3 flex-wrap">
        <MonoLabel className="w-14 shrink-0">gender</MonoLabel>
        <FilterChip
          label="all"
          active={!activeGender}
          onClick={() => updateFilter('gender', null)}
        />
        {genders.map(g => (
          <FilterChip
            key={g}
            label={g}
            active={activeGender === g}
            onClick={() => updateFilter('gender', g)}
          />
        ))}
      </div>
    </div>
  );
}
