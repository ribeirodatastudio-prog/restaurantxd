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

  async function save() {
    const trimmedName = (form.name || '').trim();
    if (!trimmedName || trimmedName.length > 100) {
      alert('Nome inválido (máximo 100 caracteres).');
      return;
    }
    const trimmedCuisine = (form.cuisine_type || '').trim();
    if (trimmedCuisine && trimmedCuisine.length > 50) {
      alert('Cozinha inválida (máximo 50 caracteres).');
      return;
    }
    const trimmedAddress = (form.address || '').trim();
    if (trimmedAddress && trimmedAddress.length > 255) {
      alert('Endereço inválido (máximo 255 caracteres).');
      return;
    }
    const trimmedNotes = (form.notes || '').trim();
    if (trimmedNotes && trimmedNotes.length > 1000) {
      alert('Notas inválidas (máximo 1000 caracteres).');
      return;
    }

    const price = parseInt(form.price_range);
    const parsedPrice = !isNaN(price) && price >= 1 && price <= 4 ? price : null;

    setLoading(true)
    try {
      await supabase.from('restaurants').insert({
        name: trimmedName,
        cuisine_type: trimmedCuisine || null,
        price_range: parsedPrice,
        address: trimmedAddress || null,
        notes: trimmedNotes || null,
        wishlist: true,
      })
      setAdding(false)
      setForm({ name: '', cuisine_type: '', price_range: '', address: '', notes: '' })
      router.refresh()
    } catch (err) {
      console.error('Failed to add wishlist item:', err)
      alert('Erro ao salvar item na lista de desejos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card mt-2">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display" style={{ color: '#c9a96e' }}>Novo lugar</span>
        <button aria-label="Cancelar" onClick={() => setAdding(false)}><X size={16} style={{ color: '#8a8278' }} /></button>
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
        <button className="btn btn-primary" onClick={save} disabled={loading}>
          {loading ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </div>
  )
}
