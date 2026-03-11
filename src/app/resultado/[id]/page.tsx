import { notFound } from 'next/navigation'
import { createServerSupabase } from '@/lib/supabase'
import { gerarDiagnostico } from '@/lib/diagnostico'
import { NotasModulo } from '@/types'
import ResultadoClient from '@/components/resultado/ResultadoClient'

interface Props {
  params: { id: string }
}

export default async function ResultadoPage({ params }: Props) {
  const supabase = createServerSupabase()

  const { data: avaliacao, error } = await supabase
    .from('avaliacoes')
    .select(`*, leads(nome, email)`)
    .eq('id', params.id)
    .single()

  if (error || !avaliacao) {
    notFound()
  }

  const resultado = gerarDiagnostico(avaliacao.notas as NotasModulo)
  const nome = (avaliacao.leads as any)?.nome || 'Visitante'

  return <ResultadoClient resultado={resultado} nome={nome} avaliacaoId={params.id} />
}
