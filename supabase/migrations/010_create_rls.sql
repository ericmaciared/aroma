-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read/write their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Perfumes are public read
ALTER TABLE perfumes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Perfumes are publicly readable"
  ON perfumes FOR SELECT
  USING (true);

-- Brands are public read
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Brands are publicly readable"
  ON brands FOR SELECT
  USING (true);
