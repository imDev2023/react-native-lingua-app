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

  // ===================== Spanish · Unit 1 · Lesson 3 =====================
  {
    id: 'es-u1-l3',
    unitId: 'es-u1',
    languageId: 'es',
    title: 'Counting to Ten',
    description: 'Learn to count from one to ten in Spanish.',
    order: 3,
    xpReward: 10,
    goal: {
      summary: 'Count from one to ten in Spanish.',
      objectives: [
        'Say numbers one through five',
        'Say numbers six through ten',
        'Use numbers to state your age',
      ],
    },
    activities: [
      {
        id: 'es-u1-l3-a1',
        type: 'vocabulary',
        instruction: 'Learn these numbers.',
        items: [
          { id: 'es-u1-l3-v1', word: 'Uno', translation: 'One', pronunciation: 'OO-noh' },
          { id: 'es-u1-l3-v2', word: 'Dos', translation: 'Two', pronunciation: 'dohs' },
          { id: 'es-u1-l3-v3', word: 'Cinco', translation: 'Five', pronunciation: 'SEEN-koh' },
          { id: 'es-u1-l3-v4', word: 'Diez', translation: 'Ten', pronunciation: 'dyehs' },
        ],
      },
      {
        id: 'es-u1-l3-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Cinco" mean?',
        options: ['Two', 'Three', 'Five', 'Ten'],
        correctIndex: 2,
        explanation: '"Cinco" is the Spanish word for five.',
      },
    ],
    aiTeacher: {
      persona: 'Lucía, a warm and patient Spanish tutor from Madrid.',
      systemPrompt: 'You are Lucía, a friendly Spanish tutor. Practice counting from uno to diez. Keep it simple and encouraging.',
      greeting: '¡Hola! Hoy contamos. ¿Listo? Uno, dos, tres…',
      focusVocabularyIds: ['es-u1-l3-v1', 'es-u1-l3-v2', 'es-u1-l3-v3', 'es-u1-l3-v4'],
    },
  },

  // ===================== Spanish · Unit 1 · Lesson 4 =====================
  {
    id: 'es-u1-l4',
    unitId: 'es-u1',
    languageId: 'es',
    title: 'Colors',
    description: 'Describe the world around you using colors.',
    order: 4,
    xpReward: 10,
    goal: {
      summary: 'Name common colors in Spanish.',
      objectives: [
        'Recognize four basic colors',
        'Describe an object using a color',
        'Ask "What color is it?" in Spanish',
      ],
    },
    activities: [
      {
        id: 'es-u1-l4-a1',
        type: 'vocabulary',
        instruction: 'Learn these colors.',
        items: [
          { id: 'es-u1-l4-v1', word: 'Rojo', translation: 'Red', pronunciation: 'ROH-hoh' },
          { id: 'es-u1-l4-v2', word: 'Azul', translation: 'Blue', pronunciation: 'ah-SOOL' },
          { id: 'es-u1-l4-v3', word: 'Verde', translation: 'Green', pronunciation: 'VEHR-deh' },
          { id: 'es-u1-l4-v4', word: 'Amarillo', translation: 'Yellow', pronunciation: 'ah-mah-REE-yoh' },
        ],
      },
      {
        id: 'es-u1-l4-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Azul" mean?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correctIndex: 1,
        explanation: '"Azul" is the Spanish word for blue.',
      },
    ],
    aiTeacher: {
      persona: 'Lucía, a warm and patient Spanish tutor from Madrid.',
      systemPrompt: 'You are Lucía, a friendly Spanish tutor. Practice colors: rojo, azul, verde, amarillo. Use fun examples.',
      greeting: '¡Hola! ¿De qué color es el cielo? Practice colors with me!',
      focusVocabularyIds: ['es-u1-l4-v1', 'es-u1-l4-v2', 'es-u1-l4-v3', 'es-u1-l4-v4'],
    },
  },

  // ===================== Spanish · Unit 1 · Lesson 5 =====================
  {
    id: 'es-u1-l5',
    unitId: 'es-u1',
    languageId: 'es',
    title: 'Daily Life',
    description: 'Words for everyday things around you.',
    order: 5,
    xpReward: 10,
    goal: {
      summary: 'Use everyday Spanish vocabulary.',
      objectives: [
        'Name common objects at home',
        'Talk about food and water',
        'Describe a simple daily routine',
      ],
    },
    activities: [
      {
        id: 'es-u1-l5-a1',
        type: 'vocabulary',
        instruction: 'Learn these everyday words.',
        items: [
          { id: 'es-u1-l5-v1', word: 'Casa', translation: 'House', pronunciation: 'KAH-sah' },
          { id: 'es-u1-l5-v2', word: 'Comida', translation: 'Food', pronunciation: 'koh-MEE-dah' },
          { id: 'es-u1-l5-v3', word: 'Agua', translation: 'Water', pronunciation: 'AH-gwah' },
          { id: 'es-u1-l5-v4', word: 'Amigo', translation: 'Friend', pronunciation: 'ah-MEE-goh' },
        ],
      },
      {
        id: 'es-u1-l5-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Agua" mean?',
        options: ['House', 'Food', 'Water', 'Friend'],
        correctIndex: 2,
        explanation: '"Agua" is the Spanish word for water.',
      },
    ],
    aiTeacher: {
      persona: 'Lucía, a warm and patient Spanish tutor from Madrid.',
      systemPrompt: 'You are Lucía, a friendly Spanish tutor. Practice daily vocabulary: casa, comida, agua, amigo.',
      greeting: '¡Hola! Let\'s talk about everyday life. ¿Tienes hambre?',
      focusVocabularyIds: ['es-u1-l5-v1', 'es-u1-l5-v2', 'es-u1-l5-v3', 'es-u1-l5-v4'],
    },
  },

  // ===================== Spanish · Unit 1 · Lesson 6 =====================
  {
    id: 'es-u1-l6',
    unitId: 'es-u1',
    languageId: 'es',
    title: 'Family & Friends',
    description: 'Talk about the people closest to you.',
    order: 6,
    xpReward: 15,
    goal: {
      summary: 'Name family members in Spanish.',
      objectives: [
        'Say mother, father, brother, sister',
        'Introduce a family member',
        'Ask "Do you have siblings?" in Spanish',
      ],
    },
    activities: [
      {
        id: 'es-u1-l6-a1',
        type: 'vocabulary',
        instruction: 'Learn these family words.',
        items: [
          { id: 'es-u1-l6-v1', word: 'Madre', translation: 'Mother', pronunciation: 'MAH-dreh' },
          { id: 'es-u1-l6-v2', word: 'Padre', translation: 'Father', pronunciation: 'PAH-dreh' },
          { id: 'es-u1-l6-v3', word: 'Hermano', translation: 'Brother', pronunciation: 'ehr-MAH-noh' },
          { id: 'es-u1-l6-v4', word: 'Hermana', translation: 'Sister', pronunciation: 'ehr-MAH-nah' },
        ],
      },
      {
        id: 'es-u1-l6-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Hermano" mean?',
        options: ['Father', 'Mother', 'Sister', 'Brother'],
        correctIndex: 3,
        explanation: '"Hermano" is the Spanish word for brother.',
      },
    ],
    aiTeacher: {
      persona: 'Lucía, a warm and patient Spanish tutor from Madrid.',
      systemPrompt: 'You are Lucía, a friendly Spanish tutor. Practice family vocab: madre, padre, hermano, hermana.',
      greeting: '¡Hola! ¿Tienes hermanos? Let\'s talk about family!',
      focusVocabularyIds: ['es-u1-l6-v1', 'es-u1-l6-v2', 'es-u1-l6-v3', 'es-u1-l6-v4'],
    },
  },

  // ===================== French · Unit 1 · Lesson 2 =====================
  {
    id: 'fr-u1-l2',
    unitId: 'fr-u1',
    languageId: 'fr',
    title: 'Introduce Yourself',
    description: 'Share your name and ask for someone else\'s.',
    order: 2,
    xpReward: 10,
    goal: {
      summary: 'Say your name and ask someone theirs in French.',
      objectives: [
        'Use "Je m\'appelle…" to say your name',
        'Ask "Comment vous appelez-vous?"',
        'Say "Enchanté(e)" when meeting someone',
      ],
    },
    activities: [
      {
        id: 'fr-u1-l2-a1',
        type: 'vocabulary',
        instruction: 'Learn these introduction words.',
        items: [
          { id: 'fr-u1-l2-v1', word: 'Je m\'appelle', translation: 'My name is', pronunciation: 'zhuh mah-PEL' },
          { id: 'fr-u1-l2-v2', word: 'Enchanté', translation: 'Nice to meet you', pronunciation: 'ahn-shahn-TAY' },
          { id: 'fr-u1-l2-v3', word: 'Et vous?', translation: 'And you?', pronunciation: 'ay VOO' },
          { id: 'fr-u1-l2-v4', word: 'Ça va?', translation: 'How are you?', pronunciation: 'sah VAH' },
        ],
      },
      {
        id: 'fr-u1-l2-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Enchanté" mean?',
        options: ['Goodbye', 'Thank you', 'Nice to meet you', 'How are you?'],
        correctIndex: 2,
        explanation: '"Enchanté(e)" means "Nice to meet you" in French.',
      },
    ],
    aiTeacher: {
      persona: 'Camille, a cheerful French tutor from Lyon.',
      systemPrompt: 'You are Camille, a cheerful French tutor. Practice introductions: Je m\'appelle, enchanté, et vous?',
      greeting: 'Bonjour! Je m\'appelle Camille. Et vous?',
      focusVocabularyIds: ['fr-u1-l2-v1', 'fr-u1-l2-v2', 'fr-u1-l2-v3', 'fr-u1-l2-v4'],
    },
  },

  // ===================== French · Unit 1 · Lesson 3 =====================
  {
    id: 'fr-u1-l3',
    unitId: 'fr-u1',
    languageId: 'fr',
    title: 'Counting to Ten',
    description: 'Learn to count from one to ten in French.',
    order: 3,
    xpReward: 10,
    goal: {
      summary: 'Count from one to ten in French.',
      objectives: ['Recognize numbers 1–10 in French', 'Use numbers in simple phrases'],
    },
    activities: [
      {
        id: 'fr-u1-l3-a1',
        type: 'vocabulary',
        instruction: 'Learn these French numbers.',
        items: [
          { id: 'fr-u1-l3-v1', word: 'Un', translation: 'One', pronunciation: 'uhn' },
          { id: 'fr-u1-l3-v2', word: 'Deux', translation: 'Two', pronunciation: 'duh' },
          { id: 'fr-u1-l3-v3', word: 'Cinq', translation: 'Five', pronunciation: 'sank' },
          { id: 'fr-u1-l3-v4', word: 'Dix', translation: 'Ten', pronunciation: 'dees' },
        ],
      },
      {
        id: 'fr-u1-l3-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Deux" mean?',
        options: ['One', 'Two', 'Five', 'Ten'],
        correctIndex: 1,
        explanation: '"Deux" is the French word for two.',
      },
    ],
    aiTeacher: {
      persona: 'Camille, a cheerful French tutor from Lyon.',
      systemPrompt: 'You are Camille, a friendly French tutor. Practice counting from un to dix with the learner.',
      greeting: 'Bonjour ! Comptons ensemble. Un, deux, trois…',
      focusVocabularyIds: ['fr-u1-l3-v1', 'fr-u1-l3-v2', 'fr-u1-l3-v3', 'fr-u1-l3-v4'],
    },
  },

  // ===================== French · Unit 1 · Lesson 4 =====================
  {
    id: 'fr-u1-l4',
    unitId: 'fr-u1',
    languageId: 'fr',
    title: 'Colors',
    description: 'Describe the world in French colors.',
    order: 4,
    xpReward: 10,
    goal: {
      summary: 'Name common colors in French.',
      objectives: ['Recognize four basic colors in French', 'Describe objects using colors'],
    },
    activities: [
      {
        id: 'fr-u1-l4-a1',
        type: 'vocabulary',
        instruction: 'Learn these French colors.',
        items: [
          { id: 'fr-u1-l4-v1', word: 'Rouge', translation: 'Red', pronunciation: 'roozh' },
          { id: 'fr-u1-l4-v2', word: 'Bleu', translation: 'Blue', pronunciation: 'bluh' },
          { id: 'fr-u1-l4-v3', word: 'Vert', translation: 'Green', pronunciation: 'vehr' },
          { id: 'fr-u1-l4-v4', word: 'Jaune', translation: 'Yellow', pronunciation: 'zhohn' },
        ],
      },
      {
        id: 'fr-u1-l4-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Rouge" mean?',
        options: ['Blue', 'Green', 'Red', 'Yellow'],
        correctIndex: 2,
        explanation: '"Rouge" is the French word for red.',
      },
    ],
    aiTeacher: {
      persona: 'Camille, a cheerful French tutor from Lyon.',
      systemPrompt: 'You are Camille, a cheerful French tutor. Practice colors: rouge, bleu, vert, jaune.',
      greeting: 'Bonjour ! De quelle couleur est le ciel? Practice colors with me!',
      focusVocabularyIds: ['fr-u1-l4-v1', 'fr-u1-l4-v2', 'fr-u1-l4-v3', 'fr-u1-l4-v4'],
    },
  },

  // ===================== French · Unit 1 · Lesson 5 =====================
  {
    id: 'fr-u1-l5',
    unitId: 'fr-u1',
    languageId: 'fr',
    title: 'Daily Life',
    description: 'Words for everyday things in French.',
    order: 5,
    xpReward: 10,
    goal: {
      summary: 'Use everyday French vocabulary.',
      objectives: ['Name common everyday objects', 'Talk about food and home in French'],
    },
    activities: [
      {
        id: 'fr-u1-l5-a1',
        type: 'vocabulary',
        instruction: 'Learn these everyday French words.',
        items: [
          { id: 'fr-u1-l5-v1', word: 'Maison', translation: 'House', pronunciation: 'meh-ZON' },
          { id: 'fr-u1-l5-v2', word: 'Nourriture', translation: 'Food', pronunciation: 'noo-ree-TOOR' },
          { id: 'fr-u1-l5-v3', word: 'Eau', translation: 'Water', pronunciation: 'oh' },
          { id: 'fr-u1-l5-v4', word: 'Ami', translation: 'Friend', pronunciation: 'ah-MEE' },
        ],
      },
      {
        id: 'fr-u1-l5-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Eau" mean?',
        options: ['House', 'Food', 'Friend', 'Water'],
        correctIndex: 3,
        explanation: '"Eau" is the French word for water.',
      },
    ],
    aiTeacher: {
      persona: 'Camille, a cheerful French tutor from Lyon.',
      systemPrompt: 'You are Camille, a cheerful French tutor. Practice daily vocab: maison, nourriture, eau, ami.',
      greeting: 'Bonjour ! Parlons de la vie quotidienne. Qu\'est-ce que tu manges?',
      focusVocabularyIds: ['fr-u1-l5-v1', 'fr-u1-l5-v2', 'fr-u1-l5-v3', 'fr-u1-l5-v4'],
    },
  },

  // ===================== French · Unit 1 · Lesson 6 =====================
  {
    id: 'fr-u1-l6',
    unitId: 'fr-u1',
    languageId: 'fr',
    title: 'Family & Friends',
    description: 'Talk about family in French.',
    order: 6,
    xpReward: 15,
    goal: {
      summary: 'Name family members in French.',
      objectives: ['Say mother, father, brother, sister in French', 'Introduce a family member'],
    },
    activities: [
      {
        id: 'fr-u1-l6-a1',
        type: 'vocabulary',
        instruction: 'Learn these French family words.',
        items: [
          { id: 'fr-u1-l6-v1', word: 'Mère', translation: 'Mother', pronunciation: 'mehr' },
          { id: 'fr-u1-l6-v2', word: 'Père', translation: 'Father', pronunciation: 'pehr' },
          { id: 'fr-u1-l6-v3', word: 'Frère', translation: 'Brother', pronunciation: 'frehr' },
          { id: 'fr-u1-l6-v4', word: 'Sœur', translation: 'Sister', pronunciation: 'suhr' },
        ],
      },
      {
        id: 'fr-u1-l6-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Frère" mean?',
        options: ['Father', 'Sister', 'Brother', 'Mother'],
        correctIndex: 2,
        explanation: '"Frère" is the French word for brother.',
      },
    ],
    aiTeacher: {
      persona: 'Camille, a cheerful French tutor from Lyon.',
      systemPrompt: 'You are Camille, a friendly French tutor. Practice family vocab: mère, père, frère, sœur.',
      greeting: 'Bonjour ! Parle-moi de ta famille. Tu as des frères et sœurs?',
      focusVocabularyIds: ['fr-u1-l6-v1', 'fr-u1-l6-v2', 'fr-u1-l6-v3', 'fr-u1-l6-v4'],
    },
  },

  // ===================== German · Unit 1 · Lesson 2 =====================
  {
    id: 'de-u1-l2',
    unitId: 'de-u1',
    languageId: 'de',
    title: 'Introduce Yourself',
    description: 'Share your name and ask for someone else\'s.',
    order: 2,
    xpReward: 10,
    goal: {
      summary: 'Say your name and ask someone theirs in German.',
      objectives: [
        'Use "Ich heiße…" to say your name',
        'Ask "Wie heißt du?"',
        'Say "Freut mich" when meeting someone',
      ],
    },
    activities: [
      {
        id: 'de-u1-l2-a1',
        type: 'vocabulary',
        instruction: 'Learn these German introduction words.',
        items: [
          { id: 'de-u1-l2-v1', word: 'Ich heiße', translation: 'My name is', pronunciation: 'ikh HY-suh' },
          { id: 'de-u1-l2-v2', word: 'Freut mich', translation: 'Nice to meet you', pronunciation: 'froyt mikh' },
          { id: 'de-u1-l2-v3', word: 'Wie heißt du?', translation: 'What is your name?', pronunciation: 'vee hysst doo' },
          { id: 'de-u1-l2-v4', word: 'Woher kommst du?', translation: 'Where are you from?', pronunciation: 'voh-HEHR komst doo' },
        ],
      },
      {
        id: 'de-u1-l2-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Freut mich" mean?',
        options: ['Goodbye', 'Thank you', 'Nice to meet you', 'Good morning'],
        correctIndex: 2,
        explanation: '"Freut mich" means "Nice to meet you" in German.',
      },
    ],
    aiTeacher: {
      persona: 'Max, a friendly German tutor from Berlin.',
      systemPrompt: 'You are Max, a friendly German tutor. Practice introductions: Ich heiße, freut mich, wie heißt du?',
      greeting: 'Hallo! Ich heiße Max. Wie heißt du?',
      focusVocabularyIds: ['de-u1-l2-v1', 'de-u1-l2-v2', 'de-u1-l2-v3', 'de-u1-l2-v4'],
    },
  },

  // ===================== German · Unit 1 · Lesson 3 =====================
  {
    id: 'de-u1-l3',
    unitId: 'de-u1',
    languageId: 'de',
    title: 'Counting to Ten',
    description: 'Learn to count from one to ten in German.',
    order: 3,
    xpReward: 10,
    goal: {
      summary: 'Count from one to ten in German.',
      objectives: ['Recognize numbers 1–10 in German', 'Use numbers in simple phrases'],
    },
    activities: [
      {
        id: 'de-u1-l3-a1',
        type: 'vocabulary',
        instruction: 'Learn these German numbers.',
        items: [
          { id: 'de-u1-l3-v1', word: 'Eins', translation: 'One', pronunciation: 'eyns' },
          { id: 'de-u1-l3-v2', word: 'Zwei', translation: 'Two', pronunciation: 'tsvey' },
          { id: 'de-u1-l3-v3', word: 'Fünf', translation: 'Five', pronunciation: 'fuenf' },
          { id: 'de-u1-l3-v4', word: 'Zehn', translation: 'Ten', pronunciation: 'tsayn' },
        ],
      },
      {
        id: 'de-u1-l3-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Zwei" mean?',
        options: ['One', 'Two', 'Five', 'Ten'],
        correctIndex: 1,
        explanation: '"Zwei" is the German word for two.',
      },
    ],
    aiTeacher: {
      persona: 'Max, a friendly German tutor from Berlin.',
      systemPrompt: 'You are Max, a friendly German tutor. Practice counting from eins to zehn with the learner.',
      greeting: 'Hallo! Zählen wir zusammen. Eins, zwei, drei…',
      focusVocabularyIds: ['de-u1-l3-v1', 'de-u1-l3-v2', 'de-u1-l3-v3', 'de-u1-l3-v4'],
    },
  },

  // ===================== German · Unit 1 · Lesson 4 =====================
  {
    id: 'de-u1-l4',
    unitId: 'de-u1',
    languageId: 'de',
    title: 'Colors',
    description: 'Describe the world in German colors.',
    order: 4,
    xpReward: 10,
    goal: {
      summary: 'Name common colors in German.',
      objectives: ['Recognize four basic colors in German', 'Describe objects using colors'],
    },
    activities: [
      {
        id: 'de-u1-l4-a1',
        type: 'vocabulary',
        instruction: 'Learn these German colors.',
        items: [
          { id: 'de-u1-l4-v1', word: 'Rot', translation: 'Red', pronunciation: 'roht' },
          { id: 'de-u1-l4-v2', word: 'Blau', translation: 'Blue', pronunciation: 'blaw' },
          { id: 'de-u1-l4-v3', word: 'Grün', translation: 'Green', pronunciation: 'gruen' },
          { id: 'de-u1-l4-v4', word: 'Gelb', translation: 'Yellow', pronunciation: 'gelp' },
        ],
      },
      {
        id: 'de-u1-l4-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Blau" mean?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correctIndex: 1,
        explanation: '"Blau" is the German word for blue.',
      },
    ],
    aiTeacher: {
      persona: 'Max, a friendly German tutor from Berlin.',
      systemPrompt: 'You are Max, a friendly German tutor. Practice colors: rot, blau, grün, gelb.',
      greeting: 'Hallo! Welche Farbe ist der Himmel? Let\'s practice colors!',
      focusVocabularyIds: ['de-u1-l4-v1', 'de-u1-l4-v2', 'de-u1-l4-v3', 'de-u1-l4-v4'],
    },
  },

  // ===================== German · Unit 1 · Lesson 5 =====================
  {
    id: 'de-u1-l5',
    unitId: 'de-u1',
    languageId: 'de',
    title: 'Daily Life',
    description: 'Words for everyday things in German.',
    order: 5,
    xpReward: 10,
    goal: {
      summary: 'Use everyday German vocabulary.',
      objectives: ['Name common everyday objects', 'Talk about food and home in German'],
    },
    activities: [
      {
        id: 'de-u1-l5-a1',
        type: 'vocabulary',
        instruction: 'Learn these everyday German words.',
        items: [
          { id: 'de-u1-l5-v1', word: 'Haus', translation: 'House', pronunciation: 'hows' },
          { id: 'de-u1-l5-v2', word: 'Essen', translation: 'Food', pronunciation: 'ES-sen' },
          { id: 'de-u1-l5-v3', word: 'Wasser', translation: 'Water', pronunciation: 'VAH-ser' },
          { id: 'de-u1-l5-v4', word: 'Freund', translation: 'Friend', pronunciation: 'froynt' },
        ],
      },
      {
        id: 'de-u1-l5-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Wasser" mean?',
        options: ['House', 'Food', 'Water', 'Friend'],
        correctIndex: 2,
        explanation: '"Wasser" is the German word for water.',
      },
    ],
    aiTeacher: {
      persona: 'Max, a friendly German tutor from Berlin.',
      systemPrompt: 'You are Max, a friendly German tutor. Practice daily vocab: Haus, Essen, Wasser, Freund.',
      greeting: 'Hallo! Lass uns über den Alltag sprechen. Was isst du gerne?',
      focusVocabularyIds: ['de-u1-l5-v1', 'de-u1-l5-v2', 'de-u1-l5-v3', 'de-u1-l5-v4'],
    },
  },

  // ===================== German · Unit 1 · Lesson 6 =====================
  {
    id: 'de-u1-l6',
    unitId: 'de-u1',
    languageId: 'de',
    title: 'Family & Friends',
    description: 'Talk about family in German.',
    order: 6,
    xpReward: 15,
    goal: {
      summary: 'Name family members in German.',
      objectives: ['Say mother, father, brother, sister in German', 'Introduce a family member'],
    },
    activities: [
      {
        id: 'de-u1-l6-a1',
        type: 'vocabulary',
        instruction: 'Learn these German family words.',
        items: [
          { id: 'de-u1-l6-v1', word: 'Mutter', translation: 'Mother', pronunciation: 'MOO-ter' },
          { id: 'de-u1-l6-v2', word: 'Vater', translation: 'Father', pronunciation: 'FAH-ter' },
          { id: 'de-u1-l6-v3', word: 'Bruder', translation: 'Brother', pronunciation: 'BROO-der' },
          { id: 'de-u1-l6-v4', word: 'Schwester', translation: 'Sister', pronunciation: 'SHVES-ter' },
        ],
      },
      {
        id: 'de-u1-l6-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "Schwester" mean?',
        options: ['Mother', 'Father', 'Brother', 'Sister'],
        correctIndex: 3,
        explanation: '"Schwester" is the German word for sister.',
      },
    ],
    aiTeacher: {
      persona: 'Max, a friendly German tutor from Berlin.',
      systemPrompt: 'You are Max, a friendly German tutor. Practice family vocab: Mutter, Vater, Bruder, Schwester.',
      greeting: 'Hallo! Erzähl mir von deiner Familie. Hast du Geschwister?',
      focusVocabularyIds: ['de-u1-l6-v1', 'de-u1-l6-v2', 'de-u1-l6-v3', 'de-u1-l6-v4'],
    },
  },

  // ===================== Japanese · Unit 1 · Lesson 1 =====================
  {
    id: 'ja-u1-l1',
    unitId: 'ja-u1',
    languageId: 'ja',
    title: 'Greetings',
    description: 'Your first words in Japanese.',
    order: 1,
    xpReward: 10,
    goal: {
      summary: 'Greet someone politely in Japanese.',
      objectives: ['Recognize "Konnichiwa" and "Arigatou"', 'Use a greeting for the time of day'],
    },
    activities: [
      {
        id: 'ja-u1-l1-a1',
        type: 'vocabulary',
        instruction: 'Learn these Japanese greetings.',
        items: [
          { id: 'ja-u1-l1-v1', word: 'こんにちは', translation: 'Hello', pronunciation: 'kon-nee-chi-WA' },
          { id: 'ja-u1-l1-v2', word: 'ありがとう', translation: 'Thank you', pronunciation: 'ah-ree-GAH-toh' },
          { id: 'ja-u1-l1-v3', word: 'おはよう', translation: 'Good morning', pronunciation: 'oh-hah-YOH' },
          { id: 'ja-u1-l1-v4', word: 'さようなら', translation: 'Goodbye', pronunciation: 'sah-yoh-NAH-rah' },
        ],
      },
      {
        id: 'ja-u1-l1-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "こんにちは" mean?',
        options: ['Goodbye', 'Thank you', 'Hello', 'Good morning'],
        correctIndex: 2,
        explanation: '"こんにちは" (Konnichiwa) is the standard Japanese greeting.',
      },
    ],
    aiTeacher: {
      persona: 'Yuki, a friendly Japanese tutor from Tokyo.',
      systemPrompt: 'You are Yuki, a friendly Japanese tutor for beginners. Stay on greetings: こんにちは, ありがとう, おはよう, さようなら. Keep replies short and encouraging.',
      greeting: 'こんにちは！私はYukiです。Let\'s learn Japanese together!',
      focusVocabularyIds: ['ja-u1-l1-v1', 'ja-u1-l1-v2', 'ja-u1-l1-v3', 'ja-u1-l1-v4'],
    },
  },

  // ===================== Japanese · Unit 1 · Lesson 2 =====================
  {
    id: 'ja-u1-l2',
    unitId: 'ja-u1',
    languageId: 'ja',
    title: 'Introduce Yourself',
    description: 'Share your name in Japanese.',
    order: 2,
    xpReward: 10,
    goal: {
      summary: 'Say your name and greet someone new in Japanese.',
      objectives: ['Use "Watashi wa… desu" to introduce yourself', 'Say "Hajimemashite"'],
    },
    activities: [
      {
        id: 'ja-u1-l2-a1',
        type: 'vocabulary',
        instruction: 'Learn these Japanese introduction words.',
        items: [
          { id: 'ja-u1-l2-v1', word: 'わたしは', translation: 'I am / My name is', pronunciation: 'wah-TAH-shi wa' },
          { id: 'ja-u1-l2-v2', word: 'はじめまして', translation: 'Nice to meet you', pronunciation: 'ha-ji-meh-MASH-teh' },
          { id: 'ja-u1-l2-v3', word: 'よろしく', translation: 'Please to know you', pronunciation: 'yoh-ROH-shi-koo' },
          { id: 'ja-u1-l2-v4', word: 'なまえ', translation: 'Name', pronunciation: 'NAH-mah-eh' },
        ],
      },
      {
        id: 'ja-u1-l2-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "はじめまして" mean?',
        options: ['Goodbye', 'Nice to meet you', 'Thank you', 'Good morning'],
        correctIndex: 1,
        explanation: '"はじめまして" (Hajimemashite) means "Nice to meet you" in Japanese.',
      },
    ],
    aiTeacher: {
      persona: 'Yuki, a friendly Japanese tutor from Tokyo.',
      systemPrompt: 'You are Yuki, a friendly Japanese tutor. Focus on introductions: わたしは, はじめまして, よろしく.',
      greeting: 'こんにちは！はじめまして！あなたのなまえは？',
      focusVocabularyIds: ['ja-u1-l2-v1', 'ja-u1-l2-v2', 'ja-u1-l2-v3', 'ja-u1-l2-v4'],
    },
  },

  // ===================== Japanese · Unit 1 · Lesson 3 =====================
  {
    id: 'ja-u1-l3',
    unitId: 'ja-u1',
    languageId: 'ja',
    title: 'Numbers',
    description: 'Count from one to ten in Japanese.',
    order: 3,
    xpReward: 10,
    goal: {
      summary: 'Count from one to ten in Japanese.',
      objectives: ['Say numbers 1–10 in Japanese', 'Use numbers in simple phrases'],
    },
    activities: [
      {
        id: 'ja-u1-l3-a1',
        type: 'vocabulary',
        instruction: 'Learn these Japanese numbers.',
        items: [
          { id: 'ja-u1-l3-v1', word: 'いち', translation: 'One', pronunciation: 'ee-chi' },
          { id: 'ja-u1-l3-v2', word: 'に', translation: 'Two', pronunciation: 'nee' },
          { id: 'ja-u1-l3-v3', word: 'ご', translation: 'Five', pronunciation: 'goh' },
          { id: 'ja-u1-l3-v4', word: 'じゅう', translation: 'Ten', pronunciation: 'joo' },
        ],
      },
      {
        id: 'ja-u1-l3-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "ご" mean?',
        options: ['One', 'Two', 'Five', 'Ten'],
        correctIndex: 2,
        explanation: '"ご" (Go) is the Japanese word for five.',
      },
    ],
    aiTeacher: {
      persona: 'Yuki, a friendly Japanese tutor from Tokyo.',
      systemPrompt: 'You are Yuki, a friendly Japanese tutor. Practice counting: いち, に, さん, し, ご…',
      greeting: 'こんにちは！数を数えましょう。いち、に、さん…',
      focusVocabularyIds: ['ja-u1-l3-v1', 'ja-u1-l3-v2', 'ja-u1-l3-v3', 'ja-u1-l3-v4'],
    },
  },

  // ===================== Japanese · Unit 1 · Lesson 4 =====================
  {
    id: 'ja-u1-l4',
    unitId: 'ja-u1',
    languageId: 'ja',
    title: 'Hiragana Basics',
    description: 'Learn the five core Japanese vowel sounds.',
    order: 4,
    xpReward: 15,
    goal: {
      summary: 'Read and write the five Japanese vowels in hiragana.',
      objectives: ['Recognize あ, い, う, え, お', 'Sound out simple hiragana words'],
    },
    activities: [
      {
        id: 'ja-u1-l4-a1',
        type: 'vocabulary',
        instruction: 'Learn these hiragana vowels.',
        items: [
          { id: 'ja-u1-l4-v1', word: 'あ', translation: 'a (as in "ah")', pronunciation: 'ah' },
          { id: 'ja-u1-l4-v2', word: 'い', translation: 'i (as in "ee")', pronunciation: 'ee' },
          { id: 'ja-u1-l4-v3', word: 'う', translation: 'u (as in "oo")', pronunciation: 'oo' },
          { id: 'ja-u1-l4-v4', word: 'え', translation: 'e (as in "eh")', pronunciation: 'eh' },
        ],
      },
      {
        id: 'ja-u1-l4-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct sound.',
        question: 'How do you pronounce "あ"?',
        options: ['ee', 'oo', 'ah', 'eh'],
        correctIndex: 2,
        explanation: '"あ" is the first hiragana vowel and sounds like "ah".',
      },
    ],
    aiTeacher: {
      persona: 'Yuki, a friendly Japanese tutor from Tokyo.',
      systemPrompt: 'You are Yuki, a friendly Japanese tutor. Practice hiragana vowels: あ, い, う, え, お. Be encouraging and patient.',
      greeting: 'こんにちは！Let\'s learn hiragana! あ, い, う, え, お…',
      focusVocabularyIds: ['ja-u1-l4-v1', 'ja-u1-l4-v2', 'ja-u1-l4-v3', 'ja-u1-l4-v4'],
    },
  },

  // ===================== Japanese · Unit 1 · Lesson 5 =====================
  {
    id: 'ja-u1-l5',
    unitId: 'ja-u1',
    languageId: 'ja',
    title: 'Colors',
    description: 'Name colors in Japanese.',
    order: 5,
    xpReward: 10,
    goal: {
      summary: 'Name common colors in Japanese.',
      objectives: ['Recognize four basic colors in Japanese', 'Describe objects by color'],
    },
    activities: [
      {
        id: 'ja-u1-l5-a1',
        type: 'vocabulary',
        instruction: 'Learn these Japanese colors.',
        items: [
          { id: 'ja-u1-l5-v1', word: 'あか', translation: 'Red', pronunciation: 'ah-KAH' },
          { id: 'ja-u1-l5-v2', word: 'あお', translation: 'Blue', pronunciation: 'ah-OH' },
          { id: 'ja-u1-l5-v3', word: 'みどり', translation: 'Green', pronunciation: 'mee-DOH-ree' },
          { id: 'ja-u1-l5-v4', word: 'きいろ', translation: 'Yellow', pronunciation: 'kee-EE-roh' },
        ],
      },
      {
        id: 'ja-u1-l5-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "あか" mean?',
        options: ['Blue', 'Green', 'Red', 'Yellow'],
        correctIndex: 2,
        explanation: '"あか" (Aka) is the Japanese word for red.',
      },
    ],
    aiTeacher: {
      persona: 'Yuki, a friendly Japanese tutor from Tokyo.',
      systemPrompt: 'You are Yuki, a friendly Japanese tutor. Practice colors: あか, あお, みどり, きいろ.',
      greeting: 'こんにちは！空は何色ですか? Let\'s talk about colors!',
      focusVocabularyIds: ['ja-u1-l5-v1', 'ja-u1-l5-v2', 'ja-u1-l5-v3', 'ja-u1-l5-v4'],
    },
  },

  // ===================== Japanese · Unit 1 · Lesson 6 =====================
  {
    id: 'ja-u1-l6',
    unitId: 'ja-u1',
    languageId: 'ja',
    title: 'Family',
    description: 'Talk about your family in Japanese.',
    order: 6,
    xpReward: 15,
    goal: {
      summary: 'Name family members in Japanese.',
      objectives: ['Say mother, father, sibling in Japanese', 'Talk about your family'],
    },
    activities: [
      {
        id: 'ja-u1-l6-a1',
        type: 'vocabulary',
        instruction: 'Learn these Japanese family words.',
        items: [
          { id: 'ja-u1-l6-v1', word: 'はは', translation: 'Mother', pronunciation: 'hah-HAH' },
          { id: 'ja-u1-l6-v2', word: 'ちち', translation: 'Father', pronunciation: 'chee-CHEE' },
          { id: 'ja-u1-l6-v3', word: 'あに', translation: 'Older brother', pronunciation: 'ah-NEE' },
          { id: 'ja-u1-l6-v4', word: 'いもうと', translation: 'Younger sister', pronunciation: 'ee-MOH-toh' },
        ],
      },
      {
        id: 'ja-u1-l6-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "はは" mean?',
        options: ['Father', 'Mother', 'Sister', 'Brother'],
        correctIndex: 1,
        explanation: '"はは" (Haha) is the Japanese word for mother.',
      },
    ],
    aiTeacher: {
      persona: 'Yuki, a friendly Japanese tutor from Tokyo.',
      systemPrompt: 'You are Yuki, a friendly Japanese tutor. Practice family words: はは, ちち, あに, いもうと.',
      greeting: 'こんにちは！家族のことを話しましょう。あなたには兄弟がいますか?',
      focusVocabularyIds: ['ja-u1-l6-v1', 'ja-u1-l6-v2', 'ja-u1-l6-v3', 'ja-u1-l6-v4'],
    },
  },

  // ===================== Korean · Unit 1 · Lesson 1 =====================
  {
    id: 'ko-u1-l1',
    unitId: 'ko-u1',
    languageId: 'ko',
    title: 'Greetings',
    description: 'Your first words in Korean.',
    order: 1,
    xpReward: 10,
    goal: {
      summary: 'Greet someone politely in Korean.',
      objectives: ['Recognize "Annyeonghaseyo" and "Gamsahamnida"', 'Use a greeting for the time of day'],
    },
    activities: [
      {
        id: 'ko-u1-l1-a1',
        type: 'vocabulary',
        instruction: 'Learn these Korean greetings.',
        items: [
          { id: 'ko-u1-l1-v1', word: '안녕하세요', translation: 'Hello (formal)', pronunciation: 'an-nyeong-ha-SEH-yo' },
          { id: 'ko-u1-l1-v2', word: '감사합니다', translation: 'Thank you', pronunciation: 'gam-sah-HAM-nee-dah' },
          { id: 'ko-u1-l1-v3', word: '안녕', translation: 'Hi / Bye (casual)', pronunciation: 'an-nyeong' },
          { id: 'ko-u1-l1-v4', word: '죄송합니다', translation: 'I am sorry', pronunciation: 'jweh-song-HAM-nee-dah' },
        ],
      },
      {
        id: 'ko-u1-l1-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "감사합니다" mean?',
        options: ['Hello', 'Goodbye', 'Thank you', 'I am sorry'],
        correctIndex: 2,
        explanation: '"감사합니다" (Gamsahamnida) means "thank you" in formal Korean.',
      },
    ],
    aiTeacher: {
      persona: 'Jina, a warm Korean tutor from Seoul.',
      systemPrompt: 'You are Jina, a friendly Korean tutor for beginners. Stay on greetings: 안녕하세요, 감사합니다, 안녕, 죄송합니다. Keep replies short and encouraging.',
      greeting: '안녕하세요! 저는 Jina입니다. Let\'s learn Korean together!',
      focusVocabularyIds: ['ko-u1-l1-v1', 'ko-u1-l1-v2', 'ko-u1-l1-v3', 'ko-u1-l1-v4'],
    },
  },

  // ===================== Korean · Unit 1 · Lesson 2 =====================
  {
    id: 'ko-u1-l2',
    unitId: 'ko-u1',
    languageId: 'ko',
    title: 'Introduce Yourself',
    description: 'Share your name in Korean.',
    order: 2,
    xpReward: 10,
    goal: {
      summary: 'Say your name and greet someone in Korean.',
      objectives: ['Use "Je ireumeun… imnida" to introduce yourself', 'Say "Bangapseumnida"'],
    },
    activities: [
      {
        id: 'ko-u1-l2-a1',
        type: 'vocabulary',
        instruction: 'Learn these Korean introduction words.',
        items: [
          { id: 'ko-u1-l2-v1', word: '제 이름은', translation: 'My name is', pronunciation: 'jeh ee-reum-eun' },
          { id: 'ko-u1-l2-v2', word: '반갑습니다', translation: 'Nice to meet you', pronunciation: 'ban-gap-SEUM-nee-dah' },
          { id: 'ko-u1-l2-v3', word: '어디서 오셨어요?', translation: 'Where are you from?', pronunciation: 'eo-di-seo oh-SYEOSS-eo-yo' },
          { id: 'ko-u1-l2-v4', word: '이름', translation: 'Name', pronunciation: 'ee-reum' },
        ],
      },
      {
        id: 'ko-u1-l2-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "반갑습니다" mean?',
        options: ['Goodbye', 'Thank you', 'Nice to meet you', 'Good morning'],
        correctIndex: 2,
        explanation: '"반갑습니다" (Bangapseumnida) means "nice to meet you" in Korean.',
      },
    ],
    aiTeacher: {
      persona: 'Jina, a warm Korean tutor from Seoul.',
      systemPrompt: 'You are Jina, a friendly Korean tutor. Focus on introductions: 제 이름은, 반갑습니다.',
      greeting: '안녕하세요! 반갑습니다. 이름이 뭐예요?',
      focusVocabularyIds: ['ko-u1-l2-v1', 'ko-u1-l2-v2', 'ko-u1-l2-v3', 'ko-u1-l2-v4'],
    },
  },

  // ===================== Korean · Unit 1 · Lesson 3 =====================
  {
    id: 'ko-u1-l3',
    unitId: 'ko-u1',
    languageId: 'ko',
    title: 'Numbers',
    description: 'Count from one to ten in Korean.',
    order: 3,
    xpReward: 10,
    goal: {
      summary: 'Count from one to ten in Korean.',
      objectives: ['Say Sino-Korean numbers 1–10', 'Use numbers in simple phrases'],
    },
    activities: [
      {
        id: 'ko-u1-l3-a1',
        type: 'vocabulary',
        instruction: 'Learn these Korean numbers.',
        items: [
          { id: 'ko-u1-l3-v1', word: '일', translation: 'One', pronunciation: 'il' },
          { id: 'ko-u1-l3-v2', word: '이', translation: 'Two', pronunciation: 'ee' },
          { id: 'ko-u1-l3-v3', word: '오', translation: 'Five', pronunciation: 'oh' },
          { id: 'ko-u1-l3-v4', word: '십', translation: 'Ten', pronunciation: 'sip' },
        ],
      },
      {
        id: 'ko-u1-l3-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "오" mean?',
        options: ['One', 'Two', 'Five', 'Ten'],
        correctIndex: 2,
        explanation: '"오" (O) is the Sino-Korean word for five.',
      },
    ],
    aiTeacher: {
      persona: 'Jina, a warm Korean tutor from Seoul.',
      systemPrompt: 'You are Jina, a friendly Korean tutor. Practice counting: 일, 이, 삼, 사, 오…',
      greeting: '안녕하세요! 숫자를 배워요. 일, 이, 삼…',
      focusVocabularyIds: ['ko-u1-l3-v1', 'ko-u1-l3-v2', 'ko-u1-l3-v3', 'ko-u1-l3-v4'],
    },
  },

  // ===================== Korean · Unit 1 · Lesson 4 =====================
  {
    id: 'ko-u1-l4',
    unitId: 'ko-u1',
    languageId: 'ko',
    title: 'Hangul Basics',
    description: 'Learn the foundational Korean alphabet letters.',
    order: 4,
    xpReward: 15,
    goal: {
      summary: 'Read four basic Hangul syllables.',
      objectives: ['Recognize 가, 나, 다, 라', 'Sound out simple Hangul syllables'],
    },
    activities: [
      {
        id: 'ko-u1-l4-a1',
        type: 'vocabulary',
        instruction: 'Learn these basic Hangul syllables.',
        items: [
          { id: 'ko-u1-l4-v1', word: '가', translation: '"ga" sound', pronunciation: 'gah' },
          { id: 'ko-u1-l4-v2', word: '나', translation: '"na" sound', pronunciation: 'nah' },
          { id: 'ko-u1-l4-v3', word: '다', translation: '"da" sound', pronunciation: 'dah' },
          { id: 'ko-u1-l4-v4', word: '라', translation: '"ra" sound', pronunciation: 'rah' },
        ],
      },
      {
        id: 'ko-u1-l4-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct sound.',
        question: 'How do you pronounce "나"?',
        options: ['gah', 'nah', 'dah', 'rah'],
        correctIndex: 1,
        explanation: '"나" is a Hangul syllable that makes the "na" sound.',
      },
    ],
    aiTeacher: {
      persona: 'Jina, a warm Korean tutor from Seoul.',
      systemPrompt: 'You are Jina, a friendly Korean tutor. Practice basic Hangul: 가, 나, 다, 라. Be patient and encouraging.',
      greeting: '안녕하세요! 한글을 배워요. 가, 나, 다, 라…',
      focusVocabularyIds: ['ko-u1-l4-v1', 'ko-u1-l4-v2', 'ko-u1-l4-v3', 'ko-u1-l4-v4'],
    },
  },

  // ===================== Korean · Unit 1 · Lesson 5 =====================
  {
    id: 'ko-u1-l5',
    unitId: 'ko-u1',
    languageId: 'ko',
    title: 'Colors',
    description: 'Name colors in Korean.',
    order: 5,
    xpReward: 10,
    goal: {
      summary: 'Name common colors in Korean.',
      objectives: ['Recognize four basic colors in Korean', 'Describe objects by color'],
    },
    activities: [
      {
        id: 'ko-u1-l5-a1',
        type: 'vocabulary',
        instruction: 'Learn these Korean colors.',
        items: [
          { id: 'ko-u1-l5-v1', word: '빨간', translation: 'Red', pronunciation: 'ppal-gan' },
          { id: 'ko-u1-l5-v2', word: '파란', translation: 'Blue', pronunciation: 'pa-ran' },
          { id: 'ko-u1-l5-v3', word: '초록', translation: 'Green', pronunciation: 'cho-rok' },
          { id: 'ko-u1-l5-v4', word: '노란', translation: 'Yellow', pronunciation: 'no-ran' },
        ],
      },
      {
        id: 'ko-u1-l5-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "파란" mean?',
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correctIndex: 1,
        explanation: '"파란" (Paran) is the Korean word for blue.',
      },
    ],
    aiTeacher: {
      persona: 'Jina, a warm Korean tutor from Seoul.',
      systemPrompt: 'You are Jina, a friendly Korean tutor. Practice colors: 빨간, 파란, 초록, 노란.',
      greeting: '안녕하세요! 하늘은 무슨 색이에요? Let\'s learn colors!',
      focusVocabularyIds: ['ko-u1-l5-v1', 'ko-u1-l5-v2', 'ko-u1-l5-v3', 'ko-u1-l5-v4'],
    },
  },

  // ===================== Korean · Unit 1 · Lesson 6 =====================
  {
    id: 'ko-u1-l6',
    unitId: 'ko-u1',
    languageId: 'ko',
    title: 'Family',
    description: 'Talk about your family in Korean.',
    order: 6,
    xpReward: 15,
    goal: {
      summary: 'Name family members in Korean.',
      objectives: ['Say mother, father, sibling in Korean', 'Talk about your family'],
    },
    activities: [
      {
        id: 'ko-u1-l6-a1',
        type: 'vocabulary',
        instruction: 'Learn these Korean family words.',
        items: [
          { id: 'ko-u1-l6-v1', word: '어머니', translation: 'Mother', pronunciation: 'eo-MEO-ni' },
          { id: 'ko-u1-l6-v2', word: '아버지', translation: 'Father', pronunciation: 'ah-BEO-ji' },
          { id: 'ko-u1-l6-v3', word: '형', translation: 'Older brother (male speaker)', pronunciation: 'hyeong' },
          { id: 'ko-u1-l6-v4', word: '동생', translation: 'Younger sibling', pronunciation: 'dong-saeng' },
        ],
      },
      {
        id: 'ko-u1-l6-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "어머니" mean?',
        options: ['Father', 'Mother', 'Sibling', 'Brother'],
        correctIndex: 1,
        explanation: '"어머니" (Eomeoni) is the formal Korean word for mother.',
      },
    ],
    aiTeacher: {
      persona: 'Jina, a warm Korean tutor from Seoul.',
      systemPrompt: 'You are Jina, a friendly Korean tutor. Practice family words: 어머니, 아버지, 형, 동생.',
      greeting: '안녕하세요! 가족에 대해 이야기해요. 형제가 있어요?',
      focusVocabularyIds: ['ko-u1-l6-v1', 'ko-u1-l6-v2', 'ko-u1-l6-v3', 'ko-u1-l6-v4'],
    },
  },

  // ===================== Chinese · Unit 1 · Lesson 1 =====================
  {
    id: 'zh-u1-l1',
    unitId: 'zh-u1',
    languageId: 'zh',
    title: 'Greetings',
    description: 'Your first words in Mandarin Chinese.',
    order: 1,
    xpReward: 10,
    goal: {
      summary: 'Greet someone politely in Mandarin.',
      objectives: ['Recognize "Nǐ hǎo" and "Xièxie"', 'Use a greeting for the time of day'],
    },
    activities: [
      {
        id: 'zh-u1-l1-a1',
        type: 'vocabulary',
        instruction: 'Learn these Mandarin greetings.',
        items: [
          { id: 'zh-u1-l1-v1', word: '你好', translation: 'Hello', pronunciation: 'nǐ hǎo' },
          { id: 'zh-u1-l1-v2', word: '谢谢', translation: 'Thank you', pronunciation: 'xiè xie' },
          { id: 'zh-u1-l1-v3', word: '早上好', translation: 'Good morning', pronunciation: 'zǎo shang hǎo' },
          { id: 'zh-u1-l1-v4', word: '再见', translation: 'Goodbye', pronunciation: 'zài jiàn' },
        ],
      },
      {
        id: 'zh-u1-l1-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "谢谢" mean?',
        options: ['Hello', 'Goodbye', 'Thank you', 'Good morning'],
        correctIndex: 2,
        explanation: '"谢谢" (Xièxie) means "thank you" in Mandarin.',
      },
    ],
    aiTeacher: {
      persona: 'Wei, a patient Mandarin tutor from Beijing.',
      systemPrompt: 'You are Wei, a friendly Mandarin tutor for beginners. Stay on greetings: 你好, 谢谢, 早上好, 再见. Keep replies short and encouraging.',
      greeting: '你好！我叫Wei。Let\'s learn Mandarin together!',
      focusVocabularyIds: ['zh-u1-l1-v1', 'zh-u1-l1-v2', 'zh-u1-l1-v3', 'zh-u1-l1-v4'],
    },
  },

  // ===================== Chinese · Unit 1 · Lesson 2 =====================
  {
    id: 'zh-u1-l2',
    unitId: 'zh-u1',
    languageId: 'zh',
    title: 'Introduce Yourself',
    description: 'Share your name in Mandarin.',
    order: 2,
    xpReward: 10,
    goal: {
      summary: 'Say your name and greet someone in Mandarin.',
      objectives: ['Use "Wǒ jiào…" to say your name', 'Say "Hěn gāoxìng rènshi nǐ"'],
    },
    activities: [
      {
        id: 'zh-u1-l2-a1',
        type: 'vocabulary',
        instruction: 'Learn these Mandarin introduction words.',
        items: [
          { id: 'zh-u1-l2-v1', word: '我叫', translation: 'My name is', pronunciation: 'wǒ jiào' },
          { id: 'zh-u1-l2-v2', word: '很高兴认识你', translation: 'Nice to meet you', pronunciation: 'hěn gāo xìng rèn shi nǐ' },
          { id: 'zh-u1-l2-v3', word: '你好吗?', translation: 'How are you?', pronunciation: 'nǐ hǎo ma' },
          { id: 'zh-u1-l2-v4', word: '名字', translation: 'Name', pronunciation: 'míng zi' },
        ],
      },
      {
        id: 'zh-u1-l2-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "我叫" mean?',
        options: ['How are you?', 'Nice to meet you', 'My name is', 'Goodbye'],
        correctIndex: 2,
        explanation: '"我叫" (Wǒ jiào) means "my name is" in Mandarin.',
      },
    ],
    aiTeacher: {
      persona: 'Wei, a patient Mandarin tutor from Beijing.',
      systemPrompt: 'You are Wei, a friendly Mandarin tutor. Focus on introductions: 我叫, 很高兴认识你, 你好吗.',
      greeting: '你好！很高兴认识你！你叫什么名字?',
      focusVocabularyIds: ['zh-u1-l2-v1', 'zh-u1-l2-v2', 'zh-u1-l2-v3', 'zh-u1-l2-v4'],
    },
  },

  // ===================== Chinese · Unit 1 · Lesson 3 =====================
  {
    id: 'zh-u1-l3',
    unitId: 'zh-u1',
    languageId: 'zh',
    title: 'Numbers',
    description: 'Count from one to ten in Mandarin.',
    order: 3,
    xpReward: 10,
    goal: {
      summary: 'Count from one to ten in Mandarin.',
      objectives: ['Say numbers 1–10 in Mandarin', 'Use numbers in simple phrases'],
    },
    activities: [
      {
        id: 'zh-u1-l3-a1',
        type: 'vocabulary',
        instruction: 'Learn these Mandarin numbers.',
        items: [
          { id: 'zh-u1-l3-v1', word: '一', translation: 'One', pronunciation: 'yī' },
          { id: 'zh-u1-l3-v2', word: '二', translation: 'Two', pronunciation: 'èr' },
          { id: 'zh-u1-l3-v3', word: '五', translation: 'Five', pronunciation: 'wǔ' },
          { id: 'zh-u1-l3-v4', word: '十', translation: 'Ten', pronunciation: 'shí' },
        ],
      },
      {
        id: 'zh-u1-l3-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "五" mean?',
        options: ['One', 'Two', 'Five', 'Ten'],
        correctIndex: 2,
        explanation: '"五" (Wǔ) is the Mandarin word for five.',
      },
    ],
    aiTeacher: {
      persona: 'Wei, a patient Mandarin tutor from Beijing.',
      systemPrompt: 'You are Wei, a friendly Mandarin tutor. Practice counting: 一, 二, 三, 四, 五…',
      greeting: '你好！我们来数数吧。一, 二, 三…',
      focusVocabularyIds: ['zh-u1-l3-v1', 'zh-u1-l3-v2', 'zh-u1-l3-v3', 'zh-u1-l3-v4'],
    },
  },

  // ===================== Chinese · Unit 1 · Lesson 4 =====================
  {
    id: 'zh-u1-l4',
    unitId: 'zh-u1',
    languageId: 'zh',
    title: 'Tones',
    description: 'Understand the four tones of Mandarin.',
    order: 4,
    xpReward: 15,
    goal: {
      summary: 'Recognize the four Mandarin tones.',
      objectives: ['Identify the four tone marks', 'Hear the difference between tones'],
    },
    activities: [
      {
        id: 'zh-u1-l4-a1',
        type: 'vocabulary',
        instruction: 'Learn the four Mandarin tones using "ma".',
        items: [
          { id: 'zh-u1-l4-v1', word: 'mā (妈)', translation: '1st tone – high flat – Mother', pronunciation: 'maaah (steady high)' },
          { id: 'zh-u1-l4-v2', word: 'má (麻)', translation: '2nd tone – rising – Hemp', pronunciation: 'máh (rising)' },
          { id: 'zh-u1-l4-v3', word: 'mǎ (马)', translation: '3rd tone – dip-rise – Horse', pronunciation: 'mǎh (dip then rise)' },
          { id: 'zh-u1-l4-v4', word: 'mà (骂)', translation: '4th tone – falling – Scold', pronunciation: 'màh (sharp fall)' },
        ],
      },
      {
        id: 'zh-u1-l4-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct tone description.',
        question: 'The 2nd tone in Mandarin is:',
        options: ['High and flat', 'Rising', 'Dip then rise', 'Falling sharply'],
        correctIndex: 1,
        explanation: 'The 2nd tone (rising tone) goes up like a question in English.',
      },
    ],
    aiTeacher: {
      persona: 'Wei, a patient Mandarin tutor from Beijing.',
      systemPrompt: 'You are Wei, a friendly Mandarin tutor. Teach the four tones using "ma": mā, má, mǎ, mà. Be patient and fun.',
      greeting: '你好！声调很重要。Listen carefully to the four tones!',
      focusVocabularyIds: ['zh-u1-l4-v1', 'zh-u1-l4-v2', 'zh-u1-l4-v3', 'zh-u1-l4-v4'],
    },
  },

  // ===================== Chinese · Unit 1 · Lesson 5 =====================
  {
    id: 'zh-u1-l5',
    unitId: 'zh-u1',
    languageId: 'zh',
    title: 'Colors',
    description: 'Name colors in Mandarin Chinese.',
    order: 5,
    xpReward: 10,
    goal: {
      summary: 'Name common colors in Mandarin.',
      objectives: ['Recognize four basic colors in Mandarin', 'Describe objects by color'],
    },
    activities: [
      {
        id: 'zh-u1-l5-a1',
        type: 'vocabulary',
        instruction: 'Learn these Mandarin colors.',
        items: [
          { id: 'zh-u1-l5-v1', word: '红色', translation: 'Red', pronunciation: 'hóng sè' },
          { id: 'zh-u1-l5-v2', word: '蓝色', translation: 'Blue', pronunciation: 'lán sè' },
          { id: 'zh-u1-l5-v3', word: '绿色', translation: 'Green', pronunciation: 'lǜ sè' },
          { id: 'zh-u1-l5-v4', word: '黄色', translation: 'Yellow', pronunciation: 'huáng sè' },
        ],
      },
      {
        id: 'zh-u1-l5-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "红色" mean?',
        options: ['Blue', 'Green', 'Red', 'Yellow'],
        correctIndex: 2,
        explanation: '"红色" (Hóng sè) is the Mandarin word for red.',
      },
    ],
    aiTeacher: {
      persona: 'Wei, a patient Mandarin tutor from Beijing.',
      systemPrompt: 'You are Wei, a friendly Mandarin tutor. Practice colors: 红色, 蓝色, 绿色, 黄色.',
      greeting: '你好！天空是什么颜色? Let\'s talk about colors!',
      focusVocabularyIds: ['zh-u1-l5-v1', 'zh-u1-l5-v2', 'zh-u1-l5-v3', 'zh-u1-l5-v4'],
    },
  },

  // ===================== Chinese · Unit 1 · Lesson 6 =====================
  {
    id: 'zh-u1-l6',
    unitId: 'zh-u1',
    languageId: 'zh',
    title: 'Family',
    description: 'Talk about your family in Mandarin.',
    order: 6,
    xpReward: 15,
    goal: {
      summary: 'Name family members in Mandarin.',
      objectives: ['Say mother, father, sibling in Mandarin', 'Talk about your family'],
    },
    activities: [
      {
        id: 'zh-u1-l6-a1',
        type: 'vocabulary',
        instruction: 'Learn these Mandarin family words.',
        items: [
          { id: 'zh-u1-l6-v1', word: '妈妈', translation: 'Mother', pronunciation: 'māma' },
          { id: 'zh-u1-l6-v2', word: '爸爸', translation: 'Father', pronunciation: 'bàba' },
          { id: 'zh-u1-l6-v3', word: '哥哥', translation: 'Older brother', pronunciation: 'gēge' },
          { id: 'zh-u1-l6-v4', word: '妹妹', translation: 'Younger sister', pronunciation: 'mèimei' },
        ],
      },
      {
        id: 'zh-u1-l6-a2',
        type: 'multipleChoice',
        instruction: 'Choose the correct translation.',
        question: 'What does "妈妈" mean?',
        options: ['Father', 'Mother', 'Sister', 'Brother'],
        correctIndex: 1,
        explanation: '"妈妈" (Māma) is the Mandarin word for mother.',
      },
    ],
    aiTeacher: {
      persona: 'Wei, a patient Mandarin tutor from Beijing.',
      systemPrompt: 'You are Wei, a friendly Mandarin tutor. Practice family words: 妈妈, 爸爸, 哥哥, 妹妹.',
      greeting: '你好！我们来聊聊家人吧。你有兄弟姐妹吗?',
      focusVocabularyIds: ['zh-u1-l6-v1', 'zh-u1-l6-v2', 'zh-u1-l6-v3', 'zh-u1-l6-v4'],
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
