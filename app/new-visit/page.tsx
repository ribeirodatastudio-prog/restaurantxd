import { getNewVisitOptions } from '@/lib/queries'
import { NewVisitForm } from './NewVisitForm'

export const dynamic = 'force-dynamic'

export default async function NewVisitPage() {
  const { restaurants, people } = await getNewVisitOptions()
  return (
    <div>
      <h1 className="font-display text-3xl mb-6 text-accent">Nova visita</h1>
      <NewVisitForm restaurants={restaurants} people={people} />
    </div>
  )
}
