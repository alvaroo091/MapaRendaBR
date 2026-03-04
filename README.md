# 🗺️ Mapa Renda BR

Um aplicativo interativo que analisa dados de renda, custo de vida e emprego por estados do Brasil. Permite visualizar informações econômicas de cada estado, comparar regiões e calcular a viabilidade salarial.

## 📋 Visão Geral do Projeto

**Mapa Renda BR** é uma aplicação web moderna desenvolvida com **React** e **TypeScript** que fornece:

- 📊 **Análise de Dados Econômicos**: Dados sobre PIB per capita, desemprego e custo de vida por estado
- 💰 **Custo de Vida Detalhado**: Informações sobre moradia, alimentação, transporte, saúde, educação, utilidades e entretenimento
- 🧮 **Calculadora de Salário**: Ferramenta para calcular se um salário é suficiente para viver confortavelmente em cada estado
- 🔍 **Busca e Filtros**: Pesquise por estado ou filtre por região geográfica (Norte, Nordeste, Centro-Oeste, Sudeste, Sul)
- 📈 **Comparação de Estados**: Ordene por custo de vida, taxa de desemprego ou nome
- 🎨 **Interface Responsiva**: Design moderno com Tailwind CSS

### 🏗️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **React** | 18.3.1 | Framework UI |
| **TypeScript** | 5.5.3 | Tipagem estática |
| **Vite** | 5.4.2 | Build tool e dev server |
| **Tailwind CSS** | 3.4.1 | Estilização |
| **Supabase** | 2.57.4 | Backend e banco de dados |
| **Lucide React** | 0.344.0 | Ícones |
| **ESLint** | 9.9.1 | Linting |

### 📁 Estrutura do Projeto

```
MapaRendaBR/
├── src/
│   ├── components/
│   │   ├── SalaryCalculator.tsx    # Calculadora de viabilidade salarial
│   │   ├── StateCard.tsx           # Card que exibe dados de um estado
│   │   └── StateDetailModal.tsx    # Modal com detalhes completos
│   ├── lib/
│   │   ├── supabase.ts            # Configuração do cliente Supabase
│   │   └── types.ts               # Tipos e interfaces TypeScript
│   ├── App.tsx                     # Componente principal
│   ├── main.tsx                    # Entry point da aplicação
│   ├── index.css                   # Estilos globais
│   └── vite-env.d.ts              # Tipos do Vite
├── supabase/
│   └── migrations/
│       └── 20260304031408_create_states_cost_of_living.sql  # Schema do BD
├── package.json                    # Dependências e scripts
├── vite.config.ts                  # Configuração do Vite
├── tailwind.config.js              # Configuração do Tailwind
├── tsconfig.json                   # Configuração do TypeScript
└── index.html                      # HTML principal

```

---

## 🚀 Como Iniciar o Projeto

### ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16.0.0 ou superior)
  - Download: [nodejs.org](https://nodejs.org/)
  - Verifique a instalação: `node --version`
  
- **npm** (geralmente vem com Node.js)
  - Verifique: `npm --version`

- **Git** (opcional, mas recomendado)
  - Download: [git-scm.com](https://git-scm.com/)

### 📥 Passo 1: Clonar ou Abrir o Projeto

Se ainda não tem o projeto localmente:
```bash
git clone <url-do-repositorio>
cd MapaRendaBR
```

Ou, se já tem a pasta aberta, navegue até ela no terminal:
```bash
cd c:\Users\alvar\Downloads\MapaRendaBR
```

### 📦 Passo 2: Instalar Dependências

Execute o comando para instalar todas as dependências do projeto:

```bash
npm install
```

⏳ **Aguarde** - Isso pode levar 1-3 minutos na primeira vez. O npm criará uma pasta `node_modules/` com todas as bibliotecas necessárias.

### 🔧 Passo 3: Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Supabase:

```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

💡 **Como obter as credenciais:**
1. Acesse [supabase.com](https://supabase.com/)
2. Crie um projeto ou faça login
3. Vá em **Settings** → **API**
4. Copie `Project URL` e `anon public key`

### 🎮 Passo 4: Iniciar o Servidor de Desenvolvimento

Execute o comando para iniciar o servidor local:

```bash
npm run dev
```

📱 **Saída esperada:**
```
  VITE v5.4.2  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Abra seu navegador e acesse: **http://localhost:5173/**

🎉 **Pronto!** O aplicativo está rodando localmente.

---

## 📚 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot reload |
| `npm run build` | Compila para produção (pasta `dist/`) |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Verifica problemas no código com ESLint |
| `npm run typecheck` | Valida tipos TypeScript |

---

## 🗄️ Banco de Dados (Supabase)

O projeto usa **Supabase** para armazenar dados econômicos dos estados.

### Tabelas Principais

#### 1️⃣ **states** - Informações dos Estados
```sql
- id: UUID (PK)
- name: string         (ex: "São Paulo")
- uf: string          (ex: "SP")
- region: string      (ex: "Sudeste")
- population: number
- area_km2: number
- gdp_per_capita: number
- created_at: timestamp
- updated_at: timestamp
```

#### 2️⃣ **cost_of_living** - Custo de Vida
```sql
- id: UUID (PK)
- state_id: UUID (FK)
- housing_avg: number          (moradia)
- food_avg: number             (alimentação)
- transport_avg: number        (transporte)
- healthcare_avg: number       (saúde)
- education_avg: number        (educação)
- utilities_avg: number        (utilidades)
- entertainment_avg: number    (entretenimento)
- total_monthly: number        (total mensal)
- minimum_salary_needed: number (salário mínimo recomendado)
- last_updated: timestamp
```

#### 3️⃣ **employment_stats** - Estatísticas de Emprego
```sql
- id: UUID (PK)
- state_id: UUID (FK)
- unemployment_rate: number    (taxa de desemprego)
- average_salary: number       (salário médio)
- median_salary: number        (salário mediano)
- job_openings: number         (vagas abertas)
- last_updated: timestamp
```

---

## 🎯 Funcionalidades Principais

### 1. 🔍 Busca e Filtros
- **Busca**: Procure estados por nome (ex: "São Paulo") ou UF (ex: "SP")
- **Filtro por Região**: Selecione Norte, Nordeste, Centro-Oeste, Sudeste ou Sul
- **Ordenação**: Ordene por Custo de Vida, Taxa de Desemprego ou Nome do Estado

### 2. 🃏 Cards de Estado
Cada estado mostra em tempo real:
- Nome e região
- Population e área
- PIB per capita
- Taxa de desemprego
- Custo de vida total mensal
- Botão para ver mais detalhes

### 3. 📋 Modal de Detalhes
Ao clicar em um estado, veja:
- Toda a informação econômica completa
- Breakdown detalhado do custo de vida
- Estatísticas de emprego
- Calculadora de salário integrada

### 4. 🧮 Calculadora de Salário
- Digite seu salário
- Veja se é suficiente para viver confortavelmente
- Compare com salário mínimo recomendado
- Indicador visual (verde ✓ ou vermelho ✗)

---

## 🛠️ Desenvolvimento

### Adicionar um Novo Componente

1. Crie o arquivo em `src/components/`
2. Use TypeScript e exporte como `export function NomeComponente()`
3. Importe em `App.tsx`

### Modificar Estilos

O projeto usa **Tailwind CSS**. Edite diretamente nas classes dos componentes:
```tsx
<div className="bg-blue-50 p-4 rounded-lg shadow-md">
  ...
</div>
```

### Adicionar Dados ao Supabase

Acesse o Supabase Dashboard e:
1. Vá para a aba **SQL Editor**
2. Execute queries para inserir dados
3. A aplicação carregará automaticamente via `useEffect`

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| `npm: command not found` | Node.js não está instalado. Instale em [nodejs.org](https://nodejs.org/) |
| Porta 5173 já em uso | Mude a porta: `npm run dev -- --port 3000` |
| Erro ao conectar Supabase | Verifique as variáveis em `.env.local` |
| TypeScript errors | Execute `npm run typecheck` para validar tipos |
| Componentes não aparecem | Verifique imports em `App.tsx` |

---

## 📦 Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Isso gera uma pasta `dist/` com arquivos otimizados e minificados. Você pode fazer deploy em:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3**
- Seu próprio servidor

---

## 📝 Licença

Este projeto é fornecido como está.

---

## 🤝 Contribuições

Ideias para melhorias:
- 📍 Adicionar mapa interativo
- 📊 Gráficos de tendências históricas
- 🌙 Modo escuro
- 📱 App mobile nativo
- 🌍 Suporte a dados internacionais
- 💾 Exportar dados em PDF/CSV

---

## 📧 Suporte

Se encontrar problemas:
1. Verifique se Node.js está instalado: `node --version`
2. Reinstale dependências: `rm -rf node_modules && npm install`
3. Limpe cache do Vite: `rm -rf .vite`
4. Reinicie o servidor: `npm run dev`

---

**Versão**: 0.0.0 | **Data**: Março 2026
