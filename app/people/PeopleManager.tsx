'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Plus, X } from 'lucide-react'

export function PeopleManager({ initialPeople }: { initialPeople: any[] }) {
  const router = useRouter()
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  async function addPerson() {
    if (!name.trim()) return
    setLoading(true)
    await supabase.from('people').insert({ name, notes: notes || null })
    setLoading(false)
    setAdding(false)
    setName('')
    setNotes('')
    router.refresh()
  }

  async function removePerson(id: string) {
    if (!confirm('Remover pessoa? Isso vai desvinculá-la das visitas.')) return
    await supabase.from('people').delete().eq('id', id)
    router.refresh()
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
              <span className="font-display" style={{ color: '#c9a96e' }}>Nova pessoa</span>
              <button aria-label="Cancelar" onClick={() => setAdding(false)}><X size={16} style={{ color: '#8a8278' }} /></button>
            </div>
            <div className="flex flex-col gap-2">
              <input autoFocus aria-label="Nome da pessoa" placeholder="Nome *" value={name} onChange={e => setName(e.target.value)} />
              <input aria-label="Notas opcionais" placeholder="Notas (opcional)" value={notes} onChange={e => setNotes(e.target.value)} />
              <button className="btn btn-primary" onClick={addPerson} disabled={loading}>
                {loading ? 'Salvando…' : 'Salvar'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {initialPeople.map((p: any) => (
          <div key={p.id} className="card flex items-start justify-between gap-3">
            <div>
              <div className="font-display text-lg">{p.name}</div>
              <div className="text-sm mt-0.5" style={{ color: '#8a8278' }}>
                {p.visit_count} visita{p.visit_count !== 1 ? 's' : ''}
                {p.last_visit && ` · última: ${p.last_visit.restaurant?.name}`}
              </div>
              {p.notes && <div className="text-xs mt-1" style={{ color: '#8a8278' }}>{p.notes}</div>}
            </div>
            <button aria-label="Remover pessoa" className="btn-danger btn text-xs" onClick={() => removePerson(p.id)}>
              <X size={13} />
            </button>
          </div>
        ))}

        {initialPeople.length === 0 && (
          <div className="card text-center py-10" style={{ color: '#8a8278' }}>
            <p>Nenhuma pessoa cadastrada ainda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
