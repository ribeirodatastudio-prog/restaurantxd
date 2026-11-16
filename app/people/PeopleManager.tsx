'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Plus, X } from 'lucide-react'
import { addPerson, deletePerson } from '@/app/actions'
import type { PersonSummary } from '@/types'

export function PeopleManager({ people }: { people: PersonSummary[] }) {
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [pending, startTransition] = useTransition()

  function save() {
    if (!name.trim()) return
    startTransition(async () => {
      try {
        await addPerson(name, notes || null)
        setAdding(false)
        setName('')
        setNotes('')
      } catch (err) {
        console.error(err)
        alert('Erro ao salvar.')
      }
    })
  }

  function remove(id: string) {
    if (!confirm('Remover pessoa? Isso vai desvinculá-la das visitas.')) return
    startTransition(async () => {
      try {
        await deletePerson(id)
      } catch (err) {
        console.error(err)
        alert('Erro ao excluir.')
      }
    })
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        {!adding ? (
          <button className="btn btn-primary" onClick={() => setAdding(true)}>
            <Plus size={16} /> Adicionar pessoa
          </button>
        ) : (
          <div className="card w-full">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display text-accent">Nova pessoa</span>
              <button aria-label="Cancelar" className="text-muted" onClick={() => setAdding(false)}><X size={16} /></button>
            </div>
            <div className="flex flex-col gap-2">
              <input placeholder="Nome *" value={name} onChange={e => setName(e.target.value)} />
              <input placeholder="Notas (opcional)" value={notes} onChange={e => setNotes(e.target.value)} />
              <button className="btn btn-primary" onClick={save} disabled={pending}>
                {pending ? 'Salvando…' : 'Salvar'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {people.map(p => (
          <div key={p.id} className="card flex items-start justify-between gap-3 hover:border-line-strong transition-colors">
            <Link href={`/people/${p.id}`} className="flex-1 min-w-0">
              <div className="font-display text-lg">{p.name}</div>
              <div className="text-sm mt-0.5 text-muted">
                {p.visit_count} visita{p.visit_count !== 1 ? 's' : ''}
                {p.last_restaurant && ` · última: ${p.last_restaurant}`}
              </div>
              {p.notes && <div className="text-xs mt-1 text-muted">{p.notes}</div>}
            </Link>
            <button aria-label="Remover pessoa" className="btn-danger btn text-xs" disabled={pending} onClick={() => remove(p.id)}>
              <X size={13} />
            </button>
          </div>
        ))}

        {people.length === 0 && (
          <div className="card text-center py-10 text-muted">
            <p>Nenhuma pessoa cadastrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
