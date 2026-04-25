export type PriceRange = 1 | 2 | 3 | 4

export type Occasion =
  | 'Casual'
  | 'Date'
  | 'Aniversário'
  | 'Almoço de trabalho'
  | 'Jantar em família'
  | 'Comemoração'
  | 'Turismo'

export type DishCategory = 'Entrada' | 'Principal' | 'Sobremesa' | 'Drink' | 'Outro'

export interface Restaurant {
  id: string
  name: string
  cuisine_type: string | null
  price_range: PriceRange | null
  address: string | null
  notes: string | null
  wishlist: boolean
  created_at: string
  visit_count?: number
  last_visit?: string | null
  avg_rating?: number | null
}

export interface Person {
  id: string
  name: string
  notes: string | null
  created_at: string
}

export interface Visit {
  id: string
  restaurant_id: string
  visited_at: string
  occasion: Occasion | null
  rating_overall: number | null
  rating_food: number | null
  rating_service: number | null
  rating_ambience: number | null
  notes: string | null
  created_at: string
  restaurant?: Restaurant
  dishes?: Dish[]
  people?: Person[]
}

export interface Dish {
  id: string
  visit_id: string
  name: string
  category: DishCategory | null
  rating: number | null
  would_order_again: boolean | null
  price: number | null
  created_at: string
  people?: Person[]
}
