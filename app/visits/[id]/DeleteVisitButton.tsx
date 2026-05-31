'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export function DeleteVisitButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!window.confirm('Tem certeza que deseja excluir esta visita?')) return

    setLoading(true)
    try {
      const { error } = await supabase.from('visits').delete().eq('id', id)
      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (err) {
      alert('Erro ao excluir a visita. Verifique o console.')
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
    >
      <Trash2 size={15} />
      {loading ? 'Excluindo...' : 'Excluir'}
    </button>
  )
}
