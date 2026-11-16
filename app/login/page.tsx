import { LoginForm } from './LoginForm'

export const metadata = { title: 'Entrar · RestaurantXD' }

export default function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="card w-full max-w-sm">
        <h1 className="font-display text-3xl mb-1 text-accent">RestaurantXD</h1>
        <p className="text-sm mb-5 text-muted">Digite a senha para entrar.</p>
        <LoginForm next={searchParams.next ?? '/'} />
      </div>
    </div>
  )
}
