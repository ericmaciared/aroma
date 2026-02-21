-- Vector HNSW indexes
CREATE INDEX ON perfumes USING hnsw (combined_embedding vector_cosine_ops);
CREATE INDEX ON perfumes USING hnsw (evokes_embedding vector_cosine_ops);
CREATE INDEX ON perfumes USING hnsw (notes_embedding vector_cosine_ops);
CREATE INDEX ON perfumes USING hnsw (bottle_embedding vector_cosine_ops);
CREATE INDEX ON note_library USING hnsw (embedding vector_cosine_ops);

-- Full-text search
CREATE INDEX ON perfumes USING GIN (searchable_text);

-- GIN indexes for array containment
CREATE INDEX ON perfumes USING GIN (declared_allergens);
CREATE INDEX ON perfumes USING GIN (mood_tags);
CREATE INDEX ON perfumes USING GIN (key_molecules);
CREATE INDEX ON perfumes USING GIN (layer_role);
CREATE INDEX ON perfumes USING GIN (praised_for);

-- B-tree for sensory range filtering
CREATE INDEX ON perfumes (sensory_sweetness);
CREATE INDEX ON perfumes (sensory_freshness);
CREATE INDEX ON perfumes (sensory_warmth);
CREATE INDEX ON perfumes (sensory_woodiness);
CREATE INDEX ON perfumes (sensory_floralness);
CREATE INDEX ON perfumes (sensory_fruitiness);
CREATE INDEX ON perfumes (sensory_spiciness);

-- B-tree for occasion range filtering
CREATE INDEX ON perfumes (occasion_daily_office);
CREATE INDEX ON perfumes (occasion_romantic_date);
CREATE INDEX ON perfumes (occasion_evening_formal);

-- Common lookups
CREATE INDEX ON perfumes (brand_id);
CREATE INDEX ON perfumes (gender_target);
CREATE INDEX ON perfumes (price_tier);
CREATE INDEX ON perfumes (olfactive_family);
CREATE INDEX ON perfumes (data_completeness);
CREATE INDEX ON perfumes (community_rating);
