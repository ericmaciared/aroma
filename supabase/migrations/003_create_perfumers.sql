CREATE TABLE perfumers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  nationality TEXT,
  bio TEXT,
  signature_style TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
