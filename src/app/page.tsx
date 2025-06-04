
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, History, Sparkles, RefreshCw } from 'lucide-react'; // Added Sparkles and RefreshCw
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast"


export default function HomePage() {
  const [numQuestions, setNumQuestions] = useState<string>('20');
  const [canReview, setCanReview] = useState(false);
  const router = useRouter();
  const questionOptions = ['5', '10', '20', '30', '40', '50'];
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedErroHistoricosString = localStorage.getItem('erroHistoricos');
      if (storedErroHistoricosString) {
        const erroHistoricos: number[] = JSON.parse(storedErroHistoricosString);
        setCanReview(erroHistoricos.length > 0);
      } else {
        setCanReview(false);
      }
    } catch (error) {
      console.error("Failed to check erroHistoricos from localStorage:", error);
      setCanReview(false);
    }
  }, []);

  const handleStartSimulation = () => {
    router.push(`/simulado?numQuestoes=${numQuestions}`);
  };

  const handleStartSmartReview = () => {
    try {
      const storedErroHistoricosString = localStorage.getItem('erroHistoricos');
      if (storedErroHistoricosString) {
        const erroHistoricos: number[] = JSON.parse(storedErroHistoricosString);
        if (erroHistoricos.length > 0) {
          router.push(`/simulado?reviewIds=${erroHistoricos.join(',')}`);
        } else {
          toast({
            title: "Revisão Inteligente",
            description: "Você não tem questões erradas para revisar no momento.",
            variant: "default",
          });
        }
      } else {
         toast({
            title: "Revisão Inteligente",
            description: "Você não tem questões erradas para revisar no momento.",
            variant: "default",
          });
      }
    } catch (error) {
       console.error("Failed to start smart review:", error);
       toast({
          title: "Erro",
          description: "Não foi possível iniciar a revisão inteligente. Tente novamente.",
          variant: "destructive",
        });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Target className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">GitHub Foundations PT-BR Prep</CardTitle>
          <CardDescription className="text-muted-foreground">
            Prepare-se para a certificação GitHub Foundations com simulados em Português.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="numQuestions" className="text-lg font-medium mb-3 block text-center">
              Escolha o número de questões:
            </Label>
            <RadioGroup
              id="numQuestions"
              value={numQuestions}
              onValueChange={setNumQuestions}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {questionOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2 justify-center">
                  <RadioGroupItem value={option} id={`option-${option}`} />
                  <Label htmlFor={`option-${option}`} className="text-base cursor-pointer hover:text-primary transition-colors">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button
            onClick={handleStartSimulation}
            className="w-full text-lg py-6"
            size="lg"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Iniciar Simulado Normal
          </Button>
          <Button
            onClick={handleStartSmartReview}
            className="w-full"
            variant="secondary"
            disabled={!canReview}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Revisar Questões Erradas
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/historico">
              <History className="mr-2 h-5 w-5" />
              Ver Histórico de Simulados
            </Link>
          </Button>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} GitHub Foundations PT-BR Prep. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
