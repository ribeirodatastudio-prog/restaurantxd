'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { SESSION_COOKIE, SESSION_MAX_AGE, isCorrectPassword, isValidSession, sessionToken } from '@/lib/auth'
import { DISH_CATEGORIES, OCCASIONS, RATING_OPTIONS, isUuid } from '@/lib/utils'
import type { NewRestaurantInput, NewVisitInput, PersonRef } from '@/types'

// ---------- Autenticação ----------

async function requireAuth() {
  // O middleware já protege as páginas; isto protege as actions chamadas diretamente.
  if (!(await isValidSession(cookies().get(SESSION_COOKIE)?.value))) {
    throw new Error('Não autenticado')
  }
}

export async function login(_prev: { error: string } | null, formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('next') ?? '/')

  if (!(await isCorrectPassword(password))) {
    await new Promise(r => setTimeout(r, 800)) // freia tentativas em sequência
    return { error: 'Senha incorreta.' }
  }

  cookies().set(SESSION_COOKIE, await sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  // Só aceita caminhos internos, para não virar um redirecionador aberto
  redirect(next.startsWith('/') && !next.startsWith('//') ? next : '/')
}

export async function logout() {
  cookies().delete(SESSION_COOKIE)
  redirect('/login')
}

// ---------- Validação ----------

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed.substring(0, max) : null
}

function requiredText(value: unknown, max: number, field: string): string {
  const t = text(value, max)
  if (!t) throw new Error(`${field} é obrigatório`)
  return t
}

function rating(value: unknown): number | null {
  return typeof value === 'number' && RATING_OPTIONS.includes(value) ? value : null
}

function priceRange(value: unknown): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 4 ? value : null
}

function price(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value < 1_000_000
    ? Math.round(value * 100) / 100
    : null
}

function oneOf<T extends string>(value: unknown, options: readonly T[]): T | null {
  return options.includes(value as T) ? (value as T) : null
}

function uuids(value: unknown): string[] {
  return Array.isArray(value) ? Array.from(new Set(value.filter(isUuid))) : []
}

function restaurantFields(input: NewRestaurantInput) {
  return {
    name: requiredText(input.name, 100, 'Nome do restaurante'),
    cuisine_type: text(input.cuisine_type, 50),
    price_range: priceRange(input.price_range),
    address: text(input.address, 200),
    notes: text(input.notes, 500),
  }
}

// ---------- Visitas ----------

export async function createVisit(input: NewVisitInput): Promise<{ id: string }> {
  await requireAuth()

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.visited_at)) throw new Error('Data inválida')
  if (!input.newRestaurant && !isUuid(input.restaurantId)) throw new Error('Selecione um restaurante')

  const newRestaurant = input.newRestaurant ? restaurantFields(input.newRestaurant) : null
  const peopleIds = uuids(input.peopleIds)
  const dishes = (input.dishes ?? [])
    .map(d => ({
      name: text(d.name, 100),
      category: oneOf(d.category, DISH_CATEGORIES),
      rating: rating(d.rating),
      would_order_again: typeof d.would_order_again === 'boolean' ? d.would_order_again : null,
      price: price(d.price),
      peopleIds: uuids(d.peopleIds),
    }))
    .filter(d => d.name)

  const visitId = await db().begin(async tx => {
    let restaurantId = input.restaurantId as string
    if (newRestaurant) {
      const [row] = await tx`insert into restaurants ${tx(newRestaurant)} returning id`
      restaurantId = row.id
    } else {
      // Ao registrar visita num lugar da lista "Quero ir", ele passa para "Lugares"
      await tx`update restaurants set wishlist = false where id = ${restaurantId} and wishlist`
    }

    const [visit] = await tx`
      insert into visits ${tx({
        restaurant_id: restaurantId,
        visited_at: input.visited_at,
        occasion: oneOf(input.occasion, OCCASIONS),
        rating_overall: rating(input.rating_overall),
        rating_food: rating(input.rating_food),
        rating_service: rating(input.rating_service),
        rating_ambience: rating(input.rating_ambience),
        notes: text(input.notes, 500),
      })}
      returning id
    `

    if (peopleIds.length) {
      await tx`insert into visit_people ${tx(peopleIds.map(person_id => ({ visit_id: visit.id, person_id })))}`
    }

    for (const { peopleIds: dishPeople, ...dish } of dishes) {
      const [row] = await tx`insert into dishes ${tx({ ...dish, visit_id: visit.id })} returning id`
      if (dishPeople.length) {
        await tx`insert into dish_people ${tx(dishPeople.map(person_id => ({ dish_id: row.id, person_id })))}`
      }
    }

    return visit.id as string
  })

  revalidatePath('/', 'layout')
  return { id: visitId }
}

export async function deleteVisit(id: string) {
  await requireAuth()
  if (!isUuid(id)) throw new Error('Visita inválida')
  await db()`delete from visits where id = ${id}`
  revalidatePath('/', 'layout')
}

// ---------- Pessoas ----------

export async function addPerson(name: string, notes?: string | null): Promise<PersonRef> {
  await requireAuth()
  const [row] = await db()`
    insert into people (name, notes)
    values (${requiredText(name, 100, 'Nome')}, ${text(notes, 500)})
    returning id, name
  `
  revalidatePath('/', 'layout')
  return { id: row.id, name: row.name }
}

export async function deletePerson(id: string) {
  await requireAuth()
  if (!isUuid(id)) throw new Error('Pessoa inválida')
  await db()`delete from people where id = ${id}`
  revalidatePath('/', 'layout')
}

// ---------- Quero ir ----------

export async function addWishlistPlace(input: NewRestaurantInput) {
  await requireAuth()
  const fields = restaurantFields(input)
  await db()`insert into restaurants ${db()({ ...fields, wishlist: true })}`
  revalidatePath('/', 'layout')
}

export async function markVisited(id: string) {
  await requireAuth()
  if (!isUuid(id)) throw new Error('Restaurante inválido')
  await db()`update restaurants set wishlist = false where id = ${id}`
  revalidatePath('/', 'layout')
}
