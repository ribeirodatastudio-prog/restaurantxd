# RestaurantXD 🍽️

Seu diário pessoal de restaurantes. Letterboxd mas para comida.

## Setup

### 1. Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em **SQL Editor** e cole o conteúdo de `supabase-schema.sql` e execute
4. Vá em **Project Settings → API** e copie:
   - `Project URL`
   - `anon public` key

### 2. Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### 3. Rodar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

### 4. Deploy no Vercel

1. Suba o projeto para um repositório GitHub
2. Importe no [vercel.com](https://vercel.com)
3. Adicione as mesmas variáveis de ambiente no painel do Vercel
4. Deploy automático ✓

## Funcionalidades

- **Visitas** — registre cada ida a um restaurante com data, ocasião, notas e avaliações
- **Restaurantes** — cadastro automático ao adicionar visita, com tipo de cozinha e faixa de preço
- **Pratos** — adicione o que pediu, categoria, nota individual e quem pediu
- **Pessoas** — cadastre acompanhantes e vincule a visitas e pratos
- **Quero ir** — wishlist de lugares para visitar
- **Stats** — métricas das suas visitas

## Estrutura do projeto

```
app/
  page.tsx          — lista de visitas
  new-visit/        — formulário de nova visita
  visits/[id]/      — detalhe de uma visita
  restaurants/      — lista de lugares visitados
  wishlist/         — lugares que quer ir
  stats/            — estatísticas
  people/           — gerenciar acompanhantes
components/
  Nav.tsx           — navegação
  StarRating.tsx    — componente de estrelas (0.5 a 0.5)
lib/
  supabase.ts       — cliente Supabase
  utils.ts          — utilitários
types/
  index.ts          — tipos TypeScript
supabase-schema.sql — schema do banco de dados
```
