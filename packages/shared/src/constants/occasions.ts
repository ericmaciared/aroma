export const OCCASION_FIELDS = [
  'daily_office', 'romantic_date', 'evening_formal', 'casual_weekend',
  'sport_outdoor', 'beach_vacation', 'business_travel', 'club_night',
  'wedding_guest', 'interview', 'home_lounge', 'gift_giving'
] as const;

export type OccasionField = typeof OCCASION_FIELDS[number];
