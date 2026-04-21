import knexLib from "knex"

export const knex = knexLib({
  client: "sqlite3",
  connection: {
    filename: "./tmp/app.db",
  },
  useNullAsDefault: true, // necessário para SQLite
})
