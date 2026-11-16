import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import { getRestaurantWithVisits } from '@/lib/queries'
import { formatDate, priceLabel, ratingColor } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const data = await getRestaurantWithVisits(params.id)
  if (!data) notFound()
  const { restaurant: r, visits } = data

  const rated = visits.filter(v => v.rating_overall != null)
  const avg = rated.length ? rated.reduce((s, v) => s + (v.rating_overall ?? 0), 0) / rated.length : null

  return (
    <div>
      <Link href="/restaurants" className="flex items-center gap-1 text-sm mb-5 text-muted">
        <ArrowLeft size={15} /> Lugares
      </Link>

      <div className="card mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl mb-1">{r.name}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              {r.cuisine_type && <span className="tag">{r.cuisine_type}</span>}
              {r.price_range && <span className="tag">{priceLabel(r.price_range)}</span>}
              <span className="text-sm text-muted">
                {visits.length} visita{visits.length !== 1 ? 's' : ''}
              </span>
            </div>
            {r.address && (
              <div className="flex items-center gap-1 mt-2 text-sm text-muted">
                <MapPin size={13} /> {r.address}
              </div>
            )}
            {r.notes && <p className="text-sm mt-3 text-soft">{r.notes}</p>}
          </div>
          {avg != null && (
            <div className="text-right shrink-0">
              <div className="font-display text-4xl text-accent">{avg.toFixed(1)}</div>
              <div className="text-xs text-muted">média</div>
            </div>
          )}
        </div>
      </div>

      <h2 className="font-display text-xl mb-3 text-accent">Visitas</h2>
      <div className="flex flex-col gap-3">
        {visits.map(v => (
          <Link key={v.id} href={`/visits/${v.id}`} className="card block hover:border-line-strong transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>{formatDate(v.visited_at)}</span>
                  {v.occasion && <span className="tag tag-accent">{v.occasion}</span>}
                </div>
                {v.dish_names.length > 0 && (
                  <div className="mt-2 text-xs text-muted">
                    {v.dish_names.slice(0, 4).join(', ')}
                    {v.dish_names.length > 4 ? '…' : ''}
                  </div>
                )}
                {v.notes && <p className="mt-2 text-sm line-clamp-2 text-soft">{v.notes}</p>}
              </div>
              {v.rating_overall && (
                <div className={`font-display text-2xl shrink-0 ${ratingColor(v.rating_overall)}`}>{v.rating_overall}</div>
              )}
            </div>
          </Link>
        ))}
        {visits.length === 0 && (
          <div className="card text-center py-8 text-muted">Nenhuma visita registrada.</div>
        )}
      </div>
    </div>
  )
}
