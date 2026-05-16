/**
 * Learning content type system.
 *
 * The content model is intentionally simple and flat so it is easy to teach,
 * read, and extend:
 *
 *   Language -> Unit -> Lesson -> Activity
 *
 * A Lesson also carries a learner-facing `goal` and an `aiTeacher` prompt that
 * powers future audio-based Vision Agent lessons.
 */

/** ISO 639-1 codes for the languages this app currently supports. */
export type LanguageCode = 'es' | 'fr' | 'de';

/** Codes used when describing translation direction (target language or English). */
export type TranslationLang = LanguageCode | 'en';

export interface Language {
  id: LanguageCode;
  /** English name, e.g. "Spanish". */
  name: string;
  /** Name in the language itself, e.g. "Español". */
  nativeName: string;
  /** Emoji flag for quick, asset-free UI. */
  flag: string;
  /** Short friendly description shown on the language picker. */
  description: string;
  /** Whether learners can start this language yet. */
  available: boolean;
}

export interface VocabularyItem {
  id: string;
  /** Word in the language being learned. */
  word: string;
  /** English translation. */
  translation: string;
  /** Simple phonetic hint, e.g. "OH-lah". */
  pronunciation?: string;
  /** Example sentence in the target language. */
  example?: string;
  /** English translation of the example sentence. */
  exampleTranslation?: string;
}

export interface Phrase {
  id: string;
  /** Phrase in the target language. */
  text: string;
  /** English translation. */
  translation: string;
  /** Simple phonetic hint. */
  pronunciation?: string;
  /** Optional literal word-by-word meaning for curious learners. */
  literal?: string;
}

export type ActivityType =
  | 'vocabulary'
  | 'phrase'
  | 'multipleChoice'
  | 'translate'
  | 'listen';

interface BaseActivity {
  id: string;
  type: ActivityType;
  /** Short instruction shown to the learner. */
  instruction: string;
}

/** Teaches a small set of words. */
export interface VocabularyActivity extends BaseActivity {
  type: 'vocabulary';
  items: VocabularyItem[];
}

/** Teaches ready-to-use phrases. */
export interface PhraseActivity extends BaseActivity {
  type: 'phrase';
  phrases: Phrase[];
}

/** A single multiple-choice question. */
export interface MultipleChoiceActivity extends BaseActivity {
  type: 'multipleChoice';
  question: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  correctIndex: number;
  explanation?: string;
}

/** Asks the learner to translate a prompt. */
export interface TranslateActivity extends BaseActivity {
  type: 'translate';
  prompt: string;
  fromLanguage: TranslationLang;
  toLanguage: TranslationLang;
  /** Any of these answers count as correct. */
  acceptedAnswers: string[];
}

/**
 * A listening activity. `audioText` is what the AI teacher / TTS should speak,
 * which keeps this dataset usable by the future Vision Agent lessons.
 */
export interface ListenActivity extends BaseActivity {
  type: 'listen';
  audioText: string;
  expectedAnswer: string;
  options?: string[];
}

export type Activity =
  | VocabularyActivity
  | PhraseActivity
  | MultipleChoiceActivity
  | TranslateActivity
  | ListenActivity;

export interface LessonGoal {
  /** One-line, learner-facing goal. */
  summary: string;
  /** Bullet list of concrete things the learner will be able to do. */
  objectives: string[];
}

/**
 * Prompt configuration for the future audio-based AI teacher
 * (Stream Vision Agent). Lives with the lesson content so the agent always
 * has the right context for the lesson the learner is in.
 */
export interface AITeacherPrompt {
  /** Who the AI teacher is, e.g. "a warm, patient Spanish tutor named Lucía". */
  persona: string;
  /** Full system prompt handed to the Vision Agent for this lesson. */
  systemPrompt: string;
  /** First line the teacher speaks to the learner. */
  greeting: string;
  /** Vocabulary IDs the teacher should focus the conversation on. */
  focusVocabularyIds: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageId: LanguageCode;
  title: string;
  description: string;
  /** Position within the unit, starting at 1. */
  order: number;
  /** XP awarded on completion. */
  xpReward: number;
  goal: LessonGoal;
  activities: Activity[];
  aiTeacher: AITeacherPrompt;
}

export interface Unit {
  id: string;
  languageId: LanguageCode;
  title: string;
  description: string;
  /** Position within the language path, starting at 1. */
  order: number;
  /** Hex color for the unit card (matches the design system palette). */
  color: string;
  /** Emoji icon for quick, asset-free UI. */
  icon: string;
  /** Lesson IDs that belong to this unit, in display order. */
  lessonIds: string[];
}
