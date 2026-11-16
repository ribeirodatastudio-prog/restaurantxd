'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { deleteVisit } from '@/app/actions'

export function DeleteVisitButton({ id }: { id: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!window.confirm('Tem certeza que deseja excluir esta visita?')) return
    startTransition(async () => {
      try {
        await deleteVisit(id)
        router.push('/')
      } catch (err) {
        console.error(err)
        alert('Erro ao excluir a visita.')
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      <Trash2 size={15} />
      {pending ? 'Excluindo…' : 'Excluir'}
    </button>
  )
}
