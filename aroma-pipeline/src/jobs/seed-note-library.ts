/**
 * Seed note_library with notes from our perfumes.
 * Run: bun src/jobs/seed-note-library.ts
 */
import { supabase } from '../config/supabase';

const notes = [
  // ── Citrus ──────────────────────────────────────────────────────────────────
  {
    name: 'bergamot',
    slug: 'bergamot',
    olfactive_family: 'citrus',
    description: 'Bright, sparkling citrus peel from Calabria. Simultaneously sweet, tart, and floral-green. The backbone of countless classic colognes.',
    is_natural: true,
    is_common_allergen: true,
    eu_declared_allergen: true,
  },
  {
    name: 'calabrian bergamot',
    slug: 'calabrian-bergamot',
    olfactive_family: 'citrus',
    description: 'Cold-pressed peel from bergamot grown on the Calabrian coast — considered the finest quality, with exceptional brightness and complexity.',
    is_natural: true,
    is_common_allergen: true,
    eu_declared_allergen: true,
  },
  {
    name: 'blackcurrant',
    slug: 'blackcurrant',
    olfactive_family: 'fruity',
    description: 'Dark, jammy berry with a sharp, almost catty edge. Adds an electric, modern fruitiness that cuts through sweetness.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'pineapple',
    slug: 'pineapple',
    olfactive_family: 'fruity',
    description: 'Tropical, juicy, and radiant. In perfumery this is often a synthetic aroma molecule that reads fresh and loud on the skin.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'apple',
    slug: 'apple',
    olfactive_family: 'fruity',
    description: 'Crisp green or ripe red apple freshness. Almost always rendered synthetically; adds a clean, dewy fruitiness.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },

  // ── Floral ──────────────────────────────────────────────────────────────────
  {
    name: 'violet',
    slug: 'violet',
    olfactive_family: 'floral',
    description: 'Sweet, powdery, and slightly waxy. Violet bridges floral and gourmand territories with its delicate candy-like character.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'iris',
    slug: 'iris',
    olfactive_family: 'floral',
    description: 'Cool, powdery, and aristocratic. Derived from the rhizome after years of ageing — one of the most expensive naturals in perfumery.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'rose',
    slug: 'rose',
    olfactive_family: 'floral',
    description: 'The archetypal floral — rich, velvety, and complex. Rose absolute is one of the most expensive ingredients; synthetic versions offer different facets.',
    is_natural: true,
    is_common_allergen: true,
    eu_declared_allergen: true,
  },
  {
    name: 'moroccan jasmine',
    slug: 'moroccan-jasmine',
    olfactive_family: 'floral',
    description: 'Intensely indolic, rich, and narcotic. Jasmine from Morocco carries a fruity, slightly animalic depth absent from more delicate varieties.',
    is_natural: true,
    is_common_allergen: true,
    eu_declared_allergen: true,
  },
  {
    name: 'ylang-ylang',
    slug: 'ylang-ylang',
    olfactive_family: 'floral',
    description: 'Heady, tropical, banana-floral. Ylang-ylang is powerful and hypnotic, adding an opulent exotic richness at even trace amounts.',
    is_natural: true,
    is_common_allergen: true,
    eu_declared_allergen: true,
  },
  {
    name: 'black orchid',
    slug: 'black-orchid',
    olfactive_family: 'floral',
    description: 'A dark, fictional floral accord. Orchids have no extractable scent, so "black orchid" is a perfumer\'s fantasy — exotic, slightly spicy, and mysterious.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'bourbon geranium',
    slug: 'bourbon-geranium',
    olfactive_family: 'floral',
    description: 'Rose-like, green, and herbal with a minty undertone. Geranium from Réunion Island (Bourbon) is the most prized, with exceptional freshness.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'rose geranium',
    slug: 'rose-geranium',
    olfactive_family: 'floral',
    description: 'A geranium variety with pronounced rose facets. Softer and more floral than standard geranium, bridging herbaceous and classic floral territories.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'lotus wood',
    slug: 'lotus-wood',
    olfactive_family: 'floral',
    description: 'A soft, aquatic-floral woody note. Adds an airy, almost ethereal quality — a bridge between wood and water.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },

  // ── Woody ───────────────────────────────────────────────────────────────────
  {
    name: 'cedarwood',
    slug: 'cedarwood',
    olfactive_family: 'woody',
    description: 'Clean, dry, pencil-shaving wood. Versatile and affordable, cedarwood provides structure and a familiar dryness to countless compositions.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'sandalwood',
    slug: 'sandalwood',
    olfactive_family: 'woody',
    description: 'Creamy, milky, and sensual. Mysore sandalwood is critically endangered; modern alternatives use Australian or synthetic sandalwood with different character.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'australian sandalwood',
    slug: 'australian-sandalwood',
    olfactive_family: 'woody',
    description: 'A sustainable alternative to Mysore sandalwood. Slightly drier and more transparent, with a clean creaminess that works beautifully in modern compositions.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'dry birch',
    slug: 'dry-birch',
    olfactive_family: 'woody',
    description: 'Smoky, tarry, and distinctly northern European. Birch tar brings an almost leathery smokiness that recalls birch forests after rain.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'guaiac wood',
    slug: 'guaiac-wood',
    olfactive_family: 'woody',
    description: 'Smoky, tea-like, and slightly rosy. Guaiac wood is a South American hardwood with a unique character that smells like wood shavings and light smoke.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'papyrus',
    slug: 'papyrus',
    olfactive_family: 'woody',
    description: 'Earthy, aquatic-woody, and slightly smoky. Papyrus reed adds an ancient, papery texture that bridges woody and green olfactive families.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },

  // ── Spicy / Aromatic ────────────────────────────────────────────────────────
  {
    name: 'cardamom',
    slug: 'cardamom',
    olfactive_family: 'spicy',
    description: 'Warm, spicy, and slightly eucalyptus-like. Cardamom adds an aromatic freshness to warm compositions — a spice that reads cool.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'patchouli',
    slug: 'patchouli',
    olfactive_family: 'earthy',
    description: 'Dark, musty, earthy, and slightly sweet. One of the most polarizing ingredients — either beloved or hated. Aged patchouli becomes increasingly smooth and complex.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },

  // ── Musky / Animalic ────────────────────────────────────────────────────────
  {
    name: 'musk',
    slug: 'musk',
    olfactive_family: 'musky',
    description: 'Soft, skin-like, and intimate. All commercial musk today is synthetic — natural animal musk is banned. The character ranges from clean laundry to dark animal.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'ambrette',
    slug: 'ambrette',
    olfactive_family: 'musky',
    description: 'The finest natural musk substitute, extracted from musk mallow seeds. Soft, floral-musky, and radiant — often described as the closest to skin itself.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'ambergris',
    slug: 'ambergris',
    olfactive_family: 'musky',
    description: 'An oceanic, animalic, and radiant fixative. Real ambergris (from sperm whales) is now ethically off-limits; synthetic versions (Ambrox) are ubiquitous and powerful.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'leather',
    slug: 'leather',
    olfactive_family: 'leather',
    description: 'Warm, dry, and animalic with a smoky edge. True leather notes are always synthetic constructions — a blend that evokes birch tar, smokiness, and animal warmth.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },

  // ── Resinous / Balsamic ─────────────────────────────────────────────────────
  {
    name: 'benzoin',
    slug: 'benzoin',
    olfactive_family: 'resinous',
    description: 'Sweet, vanilla-like, and balsamic. Benzoin resin from Siam or Sumatra adds warmth and a soft sweetness that anchors oriental compositions.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'peru balsam',
    slug: 'peru-balsam',
    olfactive_family: 'resinous',
    description: 'Warm, spicy-sweet, and slightly vanilla-cinnamon. A rich natural resin from Central America — now restricted by IFRA due to allergen potential.',
    is_natural: true,
    is_common_allergen: true,
    eu_declared_allergen: true,
  },
  {
    name: 'incense',
    slug: 'incense',
    olfactive_family: 'resinous',
    description: 'Smoky, sacred, and ethereal. The term covers various resins (olibanum/frankincense chief among them) with a dry, meditative smokiness.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'oakmoss',
    slug: 'oakmoss',
    olfactive_family: 'mossy',
    description: 'Earthy, forest-floor, and green. The backbone of classic chypre fragrances. Now heavily restricted by IFRA due to sensitisation — replaced by moss accords.',
    is_natural: true,
    is_common_allergen: true,
    eu_declared_allergen: true,
  },

  // ── Gourmand ────────────────────────────────────────────────────────────────
  {
    name: 'vanilla',
    slug: 'vanilla',
    olfactive_family: 'gourmand',
    description: 'Warm, creamy, and universally beloved. Vanillin (the primary vanilla aroma molecule) is one of the most used ingredients in perfumery — comforting and sweet.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'dark chocolate',
    slug: 'dark-chocolate',
    olfactive_family: 'gourmand',
    description: 'Rich, bitter-sweet cocoa. A synthetic construction that evokes deep, roasted cacao — indulgent and luxurious without being overtly sweet.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },

  // ── Earthy / Other ──────────────────────────────────────────────────────────
  {
    name: 'black truffle',
    slug: 'black-truffle',
    olfactive_family: 'earthy',
    description: 'Earthy, umami, and intensely fungal. Black truffle in perfumery adds an animalic depth — dark, dirty in the best possible way, and deeply sensual.',
    is_natural: true,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
  {
    name: 'fruity notes',
    slug: 'fruity-notes',
    olfactive_family: 'fruity',
    description: 'A generic accord representing abstract fruit facets — not tied to a single fruit. Adds juicy brightness and sweetness without specificity.',
    is_natural: false,
    is_common_allergen: false,
    eu_declared_allergen: false,
  },
];

const { error } = await supabase
  .from('note_library')
  .upsert(notes, { onConflict: 'name' });

if (error) {
  console.error('Failed:', error.message);
  process.exit(1);
}

console.log(`✓ Seeded ${notes.length} notes into note_library`);

const byFamily = new Map<string, number>();
for (const n of notes) {
  byFamily.set(n.olfactive_family, (byFamily.get(n.olfactive_family) ?? 0) + 1);
}
for (const [family, count] of [...byFamily.entries()].sort()) {
  console.log(`  ${family}: ${count}`);
}
