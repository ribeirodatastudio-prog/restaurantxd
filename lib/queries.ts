import 'server-only'
import { db } from '@/lib/db'
import { isUuid } from '@/lib/utils'
import type {
  PersonRef, PersonSummary, Restaurant, RestaurantRef, RestaurantSummary,
  RestaurantVisit, Stats, VisitDetail, VisitSummary,
} from '@/types'

// Observação: numeric vem como texto e date vira Date no driver,
// por isso as consultas fazem cast explícito (::float8, ::text, ::int).

export const VISITS_PAGE_SIZE = 30

export async function getVisits(page: number): Promise<{ visits: VisitSummary[]; hasMore: boolean }> {
  const sql = db()
  const offset = (page - 1) * VISITS_PAGE_SIZE
  const rows = await sql`
    select
      v.id,
      v.visited_at::text            as visited_at,
      v.occasion,
      v.rating_overall::float8      as rating_overall,
      v.rating_food::float8         as rating_food,
      r.id                          as restaurant_id,
      r.name                        as restaurant_name,
      r.cuisine_type,
      r.price_range,
      coalesce((
        select json_agg(json_build_object('id', p.id, 'name', p.name) order by p.name)
        from visit_people vp join people p on p.id = vp.person_id
        where vp.visit_id = v.id
      ), '[]') as people,
      coalesce((
        select json_agg(d.name order by d.created_at) from dishes d where d.visit_id = v.id
      ), '[]') as dish_names
    from visits v
    left join restaurants r on r.id = v.restaurant_id
    order by v.visited_at desc, v.created_at desc
    limit ${VISITS_PAGE_SIZE + 1} offset ${offset}
  `
  const visits = rows.slice(0, VISITS_PAGE_SIZE).map(row => ({
    id: row.id,
    visited_at: row.visited_at,
    occasion: row.occasion,
    rating_overall: row.rating_overall,
    rating_food: row.rating_food,
    restaurant: row.restaurant_id
      ? { id: row.restaurant_id, name: row.restaurant_name, cuisine_type: row.cuisine_type, price_range: row.price_range }
      : null,
    people: row.people,
    dish_names: row.dish_names,
  })) as VisitSummary[]
  return { visits, hasMore: rows.length > VISITS_PAGE_SIZE }
}

export async function getVisit(id: string): Promise<VisitDetail | null> {
  if (!isUuid(id)) return null
  const sql = db()
  const [visit] = await sql`
    select
      v.id,
      v.visited_at::text          as visited_at,
      v.occasion,
      v.rating_overall::float8    as rating_overall,
      v.rating_food::float8       as rating_food,
      v.rating_service::float8    as rating_service,
      v.rating_ambience::float8   as rating_ambience,
      v.notes,
      case when r.id is null then null else json_build_object(
        'id', r.id, 'name', r.name, 'cuisine_type', r.cuisine_type,
        'price_range', r.price_range, 'address', r.address, 'notes', r.notes
      ) end as restaurant,
      coalesce((
        select json_agg(json_build_object('id', p.id, 'name', p.name) order by p.name)
        from visit_people vp join people p on p.id = vp.person_id
        where vp.visit_id = v.id
      ), '[]') as people,
      coalesce((
        select json_agg(json_build_object(
          'id', d.id, 'name', d.name, 'category', d.category,
          'rating', d.rating::float8, 'would_order_again', d.would_order_again,
          'price', d.price::float8,
          'people', coalesce((
            select json_agg(json_build_object('id', p.id, 'name', p.name) order by p.name)
            from dish_people dp join people p on p.id = dp.person_id
            where dp.dish_id = d.id
          ), '[]')
        ) order by d.created_at)
        from dishes d where d.visit_id = v.id
      ), '[]') as dishes
    from visits v
    left join restaurants r on r.id = v.restaurant_id
    where v.id = ${id}
  `
  return (visit as unknown as VisitDetail) ?? null
}

export async function getVisitedRestaurants(): Promise<RestaurantSummary[]> {
  const sql = db()
  const rows = await sql`
    select
      r.id, r.name, r.cuisine_type, r.price_range, r.address, r.notes,
      count(v.id)::int                as visit_count,
      avg(v.rating_overall)::float8   as avg_rating,
      max(v.visited_at)::text         as last_visit
    from restaurants r
    left join visits v on v.restaurant_id = r.id
    where not r.wishlist
    group by r.id
    order by lower(r.name)
  `
  return rows as unknown as RestaurantSummary[]
}

export async function getRestaurantWithVisits(id: string) {
  if (!isUuid(id)) return null
  const sql = db()
  const [restaurant] = await sql`
    select id, name, cuisine_type, price_range, address, notes
    from restaurants where id = ${id}
  `
  if (!restaurant) return null
  const visits = await sql`
    select
      v.id,
      v.visited_at::text        as visited_at,
      v.occasion,
      v.rating_overall::float8  as rating_overall,
      v.notes,
      coalesce((
        select json_agg(d.name order by d.created_at) from dishes d where d.visit_id = v.id
      ), '[]') as dish_names
    from visits v
    where v.restaurant_id = ${id}
    order by v.visited_at desc, v.created_at desc
  `
  return {
    restaurant: restaurant as unknown as Restaurant,
    visits: visits as unknown as RestaurantVisit[],
  }
}

export async function getWishlist(): Promise<Restaurant[]> {
  const sql = db()
  const rows = await sql`
    select id, name, cuisine_type, price_range, address, notes
    from restaurants where wishlist
    order by lower(name)
  `
  return rows as unknown as Restaurant[]
}

export async function getPeople(): Promise<PersonSummary[]> {
  const sql = db()
  const rows = await sql`
    select
      p.id, p.name, p.notes,
      count(vp.visit_id)::int as visit_count,
      (
        select r.name
        from visit_people vp2
        join visits v on v.id = vp2.visit_id
        join restaurants r on r.id = v.restaurant_id
        where vp2.person_id = p.id
        order by v.visited_at desc, v.created_at desc
        limit 1
      ) as last_restaurant
    from people p
    left join visit_people vp on vp.person_id = p.id
    group by p.id
    order by lower(p.name)
  `
  return rows as unknown as PersonSummary[]
}

export async function getNewVisitOptions(): Promise<{ restaurants: RestaurantRef[]; people: PersonRef[] }> {
  const sql = db()
  const [restaurants, people] = await Promise.all([
    sql`select id, name, cuisine_type from restaurants order by lower(name)`,
    sql`select id, name from people order by lower(name)`,
  ])
  return {
    restaurants: restaurants as unknown as RestaurantRef[],
    people: people as unknown as PersonRef[],
  }
}

export async function getStats(): Promise<Stats> {
  const sql = db()
  const [[totals], topVisits, topCuisines] = await Promise.all([
    sql`
      select
        (select count(*)::int from visits)                              as total_visits,
        (select count(*)::int from restaurants where not wishlist)      as total_restaurants,
        (select count(*)::int from dishes)                              as total_dishes,
        (select avg(rating_overall)::float8 from visits)                as avg_rating,
        (select count(*)::int from dishes where would_order_again)      as would_order,
        (select count(*)::int from dishes where would_order_again = false) as would_not_order
    `,
    sql`
      select v.id, v.visited_at::text as visited_at, v.rating_overall::float8 as rating_overall,
             r.name as restaurant_name
      from visits v left join restaurants r on r.id = v.restaurant_id
      where v.rating_overall is not null
      order by v.rating_overall desc, v.visited_at desc
      limit 5
    `,
    sql`
      select coalesce(r.cuisine_type, 'Outra') as cuisine, count(*)::int as count
      from visits v left join restaurants r on r.id = v.restaurant_id
      group by 1
      order by 2 desc, 1
      limit 5
    `,
  ])
  return {
    totalVisits: totals.total_visits,
    totalRestaurants: totals.total_restaurants,
    totalDishes: totals.total_dishes,
    avgRating: totals.avg_rating,
    wouldOrder: totals.would_order,
    wouldNotOrder: totals.would_not_order,
    topVisits: topVisits as unknown as Stats['topVisits'],
    topCuisines: topCuisines as unknown as Stats['topCuisines'],
  }
}
