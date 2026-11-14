import { supabase } from '@/lib/supabase'
import { formatDate, priceLabel, ratingColor } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'

export const revalidate = 0

async function getRestaurant(id: string) {
  const { data } = await supabase
    .from('restaurants')
    .select(`
      *,
      visits(id, visited_at, occasion, rating_overall, rating_food, notes,
        dishes(id, name))
    `)
    .eq('id', id)
    .order('visited_at', { referencedTable: 'visits', ascending: false })
    .single()
  return data
}

export default async function RestaurantPage({ params }: { params: { id: string } }) {
  const r: any = await getRestaurant(params.id)
  if (!r) notFound()

  const visits: any[] = r.visits ?? []
  const rated = visits.filter(v => v.rating_overall)
  const avg = rated.length
    ? rated.reduce((s, v) => s + Number(v.rating_overall), 0) / rated.length
    : null

  return (
    <div>
      <Link href="/restaurants" className="flex items-center gap-1 text-sm mb-5" style={{ color: '#8a8278' }}>
        <ArrowLeft size={15} /> Lugares
      </Link>

      <div className="card mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl mb-1">{r.name}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              {r.cuisine_type && <span className="tag">{r.cuisine_type}</span>}
              {r.price_range && <span className="tag">{priceLabel(r.price_range)}</span>}
              <span className="text-sm" style={{ color: '#8a8278' }}>
                {visits.length} visita{visits.length !== 1 ? 's' : ''}
              </span>
            </div>
            {r.address && (
              <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#8a8278' }}>
                <MapPin size={13} /> {r.address}
              </div>
            )}
            {r.notes && <p className="text-sm mt-3" style={{ color: '#c2bbb0' }}>{r.notes}</p>}
          </div>
          {avg != null && (
            <div className="text-right shrink-0">
              <div className="font-display text-4xl" style={{ color: '#c9a96e' }}>{avg.toFixed(1)}</div>
              <div className="text-xs" style={{ color: '#8a8278' }}>média</div>
            </div>
          )}
        </div>
      </div>

      <h2 className="font-display text-xl mb-3" style={{ color: '#c9a96e' }}>Visitas</h2>
      <div className="flex flex-col gap-3">
        {visits.map(v => (
          <Link key={v.id} href={`/visits/${v.id}`} className="card block hover:border-[#3a3630] transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>{formatDate(v.visited_at)}</span>
                  {v.occasion && <span className="tag tag-accent">{v.occasion}</span>}
                </div>
                {v.dishes?.length > 0 && (
                  <div className="mt-2 text-xs" style={{ color: '#8a8278' }}>
                    {v.dishes.slice(0, 4).map((d: any) => d.name).join(', ')}
                    {v.dishes.length > 4 ? '…' : ''}
                  </div>
                )}
                {v.notes && (
                  <p className="mt-2 text-sm line-clamp-2" style={{ color: '#c2bbb0' }}>{v.notes}</p>
                )}
              </div>
              {v.rating_overall && (
                <div className={`font-display text-2xl shrink-0 ${ratingColor(v.rating_overall)}`}>
                  {v.rating_overall}
                </div>
              )}
            </div>
          </Link>
        ))}
        {visits.length === 0 && (
          <div className="card text-center py-8" style={{ color: '#8a8278' }}>Nenhuma visita registrada.</div>
        )}
      </div>
    </div>
  )
}
