export interface User {
  name: string;
  phone: string;
}

export interface Activity {
  id: number;
  time: string;
  title: string;
  type: 'meal' | 'visit' | 'activity';
  completed: boolean;
}

export interface Memory {
  id: number;
  user: string;
  comment: string;
  likes: number;
  timestamp: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface UserAnswer {
  question: number;
  selected: number | null;
  correct: number;
  isCorrect: boolean;
}
