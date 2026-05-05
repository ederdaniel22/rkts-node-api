# 🚀 Guia de Deploy - Render.com

## Erro que você enfrentou

```
/lib/x86_64-linux-gnu/libm.so.6: version `GLIBC_2.38' not found
Error: ... (required by /opt/render/project/src/node_modules/sqlite3/build/Release/node_sqlite3.node)
Failed to read config from knexfile
```

## ✅ Solução: Usar PostgreSQL em produção

SQLite3 não funciona bem em ambientes serverless como Render porque é um módulo nativo compilado localmente.

---

## 📋 Passo a Passo

### 1️⃣ Criar um banco de dados PostgreSQL no Render

1. Acesse [https://render.com](https://render.com)
2. Faça login ou crie uma conta
3. Clique em **New** → **PostgreSQL**
4. Preencha:
   - **Name**: `rkts-node-api-db` (ou outro nome)
   - **Database**: `rkts_node_api` (nome do banco)
   - **User**: `postgres` (ou outro username)
   - **Region**: Escolha a mesma do seu web service
   - **PostgreSQL Version**: 15 (ou mais recente)
   - **Plan**: Free

5. Clique em **Create Database**
6. ⏳ Aguarde 1-2 minutos para criar

### 2️⃣ Copiar a connection string

1. Vá para o seu banco PostgreSQL criado
2. Copie a **Internal Database URL** (começa com `postgres://`)
   - ⚠️ Use **Internal**, não a External

Deve parecer com:

```
postgres://postgres:sua_senha@10.0.0.100:5432/rkts_node_api
```

### 3️⃣ Configurar as variáveis de ambiente no Render

1. Vá para seu **Web Service** no Render
2. Clique em **Environment** no menu lateral
3. Adicione/modifique estas variáveis:

```env
NODE_ENV=production
DATABASE_CLIENT=pg
DATABASE_URL=postgres://postgres:sua_senha@seu-host:5432/rkts_node_api
PORT=3000
```

Substitua `sua_senha` e `seu-host` pelos valores copiados.

### 4️⃣ Configurar o Build Command

⚠️ **IMPORTANTE:** Defina as variáveis de ambiente NO build command para evitar erros!

O `render.yaml` já vem pré-configurado. Mas se precisar alterar manualmente:

1. Vá em **Build & Deploy**
2. Em **Build Command**, use SEMPRE este formato:

   **Sem migrações automáticas (recomendado):**

   ```bash
   NODE_ENV=production DATABASE_CLIENT=pg DATABASE_URL=postgres://build:build@localhost/build npm ci --only=production && npm run build
   ```

   **Com migrações automáticas:**

   ```bash
   NODE_ENV=production DATABASE_CLIENT=pg DATABASE_URL=postgres://build:build@localhost/build npm ci --only=production && npm run knex -- migrate:latest && npm run build
   ```

**Por que isso funciona?**

- ✅ Define as variáveis de ambiente DURANTE o build
- ✅ `npm ci --only=production` instala apenas dependências de produção
- ✅ Evita o erro de SQLite3 (`GLIBC_2.38` not found)
- ✅ Mais rápido que `npm install`
- ✅ Usa `package-lock.json` para versões exatas

### 5️⃣ Deploy

**Opção A - Automático (recomendado):**

1. Faça um `git push` para seu repositório
2. Render vai detectar e fazer o deploy automaticamente

**Opção B - Manual:**

1. Vá ao seu Web Service
2. Clique em **Manual Deploy** no topo
3. Escolha o branch `main`
4. Clique em **Deploy**

### 6️⃣ Aguardar o build

- Os logs aparecerão em tempo real
- ✅ Procure por: `Build successful`
- ❌ NÃO deve aparecer: "sqlite3" ou "GLIBC_2.38"
- ✅ Deve aparecer: "pg" (PostgreSQL)
- Sua aplicação estará disponível em: `https://seu-servico.onrender.com`

**Se ver erro de SQLite3:**

- Confirme que o Build Command tem as variáveis de ambiente inline
- Clique em **Manual Deploy** novamente
- Consulte [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🧪 Testar após o deploy

1. Acesse a URL da sua aplicação
2. Teste o endpoint: `https://seu-servico.onrender.com/transactions`
3. Verifique os logs se houver erros

---

## 🔄 Atualizando o banco de dados em produção

Se precisar rodar migrações manualmente:

1. Você pode usar o SSH fornecido pelo Render
2. Ou configurar o Build Command para rodar automaticamente

---

## 🛑 Troubleshooting

### ❌ "DATABASE_URL is required"

- Certifique-se de que a variável foi definida no Environment
- Clique em **Manual Deploy** após adicionar

### ❌ "Connection refused"

- Use a **Internal Database URL**, não a External
- Certifique-se de que o banco está no mesmo region

### ❌ "Migrations failed"

- Verifique se o PostgreSQL está criado
- Verifique os logs no Render

### ❌ "SQLite3 error"

- ✅ Você não deve ter nenhuma referência a SQLite em produção
- Verifique se `DATABASE_CLIENT=pg` está definido
- SQLite3 deve estar em `devDependencies` (já está)

---

## 💡 Dicas importantes

- ✅ **Sempre use PostgreSQL em produção**
- ✅ **SQLite3 é apenas para desenvolvimento local**
- ✅ **Nunca faça commit de `.env`** (já está em `.gitignore`)
- ✅ **Use `.env.example` como referência**
- ✅ **Teste tudo localmente antes de fazer push**

---

## 📞 Próximos passos

1. ✅ Database PostgreSQL criado
2. ✅ Variáveis de ambiente configuradas
3. ✅ Deploy em produção
4. 📝 Monitorar os logs
5. 🧪 Testar os endpoints

Se algo der errado, confira [TROUBLESHOOTING.md](TROUBLESHOOTING.md) 🆘
