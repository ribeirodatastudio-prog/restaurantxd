'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { addPerson, createVisit } from '@/app/actions'
import { StarRating } from '@/components/StarRating'
import { OCCASIONS, DISH_CATEGORIES, CUISINE_TYPES, normalizeText } from '@/lib/utils'
import type { PersonRef, RestaurantRef } from '@/types'
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  restaurants: RestaurantRef[]
  people: PersonRef[]
}

interface DishEntry {
  name: string
  category: string
  rating: number | null
  would_order_again: boolean | null
  price: string
  peopleIds: string[]
}

// Data de hoje no fuso do aparelho (toISOString usaria UTC e viraria o dia às 21h em Brasília)
function todayLocal() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function NewVisitForm({ restaurants, people }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Restaurante
  const [restaurantId, setRestaurantId] = useState('')
  const [newRestaurant, setNewRestaurant] = useState({ name: '', cuisine_type: '', price_range: '', address: '', notes: '' })
  const [isNewRestaurant, setIsNewRestaurant] = useState(false)
  const [restaurantSearchQuery, setRestaurantSearchQuery] = useState('')
  const [isCustomCuisine, setIsCustomCuisine] = useState(false)
  const [customCuisine, setCustomCuisine] = useState('')

  // Derived state for existing restaurants
  const searchQ = normalizeText(restaurantSearchQuery)
  const filteredRestaurants = restaurants.filter(r =>
    normalizeText(r.name).includes(searchQ) ||
    (r.cuisine_type && normalizeText(r.cuisine_type).includes(searchQ))
  )

  const selectedRestaurantObj = restaurants.find(r => r.id === restaurantId)

  const allCuisineTypes = Array.from(new Set([
    ...CUISINE_TYPES,
    ...restaurants.map(r => r.cuisine_type).filter((c): c is string => Boolean(c))
  ])).sort()

  // Derived state for new restaurant similar matches
  const similarRestaurants = newRestaurant.name.trim().length > 2
    ? restaurants.filter(r => normalizeText(r.name).includes(normalizeText(newRestaurant.name)))
    : []

  // Visita
  const [visitedAt, setVisitedAt] = useState(todayLocal)
  const [occasion, setOccasion] = useState('')
  const [notes, setNotes] = useState('')
  const [ratingOverall, setRatingOverall] = useState<number | null>(null)
  const [ratingFood, setRatingFood] = useState<number | null>(null)
  const [ratingService, setRatingService] = useState<number | null>(null)
  const [ratingAmbience, setRatingAmbience] = useState<number | null>(null)

  // Pessoas
  const [localPeople, setLocalPeople] = useState(people)
  const [selectedPeople, setSelectedPeople] = useState<string[]>([])
  const [isAddingPerson, setIsAddingPerson] = useState(false)
  const [newPersonName, setNewPersonName] = useState('')

  async function handleAddPerson() {
    if (!newPersonName.trim()) {
      setIsAddingPerson(false)
      return
    }
    setLoading(true)
    try {
      const person = await addPerson(newPersonName)
      setLocalPeople([...localPeople, person])
      setSelectedPeople([...selectedPeople, person.id])
      setNewPersonName('')
      setIsAddingPerson(false)
    } catch (err) {
      alert('Erro ao adicionar pessoa.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Pratos
  const [dishes, setDishes] = useState<DishEntry[]>([])
  const [dishExpanded, setDishExpanded] = useState<number | null>(null)

  function addDish() {
    setDishes([...dishes, { name: '', category: '', rating: null, would_order_again: null, price: '', peopleIds: [] }])
    setDishExpanded(dishes.length)
  }

  function updateDish<K extends keyof DishEntry>(i: number, field: K, value: DishEntry[K]) {
    setDishes(dishes.map((d, idx) => idx === i ? { ...d, [field]: value } : d))
  }

  function removeDish(i: number) {
    setDishes(dishes.filter((_, idx) => idx !== i))
    setDishExpanded(null)
  }

  function togglePerson(id: string, arr: string[], set: (v: string[]) => void) {
    set(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id])
  }

  // Calculate Food Rating automatically if dishes have ratings
  useEffect(() => {
    const ratedDishes = dishes.filter(d => d.rating !== null)
    if (ratedDishes.length > 0) {
      const sum = ratedDishes.reduce((acc, d) => acc + (d.rating || 0), 0)
      setRatingFood(Number((sum / ratedDishes.length).toFixed(1)))
    }
  }, [dishes])

  const hasRatedDishes = dishes.some(d => d.rating !== null)

  // Calculate Overall Rating automatically
  useEffect(() => {
    let totalWeight = 0
    let weightedSum = 0

    if (ratingFood !== null) {
      weightedSum += ratingFood * 3
      totalWeight += 3
    }
    if (ratingService !== null) {
      weightedSum += ratingService * 1
      totalWeight += 1
    }
    if (ratingAmbience !== null) {
      weightedSum += ratingAmbience * 1
      totalWeight += 1
    }

    if (totalWeight > 0) {
      let avg = weightedSum / totalWeight
      // Round to nearest 0.5 for the overall star rating visualization
      avg = Math.round(avg * 2) / 2
      setRatingOverall(avg)
    } else {
      setRatingOverall(null)
    }
  }, [ratingFood, ratingService, ratingAmbience])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!isNewRestaurant && !restaurantId) {
      alert('Por favor, selecione um restaurante existente ou adicione um novo.')
      return
    }

    setLoading(true)
    try {
      const toNumber = (v: string) => {
        const n = Number.parseFloat(v)
        return Number.isFinite(n) ? n : null
      }

      await createVisit({
        restaurantId: isNewRestaurant ? null : restaurantId,
        newRestaurant: isNewRestaurant
          ? {
              name: newRestaurant.name,
              cuisine_type: (isCustomCuisine ? customCuisine : newRestaurant.cuisine_type) || null,
              price_range: newRestaurant.price_range ? toNumber(newRestaurant.price_range) : null,
              address: newRestaurant.address || null,
              notes: newRestaurant.notes || null,
            }
          : null,
        visited_at: visitedAt,
        occasion: occasion || null,
        notes: notes || null,
        rating_overall: ratingOverall,
        rating_food: ratingFood,
        rating_service: ratingService,
        rating_ambience: ratingAmbience,
        peopleIds: selectedPeople,
        dishes: dishes
          .filter(d => d.name.trim())
          .map(d => ({
            name: d.name,
            category: d.category || null,
            rating: d.rating,
            would_order_again: d.would_order_again,
            price: d.price ? toNumber(d.price) : null,
            peopleIds: d.peopleIds,
          })),
      })

      router.push('/')
    } catch (err) {
      alert('Erro ao salvar a visita.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Restaurante */}
      <div className="card">
        <h2 className="font-display text-xl mb-4 text-accent">Restaurante</h2>

        <div className="flex gap-2 mb-3">
          <button type="button" className={`btn ${!isNewRestaurant ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setIsNewRestaurant(false)}>Existente</button>
          <button type="button" className={`btn ${isNewRestaurant ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setIsNewRestaurant(true)}>Novo lugar</button>
        </div>

        {!isNewRestaurant ? (
          <div>
            {restaurantId ? (
              <div className="flex items-center justify-between p-3 border border-line-strong rounded-lg bg-surface">
                <div>
                  <div className="font-display text-lg">{selectedRestaurantObj?.name}</div>
                  {selectedRestaurantObj?.cuisine_type && (
                    <div className="text-xs text-muted">{selectedRestaurantObj.cuisine_type}</div>
                  )}
                </div>
                <button type="button" className="btn btn-ghost text-xs" onClick={() => setRestaurantId('')}>Trocar</button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 relative">
                <input
                  type="text"
                  placeholder="Buscar restaurante…"
                  value={restaurantSearchQuery}
                  onChange={e => setRestaurantSearchQuery(e.target.value)}
                  className="w-full"
                />
                <div className="flex flex-col max-h-48 overflow-y-auto border border-line-strong rounded-lg bg-surface">
                  {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map(r => (
                      <button
                        key={r.id}
                        type="button"
                        className="text-left px-3 py-2 hover:bg-line transition-colors border-b border-line last:border-b-0"
                        onClick={() => {
                          setRestaurantId(r.id)
                          setRestaurantSearchQuery('')
                        }}
                      >
                        <div className="font-medium">{r.name}</div>
                        {r.cuisine_type && <div className="text-xs text-muted">{r.cuisine_type}</div>}
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-center text-muted">Nenhum restaurante encontrado.</div>
                  )}
                </div>
              </div>
            )}
            {!isNewRestaurant && !restaurantId && (
              <input type="text" className="sr-only" required tabIndex={-1} value={restaurantId} onChange={() => {}} />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="relative">
              <input placeholder="Nome do restaurante *" required={isNewRestaurant}
                value={newRestaurant.name} onChange={e => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />

              {similarRestaurants.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 z-20 flex flex-col max-h-48 overflow-y-auto shadow-lg border border-line-strong rounded-lg bg-surface">
                  <div className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-muted bg-bg">Restaurantes similares já cadastrados</div>
                  {similarRestaurants.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      className="text-left px-3 py-2 hover:bg-line transition-colors border-b border-line last:border-b-0"
                      onClick={() => {
                        setRestaurantId(r.id)
                        setIsNewRestaurant(false)
                        setNewRestaurant({ name: '', cuisine_type: '', price_range: '', address: '', notes: '' })
                      }}
                    >
                      <div className="font-medium">{r.name}</div>
                      {r.cuisine_type && <div className="text-xs text-muted">{r.cuisine_type}</div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <select
                  value={isCustomCuisine ? "custom" : newRestaurant.cuisine_type}
                  onChange={e => {
                    if (e.target.value === 'custom') {
                      setIsCustomCuisine(true)
                      setNewRestaurant({ ...newRestaurant, cuisine_type: '' })
                    } else {
                      setIsCustomCuisine(false)
                      setNewRestaurant({ ...newRestaurant, cuisine_type: e.target.value })
                    }
                  }}
                >
                  <option value="">Tipo de cozinha</option>
                  {allCuisineTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  <option value="custom">Outra (adicionar)</option>
                </select>
                {isCustomCuisine && (
                  <input
                    placeholder="Digite o tipo de cozinha"
                    value={customCuisine}
                    onChange={e => setCustomCuisine(e.target.value)}
                  />
                )}
              </div>
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
        <h2 className="font-display text-xl mb-4 text-accent">Detalhes</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs mb-1 block text-muted">Data</label>
            <input type="date" value={visitedAt} onChange={e => setVisitedAt(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs mb-1 block text-muted">Ocasião</label>
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
        <h2 className="font-display text-xl mb-4 text-accent">Avaliações</h2>
        <div className="flex flex-col gap-4">
          <StarRating label="Geral (Média)" value={ratingOverall} onChange={() => {}} readonly />
          <StarRating
            label={hasRatedDishes ? "Comida (Média dos pratos)" : "Comida"}
            value={ratingFood}
            onChange={setRatingFood}
            readonly={hasRatedDishes}
          />
          <StarRating label="Atendimento" value={ratingService} onChange={setRatingService} />
          <StarRating label="Ambiente" value={ratingAmbience} onChange={setRatingAmbience} />
        </div>
      </div>

      {/* Pessoas */}
      <div className="card">
        <h2 className="font-display text-xl mb-4 text-accent">Quem foi</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {localPeople.map(p => (
            <button key={p.id} type="button"
              className={`tag cursor-pointer transition-colors ${selectedPeople.includes(p.id) ? 'tag-accent' : ''}`}
              style={{ padding: '6px 14px', fontSize: 13 }}
              onClick={() => togglePerson(p.id, selectedPeople, setSelectedPeople)}>
              {p.name}
            </button>
          ))}
        </div>
        {isAddingPerson ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Nome da pessoa"
              value={newPersonName}
              onChange={e => setNewPersonName(e.target.value)}
              className="flex-1"
            />
            <button type="button" className="btn btn-primary" onClick={handleAddPerson} disabled={loading}>
              Salvar
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setIsAddingPerson(false)} disabled={loading}>
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-ghost text-sm" onClick={() => setIsAddingPerson(true)}>
            <Plus size={15} /> Adicionar pessoa
          </button>
        )}
      </div>

      {/* Pratos */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-accent">Pratos</h2>
          <button type="button" className="btn btn-ghost" onClick={addDish}>
            <Plus size={15} /> Adicionar prato
          </button>
        </div>

        {dishes.length === 0 && (
          <p className="text-sm text-muted">Nenhum prato adicionado ainda.</p>
        )}

        <div className="flex flex-col gap-3">
          {dishes.map((dish, i) => (
            <div key={i} className="border border-line rounded-lg">
              <div className="flex items-center gap-2 p-3 cursor-pointer"
                onClick={() => setDishExpanded(dishExpanded === i ? null : i)}>
                <input
                  className="flex-1 bg-transparent" style={{ border: 'none', padding: 0 }}
                  placeholder="Nome do prato *"
                  value={dish.name}
                  onChange={e => { e.stopPropagation(); updateDish(i, 'name', e.target.value) }}
                  onClick={e => e.stopPropagation()}
                />
                <button type="button" aria-label={dishExpanded === i ? "Recolher detalhes do prato" : "Expandir detalhes do prato"} onClick={e => { e.stopPropagation(); setDishExpanded(dishExpanded === i ? null : i) }}>
                  {dishExpanded === i ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
                </button>
                <button type="button" aria-label="Remover prato" onClick={e => { e.stopPropagation(); removeDish(i) }}>
                  <X size={16} className="text-muted" />
                </button>
              </div>

              {dishExpanded === i && (
                <div className="px-3 pb-3 flex flex-col gap-3 border-t border-line">
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
                    <span className="text-xs text-muted" style={{ marginTop: 2 }}>Pediria de novo?</span>
                    {[true, false].map(v => (
                      <button key={String(v)} type="button"
                        className={`tag cursor-pointer ${dish.would_order_again === v ? 'tag-accent' : ''}`}
                        style={{ padding: '4px 12px', fontSize: 12 }}
                        onClick={() => updateDish(i, 'would_order_again', dish.would_order_again === v ? null : v)}>
                        {v ? 'Sim' : 'Não'}
                      </button>
                    ))}
                  </div>

                  {localPeople.length > 0 && (
                    <div>
                      <div className="text-xs mb-2 text-muted">Quem pediu</div>
                      <div className="flex flex-wrap gap-2">
                        {localPeople.map(p => (
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
