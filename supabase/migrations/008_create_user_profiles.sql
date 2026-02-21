CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  skin_type TEXT,
  climate TEXT,
  age_range TEXT,
  budget_usd_max FLOAT,
  liked_perfume_ids UUID[] DEFAULT '{}',
  disliked_perfume_ids UUID[] DEFAULT '{}',
  owned_perfume_ids UUID[] DEFAULT '{}',
  wishlist_ids UUID[] DEFAULT '{}',
  liked_notes TEXT[] DEFAULT '{}',
  disliked_notes TEXT[] DEFAULT '{}',
  allergens TEXT[] DEFAULT '{}',
  occasions TEXT[] DEFAULT '{}',
  fragrance_experience TEXT DEFAULT 'beginner',
  embedding vector(512),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
