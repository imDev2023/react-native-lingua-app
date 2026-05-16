import { colors } from '@/constants/theme';
import type { LanguageCode, Unit } from '@/types/learning';

/**
 * Units group lessons into a learning path for a language.
 *
 * `lessonIds` must match lesson ids in `data/lessons.ts`. Keeping the link
 * explicit (instead of nesting lessons here) keeps each file small and easy
 * to read.
 */
export const units: Unit[] = [
  // ---------- Spanish ----------
  {
    id: 'es-u1',
    languageId: 'es',
    title: 'Basics',
    description: 'Say hello, goodbye, and a few essential words.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['es-u1-l1', 'es-u1-l2'],
  },
  {
    id: 'es-u2',
    languageId: 'es',
    title: 'Getting Around',
    description: 'Polite phrases for everyday situations.',
    order: 2,
    color: colors.linguaBlue,
    icon: '🧭',
    lessonIds: ['es-u2-l1'],
  },

  // ---------- French ----------
  {
    id: 'fr-u1',
    languageId: 'fr',
    title: 'Basics',
    description: 'Your first French greetings.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['fr-u1-l1'],
  },

  // ---------- German ----------
  {
    id: 'de-u1',
    languageId: 'de',
    title: 'Basics',
    description: 'Your first German greetings.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['de-u1-l1'],
  },
];

/** All units for a language, sorted by their path order. */
export const getUnitsByLanguage = (languageId: LanguageCode): Unit[] =>
  units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);

/** Find a unit by id. Returns `undefined` if it does not exist. */
export const getUnitById = (id: string): Unit | undefined =>
  units.find((unit) => unit.id === id);
