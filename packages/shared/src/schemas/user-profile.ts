import { z } from 'zod';
import { SKIN_TYPE } from '../constants/vocabularies';

export const UserProfileSchema = z.object({
  id: z.string().uuid(),
  skin_type: z.enum(SKIN_TYPE).optional(),
  climate: z.string().optional(),
  age_range: z.string().optional(),
  budget_usd_max: z.number().positive().optional(),
  liked_perfume_ids: z.array(z.string().uuid()).default([]),
  disliked_perfume_ids: z.array(z.string().uuid()).default([]),
  owned_perfume_ids: z.array(z.string().uuid()).default([]),
  wishlist_ids: z.array(z.string().uuid()).default([]),
  liked_notes: z.array(z.string()).default([]),
  disliked_notes: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  occasions: z.array(z.string()).default([]),
  fragrance_experience: z.enum(['beginner', 'intermediate', 'enthusiast', 'connoisseur']).optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
