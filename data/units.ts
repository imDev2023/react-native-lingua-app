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
    lessonIds: ['es-u1-l1', 'es-u1-l2', 'es-u1-l3', 'es-u1-l4', 'es-u1-l5', 'es-u1-l6'],
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
    description: 'Your first French greetings and essentials.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['fr-u1-l1', 'fr-u1-l2', 'fr-u1-l3', 'fr-u1-l4', 'fr-u1-l5', 'fr-u1-l6'],
  },

  // ---------- German ----------
  {
    id: 'de-u1',
    languageId: 'de',
    title: 'Basics',
    description: 'Your first German greetings and essentials.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['de-u1-l1', 'de-u1-l2', 'de-u1-l3', 'de-u1-l4', 'de-u1-l5', 'de-u1-l6'],
  },

  // ---------- Japanese ----------
  {
    id: 'ja-u1',
    languageId: 'ja',
    title: 'Basics',
    description: 'Your first Japanese greetings and hiragana.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['ja-u1-l1', 'ja-u1-l2', 'ja-u1-l3', 'ja-u1-l4', 'ja-u1-l5', 'ja-u1-l6'],
  },

  // ---------- Korean ----------
  {
    id: 'ko-u1',
    languageId: 'ko',
    title: 'Basics',
    description: 'Your first Korean greetings and Hangul.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['ko-u1-l1', 'ko-u1-l2', 'ko-u1-l3', 'ko-u1-l4', 'ko-u1-l5', 'ko-u1-l6'],
  },

  // ---------- Chinese ----------
  {
    id: 'zh-u1',
    languageId: 'zh',
    title: 'Basics',
    description: 'Your first Mandarin greetings and tones.',
    order: 1,
    color: colors.linguaGreen,
    icon: '👋',
    lessonIds: ['zh-u1-l1', 'zh-u1-l2', 'zh-u1-l3', 'zh-u1-l4', 'zh-u1-l5', 'zh-u1-l6'],
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
