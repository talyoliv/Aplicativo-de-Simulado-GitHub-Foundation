import type { Question } from '@/types';

export const allQuestions: Question[] = [
  {
    id: 1,
    text: "O que é Git?",
    options: [
      { id: 'a', text: "Um sistema de controle de versão distribuído." },
      { id: 'b', text: "Uma linguagem de programação." },
      { id: 'c', text: "Um editor de texto." },
      { id: 'd', text: "Uma plataforma de hospedagem de código." },
    ],
    correctAnswerId: 'a',
    explanation: "Git é um sistema de controle de versão distribuído, o que significa que cada desenvolvedor tem uma cópia completa do repositório, incluindo todo o histórico de alterações."
  },
  {
    id: 2,
    text: "Qual comando inicializa um novo repositório Git?",
    options: [
      { id: 'a', text: "git start" },
      { id: 'b', text: "git new" },
      { id: 'c', text: "git init" },
      { id: 'd', text: "git create" },
    ],
    correctAnswerId: 'c',
    explanation: "O comando 'git init' é usado para criar um novo repositório Git vazio ou para reinicializar um existente."
  },
  {
    id: 3,
    text: "O que é GitHub?",
    options: [
      { id: 'a', text: "Um software de edição de vídeo." },
      { id: 'b', text: "Uma plataforma de desenvolvimento colaborativo que hospeda repositórios Git." },
      { id: 'c', text: "Um sistema operacional." },
      { id: 'd', text: "Uma linguagem de consulta a banco de dados." },
    ],
    correctAnswerId: 'b',
    explanation: "GitHub é uma plataforma baseada na web para controle de versão usando Git. É amplamente utilizado para hospedar projetos de software, facilitando a colaboração."
  },
  {
    id: 4,
    text: "Qual o propósito do arquivo `.gitignore`?",
    options: [
      { id: 'a', text: "Listar todos os arquivos importantes do projeto." },
      { id: 'b', text: "Especificar arquivos intencionalmente não rastreados que o Git deve ignorar." },
      { id: 'c', text: "Armazenar senhas e chaves de API." },
      { id: 'd', text: "Definir as permissões de usuário para o repositório." },
    ],
    correctAnswerId: 'b',
    explanation: "O arquivo `.gitignore` especifica arquivos e diretórios que o Git não deve rastrear. Isso é útil para arquivos gerados, dependências locais, ou logs."
  },
  {
    id: 5,
    text: "O que é um 'commit' no Git?",
    options: [
      { id: 'a', text: "Uma solicitação para mesclar alterações de um branch para outro." },
      { id: 'b', text: "Um ponto de restauração ou um instantâneo das alterações no repositório." },
      { id: 'c', text: "Uma cópia local de um repositório remoto." },
      { id: 'd', text: "Um erro no código." },
    ],
    correctAnswerId: 'b',
    explanation: "Um commit é um registro das alterações feitas nos arquivos do projeto. Cada commit tem um ID único e uma mensagem descritiva."
  },
  // Add at least 45 more questions to support up to 50 questions per quiz.
  // For brevity in this example, only 5 are shown. Imagine 50 questions here.
  {
    id: 6,
    text: "O que é um 'branch' no Git?",
    options: [
      { id: 'a', text: "Uma versão específica de um arquivo." },
      { id: 'b', text: "Uma linha independente de desenvolvimento." },
      { id: 'c', text: "Um backup do repositório." },
      { id: 'd', text: "Um comentário em um pull request." },
    ],
    correctAnswerId: 'b',
    explanation: "Branches permitem que você trabalhe em diferentes versões de um projeto simultaneamente, isolando novas funcionalidades ou correções."
  },
  {
    id: 7,
    text: "Qual comando é usado para enviar alterações locais para um repositório remoto?",
    options: [
      { id: 'a', text: "git pull" },
      { id: 'b', text: "git fetch" },
      { id: 'c', text: "git commit" },
      { id: 'd', text: "git push" },
    ],
    correctAnswerId: 'd',
    explanation: "'git push' envia seus commits locais para o repositório remoto especificado."
  },
  {
    id: 8,
    text: "O que é um 'pull request' (PR) no GitHub?",
    options: [
      { id: 'a', text: "Um pedido para excluir um repositório." },
      { id: 'b', text: "Uma forma de propor alterações a um repositório, solicitando que o mantenedor as revise e mescle." },
      { id: 'c', text: "Um relatório de bug detalhado." },
      { id: 'd', text: "Um comando Git para baixar atualizações." },
    ],
    correctAnswerId: 'b',
    explanation: "Pull requests são uma funcionalidade central do GitHub para colaboração. Eles permitem discutir e revisar alterações antes de integrá-las ao branch principal."
  },
  {
    id: 9,
    text: "Qual é a principal função do comando 'git clone'?",
    options: [
      { id: 'a', text: "Criar um novo branch." },
      { id: 'b', text: "Criar uma cópia local de um repositório remoto existente." },
      { id: 'c', text: "Mesclar dois branches." },
      { id: 'd', text: "Desfazer o último commit." },
    ],
    correctAnswerId: 'b',
    explanation: "'git clone' é usado para obter uma cópia de um repositório Git existente, geralmente de um servidor remoto."
  },
  {
    id: 10,
    text: "O que significa 'staging area' ou 'index' no Git?",
    options: [
      { id: 'a', text: "O local onde os arquivos são armazenados antes de serem excluídos." },
      { id: 'b', text: "Um arquivo que contém o histórico de todos os commits." },
      { id: 'c', text: "Uma área intermediária onde você prepara as alterações que farão parte do próximo commit." },
      { id: 'd', text: "O branch principal do repositório." },
    ],
    correctAnswerId: 'c',
    explanation: "A staging area (ou index) permite que você selecione quais modificações nos arquivos rastreados serão incluídas no próximo commit."
  },
  // Add more questions up to 50
  { id: 11, text: "Pergunta de exemplo 11?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 12, text: "Pergunta de exemplo 12?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 13, text: "Pergunta de exemplo 13?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 14, text: "Pergunta de exemplo 14?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 15, text: "Pergunta de exemplo 15?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 16, text: "Pergunta de exemplo 16?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 17, text: "Pergunta de exemplo 17?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 18, text: "Pergunta de exemplo 18?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 19, text: "Pergunta de exemplo 19?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 20, text: "Pergunta de exemplo 20?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 21, text: "Pergunta de exemplo 21?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 22, text: "Pergunta de exemplo 22?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 23, text: "Pergunta de exemplo 23?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 24, text: "Pergunta de exemplo 24?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 25, text: "Pergunta de exemplo 25?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 26, text: "Pergunta de exemplo 26?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 27, text: "Pergunta de exemplo 27?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 28, text: "Pergunta de exemplo 28?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 29, text: "Pergunta de exemplo 29?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 30, text: "Pergunta de exemplo 30?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 31, text: "Pergunta de exemplo 31?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 32, text: "Pergunta de exemplo 32?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 33, text: "Pergunta de exemplo 33?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 34, text: "Pergunta de exemplo 34?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 35, text: "Pergunta de exemplo 35?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 36, text: "Pergunta de exemplo 36?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 37, text: "Pergunta de exemplo 37?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 38, text: "Pergunta de exemplo 38?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 39, text: "Pergunta de exemplo 39?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 40, text: "Pergunta de exemplo 40?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 41, text: "Pergunta de exemplo 41?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 42, text: "Pergunta de exemplo 42?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 43, text: "Pergunta de exemplo 43?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 44, text: "Pergunta de exemplo 44?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 45, text: "Pergunta de exemplo 45?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 46, text: "Pergunta de exemplo 46?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 47, text: "Pergunta de exemplo 47?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
  { id: 48, text: "Pergunta de exemplo 48?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C (Correta)" }], correctAnswerId: 'c' },
  { id: 49, text: "Pergunta de exemplo 49?", options: [{ id: 'a', text: "Opção A (Correta)" }, { id: 'b', text: "Opção B" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'a' },
  { id: 50, text: "Pergunta de exemplo 50?", options: [{ id: 'a', text: "Opção A" }, { id: 'b', text: "Opção B (Correta)" }, { id: 'c', text: "Opção C" }], correctAnswerId: 'b' },
];

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getShuffledQuestions(count: number): Question[] {
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
