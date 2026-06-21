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
    let sumRating = 0;
    let countRating = 0;
    let lastVisit: string | null = null;

    // Single pass to calculate averages and find the latest date
    // This avoids O(N log N) sorting overhead and redundant iterations
    if (r.visits && Array.isArray(r.visits)) {
      for (let i = 0; i < r.visits.length; i++) {
        const v = r.visits[i];
        if (v.rating_overall != null) {
          sumRating += v.rating_overall;
          countRating++;
        }
        if (v.visited_at != null) {
          if (!lastVisit || v.visited_at.localeCompare(lastVisit) > 0) {
            lastVisit = v.visited_at;
          }
        }
      }
    }

    return {
      ...r,
      visit_count: r.visits?.length ?? 0,
      avg_rating: countRating > 0 ? sumRating / countRating : null,
      last_visit: lastVisit,
    };
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
