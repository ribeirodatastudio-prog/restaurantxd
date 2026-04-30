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

export function calculateVisitStats(visits: any[]) {
  if (!visits || visits.length === 0) {
    return { visit_count: 0, avg_rating: null, last_visit: null }
  }

  let count = 0
  let sumRating = 0
  let countRating = 0
  let lastVisit = visits[0].visited_at

  for (let i = 0; i < visits.length; i++) {
    const v = visits[i]
    count++
    if (v.rating_overall) {
      sumRating += v.rating_overall
      countRating++
    }
    if (v.visited_at > lastVisit) {
      lastVisit = v.visited_at
    }
  }

  return {
    visit_count: count,
    avg_rating: countRating > 0 ? sumRating / countRating : null,
    last_visit: lastVisit,
  }
}
