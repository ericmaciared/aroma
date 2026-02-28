'use client';

import { useEffect, useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

export interface SensoryDataPoint {
  axis: string;    // raw axis key, e.g. "sweetness"
  value: number;   // 0–10
  fullMark: number;
}

interface Props {
  data: SensoryDataPoint[];
}

const LABEL_MAP: Record<string, string> = {
  sweetness:    'sweet',
  freshness:    'fresh',
  warmth:       'warm',
  heaviness:    'heavy',
  powderiness:  'powder',
  woodiness:    'woody',
  smokiness:    'smoky',
  leatheriness: 'leather',
  floralness:   'floral',
  fruitiness:   'fruity',
  greenness:    'green',
  aquatics:     'aquatic',
  spiciness:    'spicy',
  gourmand:     'gourmand',
  animalic:     'animalic',
  earthiness:   'earthy',
  resinousness: 'resin',
};

// Recharts renders colors as SVG presentation attributes, which don't support
// var() in browsers. We resolve CSS variables in JS and re-read on theme change.
function useCSSVar(name: string, fallback: string): string {
  const [value, setValue] = useState(fallback);
  useEffect(() => {
    const read = () =>
      setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback);
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [name, fallback]);
  return value;
}

export function SensoryRadar({ data }: Props) {
  const border   = useCSSVar('--aroma-border',    '#E5E2DC');
  const fgSubtle = useCSSVar('--aroma-fg-subtle', '#A09D98');
  const fg       = useCSSVar('--aroma-fg',        '#0F0E0C');

  const chartData = data.map(d => ({
    ...d,
    label: LABEL_MAP[d.axis] ?? d.axis,
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={chartData} margin={{ top: 20, right: 50, bottom: 20, left: 50 }}>
        <PolarGrid stroke={border} />
        <PolarAngleAxis
          dataKey="label"
          tick={{
            fontSize: 10,
            fill: fgSubtle,
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          }}
        />
        <Radar
          dataKey="value"
          stroke={fg}
          fill={fg}
          fillOpacity={0.08}
          strokeWidth={1.5}
          dot={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
