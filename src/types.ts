export enum Difficulty {
  JUNIOR = "初级",
  MIDDLE = "中级",
  SENIOR = "高级",
}

export enum GrammarPoint {
  NON_FINITE = "非谓语动词",
  RELATIVE_CLAUSE = "定语从句",
  ADVERBIAL_CLAUSE = "状语从句",
  CONJUNCTION = "连词",
  PREPOSITION = "介词",
  PRONOUN = "代词",
}

export interface Option {
  id: string;
  text: string;
}

export interface Explanation {
  correctAnswer: string;
  rule: string;
  example: string;
  commonMistake: string;
}

export interface Question {
  id: number;
  sentence: string; // Use "____" as placeholder
  options: Option[];
  correctOptionId: string;
  difficulty: Difficulty;
  category: GrammarPoint;
  explanation: Explanation;
}

export interface UserAnswer {
  questionId: number;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
}
