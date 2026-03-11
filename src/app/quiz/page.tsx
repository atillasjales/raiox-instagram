'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MODULOS, calcularNotaModulo, calcularNotaGeral } from '@/lib/quiz-data'
import { Respostas, NotasModulo, ModuloId } from '@/types'
import QuizModulo from '@/components/quiz/QuizModulo'
import QuizProgress from '@/components/quiz/QuizProgress'
import QuizIntro from '@/components/quiz/QuizIntro'

type Etapa = 'intro' | 'quiz' | 'enviando'

export default function QuizPage() {
  const router = useRouter()
  const [etapa, setEtapa] = useState<Etapa>('intro')
  const [moduloAtual, setModuloAtual] = useState(0)
  const [respostas, setRespostas] = useState<Respostas>({} as Respostas)
  const [leadId, setLeadId] = useState<string | null>(null)
  const [leadNome, setLeadNome] = useState<string>('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    const id = sessionStorage.getItem('lead_id')
    const nome = sessionStorage.getItem('lead_nome')
    if (!id) {
      router.replace('/')
      return
    }
    setLeadId(id)
    setLeadNome(nome || 'você')
  }, [router])

  function handleRespostasModulo(moduloId: ModuloId, notasModulo: Record<number, number>) {
    const novas = { ...respostas, [moduloId]: notasModulo }
    setRespostas(novas)

    if (moduloAtual < MODULOS.length - 1) {
      setModuloAtual((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      finalizarQuiz(novas)
    }
  }

  async function finalizarQuiz(todasRespostas: Respostas) {
    setEtapa('enviando')

    const notas: NotasModulo = {} as NotasModulo
    for (const modulo of MODULOS) {
      notas[modulo.id] = calcularNotaModulo(todasRespostas[modulo.id] || {})
    }

    try {
      const res = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId, notas }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)

      sessionStorage.removeItem('lead_id')
      sessionStorage.removeItem('lead_nome')
      router.push(`/resultado/${json.id}`)
    } catch (err: any) {
      setErro('Erro ao processar diagnóstico. Tente novamente.')
      setEtapa('quiz')
    }
  }

  if (!leadId) return null

  if (etapa === 'intro') {
    return <QuizIntro nome={leadNome} onStart={() => setEtapa('quiz')} />
  }

  if (etapa === 'enviando') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black px-6">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Scanning animation */}
            <div className="w-24 h-24 border-2 border-brand-orange/30 rounded-lg relative overflow-hidden">
              <div className="absolute left-0 right-0 h-0.5 bg-brand-orange animate-scan" />
              <div className="absolute inset-0 flex items-center justify-center text-3xl">📱</div>
            </div>
          </div>
          <h2 className="font-display font-bold text-3xl text-brand-cream mb-3">
            Processando diagnóstico...
          </h2>
          <p className="text-brand-muted">
            Estamos analisando suas respostas e gerando seu plano de ação.
          </p>
        </div>
      </div>
    )
  }

  const modulo = MODULOS[moduloAtual]

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Fixed progress bar */}
      <QuizProgress
        total={MODULOS.length}
        atual={moduloAtual}
        modulos={MODULOS}
      />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {erro && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">
              {erro}
            </div>
          )}

          <QuizModulo
            key={modulo.id}
            modulo={modulo}
            onComplete={(notas) => handleRespostasModulo(modulo.id, notas)}
          />
        </div>
      </div>
    </div>
  )
}
