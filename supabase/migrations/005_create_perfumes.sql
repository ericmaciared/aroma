CREATE TABLE perfumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name TEXT NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  year_released INT,
  concentration TEXT,
  gender_target TEXT,
  discontinued BOOLEAN DEFAULT false,
  price_usd FLOAT,
  price_tier TEXT,
  olfactive_family TEXT,
  olfactive_subfamilies TEXT[],
  key_accords TEXT[],

  -- Notes (stored as JSONB arrays)
  notes_top JSONB,
  notes_heart JSONB,
  notes_base JSONB,

  -- Sensory axes (flat FLOAT columns, range-indexed)
  sensory_sweetness FLOAT,
  sensory_freshness FLOAT,
  sensory_warmth FLOAT,
  sensory_heaviness FLOAT,
  sensory_powderiness FLOAT,
  sensory_woodiness FLOAT,
  sensory_smokiness FLOAT,
  sensory_leatheriness FLOAT,
  sensory_floralness FLOAT,
  sensory_fruitiness FLOAT,
  sensory_greenness FLOAT,
  sensory_aquatics FLOAT,
  sensory_spiciness FLOAT,
  sensory_gourmand FLOAT,
  sensory_animalic FLOAT,
  sensory_earthiness FLOAT,
  sensory_resinousness FLOAT,

  -- Occasion scores (flat FLOAT columns, range-indexed)
  occasion_daily_office FLOAT,
  occasion_romantic_date FLOAT,
  occasion_evening_formal FLOAT,
  occasion_casual_weekend FLOAT,
  occasion_sport_outdoor FLOAT,
  occasion_beach_vacation FLOAT,
  occasion_business_travel FLOAT,
  occasion_club_night FLOAT,
  occasion_wedding_guest FLOAT,
  occasion_interview FLOAT,
  occasion_home_lounge FLOAT,
  occasion_gift_giving FLOAT,

  -- Community scores
  community_rating FLOAT,
  rating_count INT,
  compliment_getter FLOAT,
  blind_buy_safe FLOAT,
  value_for_money FLOAT,
  longevity_score FLOAT,
  sillage_score FLOAT,

  -- Arrays (GIN indexed)
  declared_allergens TEXT[],
  mood_tags TEXT[],
  aesthetic_tags TEXT[],
  key_molecules TEXT[],
  praised_for TEXT[],
  criticized_for TEXT[],
  evokes TEXT[],
  layer_role TEXT[],

  -- Safety
  vegan BOOLEAN,
  cruelty_free BOOLEAN,
  reformulation_risk TEXT,

  -- JSONB nested objects
  evolution_profile JSONB,
  projection_arc JSONB,
  layering JSONB,
  bottle_design JSONB,
  reformulation_history JSONB,
  wardrobe_role JSONB,
  skin_behavior JSONB,
  fragrance_dna JSONB,

  -- Source tracking
  source_url TEXT,
  source_name TEXT,
  data_completeness FLOAT DEFAULT 0,

  -- Embeddings
  combined_embedding vector(1536),
  notes_embedding vector(1536),
  evokes_embedding vector(1536),
  opinion_embedding vector(1536),
  bottle_embedding vector(512),
  sensory_embedding vector(64),

  -- Full-text search
  searchable_text tsvector GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(name, '') || ' ' || coalesce(olfactive_family, ''))
  ) STORED,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
