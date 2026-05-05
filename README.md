# RKTS Node API

Uma API REST construída com **Fastify** e **TypeScript** para gerenciar transações, com autenticação via sessão de cookies.

## 🚀 Tecnologias

- **[Fastify](https://fastify.dev/)** - Framework web rápido e de baixo overhead
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[SQLite3](https://www.sqlite.org/)** - Banco de dados relacional leve
- **[Knex.js](http://knexjs.org/)** - Query builder e ferramenta de migrações
- **[Zod](https://zod.dev/)** - Validação de schemas em TypeScript
- **[TSup](https://tsup.egoist.dev/)** - Bundler de TypeScript rápido e fácil de usar
- **[Vitest](https://vitest.dev/)** - Framework de testes unitários
- **[ESLint](https://eslint.org/)** - Linter para identificar e corrigir problemas no código

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🔧 Instalação

```bash
# Clonar o repositório
git clone <seu-repositorio>

# Navegar até o diretório
cd rkts_node_api

# Instalar dependências
npm install
```

## 📦 Scripts Disponíveis

```bash
# Desenvolvimento - executa com hot reload
npm run dev

# Build - compila TypeScript para JavaScript
npm run build

# Testes - executa suite de testes
npm run test

# Linter - valida e corrige o código
npm run lint

# Knex CLI - gerencia migrações de banco de dados
npm run knex
```

## 📁 Estrutura do Projeto

```
rkts_node_api/
├── src/                           # Código fonte TypeScript
│   ├── app.ts                    # Configuração da aplicação Fastify
│   ├── server.ts                 # Inicialização do servidor
│   ├── database.ts               # Configuração do banco de dados
│   ├── @types/                   # Definições de tipos globais
│   │   └── knex.d.ts             # Tipos para Knex
│   ├── env/                      # Configuração de variáveis de ambiente
│   │   └── index.ts
│   ├── middlewares/              # Middlewares da aplicação
│   │   └── check-session-id-exists.ts
│   └── routes/                   # Definição de rotas
│       └── transactions.ts       # Rotas de transações
├── db/                            # Banco de dados e migrações
│   └── migrations/               # Migrações do Knex
│       ├── 20260423010422_create-transactions.ts
│       └── 20260424201546_add-session-id-to-transactions.ts
├── test/                          # Testes
│   └── transactions.spec.ts
├── build/                         # Código compilado (gerado automaticamente)
├── knexfile.ts                   # Configuração do Knex
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

## 🔐 Autenticação

A aplicação utiliza **sessão de cookies** para autenticação. Todas as requisições devem incluir o cookie de sessão.

## 🌐 Endpoints

### Transações

- `GET /transactions` - Lista todas as transações
- `POST /transactions` - Cria uma nova transação
- `GET /transactions/:id` - Obtém uma transação específica
- `DELETE /transactions/:id` - Deleta uma transação

## 🗄️ Banco de Dados

O projeto utiliza SQLite3 com Knex.js para migrações. As migrações estão localizadas em `db/migrations/`.

### Executar migrações

```bash
# Criar nova migração
npm run knex migrate:make <nome-da-migracao>

# Executar migrações pendentes
npm run knex migrate:latest

# Reverter última migração
npm run knex migrate:rollback
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=./db/app.db
```

## 🧪 Testes

Execute a suite de testes com:

```bash
npm run test
```

## 📝 Licença

ISC

## 👨‍💻 Autor

Criado para fins educacionais e de aprendizado.
