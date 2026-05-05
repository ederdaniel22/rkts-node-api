import "dotenv/config"
import knexLib from "knex"
import type { Knex } from "knex"
import { env } from "./env"

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === "sqlite"
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,

  useNullAsDefault: true, // necessário para SQLite
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
}

// Lazy loading do knex para evitar erros durante build
let knexInstance: Knex | null = null

export function getKnex(): Knex {
  if (!knexInstance) {
    knexInstance = knexLib(config)
  }
  return knexInstance
}

// Para compatibilidade com código existente
export const knex = getKnex()
