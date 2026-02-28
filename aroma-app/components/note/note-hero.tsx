interface Props {
  family: string | null;
  name: string;
}

// Botanical SVG illustrations per olfactive family
function CitrusSvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Citrus cross-section */}
      <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
      <circle cx="100" cy="100" r="14" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      {/* Segments */}
      {[0,45,90,135,180,225,270,315].map((angle) => (
        <line
          key={angle}
          x1="100" y1="100"
          x2={100 + 58 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 58 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="0.8" opacity="0.2"
        />
      ))}
      {/* Peel texture dots */}
      {[30,60,90,120,150,180,210,240,270,300,330,360].map((a, i) => (
        <circle
          key={i}
          cx={100 + 65 * Math.cos((a * Math.PI) / 180)}
          cy={100 + 65 * Math.sin((a * Math.PI) / 180)}
          r="1.5"
          fill="currentColor" opacity="0.2"
        />
      ))}
    </svg>
  );
}

function FloralSvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Five petals */}
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle - 90) * Math.PI / 180;
        const cx = 100 + 36 * Math.cos(rad);
        const cy = 100 + 36 * Math.sin(rad);
        return (
          <ellipse
            key={angle}
            cx={cx} cy={cy}
            rx="22" ry="32"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            stroke="currentColor" strokeWidth="0.9" opacity="0.25"
          />
        );
      })}
      {/* Center */}
      <circle cx="100" cy="100" r="14" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.15"/>
      {/* Stamens */}
      {[0,60,120,180,240,300].map((a, i) => (
        <line key={i}
          x1="100" y1="100"
          x2={100 + 11 * Math.cos((a * Math.PI) / 180)}
          y2={100 + 11 * Math.sin((a * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="0.7" opacity="0.25"
        />
      ))}
    </svg>
  );
}

function WoodySvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Tree rings */}
      {[10, 20, 30, 40, 52, 64, 72].map((r, i) => (
        <ellipse key={i} cx="100" cy="105" rx={r} ry={r * 0.85}
          stroke="currentColor" strokeWidth="0.8" opacity={0.12 + i * 0.03}
        />
      ))}
      {/* Grain lines */}
      <path d="M100 33 C104 55 104 75 100 105" stroke="currentColor" strokeWidth="0.6" opacity="0.2"/>
      <path d="M100 33 C96 55 96 75 100 105" stroke="currentColor" strokeWidth="0.6" opacity="0.2"/>
      {/* Pith dot */}
      <circle cx="100" cy="105" r="3" fill="currentColor" opacity="0.2"/>
    </svg>
  );
}

function FruitySvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Three berries */}
      <circle cx="100" cy="108" r="28" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
      <circle cx="70"  cy="118" r="20" stroke="currentColor" strokeWidth="0.9" opacity="0.2"/>
      <circle cx="130" cy="118" r="20" stroke="currentColor" strokeWidth="0.9" opacity="0.2"/>
      {/* Highlight dots */}
      <circle cx="91" cy="99" r="5" fill="currentColor" opacity="0.1"/>
      <circle cx="64" cy="111" r="3.5" fill="currentColor" opacity="0.1"/>
      <circle cx="124" cy="111" r="3.5" fill="currentColor" opacity="0.1"/>
      {/* Stem */}
      <path d="M100 80 C100 70 98 62 96 56" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.25"/>
      <path d="M96 60 C90 54 86 50 82 50" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.2"/>
      <path d="M96 62 C100 56 104 52 106 50" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.2"/>
    </svg>
  );
}

function SpicySvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Star anise — 8 points */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = angle * Math.PI / 180;
        const x1 = 100 + 14 * Math.cos(rad);
        const y1 = 100 + 14 * Math.sin(rad);
        const x2 = 100 + 58 * Math.cos(rad);
        const y2 = 100 + 58 * Math.sin(rad);
        return (
          <g key={i}>
            <ellipse
              cx={(x1 + x2) / 2} cy={(y1 + y2) / 2}
              rx="9" ry="24"
              transform={`rotate(${angle}, ${(x1 + x2) / 2}, ${(y1 + y2) / 2})`}
              stroke="currentColor" strokeWidth="0.9" opacity="0.22"
            />
            <circle cx={x2} cy={y2} r="4" stroke="currentColor" strokeWidth="0.7" opacity="0.2"/>
          </g>
        );
      })}
      <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.15"/>
    </svg>
  );
}

function EarthySvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Mushroom cap */}
      <path d="M60 115 Q60 62 100 58 Q140 62 140 115 Z"
        stroke="currentColor" strokeWidth="1" opacity="0.25"/>
      {/* Gills */}
      {[72, 82, 92, 100, 108, 116, 124, 128].map((x, i) => (
        <path key={i}
          d={`M${x} 115 Q${x + (x < 100 ? -4 : 4)} ${98 + i} ${x + (x < 100 ? -6 : 6)} 82`}
          stroke="currentColor" strokeWidth="0.6" opacity="0.15"
        />
      ))}
      {/* Stem */}
      <path d="M88 115 L88 148 Q100 152 112 148 L112 115"
        stroke="currentColor" strokeWidth="1" opacity="0.22"/>
      {/* Ground moss */}
      <path d="M60 150 Q80 144 100 147 Q120 144 140 150"
        stroke="currentColor" strokeWidth="0.8" opacity="0.18"/>
    </svg>
  );
}

function MuskySvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Concentric arcs — skin-close, intimate waves */}
      {[12, 24, 38, 54, 70].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r}
          stroke="currentColor" strokeWidth="0.8"
          strokeDasharray={i % 2 === 0 ? 'none' : `${r * 0.4} ${r * 0.25}`}
          opacity={0.28 - i * 0.03}
        />
      ))}
      {/* Radiating haze */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
        <line key={i}
          x1={100 + 70 * Math.cos((a * Math.PI) / 180)}
          y1={100 + 70 * Math.sin((a * Math.PI) / 180)}
          x2={100 + 82 * Math.cos((a * Math.PI) / 180)}
          y2={100 + 82 * Math.sin((a * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="0.6" opacity="0.14"
        />
      ))}
    </svg>
  );
}

function ResinousSvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Resin droplet */}
      <path d="M100 44 C115 68 138 88 138 110 C138 131 121 148 100 148 C79 148 62 131 62 110 C62 88 85 68 100 44 Z"
        stroke="currentColor" strokeWidth="1" opacity="0.28"/>
      {/* Inner droplet */}
      <path d="M100 68 C110 82 122 94 122 108 C122 122 112 134 100 134 C88 134 78 122 78 108 C78 94 90 82 100 68 Z"
        stroke="currentColor" strokeWidth="0.7" opacity="0.18"/>
      {/* Highlight */}
      <path d="M90 82 C86 90 84 98 86 106"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.15"/>
    </svg>
  );
}

function LeatherSvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hide outline — irregular organic shape */}
      <path d="M58 68 C52 60 62 46 78 50 C86 44 96 42 100 42 C104 42 114 44 122 50 C138 46 148 60 142 68 C152 78 154 96 148 110 C154 122 148 140 134 144 C126 152 112 155 100 155 C88 155 74 152 66 144 C52 140 46 122 52 110 C46 96 48 78 58 68 Z"
        stroke="currentColor" strokeWidth="1" opacity="0.25"/>
      {/* Texture diamonds */}
      {[[-16,-20],[0,-24],[16,-20],[-24,-4],[-8,-8],[8,-8],[24,-4],[-16,12],[0,8],[16,12],[-8,28],[8,28]].map(([dx, dy], i) => (
        <path key={i}
          d={`M${100+dx} ${100+dy-6} L${100+dx+5} ${100+dy} L${100+dx} ${100+dy+6} L${100+dx-5} ${100+dy} Z`}
          stroke="currentColor" strokeWidth="0.6" opacity="0.14"
        />
      ))}
    </svg>
  );
}

function MossySvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Layered organic curves */}
      {[
        "M38 130 Q60 118 80 124 Q100 130 120 124 Q140 118 162 130",
        "M38 114 Q65 100 86 108 Q100 114 114 108 Q135 100 162 114",
        "M42 98  Q66  84 88  92 Q100  98 112  92 Q134  84 158  98",
        "M48 82  Q70  68 90  76 Q100  82 110  76 Q130  68 152  82",
        "M54 66  Q74  54 92  62 Q100  66 108  62 Q126  54 146  66",
      ].map((d, i) => (
        <path key={i} d={d}
          stroke="currentColor" strokeWidth="0.9"
          opacity={0.12 + i * 0.04}
        />
      ))}
    </svg>
  );
}

function GourmandSvg() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Vanilla bean pod */}
      <path d="M72 48 C70 56 70 164 72 168 Q80 174 100 174 Q120 174 128 168 C130 164 130 56 128 48 Q120 40 100 40 Q80 40 72 48 Z"
        stroke="currentColor" strokeWidth="1" opacity="0.24"/>
      {/* Seeds */}
      {[72, 84, 96, 108, 120, 132, 144].map((y, i) => (
        <ellipse key={i} cx="100" cy={y} rx={i % 2 === 0 ? 5 : 4} ry="1.5"
          fill="currentColor" opacity="0.13"
        />
      ))}
      {/* Split */}
      <line x1="100" y1="44" x2="100" y2="170"
        stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
    </svg>
  );
}

function DefaultSvg({ name }: { name: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.5" opacity="0.12"/>
      <text x="100" y="108" textAnchor="middle"
        fontFamily="'DM Mono', monospace" fontSize="32" fontWeight="300"
        fill="currentColor" opacity="0.2"
      >{initials}</text>
    </svg>
  );
}

const FAMILY_MAP: Record<string, React.FC> = {
  citrus:    CitrusSvg,
  floral:    FloralSvg,
  woody:     WoodySvg,
  fruity:    FruitySvg,
  spicy:     SpicySvg,
  earthy:    EarthySvg,
  musky:     MuskySvg,
  resinous:  ResinousSvg,
  leather:   LeatherSvg,
  mossy:     MossySvg,
  gourmand:  GourmandSvg,
};

export function NoteHero({ family, name }: Props) {
  const FamilySvg = family ? FAMILY_MAP[family.toLowerCase()] : undefined;

  return (
    <div className="w-full aspect-square border border-border rounded-lg flex items-center justify-center bg-muted text-fg-subtle overflow-hidden p-8">
      {FamilySvg ? <FamilySvg /> : <DefaultSvg name={name} />}
    </div>
  );
}
