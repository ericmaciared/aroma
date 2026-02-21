CREATE TABLE note_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE,
  olfactive_family TEXT,
  description TEXT,
  is_common_allergen BOOLEAN DEFAULT false,
  eu_declared_allergen BOOLEAN DEFAULT false,
  is_natural BOOLEAN,
  embedding vector(512),
  created_at TIMESTAMPTZ DEFAULT now()
);
