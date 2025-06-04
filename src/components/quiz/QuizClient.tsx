
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Question, UserAnswer, SimulationResult } from '@/types';
import QuestionDisplay from './QuestionDisplay';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface QuizClientProps {
  questions: Question[];
  initialNumQuestions: number;
  isReviewMode?: boolean;
}

export default function QuizClient({ questions: initialQuestions, initialNumQuestions, isReviewMode = false }: QuizClientProps) {
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

    if (isReviewMode && isCorrect) {
      try {
        const storedErroHistoricosString = localStorage.getItem('erroHistoricos');
        let erroHistoricos: number[] = storedErroHistoricosString ? JSON.parse(storedErroHistoricosString) : [];
        erroHistoricos = erroHistoricos.filter(id => id !== currentQuestion.id);
        localStorage.setItem('erroHistoricos', JSON.stringify(erroHistoricos));
      } catch (error) {
        console.error("Failed to update erroHistoricos during review:", error);
      }
    }
    setShowFeedback(true);
  }, [selectedOptionId, questions, currentQuestionIndex, isReviewMode]);

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
      
      if (!isReviewMode) {
        const percentage = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;
        const result: SimulationResult = {
          id: new Date().toISOString(),
          date: new Date().toISOString(),
          total: questions.length,
          corretas: correctAnswers,
          incorretas: incorrectAnswers,
          percentage: percentage,
          tempo: timeTaken,
        };

        try {
          const historyString = localStorage.getItem('simulationHistory');
          const history: SimulationResult[] = historyString ? JSON.parse(historyString) : [];
          history.unshift(result); 
          localStorage.setItem('simulationHistory', JSON.stringify(history.slice(0, 50))); 
        } catch (error) {
          console.error("Failed to save simulation history:", error);
        }

        const incorrectIdsInThisSession: number[] = userAnswers
          .filter(ua => !ua.isCorrect)
          .map(ua => ua.questionId);

        if (incorrectIdsInThisSession.length > 0) {
          try {
            const storedErroHistoricosString = localStorage.getItem('erroHistoricos');
            const existingErroHistoricos: number[] = storedErroHistoricosString ? JSON.parse(storedErroHistoricosString) : [];
            const updatedErroHistoricos = Array.from(new Set([...existingErroHistoricos, ...incorrectIdsInThisSession]));
            localStorage.setItem('erroHistoricos', JSON.stringify(updatedErroHistoricos));
          } catch (error) {
            console.error("Failed to save erroHistoricos:", error);
          }
        }
      }
      router.push(`/simulado/resultado?total=${questions.length}&corretas=${correctAnswers}&incorretas=${incorrectAnswers}&tempo=${timeTaken}${isReviewMode ? '&review=true':''}`);
    }
  }, [currentQuestionIndex, questions, userAnswers, router, startTime, isReviewMode]);

  if (questions.length === 0 || currentQuestionIndex >= questions.length) {
     // If it's review mode and questions ran out, it means all review questions were answered.
     if (isReviewMode && questions.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-lg mb-4">Parabéns! Você revisou todas as questões que errou anteriormente.</p>
            <Button onClick={() => router.push('/')} variant="outline" className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Início
            </Button>
          </div>
        );
     }
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
        <h1 className="text-2xl sm:text-3xl font-bold text-center font-headline">
          {isReviewMode ? "Revisão Inteligente" : "Simulado GitHub Foundations"}
        </h1>
        <Progress value={progressPercentage} className="w-full h-3 bg-primary/20 [&>div]:bg-accent" />
      </div>
      
      <QuestionDisplay
        key={currentQuestion.id} // Essential for resetting component state on new question
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
            <ArrowLeft className="mr-2 h-4 w-4" /> {isReviewMode ? "Parar Revisão" : "Abandonar Simulado"}
        </Button>
      </div>
    </div>
  );
}
