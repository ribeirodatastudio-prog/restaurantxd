export const OCCASIONS = [
  'Casual',
  'Date',
  'Aniversário',
  'Almoço de trabalho',
  'Jantar em família',
  'Comemoração',
  'Turismo',
] as const

export const DISH_CATEGORIES = [
  'Entrada',
  'Principal',
  'Sobremesa',
  'Drink',
  'Outro',
] as const

export const CUISINE_TYPES = [
  'Brasileira',
  'Italiana',
  'Japonesa',
  'Francesa',
  'Mexicana',
  'Indiana',
  'Árabe',
  'Chinesa',
  'Americana',
  'Mediterrânea',
  'Peruana',
  'Tailandesa',
  'Portuguesa',
  'Espanhola',
  'Outra',
]

export const RATING_OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

export function priceLabel(range: number | null) {
  if (!range) return '—'
  return 'R$'.repeat(range)
}

export function ratingColor(r: number | null) {
  if (!r) return 'text-gray-400'
  if (r >= 4) return 'text-emerald-500'
  if (r >= 3) return 'text-amber-500'
  return 'text-red-400'
}

export function formatDate(d: string) {
  return new Date(d + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// ⚡ Bolt Performance Optimization:
// Reduced O(N log N) sorting and O(N) array passes to a single O(N) loop.
// Impact: Prevents in-place mutation of the data array, and reduces calculation complexity
// significantly for large arrays by avoiding chained array methods.
export function calculateVisitStats(visits: any[]) {
  if (!visits || visits.length === 0) {
    return { visit_count: 0, avg_rating: null, last_visit: null }
  }

  let rating_sum = 0
  let rated_count = 0
  let last_visit: string | null = null

  for (let i = 0; i < visits.length; i++) {
    const v = visits[i]
    if (v.rating_overall != null) {
      rating_sum += v.rating_overall
      rated_count++
    }
    if (!last_visit || v.visited_at > last_visit) {
      last_visit = v.visited_at
    }
  }

  return {
    visit_count: visits.length,
    avg_rating: rated_count > 0 ? rating_sum / rated_count : null,
    last_visit
  }
}
