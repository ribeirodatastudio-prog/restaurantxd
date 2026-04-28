'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UtensilsCrossed, BookHeart, BarChart2, Users, Star } from 'lucide-react'

const links = [
  { href: '/',          label: 'Visitas',      icon: UtensilsCrossed },
  { href: '/restaurants', label: 'Lugares',   icon: BookHeart },
  { href: '/wishlist',  label: 'Quero ir',     icon: Star },
  { href: '/stats',     label: 'Stats',        icon: BarChart2 },
  { href: '/people',    label: 'Pessoas',      icon: Users },
]

export function Nav() {
  const path = usePathname()
  return (
    <header style={{ borderBottom: '1px solid #2a2622' }} className="sticky top-0 z-50 bg-[#0f0e0d]/95 backdrop-blur">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="font-display text-xl" style={{ color: '#c9a96e', letterSpacing: '-0.02em' }}>
          RestaurantXD
        </Link>
        <nav className="flex gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = path === href
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a96e]"
                style={{
                  color: active ? '#c9a96e' : '#8a8278',
                  background: active ? 'rgba(201,169,110,0.1)' : 'transparent',
                }}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="hidden sm:block">{label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
