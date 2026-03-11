import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().min(8),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const supabase = createServerSupabase()

    // Check if lead already exists
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', data.email)
      .single()

    if (existing) {
      return NextResponse.json({ id: existing.id })
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ id: lead.id })
  } catch (err: any) {
    console.error('[POST /api/leads]', err)
    return NextResponse.json(
      { error: err.message || 'Erro ao salvar lead' },
      { status: 400 }
    )
  }
}
