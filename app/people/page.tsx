import { getPeople } from '@/lib/queries'
import { PeopleManager } from './PeopleManager'

export const dynamic = 'force-dynamic'

export default async function PeoplePage() {
  const people = await getPeople()
  return (
    <div>
      <h1 className="font-display text-3xl mb-6 text-accent">Pessoas</h1>
      <PeopleManager people={people} />
    </div>
  )
}
