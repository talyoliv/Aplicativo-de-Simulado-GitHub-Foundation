'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export default function HomePage() {
  const [numQuestions, setNumQuestions] = useState<string>('20');
  const router = useRouter();

  const questionOptions = ['20', '30', '40', '50'];

  const handleStartSimulation = () => {
    router.push(`/simulado?numQuestoes=${numQuestions}`);
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
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {questionOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
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
            Iniciar Simulado
          </Button>
        </CardContent>
      </Card>
      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} GitHub Foundations PT-BR Prep. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
