CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perfume_id UUID REFERENCES perfumes(id) ON DELETE CASCADE,
  source TEXT,
  source_id TEXT,
  text TEXT,
  rating FLOAT,
  helpful_votes INT DEFAULT 0,
  country TEXT,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);
