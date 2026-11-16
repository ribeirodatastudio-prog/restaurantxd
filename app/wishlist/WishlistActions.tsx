'use client'
import { useState, useTransition } from 'react'
import { Plus, CheckCheck, X } from 'lucide-react'
import { addWishlistPlace, markVisited } from '@/app/actions'
import { CUISINE_TYPES } from '@/lib/utils'

export function MarkVisitedButton({ restaurantId }: { restaurantId: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      className="btn btn-ghost text-xs"
      title="Marcar como visitado (remove da lista)"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          try {
            await markVisited(restaurantId)
          } catch (err) {
            console.error(err)
            alert('Erro ao marcar como visitado.')
          }
        })
      }
    >
      <CheckCheck size={14} /> Visitei
    </button>
  )
}

const EMPTY = { name: '', cuisine_type: '', price_range: '', address: '', notes: '' }

export function AddWishlistPlace() {
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [pending, startTransition] = useTransition()

  if (!adding) {
    return (
      <button className="btn btn-primary" onClick={() => setAdding(true)}>
        <Plus size={16} /> Adicionar
      </button>
    )
  }

  function save() {
    if (!form.name.trim()) return
    startTransition(async () => {
      try {
        await addWishlistPlace({
          name: form.name,
          cuisine_type: form.cuisine_type || null,
          price_range: form.price_range ? Number(form.price_range) : null,
          address: form.address || null,
          notes: form.notes || null,
        })
        setAdding(false)
        setForm(EMPTY)
      } catch (err) {
        console.error(err)
        alert('Erro ao salvar.')
      }
    })
  }

  return (
    <div className="card mt-2">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-accent">Novo lugar</span>
        <button aria-label="Cancelar" className="text-muted" onClick={() => setAdding(false)}><X size={16} /></button>
      </div>
      <div className="flex flex-col gap-2">
        <input placeholder="Nome *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <div className="grid grid-cols-2 gap-2">
          <select value={form.cuisine_type} onChange={e => setForm({ ...form, cuisine_type: e.target.value })}>
            <option value="">Cozinha</option>
            {CUISINE_TYPES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={form.price_range} onChange={e => setForm({ ...form, price_range: e.target.value })}>
            <option value="">Preço</option>
            <option value="1">R$</option><option value="2">R$R$</option>
            <option value="3">R$R$R$</option><option value="4">R$R$R$R$</option>
          </select>
        </div>
        <input placeholder="Endereço" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        <textarea placeholder="Notas" rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button className="btn btn-primary" onClick={save} disabled={pending}>
          {pending ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </div>
  )
}
