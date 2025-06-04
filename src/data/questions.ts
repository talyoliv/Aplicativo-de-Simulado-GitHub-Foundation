
import type { Question } from '@/types';
import allQuestionsData from './github_foundations_questions_pt_br.json';

// Type assertion if needed, or ensure your JSON matches the Question[] type.
// For simplicity, we assume the JSON is correctly structured.
const allQuestions: Question[] = allQuestionsData as Question[];

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getShuffledQuestions(count: number): Question[] {
  if (!allQuestions || allQuestions.length === 0) {
    console.error("No questions loaded from JSON data.");
    return [];
  }
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getQuestionsByIds(ids: number[]): Question[] {
  if (!allQuestions || allQuestions.length === 0) {
    console.error("No questions loaded from JSON data.");
    return [];
  }
  if (!ids || ids.length === 0) {
    return [];
  }
  const selectedQuestions = allQuestions.filter(question => ids.includes(question.id));
  // We might want to shuffle the review questions as well so they don't always appear in the same order
  return shuffleArray(selectedQuestions);
}
    
