import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getVisits } from '@/lib/queries'
import { formatDate, priceLabel } from '@/lib/utils'
import { VisitSearch } from './VisitSearch'

export const dynamic = 'force-dynamic'

export default async function HomePage({ searchParams }: { searchParams: { page?: string; q?: string } }) {
  const page = Math.max(1, Number.parseInt(searchParams.page ?? '1', 10) || 1)
  const q = (searchParams.q ?? '').trim().substring(0, 100)
  const { visits, hasMore } = await getVisits(page, q)
  const pageHref = (n: number) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (n > 1) params.set('page', String(n))
    const s = params.toString()
    return s ? `/?${s}` : '/'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-accent">Visitas</h1>
        <Link href="/new-visit" className="btn btn-primary">
          <Plus size={16} /> Nova visita
        </Link>
      </div>

      <VisitSearch initialQuery={q} />

      {visits.length === 0 && page === 1 && q && (
        <div className="card text-center py-10 text-muted">
          <p>Nenhuma visita com “{q}”.</p>
        </div>
      )}

      {visits.length === 0 && page === 1 && !q && (
        <div className="card text-center py-12 text-muted">
          <p className="font-display text-2xl mb-2">Nenhuma visita ainda</p>
          <p className="text-sm">Adicione sua primeira experiência</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {visits.map(visit => (
          <Link key={visit.id} href={`/visits/${visit.id}`} className="card hover:border-line-strong transition-colors block">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display text-lg leading-tight">{visit.restaurant?.name ?? '—'}</span>
                  {visit.restaurant?.price_range && (
                    <span className="tag text-xs">{priceLabel(visit.restaurant.price_range)}</span>
                  )}
                  {visit.occasion && <span className="tag tag-accent">{visit.occasion}</span>}
                </div>

                <div className="flex items-center gap-3 mt-1 flex-wrap text-sm text-muted">
                  <span>{formatDate(visit.visited_at)}</span>
                  {visit.restaurant?.cuisine_type && <span>{visit.restaurant.cuisine_type}</span>}
                </div>

                {visit.people.length > 0 && (
                  <div className="mt-2 flex gap-1.5 flex-wrap">
                    {visit.people.map(p => <span key={p.id} className="tag">{p.name}</span>)}
                  </div>
                )}

                {visit.dish_names.length > 0 && (
                  <div className="mt-2 text-xs text-muted">
                    {visit.dish_names.length} prato{visit.dish_names.length !== 1 ? 's' : ''}:{' '}
                    {visit.dish_names.slice(0, 3).join(', ')}
                    {visit.dish_names.length > 3 ? '…' : ''}
                  </div>
                )}
              </div>

              {(visit.rating_overall || visit.rating_food) && (
                <div className="text-right shrink-0 flex flex-col items-end">
                  {visit.rating_overall && (
                    <>
                      <div className="font-display text-2xl text-accent">{visit.rating_overall}</div>
                      <div className="text-xs text-muted">geral</div>
                    </>
                  )}
                  {visit.rating_food && (
                    <div className="mt-2">
                      <div className="font-display text-lg text-ink">{visit.rating_food}</div>
                      <div className="text-xs text-muted">comida</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {(page > 1 || hasMore) && (
        <div className="flex justify-between mt-6">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="btn btn-ghost">← Mais recentes</Link>
          ) : <span />}
          {hasMore && <Link href={pageHref(page + 1)} className="btn btn-ghost">Mais antigas →</Link>}
        </div>
      )}
    </div>
  )
}
