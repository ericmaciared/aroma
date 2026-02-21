-- Semantic perfume search
CREATE OR REPLACE FUNCTION match_perfumes(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.6,
  match_count INT DEFAULT 20
)
RETURNS TABLE (id UUID, name TEXT, similarity FLOAT) AS $$
  SELECT
    p.id,
    p.name,
    1 - (p.combined_embedding <=> query_embedding) AS similarity
  FROM perfumes p
  WHERE p.combined_embedding IS NOT NULL
    AND 1 - (p.combined_embedding <=> query_embedding) > match_threshold
  ORDER BY p.combined_embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE sql STABLE;

-- Hybrid search: full-text + vector
CREATE OR REPLACE FUNCTION hybrid_search(
  query_text TEXT,
  query_embedding vector(1536),
  match_count INT DEFAULT 20
)
RETURNS TABLE (id UUID, name TEXT, score FLOAT) AS $$
  WITH fts AS (
    SELECT id, ts_rank(searchable_text, websearch_to_tsquery(query_text)) AS fts_score
    FROM perfumes
    WHERE searchable_text @@ websearch_to_tsquery(query_text)
  ),
  semantic AS (
    SELECT id, 1 - (combined_embedding <=> query_embedding) AS sem_score
    FROM perfumes
    WHERE combined_embedding IS NOT NULL
    ORDER BY combined_embedding <=> query_embedding
    LIMIT 50
  )
  SELECT
    p.id,
    p.name,
    COALESCE(fts.fts_score, 0) * 0.3 + COALESCE(semantic.sem_score, 0) * 0.7 AS score
  FROM perfumes p
  LEFT JOIN fts ON p.id = fts.id
  LEFT JOIN semantic ON p.id = semantic.id
  WHERE fts.id IS NOT NULL OR semantic.id IS NOT NULL
  ORDER BY score DESC
  LIMIT match_count;
$$ LANGUAGE sql STABLE;
