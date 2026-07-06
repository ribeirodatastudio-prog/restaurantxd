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
    let maxVisit = null;
    if (p.visit_people) {
      for (const vp of p.visit_people) {
        if (vp.visit?.visited_at) {
          if (!maxVisit || vp.visit.visited_at.localeCompare(maxVisit.visited_at) > 0) {
            maxVisit = vp.visit;
          }
        }
      }
    }
    return {
      ...p,
      visit_count: p.visit_people?.length ?? 0,
      last_visit: maxVisit,
    };
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
