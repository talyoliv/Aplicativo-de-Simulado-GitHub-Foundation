import { Suspense } from 'react';
import QuizClient from '@/components/quiz/QuizClient';
import { getShuffledQuestions, getQuestionsByIds } from '@/data/questions';
import type { Question } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

interface SimuladoPageProps {
  searchParams: {
    numQuestoes?: string;
    reviewIds?: string;
  };
}

function QuizLoadingSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/4 mx-auto" />
        <Skeleton className="h-3 w-full" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-10 w-full" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center space-x-3 p-4 border rounded-md">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 flex-1" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Skeleton className="h-12 w-40 mx-auto" />
    </div>
  );
}

function ErrorDisplay({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-3">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">{message}</p>
          <Button asChild className="w-full">
            <Link href="/">Voltar ao Início</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SimuladoPage({ searchParams }: SimuladoPageProps) {
  const { numQuestoes: numQuestoesParam, reviewIds: reviewIdsParam } = searchParams;
  let questions: Question[] = [];
  let isReviewMode = false;
  let initialQuestionCount = 0;

  if (reviewIdsParam) {
    isReviewMode = true;
    const ids = reviewIdsParam.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
    if (ids.length === 0 && reviewIdsParam.length > 0) {
      return <ErrorDisplay title="Erro na Revisão" message="Nenhuma questão válida encontrada para revisão. Verifique se selecionou questões ou tente novamente." />;
    }
    questions = getQuestionsByIds(ids);
    if (questions.length === 0 && ids.length > 0) {
      return <ErrorDisplay title="Erro na Revisão" message="As questões selecionadas para revisão não foram encontradas. Tente limpar seu histórico de erros ou volte ao início." />;
    }
    if (questions.length === 0 && ids.length === 0 && reviewIdsParam === "") {
      return <ErrorDisplay title="Revisão Vazia" message="Não há questões para revisar no momento. Continue praticando!" />;
    }
    initialQuestionCount = questions.length;
  } else {
    const numQuestoes = parseInt(numQuestoesParam || '20', 10);
    if (isNaN(numQuestoes) || numQuestoes <= 0 || ![5, 10, 20, 30, 40, 50].includes(numQuestoes)) {
      return <ErrorDisplay title="Erro" message="Número de questões inválido. Por favor, selecione um valor válido na página inicial." />;
    }
    questions = getShuffledQuestions(numQuestoes);
    initialQuestionCount = numQuestoes;

    if (questions.length === 0 && numQuestoes > 0) {
      return <ErrorDisplay title="Erro" message="Não foi possível carregar as questões para o número selecionado. Tente novamente ou escolha um número diferente." />;
    }
  }

  if (isReviewMode && questions.length === 0) {
    return <ErrorDisplay title="Revisão Concluída" message="Você não tem mais questões erradas para revisar no momento. Parabéns!" />;
  }

  if (questions.length === 0 && initialQuestionCount > 0 && !isReviewMode) {
    return <ErrorDisplay title="Nenhuma Questão Encontrada" message="Não foi possível carregar as questões. Por favor, tente novamente." />;
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-8">
      <Suspense fallback={<QuizLoadingSkeleton />}>
        <QuizClient 
          questions={questions} 
          initialNumQuestions={initialQuestionCount} 
          isReviewMode={isReviewMode} 
        />
      </Suspense>
    </main>
  );
}

export const dynamic = 'force-dynamic';

