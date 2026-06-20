import { supabase } from '@/lib/supabase'
import { ratingColor } from '@/lib/utils'

export const revalidate = 0

async function getStats() {
  const [{ data: visits }, { data: dishes }, { count: totalRestaurants }] = await Promise.all([
    supabase.from('visits').select('id, visited_at, rating_overall, restaurant:restaurants(name, cuisine_type)'),
    supabase.from('dishes').select('would_order_again'),
    supabase.from('restaurants').select('id', { count: 'exact', head: true }).eq('wishlist', false),
  ])

  const v = visits ?? []
  const d = dishes ?? []

  const totalVisits = v.length
  const totalDishes = d.length
  const totalPlaces = totalRestaurants ?? 0

  let ratedCount = 0
  let ratingSum = 0
  const ratedVisits = []
  const cuisineCount: Record<string, number> = {}

  for (let i = 0; i < v.length; i++) {
    const x = v[i]
    if (x.rating_overall) {
      ratedCount++
      ratingSum += x.rating_overall
      ratedVisits.push(x)
    }

    const restaurant = Array.isArray(x.restaurant) ? x.restaurant[0] : x.restaurant
    const c = restaurant?.cuisine_type ?? 'Outra'
    cuisineCount[c] = (cuisineCount[c] ?? 0) + 1
  }

  const avgRating = ratedCount > 0 ? ratingSum / ratedCount : null

  // Top rated visits
  const topVisits = ratedVisits
    .sort((a: any, b: any) => b.rating_overall - a.rating_overall)
    .slice(0, 5)

  // Culinária mais visitada
  const topCuisines = Object.entries(cuisineCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Pratos mais pedidos (quem pediria de novo)
  let wouldOrder = 0
  let wouldNotOrder = 0
  for (let i = 0; i < d.length; i++) {
    const x = d[i]
    if (x.would_order_again) {
      wouldOrder++
    } else if (x.would_order_again === false) {
      wouldNotOrder++
    }
  }

  return { totalVisits, totalDishes, totalRestaurants: totalPlaces, avgRating, topVisits, topCuisines, wouldOrder, wouldNotOrder }
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card text-center">
      <div className="font-display text-4xl mb-1" style={{ color: '#c9a96e' }}>{value}</div>
      <div className="text-sm" style={{ color: '#8a8278' }}>{label}</div>
    </div>
  )
}

export default async function StatsPage() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="font-display text-3xl mb-6" style={{ color: '#c9a96e' }}>Estatísticas</h1>

      <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
        <StatCard label="Visitas" value={stats.totalVisits} />
        <StatCard label="Lugares" value={stats.totalRestaurants} />
        <StatCard label="Pratos" value={stats.totalDishes} />
        <StatCard label="Média geral" value={stats.avgRating ? stats.avgRating.toFixed(1) : '—'} />
      </div>

      {stats.topVisits.length > 0 && (
        <div className="card mb-4">
          <h2 className="font-display text-lg mb-3" style={{ color: '#c9a96e' }}>Melhores visitas</h2>
          {stats.topVisits.map((v: any, i) => {
            const restaurant = Array.isArray(v.restaurant) ? v.restaurant[0] : v.restaurant;
            return (
              <div key={v.id} className="flex items-center justify-between py-2"
                style={{ borderBottom: i < stats.topVisits.length - 1 ? '1px solid #2a2622' : 'none' }}>
                <div>
                  <div className="font-medium">{restaurant?.name}</div>
                  <div className="text-xs" style={{ color: '#8a8278' }}>{v.visited_at}</div>
                </div>
                <div className={`font-display text-xl ${ratingColor(v.rating_overall)}`}>{v.rating_overall}</div>
              </div>
            );
          })}
        </div>
      )}

      {stats.topCuisines.length > 0 && (
        <div className="card mb-4">
          <h2 className="font-display text-lg mb-3" style={{ color: '#c9a96e' }}>Cozinhas favoritas</h2>
          {stats.topCuisines.map(([cuisine, count], i) => (
            <div key={cuisine} className="flex items-center justify-between py-2"
              style={{ borderBottom: i < stats.topCuisines.length - 1 ? '1px solid #2a2622' : 'none' }}>
              <span>{cuisine}</span>
              <div className="flex items-center gap-2">
                <div style={{
                  width: `${Math.round((count / stats.totalVisits) * 100)}px`,
                  height: 6, background: '#c9a96e', borderRadius: 3, opacity: 0.7
                }} />
                <span className="text-sm" style={{ color: '#8a8278' }}>{count}x</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {(stats.wouldOrder + stats.wouldNotOrder) > 0 && (
        <div className="card">
          <h2 className="font-display text-lg mb-3" style={{ color: '#c9a96e' }}>Pediria de novo?</h2>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: '#2a2622' }}>
              <div style={{
                width: `${Math.round(stats.wouldOrder / (stats.wouldOrder + stats.wouldNotOrder) * 100)}%`,
                height: '100%', background: '#10b981', borderRadius: 999
              }} />
            </div>
            <span className="text-sm" style={{ color: '#10b981' }}>{stats.wouldOrder} sim</span>
            <span className="text-sm" style={{ color: '#ef4444' }}>{stats.wouldNotOrder} não</span>
          </div>
        </div>
      )}
    </div>
  )
}
