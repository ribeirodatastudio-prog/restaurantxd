// Copia todos os dados do Supabase para o Neon.
//
// Uso (na pasta do projeto, depois de `npm install`):
//   SOURCE_URL="postgresql://...supabase..." TARGET_URL="postgresql://...neon..." node scripts/migrate.mjs
//
// - Cria as tabelas no Neon (db/schema.sql), se ainda não existirem.
// - Copia as 6 tabelas mantendo os mesmos IDs, então os links continuam válidos.
// - Tudo numa transação: se algo falhar, o Neon fica como estava.
// - Não altera nada no Supabase (só leitura).
// - Recusa rodar se o Neon já tiver dados, para não duplicar.

import { readFileSync } from 'node:fs'
import pg from 'pg'

const { SOURCE_URL, TARGET_URL } = process.env
if (!SOURCE_URL || !TARGET_URL) {
  console.error('Defina SOURCE_URL (Supabase) e TARGET_URL (Neon).')
  process.exit(1)
}

// Lê datas, timestamps e numéricos como texto, para não haver conversão de fuso ou arredondamento
for (const oid of [1082, 1114, 1184, 1700]) pg.types.setTypeParser(oid, v => v)

// Ordem respeita as chaves estrangeiras
const TABLES = ['restaurants', 'people', 'visits', 'dishes', 'visit_people', 'dish_people']

const ssl = url => (/localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: false })
const source = new pg.Client({ connectionString: SOURCE_URL, ssl: ssl(SOURCE_URL) })
const target = new pg.Client({ connectionString: TARGET_URL, ssl: ssl(TARGET_URL) })

async function count(client, table) {
  const { rows } = await client.query(`select count(*)::int as n from public.${table}`)
  return rows[0].n
}

try {
  await source.connect()
  await target.connect()

  await target.query(readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'))

  for (const t of TABLES) {
    if ((await count(target, t)) > 0) {
      throw new Error(`A tabela "${t}" no Neon já tem dados. Use um banco vazio para migrar.`)
    }
  }

  await target.query('begin')
  for (const t of TABLES) {
    const { rows } = await source.query(`select * from public.${t}`)
    if (rows.length) {
      // json_populate_recordset converte cada objeto para o tipo da tabela de destino
      await target.query(
        `insert into public.${t} select * from json_populate_recordset(null::public.${t}, $1::json)`,
        [JSON.stringify(rows)],
      )
    }
    console.log(`${t.padEnd(13)} ${rows.length} linhas copiadas`)
  }
  await target.query('commit')

  console.log('\nConferindo contagens…')
  let ok = true
  for (const t of TABLES) {
    const [a, b] = [await count(source, t), await count(target, t)]
    const match = a === b
    ok &&= match
    console.log(`${t.padEnd(13)} Supabase ${a} · Neon ${b} ${match ? '✓' : '✗'}`)
  }
  console.log(ok ? '\nMigração concluída. Tudo bateu.' : '\nATENÇÃO: contagens diferentes.')
  process.exitCode = ok ? 0 : 1
} catch (err) {
  await target.query('rollback').catch(() => {})
  console.error('\nErro na migração (nada foi gravado no Neon):', err.message)
  process.exitCode = 1
} finally {
  await source.end().catch(() => {})
  await target.end().catch(() => {})
}
