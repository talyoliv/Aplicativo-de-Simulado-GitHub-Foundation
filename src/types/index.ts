
export interface QuestionOption {
  id: string; // e.g., 'a', 'b', 'c', 'd'
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation?: string;
}

export interface UserAnswer {
  questionId: number;
  selectedOptionId: string;
  isCorrect: boolean;
}

export interface SimulationResult {
  id: string; // Unique ID for the result, e.g., timestamp
  date: string; // ISO string for date
  total: number;
  corretas: number;
  incorretas: number;
  percentage: number;
  tempo: number; // in seconds
}
