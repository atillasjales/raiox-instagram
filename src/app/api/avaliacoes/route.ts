import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase'
import { gerarDiagnostico, gerarDiagnosticoComIA } from '@/lib/diagnostico'
import { calcularNotaGeral } from '@/lib/quiz-data'
import { gerarEmailResultado } from '@/lib/email-template'
import { NotasModulo } from '@/types'
import { z } from 'zod'

const schema = z.object({
  lead_id: z.string().uuid(),
  segmento: z.string().optional(),
  notas: z.object({
    perfil: z.number().min(1).max(10),
    posicionamento: z.number().min(1).max(10),
    identidade_visual: z.number().min(1).max(10),
    seguidores: z.number().min(1).max(10),
    conteudo: z.number().min(1).max(10),
    engajamento: z.number().min(1).max(10),
  }),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { lead_id, segmento, notas } = schema.parse(body)

    const nota_geral = calcularNotaGeral(notas)
    const supabase = createServerSupabase()

    // Invocar IA para texto personalizado
    const resultadoIA = await gerarDiagnosticoComIA(notas as NotasModulo, segmento || '')

    // Salva na JSONB
    const notasToSave = {
      ...notas,
      _resultado_ia: resultadoIA
    }

    // Save evaluation
    const { data: avaliacao, error } = await supabase
      .from('avaliacoes')
      .insert({
        lead_id,
        notas: notasToSave,
        nota_geral,
      })
      .select('id')
      .single()

    if (error) throw error

    // Get lead email for sending result
    const { data: lead } = await supabase
      .from('leads')
      .select('nome, email')
      .eq('id', lead_id)
      .single()

    // Send email asynchronously (don't block the response)
    if (lead?.email) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      const htmlEmail = gerarEmailResultado(lead.nome, resultadoIA, avaliacao.id, appUrl)

      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'raio-x@troppadigital.com.br',
          to: lead.email,
          subject: `Seu Raio-X do Instagram está pronto, ${lead.nome}! 📊`,
          html: htmlEmail,
        })
      } catch (emailErr) {
        console.error('[Email send error]', emailErr)
        // Don't throw — email failure shouldn't block the user
      }
    }

    return NextResponse.json({ id: avaliacao.id })
  } catch (err: any) {
    console.error('[POST /api/avaliacoes]', err)
    return NextResponse.json(
      { error: err.message || 'Erro ao processar avaliação' },
      { status: 400 }
    )
  }
}
