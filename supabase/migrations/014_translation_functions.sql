-- Safely merges translations for a single locale without overwriting other locales
CREATE OR REPLACE FUNCTION merge_perfume_translations(
  p_perfume_id UUID,
  p_locale     TEXT,
  p_data       JSONB
)
RETURNS VOID AS $$
  UPDATE perfumes
  SET translations = translations || jsonb_build_object(p_locale, p_data)
  WHERE id = p_perfume_id;
$$ LANGUAGE sql;

-- Helper to get translated field with English fallback
CREATE OR REPLACE FUNCTION get_perfume_field(
  p_perfume    JSONB,
  p_field      TEXT,
  p_locale     TEXT
)
RETURNS JSONB AS $$
  SELECT COALESCE(
    p_perfume->'translations'->p_locale->p_field,
    p_perfume->p_field
  );
$$ LANGUAGE sql IMMUTABLE;
