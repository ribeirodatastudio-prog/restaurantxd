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
  return (data ?? []).map((p: any) => {
    let last_visit = null

    // ⚡ Bolt: Use a single O(N) pass to find the latest visit
    // This avoids .sort()[0], reducing O(N log N) overhead and avoiding array mutation.
    if (p.visit_people) {
      for (let i = 0; i < p.visit_people.length; i++) {
        const v = p.visit_people[i].visit
        if (v?.visited_at) {
          if (!last_visit?.visited_at || v.visited_at.localeCompare(last_visit.visited_at) > 0) {
            last_visit = v
          }
        }
      }
    }

    return {
      ...p,
      visit_count: p.visit_people?.length ?? 0,
      last_visit
    }
  })
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
