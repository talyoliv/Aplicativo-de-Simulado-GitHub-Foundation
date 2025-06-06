# 📚 Simulado GitHub Foundation – App de Estudo

Este projeto foi desenvolvido durante minha participação como **voluntária no evento Build With AI – São José dos Campos 2025**. A ideia surgiu para **facilitar o estudo de pessoas que estão se preparando para a certificação GitHub Foundations**, como eu!

---

## 🚀 Objetivo

Criar uma ferramenta simples, intuitiva e em português que permite aos usuários:

- Treinar para a certificação GitHub Foundations  
- Escolher a quantidade de questões do simulado  
- Receber feedback imediato de acertos e erros  
- Ver explicações ao final do teste  
- Acompanhar o tempo e desempenho  
- Revisar questões que foram respondidas erradas

---

## 🛠️ Tecnologias utilizadas

- **Firebase Studio**  
- **Next.js com App Router**  
- **TypeScript**  
- **TailwindCSS**  
- **JSON como base de dados local das questões**  
- **Interface responsiva e interativa**

---

## ✨ Funcionalidades

- 🎯 Escolha entre **5, 10, 20, 30, 40 ou 50** questões  
- 🔄 Questões sorteadas de forma aleatória e sem repetição no mesmo simulado  
- ✅ Correção automática com resultado final em:
  - Quantidade de acertos  
  - Porcentagem  
  - Tempo de execução  
- 🧠 Explicações breves ao final da resposta  
- 🔁 Botão de **“Fazer novo simulado”**  
- ❌ Opção de **abandonar simulado** a qualquer momento  
- 🧾 **Histórico de Simulados Realizados** – acompanhe seu desempenho e evolução ao longo dos testes  
- ♻️ **Revisão Inteligente** – refaça apenas as questões que você errou em simulados anteriores, reforçando seu aprendizado de forma direcionada  

---

## 📂 Base de Dados

As questões (atualmente **105**) foram criadas com base no material oficial *Study Guide GitHub Foundations* e estão estruturadas em um arquivo `.json` incluído diretamente no projeto como base de dados local.

> O arquivo é importado no código via ES Module e processado internamente, sem requisições externas.

---

## ☁️ Cloud Computing Service

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

**Deploy:**  
👉 [Acesse o Simulado GitHub Foundations PT-BR](https://aplicativo-de-simulado-git-hub-foun-nine.vercel.app/)
