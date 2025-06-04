
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, BarChart3, Clock, History } from 'lucide-react';
import { Suspense } from 'react';

interface ResultadoPageProps {
  searchParams: {
    total?: string;
    corretas?: string;
    incorretas?: string;
    tempo?: string;
  };
}

function ResultsContent({ searchParams }: ResultadoPageProps) {
  const total = parseInt(searchParams.total || '0', 10);
  const corretas = parseInt(searchParams.corretas || '0', 10);
  const incorretas = parseInt(searchParams.incorretas || '0', 10);
  const tempo = parseInt(searchParams.tempo || '0', 10); // tempo em segundos

  if (total === 0 || isNaN(total) || isNaN(corretas) || isNaN(incorretas)) {
    return (
      <div className="text-center">
        <p className="text-destructive text-lg mb-4">Erro ao carregar resultados. Dados inválidos.</p>
        <Button asChild>
          <Link href="/">Voltar ao Início</Link>
        </Button>
      </div>
    );
  }
  
  const percentage = total > 0 ? Math.round((corretas / total) * 100) : 0;
  const minutes = Math.floor(tempo / 60);
  const seconds = tempo % 60;

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            <BarChart3 className="w-16 h-16 text-primary" />
        </div>
        <CardTitle className="text-3xl font-headline">Resultado Final</CardTitle>
        <CardDescription>Confira seu desempenho no simulado.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
          <div className="p-4 bg-card-foreground/5 rounded-md flex items-center space-x-3">
            <CheckCircle2 className="h-7 w-7 text-green-500" />
            <div>
              <p className="font-semibold">{corretas}</p>
              <p className="text-sm text-muted-foreground">Respostas Corretas</p>
            </div>
          </div>
          <div className="p-4 bg-card-foreground/5 rounded-md flex items-center space-x-3">
            <XCircle className="h-7 w-7 text-red-500" />
            <div>
              <p className="font-semibold">{incorretas}</p>
              <p className="text-sm text-muted-foreground">Respostas Incorretas</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-card-foreground/5 rounded-md text-center">
            <p className="text-4xl font-bold text-primary">{percentage}%</p>
            <p className="text-sm text-muted-foreground">de Acerto ({corretas} de {total} questões)</p>
        </div>

        {tempo > 0 && (
          <div className="p-4 bg-card-foreground/5 rounded-md flex items-center justify-center space-x-2">
            <Clock className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Tempo total: {minutes > 0 ? `${minutes} min ` : ''}{seconds} seg
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/">Fazer Novo Simulado</Link>
        </Button>
        <Button variant="outline" asChild className="w-full sm:w-auto">
          <Link href="/historico">
            <History className="mr-2 h-5 w-5" />
            Ver Histórico
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


export default function ResultadoPage({ searchParams }: ResultadoPageProps) {
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <Suspense fallback={<div className="text-center text-lg">Carregando resultados...</div>}>
        <ResultsContent searchParams={searchParams} />
      </Suspense>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} GitHub Foundations PT-BR Prep. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}

export const dynamic = 'force-dynamic';
