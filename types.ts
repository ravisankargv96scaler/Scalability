export enum Tab {
  CONCEPT = 'CONCEPT',
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
  DATABASE = 'DATABASE',
  COMPARISON = 'COMPARISON',
  QUIZ = 'QUIZ'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ServerStats {
  id: number;
  load: number;
  capacity: number;
  status: 'active' | 'overloaded' | 'crashed';
}
