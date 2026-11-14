import { getWishlist } from '@/lib/queries'
import { priceLabel } from '@/lib/utils'
import { AddWishlistPlace, MarkVisitedButton } from './WishlistActions'

export const dynamic = 'force-dynamic'

export default async function WishlistPage() {
  const places = await getWishlist()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-accent">Quero ir</h1>
        <AddWishlistPlace />
      </div>

      <div className="flex flex-col gap-3">
        {places.map(r => (
          <div key={r.id} className="card flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg">{r.name}</div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {r.cuisine_type && <span className="tag">{r.cuisine_type}</span>}
                {r.price_range && <span className="tag">{priceLabel(r.price_range)}</span>}
              </div>
              {r.address && <div className="text-xs mt-1 text-muted">{r.address}</div>}
              {r.notes && <div className="text-sm mt-2 text-soft">{r.notes}</div>}
            </div>
            <MarkVisitedButton restaurantId={r.id} />
          </div>
        ))}

        {places.length === 0 && (
          <div className="card text-center py-10 text-muted">
            <p>Nenhum lugar na lista ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
