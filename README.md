# RKTS Node API

Uma API REST construída com **Fastify** e **TypeScript** para gerenciar transações, com autenticação via sessão de cookies. Suporta múltiplos bancos de dados (SQLite e PostgreSQL).

## 🚀 Tecnologias

- **[Fastify](https://fastify.dev/)** - Framework web rápido e de baixo overhead
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[SQLite3](https://www.sqlite.org/)** - Banco de dados relacional leve (para desenvolvimento)
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional robusto (para produção)
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

## 🗄️ Suporte a Múltiplos Bancos de Dados

A API foi desenvolvida com suporte flexível para diferentes bancos de dados:

### SQLite (Desenvolvimento)

- ✅ Ideal para desenvolvimento local
- ✅ Sem necessidade de servidor externo
- ✅ Arquivo único de banco de dados

**Configuração:**

```env
DATABASE_CLIENT=sqlite
DATABASE_URL=./db/app.db
```

### PostgreSQL (Produção)

- ✅ Ideal para ambientes de produção
- ✅ Suporte para múltiplos usuários
- ✅ Melhor performance e escalabilidade

**Configuração:**

```env
DATABASE_CLIENT=pg
DATABASE_URL=postgres://usuario:senha@localhost:5432/rkts_node_api
```

A configuração do banco é feita automaticamente baseada na variável `DATABASE_CLIENT`.

## 🌐 Endpoints

### Transações

- `GET /transactions` - Lista todas as transações
- `POST /transactions` - Cria uma nova transação
- `GET /transactions/:id` - Obtém uma transação específica
- `DELETE /transactions/:id` - Deleta uma transação

## �️ Banco de Dados e Migrações

O projeto utiliza Knex.js para gerenciar migrações, compatível com SQLite e PostgreSQL. As migrações estão localizadas em `db/migrations/`.

### Executar migrações

```bash
# Criar nova migração
npm run knex migrate:make <nome-da-migracao>

# Executar migrações pendentes
npm run knex migrate:latest

# Reverter última migração
npm run knex migrate:rollback

# Reverter todas as migrações
npm run knex migrate:rollback --all
```

As migrações são executadas automaticamente ao iniciar o servidor em desenvolvimento.

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Ambiente de execução
NODE_ENV=development

# Configuração do banco de dados
DATABASE_CLIENT=sqlite  # ou 'pg' para PostgreSQL
DATABASE_URL=./db/app.db

# Para PostgreSQL, use a URL de conexão:
# DATABASE_CLIENT=pg
# DATABASE_URL=postgres://usuario:senha@localhost:5432/rkts_node_api

# Porta do servidor
PORT=3333
```

### Variáveis Suportadas

| Variável          | Valores                             | Descrição                                                     |
| ----------------- | ----------------------------------- | ------------------------------------------------------------- |
| `NODE_ENV`        | `development`, `test`, `production` | Ambiente de execução                                          |
| `DATABASE_CLIENT` | `sqlite`, `pg`                      | Cliente de banco de dados                                     |
| `DATABASE_URL`    | string                              | Caminho do arquivo (SQLite) ou string de conexão (PostgreSQL) |
| `PORT`            | número                              | Porta do servidor (padrão: 3333)                              |

## 🧪 Testes

A aplicação suporta testes automatizados usando Vitest. Um arquivo `.env.test` separado é usado durante os testes.

```bash
# Executar testes
npm run test

# Executar testes em modo watch
npm run test -- --watch

# Executar testes com cobertura
npm run test -- --coverage
```

**Arquivo `.env.test`:**

```env
NODE_ENV=test
DATABASE_CLIENT=sqlite
DATABASE_URL=:memory:
PORT=3333
```

Para usar PostgreSQL nos testes, configure o `.env.test` com um banco de dados de teste separado.

## � Deploy

### Render.com (Recomendado para Produção)

O erro de deploy com SQLite3 ocorre porque o Render não tem as dependências de sistema necessárias para compilar SQLite3.

**Solução: Use PostgreSQL em produção**

1. **Configure o banco de dados PostgreSQL no Render:**
   - Crie um novo PostgreSQL Database
   - Copie a **Internal Database URL**

2. **Defina as variáveis de ambiente no Render:**

   No painel do Render, vá em **Environment** e adicione:

   ```env
   NODE_ENV=production
   DATABASE_CLIENT=pg
   DATABASE_URL=postgres://seu-usuario:sua-senha@seu-host:5432/seu-banco
   PORT=3000
   ```

3. **Configure o Build Command (se necessário):**

   Se o deploy ainda falhar, use este build command no Render:

   ```bash
   npm install --legacy-peer-deps && npm run build
   ```

4. **Ou desabilite as migrações no deploy:**

   Se preferir rodar as migrações manualmente após o deploy:

   ```bash
   npm install && npm run build
   ```

   Depois execute as migrações localmente ou via SSH:

   ```bash
   npm run knex -- migrate:latest
   ```

### Variáveis de Ambiente para Produção

```env
NODE_ENV=production
DATABASE_CLIENT=pg
DATABASE_URL=postgres://usuario:senha@host:5432/database
PORT=3000
```

⚠️ **IMPORTANTE:**

- **Nunca** faça commit do `.env` com dados sensíveis
- **Não use SQLite3 em produção** em ambientes serverless
- Use PostgreSQL para deploy em Render, Vercel, Heroku, etc.
- SQLite3 é apenas para desenvolvimento local

## 📖 Troubleshooting

Encontrou um erro? Confira [TROUBLESHOOTING.md](TROUBLESHOOTING.md) para soluções de problemas comuns, incluindo:

- Erro de GLIBC com SQLite3
- Deploy no Render
- Variáveis de ambiente
- E muito mais

## �📝 Licença

ISC

## 👨‍💻 Autor

Criado para fins educacionais e de aprendizado.
