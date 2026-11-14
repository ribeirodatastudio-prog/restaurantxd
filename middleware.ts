import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, isValidSession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const ok = await isValidSession(request.cookies.get(SESSION_COOKIE)?.value)
  if (ok) return NextResponse.next()

  const url = request.nextUrl.clone()
  const next = request.nextUrl.pathname + request.nextUrl.search
  url.pathname = '/login'
  url.search = next !== '/' ? `?next=${encodeURIComponent(next)}` : ''
  return NextResponse.redirect(url)
}

export const config = {
  // Tudo exige login, menos a própria página de login e os arquivos estáticos
  matcher: [
    '/((?!login|_next/static|_next/image|favicon.ico|icon.png|icon-192.png|icon-512.png|manifest.json).*)',
  ],
}
