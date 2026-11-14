'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/app/actions'

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn btn-primary justify-center" disabled={pending}>
      {pending ? 'Entrando…' : 'Entrar'}
    </button>
  )
}

export function LoginForm({ next }: { next: string }) {
  const [state, action] = useFormState(login, null)
  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="next" value={next} />
      <input type="password" name="password" placeholder="Senha" autoComplete="current-password" required autoFocus />
      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      <Submit />
    </form>
  )
}
