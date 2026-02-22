-- Add translations JSONB to perfumes
-- Stores per-locale narrative fields: evokes, description
-- English stays in flat columns as canonical source
ALTER TABLE perfumes
  ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}';

-- Add multilingual names to note_library
-- e.g. { "es": "bergamota", "fr": "bergamote" }
ALTER TABLE note_library
  ADD COLUMN IF NOT EXISTS names JSONB DEFAULT '{}';

-- Vocabulary translations — translate controlled terms once
-- Used for: mood_tags, aesthetic_tags, praised_for, criticized_for, layer_role, occasions
CREATE TABLE IF NOT EXISTS vocabulary_translations (
  term        TEXT    NOT NULL,
  locale      TEXT    NOT NULL,
  translation TEXT    NOT NULL,
  category    TEXT,   -- 'mood_tag', 'aesthetic_tag', 'occasion', 'layer_role', etc.
  PRIMARY KEY (term, locale)
);

-- Index for fast locale lookups
CREATE INDEX IF NOT EXISTS vocabulary_translations_locale_idx
  ON vocabulary_translations (locale, category);

-- Seed core vocabulary translations for mood_tags
INSERT INTO vocabulary_translations (term, locale, translation, category) VALUES
  -- Spanish
  ('cozy',          'es', 'acogedor',      'mood_tag'),
  ('intellectual',  'es', 'intelectual',   'mood_tag'),
  ('woody',         'es', 'amaderado',     'mood_tag'),
  ('fresh',         'es', 'fresco',        'mood_tag'),
  ('dark',          'es', 'oscuro',        'mood_tag'),
  ('sensual',       'es', 'sensual',       'mood_tag'),
  ('mysterious',    'es', 'misterioso',    'mood_tag'),
  ('glamorous',     'es', 'glamuroso',     'mood_tag'),
  ('minimal',       'es', 'minimalista',   'mood_tag'),
  ('confident',     'es', 'seguro',        'mood_tag'),
  ('powerful',      'es', 'poderoso',      'mood_tag'),
  ('masculine',     'es', 'masculino',     'mood_tag'),
  ('feminine',      'es', 'femenino',      'mood_tag'),
  ('unisex',        'es', 'unisex',        'mood_tag'),
  ('romantic',      'es', 'romántico',     'mood_tag'),
  ('casual',        'es', 'casual',        'mood_tag'),
  ('elegant',       'es', 'elegante',      'mood_tag'),
  ('playful',       'es', 'juguetón',      'mood_tag'),
  ('sophisticated', 'es', 'sofisticado',   'mood_tag'),
  ('vintage',       'es', 'vintage',       'mood_tag'),

  -- French
  ('cozy',          'fr', 'chaleureux',    'mood_tag'),
  ('intellectual',  'fr', 'intellectuel',  'mood_tag'),
  ('woody',         'fr', 'boisé',         'mood_tag'),
  ('fresh',         'fr', 'frais',         'mood_tag'),
  ('dark',          'fr', 'sombre',        'mood_tag'),
  ('sensual',       'fr', 'sensuel',       'mood_tag'),
  ('mysterious',    'fr', 'mystérieux',    'mood_tag'),
  ('glamorous',     'fr', 'glamour',       'mood_tag'),
  ('minimal',       'fr', 'minimaliste',   'mood_tag'),
  ('confident',     'fr', 'assuré',        'mood_tag'),
  ('powerful',      'fr', 'puissant',      'mood_tag'),
  ('masculine',     'fr', 'masculin',      'mood_tag'),
  ('feminine',      'fr', 'féminin',       'mood_tag'),
  ('unisex',        'fr', 'mixte',         'mood_tag'),
  ('romantic',      'fr', 'romantique',    'mood_tag'),
  ('casual',        'fr', 'décontracté',   'mood_tag'),
  ('elegant',       'fr', 'élégant',       'mood_tag'),
  ('playful',       'fr', 'espiègle',      'mood_tag'),
  ('sophisticated', 'fr', 'sophistiqué',   'mood_tag'),
  ('vintage',       'fr', 'vintage',       'mood_tag'),

  -- Praised/criticized vocabulary
  ('longevity',     'es', 'duración',      'praised_for'),
  ('projection',    'es', 'proyección',    'praised_for'),
  ('uniqueness',    'es', 'originalidad',  'praised_for'),
  ('compliments',   'es', 'cumplidos',     'praised_for'),
  ('versatility',   'es', 'versatilidad',  'praised_for'),
  ('value',         'es', 'relación calidad-precio', 'praised_for'),
  ('polarising',    'es', 'polarizante',   'criticized_for'),
  ('overpriced',    'es', 'caro',          'criticized_for'),
  ('reformulated',  'es', 'reformulado',   'criticized_for'),

  ('longevity',     'fr', 'longévité',     'praised_for'),
  ('projection',    'fr', 'projection',    'praised_for'),
  ('uniqueness',    'fr', 'originalité',   'praised_for'),
  ('compliments',   'fr', 'compliments',   'praised_for'),
  ('versatility',   'fr', 'polyvalence',   'praised_for'),
  ('value',         'fr', 'rapport qualité-prix', 'praised_for'),
  ('polarising',    'fr', 'clivant',       'criticized_for'),
  ('overpriced',    'fr', 'trop cher',     'criticized_for'),
  ('reformulated',  'fr', 'reformulé',     'criticized_for')

ON CONFLICT (term, locale) DO NOTHING;
