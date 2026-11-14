'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { formatDate, priceLabel } from '@/lib/utils'
import type { Restaurant } from '@/types'

// Remove acentos e caixa para a busca: "cafe" encontra "Café"
function normalize(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

export function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = normalize(query)
    if (!q) return restaurants
    return restaurants.filter(r => normalize(r.name).includes(q))
  }, [query, restaurants])

  return (
    <>
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: '#8a8278' }}
        />
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar pelo nome…"
          aria-label="Buscar restaurante pelo nome"
          style={{ paddingLeft: 36, paddingRight: query ? 36 : 14 }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: '#8a8278' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map(r => (
          <Link
            key={r.id}
            href={`/restaurants/${r.id}`}
            className="card block hover:border-[#3a3630] transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-display text-lg">{r.name}</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {r.cuisine_type && <span className="tag">{r.cuisine_type}</span>}
                  {r.price_range && <span className="tag">{priceLabel(r.price_range)}</span>}
                  <span className="text-sm" style={{ color: '#8a8278' }}>
                    {r.visit_count} visita{r.visit_count !== 1 ? 's' : ''}
                    {r.last_visit && ` · última em ${formatDate(r.last_visit)}`}
                  </span>
                </div>
                {r.address && (
                  <div className="text-xs mt-1" style={{ color: '#8a8278' }}>{r.address}</div>
                )}
              </div>
              {r.avg_rating != null && (
                <div className="font-display text-2xl shrink-0" style={{ color: '#c9a96e' }}>
                  {r.avg_rating.toFixed(1)}
                </div>
              )}
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="card text-center py-10" style={{ color: '#8a8278' }}>
            {restaurants.length === 0 ? (
              <>
                <p>Nenhum restaurante cadastrado ainda.</p>
                <p className="text-sm mt-1">Adicione sua primeira visita para começar.</p>
              </>
            ) : (
              <p>Nenhum lugar com “{query}”.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
