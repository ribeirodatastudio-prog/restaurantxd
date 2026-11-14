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

export const CUISINE_TYPES: string[] = [
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

export const RATING_OPTIONS: number[] = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

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

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID_RE.test(value)
}

/** Remove acentos e caixa, para buscas: "cafe" encontra "Café" */
export function normalizeText(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}
