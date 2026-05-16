import type { Language, LanguageCode } from '@/types/learning';

/**
 * Languages the app can teach. Add a new entry here, then add matching units
 * in `data/units.ts` and lessons in `data/lessons.ts` using the same id.
 */
export const languages: Language[] = [
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: 'https://flagcdn.com/w320/es.png',
    description: 'The most spoken Romance language. Great for beginners.',
    available: true,
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: 'https://flagcdn.com/w320/fr.png',
    description: 'A beautiful language spoken across five continents.',
    available: true,
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: 'https://flagcdn.com/w320/de.png',
    description: 'The most widely spoken language in the European Union.',
    available: true,
  },
  {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: 'https://flagcdn.com/w320/jp.png',
    description: 'A fascinating language with three writing systems.',
    available: true,
  },
  {
    id: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: 'https://flagcdn.com/w320/kr.png',
    description: 'A logical language with a unique and elegant alphabet.',
    available: true,
  },
  {
    id: 'zh',
    name: 'Chinese',
    nativeName: '普通话',
    flag: 'https://flagcdn.com/w320/cn.png',
    description: 'The most spoken language in the world by native speakers.',
    available: true,
  },
];

/** Find a language by its code. Returns `undefined` if it does not exist. */
export const getLanguageById = (id: LanguageCode): Language | undefined =>
  languages.find((language) => language.id === id);

/** Only the languages a learner can currently start. */
export const getAvailableLanguages = (): Language[] =>
  languages.filter((language) => language.available);
