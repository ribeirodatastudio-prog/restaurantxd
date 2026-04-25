import { supabase } from '@/lib/supabase'
import { formatDate, priceLabel } from '@/lib/utils'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export const revalidate = 0

async function getVisits() {
  const { data } = await supabase
    .from('visits')
    .select(`
      *,
      restaurant:restaurants(id, name, cuisine_type, price_range),
      people:visit_people(person:people(id, name)),
      dishes(id, name, category, rating)
    `)
    .order('visited_at', { ascending: false })
  return (data ?? []).map((v: any) => ({
    ...v,
    people: v.people?.map((p: any) => p.person) ?? [],
  }))
}

export default async function HomePage() {
  const visits = await getVisits()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl" style={{ color: '#c9a96e' }}>Visitas</h1>
        <Link href="/new-visit" className="btn btn-primary">
          <Plus size={16} /> Nova visita
        </Link>
      </div>

      {visits.length === 0 && (
        <div className="card text-center py-12" style={{ color: '#8a8278' }}>
          <p className="font-display text-2xl mb-2">Nenhuma visita ainda</p>
          <p className="text-sm">Adicione sua primeira experiência</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {visits.map((visit: any) => (
          <Link key={visit.id} href={`/visits/${visit.id}`} className="card hover:border-[#3a3630] transition-colors block">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display text-lg leading-tight">
                    {visit.restaurant?.name ?? '—'}
                  </span>
                  {visit.restaurant?.price_range && (
                    <span className="tag text-xs">{priceLabel(visit.restaurant.price_range)}</span>
                  )}
                  {visit.occasion && (
                    <span className="tag tag-accent">{visit.occasion}</span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-sm" style={{ color: '#8a8278' }}>{formatDate(visit.visited_at)}</span>
                  {visit.restaurant?.cuisine_type && (
                    <span className="text-sm" style={{ color: '#8a8278' }}>{visit.restaurant.cuisine_type}</span>
                  )}
                </div>

                {visit.people.length > 0 && (
                  <div className="mt-2 flex gap-1.5 flex-wrap">
                    {visit.people.map((p: any) => (
                      <span key={p.id} className="tag">{p.name}</span>
                    ))}
                  </div>
                )}

                {visit.dishes && visit.dishes.length > 0 && (
                  <div className="mt-2 text-xs" style={{ color: '#8a8278' }}>
                    {visit.dishes.length} prato{visit.dishes.length !== 1 ? 's' : ''}: {
                      visit.dishes.slice(0, 3).map((d: any) => d.name).join(', ')
                    }{visit.dishes.length > 3 ? '…' : ''}
                  </div>
                )}
              </div>

              {visit.rating_overall && (
                <div className="text-right shrink-0">
                  <div className="font-display text-2xl" style={{ color: '#c9a96e' }}>
                    {visit.rating_overall}
                  </div>
                  <div className="text-xs" style={{ color: '#8a8278' }}>geral</div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
