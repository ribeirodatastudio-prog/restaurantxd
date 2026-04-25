'use client'
import { useState } from 'react'

interface StarRatingProps {
  value: number | null
  onChange: (v: number) => void
  label?: string
}

// Renderiza uma estrela que pode ser: vazia, metade, ou cheia
function Star({ fill }: { fill: 'empty' | 'half' | 'full' }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 22, height: 22, fontSize: 22, lineHeight: 1 }}>
      {/* Fundo vazio */}
      <span style={{ color: '#3a3630' }}>★</span>
      {/* Preenchimento dourado por cima, clipado */}
      {fill !== 'empty' && (
        <span style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: '#c9a96e',
          overflow: 'hidden',
          width: fill === 'half' ? '50%' : '100%',
        }}>★</span>
      )}
    </span>
  )
}

// Converte um valor (ex: 3.5) em array de 5 fills
function getFills(value: number | null): Array<'empty' | 'half' | 'full'> {
  return [1, 2, 3, 4, 5].map((i) => {
    if (!value) return 'empty'
    if (value >= i) return 'full'
    if (value >= i - 0.5) return 'half'
    return 'empty'
  })
}

export function StarRating({ value, onChange, label }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)
  const display = hover ?? value
  const fills = getFills(display)

  return (
    <div>
      {label && <div className="text-xs mb-1" style={{ color: '#8a8278' }}>{label}</div>}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
            {/* Metade esquerda — valor X.5 */}
            <span
              style={{ position: 'absolute', left: 0, top: 0, width: '50%', height: '100%', zIndex: 1 }}
              onMouseEnter={() => setHover(star - 0.5)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onChange(star - 0.5)}
            />
            {/* Metade direita — valor X.0 */}
            <span
              style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', zIndex: 1 }}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onChange(star)}
            />
            <Star fill={fills[star - 1]} />
          </span>
        ))}
        {value && (
          <span className="ml-2 text-sm rating-display">{value}</span>
        )}
      </div>
    </div>
  )
}

export function RatingDisplay({ value, size = 'sm' }: { value: number | null; size?: 'sm' | 'lg' }) {
  if (!value) return <span style={{ color: '#8a8278' }}>—</span>
  const fills = getFills(value)
  const fontSize = size === 'lg' ? 20 : 15

  return (
    <span className="flex items-center gap-0.5">
      {fills.map((fill, i) => (
        <span key={i} style={{ fontSize }}>
          <Star fill={fill} />
        </span>
      ))}
      <span className={`ml-1 rating-display ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>{value}</span>
    </span>
  )
}
