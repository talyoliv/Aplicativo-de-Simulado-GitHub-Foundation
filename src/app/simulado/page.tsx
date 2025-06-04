import { Suspense } from 'react';
import QuizClient from '@/components/quiz/QuizClient';
import type { Question } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SimuladoPageProps {
  searchParams: {
    numQuestoes?: string;
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

// Função para buscar perguntas do JSON remoto no GitHub
async function fetchQuestions(num: number): Promise<Question[]> {
  const res = await fetch(
    'https://raw.githubusercontent.com/talyoliv/github-foundation-questions-api/main/github_foundations_questions_pt_br.json',
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Falha ao buscar questões da API');
  }

  const allQuestions: Question[] = await res.json();

  const shuffled = allQuestions.sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

export default async function SimuladoPage({ searchParams }: SimuladoPageProps) {
  const numQuestoesParam = searchParams.numQuestoes;
  const numQuestoes = parseInt(numQuestoesParam || '20', 10);

  if (isNaN(numQuestoes) || numQuestoes <= 0 || ![5, 10, 20, 30, 40, 50].includes(numQuestoes)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <h1 className="text-2xl font-bold text-destructive">Erro</h1>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Número de questões inválido. Por favor, selecione um valor válido na página inicial.</p>
            <Button asChild>
              <Link href="/">Voltar ao Início</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  let questions: Question[] = [];

  try {
    questions = await fetchQuestions(numQuestoes);
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <h1 className="text-2xl font-bold text-destructive">Erro</h1>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Não foi possível carregar as questões. Tente novamente mais tarde.</p>
            <Button asChild>
              <Link href="/">Voltar ao Início</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0 && numQuestoes > 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <h1 className="text-2xl font-bold text-destructive">Erro</h1>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Não foi possível carregar as questões para o número selecionado. Tente novamente ou escolha um número diferente.</p>
            <Button asChild>
              <Link href="/">Voltar ao Início</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-8">
      <Suspense fallback={<QuizLoadingSkeleton />}>
        <QuizClient questions={questions} initialNumQuestions={numQuestoes} />
      </Suspense>
    </main>
  );
}

export const dynamic = 'force-dynamic';
