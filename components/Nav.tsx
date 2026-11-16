'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UtensilsCrossed, BookHeart, BarChart2, Users, Star, LogOut } from 'lucide-react'
import { logout } from '@/app/actions'

const links = [
  { href: '/',            label: 'Visitas',  icon: UtensilsCrossed },
  { href: '/restaurants', label: 'Lugares',  icon: BookHeart },
  { href: '/wishlist',    label: 'Quero ir', icon: Star },
  { href: '/stats',       label: 'Stats',    icon: BarChart2 },
  { href: '/people',      label: 'Pessoas',  icon: Users },
]

export function Nav() {
  const path = usePathname()
  if (path === '/login') return null

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-line">
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="font-display text-xl text-accent" style={{ letterSpacing: '-0.02em' }}>
          RestaurantXD
        </Link>
        <nav className="flex gap-1 items-center">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === '/' ? path === '/' : path.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[11px] transition-colors ${
                  active ? 'text-accent bg-accent/10' : 'text-muted'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:block">{label}</span>
              </Link>
            )
          })}
          <form action={logout}>
            <button type="submit" aria-label="Sair" title="Sair" className="px-2 py-1.5 text-muted hover:text-ink">
              <LogOut size={16} />
            </button>
          </form>
        </nav>
      </div>
    </header>
  )
}
