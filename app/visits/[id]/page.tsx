import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Utensils } from 'lucide-react'
import { getVisit } from '@/lib/queries'
import { DISH_CATEGORIES, formatDate, priceLabel, ratingColor } from '@/lib/utils'
import { DeleteVisitButton } from './DeleteVisitButton'

export const dynamic = 'force-dynamic'

function RatingRow({ label, value }: { label: string; value: number | null }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between py-2 border-b border-line">
      <span className="text-sm text-muted">{label}</span>
      <span className={`font-display text-lg ${ratingColor(value)}`}>{value}</span>
    </div>
  )
}

export default async function VisitPage({ params }: { params: { id: string } }) {
  const visit = await getVisit(params.id)
  if (!visit) notFound()

  const byCategory = DISH_CATEGORIES.map(cat => ({
    cat,
    dishes: visit.dishes.filter(d => d.category === cat || (!d.category && cat === 'Outro')),
  })).filter(g => g.dishes.length > 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <Link href="/" className="flex items-center gap-1 text-sm text-muted">
          <ArrowLeft size={15} /> Voltar
        </Link>
        <DeleteVisitButton id={visit.id} />
      </div>

      {/* Cabeçalho */}
      <div className="card mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl mb-1 text-ink">
              {visit.restaurant?.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-muted">{formatDate(visit.visited_at)}</span>
              {visit.occasion && <span className="tag tag-accent">{visit.occasion}</span>}
              {visit.restaurant?.cuisine_type && (
                <span className="tag">{visit.restaurant.cuisine_type}</span>
              )}
              {visit.restaurant?.price_range && (
                <span className="tag">{priceLabel(visit.restaurant.price_range)}</span>
              )}
            </div>

            {visit.restaurant?.address && (
              <div className="flex items-center gap-1 mt-2 text-sm text-muted">
                <MapPin size={13} /> {visit.restaurant.address}
              </div>
            )}

            {visit.people.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {visit.people.map(p => <span key={p.id} className="tag">{p.name}</span>)}
              </div>
            )}
          </div>

          {visit.rating_overall && (
            <div className="text-center shrink-0">
              <div className="font-display text-5xl text-accent">
                {visit.rating_overall}
              </div>
              <div className="text-xs text-muted">/ 5</div>
            </div>
          )}
        </div>

        {visit.notes && (
          <>
            <hr className="divider" />
            <p className="text-sm leading-relaxed text-soft">{visit.notes}</p>
          </>
        )}
      </div>

      {/* Avaliações detalhadas */}
      {(visit.rating_food || visit.rating_service || visit.rating_ambience) && (
        <div className="card mb-4">
          <h2 className="font-display text-lg mb-2 text-accent">Avaliações</h2>
          <RatingRow label="Comida" value={visit.rating_food} />
          <RatingRow label="Atendimento" value={visit.rating_service} />
          <RatingRow label="Ambiente" value={visit.rating_ambience} />
        </div>
      )}

      {/* Pratos */}
      {visit.dishes.length > 0 && (
        <div className="card mb-4">
          <h2 className="font-display text-lg mb-4 text-accent">
            <Utensils size={16} className="inline mr-2" />
            Pratos
          </h2>

          {byCategory.map(({ cat, dishes }) => (
            <div key={cat} className="mb-4">
              <div className="text-xs font-medium mb-2 uppercase tracking-wider text-muted">{cat}</div>
              <div className="flex flex-col gap-2">
                {dishes.map(dish => (
                  <div key={dish.id} className="flex items-start justify-between gap-3 py-2 border-b border-line">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium">{dish.name}</span>
                        {dish.would_order_again === true && (
                          <span className="tag tag-accent text-xs">✓ pediria de novo</span>
                        )}
                        {dish.would_order_again === false && (
                          <span className="tag text-xs">✗ não pediria de novo</span>
                        )}
                      </div>
                      {dish.people.length > 0 && (
                        <div className="text-xs mt-1 text-muted">
                          {dish.people.map(p => p.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {dish.rating && (
                        <div className={`font-display ${ratingColor(dish.rating)}`}>{dish.rating}</div>
                      )}
                      {dish.price && (
                        <div className="text-xs text-muted">
                          R$ {Number(dish.price).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sobre o restaurante */}
      {visit.restaurant?.notes && (
        <div className="card" style={{ background: "transparent" }}>
          <div className="text-xs mb-1 text-muted">Sobre o lugar</div>
          <p className="text-sm text-soft">{visit.restaurant.notes}</p>
        </div>
      )}
    </div>
  )
}
