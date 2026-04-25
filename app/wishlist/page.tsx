import { supabase } from '@/lib/supabase'
import { priceLabel } from '@/lib/utils'
import { WishlistActions } from './WishlistActions'

export const revalidate = 0

async function getWishlist() {
  const { data } = await supabase
    .from('restaurants')
    .select('*')
    .eq('wishlist', true)
    .order('name')
  return data ?? []
}

export default async function WishlistPage() {
  const places = await getWishlist()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl" style={{ color: '#c9a96e' }}>Quero ir</h1>
        <WishlistActions />
      </div>

      <div className="flex flex-col gap-3">
        {places.map((r: any) => (
          <div key={r.id} className="card flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg">{r.name}</div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {r.cuisine_type && <span className="tag">{r.cuisine_type}</span>}
                {r.price_range && <span className="tag">{priceLabel(r.price_range)}</span>}
              </div>
              {r.address && <div className="text-xs mt-1" style={{ color: '#8a8278' }}>{r.address}</div>}
              {r.notes && <div className="text-sm mt-2" style={{ color: '#c2bbb0' }}>{r.notes}</div>}
            </div>
            <WishlistActions restaurantId={r.id} />
          </div>
        ))}

        {places.length === 0 && (
          <div className="card text-center py-10" style={{ color: '#8a8278' }}>
            <p>Nenhum lugar na lista ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
