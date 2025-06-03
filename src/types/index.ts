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
