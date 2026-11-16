import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPersonWithVisits } from '@/lib/queries'
import { formatDate, ratingColor } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function PersonPage({ params }: { params: { id: string } }) {
  const person = await getPersonWithVisits(params.id)
  if (!person) notFound()

  const total = person.visits.length

  return (
    <div>
      <Link href="/people" className="flex items-center gap-1 text-sm mb-5 text-muted">
        <ArrowLeft size={15} /> Pessoas
      </Link>

      <div className="card mb-6">
        <h1 className="font-display text-3xl mb-1">{person.name}</h1>
        <div className="text-sm text-muted">
          {total} visita{total !== 1 ? 's' : ''} juntos · {person.places.length} lugar{person.places.length !== 1 ? 'es' : ''}
        </div>
        {person.notes && <p className="text-sm mt-3 text-soft">{person.notes}</p>}
      </div>

      {person.places.length > 0 && (
        <>
          <h2 className="font-display text-xl mb-3 text-accent">Lugares juntos</h2>
          <div className="flex flex-col gap-3 mb-8">
            {person.places.map(r => (
              <Link key={r.id} href={`/restaurants/${r.id}`} className="card block hover:border-line-strong transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-lg">{r.name}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {r.cuisine_type && <span className="tag">{r.cuisine_type}</span>}
                      <span className="text-sm text-muted">
                        {r.visit_count}x juntos
                        {r.last_visit && ` · última em ${formatDate(r.last_visit)}`}
                      </span>
                    </div>
                  </div>
                  {r.avg_rating != null && (
                    <div className="font-display text-2xl shrink-0 text-accent">{r.avg_rating.toFixed(1)}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <h2 className="font-display text-xl mb-3 text-accent">Visitas</h2>
          <div className="flex flex-col gap-3">
            {person.visits.map(v => (
              <Link key={v.id} href={`/visits/${v.id}`} className="card block hover:border-line-strong transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-lg">{v.restaurant_name ?? '—'}</div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap text-sm text-muted">
                      <span>{formatDate(v.visited_at)}</span>
                      {v.occasion && <span className="tag tag-accent">{v.occasion}</span>}
                    </div>
                    {v.dishes_ordered.length > 0 && (
                      <div className="mt-2 text-xs text-muted">Pediu: {v.dishes_ordered.join(', ')}</div>
                    )}
                  </div>
                  {v.rating_overall && (
                    <div className={`font-display text-2xl shrink-0 ${ratingColor(v.rating_overall)}`}>{v.rating_overall}</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {total === 0 && (
        <div className="card text-center py-10 text-muted">Nenhuma visita com {person.name} ainda.</div>
      )}
    </div>
  )
}
