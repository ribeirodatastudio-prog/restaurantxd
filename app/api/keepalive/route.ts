import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Chamado diariamente pelo Vercel Cron (ver vercel.json).
// O Supabase gratuito pausa o projeto após 7 dias sem atividade no banco;
// uma consulta por dia é suficiente para mantê-lo ativo.
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const { count, error } = await supabase
    .from('restaurants')
    .select('id', { count: 'exact', head: true })

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true, restaurants: count, at: new Date().toISOString() })
}
