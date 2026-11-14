import 'server-only'
import postgres from 'postgres'

// Uma conexão por instância do servidor (reaproveitada entre requisições e no hot reload).
const globalForDb = globalThis as unknown as { sql?: postgres.Sql }

function connect() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL não está definida')
  return postgres(url, {
    prepare: false, // necessário com o pooler (PgBouncer) do Neon
    max: 5,
    idle_timeout: 20,
  })
}

export function db() {
  if (!globalForDb.sql) globalForDb.sql = connect()
  return globalForDb.sql
}
