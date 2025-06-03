'use client';

import type { Question, QuestionOption as QuestionOptionType } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOptionId: string | null;
  onOptionSelect: (optionId: string) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  showFeedback: boolean;
  isLastQuestion: boolean;
}

export default function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  selectedOptionId,
  onOptionSelect,
  onSubmitAnswer,
  onNextQuestion,
  showFeedback,
  isLastQuestion,
}: QuestionDisplayProps) {
  
  const getOptionClasses = (optionId: string) => {
    if (!showFeedback) return 'hover:bg-muted/50';
    if (optionId === question.correctAnswerId) return 'bg-green-500/20 border-green-500 text-green-300';
    if (optionId === selectedOptionId && optionId !== question.correctAnswerId) return 'bg-red-500/20 border-red-500 text-red-300';
    return 'opacity-70';
  };

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardDescription className="text-sm text-muted-foreground">
          Questão {questionNumber} de {totalQuestions}
        </CardDescription>
        <CardTitle className="text-xl md:text-2xl font-medium leading-relaxed">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedOptionId ?? undefined}
          onValueChange={onOptionSelect}
          disabled={showFeedback}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <Label
              key={option.id}
              htmlFor={option.id}
              className={cn(
                "flex items-center space-x-3 p-4 border rounded-md cursor-pointer transition-all duration-150",
                getOptionClasses(option.id),
                selectedOptionId === option.id && !showFeedback ? "border-primary ring-2 ring-primary" : ""
              )}
            >
              <RadioGroupItem value={option.id} id={option.id} className="shrink-0" />
              <span className="text-base">{option.text}</span>
              {showFeedback && option.id === question.correctAnswerId && <CheckCircle2 className="ml-auto h-5 w-5 text-green-500" />}
              {showFeedback && option.id === selectedOptionId && option.id !== question.correctAnswerId && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
            </Label>
          ))}
        </RadioGroup>

        {showFeedback && question.explanation && (
          <div className="mt-6 p-4 bg-card-foreground/5 rounded-md border border-dashed">
            <h4 className="font-semibold text-primary mb-1">Explicação:</h4>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!showFeedback ? (
          <Button onClick={onSubmitAnswer} disabled={!selectedOptionId} className="w-full sm:w-auto">
            Verificar Resposta
          </Button>
        ) : (
          <Button onClick={onNextQuestion} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLastQuestion ? 'Ver Resultado' : 'Próxima Questão'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
