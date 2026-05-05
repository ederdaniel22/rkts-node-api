# Troubleshooting - Guia de Erros Comuns

## ❌ Erro: GLIBC_2.38 not found (SQLite3 no Render)

**Problema:**

```
/lib/x86_64-linux-gnu/libm.so.6: version `GLIBC_2.38' not found
Error: /lib/x86_64-linux-gnu/libm.so.6: version `GLIBC_2.38' not found (required by node_sqlite3.node)
```

**Causa:**
SQLite3 é um módulo nativo compilado localmente. Durante o build no Render, ele tenta ser instalado e compilado, mas falha por incompatibilidade de GLIBC.

**Solução: Use Build Command com variáveis de ambiente inline**

1. **Via render.yaml (recomendado):**

   O arquivo `render.yaml` já está configurado com:

   ```bash
   NODE_ENV=production DATABASE_CLIENT=pg DATABASE_URL=postgres://build:build@localhost/build npm ci --only=production && npm run build
   ```

2. **Ou manual no painel do Render:**
   - Dashboard → seu Web Service
   - Clique em **Build & Deploy**
   - Em **Build Command**, coloque:

   ```bash
   NODE_ENV=production DATABASE_CLIENT=pg DATABASE_URL=postgres://build:build@localhost/build npm ci --only=production && npm run build
   ```

**Por que isso funciona?**

- ✅ Define as variáveis ANTES do build
- ✅ `npm ci --only=production` instala APENAS dependências de produção
- ✅ SQLite3 fica em `devDependencies` e não é instalado
- ✅ Database URL temporária evita erros de configuração

**Verificação:**

1. Certifique-se de que:
   - ✅ O `render.yaml` está no repositório
   - ✅ Enviou as mudanças com `git push`
   - ✅ Clique em **Manual Deploy** no Render

2. Verifique os logs durante o build:
   - Procure por "SQLite" - não deve aparecer
   - Procure por "pg" - deve estar usando PostgreSQL

---

## ❌ Erro: Module.register() is deprecated

**Problema:**

```
(node:157) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
```

**Causa:**
Aviso de compatibilidade entre versões do Node.js e TSX.

**Solução:**
Use Node.js >= 18 (já está configurado no `package.json`).

---

## ❌ Erro: Cannot find module 'dotenv'

**Problema:**

```
Error: Cannot find module 'dotenv'
```

**Causa:**
Dependências não foram instaladas.

**Solução:**

```bash
npm install
```

---

## ❌ Erro: DATABASE_URL não encontrado

**Problema:**

```
Error: Invalid environment variables - DATABASE_URL is required
```

**Causa:**
Variável de ambiente não foi definida.

**Solução:**

1. Crie um arquivo `.env` local:

   ```env
   DATABASE_CLIENT=sqlite
   DATABASE_URL=./db/app.db
   PORT=3333
   ```

2. No Render, defina `DATABASE_URL` no painel Environment

---

## ✅ Deploy bem-sucedido - Próximos passos

Após o deploy funcionar:

1. **Execute as migrações:**

   ```bash
   npm run knex -- migrate:latest
   ```

2. **Verifique a aplicação:**
   - Acesse a URL do seu serviço Render
   - Teste os endpoints: `GET /transactions`

3. **Monitore os logs:**
   - Dashboard do Render → Logs
   - Verifique se há erros ou avisos

---

## 🔄 Como redeploy após mudar variáveis

1. Vá ao Dashboard do Render
2. Clique em seu serviço Web
3. Vá em Environment
4. Faça as alterações necessárias
5. Clique em "Manual Deploy" para reimplantar

---

## 📞 Precisa de ajuda?

- Verifique os logs no painel do Render
- Execute `npm audit` localmente para verificar vulnerabilidades
- Teste tudo localmente antes de fazer push
