import { expect, it, beforeAll, afterAll, describe, beforeEach } from "vitest"
import { execSync } from "node:child_process"
import request from "supertest"
import { app } from "../src/app"

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // Apagar o BD e criar novamente
  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all")
    execSync("npm run knex migrate:latest")
  })

  // Testar a criação de transactions
  it("Should be able to create a new transaction", async () => {
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

  // Testar a listagem de transações

  it("Should be able to list all transactions ", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transactions",
        amount: 5000,
        type: "credit",
      })
    // SessionId
    const cookies = createTransactionResponse.get("Set-Cookie")

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies!)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "New Transactions",
        amount: 5000,
      }),
    ])
  })

  // Testar a criação de transactions
  it("Should be able to create a new transaction", async () => {
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

  // Testar a listagem de transações

  it("Should be able to get a specific transaction ", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transactions",
        amount: 5000,
        type: "credit",
      })
    // SessionId
    const cookies = createTransactionResponse.get("Set-Cookie")

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies!)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies!)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "New Transactions",
        amount: 5000,
      }),
    )
  })
  it("Should be able to get the summary ", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "Credit Transaction",
        amount: 5000,
        type: "credit",
      })
    // SessionId
    const cookies = createTransactionResponse.get("Set-Cookie")

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies!)
      .send({
        title: "Debit transaction",
        amount: 2000,
        type: "debit",
      })

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies!)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
