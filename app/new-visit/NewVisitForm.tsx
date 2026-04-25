'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { StarRating } from '@/components/StarRating'
import { OCCASIONS, DISH_CATEGORIES, CUISINE_TYPES } from '@/lib/utils'
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  restaurants: { id: string; name: string; cuisine_type: string | null }[]
  people: { id: string; name: string }[]
}

interface DishEntry {
  name: string
  category: string
  rating: number | null
  would_order_again: boolean | null
  price: string
  peopleIds: string[]
}

export function NewVisitForm({ restaurants, people }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Restaurante
  const [restaurantId, setRestaurantId] = useState('')
  const [newRestaurant, setNewRestaurant] = useState({ name: '', cuisine_type: '', price_range: '', address: '', notes: '' })
  const [isNewRestaurant, setIsNewRestaurant] = useState(false)

  // Visita
  const [visitedAt, setVisitedAt] = useState(new Date().toISOString().split('T')[0])
  const [occasion, setOccasion] = useState('')
  const [notes, setNotes] = useState('')
  const [ratingOverall, setRatingOverall] = useState<number | null>(null)
  const [ratingFood, setRatingFood] = useState<number | null>(null)
  const [ratingService, setRatingService] = useState<number | null>(null)
  const [ratingAmbience, setRatingAmbience] = useState<number | null>(null)

  // Pessoas
  const [selectedPeople, setSelectedPeople] = useState<string[]>([])

  // Pratos
  const [dishes, setDishes] = useState<DishEntry[]>([])
  const [dishExpanded, setDishExpanded] = useState<number | null>(null)

  function addDish() {
    setDishes([...dishes, { name: '', category: '', rating: null, would_order_again: null, price: '', peopleIds: [] }])
    setDishExpanded(dishes.length)
  }

  function updateDish(i: number, field: keyof DishEntry, value: any) {
    setDishes(dishes.map((d, idx) => idx === i ? { ...d, [field]: value } : d))
  }

  function removeDish(i: number) {
    setDishes(dishes.filter((_, idx) => idx !== i))
    setDishExpanded(null)
  }

  function togglePerson(id: string, arr: string[], set: (v: string[]) => void) {
    set(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      let finalRestaurantId = restaurantId

      if (isNewRestaurant) {
        const { data, error } = await supabase.from('restaurants').insert({
          name: newRestaurant.name,
          cuisine_type: newRestaurant.cuisine_type || null,
          price_range: newRestaurant.price_range ? parseInt(newRestaurant.price_range) : null,
          address: newRestaurant.address || null,
          notes: newRestaurant.notes || null,
        }).select('id').single()
        if (error) throw error
        finalRestaurantId = data.id
      }

      const { data: visit, error: visitError } = await supabase.from('visits').insert({
        restaurant_id: finalRestaurantId,
        visited_at: visitedAt,
        occasion: occasion || null,
        rating_overall: ratingOverall,
        rating_food: ratingFood,
        rating_service: ratingService,
        rating_ambience: ratingAmbience,
        notes: notes || null,
      }).select('id').single()
      if (visitError) throw visitError

      if (selectedPeople.length > 0) {
        await supabase.from('visit_people').insert(
          selectedPeople.map(pid => ({ visit_id: visit.id, person_id: pid }))
        )
      }

      for (const dish of dishes.filter(d => d.name.trim())) {
        const { data: dishData } = await supabase.from('dishes').insert({
          visit_id: visit.id,
          name: dish.name,
          category: dish.category || null,
          rating: dish.rating,
          would_order_again: dish.would_order_again,
          price: dish.price ? parseFloat(dish.price) : null,
        }).select('id').single()

        if (dishData && dish.peopleIds.length > 0) {
          await supabase.from('dish_people').insert(
            dish.peopleIds.map(pid => ({ dish_id: dishData.id, person_id: pid }))
          )
        }
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      alert('Erro ao salvar. Verifique o console.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Restaurante */}
      <div className="card">
        <h2 className="font-display text-xl mb-4" style={{ color: '#c9a96e' }}>Restaurante</h2>

        <div className="flex gap-2 mb-3">
          <button type="button" className={`btn ${!isNewRestaurant ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setIsNewRestaurant(false)}>Existente</button>
          <button type="button" className={`btn ${isNewRestaurant ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setIsNewRestaurant(true)}>Novo lugar</button>
        </div>

        {!isNewRestaurant ? (
          <select value={restaurantId} onChange={e => setRestaurantId(e.target.value)} required={!isNewRestaurant}>
            <option value="">Escolha o restaurante…</option>
            {restaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name}{r.cuisine_type ? ` — ${r.cuisine_type}` : ''}</option>
            ))}
          </select>
        ) : (
          <div className="flex flex-col gap-3">
            <input placeholder="Nome do restaurante *" required={isNewRestaurant}
              value={newRestaurant.name} onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <select value={newRestaurant.cuisine_type} onChange={e => setNewRestaurant({ ...newRestaurant, cuisine_type: e.target.value })}>
                <option value="">Tipo de cozinha</option>
                {CUISINE_TYPES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={newRestaurant.price_range} onChange={e => setNewRestaurant({ ...newRestaurant, price_range: e.target.value })}>
                <option value="">Faixa de preço</option>
                <option value="1">R$ — Barato</option>
                <option value="2">R$R$ — Moderado</option>
                <option value="3">R$R$R$ — Caro</option>
                <option value="4">R$R$R$R$ — Muito caro</option>
              </select>
            </div>
            <input placeholder="Endereço (opcional)"
              value={newRestaurant.address} onChange={e => setNewRestaurant({ ...newRestaurant, address: e.target.value })} />
            <textarea placeholder="Observações sobre o lugar (opcional)" rows={2}
              value={newRestaurant.notes} onChange={e => setNewRestaurant({ ...newRestaurant, notes: e.target.value })} />
          </div>
        )}
      </div>

      {/* Detalhes da visita */}
      <div className="card">
        <h2 className="font-display text-xl mb-4" style={{ color: '#c9a96e' }}>Detalhes</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs mb-1 block" style={{ color: '#8a8278' }}>Data</label>
            <input type="date" value={visitedAt} onChange={e => setVisitedAt(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs mb-1 block" style={{ color: '#8a8278' }}>Ocasião</label>
            <select value={occasion} onChange={e => setOccasion(e.target.value)}>
              <option value="">Sem ocasião</option>
              {OCCASIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <textarea placeholder="Anotações sobre a visita…" rows={3}
          value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      {/* Avaliações */}
      <div className="card">
        <h2 className="font-display text-xl mb-4" style={{ color: '#c9a96e' }}>Avaliações</h2>
        <div className="flex flex-col gap-4">
          <StarRating label="Geral" value={ratingOverall} onChange={setRatingOverall} />
          <StarRating label="Comida" value={ratingFood} onChange={setRatingFood} />
          <StarRating label="Atendimento" value={ratingService} onChange={setRatingService} />
          <StarRating label="Ambiente" value={ratingAmbience} onChange={setRatingAmbience} />
        </div>
      </div>

      {/* Pessoas */}
      {people.length > 0 && (
        <div className="card">
          <h2 className="font-display text-xl mb-4" style={{ color: '#c9a96e' }}>Quem foi</h2>
          <div className="flex flex-wrap gap-2">
            {people.map(p => (
              <button key={p.id} type="button"
                className={`tag cursor-pointer transition-colors ${selectedPeople.includes(p.id) ? 'tag-accent' : ''}`}
                style={{ padding: '6px 14px', fontSize: 13 }}
                onClick={() => togglePerson(p.id, selectedPeople, setSelectedPeople)}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pratos */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl" style={{ color: '#c9a96e' }}>Pratos</h2>
          <button type="button" className="btn btn-ghost" onClick={addDish}>
            <Plus size={15} /> Adicionar prato
          </button>
        </div>

        {dishes.length === 0 && (
          <p className="text-sm" style={{ color: '#8a8278' }}>Nenhum prato adicionado ainda.</p>
        )}

        <div className="flex flex-col gap-3">
          {dishes.map((dish, i) => (
            <div key={i} style={{ border: '1px solid #2a2622', borderRadius: 8 }}>
              <div className="flex items-center gap-2 p-3 cursor-pointer"
                onClick={() => setDishExpanded(dishExpanded === i ? null : i)}>
                <input
                  className="flex-1"
                  style={{ border: 'none', background: 'transparent', padding: 0 }}
                  placeholder="Nome do prato *"
                  value={dish.name}
                  onChange={e => { e.stopPropagation(); updateDish(i, 'name', e.target.value) }}
                  onClick={e => e.stopPropagation()}
                />
                <button type="button" onClick={e => { e.stopPropagation(); setDishExpanded(dishExpanded === i ? null : i) }}>
                  {dishExpanded === i ? <ChevronUp size={16} style={{ color: '#8a8278' }} /> : <ChevronDown size={16} style={{ color: '#8a8278' }} />}
                </button>
                <button type="button" onClick={e => { e.stopPropagation(); removeDish(i) }}>
                  <X size={16} style={{ color: '#8a8278' }} />
                </button>
              </div>

              {dishExpanded === i && (
                <div className="px-3 pb-3 flex flex-col gap-3" style={{ borderTop: '1px solid #2a2622' }}>
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <select value={dish.category} onChange={e => updateDish(i, 'category', e.target.value)}>
                      <option value="">Categoria</option>
                      {DISH_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <input type="number" step="0.01" placeholder="Preço (R$)"
                      value={dish.price} onChange={e => updateDish(i, 'price', e.target.value)} />
                  </div>

                  <StarRating label="Nota do prato" value={dish.rating} onChange={v => updateDish(i, 'rating', v)} />

                  <div className="flex gap-2">
                    <span className="text-xs" style={{ color: '#8a8278', marginTop: 2 }}>Pediria de novo?</span>
                    {[true, false].map(v => (
                      <button key={String(v)} type="button"
                        className={`tag cursor-pointer ${dish.would_order_again === v ? 'tag-accent' : ''}`}
                        style={{ padding: '4px 12px', fontSize: 12 }}
                        onClick={() => updateDish(i, 'would_order_again', dish.would_order_again === v ? null : v)}>
                        {v ? 'Sim' : 'Não'}
                      </button>
                    ))}
                  </div>

                  {people.length > 0 && (
                    <div>
                      <div className="text-xs mb-2" style={{ color: '#8a8278' }}>Quem pediu</div>
                      <div className="flex flex-wrap gap-2">
                        {people.map(p => (
                          <button key={p.id} type="button"
                            className={`tag cursor-pointer ${dish.peopleIds.includes(p.id) ? 'tag-accent' : ''}`}
                            style={{ padding: '4px 12px', fontSize: 12 }}
                            onClick={() => updateDish(i, 'peopleIds',
                              dish.peopleIds.includes(p.id)
                                ? dish.peopleIds.filter(x => x !== p.id)
                                : [...dish.peopleIds, p.id]
                            )}>
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" className="btn btn-ghost" onClick={() => router.back()}>Cancelar</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Salvando…' : 'Salvar visita'}
        </button>
      </div>
    </form>
  )
}
