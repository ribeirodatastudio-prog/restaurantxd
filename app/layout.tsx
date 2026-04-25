import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'

const display = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'RestaurantXD',
  description: 'Seu diário de restaurantes',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#0f0e0d] text-[#f0ece4] font-body min-h-screen">
        <Nav />
        <main className="max-w-3xl mx-auto px-4 pb-16 pt-6">
          {children}
        </main>
      </body>
    </html>
  )
}
