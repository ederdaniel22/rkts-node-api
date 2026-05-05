# Troubleshooting - Guia de Erros Comuns

## ❌ Erro: GLIBC_2.38 not found (SQLite3 no Render)

**Problema:**

```
/lib/x86_64-linux-gnu/libm.so.6: version `GLIBC_2.38' not found
Error: /lib/x86_64-linux-gnu/libm.so.6: version `GLIBC_2.38' not found (required by node_sqlite3.node)
```

**Causa:**
SQLite3 é um módulo nativo que precisa ser compilado. O problema ocorre quando `npm install` instala **devDependencies** (incluindo sqlite3) em produção.

**Solução: Use `npm ci --only=production` no Build Command**

1. **Vá ao painel do Render:**
   - Dashboard → seu Web Service
   - Clique em **Build & Deploy**

2. **Altere o Build Command para:**

   ```bash
   npm ci --only=production && npm run build
   ```

   Ou com migrações automáticas:

   ```bash
   npm ci --only=production && npm run knex -- migrate:latest && npm run build
   ```

3. **Reimplante:**
   - Clique em **Manual Deploy**
   - Escolha o branch `main`
   - Aguarde o build

**Por que isso funciona?**
- ✅ `npm ci --only=production` instala APENAS dependências de produção
- ✅ SQLite3 está em `devDependencies` e não será instalado
- ✅ PostgreSQL (em `dependencies`) será instalado normalmente
- ✅ Evita erros de compilação nativa

**Se ainda não funcionar:**
- Certifique-se de que o banco PostgreSQL está criado
- Verifique se a variável `DATABASE_URL` está definida
- Clique em **Manual Deploy** novamente

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
