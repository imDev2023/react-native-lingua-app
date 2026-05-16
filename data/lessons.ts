import type { Lesson, LanguageCode } from '@/types/learning';

/**
 * Beginner sample lessons.
 *
 * Conventions that keep this dataset easy to extend:
 *  - unit id:     `${lang}-u${n}`              e.g. "es-u1"
 *  - lesson id:   `${lang}-u${n}-l${m}`        e.g. "es-u1-l1"
 *  - child id:    `${lessonId}-${a|v|p}${k}`   e.g. "es-u1-l1-v1"
 *
 * `aiTeacher.focusVocabularyIds` points at vocabulary ids inside the same
 * lesson so the future audio Vision Agent can stay on topic.
 */
export const lessons: Lesson[] = [
  // ===================== Spanish · Unit 1 · Lesson 1 =====================
  {
    id: 'es-u1-l1',
    unitId: 'es-u1',
    languageId: 'es',
    title: 'Greetings',
    description: 'Say hello and goodbye like a local.',
    order: 1,
    xpReward: 10,
    goal: {
      summary: 'Greet someone and say goodbye in Spanish.',
      objectives: [
        'Recognize "hola" and "adiós"',
        'Use a greeting for the time of day',
        'Respond to "¿Cómo estás?"',
      ],
    },
    activities: [
      {
        id: 'es-u1-l1-a1',
        type: 'vocabulary',
        instruction: 'Learn these greetings.',
        items: [
          {
            id: 'es-u1-l1-v1',
            word: 'Hola',
            translation: 'Hello',
            pronunciation: 'OH-lah',
            example: 'Hola, ¿cómo estás?',
            exampleTranslation: 'Hello, how are you?',
          },
          {
            id: 'es-u1-l1-v2',
            word: 'Adiós',
            translation: 'Goodbye',
            pronunciation: 'ah-DYOHS',
            example: 'Adiós, hasta mañana.',
            exampleTranslation: 'Goodbye, see you tomorrow.',
          },
          {
            id: 'es-u1-l1-v3',
            word: 'Buenos días',
            translation: 'Good morning',
            pronunciation: 'BWEH-nohs DEE-ahs',
          },
          {
            id: 'es-u1-l1-v4',
            word: 'Buenas noches',
            translation: 'Good night',
            pronunciation: 'BWEH-nahs NOH-chehs',
          },
        ],
      },
      {
        id: 'es-u1-l1-a2',
        type: 'phrase',
        instruction: 'Practice these everyday phrases.',
        phrases: [
          {
            id: 'es-u1-l1-p1',
            text: '¿Cómo estás?',
            translation: 'How are you?',
            pronunciation: 'KOH-moh ehs-TAHS',
            literal: 'How you-are?',
          },
          {
            id: 'es-u1-l1-p2',
            text: 'Estoy bien, gracias.',
            translation: "I'm fine, thank you.",
            pronunciation: 'ehs-TOY byen, GRAH-syahs',
          },
        ],
      },
      {
        id: 'es-u1-l1-a3',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Hola" mean?',
        options: ['Goodbye', 'Hello', 'Thank you', 'Good night'],
        correctIndex: 1,
        explanation: '"Hola" is the most common way to say hello in Spanish.',
      },
      {
        id: 'es-u1-l1-a4',
        type: 'translate',
        instruction: 'Translate this greeting into Spanish.',
        prompt: 'Good morning',
        fromLanguage: 'en',
        toLanguage: 'es',
        acceptedAnswers: ['buenos días', 'buenos dias'],
      },
      {
        id: 'es-u1-l1-a5',
        type: 'listen',
        instruction: 'Listen and pick what you heard.',
        audioText: 'Hola',
        expectedAnswer: 'Hola',
        options: ['Hola', 'Adiós', 'Gracias'],
      },
    ],
    aiTeacher: {
      persona: 'Lucía, a warm and patient Spanish tutor from Madrid.',
      systemPrompt:
        'You are Lucía, a friendly Spanish tutor for absolute beginners. ' +
        'Speak slowly and use simple words. Stay on the topic of greetings ' +
        '(hola, adiós, buenos días, buenas noches) and the phrase "¿Cómo ' +
        'estás?". Gently correct mistakes, give lots of encouragement, and ' +
        'keep replies to one or two short sentences.',
      greeting: '¡Hola! I am Lucía. Ready to learn how to say hello in Spanish?',
      focusVocabularyIds: [
        'es-u1-l1-v1',
        'es-u1-l1-v2',
        'es-u1-l1-v3',
        'es-u1-l1-v4',
      ],
    },
  },

  // ===================== Spanish · Unit 1 · Lesson 2 =====================
  {
    id: 'es-u1-l2',
    unitId: 'es-u1',
    languageId: 'es',
    title: 'Introduce Yourself',
    description: 'Share your name and ask for someone else’s.',
    order: 2,
    xpReward: 10,
    goal: {
      summary: 'Say your name and ask someone theirs.',
      objectives: [
        'Use "Me llamo..." to say your name',
        'Ask "¿Cómo te llamas?"',
        'Say "Mucho gusto" when meeting someone',
      ],
    },
    activities: [
      {
        id: 'es-u1-l2-a1',
        type: 'vocabulary',
        instruction: 'Learn these introduction words.',
        items: [
          {
            id: 'es-u1-l2-v1',
            word: 'Me llamo',
            translation: 'My name is',
            pronunciation: 'meh YAH-moh',
            example: 'Me llamo Ana.',
            exampleTranslation: 'My name is Ana.',
          },
          {
            id: 'es-u1-l2-v2',
            word: 'Nombre',
            translation: 'Name',
            pronunciation: 'NOHM-breh',
          },
          {
            id: 'es-u1-l2-v3',
            word: 'Mucho gusto',
            translation: 'Nice to meet you',
            pronunciation: 'MOO-choh GOOS-toh',
          },
        ],
      },
      {
        id: 'es-u1-l2-a2',
        type: 'phrase',
        instruction: 'Practice introducing yourself.',
        phrases: [
          {
            id: 'es-u1-l2-p1',
            text: '¿Cómo te llamas?',
            translation: 'What is your name?',
            pronunciation: 'KOH-moh teh YAH-mahs',
            literal: 'How yourself you-call?',
          },
        ],
      },
      {
        id: 'es-u1-l2-a3',
        type: 'translate',
        instruction: 'Translate into Spanish.',
        prompt: 'My name is Sofia',
        fromLanguage: 'en',
        toLanguage: 'es',
        acceptedAnswers: ['me llamo sofia', 'me llamo sofía'],
      },
      {
        id: 'es-u1-l2-a4',
        type: 'multipleChoice',
        instruction: 'Choose the correct response.',
        question: 'Someone says "Mucho gusto". A natural reply is:',
        options: ['Adiós', 'Igualmente', 'Buenos días', 'No'],
        correctIndex: 1,
        explanation: '"Igualmente" means "likewise" — a polite reply.',
      },
    ],
    aiTeacher: {
      persona: 'Lucía, a warm and patient Spanish tutor from Madrid.',
      systemPrompt:
        'You are Lucía, a friendly Spanish tutor for beginners. Focus this ' +
        'session on introductions: "Me llamo...", "¿Cómo te llamas?", and ' +
        '"Mucho gusto". Ask the learner their name in Spanish and react ' +
        'warmly. Keep replies short and encouraging.',
      greeting: '¡Hola! Soy Lucía. ¿Cómo te llamas?',
      focusVocabularyIds: ['es-u1-l2-v1', 'es-u1-l2-v3'],
    },
  },

  // ===================== Spanish · Unit 2 · Lesson 1 =====================
  {
    id: 'es-u2-l1',
    unitId: 'es-u2',
    languageId: 'es',
    title: 'Polite Phrases',
    description: 'Be polite with please, thank you, and sorry.',
    order: 1,
    xpReward: 15,
    goal: {
      summary: 'Use core polite words in everyday situations.',
      objectives: [
        'Say please and thank you',
        'Apologize with "lo siento"',
        'Ask for help politely',
      ],
    },
    activities: [
      {
        id: 'es-u2-l1-a1',
        type: 'vocabulary',
        instruction: 'Learn these polite words.',
        items: [
          {
            id: 'es-u2-l1-v1',
            word: 'Por favor',
            translation: 'Please',
            pronunciation: 'pohr fah-VOHR',
          },
          {
            id: 'es-u2-l1-v2',
            word: 'Gracias',
            translation: 'Thank you',
            pronunciation: 'GRAH-syahs',
          },
          {
            id: 'es-u2-l1-v3',
            word: 'Lo siento',
            translation: "I'm sorry",
            pronunciation: 'loh SYEN-toh',
          },
          {
            id: 'es-u2-l1-v4',
            word: 'De nada',
            translation: "You're welcome",
            pronunciation: 'deh NAH-dah',
          },
        ],
      },
      {
        id: 'es-u2-l1-a2',
        type: 'phrase',
        instruction: 'Practice asking for help.',
        phrases: [
          {
            id: 'es-u2-l1-p1',
            text: '¿Me puede ayudar, por favor?',
            translation: 'Can you help me, please?',
            pronunciation: 'meh PWEH-deh ah-yoo-DAHR, pohr fah-VOHR',
          },
        ],
      },
      {
        id: 'es-u2-l1-a3',
        type: 'multipleChoice',
        instruction: 'Choose the best reply to "Gracias".',
        question: 'Someone thanks you. You say:',
        options: ['Lo siento', 'De nada', 'Hola', 'Adiós'],
        correctIndex: 1,
        explanation: '"De nada" is the standard reply to "gracias".',
      },
      {
        id: 'es-u2-l1-a4',
        type: 'listen',
        instruction: 'Listen and choose what you heard.',
        audioText: 'Gracias',
        expectedAnswer: 'Gracias',
        options: ['Gracias', 'Por favor', 'Lo siento'],
      },
    ],
    aiTeacher: {
      persona: 'Lucía, a warm and patient Spanish tutor from Madrid.',
      systemPrompt:
        'You are Lucía, a friendly Spanish tutor. Practice polite expressions ' +
        'with the learner: por favor, gracias, lo siento, de nada. Role-play ' +
        'small everyday scenes (a shop, asking for help). Keep it short, ' +
        'simple, and encouraging.',
      greeting: '¡Hola! Hoy practicamos ser amables. ¿Listo?',
      focusVocabularyIds: [
        'es-u2-l1-v1',
        'es-u2-l1-v2',
        'es-u2-l1-v3',
        'es-u2-l1-v4',
      ],
    },
  },

  // ===================== French · Unit 1 · Lesson 1 =====================
  {
    id: 'fr-u1-l1',
    unitId: 'fr-u1',
    languageId: 'fr',
    title: 'Greetings',
    description: 'Your first words in French.',
    order: 1,
    xpReward: 10,
    goal: {
      summary: 'Greet someone politely in French.',
      objectives: [
        'Recognize "bonjour" and "au revoir"',
        'Ask "Comment ça va?"',
        'Reply "Ça va bien"',
      ],
    },
    activities: [
      {
        id: 'fr-u1-l1-a1',
        type: 'vocabulary',
        instruction: 'Learn these French greetings.',
        items: [
          {
            id: 'fr-u1-l1-v1',
            word: 'Bonjour',
            translation: 'Hello / Good day',
            pronunciation: 'bohn-ZHOOR',
          },
          {
            id: 'fr-u1-l1-v2',
            word: 'Au revoir',
            translation: 'Goodbye',
            pronunciation: 'oh ruh-VWAHR',
          },
          {
            id: 'fr-u1-l1-v3',
            word: 'Merci',
            translation: 'Thank you',
            pronunciation: 'mehr-SEE',
          },
        ],
      },
      {
        id: 'fr-u1-l1-a2',
        type: 'phrase',
        instruction: 'Practice this phrase.',
        phrases: [
          {
            id: 'fr-u1-l1-p1',
            text: 'Comment ça va?',
            translation: 'How are you?',
            pronunciation: 'koh-mahn sah VAH',
          },
        ],
      },
      {
        id: 'fr-u1-l1-a3',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Bonjour" mean?',
        options: ['Goodbye', 'Thank you', 'Hello', 'Sorry'],
        correctIndex: 2,
        explanation: '"Bonjour" is the standard French greeting.',
      },
      {
        id: 'fr-u1-l1-a4',
        type: 'translate',
        instruction: 'Translate into French.',
        prompt: 'Thank you',
        fromLanguage: 'en',
        toLanguage: 'fr',
        acceptedAnswers: ['merci'],
      },
    ],
    aiTeacher: {
      persona: 'Camille, a cheerful French tutor from Lyon.',
      systemPrompt:
        'You are Camille, a cheerful French tutor for beginners. Stay on ' +
        'greetings: bonjour, au revoir, merci, and "Comment ça va?". Speak ' +
        'slowly, correct gently, and keep replies short and warm.',
      greeting: 'Bonjour ! Je suis Camille. On commence ?',
      focusVocabularyIds: ['fr-u1-l1-v1', 'fr-u1-l1-v2', 'fr-u1-l1-v3'],
    },
  },

  // ===================== German · Unit 1 · Lesson 1 =====================
  {
    id: 'de-u1-l1',
    unitId: 'de-u1',
    languageId: 'de',
    title: 'Greetings',
    description: 'Your first words in German.',
    order: 1,
    xpReward: 10,
    goal: {
      summary: 'Greet someone politely in German.',
      objectives: [
        'Recognize "hallo" and "tschüss"',
        'Say "Guten Morgen"',
        'Reply "Danke"',
      ],
    },
    activities: [
      {
        id: 'de-u1-l1-a1',
        type: 'vocabulary',
        instruction: 'Learn these German greetings.',
        items: [
          {
            id: 'de-u1-l1-v1',
            word: 'Hallo',
            translation: 'Hello',
            pronunciation: 'HAH-loh',
          },
          {
            id: 'de-u1-l1-v2',
            word: 'Tschüss',
            translation: 'Bye',
            pronunciation: 'CHOOSS',
          },
          {
            id: 'de-u1-l1-v3',
            word: 'Guten Morgen',
            translation: 'Good morning',
            pronunciation: 'GOO-ten MOR-gen',
          },
          {
            id: 'de-u1-l1-v4',
            word: 'Danke',
            translation: 'Thank you',
            pronunciation: 'DAHN-kuh',
          },
        ],
      },
      {
        id: 'de-u1-l1-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Danke" mean?',
        options: ['Hello', 'Goodbye', 'Please', 'Thank you'],
        correctIndex: 3,
        explanation: '"Danke" means "thank you" in German.',
      },
      {
        id: 'de-u1-l1-a3',
        type: 'translate',
        instruction: 'Translate into German.',
        prompt: 'Hello',
        fromLanguage: 'en',
        toLanguage: 'de',
        acceptedAnswers: ['hallo'],
      },
      {
        id: 'de-u1-l1-a4',
        type: 'listen',
        instruction: 'Listen and choose what you heard.',
        audioText: 'Hallo',
        expectedAnswer: 'Hallo',
        options: ['Hallo', 'Tschüss', 'Danke'],
      },
    ],
    aiTeacher: {
      persona: 'Max, a friendly German tutor from Berlin.',
      systemPrompt:
        'You are Max, a friendly German tutor for absolute beginners. Stay ' +
        'on greetings: hallo, tschüss, guten Morgen, danke. Speak slowly, ' +
        'correct kindly, and keep replies to one or two short sentences.',
      greeting: 'Hallo! Ich bin Max. Sollen wir anfangen?',
      focusVocabularyIds: [
        'de-u1-l1-v1',
        'de-u1-l1-v2',
        'de-u1-l1-v3',
        'de-u1-l1-v4',
      ],
    },
  },
];

/** All lessons for a unit, sorted by their order within the unit. */
export const getLessonsByUnit = (unitId: string): Lesson[] =>
  lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);

/** All lessons for a language, sorted by unit then lesson order. */
export const getLessonsByLanguage = (languageId: LanguageCode): Lesson[] =>
  lessons.filter((lesson) => lesson.languageId === languageId);

/** Find a lesson by id. Returns `undefined` if it does not exist. */
export const getLessonById = (id: string): Lesson | undefined =>
  lessons.find((lesson) => lesson.id === id);
