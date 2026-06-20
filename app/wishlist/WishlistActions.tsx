'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Plus, CheckCheck, X } from 'lucide-react'
import { CUISINE_TYPES } from '@/lib/utils'

export function WishlistActions({ restaurantId }: { restaurantId?: string }) {
  const router = useRouter()
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ name: '', cuisine_type: '', price_range: '', address: '', notes: '' })
  const [loading, setLoading] = useState(false)

  if (restaurantId) {
    return (
      <button
        className="btn btn-ghost text-xs"
        title="Marcar como visitado (remove da wishlist)"
        onClick={async () => {
          await supabase.from('restaurants').update({ wishlist: false }).eq('id', restaurantId)
          router.refresh()
        }}>
        <CheckCheck size={14} /> Visitei
      </button>
    )
  }

  if (!adding) {
    return (
      <button className="btn btn-primary" onClick={() => setAdding(true)}>
        <Plus size={16} /> Adicionar
      </button>
    )
  }

  async function save(e?: React.FormEvent) {
    if (e) e.preventDefault()
    if (!form.name.trim()) return
    setLoading(true)
    await supabase.from('restaurants').insert({
      name: form.name,
      cuisine_type: form.cuisine_type || null,
      price_range: form.price_range ? parseInt(form.price_range) : null,
      address: form.address || null,
      notes: form.notes || null,
      wishlist: true,
    })
    setLoading(false)
    setAdding(false)
    setForm({ name: '', cuisine_type: '', price_range: '', address: '', notes: '' })
    router.refresh()
  }

  return (
    <form className="card mt-2" onSubmit={save}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-display" style={{ color: '#c9a96e' }}>Novo lugar</span>
        <button type="button" aria-label="Cancelar" onClick={() => setAdding(false)}><X size={16} style={{ color: '#8a8278' }} /></button>
      </div>
      <div className="flex flex-col gap-2">
        <input autoFocus placeholder="Nome *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
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
        <button type="submit" className="btn btn-primary" disabled={loading || !form.name.trim()}>
          {loading ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}
