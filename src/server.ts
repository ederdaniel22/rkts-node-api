import fastify from "fastify"
import { knex } from "./database.js"
import { env } from "./env"

const app = fastify()

// Criar Rotas http
app.get("/hello", async () => {
  const transactions = await knex("transactions")
    .where("amount", 1000)
    .select("*")
  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log("Meu Deus meu Tudo")
  })
