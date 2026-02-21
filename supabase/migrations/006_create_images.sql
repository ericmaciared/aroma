CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perfume_id UUID REFERENCES perfumes(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  url_thumb TEXT,
  url_medium TEXT,
  image_type TEXT DEFAULT 'hero',
  source TEXT,
  verified BOOLEAN DEFAULT false,
  embedding vector(512),
  created_at TIMESTAMPTZ DEFAULT now()
);
