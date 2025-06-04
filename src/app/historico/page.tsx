
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BarChart3, CalendarDays, CheckCircle2, Clock, ListChecks, XCircle } from 'lucide-react';
import type { SimulationResult } from '@/types';

export default function HistoricoPage() {
  const [history, setHistory] = useState<SimulationResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('simulationHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load simulation history from localStorage:", error);
      // Optionally, show an error message to the user
    }
    setIsLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes > 0) {
      return `${minutes} min ${seconds} seg`;
    }
    return `${seconds} seg`;
  };

  if (isLoading) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <p className="text-lg">Carregando histórico...</p>
      </main>
    );
  }

  return (
    <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8 space-y-8">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-headline text-center sm:text-left flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-primary" />
            Histórico de Simulados
          </h1>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Início
            </Link>
          </Button>
        </div>

        {history.length === 0 ? (
          <Card className="w-full text-center shadow-lg">
            <CardHeader>
              <CardTitle>Nenhum histórico encontrado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Você ainda não completou nenhum simulado. Faça um para ver seu progresso aqui!
              </p>
            </CardContent>
            <CardFooter>
               <Button asChild className="w-full">
                 <Link href="/">Fazer um Simulado</Link>
               </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            {history.map((result) => (
              <Card key={result.id} className="shadow-lg w-full">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between">
                    Simulado Realizado
                    <span className="text-sm font-normal text-muted-foreground flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1.5" />
                      {formatDate(result.date)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-card-foreground/5 rounded-md">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <ListChecks className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium uppercase">Questões</span>
                    </div>
                    <p className="text-2xl font-semibold">{result.total}</p>
                  </div>
                  <div className="p-3 bg-card-foreground/5 rounded-md">
                    <div className="flex items-center text-muted-foreground mb-1">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                       <span className="text-xs font-medium uppercase">Corretas</span>
                    </div>
                    <p className="text-2xl font-semibold text-green-400">{result.corretas} ({result.percentage}%)</p>
                  </div>
                  <div className="p-3 bg-card-foreground/5 rounded-md">
                     <div className="flex items-center text-muted-foreground mb-1">
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                       <span className="text-xs font-medium uppercase">Incorretas</span>
                    </div>
                    <p className="text-2xl font-semibold text-red-400">{result.incorretas}</p>
                  </div>
                   <div className="p-3 bg-card-foreground/5 rounded-md col-span-1 sm:col-span-2 md:col-span-3">
                     <div className="flex items-center text-muted-foreground mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                       <span className="text-xs font-medium uppercase">Tempo</span>
                    </div>
                    <p className="text-lg font-semibold">{formatTime(result.tempo)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
       <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} GitHub Foundations PT-BR Prep. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
