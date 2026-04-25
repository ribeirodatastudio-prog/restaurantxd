# RestaurantXD 🍽️

Seu diário pessoal de restaurantes. Letterboxd mas para comida.

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
