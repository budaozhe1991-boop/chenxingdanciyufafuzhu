import { Question, Difficulty, GrammarPoint } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    sentence: "____ tired, she still finished the report.",
    options: [
      { id: "a", text: "Being" },
      { id: "b", text: "Been" },
      { id: "c", text: "Be" },
      { id: "d", text: "To be" }
    ],
    correctOptionId: "a",
    difficulty: Difficulty.SENIOR,
    category: GrammarPoint.NON_FINITE,
    explanation: {
      correctAnswer: "Being",
      rule: "现在分词作状语，表示原因或伴随状态。主语 she 与 be 之间是主动关系。",
      example: "Being a student, I should study hard. (作为一名学生，我应该努力学习。)",
      commonMistake: "误用 Been 或 To be。Been 不能单独作状语，To be 表示目的。"
    }
  },
  {
    id: 2,
    sentence: "The book ____ you lent me is very interesting.",
    options: [
      { id: "a", text: "who" },
      { id: "b", text: "which" },
      { id: "c", text: "where" },
      { id: "d", text: "what" }
    ],
    correctOptionId: "b",
    difficulty: Difficulty.MIDDLE,
    category: GrammarPoint.RELATIVE_CLAUSE,
    explanation: {
      correctAnswer: "which",
      rule: "定语从句引导词。先行词是 'The book' (物)，在从句中作宾语，用 which 或 that。",
      example: "This is the pen which I lost yesterday.",
      commonMistake: "误用 who (指人) 或 what (不能引导定语从句)。"
    }
  },
  {
    id: 3,
    sentence: "I will go to the park ____ it doesn't rain tomorrow.",
    options: [
      { id: "a", text: "unless" },
      { id: "b", text: "if" },
      { id: "c", text: "although" },
      { id: "d", text: "because" }
    ],
    correctOptionId: "b",
    difficulty: Difficulty.JUNIOR,
    category: GrammarPoint.ADVERBIAL_CLAUSE,
    explanation: {
      correctAnswer: "if",
      rule: "条件状语从句。if 表示'如果'，引导真实的条件。",
      example: "If you are free, let's go shopping.",
      commonMistake: "误用 unless (除非)，unless it rains = if it doesn't rain。"
    }
  },
  {
    id: 4,
    sentence: "He is the boy ____ won the first prize.",
    options: [
      { id: "a", text: "which" },
      { id: "b", text: "who" },
      { id: "c", text: "whose" },
      { id: "d", text: "whom" }
    ],
    correctOptionId: "b",
    difficulty: Difficulty.JUNIOR,
    category: GrammarPoint.RELATIVE_CLAUSE,
    explanation: {
      correctAnswer: "who",
      rule: "定语从句引导词。先行词是 'the boy' (人)，在从句中作主语，用 who。",
      example: "The girl who is dancing is my sister.",
      commonMistake: "误用 which (指物)。"
    }
  },
  {
    id: 5,
    sentence: "____ you study hard, you will pass the exam.",
    options: [
      { id: "a", text: "As long as" },
      { id: "b", text: "Even if" },
      { id: "c", text: "Until" },
      { id: "d", text: "Before" }
    ],
    correctOptionId: "a",
    difficulty: Difficulty.MIDDLE,
    category: GrammarPoint.CONJUNCTION,
    explanation: {
      correctAnswer: "As long as",
      rule: "条件连词，意为'只要'。",
      example: "As long as you don't give up, you will succeed.",
      commonMistake: "误用 Even if (即使)。"
    }
  },
  {
    id: 6,
    sentence: "I don't know ____ he will come or not.",
    options: [
      { id: "a", text: "if" },
      { id: "b", text: "whether" },
      { id: "c", text: "that" },
      { id: "d", text: "when" }
    ],
    correctOptionId: "b",
    difficulty: Difficulty.MIDDLE,
    category: GrammarPoint.CONJUNCTION,
    explanation: {
      correctAnswer: "whether",
      rule: "宾语从句中，与 'or not' 连用时通常用 whether。",
      example: "I wonder whether it will snow tomorrow.",
      commonMistake: "虽然 if 也可以引导宾语从句，但与 or not 直接连用时首选 whether。"
    }
  },
  {
    id: 7,
    sentence: "Look! The children are ____ football on the playground.",
    options: [
      { id: "a", text: "play" },
      { id: "b", text: "plays" },
      { id: "c", text: "playing" },
      { id: "d", text: "played" }
    ],
    correctOptionId: "c",
    difficulty: Difficulty.JUNIOR,
    category: GrammarPoint.NON_FINITE,
    explanation: {
      correctAnswer: "playing",
      rule: "现在进行时结构：be + doing。表示正在发生的动作。",
      example: "They are reading books now.",
      commonMistake: "误用动词原形 play。"
    }
  },
  {
    id: 8,
    sentence: "This is the house ____ I was born.",
    options: [
      { id: "a", text: "which" },
      { id: "b", text: "that" },
      { id: "c", text: "where" },
      { id: "d", text: "when" }
    ],
    correctOptionId: "c",
    difficulty: Difficulty.MIDDLE,
    category: GrammarPoint.RELATIVE_CLAUSE,
    explanation: {
      correctAnswer: "where",
      rule: "定语从句关系副词。先行词是 'the house' (地点)，在从句中作地点状语。",
      example: "The school where I study is very big.",
      commonMistake: "误用 which。如果从句中缺少主语或宾语才用 which，这里 'I was born' 结构完整，需要状语。"
    }
  }
];
