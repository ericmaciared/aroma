export const CONCENTRATION = ['parfum', 'edp', 'edt', 'edc', 'soie', 'other'] as const;
export const GENDER_TARGET = ['masculine', 'feminine', 'unisex'] as const;
export const OLFACTIVE_FAMILY = [
  'floral', 'oriental', 'woody', 'fresh', 'fougere', 'chypre',
  'gourmand', 'aromatic', 'aquatic', 'leather', 'green', 'fruity'
] as const;
export const LAYER_ROLE = [
  'base_anchor', 'top_brightener', 'depth_adder',
  'sweetness_booster', 'projector', 'standalone_only'
] as const;
export const REFORMULATION_RISK = ['stable', 'minor_risk', 'known_changes', 'significantly_changed'] as const;
export const PRICE_TIER = ['budget', 'mainstream', 'premium', 'luxury', 'ultra_luxury'] as const;
export const SKIN_TYPE = ['dry', 'oily', 'normal', 'combination'] as const;
export const WARDROBE_ROLE = [
  'signature_everyday', 'special_occasion', 'seasonal_rotation',
  'office_safe', 'date_night', 'sport_gym', 'lounge_home',
  'statement_piece', 'base_layer', 'collection_piece'
] as const;
