import { getStats } from '@/lib/queries'
import { formatDate, ratingColor } from '@/lib/utils'

export const dynamic = 'force-dynamic'

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card text-center">
      <div className="font-display text-4xl mb-1 text-accent">{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  )
}

export default async function StatsPage() {
  const stats = await getStats()
  const orderTotal = stats.wouldOrder + stats.wouldNotOrder

  return (
    <div>
      <h1 className="font-display text-3xl mb-6 text-accent">Estatísticas</h1>

      <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
        <StatCard label="Visitas" value={stats.totalVisits} />
        <StatCard label="Lugares" value={stats.totalRestaurants} />
        <StatCard label="Pratos" value={stats.totalDishes} />
        <StatCard label="Média geral" value={stats.avgRating != null ? stats.avgRating.toFixed(1) : '—'} />
      </div>

      {stats.topVisits.length > 0 && (
        <div className="card mb-4">
          <h2 className="font-display text-lg mb-3 text-accent">Melhores visitas</h2>
          {stats.topVisits.map(v => (
            <div key={v.id} className="flex items-center justify-between py-2 border-b border-line last:border-b-0">
              <div>
                <div className="font-medium">{v.restaurant_name}</div>
                <div className="text-xs text-muted">{formatDate(v.visited_at)}</div>
              </div>
              <div className={`font-display text-xl ${ratingColor(v.rating_overall)}`}>{v.rating_overall}</div>
            </div>
          ))}
        </div>
      )}

      {stats.topCuisines.length > 0 && (
        <div className="card mb-4">
          <h2 className="font-display text-lg mb-3 text-accent">Cozinhas favoritas</h2>
          {stats.topCuisines.map(({ cuisine, count }) => (
            <div key={cuisine} className="flex items-center justify-between py-2 border-b border-line last:border-b-0">
              <span>{cuisine}</span>
              <div className="flex items-center gap-2">
                <div
                  className="bg-accent opacity-70 rounded"
                  style={{ width: Math.round((count / stats.totalVisits) * 100), height: 6 }}
                />
                <span className="text-sm text-muted">{count}x</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {orderTotal > 0 && (
        <div className="card">
          <h2 className="font-display text-lg mb-3 text-accent">Pediria de novo?</h2>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 rounded-full overflow-hidden bg-line">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${Math.round((stats.wouldOrder / orderTotal) * 100)}%` }}
              />
            </div>
            <span className="text-sm text-emerald-500">{stats.wouldOrder} sim</span>
            <span className="text-sm text-red-500">{stats.wouldNotOrder} não</span>
          </div>
        </div>
      )}
    </div>
  )
}
