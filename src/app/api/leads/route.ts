import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { z } from 'zod'

// Helper function to normalize Instagram profile
function normalizeInstagramProfile(profile: string): string {
  if (!profile || !profile.trim()) return ''

  const trimmed = profile.trim()

  // If it's a full URL, extract the username
  if (trimmed.includes('instagram.com/')) {
    const match = trimmed.match(/instagram\.com\/([a-zA-Z0-9_.-]+)/)
    if (match) return `@${match[1]}`
  }

  // If it already starts with @, return as is
  if (trimmed.startsWith('@')) return trimmed

  // Otherwise, add @ prefix
  return `@${trimmed}`
}

const schema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().min(8),
  segmento: z.string().optional(),
  instagram_profile: z.string().optional(),
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
        segmento: data.segmento || null,
        instagram_profile: data.instagram_profile ? normalizeInstagramProfile(data.instagram_profile) : null,
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
