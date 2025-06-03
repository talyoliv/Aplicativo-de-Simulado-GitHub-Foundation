
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, UserAnswer } from '@/types';
import QuestionDisplay from './QuestionDisplay';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface QuizClientProps {
  questions: Question[];
  initialNumQuestions: number;
}

export default function QuizClient({ questions: initialQuestions, initialNumQuestions }: QuizClientProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);


  useEffect(() => {
    setQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setUserAnswers([]);
    setShowFeedback(false);
    setStartTime(Date.now());
  }, [initialQuestions]);


  const handleOptionSelect = useCallback((optionId: string) => {
    if (!showFeedback) {
      setSelectedOptionId(optionId);
    }
  }, [showFeedback]);

  const handleSubmitAnswer = useCallback(() => {
    if (!selectedOptionId) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOptionId === currentQuestion.correctAnswerId;
    
    setUserAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOptionId,
      isCorrect: isCorrect,
    }]);
    setShowFeedback(true);
  }, [selectedOptionId, questions, currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    setShowFeedback(false);
    setSelectedOptionId(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of quiz
      const correctAnswers = userAnswers.filter(ans => ans.isCorrect).length;
      const incorrectAnswers = userAnswers.length - correctAnswers;
      const endTime = Date.now();
      const timeTaken = startTime ? Math.round((endTime - startTime) / 1000) : 0; // in seconds

      router.push(`/simulado/resultado?total=${questions.length}&corretas=${correctAnswers}&incorretas=${incorrectAnswers}&tempo=${timeTaken}`);
    }
  }, [currentQuestionIndex, questions.length, userAnswers, router, startTime]);

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
    // This can happen if questions are still loading or an error occurred.
    // Or if navigation tried to go beyond the last question without redirecting.
    // A more robust loading/error state could be added here.
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg">Carregando questões ou simulado finalizado...</p>
         <Button onClick={() => router.push('/')} variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Início
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + (showFeedback ? 1:0)) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-center font-headline">Simulado GitHub Foundations</h1>
        <Progress value={progressPercentage} className="w-full h-3 bg-primary/20 [&>div]:bg-accent" />
      </div>
      
      <QuestionDisplay
        key={currentQuestion.id} // Added key here
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedOptionId={selectedOptionId}
        onOptionSelect={handleOptionSelect}
        onSubmitAnswer={handleSubmitAnswer}
        onNextQuestion={handleNextQuestion}
        showFeedback={showFeedback}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
      />

      <div className="text-center mt-6">
        <Button onClick={() => router.push('/')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Abandonar Simulado
        </Button>
      </div>
    </div>
  );
}
