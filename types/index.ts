import type { OCCASIONS, DISH_CATEGORIES } from '@/lib/utils'

export type PriceRange = 1 | 2 | 3 | 4
export type Occasion = (typeof OCCASIONS)[number]
export type DishCategory = (typeof DISH_CATEGORIES)[number]

export interface PersonRef {
  id: string
  name: string
}

export interface RestaurantRef {
  id: string
  name: string
  cuisine_type: string | null
}

export interface Restaurant extends RestaurantRef {
  price_range: PriceRange | null
  address: string | null
  notes: string | null
}

/** Restaurante visitado, com agregados das visitas */
export interface RestaurantSummary extends Restaurant {
  visit_count: number
  avg_rating: number | null
  last_visit: string | null
}

/** Linha da lista de visitas (home) */
export interface VisitSummary {
  id: string
  visited_at: string
  occasion: Occasion | null
  rating_overall: number | null
  rating_food: number | null
  restaurant: (RestaurantRef & { price_range: PriceRange | null }) | null
  people: PersonRef[]
  dish_names: string[]
}

export interface Dish {
  id: string
  name: string
  category: DishCategory | null
  rating: number | null
  would_order_again: boolean | null
  price: number | null
  people: PersonRef[]
}

export interface VisitDetail {
  id: string
  visited_at: string
  occasion: Occasion | null
  rating_overall: number | null
  rating_food: number | null
  rating_service: number | null
  rating_ambience: number | null
  notes: string | null
  restaurant: Restaurant | null
  people: PersonRef[]
  dishes: Dish[]
}

export interface RestaurantVisit {
  id: string
  visited_at: string
  occasion: Occasion | null
  rating_overall: number | null
  notes: string | null
  dish_names: string[]
}

export interface PersonSummary extends PersonRef {
  notes: string | null
  visit_count: number
  last_restaurant: string | null
}

export interface Stats {
  totalVisits: number
  totalRestaurants: number
  totalDishes: number
  avgRating: number | null
  topVisits: { id: string; visited_at: string; rating_overall: number; restaurant_name: string | null }[]
  topCuisines: { cuisine: string; count: number }[]
  wouldOrder: number
  wouldNotOrder: number
}

// ---- Entradas das server actions ----

export interface NewRestaurantInput {
  name: string
  cuisine_type: string | null
  price_range: number | null
  address: string | null
  notes: string | null
}

export interface NewDishInput {
  name: string
  category: string | null
  rating: number | null
  would_order_again: boolean | null
  price: number | null
  peopleIds: string[]
}

export interface NewVisitInput {
  restaurantId: string | null
  newRestaurant: NewRestaurantInput | null
  visited_at: string
  occasion: string | null
  notes: string | null
  rating_overall: number | null
  rating_food: number | null
  rating_service: number | null
  rating_ambience: number | null
  peopleIds: string[]
  dishes: NewDishInput[]
}
