# RestaurantXD 🍽️

Seu diário pessoal de restaurantes. Letterboxd mas para comida.

## Funcionalidades

- **Visitas** — registre cada ida a um restaurante com data, ocasião, notas e avaliações
- **Lugares** — restaurantes visitados, com busca por nome e página própria com todas as visitas
- **Pratos** — o que pediu, categoria, nota individual e quem pediu
- **Pessoas** — acompanhantes vinculados a visitas e pratos
- **Quero ir** — lista de lugares para visitar (sai da lista quando você registra uma visita)
- **Stats** — métricas das suas visitas
- **Login por senha** — o app inteiro fica protegido

## Stack

Next.js 14 (App Router) · Postgres no [Neon](https://neon.tech) · Tailwind · deploy na Vercel.

Todo acesso ao banco acontece no servidor (server components + server actions). O navegador nunca vê a conexão com o banco.

## Variáveis de ambiente

| Variável | O que é |
|---|---|
| `DATABASE_URL` | String de conexão do Neon (use a versão *pooled*) |
| `APP_PASSWORD` | Senha para entrar no app. Trocar a senha desloga todo mundo. |

Copie `.env.example` para `.env.local` para rodar localmente.

## Rodando localmente

```bash
npm install
npm run dev
```

## Banco de dados

- Schema: `db/schema.sql`
- Para criar um banco vazio: `psql "$DATABASE_URL" -f db/schema.sql`

### Migração do Supabase para o Neon (uma vez só)

O script `scripts/migrate.mjs` cria as tabelas no Neon e copia todos os dados do Supabase, mantendo os mesmos IDs. Ele só lê o Supabase, roda numa transação e confere as contagens no final.

```bash
SOURCE_URL="<conexão do Supabase>" TARGET_URL="<conexão do Neon>" node scripts/migrate.mjs
```

- **SOURCE_URL**: no Supabase, *Connect → Session pooler* (o projeto precisa estar ativo, não pausado).
- **TARGET_URL**: no Neon, *Connect → Connection string*.

## Estrutura

```
app/
  actions.ts        — server actions (gravações + login/logout)
  page.tsx          — lista de visitas (paginada)
  login/            — tela de senha
  new-visit/        — formulário de nova visita
  visits/[id]/      — detalhe de uma visita
  restaurants/      — lugares visitados + busca
  restaurants/[id]/ — página de um restaurante
  wishlist/         — quero ir
  stats/            — estatísticas
  people/           — acompanhantes
components/         — Nav, StarRating
lib/
  db.ts             — conexão com o Postgres (só servidor)
  queries.ts        — leituras do banco
  auth.ts           — sessão por senha
  utils.ts          — utilitários
middleware.ts       — exige login em todas as páginas
db/schema.sql       — schema do banco
scripts/migrate.mjs — migração Supabase → Neon
```
