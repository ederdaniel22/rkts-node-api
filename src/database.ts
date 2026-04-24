import "dotenv/config"
import knexLib from "knex"
import type { Knex } from "knex"
import { env } from "./env"

export const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true, // necessário para SQLite
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
}

export const knex = knexLib(config)
