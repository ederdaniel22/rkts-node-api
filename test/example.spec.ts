import { test, beforeAll, afterAll } from "vitest"
import request from "supertest"
import { app } from "../src/app"

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test("o usuário consegue criar uma nova transação", async () => {
  // Fazer a chamada HTTP para criar uma nova transação
  await request(app.server)
    .post("/transactions")
    .send({
      title: "New Transactions",
      amount: 5000,
      type: "credit",
    })

    // Validação: conclusão e resultado
    .expect(201)
})
