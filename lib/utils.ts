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

/**
 * Calculates visit statistics (count, avg rating, last visit date)
 * in a single O(N) pass, preventing array mutation and O(N log N) sorting.
 */
export function calculateVisitStats(visits: any[] | undefined | null) {
  if (!visits || visits.length === 0) {
    return { visit_count: 0, avg_rating: null, last_visit: null }
  }

  let totalRating = 0
  let ratingCount = 0
  let lastVisitDate: string | null = null

  for (const visit of visits) {
    if (visit.rating_overall) {
      totalRating += visit.rating_overall
      ratingCount++
    }

    if (visit.visited_at) {
      if (!lastVisitDate || visit.visited_at > lastVisitDate) {
        lastVisitDate = visit.visited_at
      }
    }
  }

  return {
    visit_count: visits.length,
    avg_rating: ratingCount > 0 ? totalRating / ratingCount : null,
    last_visit: lastVisitDate,
  }
}
