import { supabase } from '@/lib/supabase'
import { priceLabel } from '@/lib/utils'
import Link from 'next/link'

export const revalidate = 0

async function getRestaurants() {
  const { data } = await supabase
    .from('restaurants')
    .select(`
      id, name, cuisine_type, price_range, address,
      visits(id, visited_at, rating_overall)
    `)
    .eq('wishlist', false)
    .order('name')

  return (data ?? []).map((r: any) => {
    let visit_count = 0
    let rating_sum = 0
    let rated_count = 0
    let last_visit: string | null = null

    if (r.visits) {
      visit_count = r.visits.length
      for (const v of r.visits) {
        if (v.rating_overall) {
          rating_sum += v.rating_overall
          rated_count++
        }
        if (v.visited_at) {
          if (!last_visit || v.visited_at.localeCompare(last_visit) > 0) {
            last_visit = v.visited_at
          }
        }
      }
    }

    return {
      ...r,
      visit_count,
      avg_rating: rated_count > 0 ? rating_sum / rated_count : null,
      last_visit,
    }
  })
}

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl" style={{ color: '#c9a96e' }}>Lugares</h1>
        <span className="text-sm" style={{ color: '#8a8278' }}>{restaurants.length} lugares</span>
      </div>

      <div className="flex flex-col gap-3">
        {restaurants.map((r: any) => (
          <div key={r.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-lg">{r.name}</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {r.cuisine_type && <span className="tag">{r.cuisine_type}</span>}
                  {r.price_range && <span className="tag">{priceLabel(r.price_range)}</span>}
                  <span className="text-sm" style={{ color: '#8a8278' }}>
                    {r.visit_count} visita{r.visit_count !== 1 ? 's' : ''}
                  </span>
                </div>
                {r.address && (
                  <div className="text-xs mt-1" style={{ color: '#8a8278' }}>{r.address}</div>
                )}
              </div>
              {r.avg_rating && (
                <div className="font-display text-2xl shrink-0" style={{ color: '#c9a96e' }}>
                  {r.avg_rating.toFixed(1)}
                </div>
              )}
            </div>
          </div>
        ))}

        {restaurants.length === 0 && (
          <div className="card text-center py-10" style={{ color: '#8a8278' }}>
            <p>Nenhum restaurante cadastrado ainda.</p>
            <p className="text-sm mt-1">Adicione sua primeira visita para começar.</p>
          </div>
        )}
      </div>
    </div>
  )
}
