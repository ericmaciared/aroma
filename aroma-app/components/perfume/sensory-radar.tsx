'use client';

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

export function SensoryRadar({ data }: Props) {
  const chartData = data.map(d => ({
    ...d,
    label: LABEL_MAP[d.axis] ?? d.axis,
  }));

  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="label"
          tick={{
            fontSize: 10,
            fill: 'var(--fg-subtle)',
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          }}
        />
        <Radar
          dataKey="value"
          stroke="var(--fg)"
          fill="var(--fg)"
          fillOpacity={0.08}
          strokeWidth={1.5}
          dot={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
