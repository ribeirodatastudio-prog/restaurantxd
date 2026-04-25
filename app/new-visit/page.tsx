import { NewVisitForm } from './NewVisitForm'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

async function getData() {
  const [{ data: restaurants }, { data: people }] = await Promise.all([
    supabase.from('restaurants').select('id, name, cuisine_type').order('name'),
    supabase.from('people').select('id, name').order('name'),
  ])
  return { restaurants: restaurants ?? [], people: people ?? [] }
}

export default async function NewVisitPage() {
  const { restaurants, people } = await getData()
  return (
    <div>
      <h1 className="font-display text-3xl mb-6" style={{ color: '#c9a96e' }}>Nova visita</h1>
      <NewVisitForm restaurants={restaurants} people={people} />
    </div>
  )
}
