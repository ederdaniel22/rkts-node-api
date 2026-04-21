import fastify from "fastify"

const app = fastify()

// Criar Rotas http
app.get("/hello", () => {
  return "Olá meu Deus, eu Vos amo de todo coração"
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Meu Deus meu Tudo")
  })
