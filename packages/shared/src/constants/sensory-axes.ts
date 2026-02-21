export const SENSORY_AXES = [
  'sweetness', 'freshness', 'warmth', 'heaviness', 'powderiness',
  'woodiness', 'smokiness', 'leatheriness', 'floralness', 'fruitiness',
  'greenness', 'aquatics', 'spiciness', 'gourmand', 'animalic',
  'earthiness', 'resinousness'
] as const;

export type SensoryAxis = typeof SENSORY_AXES[number];
