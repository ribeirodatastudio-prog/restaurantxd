import { getVisitedRestaurants } from '@/lib/queries'
import { RestaurantList } from './RestaurantList'

export const dynamic = 'force-dynamic'

export default async function RestaurantsPage() {
  const restaurants = await getVisitedRestaurants()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-accent">Lugares</h1>
        <span className="text-sm text-muted">{restaurants.length} lugares</span>
      </div>
      <RestaurantList restaurants={restaurants} />
    </div>
  )
}
