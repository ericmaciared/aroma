-- Enable RLS on images table (was missing from 010_create_rls.sql)
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Images are publicly readable"
  ON images FOR SELECT
  USING (true);

-- Drop unused variant columns — next/image handles all sizing on demand
ALTER TABLE images DROP COLUMN IF EXISTS url_thumb;
ALTER TABLE images DROP COLUMN IF EXISTS url_medium;
