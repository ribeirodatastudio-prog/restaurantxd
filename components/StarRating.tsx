'use client'
import { useState } from 'react'

interface StarRatingProps {
  value: number | null
  onChange: (v: number) => void
  label?: string
}

const OPTIONS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

export function StarRating({ value, onChange, label }: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null)
  const display = hover ?? value

  return (
    <div>
      {label && <div className="text-xs mb-1" style={{ color: '#8a8278' }}>{label}</div>}
      <div className="flex items-center gap-0.5">
        {OPTIONS.map((opt) => {
          const filled = display !== null && opt <= display
          const half = display !== null && opt - 0.5 === display
          return (
            <button
              key={opt}
              type="button"
              className="star-btn"
              onMouseEnter={() => setHover(opt)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onChange(opt)}
              aria-label={`${opt} estrelas`}
            >
              <span style={{
                color: filled || half ? '#c9a96e' : '#3a3630',
                fontSize: 20,
              }}>
                {opt % 1 === 0.5 && display !== null && display >= opt ? '½' : filled ? '★' : '☆'}
              </span>
            </button>
          )
        })}
        {value && (
          <span className="ml-2 text-sm rating-display">{value}</span>
        )}
      </div>
    </div>
  )
}

export function RatingDisplay({ value, size = 'sm' }: { value: number | null; size?: 'sm' | 'lg' }) {
  if (!value) return <span style={{ color: '#8a8278' }}>—</span>
  const stars = Math.floor(value)
  const half = value % 1 >= 0.5
  return (
    <span className="flex items-center gap-1">
      <span style={{ color: '#c9a96e', fontSize: size === 'lg' ? 18 : 14 }}>
        {'★'.repeat(stars)}{half ? '½' : ''}{'☆'.repeat(5 - stars - (half ? 1 : 0))}
      </span>
      <span className={`rating-display ${size === 'lg' ? 'text-lg' : 'text-sm'}`}>{value}</span>
    </span>
  )
}
