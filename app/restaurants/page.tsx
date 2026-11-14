import { supabase } from '@/lib/supabase'
import type { Restaurant } from '@/types'
import { RestaurantList } from './RestaurantList'

export const revalidate = 0

async function getRestaurants(): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, visits(visited_at, rating_overall)')
    .eq('wishlist', false)
    .order('name')
  if (error) throw new Error(`Erro ao carregar restaurantes: ${error.message}`)

  return (data ?? []).map((r: any) => {
    const visits: { visited_at: string | null; rating_overall: number | null }[] = r.visits ?? []
    let sum = 0
    let count = 0
    let last: string | null = null
    for (const v of visits) {
      if (v.rating_overall) {
        sum += Number(v.rating_overall)
        count++
      }
      if (v.visited_at && (!last || v.visited_at > last)) last = v.visited_at
    }
    const { visits: _omit, ...rest } = r
    return {
      ...rest,
      visit_count: visits.length,
      avg_rating: count > 0 ? sum / count : null,
      last_visit: last,
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
      <RestaurantList restaurants={restaurants} />
    </div>
  )
}
