'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

/** Busca de visitas: atualiza ?q= na URL e o servidor filtra (restaurante, prato ou pessoa) */
export function VisitSearch({ initialQuery }: { initialQuery: string }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const t = setTimeout(() => {
      const q = query.trim()
      router.replace(q ? `/?q=${encodeURIComponent(q)}` : '/', { scroll: false })
    }, 300)
    return () => clearTimeout(t)
  }, [query, router])

  return (
    <div className="relative mb-4">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
      <input
        type="text"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar por restaurante, prato ou pessoa…"
        aria-label="Buscar visitas"
        style={{ paddingLeft: 36, paddingRight: query ? 36 : 14 }}
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Limpar busca"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
