import { supabase } from '@/lib/supabase'
import { PeopleManager } from './PeopleManager'

export const revalidate = 0

async function getPeople() {
  const { data } = await supabase
    .from('people')
    .select(`
      *,
      visit_people(visit:visits(id, visited_at, restaurant:restaurants(name)))
    `)
    .order('name')
  return (data ?? []).map((p: any) => ({
    ...p,
    visit_count: p.visit_people?.length ?? 0,
    last_visit: p.visit_people?.sort((a: any, b: any) =>
      b.visit?.visited_at?.localeCompare(a.visit?.visited_at)
    )[0]?.visit ?? null,
  }))
}

export default async function PeoplePage() {
  const people = await getPeople()
  return (
    <div>
      <h1 className="font-display text-3xl mb-6" style={{ color: '#c9a96e' }}>Pessoas</h1>
      <PeopleManager initialPeople={people} />
    </div>
  )
}
